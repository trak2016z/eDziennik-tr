<?php

class UserAccountController extends BasicController {

    public function __construct() {
        $this->view = new View();
        parent::getView('userAccount');
    }
}

?>