<?php

class GroupsController extends BasicController {

    private static $model;

    public function __construct() {
        $this->view = new View();
        parent::getView('groups');
    }

    static public function checkGroupName($groupId, $groupName) {
        self::$model = new Group();
        $result = null;
        if($groupId)
            $result = self::$model->checkEditedGroupName($groupId, $groupName);
        else
            $result = self::$model->checkNewGroupName($groupName);
        echo json_encode($result);
    }

    static public function getAllGroups() {
        self::$model = new Group();
        self::$model->getAllGroups();
    }

    static public function getTeacherGroups($teacherId) {
        self::$model = new Group();
        self::$model->getTeacherGroups($teacherId);
    }

    static public function addGroup($data) {
        self::$model = new Group();
        $errors = self::validateGroupName($data);
        if(count($errors) == 0)
            self::$model->addGroup($data);
        else
            echo json_encode($errors);
    }

    static public function updateGroup($setData, $conditions, $operator) {
        self::$model = new Group();
        $errors = self::validateGroupName($setData);
        if(count($errors) == 0)
            self::$model->updateGroup($setData, $conditions, $operator);
        else
            echo json_encode($errors);
    }

    static public function deleteGroup($conditions, $operator) {
        self::$model = new Group();
        self::$model->deleteGroup($conditions, $operator);
    }

    private static function validateGroupName($data) {
        $errors = [];
        if(!Validation::checkPatternCompatibility('groupName', $data['name']))
            $errors[] = "Niepoprawna nazwa grupy";
        return $errors;
    }
}

?>