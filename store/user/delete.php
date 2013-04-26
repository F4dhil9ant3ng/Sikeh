<?php
    //die(print_r($_POST));
    include "../../php/mysql.db.php";
    $db = new koneksi();

    include "../../php/DB_init.php";
    $conn = $db->connect();
    $sql = "SELECT iduser FROM user WHERE iduser IN ('" . str_replace(",", "','", $_POST["selected"]) . "') AND status='A'";
    $db->query($sql, $rec_num, $rs);
    if($rec_num>0) $msg = "User dengan ID <b>" . $rs[0]["iduser"] . "</b> tidak bisa dihapus.";

    $sql = "DELETE FROM user WHERE status='U' AND iduser IN ('" . str_replace(",", "','", $_POST["selected"]) . "')";
    //die("{success:false, message: \"" . $sql . "\"}");
    $db->execute($conn, $sql);

    $sql = "DELETE B FROM user AS A, user_modul_akses AS B WHERE A.iduser=B.iduser AND " .
           "A.status='U' AND B.iduser IN ('" . str_replace(",", "','", $_POST["selected"]) . "')";
    //die("{success:false, message: \"" . $sql . "\"}");
    $db->execute($conn, $sql);

    $db->close($conn);

    die("{success:" . (!isset($msg)?"true":"false") . ", message: \"" . (!isset($msg)?"Hapus data user berhasil.":$msg) . "\"}");
    
?>