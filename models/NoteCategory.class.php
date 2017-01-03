<?php

class NoteCategory {

    private $ID;
    private $name;

    public function __construct($ID, $name) {
        $this->ID = $ID;
        $this->name = $name;
    }

    public function getNoteCategoryId() {
        return $this->ID;
    }

    public function setNoteCategoryId($newId) {
        $this->ID = $newId;
    }

    public function getNoteCategoryName() {
        return $this->name;
    }

    public function setNoteCategoryName($newName) {
        $this->name = $newName;
    }
}

?>