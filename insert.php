<?php

require_once("config.php");
require_once("loader.php");
$table = $_POST['table'];
$databaseHandle = Database::getInstance();
switch($table) {
    case 'subject':         $result = $databaseHandle->insertData('subject', $_POST['data']);
                            $insertedSubject = $databaseHandle->selectData("SELECT * FROM `subject` ORDER BY ID DESC LIMIT 1");
                            echo json_encode($insertedSubject); break;
    case 'group':           $result = $databaseHandle->insertData('group', $_POST['data']);
                            $insertedGroup = $databaseHandle->selectData("SELECT * FROM `group` ORDER BY ID DESC LIMIT 1");
                            echo json_encode($insertedGroup); break;
    case 'note_category':   $result = $databaseHandle->insertData('note_category', $_POST['data']);
                            $insertedNoteCategory = $databaseHandle->selectData("SELECT * FROM `note_category` ORDER BY ID DESC LIMIT 1");
                            echo json_encode($insertedNoteCategory); break;
    case 'student':         $result = $databaseHandle->insertData('student', $_POST['data']);
                            $insertedStudent = $databaseHandle->selectData("SELECT * FROM `student` ORDER BY ID DESC LIMIT 1");
                            echo json_encode($insertedStudent); break;
    case 'subject_teacher': $result = $databaseHandle->insertData('subject_teacher', $_POST['data']);
                            $insertedSubject = $databaseHandle->selectData("SELECT st.ID, st.subject_ID, st.teacher_ID, s.name as subjectName , t.name as
                            teacherName, t.surname as teacherSurname FROM
                            `subject_teacher` st JOIN `teacher` t ON st.teacher_ID = t.ID JOIN `subject` s ON st.subject_ID = s.ID ORDER BY ID DESC LIMIT 1");
                            echo json_encode($insertedSubject); break;
    case 'note':            $result = $databaseHandle->insertData('note', $_POST['data']);
                            //$insertedNote = $databaseHandle->selectData("SELECT * FROM `note` ORDER BY ID DESC LIMIT 1");
                            echo json_encode($result); break;
}


?>