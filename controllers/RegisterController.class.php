<?php

class RegisterController extends BasicController {

    private static $model;

    public function __construct() {
        $this->view = new View();
        parent::getView('register');
    }

    static public function addTeacher($data) {
        self::$model = new Teacher();
        $errors = self::validateTeacherData($data);
        if(count($errors) == 0) {
            unset($data['passwordAgain']);
            self::$model->addTeacher($data);
        }
        else
            echo json_encode($errors);
    }

    static public function checkLoginUniqueness($login) {
        self::$model = new Student();
        $studentResult = self::$model->checkLogin($login);
        self::$model = new Teacher();
        $teacherResult = self::$model->checkLogin($login);
        if($studentResult&&$teacherResult)
            echo json_encode(true);
        else
            echo json_encode(false);
    }

    private static function validateTeacherData($data) {
        $errors = [];
        if(!Validation::checkPatternCompatibility('nameSurname', $data['name']))
            $errors[] = "Niepoprawna warto�� w polu Imi�";
        if(!Validation::checkPatternCompatibility('nameSurname', $data['surname']))
            $errors[] = "Niepoprawna warto�� w polu Nazwisko";
        if(!Validation::checkPatternCompatibility('login', $data['login']))
            $errors[] = "Niepoprawna warto�� w polu Login";
        if(!Validation::checkPatternCompatibility('password', $data['password']))
            $errors[] = "Niepoprawna warto�� w polu Has�o";
        if(!Validation::checkPasswordEquality($data['password'], $data['passwordAgain']))
            $errors[] = "Podane has�a nie s� takie same";
        return $errors;
    }

}

?>