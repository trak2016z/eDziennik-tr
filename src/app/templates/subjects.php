<ul>
    <li><a href="/Repositories/eDziennik/web/teachers">Nauczyciele</a></li>
    <li><a href="/Repositories/eDziennik/web/groups">Grupy</a></li>
    <li><a href="">Przedmioty</a></li>
    <li><a href="/Repositories/eDziennik/web/noteCategories">Kategorie ocen</a></li>
</ul>
<p>Przedmioty</p>
<span id="errorMessage" name="errorMessage"></span>
<input type="button" id="addSubject" name="addSubject" value="Dodaj przedmiot" />
<div>
    <form id="subjectInsertForm">
        <fieldset>
            <label for="insertedSubjectName">Nazwa: </label>
            <input type="text" id="insertedSubjectName" name="insertedSubjectName" />
        </fieldset>
        <input type="submit" id="insertSubject" name="insertSubject" value="Zapisz" />
    </form>
</div>
<div>
    <form id="subjectEditForm">
        <fieldset>
            <label for="editedSubjectName">Nazwa: </label>
            <input type="text" id="editedSubjectName" name="editedSubjectName" />
        </fieldset>
        <input type="submit" id="updateSubjectName" name="updateSubjectName" value="Zapisz" />
    </form>
</div>
<table id="subjectsList" name="subjectsList"></table>
<script src="../src/app/js/subjectsScript.js" type="text/javascript"></script>