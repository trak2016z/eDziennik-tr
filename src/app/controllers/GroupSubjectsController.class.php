<?php

class GroupSubjectsController extends BasicController {

    public function __construct() {
        $this->view = new View();
        parent::getView('groupSubjects');
    }
}

?>