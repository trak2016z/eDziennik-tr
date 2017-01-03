<?php

class Group {

    private $ID;
    private $name;
    private $teacherId;

    public function __construct($ID, $name, $teacherId) {
        $this->ID = $ID;
        $this->name = $name;
        $this->teacherId = $teacherId;
    }

    public function getGroupId() {
        return $this->ID;
    }

    public function setGroupId($newId) {
        $this->ID = $newId;
    }

    public function getGroupName() {
        return $this->name;
    }

    public function setGroupName($newName) {
        $this->name = $newName;
    }

    public function getGroupTeacherId() {
        return $this->teacherId;
    }

    public function setGroupTeacherId($newTeacherId) {
        $this->teacherId = $newTeacherId;
    }
}

?>