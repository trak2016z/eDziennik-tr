<?php

require_once("config.php");
require_once("loader.php");
$table = $_POST['table'];
$databaseHandle = Database::getInstance();
switch($table) {
    case 'teacher':         $result = $databaseHandle->updateData('teacher', $_POST['set'], $_POST['id'], $_POST['operator']);
                            echo json_encode($result); break;
    case 'subject':         $result = $databaseHandle->updateData('subject', $_POST['set'], $_POST['id'], $_POST['operator']);
                            echo json_encode($result); break;
    case 'group':           $result = $databaseHandle->updateData('group', $_POST['set'], $_POST['id'], $_POST['operator']);
                            echo json_encode($_POST); break;
    case 'note_category':   $result = $databaseHandle->updateData('note_category', $_POST['set'], $_POST['id'], $_POST['operator']);
                            echo json_encode($result); break;
    case 'student':         $result = $databaseHandle->updateData('student', $_POST['set'], $_POST['id'], $_POST['operator']);
                            echo json_encode($result); break;
    case 'subject_teacher': $result = $databaseHandle->updateData('subject_teacher', $_POST['set'], $_POST['id'], $_POST['operator']);
                            echo json_encode($result); break;
    case 'note':            $result = $databaseHandle->updateData('note', $_POST['set'], $_POST['id'], $_POST['operator']);
                            echo json_encode($result); break;
};





?>