<?php

class Teacher {

    private $ID;
    private $name;
    private $surname;
    private $login;
    private $password;

    /*public function __construct($ID, $name, $surname, $login, $password) {
        $this->ID = $ID;
        $this->name = $name;
        $this->surname = $surname;
        $this->login = $login;
        $this->password = $password;
    }*/

    public function getTeacherId() {
        return $this->ID;
    }

    public function setTeacherId($newId) {
        $this->ID = $newId;
    }

    public function getTeacherName() {
        return $this->name;
    }

    public function setTeacherName($newName) {
        $this->ID = $newName;
    }

    public function getTeacherSurname() {
        return $this->surname;
    }

    public function setTeacherSurname($newSurname) {
        $this->surname = $newSurname;
    }

    public function getTeacherLogin() {
        return $this->login;
    }

    public function setTeacherLogin($newLogin) {
        $this->login = $newLogin;
    }

    public function getTeacherPassword() {
        return $this->password;
    }

    public function setTeacherPassword($newPassword) {
        $this->password = $newPassword;
    }

    public function insert($teacherData = array()) {
        $databaseHandle = Database::getInstance();
        return $databaseHandle->insertData('teacher', $teacherData);
    }
}

?>