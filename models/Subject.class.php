<?php

class Subject {

    private $databaseHandle;

    public function __construct() {
        $this->databaseHandle = Database::getInstance();
    }

    public function checkNewSubjectName($subjectName) {
        $result = $this->databaseHandle->selectData("SELECT name FROM `subject` WHERE name = '{$subjectName}'");
        return is_array($result)?false:true;
    }

    public function checkEditedSubjectName($subjectId, $subjectName) {
        $result = $this->databaseHandle->selectData("SELECT name FROM `subject` WHERE name = '{$subjectName}' AND ID <> {$subjectId}");
        return is_array($result)?false:true;
    }

    public function getAllSubjects() {
        $result = $this->databaseHandle->selectData("SELECT * FROM `subject`");
        echo json_encode($result);
    }

    public function addSubject($data) {
        $result = $this->databaseHandle->insertData('subject', $data);
        $insertedSubject = $this->databaseHandle->selectData("SELECT * FROM `subject` ORDER BY ID DESC LIMIT 1");
        echo json_encode($insertedSubject);
    }

    public function updateSubject($setData, $conditions, $operator) {
        $result = $this->databaseHandle->updateData('subject', $setData, $conditions, $operator);
        echo json_encode($result);
    }

    public function deleteSubject($conditions, $operator) {
        $result = $this->databaseHandle->delete('subject', $conditions, $operator);
        echo json_encode($result);
    }
}

?>