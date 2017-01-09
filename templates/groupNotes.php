<p>Oceny</p>
<span id="errorMessage" name="errorMessage"></span>
<span id="successMessage" name="successMessage"></span>
<input type="button" id="addNote" name="addNote" value="Dodaj ocenę" />
<div>
    <form id="insertNoteForm">
        <img src="/Repositories/eDziennik/images/cross.png" alt="cross" id="hideAddNoteForm" name="hideAddNoteForm" class="cross" />
        <fieldset>
            <label for="noteStudentName">Student: </label>
            <select id="noteStudentName" name="studentName"></select>
        </fieldset>
        <fieldset>
            <label for="noteCategoryName">Kategoria: </label>
            <select id="noteCategoryName" name="categoryName"></select>
        </fieldset>
        <fieldset>
            <label for="studentNote">Ocena: </label>
            <select id="studentNote" name="note">
                <option></option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
            </select>
        </fieldset>
        <input type="submit" id="saveNote" name="saveNote" value="Zapisz" />
    </form>
</div>
<div>
    <form id="editNoteForm">
        <img src="/Repositories/eDziennik/images/cross.png" alt="cross" id="hideEditNoteForm" name="hideEditNoteForm" class="cross" />
        <fieldset>
            <label for="editNoteCategoryName">Kategoria: </label>
            <select id="editNoteCategoryName" name="categoryName"></select>
        </fieldset>
        <fieldset>
            <label for="editStudentNote">Ocena: </label>
            <select id="editStudentNote" name="note">
                <option></option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
            </select>
        </fieldset>
        <input type="submit" id="updateNote" name="updateNote" value="Zapisz" />
    </form>
</div>
<div id="searchForm">
    <form>
        <label for="searchedStudentName">Student: </label>
        <select id="searchedStudentName" name="studentName"></select>
    </form>
</div>
<span id="message" name="message"></span>
<table id="notesList" name="notesList"></table>
<script src="/Repositories/eDziennik/js/groupNotesScript.js" type="text/javascript"></script>