<ul>
    <li><a href="/Repositories/eDziennik/web/teachers">Nauczyciele</a></li>
    <li><a href="">Grupy</a></li>
    <li><a href="/Repositories/eDziennik/web/subjects">Przedmioty</a></li>
    <li><a href="/Repositories/eDziennik/web/noteCategories">Kategorie ocen</a></li>
</ul>
<p>Grupy</p>
<span id="errorMessage" name="errorMessage"></span>
<input type="button" id="addGroup" name="addGroup" value="Dodaj grupę" />
<div id="groupInsertForm">
    <form>
        <label for="insertedGroupName">Nazwa: </label>
        <input type="text" id="insertedGroupName" name="insertedGroupName" />
        <input type="button" id="insertGroup" name="insertGroup" value="Zapisz" />
    </form>
</div>
<div id="groupEditForm">
    <form>
        <label for="editedGroupName">Nazwa: </label>
        <input type="text" id="editedGroupName" name="editedGroupName" />
        <input type="button" id="updateGroupName" name="updateGroupName" value="Zapisz" />
    </form>
</div>
<table id="groupsList" name="groupsList"></table>
<script src="<?php echo "../src/app/js/groupsScript.js"?>" type="text/javascript"></script>