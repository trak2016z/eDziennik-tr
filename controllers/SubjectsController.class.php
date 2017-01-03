<?php

class SubjectsController extends BasicController {

    public function __construct() {
        $this->view = new View();
        parent::getView('subjects');
    }
}

?>