<?php
    include "../../php/mysql.db.php";
    $db = new koneksi();

    include "../../php/DB_init.php";
    $conn = $db->connect();
    
    $start  = strlen($_POST["start"])==0?"":$_POST["start"];
    $end    = strlen($_POST["limit"])==0?"":$_POST["limit"];
    $sort   = !isset($_POST["sort"])?"A.tanggal":$_POST["sort"];
    $dir    = !isset($_POST["dir"])?"":$_POST["dir"];

    $search = !isset($_POST["query"])?"":$_POST["query"];

    $dari   = konversiTanggal($_POST["dari"]);
    $sd     = konversiTanggal($_POST["sd"]);

    $sql = "SELECT COUNT(A.id) AS TOTAL FROM kehadiran AS A LEFT JOIN guru AS B ON A.nip=B.no " .
           "WHERE A.tanggal>='$dari' AND A.tanggal<='$sd'" .
            (strlen($search)>0?(" AND (A.nip LIKE '%$search%' OR B.nama LIKE '%$search%' OR B.nuptk LIKE '%$search%')"):"");
    $db->query($sql, $rec_num, $rs);
    $nbrows=$rs[0]["TOTAL"];

    $result="{\"totalCount\":\"0\", \"topics\":\"\"}";
    if($nbrows>0) {
        $sql = "SELECT A.id,DATE_FORMAT(A.tanggal,'%d-%m-%Y') AS tgl,A.nip,B.nama,B.nuptk,DATE_FORMAT(masuk, '%H:%i:%s') AS jammasuk," .
               "DATE_FORMAT(pulang, '%H:%i:%s') AS jampulang FROM kehadiran AS A LEFT JOIN guru AS B ON A.nip=B.no WHERE " .
               "A.tanggal>='$dari' AND A.tanggal<='$sd' " .
               (strlen($search)>0?("AND (A.nip LIKE '%$search%' OR B.nama LIKE '%$search%' OR B.nuptk LIKE '%$search%') "):"") .
               "ORDER BY " . (strlen($sort)>0?("$sort $dir "):"") . " LIMIT $start, $end";

        $db->query($sql, $rec_num, $rs);

        $result = "{\"totalCount\":\"" .  $nbrows . "\",\"topics\":[";
        for($i=0; $i<$rec_num; $i++) {
            $result .= ($i>0?",\n":"") . "{" .
                    "\"id\":\"" . $rs[$i]["id"] . "\", " .
                    "\"tanggal\":\"" . $rs[$i]["tgl"] . "\", " .
                    "\"no\":\"" . $rs[$i]["nip"] . "\", " .
                    "\"nama\":\"" . $rs[$i]["nama"] . "\", " .
                    "\"nuptk\":\"" . $rs[$i]["nuptk"] . "\", " .
                    "\"masuk\":\"" . $rs[$i]["jammasuk"] . "\", " .
                    "\"pulang\":\"" . $rs[$i]["jampulang"] . "\"}";
        }
        $result .= "]}";
    }

    $db->close($conn);
    die($result);
?>