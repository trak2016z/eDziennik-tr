<ul>
    <li id="teachersLink"><a href="/Repositories/eDziennik/teachers">Nauczyciele</a></li>
    <li>Grupy</li>
    <li id="subjectsLink"><a href="/Repositories/eDziennik/subjects">Przedmioty</a></li>
    <li><a href="/Repositories/eDziennik/noteCategories">Kategorie ocen</a></li>
</ul>
<p>Grupy</p>
<span id="errorMessage" name="errorMessage"></span>
<input type="button" id="addGroup" name="addGroup" value="Dodaj grupę" />
<div>
    <form id="groupInsertForm">
        <img src="images/cross.png" alt="cross" id="hideAddGroupForm" name="hideAddGroupForm" class="cross" />
        <fieldset>
            <label for="insertedGroupName">Nazwa: </label>
            <input type="text" id="insertedGroupName" name="insertedGroupName" />
        </fieldset>
        <input type="submit" id="insertGroup" name="insertGroup" value="Zapisz" />
    </form>
</div>
<div>
    <form id="groupEditForm">
        <img src="images/cross.png" alt="cross" id="hideEditGroupForm" name="hideEditGroupForm" class="cross" />
        <fieldset>
            <label for="editedGroupName">Nazwa: </label>
            <input type="text" id="editedGroupName" name="editedGroupName" />
        </fieldset>
        <input type="submit" id="updateGroupName" name="updateGroupName" value="Zapisz" />
    </form>
</div>
<span id="message" name="message"></span>
<table id="groupsList" name="groupsList"></table>
<script src="<?php echo "js/groupsScript.js"?>" type="text/javascript"></script>