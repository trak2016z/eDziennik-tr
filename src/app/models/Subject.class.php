<?php

class Subject {
    private $ID;
    private $name;

    public function __construct($ID, $name) {
        $this->ID = $ID;
        $this->name = $name;
    }

    public function getSubjectId() {
        return $this->ID;
    }

    public function setSubjectId($newId) {
        $this->ID = $newId;
    }

    public function getSubjectName() {
        return $this->name;
    }

    public function setSubjectName($newName) {
        $this->name = $newName;
    }

}

?>