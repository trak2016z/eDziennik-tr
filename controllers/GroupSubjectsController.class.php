<?php

class GroupSubjectsController extends BasicController {

    private static $model;

    public function __construct() {
        $this->view = new View();
        parent::getView('groupSubjects');
    }

    static public function checkGroupSubjectName($id, $subjectId, $groupId) {
        self::$model = new SubjectTeacher();
        $result = null;
        if($id)
            $result = self::$model->checkEditedGroupSubjectName($id, $subjectId, $groupId);
        else
            $result = self::$model->checkNewGroupSubjectName($subjectId, $groupId);
        echo json_encode($result);
    }

    static public function getAllGroupSubjects($groupId) {
        self::$model = new SubjectTeacher();
        self::$model->getAllGroupSubjects($groupId);
    }

    static public function getGroupSubjectsByTeacher($groupId, $teacherId) {
        self::$model = new SubjectTeacher();
        self::$model->getGroupSubjectsByTeacher($groupId, $teacherId);
    }

    static public function getStudentSubjects($studentGroupId) {
        self::$model = new SubjectTeacher();
        self::$model->getStudentSubjects($studentGroupId);
    }

    static public function addGroupSubject($data) {
        self::$model = new SubjectTeacher();
        $errors = self::validateGroupSubject('insert', $data);
        if(count($errors) == 0)
            self::$model->addGroupSubject($data);
        else
            echo json_encode($errors);
    }

    static public function updateGroupSubject($setData, $conditions, $operator) {
        self::$model = new SubjectTeacher();
        $errors = self::validateGroupSubject('update', $setData);
        if(count($errors) == 0)
            self::$model->updateGroupSubject($setData, $conditions, $operator);
        else
            echo json_encode($errors);
    }

    static public function deleteGroupSubject($conditions, $operator) {
        self::$model = new SubjectTeacher();
        self::$model->deleteGroupSubject($conditions, $operator);
    }

    private static function validateGroupSubject($operationType, $data) {
        $errors = [];
        if(!Validation::isId($data['subject_ID']))
            $errors[] = "Id przedmiotu nie jest poprawne";
        if(!Validation::isId($data['teacher_ID']))
            $errors[] = "Id nauczyciela nie jest poprawne";
        if($operationType == "insert")
            if(!Validation::isId($data['group_ID']))
                $errors[] = "Id grupy nie jest poprawne";
        return $errors;
    }
}

?>