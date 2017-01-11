<?php

class SubjectTeacher {

    private $databaseHandle;

    public function __construct() {
        $this->databaseHandle = Database::getInstance();
    }

    public function checkNewGroupSubjectName($subjectId, $groupId) {
        $result = $this->databaseHandle->selectData("SELECT ID FROM `subject_teacher` WHERE subject_ID = '{$subjectId}' AND group_ID = {$groupId}");
        return is_array($result)?false:true;
    }

    public function checkEditedGroupSubjectName($id, $subjectId, $groupId) {
        $result = $this->databaseHandle->selectData("SELECT ID FROM `subject_teacher` WHERE subject_ID = '{$subjectId}' AND group_ID = {$groupId} AND ID <> {$id}");
        return is_array($result)?false:true;
    }

    public function getAllGroupSubjects($groupId) {
        $result = $this->databaseHandle->selectData("SELECT st.ID, st.subject_ID, st.teacher_ID, s.name as subjectName , t.name as teacherName,
                                t.surname as teacherSurname FROM `subject_teacher` st JOIN `teacher` t ON st.teacher_ID = t.ID JOIN `subject` s ON
                                st.subject_ID = s.ID WHERE st.group_ID = {$groupId}");
        echo json_encode($result);
    }

    public function getGroupSubjectsByTeacher($groupId, $teacherId) {
        $result = $this->databaseHandle->selectData("SELECT st.ID, st.subject_ID, st.teacher_ID, s.name as subjectName , t.name as teacherName,
                                t.surname as teacherSurname FROM `subject_teacher` st JOIN `teacher` t ON st.teacher_ID = t.ID JOIN `subject` s ON
                                st.subject_ID = s.ID WHERE st.group_ID = {$groupId} AND st.teacher_ID = {$teacherId}");
        echo json_encode($result);
    }

    public function getStudentSubjects($studentGroupId) {
        $result = $this->databaseHandle->selectData("SELECT s.ID, s.name FROM `subject` s JOIN `subject_teacher` st ON
                                        s.ID = st.subject_ID WHERE st.group_ID = '{$studentGroupId}'");
        echo json_encode($result);
    }

    public function addGroupSubject($data) {
        $result = $this->databaseHandle->insertData('subject_teacher', $data);
        $insertedSubjectTeacher = $this->databaseHandle->selectData("SELECT st.ID, st.subject_ID, st.teacher_ID, s.name as subjectName , t.name as
                            teacherName, t.surname as teacherSurname FROM `subject_teacher` st JOIN `teacher` t ON st.teacher_ID = t.ID JOIN `subject` s
                            ON st.subject_ID = s.ID ORDER BY ID DESC LIMIT 1");
        echo json_encode($insertedSubjectTeacher);
    }

    public function updateGroupSubject($setData, $conditions, $operator) {
        $id = $this->databaseHandle->selectData("SELECT subject_ID FROM `subject_teacher` WHERE ID = {$conditions['ID']}");
        $result = $this->databaseHandle->updateData('subject_teacher', $setData, $conditions, $operator);
        $result = $this->databaseHandle->updateData('note', array('subject_ID' => $setData['subject_ID']), array('subject_ID' => $id[0]['subject_ID']), $operator);
        echo json_encode($result);
    }

    public function deleteGroupSubject($conditions, $operator) {
        $result = $this->databaseHandle->delete('subject_teacher', $conditions, $operator);
        echo json_encode($result);
    }
}

?>