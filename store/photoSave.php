<?php
        
    $gambar = NULL;
    if (!empty($_FILES["filename"]))
        if ($_FILES["filename"]['error'] > 0)
            die("{success:false, message: \"Kelsalahan file.\"}");

    $file=$_FILES["filename"];
    $upload_directory=realpath(dirname(__FILE__)) . "/";
    $ext_str = "jpg,png,gif,bmp";
    $allowed_extensions=explode(',',$ext_str);
    $max_file_size = 1024*64; //remember 1024bytes =1kbytes
    $overwrite_file = true;

    /* check allowed extensions here */
    $ext = substr($file['name'], strrpos($file['name'], '.') + 1); //get file extension from last sub string from last . character
    if (!in_array(strtolower($ext), $allowed_extensions))
        die("{success:false, message: \"Haya file yang berekstensi '" . $ext_str . "' yang bisa di upload\"}"); // exit the script by warning

    /* check file size of the file if it exceeds the specified size warn user */
    if($file['size']>=$max_file_size)
        die("{success:false, message: \"Ukuran file tidak boleh melebihi  " . $max_file_size/1024 . "kb.\"}"); // exit the script by warning

//    /* check if the file already exists or not in the upload directory */
//    if(!$overwrite_file and file_exists($upload_directory.$file['name']))
//        die("{success:false, message: \"the file " . $file['name'] . " already exists.\"}"); // exit the script by warning
//
//    if(!move_uploaded_file($file['tmp_name'],$upload_directory.$file['name']))
//        die("{success:false, message: \"File gagal diupload.\"}"); //file can't moved with unknown reasons likr cleaning of server temperory files cleaning

//    $instr = fopen($upload_directory.$file['name'],"rb");
//    $gambar = addslashes(fread($instr,filesize($upload_directory.$file['name'])));
//    fclose($instr);
//    unlink($upload_directory.$file['name']);

    include "../php/mysql.db.php";
    $db = new koneksi();

    include "../php/DB_init.php";
    $conn = $db->connect();
    $imgData =addslashes(file_get_contents($_FILES['filename']['tmp_name']));

    $session_id = session_id();
    $sql = "DELETE FROM temp_photo WHERE session_id='$session_id'";
    //die("{success:false, message: \"$sql\"}");
    $db->execute($conn, $sql);

    $sql = strlen($_POST["session_id"])>0?"UPDATE temp_photo SET temp_photo='{$imgData}' WHERE session_id='" . $_POST["session_id"] . "'":
           "INSERT INTO temp_photo VALUES('$session_id','{$imgData}')";
    //die("{success:false, message: \"$sql\"}");
    $db->execute($conn, $sql);
    $db->close($conn);

    die("{success:true, session_id: '$session_id'}");

?>