<?php

class NoteCategoriesController extends BasicController {

    private static $model;

    public function __construct() {
        $this->view = new View();
        parent::getView('noteCategories');
    }

    static public function checkNoteCategoryName($noteCategoryId, $noteCategoryName, $teacherId) {
        self::$model = new NoteCategory();
        $result = null;
        if($noteCategoryId)
            $result = self::$model->checkEditedNoteCategoryName($noteCategoryId, $noteCategoryName, $teacherId);
        else
            $result = self::$model->checkNewNoteCategoryName($noteCategoryName, $teacherId);
        echo json_encode($result);
    }

    static public function getNoteCategoryByTeacher($teacherId) {
        self::$model = new NoteCategory();
        self::$model->getNoteCategoryByTeacher($teacherId);
    }

    static public function addNoteCategory($data) {
        self::$model = new NoteCategory();
        $errors = self::validateNoteCategoryName($data);
        if(count($errors) == 0)
            self::$model->addNoteCategory($data);
        else
            echo json_encode($errors);
    }

    static public function updateNoteCategory($setData, $conditions, $operator) {
        self::$model = new NoteCategory();
        self::$model->updateNoteCategory($setData, $conditions, $operator);
    }

    static public function deleteNoteCategory($conditions, $operator) {
        self::$model = new NoteCategory();
        self::$model->deleteNoteCategory($conditions, $operator);
    }

    private static function validateNoteCategoryName($data) {
        $errors = [];
        if(!Validation::checkPatternCompatibility('noteCategoryName', $data['name']))
            $errors[] = "Niepoprawna nazwa kategorii";
        return $errors;
    }
}

?>