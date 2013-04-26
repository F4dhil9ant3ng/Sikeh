<?php

    $var = array();
    $i=0;
    foreach ($_GET as $de => $val) {
        $var[$i] = str_replace (" ", "", $de);
        $i++;
    }
    $id = $var[0];

    include "../php/mysql.db.php";
    $db = new koneksi();

    include "../php/DB_init.php";
    $conn = $db->connect();

    $sql= "SELECT " . ($var[1]=="1"?"temp_photo":"photo") . " AS gambar " .
          "FROM " . ($var[1]=="1"?"temp_photo":$var[1]) . " AS A " .
          "WHERE " . ($var[1]=="1"?"session_id":$var[2]) . "='$id'";
    $db->query($sql, $rec_num, $rs);
    if(strlen($rs[0]["gambar"])==0) {
        $sql = "SELECT temp_photo AS gambar FROM temp_photo WHERE session_id='0'";
        $db->query($sql, $rec_num, $rs);
    }
    $db->close($conn);

    //die($sql);
    //MENAMPILKAN GAMBAR:
    header("Content-type: image/jpeg");
    print($rs[0]["gambar"]);
			
?>