<?php
    include "../../php/mysql.db.php";
    $db = new koneksi();

    include "../../php/DB_init.php";
    $conn = $db->connect();

    //CEK no
    $sql = "SELECT no FROM guru WHERE no='" . $_POST["no"] . "' AND no<>'" . $_POST["noedit"] . "'";
    $db->query($sql, $rs_num, $rs);
    if($rs_num>0) {
        $db->close($conn);
        die("{success: false, message: \"No. guru sudah terpakai.\"}");
    }

    function charleading($char, $text, $len) {
        $length = $len-strlen($text);
        $tmp = "";
        for($i=0; $i<=$length; $i++)
        $tmp.=$char;

        //return $tmp.$text;
        return $text;
    }
    
    $arr["no"]        = charleading("0", $_POST["no"], 3);
    $arr["nuptk"]     = $_POST["nuptk"];
    $arr["nama"]      = $_POST["nama"];
    $arr["jk"]        = $_POST["kelamin"];
    $arr["tpt_lahir"] = $_POST["tptlahir"];
    $arr["tgl_lahir"] = konversiTanggal($_POST["tgllahir"]);
    $arr["agama"]     = $_POST["agama"];
    $arr["gol_darah"] = $_POST["goldarah"];
    $arr["alamat1"]   = $_POST["alamat1"];
    $arr["alamat2"]   = $_POST["alamat2"];
    $arr["telp"]      = $_POST["telepon"];
    $arr["hp"]        = $_POST["hp"];

    $arr["pendidikan"]     = $_POST["pendidikan"];
    $arr["tgl_lulus"]      = konversiTanggal($_POST["tgllulus"]);
    $arr["status_pegawai"] = $_POST["pegawai"];
    $arr["tmt"]            = konversiTanggal($_POST["tmt"]);
    $arr["status"]         = $_POST["status"];
    $arr["tgl_pensiun"]    = konversiTanggal($_POST["tglselesai"]);

    $db->tabelDB = 'guru';
    $arrW[0]["fieldTbl"]= "no";
    $arrW[0]["content"]= $_POST["noedit"];
    $arrW[0]["operator"]= "";
    $sql = $db->SQLupdateData($arr,$arrW);
    //die("{success:false, message: \"" . $sql . "\"}");
    $db->execute($conn, $sql);

    //UPDATE PHOTO
    if(strlen($_POST["session_id"])>0) {
        $sql = "UPDATE guru SET photo=(SELECT temp_photo FROM temp_photo WHERE " .
               "session_id='" . $_POST["session_id"] . "') WHERE no='" . $arr["no"] . "'";
        //die("{success:false, message: \"$sql\"}");
        $db->execute($conn, $sql);

        $sql = "DELETE FROM temp_photo WHERE session_id='" . $_POST["session_id"] . "'";
        //die("{success:false, message: \"$sql\"}");
        $db->execute($conn, $sql);

    }
    $db->close($conn);

    die("{success:true, message: \"Edit data guru berhasil.\"}");
?>