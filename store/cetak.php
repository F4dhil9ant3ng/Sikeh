<?php

    //Ignore the user's abort (which we caused with the redirect).
    ignore_user_abort(true);

    //Extend time limit to 30 minutes
    set_time_limit(1800);

    //Extend memory limit to 10MB
    ini_set("memory_limit","10M");


    //die(print_r($_POST));
    include "../php/mysql.db.php";
    include "../php/jasperreport.php";
    
    $filename = $_POST["report_path"];
    $dari = isset($_POST["dari"])?konversiTanggal($_POST["dari"]):"";
    $sd = isset($_POST["sd"])?konversiTanggal($_POST["sd"]):"";
    $query = isset($_POST["query"])?$_POST["query"]:"";

    $params = array("DARI" => $dari, "SD" => $sd, "QUERY" => $query);
    $db = new koneksi();
    include "../php/DB_init.php";
    $report = new jasperreport();
    $db->close($conn);

    $report->root = "../";
    $report->filename = $filename;
    //$report->url      = $db->url;
    $report->db_host  = $db->db_host;
    $report->db_user  = $db->db_user;
    $report->db_pass  = $db->db_pass;
    $report->db_name  = $db->db_name;
    $report->params   = $params;
    $report->extFile  = $_POST["tipelap"];
    $report->idperusahaan = "report";

    $report->checkJavaExtension();

    die("{success:true, filename: \"" . $report->create_report_2() . "\", fileext: \"$report->extFile\"}");
    
?>
