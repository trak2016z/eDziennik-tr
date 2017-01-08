<ul>
    <li>Studenci</li>
    <li><a href="/Repositories/eDziennik/groups/:id/subjects">Przedmioty</a></li>
</ul>
<span id="errorMessage" name="errorMessage"></span>
<div id="addedStudentData" name="addedStudentData">
    <img src="/Repositories/eDziennik/images/cross.png" alt="cross" id="hideAddedStudentData" name="hideAddedStudentData" class="cross" />
        <span id="label" name="label">Imię: </span>
        <span id="addedStudentName" name="addedStudentName"></span>
    </span>
    <span>
        <span id="label" name="label">Nazwisko: </span>
        <span id="addedStudentSurname" name="addedStudentSurname"></span>
    </span>
    <span>
        <span id="label" name="label">Login: </span>
        <span id="addedStudentLogin" name="addedStudentLogin"></span>
    </span>
    <span>
        <span id="label" name="label">Hasło: </span>
        <span id="addedStudentPassword" name="addedStudentPassword"></span>
    </span>
</div>
<input type="button" id="addStudent" name="addStudent" value="Dodaj ucznia" />
<div>
    <form id="addStudentForm">
        <img src="/Repositories/eDziennik/images/cross.png" alt="cross" id="hideAddStudentForm" name="hideAddStudentForm" class="cross" />
        <fieldset>
            <label for="studentName">Imię: </label>
            <input type="text" id="studentName" name="studentName" />
        </fieldset>
        <fieldset>
            <label for="studentSurname">Nazwisko: </label>
            <input type="text" id="studentSurname" name="studentSurname" />
        </fieldset>
        <input type="submit" id="saveStudent" name="saveStudent" value="Zapisz" />
    </form>
</div>
<div>
    <form id="editStudentForm">
        <img src="/Repositories/eDziennik/images/cross.png" alt="cross" id="hideEditStudentForm" name="hideEditStudentForm" class="cross" />
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
<script src="/Repositories/eDziennik/js/groupStudents.js" type="text/javascript"></script>