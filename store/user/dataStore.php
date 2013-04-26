<?php
    //die(print_r($_POST));
    include "../../php/mysql.db.php";
    $db = new koneksi();

    include "../../php/DB_init.php";
    $conn = $db->connect();
    
    $start   = strlen($_POST["start"])==0?"":$_POST["start"];
    $end     = strlen($_POST["limit"])==0?"":$_POST["limit"];
    $sort    = !isset($_POST["sort"])?"":$_POST["sort"];
    $dir     = !isset($_POST["dir"])?"":$_POST["dir"];

    $search   = !isset($_POST["query"])?"":$_POST["query"];

    $sql = "SELECT COUNT(iduser) AS TOTAL FROM user WHERE 1 " .
            (strlen($search)>0?(" AND (iduser LIKE " .
            "'%" . $search . "%' OR nama LIKE " .
            "'%" . $search . "%')"):"");
    $db->query($sql, $rec_num, $rs);
    $nbrows=$rs[0]["TOTAL"];

    $result="{\"totalCount\":\"1\", \"topics\":\"\"}";
    if($nbrows>0) {
        $sql = "SELECT iduser AS id,iduser,nama,aktif,status FROM user WHERE 1 " .
               (strlen($search)>0?("AND (iduser LIKE '%" . $search . "%' " .
                                   "OR nama LIKE '%" . $search . "%') "):"")  .
               (strlen($sort)>0?("ORDER BY `" . $sort . "` " . $dir . " "):"")  .
               " LIMIT " . $start . "," . $end;

        $db->query($sql, $rec_num, $rs);

        $result = "{\"totalCount\":\"" .  $nbrows . "\",\"topics\":[";
        for($i=0; $i<$rec_num; $i++) {
            $result .= ($i>0?",\n":"") . "{" .
                    "\"id\":\"" . $rs[$i]["id"] . "\", " .
                    "\"iduser\":\"" . $rs[$i]["iduser"] . "\", " .
                    "\"nama\":\"" . $rs[$i]["nama"] . "\", " .
                    "\"status\":\"" . $rs[$i]["status"] . "\", " .
                    "\"aktif\":\"" . ($rs[$i]["aktif"]=="Y"?"Aktif":"Non Aktif") . "\"}";
        }
        $result .= "]}";
    }

    $db->close($conn);
    die($result);
?>