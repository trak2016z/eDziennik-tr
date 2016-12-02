<?php

require_once("config.php");
require_once("loader.php");
$table = Data::getData('table');
$action = Data::getData('action');
$databaseHandle = Database::getInstance();
if($table)
    switch($table) {
        case 'teacher':         $result = $databaseHandle->selectData("SELECT * FROM `teacher` WHERE type <> 1");
                                echo json_encode($result); break;
        case 'subject':         $result = $databaseHandle->selectData("SELECT * FROM `subject`");
                                echo json_encode($result); break;
        case 'group':           $result = $databaseHandle->selectData("SELECT * FROM `group`");
                                echo json_encode($result); break;
        case 'note_category':   $teacherId = Data::getData('teacherId');
                                if($teacherId)
                                    $result = $databaseHandle->selectData("SELECT * FROM `note_category` WHERE teacher_ID = {$teacherId}");
                              //  else
                                 //   $result = $databaseHandle->selectData("SELECT * FROM `note_category`");
                                echo json_encode($result); break;
        case 'student':         $result = $databaseHandle->selectData("SELECT * FROM `student` WHERE group_ID = {$_POST['group_ID']}");
                                echo json_encode($result); break;
        case 'subject_teacher': $result = $databaseHandle->selectData("SELECT st.ID, st.subject_ID, st.teacher_ID, s.name as subjectName , t.name as teacherName,
                                t.surname as teacherSurname FROM `subject_teacher` st JOIN `teacher` t ON st.teacher_ID = t.ID JOIN `subject` s ON
                                st.subject_ID = s.ID WHERE st.group_ID = {$_POST['groupId']}");
                                echo json_encode($result); break;
        case 'note':            $result = $databaseHandle->selectData("SELECT n.ID, n.note, n.category_ID, nc.name FROM `note` n JOIN `note_category` nc ON n.category_ID =
                                nc.ID WHERE n.subject_ID = {$_POST['subjectId']} AND n.student_ID = {$_POST['studentId']}");
                                echo json_encode($result); break;
    }
else if($action == 'checkLogin') {
    $logins = $databaseHandle->selectData("SELECT login FROM `student` WHERE login = '{$_POST['data']['login']}'");
    if(!is_array($logins)) {
        $logins = $databaseHandle->selectData("SELECT login FROM `teacher` WHERE login = '{$_POST['data']['login']}'");
        if(!is_array($logins)) {
            echo json_encode(true);
        }
        else
            echo json_encode(false);
    }
    else
        echo json_encode(false);
}

?>