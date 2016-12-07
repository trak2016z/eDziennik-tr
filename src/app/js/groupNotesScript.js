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
            note: {
                required: true
            }
        },
        messages: {
            studentName: {
                required: "Wybierz student"
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
            note: {
                required: true
            }
        },
        messages: {
            studentName: {
                required: "Wybierz studenta"
            },
            note: {
                required: "Wybierz ocenę"
            }
        }
    });

    function showHideInsertForm() {
        if (showInsertForm) {
            showEditForm = false;
            showHideEditForm()
            $('#insertNoteForm').show();
        }
        else
            $('#insertNoteForm').hide();
    }

//Funkcja sterująca widocznością formularza edycji
    function showHideEditForm() {
        if (showEditForm) {
            showInsertForm = false;
            showHideInsertForm();
            //  $('#updateGroupSubject').on("click",function(){return false;});
            // $('#updateGroupSubject').click(function() {updateGroupSubject(id)});
            $('#editNoteForm').show();
        }
        else {
            //   $('#updateGroupSubject').on("click",function(){return false;});
            $('#editNoteForm').hide();
        }

    }

    function getAllCategories() {
        $.post(
            "../../../get.php",
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
            "../../../get.php",
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
            "../../../get.php",
            {
                table: "note",
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
            //Ustawienie zdarzeń dla przycisków edycji i usuwania
            $("#edit_" + notes[key].ID).click(function () {
                prepareEditForm($(this));
                showEditForm = true;
                //showHideEditForm($(this).attr("id").replace("edit_", ""));
                showHideEditForm();
            });
            $("#delete_" + notes[key].ID).click(function () {
                deleteNote($(this))
            });
        }
    }

//Funkcja ustawiająca zdarzenie dla przycisku zapisania w formularzu edycji
    function prepareEditForm(element) {
        var id = element.attr("id").replace("edit_", '');
        completeTextField(element);
        $('#updateNote').on('click', function (event) {
            event.preventDefault();
            if($('#editNoteForm').valid()) {
                $('#errorMessage').empty();
                updateNote(id);
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
        var note = element.parent().siblings("[id^='note_']").attr('id').replace("note_", '');
        $('#editStudentNote').val(note);
    }

    function addNote() {
        $.post(
            "../../../insert.php",
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
                    showInsertForm = false;
                    showHideInsertForm();
                }
                else
                    $('#errorMessage').text("Ocena została dodana do dziennika");
            }
        );
    }

    function appendNote(note) {
        var tableRow = "<tr><td id='note_" + note.note + "'>" + note.note + "</td><td id='category_" + note.category_ID + "'>" +
            note.name + "</td><td>" + createEditButton(note.ID) + "</td><td>" + createDeleteButton(note.ID) + "</td></tr>";
        $('#notesList').append(tableRow);
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
            "../../../update.php",
            {
                table: "note",
                id: {ID: id},
                set: {
                    category_ID: $('#editNoteCategoryName option:selected').val(),
                    note: $('#editStudentNote option:selected').val()
                },
                operator: ''
            },
            function (response) {
                if (JSON.parse(response)) {
                    $('#edit_' + id).parent().siblings("[id^='note_']").text($('#editStudentNote option:selected').text());
                    $('#edit_' + id).parent().siblings("[id^='category_']").text($('#editNoteCategoryName option:selected').text());
                    //  $('#updateGroupSubject').unbind('updateGroupSubject');
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
            "../../../delete.php",
            {
                table: "note",
                data: {id: id},
                operator: ''
            },
            function (response) {
                if (JSON.parse(response)) {
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