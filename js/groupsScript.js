$('document').ready(function () {
    hideLinks();
    hideInsertGroupButton();
    var showEditForm = false;
    var showInsertForm = false;
    //Ukrycie formularza edycji
    showHideEditForm();
    //Ukrycie formularza dodawania
    showHideInsertForm();
    //Dodanie zdarzeń do przycisków
    $('#addGroup').click(function() {
        showInsertForm = true;
        showHideInsertForm();
    });
    $('#insertGroup').on('click', function(event) {
        event.preventDefault();
        if($('#groupInsertForm').valid()) {
            $('#errorMessage').empty();
            addGroup();
        }
        else
            $('#errorMessage').text("Nie można zapisać. Formularz zawiera błędy.");
    });

    $('#hideAddGroupForm').on("click", function() {
        showInsertForm = false;
        showHideInsertForm();
        clearFormInputs();
    });

    $('#hideEditGroupForm').on("click", function() {
        showEditForm = false;
        showHideEditForm();
    });

    function hideEditDeleteButtons() {
        if(parseInt($.cookie("type")) !== 1) {
            $('input:button[value="Edytuj"], input:button[value="Usuń"]').hide();
        }
    }

    function hideInsertGroupButton() {
        if(parseInt($.cookie("type")) !== 1) {
            $('input:button[value="Dodaj grupę"]').hide();
        }
    }

    function hideLinks() {
        if(parseInt($.cookie("type")) !== 1) {
            $('#teachersLink').hide();
            $('#subjectsLink').hide();
        }
    }

    //Pobranie istniejących grup
    $.post(
        "get.php",
        {
            table: "group",
            teacherId: $.cookie("ID"),
            type: $.cookie("type")
        },
        function(response){
            if(JSON.parse(response)) {
             //   console.log(response);
                var groups = JSON.parse(response);
                createGroupsList(groups);
                hideEditDeleteButtons();
            }
            else {
                $('#groupsList').hide();
                $('#message').text("Brak grup");
            }
        }
    );

    $('#groupInsertForm').validate({
        errorElement: "span",
        rules:{
            insertedGroupName: {
                required: true,
                groupNameMatch: true,
                groupNameUniqueness: true
            }
        },
        messages: {
            insertedGroupName: {
                required: "Podaj nazwę przedmiotu",
                groupNameMatch: "Nazwa zawiera niepoprawne znaki. Dozwolone znaki to małe i duże litery,cyfry od 0 do 9, spacje oraz znak _.",
                groupNameUniqueness: "Podana nazwa już istnieje"
            }
        }
    });

    $('#groupEditForm').validate({
        errorElement: "span",
        rules:{
            editedGroupName: {
                required: true,
                groupNameMatch: true,
                groupNameUniqueness: true
            }
        },
        messages: {
            editedGroupName: {
                required: "Podaj nazwę przedmiotu",
                groupNameMatch: "Nazwa zawiera niepoprawne znaki. Dozwolone znaki to małe i duże litery, cyfry od 0 do 9, spacje oraz znak _.",
                groupNameUniqueness: "Podana nazwa już istnieje"
            }
        }
    });

    $.validator.addMethod("groupNameMatch",
        function(value, element) {
            return this.optional( element ) || /^[A-ZŹŻĄĘĆŃŚŁÓa-zźżąęśćńół0-9_\s]{1,20}$/.test( value );
        });

    $.validator.addMethod("groupNameUniqueness", function(value, element) {
        var responseValue;
        var groupId = $(element).attr('data-id')?$(element).attr('data-id'):null;
        $.ajax({
            type: 'POST',
            url:  "get.php",
            data: {
                action: "checkGroupName",
                name: value,
                groupId: groupId
            },
            success: function(resp){
                responseValue = JSON.parse(resp);
            },
            error: function(request, error){
                console.log(arguments);
                console.log(error);
                //  alert(" Can't do because: " + error);
            },
            async: false
        });
        return responseValue;
    });

    //Funkcja sterująca widocznością formularza edycji
    function showHideEditForm() {
        if(showEditForm) {
            showInsertForm = false;
            showHideInsertForm();
            $('#groupEditForm').show();
        }
        else
            $('#groupEditForm').hide();
    }

    //Funkcja sterująca widocznością formularza dodawania
    function showHideInsertForm() {
        if(showInsertForm) {
            showEditForm = false;
            showHideEditForm();
            $('#groupInsertForm').show();
        }
        else
            $('#groupInsertForm').hide();
    }

    //Funkcja dodająca pobrane grupy do tabeli
    function createGroupsList(groups) {
        for(var key in groups) {
            appendGroup(groups[key]);
        }
    }

    function setEditEvent(id) {
        $("#edit_" + id).click(function() {
            prepareEditForm($(this));
            showEditForm = true;
            showHideEditForm();
        });
    }

    function setDeleteEvent(id) {
        $("#delete_" + id).click(function() {
            deleteGroup($(this)) });
    }

    //Funkcja ustawiająca aktualną nazwę grupy w polu text formularza edycji
    function completeTextField(groupName, id) {
        $('#editedGroupName').val(groupName);
        $('#editedGroupName').attr("data-id", id);
    }

    //Funkcja ustawiająca zdarzenie dla przycisku zapisania w formularzu edycji
    function prepareEditForm(element) {
        var id = element.attr("id").replace("edit_", '');
        completeTextField(element.attr('data-groupname'), id);
        $('#updateGroupName').on('click',function(event){
            event.preventDefault();
            if($('#groupEditForm').valid()) {
                $('#errorMessage').empty();
                updateGroup($('#editedGroupName').attr("data-id"));
                id = null;
            }
            else
                $('#errorMessage').text("Nie można zaktualizować. Formularz zawiera błędy.");
        });
    }

    //Funkcja dodająca wiersz z danymi grupy do tabeli
    function appendGroup(groupData) {
        var tableRow = "<tr><td id='groupName_" + groupData.ID + "'><a href='/Repositories/eDziennik/groups/" + groupData.ID + "/students'>" +
            groupData.name + "</a></td><td>" + createEditButton(groupData.ID, groupData.name) + "</td><td>" + createDeleteButton(groupData.ID) + "</td></tr>";
        $('#groupsList').append(tableRow);
        setEditEvent(groupData.ID);
        setDeleteEvent(groupData.ID);
    }

    //Funkcja tworząca przycisk edycji
    function createEditButton(id, name) {
        return "<input type='button' id='edit_" + id + "' name='edit_" + id + "' data-groupname='" + name + "' value='Edytuj' />";
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
                conditions: {ID: id},
                set: {name: $('#editedGroupName').val()},
                operator: ''
            },
            function(response){
                if(JSON.parse(response)) {
                    $('#groupName_' + id).find("a").text($('#editedGroupName').val());
                    $('#edit_' + id).attr('data-groupname', $('#editedGroupName').val());
                    showEditForm = false;
                    showHideEditForm();
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
                    showInsertForm = false;
                    showHideInsertForm();
                    clearFormInputs();
                }
                else
                    $('#errorMessage').text("Wystąpił błąd");
            }
        );
    }

    function clearFormInputs() {
        $("#insertedGroupName").val("");
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
                    showEditForm = false;
                    showHideEditForm();
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
});