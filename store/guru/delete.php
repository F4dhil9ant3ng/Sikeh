<?php
    include "../../php/mysql.db.php";
    $db = new koneksi();

    include "../../php/DB_init.php";
    $conn = $db->connect();
    
    $sql = "DELETE FROM guru WHERE no IN ('" . str_replace(",", "','", $_POST["selected"]) . "')";
    //die("{success:false, message: \"" . $sql . "\"}");
    $db->execute($conn, $sql);
    
    $db->close($conn);

    die("{success:true, message: \"Hapus data berhasil.\"}");
    
?>