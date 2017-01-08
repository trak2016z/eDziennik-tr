<?php

class Note {

    private $databaseHandle;

    public function __construct() {
        $this->databaseHandle = Database::getInstance();
    }

    public function getNotes($studentId, $subjectId) {
        $result = $this->databaseHandle->selectData("SELECT n.ID, n.note, n.category_ID, nc.name FROM `note` n JOIN `note_category` nc ON n.category_ID =
                                nc.ID WHERE n.subject_ID = {$subjectId} AND n.student_ID = {$studentId}");
        echo json_encode($result);
    }

    public function addNote($data) {
        $result = $this->databaseHandle->insertData('note', $data);
        echo json_encode($result);
    }

    public function updateNote($setData, $conditions, $operator) {
        $result = $this->databaseHandle->updateData('note', $setData, $conditions, $operator);
        echo json_encode($result);
    }

    public function deleteNote($conditions, $operator) {
        $result = $this->databaseHandle->delete('note', $conditions, $operator);
        echo json_encode($result);
    }

}

?>