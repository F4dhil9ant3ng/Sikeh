<?php
    //die(print_r($_POST));
    include "../../php/mysql.db.php";
    $db = new koneksi();

    include "../../php/DB_init.php";
    $conn = $db->connect();

    //get idgrup
    $iduser = $_POST["iduser"];
    //CEK USER ID
    $sql = "SELECT iduser FROM user WHERE iduser<>'$iduser' AND " .
           "iduser='". $_POST["userid"] . "'";
    $db->query($sql, $rec_num, $rs);
    if($rec_num>0) {
        die("{success:false, message: \"User id sudah di pakai.\"}");
        $db->close($conn);
    }

    $arr['iduser'] = $_POST["userid"];
    $arr['nama']   = $_POST["namauser"];
    $arr['idgrup'] = $_POST["idgrup"];
    if($_POST["password"]) $arr['pass'] = "MD5('" . $_POST["pass"] . "')";
    $arr['aktif']  = $_POST["nonaktif"]?"N":"Y";
    $arr["status"]   = "U";

    $db->tabelDB = 'user';
    $arrW[0]["fieldTbl"]= "iduser";
    $arrW[0]["content"]= $iduser;
    $arrW[0]["operator"]= "";
    $sql = $db->SQLupdateData($arr,$arrW, 'pass');
    //die("{success:false, message: \"" . $sql . "\"}");
    $db->execute($conn, $sql);

    //insert detail -> ok
    $sql = "DELETE FROM user_modul_akses WHERE iduser='$iduser'";
    $db->execute($conn, $sql);

    if(strlen($_POST["detail"])>0) {
     $sql = "INSERT INTO user_modul_akses VALUES";
        $rows = explode("\n", $_POST["detail"]);

        for ($row = 0; $row < count($rows); $row++) {
            $cols = explode("\t", $rows[$row]); //.split("\\r?\\t", -1);

            $sql .= ($row>0?",":"") . "("
                   . "'" . $arr['iduser'] ."',"
                   . "'" . $cols[0] ."',"
                   . "'" . $cols[1].$cols[2].$cols[3].$cols[4].$cols[5].$cols[6] . "')";

        }
        //die("{success:false, message: \"" . $sql . "\"}");
        $db->execute($conn, $sql);

    }
    
    die("{success:true, message: \"Update user berhasil.\"}");
    $db->close($conn);
    die($result);
?>