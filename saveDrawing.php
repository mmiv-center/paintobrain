<?php

 $datadir = "/var/www/data";
 $points = [];
 if (isset($_POST['points'])) {
    $points = json_decode($_POST['points'], TRUE);
 } else {
    echo("{ \"message\": \"Nothing is saved\" }");
    return;
 }
 file_put_contents($datadir.'/drawing_'.date('m-d-Y_hia').'_'.uniqid().'.txt', json_encode($points));

?>