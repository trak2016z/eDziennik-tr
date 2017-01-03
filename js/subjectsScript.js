$('document').ready(function () {
    var showEditForm = false;
    var showInsertForm = false;
    showHideEditForm();
    showHideInsertForm();
    $('#addSubject').click(function() {
        showInsertForm = true;
        showHideInsertForm();
    });
    $('#insertSubject').on('click', function(event) {
        event.preventDefault();
        if($('#subjectInsertForm').valid()) {
            $('#errorMessage').empty();
            addSubject();
        }
        else
            $('#errorMessage').text("Nie można zapisać. Formularz zawiera błędy.");
    });

    $('#hideAddSubjectForm').on("click", function() {
        showInsertForm = false;
        showHideInsertForm();
    });

    $('#hideEditSubjectForm').on("click", function() {
        showEditForm = false;
        showHideEditForm();
    });

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

    $('#subjectInsertForm').validate({
        errorElement: "span",
        rules:{
            insertedSubjectName: {
                required: true,
                subjectNameMatch: true,
                subjectNameUniqueness: true
            }
        },
        messages: {
            insertedSubjectName: {
                required: "Podaj nazwę przedmiotu",
                subjectNameMatch: "Nazwa zawiera niepoprawne znaki. Nazwa musi się zaczynać od dużej litery. Dozwolone znaki to małe i duże litery, " +
                "cyfry od 0 do 9, spacje oraz znak _.",
                subjectNameUniqueness: "Podana nazwa już istnieje"
            }
        }
    });

    $('#subjectEditForm').validate({
        errorElement: "span",
        rules:{
            editedSubjectName: {
                required: true,
                subjectNameMatch: true,
                subjectNameUniqueness: true
            }
        },
        messages: {
            editedSubjectName: {
                required: "Podaj nazwę przedmiotu",
                subjectNameMatch: "Nazwa zawiera niepoprawne znaki. Nazwa musi się zaczynać od dużej litery. Dozwolone znaki to małe i duże litery, " +
                "cyfry od 0 do 9, spacje oraz znak _.",
                subjectNameUniqueness: "Podana nazwa już istnieje"
            }
        }
    });

    $.validator.addMethod("subjectNameMatch",
        function(value, element) {
            return this.optional( element ) || /^[A-ZŹŻĄĘĆŃŚŁÓ][a-zźżąęśćńół0-9_\s]{1,19}$/.test( value );
    });

    $.validator.addMethod("subjectNameUniqueness", function(value, element) {
        var responseValue;
        var subjectId = $(element).attr('data-id')?$(element).attr('data-id'):null;
        $.ajax({
            type: 'POST',
            url:  "get.php",
            data: {
                action: "checkSubjectName",
                name: value,
                subjectId: subjectId
            },
            success: function(d){
                responseValue = JSON.parse(d);
                console.log(responseValue);
            },
            error: function(request, error){
                 console.log(arguments);
                 console.log(error);
            },
            async: false
        });
        return responseValue;
    });

    function showHideEditForm() {
        if(showEditForm) {
            showInsertForm = false;
            showHideInsertForm();
            $('#subjectEditForm').show();
        }
        else
            $('#subjectEditForm').hide();
    }

    function showHideInsertForm() {
        if(showInsertForm) {
            showEditForm = false;
            showHideEditForm();
            $('#subjectInsertForm').show();
        }
        else
            $('#subjectInsertForm').hide();
    }

    function createSubjectsList(subjects) {
        for(var key in subjects) {
            appendSubject(subjects[key]);
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
            deleteSubject($(this)) });
    }

    function completeTextField(subjectName, id) {
        console.log(subjectName);
        $('#editedSubjectName').val(subjectName);
        $('#editedSubjectName').attr("data-id", id);
    }

    function prepareEditForm(element) {
        var id = element.attr("id").replace("edit_", '');
        completeTextField(element.attr('data-subjectname'), id);
        $('#updateSubjectName').on('click', function(event) {
            event.preventDefault();
            if($('#subjectEditForm').valid()) {
                $('#errorMessage').empty();
                updateSubject($('#editedSubjectName').attr("data-id"));
                id = null;
            }
            else
                $('#errorMessage').text("Nie można zaktualizować. Formularz zawiera błędy.");
        })
    }

    function appendSubject(subjectData) {
        var tableRow = "<tr><td id='subjectName_" + subjectData.ID + "'>" + subjectData.name + "</td><td>" + createEditButton(subjectData.ID, subjectData.name) + "</td> + " +
            "<td>" + createDeleteButton(subjectData.ID) + "</td></tr>";
        $('#subjectsList').append(tableRow);
        setEditEvent(subjectData.ID);
        setDeleteEvent(subjectData.ID);
    }

    function createEditButton(id, name) {
        return "<input type='button' id='edit_" + id + "' name='edit_" + id + "' data-subjectname='" + name + "' value='Edytuj' />";
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
                if(JSON.parse(response)) {
                    $('#subjectName_' + id).text($('#editedSubjectName').val());
                    $('#edit_' + id).attr('data-subjectname', $('#editedSubjectName').val());
                    showEditForm = false;
                    showHideEditForm();
                }
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
        $("#insertedSubjectName").val("");
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
                    showEditForm = false;
                    showHideEditForm();
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

});