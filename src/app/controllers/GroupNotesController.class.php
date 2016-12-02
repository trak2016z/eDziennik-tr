<?php

class GroupNotesController extends BasicController {

    public function __construct() {
        $this->view = new View();
        parent::getView('groupNotes');
    }
}

?>