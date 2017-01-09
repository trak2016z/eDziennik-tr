<?php

class GroupNotesController extends BasicController {

    private static $model;

    public function __construct() {
        $this->view = new View();
        parent::getView('groupNotes');
    }

    static public function getSubjectNotesByStudent($studentId, $subjectId) {
        self::$model = new Note();
        self::$model->getNotes($studentId, $subjectId);
    }

    static public function addNote($data) {
        self::$model = new Note();
        $errors = self::validateNote('insert', $data);
        if(count($errors) == 0)
            self::$model->addNote($data);
        else
            echo json_encode($errors);
    }

    static public function updateNote($setData, $conditions, $operator) {
        self::$model = new Note();
        $errors = self::validateNote('update', $setData);
        if(count($errors) == 0)
            self::$model->updateNote($setData, $conditions, $operator);
        else
            echo json_encode($errors);
    }

    static public function deleteNote($conditions, $operator) {
        self::$model = new Note();
        self::$model->deleteNote($conditions, $operator);
    }

    private static function validateNote($operationType, $data) {
        $errors = [];
        if($operationType == 'insert') {
            if (!Validation::isId($data['subject_ID']))
                $errors[] = "Id przedmiotu nie jest poprawne";
            if (!Validation::isId($data['student_ID']))
                $errors[] = "Id studenta nie jest poprawne";
        }
        if(!Validation::isId($data['category_ID']))
            $errors[] = "Id kategorii nie jest poprawne";
        if(!Validation::checkPatternCompatibility('note', $data['note']))
            $errors[] = "Niepoprawna wartoœæ w polu ocena";
        return $errors;
    }
}

?>