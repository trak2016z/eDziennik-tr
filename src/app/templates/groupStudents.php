<ul>
    <li><a href="">Studenci</a></li>
    <li><a href="/Repositories/eDziennik/web/groups/:id/subjects">Przedmioty</a></li>
</ul>
<span id="errorMessage" name="errorMessage"></span>
<input type="button" id="addStudent" name="addStudent" value="Dodaj ucznia" />
<div>
    <form id="addStudentForm">
        <fieldset>
            <label for="studentName">Imię: </label>
            <input type="text" id="studentName" name="studentName" />
        </fieldset>
        <fieldset>
            <label for="studentSurname">Nazwisko: </label>
            <input type="text" id="studentSurname" name="studentSurname" />
        </fieldset>
        <label for="addedStudentGroupName">Grupa: </label>
        <select id="addedStudentGroupName" name="groupName"></select>
        <input type="submit" id="saveStudent" name="saveStudent" value="Zapisz" />
    </form>
</div>
<div>
    <form id="editStudentForm">
        <fieldset>
            <label for="editedStudentName">Imię: </label>
            <input type="text" id="editedStudentName" name="editedStudentName" />
        </fieldset>
        <fieldset>
            <label for="editedStudentSurname">Nazwisko: </label>
            <input type="text" id="editedStudentSurname" name="editedStudentSurname" />
        </fieldset>
        <select id="editedStudentGroupName" name="groupName"></select>
        <input type="submit" id="updateStudent" name="updateStudent" value="Zapisz" />
    </form>
</div>
<table id="studentsList" name="studentsList"></table>
<script src="/Repositories/eDziennik/src/app/js/groupStudents.js" type="text/javascript"></script>