<?php
    //die(print_r($_POST));
    include "../../php/mysql.db.php";
    $db = new koneksi();

    include "../../php/DB_init.php";
    $conn = $db->connect();

    $idgrup = isset($_POST["idgrup"])?$_POST["idgrup"]:"";
    $iduser = isset($_POST["iduser"])?$_POST["iduser"]:"";

    $sql = "SELECT A.kode AS idmodul,B.nama AS kelompok," . (strlen($idgrup)>0 || strlen($iduser)>0?
           ("(SELECT akses FROM " . (strlen($idgrup)>0?"grup":"user") . "_modul_akses WHERE idmodul=A.kode " . 
           "AND id" . (strlen($idgrup)>0?"grup":"user") . "=" . (strlen($idgrup)>0?$idgrup:$iduser) . ") " .
           "AS akses,"):"") . "A.nama AS keterangan FROM modul AS A,kelompok_modul AS B WHERE A.kelompok=B.kode " .
           "ORDER BY A.kelompok";
    //die($sql);
    $db->query($sql, $rec_num, $rs);
    $db->close($conn);

    $result="{\"totalCount\":\"1\", \"topics\":\"\"}";
    if($rec_num>0) {
        $result = "{\"totalCount\":\"$rec_num\",\"topics\":[";
        for($i=0; $i<$rec_num; $i++) {
            $result .= ($i>0?",\n":"") . "{" .
                "\"idmodul\":\"" . $rs[$i]["idmodul"] . "\", " .
                "\"kelompok\":\"" . $rs[$i]["kelompok"] . "\", " .
                "\"tambah\":\"" . (isset($rs[$i]["akses"])?$rs[$i]["akses"][0]=="Y":false) . "\", " .
                "\"edit\":\"" . (isset($rs[$i]["akses"])?$rs[$i]["akses"][1]=="Y":false) . "\", " .
                "\"hapus\":\"" . (isset($rs[$i]["akses"])?$rs[$i]["akses"][2]=="Y":false) . "\", " .
                "\"approve\":\"" . (isset($rs[$i]["akses"])?$rs[$i]["akses"][3]=="Y":false) . "\", " .
                "\"cetak\":\"" . (isset($rs[$i]["akses"])?$rs[$i]["akses"][4]=="Y":false) . "\", " .
                "\"view\":\"" . (isset($rs[$i]["akses"])?$rs[$i]["akses"][5]=="Y":false) . "\", " .
                "\"keterangan\":\"" . $rs[$i]["keterangan"] . "\"}";
        }
        $result .= "]}";
    }
    die($result);
?>