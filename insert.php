<?php

require_once("config.php");
require_once("loader.php");
$table = Data::getData('table');
$data = null;
if($table)
    $data = Data::getData('data');

switch($table) {
    case 'teacher':         RegisterController::addTeacher($data);
                            break;
    case 'subject':         SubjectsController::addSubject($data);
                            break;
    case 'group':           GroupsController::addGroup($data);
                            break;
    case 'note_category':   NoteCategoriesController::addNoteCategory($data);
                            break;
    case 'student':         GroupStudentsController::addStudent($data);
                            break;
    case 'subject_teacher': GroupSubjectsController::addGroupSubject($data);
                            break;
    case 'note':            //$insertedNote = $databaseHandle->selectData("SELECT * FROM `note` ORDER BY ID DESC LIMIT 1");
                            GroupNotesController::addNote($data);
                            break;
}


?>