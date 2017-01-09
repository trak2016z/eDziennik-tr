<?php

class UserAccountController extends BasicController {

    private static $model;

    public function __construct() {
        $this->view = new View();
        parent::getView('userAccount');
    }

    static public function changeUserData($userType, $setData, $userId, $operator) {
        if($userType == 'teacher')
            self::$model = new Teacher();
        else
            self::$model = new Student();
        $errors = self::validateUserData($userType, $setData);
        $setData = self::isPassword($setData);
        if(count($errors) == 0)
            self::$model->changeData($setData, $userId, $operator);
        else
            echo json_encode($errors);
    }

    private static function isPassword($setData) {
        if(isset($setData['password'])&&empty($setData['password'])) {
            unset($setData['password']);
            unset($setData['passwordAgain']);
        }
        else {
            $setData['password'] = sha1($setData['password']);
            unset($setData['passwordAgain']);
        }
        return $setData;
    }

    private static function validateUserData($userType, $data) {
        $errors = [];
        if($userType == 'teacher') {
            if (!Validation::checkPatternCompatibility('nameSurname', $data['name']))
                $errors[] = "Niepoprawna warto�� w polu Imi�";
            if (!Validation::checkPatternCompatibility('nameSurname', $data['surname']))
                $errors[] = "Niepoprawna warto�� w polu Nazwisko";
        }
        if(isset($setData['password'])&&!empty($setData['password'])) {
            if (!Validation::checkPatternCompatibility('password', $data['password']))
                $errors[] = "Niepoprawna warto�� w polu Has�o";
            if (!Validation::checkPasswordEquality($data['password'], $data['passwordAgain']))
                $errors[] = "Podane has�a nie s� takie same";
        }
        return $errors;
    }

}

?>