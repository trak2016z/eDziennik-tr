<?php

class GroupsController extends BasicController {

    public function __construct() {
        $this->view = new View();
        parent::getView('groups');
    }
}

?>