<?php
    include "../../php/mysql.db.php";
    $db = new koneksi();

    include "../../php/DB_init.php";
    $conn = $db->connect();
    
    $id  = $_POST["no"];
    
    $sql = "SELECT *,DATE_FORMAT(tgl_lahir,'%d-%m-%Y') AS tgl_lahir," .
           "IF(tgl_lulus<>'0000-00-00',DATE_FORMAT(tgl_lulus,'%d-%m-%Y'),'') AS tgl_sukses, " .
           "IF(tmt<>'0000-00-00',DATE_FORMAT(tmt,'%d-%m-%Y'),'') AS tgl_tugas, " .
           "IF(tgl_pensiun<>'0000-00-00',DATE_FORMAT(tgl_pensiun,'%d-%m-%Y'),'') AS tgl_selesai " .
           "FROM guru WHERE no='$id'";
    $db->query($sql, $rec_num, $rs);
    $db->close($conn);
    
    die("{\"total\":1,"
            . "\"results\":[{"
            . "\"noedit\":\"" . $rs[0]["no"] . "\","
            . "\"no\":\"" . $rs[0]["no"] . "\","
            . "\"nama\":\"" . $rs[0]["nama"] . "\","
            . "\"nuptk\":\"" . $rs[0]["nuptk"] . "\","
            . "\"kelamin\":\"" . $rs[0]["jk"] . "\","
            . "\"tptlahir\":\"" . $rs[0]["tpt_lahir"] . "\","
            . "\"tgllahir\":\"" . $rs[0]["tgl_lahir"] . "\","
            . "\"agama\":\"" . $rs[0]["agama"] . "\","
            . "\"goldarah\":\"" . $rs[0]["gol_darah"] . "\","
            . "\"alamat1\":\"" . $rs[0]["alamat1"] . "\","
            . "\"alamat2\":\"" . $rs[0]["alamat2"] . "\","
            . "\"telepon\":\"" . $rs[0]["telp"] . "\","
            . "\"hp\":\"" . $rs[0]["hp"] . "\","
                        
            . "\"pendidikan\":\"" . $rs[0]["pendidikan"] . "\","
            . "\"tgllulus\":\"" . $rs[0]["tgl_sukses"] . "\","
            . "\"pegawai\":\"" . $rs[0]["status_pegawai"] . "\","
            . "\"status\":\"" . $rs[0]["status"] . "\","
            . "\"tmt\":\"" . $rs[0]["tgl_tugas"] . "\","
            . "\"tglselesai\":\"" . $rs[0]["tgl_selesai"] . "\""
        . "}]}");
?>