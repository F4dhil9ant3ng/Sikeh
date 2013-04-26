<?php
session_start();

class koneksi{

    var $db_host;
    var $db_user;
    var $db_pass;
    var $field;
    var $db_name;
   
    private $perintah;
    private $table;
    private $loop;
    
    public $tabelDB ;
    public $fieldArr ;
    
    public function koneksi($db_hostparam="",$db_uidparam="",$db_pwdparam="",$db_nameparam="") {
        $this->db_host = $db_hostparam;
        $this->db_user = $db_uidparam;
        $this->db_pass = $db_pwdparam;
        $this->db_name = $db_nameparam;
    }
		
    public function connect() {
        $this->conn = @mysql_pconnect($this->db_host, $this->db_user, $this->db_pass, true);
        if($this->conn)
            if(@mysql_select_db($this->db_name, $this->conn))
                return $this->conn;

        die('Error Connection: ' . mysql_error());
    }

    public function close($conn) {
        $return = @mysql_close($conn);
        unset($conn);
        return $return;
    }

    public function query($sql, &$rec_count, &$data){
	$result = @mysql_query($sql);

        if ($result ) {
            $rec_count = @mysql_num_rows($result);
            $data = array();

            if ($rec_count > 0)
                while ($row = @mysql_fetch_array($result, MYSQL_ASSOC))
                    array_push($data, $row);

            @mysql_free_result($result);
            unset($result);

            return true;
        }

        die('Invalid SQL command : ' . $sql . '<br><br>' . mysql_error());
    }
		
     public function execute($conn, $sql) {
        $result = @mysql_query($sql, $conn);

        if($result == 0) {
            if(strpos(mysql_error(), "command denied to user") !== false)
                die('{success:false, message:"Data dalam keadaan arsip!"}');
            die('Invalid SQL command : ' . $sql . '<br><br>' . mysql_error());
        }else
            return mysql_affected_rows();
    }
        
    public function SQLupdateData($dataArr,$cozArr, $escapequote='') {

    	$query = "UPDATE ".$this->tabelDB." SET " ;
    	foreach($dataArr as $item => $value )
    		$query .= "".$item."=" . ($item==$escapequote?"$value":"'$value'") . ", " ;
    	
    	$query = rtrim($query,', ') ;
    	$query .= " WHERE ";
    	
    	for($i=0;$i< count($cozArr) ;$i++)
            $query .= "".$cozArr[$i]['fieldTbl']."='".$cozArr[$i]['content']."' ".$cozArr[$i]['operator']." ";

    	return $query ;	
    }	
    
    public function SQLinsertData($escapequote='') {
    	$query = "INSERT INTO ".$this->tabelDB." SET ";
    	$fieldArr = $this->fieldArr ;
    	foreach($fieldArr as $item => $value )
    		$query .= "".$item."=" . ($item==$escapequote?"$value":"'$value'") . ", " ;
    	
    	$query = rtrim($query,', ') ;
    	return $query ;
    }

    public function isValidLimitFormat($format, $kodepajak, $maxlength=10) {

        return (strlen($this->createNo($format, $kodepajak, "", "", true))<=$maxlength);
    }

    public function createNoTrx($kode, $field, $table, $pajak=false) {
        $sql = "SELECT format,kodepajak FROM format_transaksi WHERE id='$kode'";
        $this->query($sql, $rs_num, $rs);
        if($rs_num==0) return $this->increment("0000", "", $field, $table);

        return $this->createNo($rs[0]["format"], $rs[0]["kodepajak"], $field, $table, $pajak);
    }

    public function createNo($format, $kodepajak, $field, $table, $pajak=false) {

        $noTrx = "";
        $temp = explode("}", $format);
        for($i=0; $i<count($temp); $i++) {
            $temps=explode ("{", $temp[$i]);
            for($p=0; $p<count($temps); $p++) {

                if($p>0 && $p==(count($temps)-1))
                    $noTrx .= strtolower($temps[$p])=="kodepajak"?($pajak?$kodepajak:""):$this->increment($temps[$p], $noTrx, $field, $table);
                else
                    $noTrx .= ($p>0?"{":"") . $temps[$p] . (strlen($temp[i])>0 && (count($temps)-1)==0?"}":"");
            }
        }

        return  $noTrx;

    }

    public function increment($kode, $noTrx, $field, $table) {

        for($x=0; $x<strlen($kode); $x++)
            if($kode[$x]!="0") return "{" . $kode. "}";

        if(strlen($field)==0 && strlen($table)==0) return $kode;

        $sql = "SELECT MAX(SUBSTRING($field," . (strlen($noTrx)+1) . "," . strlen($kode) . "))+1 AS LAST " .
               "FROM $table";
        $this->query($sql, $rs_num, $rs);
        $last = (isset($rs[0]["LAST"])?$rs[0]["LAST"]:'1');

        for($i=0;$i<(strlen($kode)-strlen($last));$i++) $no .= "0";
        $no .= $last;

        return  $no;
    }

    public function cekTutupTransaksi($nosumber) {
        if(strlen($nosumber)==0) return;

        $temp = explode(",", $nosumber);
        foreach($temp as $i => $nopeng) {
            $sql = "UPDATE " . $this->tblSumber . " SET is_close=IF((SELECT SUM(qty) " .
                   "FROM " . $this->tblDetailSumber . " WHERE " . $this->fldNotrxSumber . "='$nopeng')<=" .
                   "(SELECT SUM(qty) FROM " . $this->tblTransaksi . " WHERE nosumber=" .
                   "'$nopeng'),'Y','N') WHERE " . $this->fldNotrxSumber . "='$nopeng'";
            $this->execute($this->conn, $sql);
        }
    }

    public function buatOrder() {
        $maxlevel = 5;
        $leading = '-000';
        
        $sql = "SELECT COUNT($this->field) AS TOTAL, MAX($this->field) AS LAST FROM $this->tables WHERE 1";
        foreach($this->filter_and as $field => $kondisi) $sql .= " AND $field='$kondisi'";
        foreach($this->filter_or as $field => $kondisi) $sql .= " OR $field='$kondisi'";
        $this->query($sql, $rs_num, $rs);
        if(!isset($rs[0]["LAST"])) return '001' . str_repeat($leading, $maxlevel-1);

        $oldLast = substr($rs[0]["LAST"], 0, strpos($rs[0]["LAST"], $leading));
        $oldLast = strlen($oldLast)>0?$oldLast:$rs[0]["LAST"];
        $tmpLast = explode('-', $oldLast);

        $newLast = $oldLast . '-001';
        if($rs[0]["TOTAL"]>1 OR strlen($kondisi)==0) {
            $befLast = $tmpLast[count($tmpLast)-1];
            $newLast = $tmpLast[count($tmpLast)-1]+1;
            $oldLast = substr($oldLast, 0, strrpos($oldLast, '-' . $befLast));
            $newLast = $oldLast . (strlen($oldLast)>0?'-':'') . str_repeat("0", 3-strlen($newLast)) . $newLast;            
        }       
        return  $newLast . str_repeat($leading, $maxlevel-count($tmpLast)-($rs[0]["TOTAL"]==1 AND strlen($kondisi)>0));
    }

     public function getQtyCetak($table, $field, $notrx) {
        $sql = "SELECT qtyCetak FROM $table WHERE $field='$notrx'";
        $this->query($sql, $rs_num, $rs);

        return $rs[0]["qtyCetak"];
     }

     public function copyDatabase($source_db, $new_db) {


        @mysql_select_db($source_db, $this->conn);

        $sql = "SHOW TABLES";
        $this->query($sql, $rs_num, $table_names);

        $sql = "CREATE DATABASE `$new_db`";
        $this->execute($this->conn, $sql);

        @mysql_select_db($new_db, $this->conn);

	for($i=0;$i<count($table_names);$i++) {
            $this->execute($this->conn, "CREATE TABLE ". $table_names[$i]["Tables_in_$source_db"] . " LIKE `$source_db`." . $table_names[$i]["Tables_in_$source_db"]);
            $this->execute($this->conn, "INSERT INTO " . $table_names[$i]["Tables_in_$source_db"] . " " .
                "SELECT * FROM `$source_db`." . $table_names[$i]["Tables_in_$source_db"]);
        }


	
        //@mysql_select_db($this->db_name, $this->conn);
    }


}

function currencyFormat($str) {
//    return number_format($str, 0, '.', ',');

    $number = explode(".",$str);

    return number_format($number[0]) . ($number[1]?("." . $number[1]):"");
}

function diskonFormat($str) {

    $number = explode("+",$str);

    $result="";
    for($i=0; $i<count($number); $i++)
        $result .= ($i>0?"+":"") . currencyFormat(str_replace("%", "", $number[$i])) .
            (strpos($number[$i], "%")?"%":"");

    return $result;
}

function konversiTanggal($str) {

    if (strlen($str)==0) return "";

    $temp = explode("-",$str);
    return $temp[2] . "-" . $temp[1] . "-" . $temp[0];

}

?>