<?php

class ChangePasswordController extends BasicController {

    private static $model;

    public function __construct() {
        $this->view = new View();
        parent::getView('changePassword');
    }

    static public function checkStudentPassword($password, $studentId) {
        self::$model = new Student();
        echo json_encode(self::$model->checkPassword($password, $studentId));
    }

    static public function changeStudentPassword($setData, $studentId, $operator) {
        self::$model = new Student();
        self::$model->changePassword($setData, $studentId, $operator);
    }
}

?>