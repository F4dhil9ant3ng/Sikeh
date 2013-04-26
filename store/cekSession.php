<?php
    session_start();

    if(isset($_POST["first"])) unset($_SESSION["arsip"]);
    die("{success: " .(empty($_SESSION["akses"])?"false":"true") . "}");
?>
