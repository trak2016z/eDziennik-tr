<p>Oceny</p>
<span id="errorMessage" name="errorMessage"></span>
<input type="button" id="addNote" name="addNote" value="Dodaj ocenę" />
<div>
    <form id="insertNoteForm">
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
<table id="notesList" name="notesList"></table>
<script src="/Repositories/eDziennik/src/app/js/groupNotesScript.js" type="text/javascript"></script>