<?php

class StudentNotesController extends BasicController {

    public function __construct() {
        $this->view = new View();
        parent::getView('studentNotes');
    }
}

?>