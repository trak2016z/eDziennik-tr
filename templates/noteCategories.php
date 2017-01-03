<ul>
    <li id="teachersLink"><a href="/Repositories/eDziennik/teachers">Nauczyciele</a></li>
    <li><a href="/Repositories/eDziennik/groups">Grupy</a></li>
    <li id="subjectsLink"><a href="/Repositories/eDziennik/subjects">Przedmioty</a></li>
    <li>Kategorie ocen</li>
</ul>
<p>Kategorie ocen</p>
<span id="errorMessage" name="errorMessage"></span>
<input type="button" id="addNoteCategory" name="addNoteCategory" value="Dodaj kategorię oceny" />
<div>
    <form id="noteCategoryInsertForm">
        <img src="images/cross.png" alt="cross" id="hideAddNoteCategoryForm" name="hideAddNoteCategoryForm" class="cross" />
        <fieldset>
            <label for="insertedNoteCategoryName">Nazwa: </label>
            <input type="text" id="insertedNoteCategoryName" name="insertedNoteCategoryName" />
        </fieldset>
        <input type="submit" id="insertNoteCategory" name="insertNoteCategory" value="Zapisz" />
    </form>
</div>
<div>
    <form id="noteCategoryEditForm">
        <img src="images/cross.png" alt="cross" id="hideEditNoteCategoryForm" name="hideEditNoteCategoryForm" class="cross" />
        <fieldset>
            <label for="editedNoteCategoryName">Nazwa: </label>
            <input type="text" id="editedNoteCategoryName" name="editedNoteCategoryName" />
        </fieldset>
        <input type="submit" id="updateNoteCategoryName" name="updateNoteCategoryName" value="Zapisz" />
    </form>
</div>
<table id="noteCategoriesList" name="noteCategoriesList"></table>
<script src="js/noteCategoriesScript.js" type="text/javascript"></script>