window.onload = init;
var showEditForm = false;
var showInsertForm = false;

function init() {
    showHideEditForm();
    showHideInsertForm();
    $('#addNoteCategory').click(function() {
        showInsertForm = true;
        showHideInsertForm();
    })
    $('#insertNoteCategory').click(function() {
        addNoteCategory();
    })
    $.post(
        "get.php",
        {
            table: "note_category",
            teacherId: 1
        },
        function(response){
            var noteCategories = JSON.parse(response);
            createNoteCategoriesList(noteCategories);
        }
    );
}

function showHideEditForm() {
    if(showEditForm)
        $('#noteCategoryEditForm').show();
    else
        $('#noteCategoryEditForm').hide();
}

function showHideInsertForm() {
    if(showInsertForm)
        $('#noteCategoryInsertForm').show();
    else
        $('#noteCategoryInsertForm').hide();
}

function createNoteCategoriesList(noteCategories) {
    for(var key in noteCategories) {
        appendNoteCategory(noteCategories[key]);
        $("#edit_" + noteCategories[key].ID).click(function() {
            prepareEditForm($(this));
            showEditForm = true;
            showHideEditForm();
        });
        $("#delete_" + noteCategories[key].ID).click(function() {
            deleteNoteCategory($(this)) });
    }
}

function completeTextField(noteCategoryName) {
    $('#editedNoteCategoryName').val(noteCategoryName);
}

function prepareEditForm(element) {
    completeTextField(element.attr('name'));
    var id = element.attr("id").replace("edit_", '');
    $('#updateNoteCategoryName').click(function() {updateNoteCategory(id)});
}

function appendNoteCategory(noteCategoryData) {
    var tableRow = "<tr><td id='noteCategoryName_" + noteCategoryData.ID + "'>" + noteCategoryData.name + "</td><td>" +
        createEditButton(noteCategoryData.ID, noteCategoryData.name) + "</td><td>" + createDeleteButton(noteCategoryData.ID) + "</td></tr>";
    $('#noteCategoriesList').append(tableRow);
}

function createEditButton(id, name) {
    return "<input type='button' id='edit_" + id + "' name='" + name + "' value='Edytuj' />";
}

function createDeleteButton(id) {
    return "<input type='button' id='delete_" + id + "' value='Usuń' />";
}

function updateNoteCategory(id) {
    $.post(
        "update.php",
        {
            table: "note_category",
            id: {ID: id},
            set: {name: $('#editedNoteCategoryName').val()},
            operator: ''
        },
        function(response){
            if(JSON.parse(response))
                $('#noteCategoryName_' + id).text($('#editedNoteCategoryName').val());

            else
                $('#errorMessage').text("Wystąpił błąd");
        }
    );
}

function addNoteCategory() {
    $.post(
        "insert.php",
        {
            table: "note_category",
            data: {name: $('#insertedNoteCategoryName').val(), teacher_ID: 1},
            operator: ''
        },
        function(response){
            if(JSON.parse(response)) {
                var addedNoteCategory = JSON.parse(response)[0];
                appendNoteCategory(addedNoteCategory);
            }
            else
                $('#errorMessage').text("Wystąpił błąd");
        }
    );
}

function deleteNoteCategory(element) {
    var id = element.attr("id").replace("delete_", '');
    $.post(
        "delete.php",
        {
            table: "note_category",
            data: {id: id},
            operator: ''
        },
        function(response){
            if(JSON.parse(response)) {
                removeNoteCategory(id);
            }
            else
                $('#errorMessage').text("Wystąpił błąd");
        }
    );
}

function removeNoteCategory(id) {
    $('#delete_' + id).parent().parent().remove();
}