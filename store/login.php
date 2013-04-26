<?php   

    if($_POST["task"] == "login") {
        $user = $_POST['username'];
        $pass = $_POST['password'];
        
        //die(print_r($_POST));
        include "../php/mysql.db.php";
        $db = new koneksi();

        include "../php/DB_init.php";
        $conn = $db->connect();
                
        $sql = "SELECT * FROM user WHERE iduser='$user' AND pass=MD5('$pass')";
        $db->query($sql, $rec_num, $rs0);
        if($rec_num==0) {
            $db->close($conn);
            die('{success: false, message: "User login dan password tidak sesuai."}');
        }

        $sql = "SELECT A.*,B.kelompok FROM user_modul_akses AS A, modul AS B WHERE " .
               "A.idmodul=B.kode AND A.iduser='$user' ORDER BY B.kelompok, B.no";
        $db->query($sql, $rec_num, $rs);
        $db->close($conn);

        $_SESSION['iduser'] = $user;
        $_SESSION['tipe'] = $rs0[0]['status'];
        $_SESSION['idbackground'] = $rs0[0]["idBackground"];

        //$_SESSION['akses'] = array();
        for($i=0; $i<$rec_num; $i++)
            $_SESSION['akses'][$rs[$i]['iduser']][$rs0[0]['nama']][$rs[$i]['kelompok']][$rs[$i]['idmodul']] = $rs[$i]['akses'];
        die('{success:true}');
        
    } else die('{success:false, message:"Login Gagal"}');
?>