<?php

class Teacher {

    private $databaseHandle;

    public function __construct() {
        $this->databaseHandle = Database::getInstance();
    }

    public function changeData($setData, $teacherId, $operator) {
        $result = $this->databaseHandle->updateData('teacher', $setData, $teacherId, $operator);
        echo json_encode($result);
    }

    public function checkLogin($login) {
        $result = $this->databaseHandle->selectData("SELECT login FROM `teacher` WHERE login = '{$login}'");
        return (is_array($result))?false:true;
    }

    public function getAllTeachers() {
        $result = $this->databaseHandle->selectData("SELECT * FROM `teacher` WHERE type <> 1");
        echo json_encode($result);
    }

    public function addTeacher($data) {
        $result = $this->databaseHandle->insertData('teacher', $data);
        echo json_encode($result);
    }

    public function activateDeactivateTeacher($setData, $conditions, $operator) {
        $result = $this->databaseHandle->updateData('teacher', $setData, $conditions, $operator);
        echo json_encode($result);
    }
}

?>