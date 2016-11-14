<?php

require_once("config.php");
require_once("loader.php");
$table = $_POST['table'];
$databaseHandle = Database::getInstance();
switch($table) {
    case 'subject':       $result = $databaseHandle->insertData('subject', $_POST['data']);
                          $insertedSubject = $databaseHandle->selectData("SELECT * FROM `subject` ORDER BY ID DESC LIMIT 1");
                          echo json_encode($insertedSubject); break;
    case 'group':         $result = $databaseHandle->insertData('group', $_POST['data']);
                          $insertedGroup = $databaseHandle->selectData("SELECT * FROM `group` ORDER BY ID DESC LIMIT 1");
                          echo json_encode($insertedGroup); break;
    case 'note_category': $result = $databaseHandle->insertData('note_category', $_POST['data']);
                          $insertedNoteCategory = $databaseHandle->selectData("SELECT * FROM `note_category` ORDER BY ID DESC LIMIT 1");
                          echo json_encode($insertedNoteCategory); break;
}


?>