<?php

class ChangePasswordController extends BasicController {

    private static $model;

    public function __construct() {
        $this->view = new View();
        parent::getView('changePassword');
    }

    static public function checkStudentPassword($password, $studentId) {
        self::$model = new Student();
        $password = sha1($password);
        echo json_encode(self::$model->checkPassword($password, $studentId));
    }

    static public function changeStudentPassword($setData, $studentId, $operator) {
        self::$model = new Student();
        $errors = self::validatePassword($setData);
        if(count($errors) == 0) {
            $setData['password'] = sha1($setData['password']);
            unset($setData['passwordAgain']);
            self::$model->changePassword($setData, $studentId, $operator);
        }
        else
            echo json_encode($errors);
    }

    private static function validatePassword($data) {
        $errors = [];
        if(!Validation::checkPatternCompatibility('password', $data['password']))
            $errors[] = "Niepoprawna wartoœæ w polu Has³o";
        if(!Validation::checkPasswordEquality($data['password'], $data['passwordAgain']))
            $errors[] = "Podane has³a nie s¹ takie same";
        return $errors;
    }
}

?>