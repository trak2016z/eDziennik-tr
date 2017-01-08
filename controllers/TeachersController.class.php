<?php

class TeachersController extends BasicController {

    private static $model;

    public function __construct() {
        $this->view = new View();
        parent::getView('teachers');
    }

    static public function getAllTeachers() {
        self::$model = new Teacher();
        self::$model->getAllTeachers();
    }

    static public function activateDeactivateTeacher($setData, $conditions, $operator) {
        self::$model = new Teacher();
        self::$model->activateDeactivateTeacher($setData, $conditions, $operator);
    }
}

?>