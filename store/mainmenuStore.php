<?php
    //die(print_r($_POST));
    include "../php/mysql.db.php";
    $db = new koneksi();

    include "../php/DB_init.php";
    $conn = $db->connect();

    if(!isset($_SESSION["iduser"])) die();

    $sql = "SELECT A.modul, A.kode AS idmodul,B.nama AS kelompok,A.nama AS keterangan, B.kode AS kodes, " .
           "A.akses AS aksesm, A.iconCls,B.iconCls AS pIconCls FROM modul AS A,kelompok_modul AS B,user_modul_akses AS C WHERE " .
           "A.kelompok=B.kode AND A.kode=C.idmodul AND C.iduser='" . $_SESSION["iduser"] . "' " .
           "ORDER BY B.kode, A.no";
    //die($sql);
    $db->query($sql, $rec_num, $rs);
    $db->close($conn);

    $result = "";
    if($rec_num>0) {
        $result = "{\"text\": \"root\", \"children\": [";
        
        $kode = "";
        for($i=0; $i<$rec_num; $i++) {
            if($kode!=$rs[$i]["kodes"]) {
                //PARENT[0]
                $result .= ($i>0?"]},\n":"") . "{" .
                    "\"keterangan\": \"<B>" . $rs[$i]["kelompok"] . "</B>\"," .
                    "\"iconCls\":\"" . $rs[$i]["pIconCls"] . "\"," .
                    "\"leaf\": false," .
                    "\"expanded\": true," .
                    "\"children\": [";
                $y = 0;
            }
            
            //PARENT[1]
            $result .= ($y>0?",\n":"") . "{" .
                "\"idmodul\":\"" . $rs[$i]["idmodul"] . "\", " .
                "\"keterangan\":\"" . $rs[$i]["keterangan"] . "\", " .
                "\"modul\":\"" . $rs[$i]["modul"] . "\", " .
                "\"iconCls\":\"" . $rs[$i]["iconCls"] . "\"," .
                "\"leaf\": true}";
                
            $y++;
            $kode=$rs[$i]["kodes"];
        }
        $result .= "]}]}";
    }
    die($result);
?>