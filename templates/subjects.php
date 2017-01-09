<ul>
    <li><a href="/Repositories/eDziennik/teachers">Nauczyciele</a></li>
    <li><a href="/Repositories/eDziennik/groups">Grupy</a></li>
    <li>Przedmioty</li>
    <li><a href="/Repositories/eDziennik/noteCategories">Kategorie ocen</a></li>
</ul>
<p>Przedmioty</p>
<span id="errorMessage" name="errorMessage"></span>
<input type="button" id="addSubject" name="addSubject" value="Dodaj przedmiot" />
<div>
    <form id="subjectInsertForm">
        <img src="images/cross.png" alt="cross" id="hideAddSubjectForm" name="hideAddSubjectForm" class="cross" />
        <fieldset>
            <label for="insertedSubjectName">Nazwa: </label>
            <input type="text" id="insertedSubjectName" name="insertedSubjectName" />
        </fieldset>
        <input type="submit" id="insertSubject" name="insertSubject" value="Zapisz" />
    </form>
</div>
<div>
    <form id="subjectEditForm">
        <img src="images/cross.png" alt="cross" id="hideEditSubjectForm" name="hideEditSubjectForm" class="cross" />
        <fieldset>
            <label for="editedSubjectName">Nazwa: </label>
            <input type="text" id="editedSubjectName" name="editedSubjectName" />
        </fieldset>
        <input type="submit" id="updateSubjectName" name="updateSubjectName" value="Zapisz" />
    </form>
</div>
<span id="message" name="message"></span>
<table id="subjectsList" name="subjectsList"></table>
<script src="js/subjectsScript.js" type="text/javascript"></script>