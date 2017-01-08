<?php

class Student {

    private $databaseHandle;

    public function __construct() {
        $this->databaseHandle = Database::getInstance();
    }

    public function changeData($setData, $teacherId, $operator) {
        $result = $this->databaseHandle->updateData('student', $setData, $teacherId, $operator);
        echo json_encode($result);
    }

    public function changePassword($setData, $studentId, $operator) {
        $result = $this->databaseHandle->updateData('student', $setData, $studentId, $operator);
        echo json_encode($result);
    }

    public function checkPassword($password, $studentId) {
        $result = $this->databaseHandle->selectData("SELECT password FROM `student` WHERE ID = '{$studentId}'");
        return ($result[0]['password'] !== $password)?true:false;
    }

    public function checkLogin($login) {
        $result = $this->databaseHandle->selectData("SELECT login FROM `student` WHERE login = '{$login}'");
        return (is_array($result))?false:true;
    }

    public function getStudentsByGroup($groupId) {
        $result = $this->databaseHandle->selectData("SELECT * FROM `student` WHERE group_ID = {$groupId}");
        echo json_encode($result);
    }

    public function addStudent($data) {
        $result = $this->databaseHandle->insertData('student', $data);
        $insertedStudent = $this->databaseHandle->selectData("SELECT * FROM `student` ORDER BY ID DESC LIMIT 1");
        echo json_encode($insertedStudent);
    }

    public function updateStudent($setData, $conditions, $operator) {
        $result = $this->databaseHandle->updateData('student', $setData, $conditions, $operator);
        echo json_encode($result);
    }

    public function deleteStudent($conditions, $operator) {
        $result = $this->databaseHandle->delete('student', $conditions, $operator);
        echo json_encode($result);
    }
}

?>