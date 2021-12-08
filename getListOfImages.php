<?php

$action = "get";

$dataPath = "data";
$data = array();
if ($action == "get") {
    $files = glob($dataPath."/*.txt");
    foreach($files as $file) {
        //syslog(LOG_EMERG, json_encode($file));
        $data[] = basename($file);
    }
}
echo(json_encode($data));
?>
