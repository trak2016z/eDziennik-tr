<?php

class Group {

    private $databaseHandle;

    public function __construct() {
        $this->databaseHandle = Database::getInstance();
    }

    public function checkNewGroupName($groupName) {
        $result = $this->databaseHandle->selectData("SELECT name FROM `group` WHERE name = '{$groupName}'");
        return is_array($result)?false:true;
    }

    public function checkEditedGroupName($groupId, $groupName) {
        $result = $this->databaseHandle->selectData("SELECT name FROM `group` WHERE name = '{$groupName}' AND ID <> {$groupId}");
        return is_array($result)?false:true;
    }

    public function getAllGroups() {
        $result = $this->databaseHandle->selectData("SELECT * FROM `group`");
        echo json_encode($result);
    }

    public function getTeacherGroups($teacherId) {
        $result = $this->databaseHandle->selectData("SELECT * FROM `group` g JOIN `subject_teacher` st ON g.ID = st.group_ID WHERE st.teacher_ID = {$teacherId}");
        echo json_encode($result);
    }

    public function addGroup($data) {
        $result = $this->databaseHandle->insertData('group', $data);
        $insertedGroup = $this->databaseHandle->selectData("SELECT * FROM `group` ORDER BY ID DESC LIMIT 1");
        echo json_encode($insertedGroup);
    }

    public function updateGroup($setData, $conditions, $operator) {
        $result = $this->databaseHandle->updateData('group', $setData, $conditions, $operator);
        echo json_encode($result);
    }

    public function deleteGroup($conditions, $operator) {
        $result = $this->databaseHandle->delete('group', $conditions, $operator);
        echo json_encode($result);
    }
}

?>