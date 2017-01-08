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
        $setData = self::isPassword($setData);
        self::$model->changeData($setData, $userId, $operator);
    }

    private static function isPassword($setData) {
        if(isset($setData['password'])&&empty($setData['password']))
            unset($setData['password']);
        return $setData;
    }

}

?>