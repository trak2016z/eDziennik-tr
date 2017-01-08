<?php

class SubjectsController extends BasicController {

    private static $model;

    public function __construct() {
        $this->view = new View();
        parent::getView('subjects');
    }

    static public function checkSubjectName($subjectId, $subjectName) {
        self::$model = new Subject();
        $result = null;
        if($subjectId)
            $result = self::$model->checkEditedSubjectName($subjectId, $subjectName);
        else
            $result = self::$model->checkNewSubjectName($subjectName);
        echo json_encode($result);
    }

    static public function getAllSubjects() {
        self::$model = new Subject();
        self::$model->getAllSubjects();
    }

    static public function addSubject($data) {
        self::$model = new Subject();
        $errors = self::validateSubjectName($data);
        if(count($errors) == 0)
            self::$model->addSubject($data);
        else
            echo json_encode($errors);
    }

    static public function updateSubject($setData, $conditions, $operator) {
        self::$model = new Subject();
        self::$model->updateSubject($setData, $conditions, $operator);
    }

    static public function deleteSubject($conditions, $operator) {
        self::$model = new Subject();
        self::$model->deleteSubject($conditions, $operator);
    }

    private static function validateSubjectName($data) {
        $errors = [];
        if(!Validation::checkPatternCompatibility('subjectName', $data['name']))
            $errors[] = "Niepoprawna nazwa przedmiotu";
        return $errors;
    }
}

?>