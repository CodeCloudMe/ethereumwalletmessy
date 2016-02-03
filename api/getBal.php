 <?php
 header("Access-Control-Allow-Origin: *");

 extract($_REQUEST);



 $resp = file_get_contents("https://www.etherchain.org/api/account/".$wallet);


echo($resp);


 ?>

