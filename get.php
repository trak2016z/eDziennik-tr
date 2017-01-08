<?php

require_once("config.php");
require_once("loader.php");

$table = Data::getData('table');
$action = Data::getData('action');

if($table)
    switch($table) {
        case 'teacher':         TeachersController::getAllTeachers();
                                break;
        case 'subject':         SubjectsController::getAllSubjects();
                                break;
        case 'group':           if(Data::getData("type") == 1)
                                    GroupsController::getAllGroups();
                                else {
                                    $teacherId = Data::getData('teacherId');
                                    GroupsController::getTeacherGroups($teacherId);
                                }
                                break;
        case 'note_category':   $teacherId = Data::getData('teacherId');
                                NoteCategoriesController::getNoteCategoryByTeacher($teacherId);
                                break;
        case 'student':         $groupId = Data::getData('group_ID');
                                GroupStudentsController::getStudentsByGroup($groupId);
                                break;
        case 'subject_teacher': $groupId = Data::getData('groupId');
                                GroupSubjectsController::getGroupSubjects($groupId);
                                break;
        case 'group_notes':     $studentId = Data::getData("studentId");
                                $subjectId = Data::getData("subjectId");
                                GroupNotesController::getSubjectNotesByStudent($studentId, $subjectId);
                                break;
        case 'student_subjects':$groupId = Data::getData("groupId");
                                GroupSubjectsController::getStudentSubjects($groupId);
                                break;
        case 'student_notes':   $studentId = Data::getData("studentId");
                                $subjectId = Data::getData("subjectId");
                                StudentNotesController::getStudentNotesBySubject($studentId, $subjectId);
                                break;
    }
else if($action)
    switch($action) {
        case 'checkLogin':              $login = Data::getData('login');
                                        RegisterController::checkLoginUniqueness($login);
                                        break;
        case 'checkSubjectName':        $subjectId = Data::getData('subjectId');
                                        $subjectName = Data::getData('name');
                                        SubjectsController::checkSubjectName($subjectId, $subjectName);
                                        break;
        case 'checkGroupName':          $groupId = Data::getData('groupId');
                                        $groupName = Data::getData('groupName');
                                        GroupsController::checkGroupName($groupId, $groupName);
                                        break;
        case 'checkNoteCategoryName':   $noteCategoryId = Data::getData('noteCategoryId');
                                        $teacherId = Data::getData('teacherId');
                                        $noteCategoryName = Data::getData('name');
                                        NoteCategoriesController::checkNoteCategoryName($noteCategoryId, $noteCategoryName, $teacherId);
                                        break;
        case 'checkGroupSubject':       $id = Data::getData('id');
                                        $subjectId = Data::getData('subjectId');
                                        $groupId = Data::getData('groupId');
                                        GroupSubjectsController::checkGroupSubjectName($id, $subjectId, $groupId);
                                        break;
        case 'checkPassword':           $password = Data::getData('password');
                                        $studentId = Data::getData('studentId');
                                        ChangePasswordController::checkStudentPassword($password, $studentId);
                                        break;

    }



?>