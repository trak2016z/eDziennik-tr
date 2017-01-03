<?php

class Student {

    private $ID;
    private $name;
    private $surname;
    private $login;
    private $password;
    private $groupId;

    public function __construct($ID, $name, $surname, $login, $password, $groupId) {
        $this->ID = $ID;
        $this->name = $name;
        $this->surname = $surname;
        $this->login = $login;
        $this->password = $password;
        $this->groupId = $groupId;
    }

    public function getStudentId() {
        return $this->ID;
    }

    public function setStudentId($newId) {
        $this->ID = $newId;
    }

    public function getStudentName() {
        return $this->name;
    }

    public function setStudentName($newName) {
        $this->ID = $newName;
    }

    public function getStudentSurname() {
        return $this->surname;
    }

    public function setStudentSurname($newSurname) {
        $this->surname = $newSurname;
    }

    public function getStudentLogin() {
        return $this->login;
    }

    public function setStudentLogin($newLogin) {
        $this->login = $newLogin;
    }

    public function getStudentPassword() {
        return $this->password;
    }

    public function setStudentPassword($newPassword) {
        $this->password = $newPassword;
    }

    public function getStudentGroupId() {
        return $this->groupId;
    }

    public function setStudentGroupId($newGroupId) {
        $this->groupId = $newGroupId;
    }
}

?>