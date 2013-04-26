<?php
    include "../../php/mysql.db.php";
    $db = new koneksi();

    include "../../php/DB_init.php";
    $conn = $db->connect();
    
    $start   = strlen($_POST["start"])==0?"":$_POST["start"];
    $end     = strlen($_POST["limit"])==0?"":$_POST["limit"];
    $sort    = !isset($_POST["sort"])?"no":$_POST["sort"];
    $dir     = !isset($_POST["dir"])?"":$_POST["dir"];

    $search   = !isset($_POST["query"])?"":$_POST["query"];

    $sql = "SELECT COUNT(no) AS TOTAL FROM guru WHERE 1 " .
            (strlen($search)>0?(" AND (no LIKE '%$search%' OR nama LIKE '%$search%' OR nuptk LIKE '%$search%')"):"");
    $db->query($sql, $rec_num, $rs);
    $nbrows=$rs[0]["TOTAL"];

    $result="{\"totalCount\":\"0\", \"topics\":\"\"}";
    if($nbrows>0) {
        $sql = "SELECT no,nama,nuptk,jk,pendidikan,DATE_FORMAT(tmt, '%d-%m-%Y') AS tgltugas,status_pegawai,status " .
               "FROM guru AS A WHERE 1 " . (strlen($search)>0?("AND (no LIKE '%$search%' OR nama LIKE '%$search%' " .
               "OR nuptk LIKE '%$search%') "):"") . "ORDER BY " . (strlen($sort)>0?("$sort $dir "):" ")  .
               "LIMIT $start, $end";

        $db->query($sql, $rec_num, $rs);

        $result = "{\"totalCount\":\"" .  $nbrows . "\",\"topics\":[";
        for($i=0; $i<$rec_num; $i++) {
            $result .= ($i>0?",\n":"") . "{" .
                    "\"no\":\"" . $rs[$i]["no"] . "\", " .
                    "\"nama\":\"" . $rs[$i]["nama"] . "\", " .
                    "\"nuptk\":\"" . $rs[$i]["nuptk"] . "\", " .
                    "\"kelamin\":\"" . ($rs[$i]["jk"]=="L"?"Laki-laki":"Perempuan") . "\", " .
                    "\"pendidikan\":\"" . $rs[$i]["pendidikan"] . "\", " .
                    "\"tmt\":\"" . $rs[$i]["tgltugas"] . "\", " .
                    "\"status_pegawai\":\"" . $rs[$i]["status_pegawai"] . "\", " .
                    "\"status\":\"" . ($rs[$i]["status"]=="A"?"Aktif":"Pensiun") . "\"}";
        }
        $result .= "]}";
    }

    $db->close($conn);
    die($result);
?>