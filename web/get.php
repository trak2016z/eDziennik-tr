<?php

require_once("config.php");
require_once("loader.php");
$table = $_POST['table'];
$databaseHandle = Database::getInstance();
switch($table) {
    case 'teacher':         $result = $databaseHandle->selectData("SELECT * FROM `teacher` WHERE type <> 1");
                            echo json_encode($result); break;
    case 'subject':         $result = $databaseHandle->selectData("SELECT * FROM `subject`");
                            echo json_encode($result); break;
    case 'group':           $result = $databaseHandle->selectData("SELECT * FROM `group`");
                            echo json_encode($result); break;
    case 'note_category':   $result = $databaseHandle->selectData("SELECT * FROM `note_category`");
                            echo json_encode($result); break;
}

?>