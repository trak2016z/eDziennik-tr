$('document').ready(function () {
    var showEditForm = false;
    var showInsertForm = false;
    showHideEditForm();
    showHideInsertForm();
    $('#addNoteCategory').click(function () {
        showInsertForm = true;
        showHideInsertForm();
    });
    $('#insertNoteCategory').on('click', function (event) {
        event.preventDefault();
        if($('#noteCategoryInsertForm').valid()) {
            $('#errorMessage').empty();
            addNoteCategory();
        }
        else
            $('#errorMessage').text("Nie można zapisać. Formularz zawiera błędy.");
    });
    $.post(
        "get.php",
        {
            table: "note_category",
            teacherId: $.cookie("ID")
        },
        function (response) {
            var noteCategories = JSON.parse(response);
            createNoteCategoriesList(noteCategories);
        }
    );

    $('#noteCategoryInsertForm').validate({
        errorElement: "span",
        rules:{
            insertedNoteCategoryName: {
                required: true,
                noteCategoryNameMatch: true,
                noteCategoryNameUniqueness: true
            }
        },
        messages: {
            insertedNoteCategoryName: {
                required: "Podaj nazwę przedmiotu",
                noteCategoryNameMatch: "Nazwa zawiera niepoprawne znaki. Dozwolone znaki to małe i duże litery,cyfry od 0 do 9, spacje oraz znak _.",
                noteCategoryNameUniqueness: "Podana nazwa już istnieje"
            }
        }
    });

    $('#noteCategoryEditForm').validate({
        errorElement: "span",
        rules:{
            editedNoteCategoryName: {
                required: true,
                noteCategoryNameMatch: true,
                noteCategoryNameUniqueness: true
            }
        },
        messages: {
            editedNoteCategoryName: {
                required: "Podaj nazwę przedmiotu",
                noteCategoryNameMatch: "Nazwa zawiera niepoprawne znaki. Dozwolone znaki to małe i duże litery, cyfry od 0 do 9, spacje oraz znak _.",
                noteCategoryNameUniqueness: "Podana nazwa już istnieje"
            }
        }
    });

    $.validator.addMethod("noteCategoryNameMatch",
        function(value, element) {
            return this.optional( element ) || /^[A-ZŹŻĄĘĆŃŚŁÓa-zźżąęśćńół0-9_\s]{1,20}$/.test( value );
        });

    $.validator.addMethod("noteCategoryNameUniqueness", function(value, element) {
        var responseValue;
        var noteCategoryId = $(element).attr('data-id')?$(element).attr('data-id'):null;
        $.ajax({
            type: 'POST',
            url:  "get.php",
            data: {
                action: "checkNoteCategoryName",
                name: value,
                noteCategoryId: noteCategoryId,
                teacherId: $.cookie("ID")
            },
            success: function(d){
                responseValue = JSON.parse(d);
                console.log(responseValue);
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

    function showHideEditForm() {
        if (showEditForm) {
            showInsertForm = false;
            showHideInsertForm();
            $('#noteCategoryEditForm').show();
        }
        else
            $('#noteCategoryEditForm').hide();
    }

    function showHideInsertForm() {
        if (showInsertForm) {
            showEditForm = false;
            showHideEditForm();
            $('#noteCategoryInsertForm').show();
        }
        else
            $('#noteCategoryInsertForm').hide();
    }

    function createNoteCategoriesList(noteCategories) {
        for (var key in noteCategories) {
            appendNoteCategory(noteCategories[key]);
            $("#edit_" + noteCategories[key].ID).click(function () {
                prepareEditForm($(this));
                showEditForm = true;
                showHideEditForm();
            });
            $("#delete_" + noteCategories[key].ID).click(function () {
                deleteNoteCategory($(this))
            });
        }
    }

    function completeTextField(noteCategoryName, id) {
        $('#editedNoteCategoryName').val(noteCategoryName);
        $('#editedNoteCategoryName').attr("data-id", id);
    }

    function prepareEditForm(element) {
        var id = element.attr("id").replace("edit_", '');
        completeTextField(element.attr('data-notecategoryname'), id);
        $('#updateNoteCategoryName').on('click', function (event) {
            event.preventDefault();
            if($('#noteCategoryEditForm').valid()) {
                $('#errorMessage').empty();
                updateNoteCategory(id);
                id = null;
            }
            else
                $('#errorMessage').text("Nie można zaktualizować. Formularz zawiera błędy.");
        });
    }

    function appendNoteCategory(noteCategoryData) {
        var tableRow = "<tr><td id='noteCategoryName_" + noteCategoryData.ID + "'>" + noteCategoryData.name + "</td><td>" +
            createEditButton(noteCategoryData.ID, noteCategoryData.name) + "</td><td>" + createDeleteButton(noteCategoryData.ID) + "</td></tr>";
        $('#noteCategoriesList').append(tableRow);
    }

    function createEditButton(id, name) {
        return "<input type='button' id='edit_" + id + "' name='edit_" + id + "' data-notecategoryname='" + name + "' value='Edytuj' />";
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
            function (response) {
                if (JSON.parse(response)) {
                    $('#noteCategoryName_' + id).text($('#editedNoteCategoryName').val());
                    showEditForm = false;
                    showHideEditForm();
                }

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
                data: {
                    name: $('#insertedNoteCategoryName').val(),
                    teacher_ID: $.cookie("ID")
                },
                operator: ''
            },
            function (response) {
                if (JSON.parse(response)) {
                    var addedNoteCategory = JSON.parse(response)[0];
                    appendNoteCategory(addedNoteCategory);
                    showInsertForm = false;
                    showHideInsertForm();
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
            function (response) {
                if (JSON.parse(response)) {
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
});