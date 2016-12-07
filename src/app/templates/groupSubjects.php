<ul>
    <li><a href="/Repositories/eDziennik/web/groups/:id/students">Studenci</a></li>
    <li><a href="">Przedmioty</a></li>
</ul>
<span id="errorMessage" name="errorMessage"></span>
<input type="button" id="addSubject" name="addSubject" value="Dodaj przedmiot" />
<div>
    <form id="addSubjectForm">
        <fieldset>
            <label for="subjectName">Nazwa: </label>
            <select id="subjectName" name="subjectName"></select>
        </fieldset>
        <fieldset>
            <label for="subjectTeacher">Nauczyciel: </label>
            <select id="subjectTeacher" name="subjectTeacher"></select>
        </fieldset>
        <input type="submit" id="saveSubject" name="saveSubject" value="Zapisz" />
    </form>
</div>
<div>
    <form id="editSubjectForm">
        <fieldset>
            <label for="editedSubjectName">Nazwa: </label>
            <select id="editedSubjectName" name="subjectName"></select>
        </fieldset>
        <fieldset>
            <label for="editedSubjectTeacher">Nauczyciel: </label>
            <select id="editedSubjectTeacher" name="subjectTeacher"></select>
        </fieldset>
        <input type="submit" id="updateGroupSubject" name="updateGroupSubject" value="Zapisz" />
    </form>
</div>
<table id="subjectsList" name="subjectsList"></table>
<script src="/Repositories/eDziennik/src/app/js/groupSubjects.js" type="text/javascript"></script>