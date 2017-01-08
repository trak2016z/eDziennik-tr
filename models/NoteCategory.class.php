<?php

class NoteCategory {

    private $databaseHandle;

    public function __construct() {
        $this->databaseHandle = Database::getInstance();
    }

    public function checkNewNoteCategoryName($noteCategoryName, $teacherId) {
        $result = $this->databaseHandle->selectData("SELECT name FROM `note_category` WHERE name = '{$noteCategoryName}' AND teacher_ID = {$teacherId}");
        return is_array($result)?false:true;
    }

    public function checkEditedNoteCategoryName($noteCategoryId, $noteCategoryName, $teacherId) {
        $result = $this->databaseHandle->selectData("SELECT name FROM `note_category` WHERE name = '{$noteCategoryName}' AND ID <> {$noteCategoryId}
                                         AND teacher_ID = {$teacherId}");
        return is_array($result)?false:true;
    }

    public function getNoteCategoryByTeacher($teacherId) {
        $result = $this->databaseHandle->selectData("SELECT * FROM `note_category` WHERE teacher_ID = {$teacherId}");
        echo json_encode($result);
    }

    public function addNoteCategory($data) {
        $result = $this->databaseHandle->insertData('note_category', $data);
        $insertedNoteCategory = $this->databaseHandle->selectData("SELECT * FROM `note_category` ORDER BY ID DESC LIMIT 1");
        echo json_encode($insertedNoteCategory);
    }

    public function updateNoteCategory($setData, $conditions, $operator) {
        $result = $this->databaseHandle->updateData('note_category', $setData, $conditions, $operator);
        echo json_encode($result);
    }

    public function deleteNoteCategory($conditions, $operator) {
        $result = $this->databaseHandle->delete('note_category', $conditions, $operator);
        echo json_encode($result);
    }
}

?>