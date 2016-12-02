<?php

class RegisterController extends BasicController {

    public function __construct() {
        $this->view = new View();
        parent::getView('register');
    }




}

?>