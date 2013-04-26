<?php
    include "../../php/mysql.db.php";
    $db = new koneksi();

    include "../../php/DB_init.php";
    $conn = $db->connect();

    $arr["masuk"]     = $_POST["masuk"];
    $arr["pulang"]    = $_POST["pulang"];

    $db->tabelDB = 'kehadiran';
    $arrW[0]["fieldTbl"]= "id";
    $arrW[0]["content"]= $_POST["selected"];
    $arrW[0]["operator"]= "";
    $sql = $db->SQLupdateData($arr,$arrW);
    //die("{success:false, message: \"" . $sql . "\"}");
    $db->execute($conn, $sql);
    $db->close($conn);

    die("{success:true, message: \"Update data kehadiran berhasil.\"}");
?>