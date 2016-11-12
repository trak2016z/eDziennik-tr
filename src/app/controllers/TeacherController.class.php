<?php

class TeacherController {

    private $model;
    private $view;

    public function __construct() {
      //  $this->model = $model;
        $this->model = new Teacher();
        $this->view = new View();
        //$this->view = $view;
    }

    public function chooseAction($actionName) {
        switch($actionName) {
            case 'insert': return $this->getRegisterData();
        }
    }
   /* public function getView() {

    }*/

    public function getRegisterData() {
        //$data = array('name' => Data::getData('name'), 'surname' => Data::getData('surname'), 'login' => Data::getData('login'), 'password' => Data::getData('password'));
        return (Data::getData('name'));
        //return $this->model->insert($data);
    }
}
?>