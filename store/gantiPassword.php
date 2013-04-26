<?php
    $old_pass = $_POST['pass-old'];
    $pass     = $_POST['pass'];

    //die(print_r($_POST));
    include "../php/mysql.db.php";
    $db = new koneksi();

    include "../php/DB_init.php";
    $conn = $db->connect();

    $sql = "SELECT COUNT(iduser) AS TOTAL FROM user WHERE iduser='" . $_SESSION["iduser"] . "' AND " .
           "pass=MD5('$old_pass')";
    $db->query($sql, $rec_num, $rs);

    if($rs[0]["TOTAL"]==0) {
        $db->close($conn);
        die('{success: false, message: "Password lama tidak valid."}');
    }


    $sql = "UPDATE user SET pass=MD5('$pass') WHERE iduser='" . $_SESSION["iduser"] . "' AND " .
           "pass=MD5('$old_pass')";
    $db->execute($conn, $sql);
    $db->close($conn);

    die('{success: true, message: "Ganti password berhasil."}');
        
?>