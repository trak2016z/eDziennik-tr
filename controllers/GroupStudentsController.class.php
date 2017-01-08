<?php

class GroupStudentsController extends BasicController {

    private static $model;

    public function __construct() {
        $this->view = new View();
        parent::getView('groupStudents');
    }

    static public function getStudentsByGroup($groupId) {
        self::$model = new Student();
        self::$model->getStudentsByGroup($groupId);
    }

    static public function addStudent($data) {
        self::$model = new Student();
        $errors = self::validateStudentData($data);
        if(count($errors) == 0)
            self::$model->addStudent($data);
        else
            echo json_encode($errors);
    }

    static public function updateStudent($setData, $conditions, $operator) {
        self::$model = new Student();
        self::$model->updateStudent($setData, $conditions, $operator);
    }

    static public function deleteStudent($conditions, $operator) {
        self::$model = new Student();
        self::$model->deleteStudent($conditions, $operator);
    }

    private static function validateStudentData($data) {
        $errors = [];
        if(!Validation::checkPatternCompatibility('nameSurname', $data['name']))
            $errors[] = "Niepoprawna warto�� w polu Imi�";
        if(!Validation::checkPatternCompatibility('nameSurname', $data['surname']))
            $errors[] = "Niepoprawna warto�� w polu Nazwisko";
        if(!Validation::checkPatternCompatibility('login', $data['login']))
            $errors[] = "Niepoprawna warto�� w polu Login";
        if(!Validation::checkPatternCompatibility('password', $data['password']))
            $errors[] = "Niepoprawna warto�� w polu Has�o";
        if(!Validation::isId($data['group_ID']))
            $errors[] = "Id grupy nie jest poprawne";
        return $errors;
    }
}

?>