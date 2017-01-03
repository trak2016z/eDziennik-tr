<?php

class NoteCategoriesController extends BasicController {

    public function __construct() {
        $this->view = new View();
        parent::getView('noteCategories');
    }
}

?>