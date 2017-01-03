<?php

class Note {

    private $ID;
    private $note;
    private $studentId;
    private $subjectId;
    private $categoryId;

    public function __construct($ID, $note, $studentId, $subjectId, $categoryId) {
        $this->ID = $ID;
        $this->note = $note;
        $this->studentId = $studentId;
        $this->subjectId = $subjectId;
        $this->categoryId = $categoryId;
    }

    public function getNoteId() {
        return $this->ID;
    }

    public function setNoteId($newId) {
        $this->ID = $newId;
    }

    public function getNote() {
        return $this->note;
    }

    public function setNote($newNote) {
        $this->note = $newNote;
    }

    public function getNoteStudentId() {
        return $this->studentId;
    }

    public function setNoteStudentId($studentId) {
        $this->studentId = $studentId;
    }

    public function getNoteSubjectId() {
        return $this->subjectId;
    }

    public function setNoteSubjectId($newSubjectId) {
        $this->subjectId = $newSubjectId;
    }

    public function getNoteCategoryId() {
        return $this->categoryId;
    }

    public function setNoteCategoryId($newCategoryId) {
        $this->categoryId = $newCategoryId;
    }
}

?>