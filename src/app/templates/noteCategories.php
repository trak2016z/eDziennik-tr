<ul>
    <li><a href="/Repositories/eDziennik/web/teachers">Nauczyciele</a></li>
    <li><a href="/Repositories/eDziennik/web/groups">Grupy</a></li>
    <li><a href="/Repositories/eDziennik/web/subjects">Przedmioty</a></li>
    <li><a href="">Kategorie ocen</a></li>
</ul>
<p>Kategorie ocen</p>
<span id="errorMessage" name="errorMessage"></span>
<input type="button" id="addNoteCategory" name="addNoteCategory" value="Dodaj kategorię oceny" />
<div>
    <form id="noteCategoryInsertForm">
        <fieldset>
            <label for="insertedNoteCategoryName">Nazwa: </label>
            <input type="text" id="insertedNoteCategoryName" name="insertedNoteCategoryName" />
        </fieldset>
        <input type="submit" id="insertNoteCategory" name="insertNoteCategory" value="Zapisz" />
    </form>
</div>
<div>
    <form id="noteCategoryEditForm">
        <fieldset>
            <label for="editedNoteCategoryName">Nazwa: </label>
            <input type="text" id="editedNoteCategoryName" name="editedNoteCategoryName" />
        </fieldset>
        <input type="submit" id="updateNoteCategoryName" name="updateNoteCategoryName" value="Zapisz" />
    </form>
</div>
<table id="noteCategoriesList" name="noteCategoriesList"></table>
<script src="../src/app/js/noteCategoriesScript.js" type="text/javascript"></script>