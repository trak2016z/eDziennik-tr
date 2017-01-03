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
        case 'group':           if(Data::getData("type") == 1)
                                    $result = $databaseHandle->selectData("SELECT * FROM `group`");
                                else
                                    $result = $databaseHandle->selectData("SELECT * FROM `group` g JOIN `subject_teacher` st ON g.ID = st.group_ID WHERE
                                    st.teacher_ID = {$_POST['teacher_ID']}");
                                echo json_encode($result); break;
        case 'note_category':   $teacherId = Data::getData('teacherId');
                                if($teacherId)
                                    $result = $databaseHandle->selectData("SELECT * FROM `note_category` WHERE teacher_ID = {$teacherId}");
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
else if($action)
    switch($action) {
        case 'checkLogin':              $logins = $databaseHandle->selectData("SELECT login FROM `student` WHERE login = '{$_POST['login']}'");
                                        if(!is_array($logins)) {
                                            $logins = $databaseHandle->selectData("SELECT login FROM `teacher` WHERE login = '{$_POST['login']}'");
                                            if(!is_array($logins)) {
                                                echo json_encode(true);
                                            }
                                            else
                                                echo json_encode(false);
                                        }
                                        else
                                            echo json_encode(false);
                                        break;
        case 'checkSubjectName':        if(!empty(Data::getData('subjectId')))
                                            $subjectName = $databaseHandle->selectData("SELECT name FROM `subject` WHERE name = '{$_POST['name']}'
                                        AND ID <> {$_POST['subjectId']}");
                                        else
                                            $subjectName = $databaseHandle->selectData("SELECT name FROM `subject` WHERE name = '{$_POST['name']}'");
                                        if(!is_array($subjectName)) {
                                            echo json_encode(true);
                                        }
                                        else
                                            echo json_encode(false);
                                        break;
        case 'checkGroupName':          if(!empty(Data::getData('groupId')))
                                            $groupName = $databaseHandle->selectData("SELECT name FROM `group` WHERE name = '{$_POST['name']}'
                                        AND ID <> {$_POST['groupId']}");
                                        else
                                            $groupName = $databaseHandle->selectData("SELECT name FROM `group` WHERE name = '{$_POST['name']}'");
                                        if(!is_array($groupName)) {
                                            echo json_encode(true);
                                        }
                                        else
                                            echo json_encode(false);
                                        break;
        case 'checkNoteCategoryName':   if(!empty(Data::getData('noteCategoryId')))
                                            $noteCategoryName = $databaseHandle->selectData("SELECT name FROM `note_category` WHERE name = '{$_POST['name']}'
                                            AND ID <> {$_POST['noteCategoryId']} AND teacher_ID = {$_POST['teacherId']}");
                                        else
                                            $noteCategoryName = $databaseHandle->selectData("SELECT name FROM `note_category` WHERE name = '{$_POST['name']}'
                                            AND teacher_ID = {$_POST['teacherId']}");
                                        if(!is_array($noteCategoryName)) {
                                            echo json_encode(true);
                                        }
                                        else
                                            echo json_encode(false);
                                        break;
        case 'checkGroupSubject':       if(!empty(Data::getData('id')))
                                            $groupSubject = $databaseHandle->selectData("SELECT ID FROM `subject_teacher` WHERE subject_ID = '{$_POST['subjectId']}'
                                             AND group_ID = {$_POST['groupId']} AND ID <> {$_POST['id']}");
                                        else
                                            $groupSubject = $databaseHandle->selectData("SELECT ID FROM `subject_teacher` WHERE subject_ID = '{$_POST['subjectId']}'
                                             AND group_ID = {$_POST['groupId']}");
                                        if(!is_array($groupSubject)) {
                                            echo json_encode(true);
                                        }
                                        else
                                            echo json_encode(false);
                                        break;
        case 'checkPassword':           if(!empty(Data::getData('password'))&&!empty(Data::getData('studentId')))
                                            $result = $databaseHandle->selectData("SELECT password FROM `student` WHERE ID = '{$_POST['studentId']}'");
                                        if($result[0]['password'] !== Data::getData('password')) {
                                            echo json_encode(true);
                                        }
                                        else
                                            echo json_encode(false);
                                        break;
        case 'getStudentSubjects':      $result = $databaseHandle->selectData("SELECT s.ID, s.name FROM `subject` s JOIN `subject_teacher` st ON
                                        s.ID = st.subject_ID WHERE st.group_ID = '{$_POST['group_ID']}'");
                                        echo json_encode($result);
                                        break;
        case 'getStudentNotes':         $result = $databaseHandle->selectData("SELECT n.note, nc.name as categoryName FROM `note` n JOIN `note_category` nc ON
                                        n.category_ID = nc.ID WHERE n.student_ID = '{$_POST['student_ID']}' AND n.subject_ID = '{$_POST['subject_ID']}'");
                                        echo json_encode($result);
                                        break;

    }



?>