window.onload = init;
var showEditForm = false;
var showInsertForm = false;

function init() {
    showHideEditForm();
    showHideInsertForm();
    $('#addSubject').click(function() {
        showInsertForm = true;
        showHideInsertForm();
    })
    $('#insertSubject').click(function() {
        addSubject();
    })
    $.post(
        "get.php",
        {
            table: "subject"
        },
        function(response){
            var subjects = JSON.parse(response);
            createSubjectsList(subjects);
        }
    );
}

function showHideEditForm() {
    if(showEditForm)
        $('#subjectEditForm').show();
    else
        $('#subjectEditForm').hide();
}

function showHideInsertForm() {
    if(showInsertForm)
        $('#subjectInsertForm').show();
    else
        $('#subjectInsertForm').hide();
}

function createSubjectsList(subjects) {
    for(var key in subjects) {
        appendSubject(subjects[key]);
        $("#edit_" + subjects[key].ID).click(function() {
            prepareEditForm($(this));
            showEditForm = true;
            showHideEditForm();
        });
        $("#delete_" + subjects[key].ID).click(function() {
            deleteSubject($(this)) });
    }
}

function completeTextField(subjectName) {
    $('#editedSubjectName').val(subjectName);
}

function prepareEditForm(element) {
    completeTextField(element.attr('name'));
    var id = element.attr("id").replace("edit_", '');
    $('#updateSubjectName').click(function() {updateSubject(id)});
}

function appendSubject(subjectData) {
    var tableRow = "<tr><td id='subjectName_" + subjectData.ID + "'>" + subjectData.name + "</td><td>" + createEditButton(subjectData.ID, subjectData.name) + "</td> + " +
        "<td>" + createDeleteButton(subjectData.ID) + "</td></tr>";
    $('#subjectsList').append(tableRow);
}

function createEditButton(id, name) {
    return "<input type='button' id='edit_" + id + "' name='" + name + "' value='Edytuj' />";
}

function createDeleteButton(id) {
    return "<input type='button' id='delete_" + id + "' value='Usuń' />";
}

function updateSubject(id) {
    $.post(
        "update.php",
        {
            table: "subject",
            id: {ID: id},
            set: {name: $('#editedSubjectName').val()},
            operator: ''
        },
        function(response){
            if(JSON.parse(response))
                $('#subjectName_' + id).text($('#editedSubjectName').val());

            else
                $('#errorMessage').text("Wystąpił błąd");
        }
    );
}

function addSubject() {
    $.post(
        "insert.php",
        {
            table: "subject",
            data: {name: $('#insertedSubjectName').val()},
            operator: ''
        },
        function(response){
            if(JSON.parse(response)) {
                var addedSubject = JSON.parse(response)[0];
                appendSubject(addedSubject);
            }
            else
                $('#errorMessage').text("Wystąpił błąd");
        }
    );
}

function deleteSubject(element) {
    var id = element.attr("id").replace("delete_", '');
    $.post(
        "delete.php",
        {
            table: "subject",
            data: {id: id},
            operator: ''
        },
        function(response){
            if(JSON.parse(response)) {
                removeSubject(id);
            }
            else
                $('#errorMessage').text("Wystąpił błąd");
        }
    );
}

function removeSubject(id) {
    $('#delete_' + id).parent().parent().remove();
}