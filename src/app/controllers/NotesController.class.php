<?php

class NotesController extends BasicController {

    public function __construct() {
        $this->view = new View();
        parent::getView('notes');
    }
}

?>