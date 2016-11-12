<?php

class LoginController {

    private $model;
    private $view;

  //  public function __construct() {
     //   include("views/loginForm.html");
       // return file_get_contents("views/loginForm.html");
   // }

    public function __construct() {
        $this->view = new View();
        //include("../views/register.html");
    }

    public function getView() {
        $this->view->chooseView("login");
    }
    public function isExistSession() {
        return isset($_SESSION);
    }
    public function checkUserExist($login, $password) {

    }
}

?>