<?php

require_once("config.php");
require_once("loader.php");
$table = $_POST['table'];
$databaseHandle = Database::getInstance();
switch($table) {
    case 'subject':       $result = $databaseHandle->delete('subject', $_POST['data'], $_POST['operator']);
                          echo json_encode($result); break;
    case 'group':         $result = $databaseHandle->delete('group', $_POST['data'], $_POST['operator']);
                          echo json_encode($result); break;
    case 'note_category': $result = $databaseHandle->delete('note_category', $_POST['data'], $_POST['operator']);
                          echo json_encode($result); break;
}


?>