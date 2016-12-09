<?php

class ChangePasswordController extends BasicController {

    public function __construct() {
        $this->view = new View();
        parent::getView('changePassword');
    }
}

?>