$('document').ready(function () {
    var showInsertForm = false;
    var showEditForm = false;
    var groupId, subjectId;
    //Ustawienie odpowiedniego id w odnośniku do zakładki "Przedmioty"
    changeUrlParameter();
    showHideInsertForm();
    showHideEditForm();
    getAllCategories();
    getAllStudents();
    //Ustawienie zdarzenia dla przycisku
    $('#addNote').click(function () {
        showInsertForm = true;
        showHideInsertForm();
    });
    $('#saveNote').on('click', function (event) {
        event.preventDefault();
        if($('#insertNoteForm').valid()) {
            $('#errorMessage').empty();
            addNote();
        }
        else
            $('#errorMessage').text("Nie można zapisać. Formularz zawiera błędy.");
    });
    $('#searchedStudentName').change(function () {
        displayStudentNotes();
    });

    $('#hideAddNoteForm').on("click", function() {
        showInsertForm = false;
        showHideInsertForm();
    });

    $('#hideEditNoteForm').on("click", function() {
        showEditForm = false;
        showHideEditForm();
    });

//Funkcja zmieniająca atrybut href odnośnika do zakładki "Przedmioty"
    function changeUrlParameter() {
        var linkToUpdate = $('a').eq(1).attr('href');
        var currentUrl = location.href.split("/");
        groupId = currentUrl[currentUrl.indexOf("groups") + 1];
        subjectId = currentUrl[currentUrl.indexOf("subjects") + 1];
    }

    $('#insertNoteForm').validate({
        errorElement: "span",
        rules:{
            studentName: {
                required: true
            },
            categoryName: {
                required: true
            },
            note: {
                required: true
            }
        },
        messages: {
            studentName: {
                required: "Wybierz student"
            },
            categoryName: {
                required: "Wybierz kategorię"
            },
            note: {
                required: "Wybierz ocenę"
            }
        }
    });

    $('#editNoteForm').validate({
        errorElement: "span",
        rules:{
            studentName: {
                required: true
            },
            categoryName: {
                required: true
            },
            note: {
                required: true
            }
        },
        messages: {
            studentName: {
                required: "Wybierz studenta"
            },
            categoryName: {
                required: "Wybierz kategorię"
            },
            note: {
                required: "Wybierz ocenę"
            }
        }
    });

    function showHideInsertForm() {
        if (showInsertForm) {
            $('#errorMessage').empty();
            showEditForm = false;
            showHideEditForm();
            $('#insertNoteForm').show();
        }
        else
            $('#insertNoteForm').hide();
    }

//Funkcja sterująca widocznością formularza edycji
    function showHideEditForm() {
        if (showEditForm) {
            $('#errorMessage').empty();
            showInsertForm = false;
            showHideInsertForm();
            $('#editNoteForm').show();
        }
        else {
            $('#editNoteForm').hide();
        }
    }

    function getAllCategories() {
        $.post(
            "http://localhost/Repositories/eDziennik/get.php",
            {
                table: "note_category",
                teacherId: 1
            },
            function (response) {
                var noteCategories = JSON.parse(response);
                createNoteCategoriesList(noteCategories);
            }
        );
    }

    function createNoteCategoriesList(noteCategories) {
        $("[name='categoryName']").append($('<option>'));
        for (var key in noteCategories) {
            $("[name='categoryName']").append($('<option>', {
                value: noteCategories[key].ID,
                text: noteCategories[key].name
            }));
        }
    }

    function getAllStudents() {
        $.post(
            "http://localhost/Repositories/eDziennik/get.php",
            {
                table: "student",
                group_ID: groupId
            },
            function (response) {
                var students = JSON.parse(response);
                createStudentsList(students);
            }
        );
    }

    function createStudentsList(students) {
        $("[name='studentName']").append($('<option>'));
        for (var key in students) {
            $("[name='studentName']").append($('<option>', {
                value: students[key].ID,
                text: students[key].name + " " + students[key].surname
            }));
        }
    }

    function displayStudentNotes() {
        $.post(
            "http://localhost/Repositories/eDziennik/get.php",
            {
                table: "group_notes",
                studentId: $('#searchedStudentName option:selected').val(),
                subjectId: subjectId
            },
            function (response) {
                var notes = JSON.parse(response);
                createNotesList(notes);
            }
        );
    }

    function createNotesList(notes) {
        for (var key in notes) {
            appendNote(notes[key]);
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
            deleteNote($(this)) });
    }

//Funkcja ustawiająca zdarzenie dla przycisku zapisania w formularzu edycji
    function prepareEditForm(element) {
        var id = element.attr("id").replace("edit_", '');
        completeTextField(element);
        $('#updateNote').on('click', function (event) {
            event.preventDefault();
            if($('#editNoteForm').valid()) {
                $('#errorMessage').empty();
                updateNote($('#editNoteCategoryName').attr("data-id"));
                id = null;
            }
            else
                $('#errorMessage').text("Nie można zaktualizować. Formularz zawiera błędy.");
        });
    }

//Funkcja ustawiająca aktualną nazwę grupy w polu text formularza edycji
    function completeTextField(element) {
        var categoryId = element.parent().siblings("[id^='category_']").attr('id').replace("category_", '');
        $('#editNoteCategoryName').val(categoryId);
        $('#editNoteCategoryName').attr("data-id", element.attr("id").replace("edit_", ''));
        var note = element.parent().siblings("[id^='note_']").attr('id').replace("note_", '');
        $('#editStudentNote').val(note);
    }

    function addNote() {
        $.post(
            "http://localhost/Repositories/eDziennik/insert.php",
            {
                table: "note",
                data: {
                    subject_ID: subjectId,
                    student_ID: $('#noteStudentName option:selected').val(),
                    category_ID: $('#noteCategoryName option:selected').val(),
                    note: $('#studentNote option:selected').val(),
                }
            },
            function (response) {
                if (!JSON.parse(response)) {
                    $('#errorMessage').text("Wystąpił błąd");
                }
                else
                    $('#errorMessage').text("Ocena została dodana do dziennika");
                    showInsertForm = false;
                    showHideInsertForm();
                    clearFormInputs();
            }
        );
    }

    function clearFormInputs() {
        $("#noteStudentName").val("");
        $("#noteCategoryName").val("");
        $("#studentNote").val("");
    }

    function appendNote(note) {
        var tableRow = "<tr><td id='note_" + note.note + "'>" + note.note + "</td><td id='category_" + note.category_ID + "'>" +
            note.name + "</td><td>" + createEditButton(note.ID) + "</td><td>" + createDeleteButton(note.ID) + "</td></tr>";
        $('#notesList').append(tableRow);
        setEditEvent(note.ID);
        setDeleteEvent(note.ID);
    }

//Funkcja tworząca przycisk edycji
    function createEditButton(id) {
        return "<input type='button' id='edit_" + id + "' value='Edytuj' />";
    }

//Funkcja tworząca przycisk usuwania
    function createDeleteButton(id) {
        return "<input type='button' id='delete_" + id + "' value='Usuń' />";
    }

    function updateNote(id) {
        $.post(
            "http://localhost/Repositories/eDziennik/update.php",
            {
                table: "note",
                conditions: {ID: id},
                set: {
                    category_ID: $('#editNoteCategoryName option:selected').val(),
                    note: $('#editStudentNote option:selected').val()
                },
                operator: ''
            },
            function (response) {
                if (JSON.parse(response)) {
                    $('#edit_' + id).parent().siblings("[id^='note_']").text($('#editStudentNote option:selected').text());
                    $('#edit_' + id).parent().siblings("[id^='note_']").attr("id", "note_" + $('#editStudentNote option:selected').val());
                    $('#edit_' + id).parent().siblings("[id^='category_']").text($('#editNoteCategoryName option:selected').text());
                    $('#edit_' + id).parent().siblings("[id^='category_']").attr("id", "category_" + $('#editNoteCategoryName option:selected').val());
                    showEditForm = false;
                    showHideEditForm();
                }
                else
                    $('#errorMessage').text("Wystąpił błąd");
            }
        );
    }

    function deleteNote(element) {
        var id = element.attr("id").replace("delete_", '');
        $.post(
            "http://localhost/Repositories/eDziennik/delete.php",
            {
                table: "note",
                data: {id: id},
                operator: ''
            },
            function (response) {
                if (JSON.parse(response)) {
                    showEditForm = false;
                    showHideEditForm();
                    removeNote(id);
                }
                else
                    $('#errorMessage').text("Wystąpił błąd");
            }
        );
    }

    function removeNote(id) {
        $('#delete_' + id).parent().parent().remove();
    }
});