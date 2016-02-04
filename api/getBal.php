 <?php
 header("Access-Control-Allow-Origin: *");

 extract($_REQUEST);



 $resp = file_get_contents("https://chaintrader.co/api/v1/balance?address=".$wallet);


echo($resp);


 ?>

