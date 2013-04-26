<?php
    session_start();

    //print_r($_SESSION['akses']);
    
    if(empty($_SESSION["akses"]))
        die("{\"totalCount\":\"0\", \"topics\":\"\"}");

    $total = 0;
    foreach($_SESSION['akses'] as $iduser => $array_1) {
        foreach($array_1 as $namauser => $array_2) {
            $i=0; $result = ",\"topics\":[";
            foreach($array_2 as $idgrup => $array_3) {
                $total += count($array_3);
                foreach($array_3 as $idmodul => $akses) {
                    $result .= ($i>0?",\n":"") . "{" .
                        "\"tipe\":\"" . $_SESSION["tipe"] . "\", " .
                        "\"iduser\":\"$iduser\", " .
                        "\"namauser\":\"$namauser\", " .
                        "\"idgrup\":\"$idgrup\", " .
                        "\"idmodul\":\"$idmodul\", " .
                        "\"akses\":\"$akses\"}";
                    $i++;
                }
            }
            $result .= "]";
        }
    }
    die("{\"totalCount\":\"$total\"$result}");
?>