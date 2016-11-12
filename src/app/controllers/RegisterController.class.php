<?php

class RegisterController {

    private $view;

    public function __construct() {
        $this->view = new View();
        //include("../views/register.html");
    }

    public function getView() {
        $this->view->chooseView("register");
    }
  /*  public function chooseAction() {
        $action = Data::getData("action");
        echo $action;
        if(isset($action)&&(!empty($action)))
            echo $action;
            $this->executeAction($action);
      //  else
         //   return $this->createController("login");
        //return false;
    }

    public function executeAction($actionName) {
        switch($actionName) {
            case "registerTeacher": $this->register();
        }
    }

    public function register() {
        echo "zarejestrowany";
    }*/
}

?>