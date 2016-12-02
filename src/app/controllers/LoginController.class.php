<?php

    class LoginController extends BasicController {

    static private $permitions = [
        "admin" => ['teachers', 'groups', 'subjects', 'noteCategories', 'groupStudents', 'groupSubjects', 'groupNotes', 'studentNotes', 'userData'],
        "teacher" => ['groups', 'noteCategories', 'groupStudents', 'groupSubjects', 'groupNotes', 'studentNotes', 'userData'],
        "student" => ['notes', 'userData', 'changePassword']
    ];

    public function __construct() {
        $this->view = new View();
        $this->checkSessionExist();
    }

    static public function logInUser($userData) {
        foreach($userData as $key => $value)
            $_SESSION[$key] = $value;
    }

    static public function checkAuthentication($controllerName) {
        if(($controllerName !== 'login'&&$controllerName !== 'register'))
            return empty($_SESSION)?false:true;
        return true;
    }

    static public function checkAuthorization($controllerName) {
        $userType = '';
        if(($controllerName !== 'login'&&$controllerName !== 'register')) {
            if ($_SESSION['type'])
                $userType = ($_SESSION['type'] == 1) ? "admin" : "teacher";
            else
                $userType = "student";
            return (in_array($controllerName, LoginController::$permitions[$userType])) ? true : false;
        }
        else
            return true;
    }


    public function checkSessionExist() {
    if(isset($_SESSION)&&!empty($_SESSION)) {
        $this->redirect();
    }
    else
        parent::getView('login');
    }

    public function redirect() {
        if($_SESSION['type']) {
            $this->checkUserType();
        }
        else
            header("Location: ". PROJECT_DIRECTORY."web/notes");
    }

    public function checkUserType() {
        if($_SESSION['type'] == 1)
            header("Location: ". PROJECT_DIRECTORY."web/teachers");
        else
            header("Location: ". PROJECT_DIRECTORY."web/groups");
    }

    static public function logOutUser() {
        $_SESSION = [];
    }
}

?>