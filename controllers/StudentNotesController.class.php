<?php

class StudentNotesController extends BasicController {

    private static $model;

    public function __construct() {
        $this->view = new View();
        parent::getView('studentNotes');
    }

    static public function getStudentNotesBySubject($studentId, $subjectId) {
        self::$model = new Note();
        self::$model->getNotes($studentId, $subjectId);
    }
}

?>