<?php

require_once("config.php");
require_once("loader.php");

$table = Data::getData('table');
$action = Data::getData('action');
$setData = $conditions = $operator = null;

if($table||$action) {
    $setData = Data::getData('set');
    $conditions = Data::getData('conditions');
    $operator = Data::getData('operator');
}
if($table)
    switch($table) {
        case 'teacher':         TeachersController::activateDeactivateTeacher($setData, $conditions, $operator);
                                break;
        case 'subject':         SubjectsController::updateSubject($setData, $conditions, $operator);
                                break;
        case 'group':           GroupsController::updateGroup($setData, $conditions, $operator);
                                break;
        case 'note_category':   NoteCategoriesController::updateNoteCategory($setData, $conditions, $operator);
                                break;
        case 'student':         GroupStudentsController::updateStudent($setData, $conditions, $operator);
                                break;
        case 'subject_teacher': GroupSubjectsController::updateGroupSubject($setData, $conditions, $operator);
                                break;
        case 'note':            GroupNotesController::updateNote($setData, $conditions, $operator);
                                break;
    }
else if($action)
    switch($action) {
        case 'changeStudentPassword':   ChangePasswordController::changeStudentPassword($setData, $conditions, $operator);
                                        break;
        case 'changeUserData':          $userType = Data::getData('userType');
                                        UserAccountController::changeUserData($userType, $setData, $conditions, $operator);
                                        break;
    }





?>