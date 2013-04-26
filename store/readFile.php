<?php

    session_start();

    $file = realpath("../") . "/reports/perusahaan/report/temp/" . $_GET["name"] . "." . $_GET["ext"];

    
    if (file_exists($file)) {
        if($_GET["ext"]=="xls") {
            header('Content-Description: File Transfer');
            header('Content-Type: application/octet-stream');
            header('Content-Disposition: attachment; filename='.basename($file));
            header('Content-Transfer-Encoding: binary');
            header('Expires: 0');
            header('Cache-Control: must-revalidate');
            header('Pragma: public');
            header('Content-Length: ' . filesize($file));
            ob_clean();
            flush();
            readfile($file);
            unlink($file);
        } else {
            header('Content-Type: text/html; charset=iso-8859-1');
            header('Content-Type: text/html; charset=utf-8');
            if($_GET["ext"]=="pdf") header("Content-type: application/pdf");
            readfile($file);
            unlink($file);
        }
    }
?>