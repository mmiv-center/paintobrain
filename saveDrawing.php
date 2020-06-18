<?php

 $datadir = "/var/www/data";
 $points = [];
 if (isset($_POST['points'])) {
    $points = json_decode($_POST['points'], TRUE);
 } else {
    echo("{ \"message\": \"Nothing is saved\" }");
    return;
 }

 $path = $datadir.'/drawing_'.date('m-d-Y_hia').'_'.uniqid();
 $image = "";
 if (isset($_POST['image'])) {
   $data = $_POST['image'];
   $file = $path.".png";
   $uri = substr($data,strpos($data, ",") + 1);

   file_put_contents($file, base64_decode($uri));
 }

 file_put_contents($path.'.txt', json_encode($points));

?>