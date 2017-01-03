<?php

class GroupStudentsController extends BasicController {

    public function __construct() {
        $this->view = new View();
        parent::getView('groupStudents');
    }
}

?>