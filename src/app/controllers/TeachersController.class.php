<?php

class TeachersController extends BasicController {

    public function __construct() {
        $this->view = new View();
        parent::getView('teachers');
    }
}

?>