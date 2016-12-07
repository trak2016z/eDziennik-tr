<ul>
    <li><a href="/Repositories/eDziennik/web/teachers">Nauczyciele</a></li>
    <li><a href="">Grupy</a></li>
    <li><a href="/Repositories/eDziennik/web/subjects">Przedmioty</a></li>
    <li><a href="/Repositories/eDziennik/web/noteCategories">Kategorie ocen</a></li>
</ul>
<p>Grupy</p>
<span id="errorMessage" name="errorMessage"></span>
<input type="button" id="addGroup" name="addGroup" value="Dodaj grupę" />
<div>
    <form id="groupInsertForm">
        <fieldset>
            <label for="insertedGroupName">Nazwa: </label>
            <input type="text" id="insertedGroupName" name="insertedGroupName" />
        </fieldset>
        <input type="submit" id="insertGroup" name="insertGroup" value="Zapisz" />
    </form>
</div>
<div>
    <form id="groupEditForm">
        <fieldset>
            <label for="editedGroupName">Nazwa: </label>
            <input type="text" id="editedGroupName" name="editedGroupName" />
        </fieldset>
        <input type="submit" id="updateGroupName" name="updateGroupName" value="Zapisz" />
    </form>
</div>
<table id="groupsList" name="groupsList"></table>
<script src="<?php echo "../src/app/js/groupsScript.js"?>" type="text/javascript"></script>