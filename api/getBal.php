 <?php
 header("Access-Control-Allow-Origin: *");

 extract($_REQUEST);



 $resp = file_get_contents("https://www.etherchain.org/api/account/0x9f279537c0d9acf278abd1d28e4b67d1ab2450fd");


echo($resp);


 ?>

