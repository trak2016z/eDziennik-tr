window.onload = init;
var showEditForm = false;
var showInsertForm = false;

function init() {
    //Ukrycie formularza edycji
    showHideEditForm();
    //Ukrycie formularza dodawania
    showHideInsertForm();
    //Dodanie zdarzeń do przycisków
    $('#addGroup').click(function() {
        showInsertForm = true;
        showHideInsertForm();
    });
    $('#insertGroup').click(function() {
        addGroup();
    });
    //Pobranie istniejących grup
    $.post(
        "get.php",
        {
            table: "group"
        },
        function(response){
            var groups = JSON.parse(response);
            createGroupsList(groups);
        }
    );
}

//Funkcja sterująca widocznością formularza edycji
function showHideEditForm() {
    if(showEditForm)
        $('#groupEditForm').show();
    else
        $('#groupEditForm').hide();
}

//Funkcja sterująca widocznością formularza dodawania
function showHideInsertForm() {
    if(showInsertForm)
        $('#groupInsertForm').show();
    else
        $('#groupInsertForm').hide();
}

//Funkcja dodająca pobrane grupy do tabeli
function createGroupsList(groups) {
    for(var key in groups) {
        appendGroup(groups[key]);
        //Ustawienie zdarzeń dla przycisków edycji i usuwania
        $("#edit_" + groups[key].ID).click(function() {
            prepareEditForm($(this));
            showEditForm = true;
            showHideEditForm();
        });
        $("#delete_" + groups[key].ID).click(function() {
            deleteGroup($(this)) });
    }
}

//Funkcja ustawiająca aktualną nazwę grupy w polu text formularza edycji
function completeTextField(groupName) {
    $('#editedGroupName').val(groupName);
}

//Funkcja ustawiająca zdarzenie dla przycisku zapisania w formularzu edycji
function prepareEditForm(element) {
    completeTextField(element.attr('name'));
    var id = element.attr("id").replace("edit_", '');
    $('#updateGroupName').on('click',function(){
        updateGroup(id);
        id = null;
    });
}

//Funkcja dodająca wiersz z danymi grupy do tabeli
function appendGroup(groupData) {
    var tableRow = "<tr><td id='groupName_" + groupData.ID + "'><a href='/Repositories/eDziennik/web/groups/" + groupData.ID + "/students'>" +
        groupData.name + "</a></td><td>" + createEditButton(groupData.ID, groupData.name) + "</td><td>" + createDeleteButton(groupData.ID) + "</td></tr>";
    $('#groupsList').append(tableRow);
}

//Funkcja tworząca przycisk edycji
function createEditButton(id, name) {
    return "<input type='button' id='edit_" + id + "' name='" + name + "' value='Edytuj' />";
}

//Funkcja tworząca przycisk usuwania
function createDeleteButton(id) {
    return "<input type='button' id='delete_" + id + "' value='Usuń' />";
}
//Funkcja do edycji grupy
function updateGroup(id) {
    $.post(
        "update.php",
        {
            table: "group",
            id: {ID: id},
            set: {name: $('#editedGroupName').val()},
            operator: '',
        },
        function(response){
            if(JSON.parse(response)){
                $('#groupName_' + id).text($('#editedGroupName').val());

            }
            else
                $('#errorMessage').text("Wystąpił błąd");
        }
    );
}



//Funkcja do dodawania nowej grupy
function addGroup() {
    $.post(
        "insert.php",
        {
            table: "group",
            data: {name: $('#insertedGroupName').val()}
        },
        function(response){
            if(JSON.parse(response)) {
                var addedGroup = JSON.parse(response)[0];
                appendGroup(addedGroup);
            }
            else
                $('#errorMessage').text("Wystąpił błąd");
        }
    );
}

//Funkcja do usuwania grupy
function deleteGroup(element) {
    var id = element.attr("id").replace("delete_", '');
    $.post(
        "delete.php",
        {
            table: "group",
            data: {id: id},
            operator: ''
        },
        function(response){
            if(JSON.parse(response)) {
                removeGroup(id);
            }
            else
                $('#errorMessage').text("Wystąpił błąd");
        }
    );
}

//Usuwanie grupy z tabeli
function removeGroup(id) {
    $('#delete_' + id).parent().parent().remove();
}