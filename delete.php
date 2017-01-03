<?php

require_once("config.php");
require_once("loader.php");
$table = $_POST['table'];
$databaseHandle = Database::getInstance();
switch($table) {
    case 'subject':         $result = $databaseHandle->delete('subject', $_POST['data'], $_POST['operator']);
                            echo json_encode($result); break;
    case 'group':           $result = $databaseHandle->delete('group', $_POST['data'], $_POST['operator']);
                            echo json_encode($result); break;
    case 'note_category':   $result = $databaseHandle->delete('note_category', $_POST['data'], $_POST['operator']);
                            echo json_encode($result); break;
    case 'student':         $result = $databaseHandle->delete('student', $_POST['data'], $_POST['operator']);
                            echo json_encode($result); break;
    case 'subject_teacher': $result = $databaseHandle->delete('subject_teacher', $_POST['data'], $_POST['operator']);
                            echo json_encode($result); break;
    case 'note':            $result = $databaseHandle->delete('note', $_POST['data'], $_POST['operator']);
                            echo json_encode($result); break;
}


?>