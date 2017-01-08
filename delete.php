<?php

require_once("config.php");
require_once("loader.php");
$table = Data::getData('table');
$data = $operator = null;
if($table) {
    $data = Data::getData('data');
    $operator = Data::getData('operator');
}
switch($table) {
    case 'subject':         SubjectsController::deleteSubject($data, $operator);
                            break;
    case 'group':           GroupsController::deleteGroup($data, $operator);
                            break;
    case 'note_category':   NoteCategoriesController::deleteNoteCategory($data, $operator);
                            break;
    case 'student':         GroupStudentsController::deleteStudent($data, $operator);
                            break;
    case 'subject_teacher': GroupSubjectsController::deleteGroupSubject($data, $operator);
                            break;
    case 'note':            GroupNotesController::deleteNote($data, $operator);
                            break;
}


?>