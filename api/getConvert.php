 <?php
 header("Access-Control-Allow-Origin: *");

 extract($_REQUEST);



 $resp = file_get_contents("https://www.cryptonator.com/api/ticker/eth-usd");


echo($resp);


 ?>


