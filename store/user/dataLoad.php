<?php
    //die(print_r($_POST));
    include "../../php/mysql.db.php";
    $db = new koneksi();

    include "../../php/DB_init.php";
    $conn = $db->connect();
    
    $id   = $_POST["id"];
    
    $sql = "SELECT *,(SELECT keterangan FROM usergrup WHERE idgrup=A.idgrup) AS grup FROM user AS A " .
           "WHERE iduser='$id'";
    $db->query($sql, $rec_num, $rs);
    $db->close($conn);
    
    die("{\"total\":1, \"status\": \"" . $rs[0]["status"] . "\","
            . "\"results\":[{"
            . "\"iduser\":\"" . $rs[0]["iduser"] . "\","
            . "\"userid\":\"" . $rs[0]["iduser"] . "\","
            . "\"namauser\":\"" . $rs[0]["nama"] . "\","
            . "\"idgrup\":\"" . $rs[0]["idgrup"] . "\","
            . "\"grup\":\"" . $rs[0]["grup"] . "\","
            . "\"nonaktif\":\"" . ($rs[0]["aktif"]=="N") . "\""
            . "}]}");
?>