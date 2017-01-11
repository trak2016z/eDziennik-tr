$('document').ready(function () {
    var showInsertForm = false;
    var showEditForm = false;
    var groupId;
    hideInsertSubjectButton();
    changeUrlParameter();
    getSubjectsOfGroup();
    showHideInsertForm();
    showHideEditForm();
    getAllSubjects();
    getAllTeachers();
    $('#addSubject').click(function () {
        showInsertForm = true;
        showHideInsertForm();
    });
    $('#saveSubject').on('click', function (event) {
        event.preventDefault();
        if($('#addSubjectForm').valid()) {
            $('#errorMessage').empty();
            addSubject();
        }
        else
            $('#errorMessage').text("Nie można zapisać. Formularz zawiera błędy.");
    });

    function hideEditDeleteButtons() {
        if(parseInt($.cookie("type")) !== 1) {
            $('input:button[value="Edytuj"], input:button[value="Usuń"]').hide();
        }
    }

    function hideInsertSubjectButton() {
        if(parseInt($.cookie("type")) !== 1) {
            $('input:button[value="Dodaj przedmiot"]').hide();
        }
    }

    $('#hideAddGroupSubjectForm').on("click", function() {
        showInsertForm = false;
        showHideInsertForm();
        clearFormInputs();
    });

    $('#hideEditGroupSubjectForm').on("click", function() {
        showEditForm = false;
        showHideEditForm();
    });

    function changeUrlParameter() {
        var linkToUpdate = $('a').eq(0).attr('href');
        var currentUrl = location.href.split("/");
        groupId = currentUrl[currentUrl.indexOf("groups") + 1];
        linkToUpdate = linkToUpdate.replace(":id", groupId);
        $('a').eq(0).attr('href', linkToUpdate);
    }

    $('#addSubjectForm').validate({
        errorElement: "span",
        rules:{
            subjectName: {
                required: true,
                subjectUniqueness: true
            },
            subjectTeacher: {
                required: true
            }
        },
        messages: {
            subjectName: {
                required: "Wybierz przedmiot",
                subjectUniqueness: "Wybrany przedmiot jest już dodany"
            },
            subjectTeacher: {
                required: "Wybierz nauczyciela"
            }
        }
    });

    $('#editSubjectForm').validate({
        errorElement: "span",
        rules:{
            subjectName: {
                required: true,
                subjectUniqueness: true
            },
            subjectTeacher: {
                required: true
            }
        },
        messages: {
            subjectName: {
                required: "Wybierz przedmiot",
                subjectUniqueness: "Wybrany przedmiot jest już dodany"
            },
            subjectTeacher: {
                required: "Wybierz nauczyciela"
            }
        }
    });

    $.validator.addMethod("subjectUniqueness", function(value, element) {
        var responseValue;
        var subjectId = $(element).val()?$(element).val():null;
        var id = $(element).attr("data-id")?$(element).attr("data-id"):null;
        $.ajax({
            type: 'POST',
            url:  "http://localhost/Repositories/eDziennik/get.php",
            data: {
                action: "checkGroupSubject",
                id: id,
                subjectId: subjectId,
                groupId: groupId
            },
            success: function(resp){
                responseValue = JSON.parse(resp);
            },
            error: function(request, error){
                console.log(arguments);
                console.log(error);
            },
            async: false
        });
        return responseValue;
    });

    function showHideInsertForm() {
        if (showInsertForm) {
            showEditForm = false;
            showHideEditForm();
            $('#addSubjectForm').show();
        }
        else
            $('#addSubjectForm').hide();
    }

//Funkcja sterująca widocznością formularza edycji
    function showHideEditForm() {
        if (showEditForm) {
            showInsertForm = false;
            showHideInsertForm();
            $('#editSubjectForm').show();
        }
        else
            $('#editSubjectForm').hide();
    }

    function getSubjectsOfGroup() {
        $.post(
            "http://localhost/Repositories/eDziennik/get.php",
            {
                table: "subject_teacher",
                groupId: groupId,
                teacherId: $.cookie("ID"),
                type: $.cookie("type")
            },
            function (response) {
                if(JSON.parse(response)) {
                    var subjects = JSON.parse(response);
                    createSubjectsTeacherList(subjects);
                    hideEditDeleteButtons();
                }
                else {
                    $('#subjectsList').hide();
                    $('#message').text("Grupa nie ma przypisanych żadnych przedmiotów");
                }
            }
        );
    }

    function createSubjectsTeacherList(subjects) {
        for (var key in subjects) {
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

//Funkcja ustawiająca zdarzenie dla przycisku zapisania w formularzu edycji
    function prepareEditForm(element) {
        var id = element.attr("id").replace("edit_", '');
        completeTextField(element, id);
        $('#updateGroupSubject').on('click', function(event) {
            event.preventDefault();
            if($('#editSubjectForm').valid()) {
                $('#errorMessage').empty();
                updateGroupSubject($('#editedSubjectName').attr("data-id"));
                id = null;
            }
            else
                $('#errorMessage').text("Nie można zaktualizować. Formularz zawiera błędy.");
        });
    }

//Funkcja ustawiająca aktualną nazwę grupy w polu text formularza edycji
    function completeTextField(element, id) {
        var subjectId = element.parent().siblings("[id^='subject_']").attr('id').replace("subject_", '');
        $('#editedSubjectName').val(subjectId);
        $('#editedSubjectName').attr("data-id", id);
        var teacherId = element.parent().siblings("[id^='teacher_']").attr('id').replace("teacher_", '');
        $('#editedSubjectTeacher').val(teacherId);
    }

    function getAllSubjects() {
        $.post(
            "http://localhost/Repositories/eDziennik/get.php",
            {
                table: "subject",
            },
            function (response) {
                var subjects = JSON.parse(response);
                createSubjectsList(subjects);
            }
        );
    }

    function createSubjectsList(subjects) {
        $("[name='subjectName']").append($('<option>'));
        for (var key in subjects) {
            $("[name='subjectName']").append($('<option>', {value: subjects[key].ID, text: subjects[key].name}));
        }
    }

    function getAllTeachers() {
        $.post(
            "http://localhost/Repositories/eDziennik/get.php",
            {
                table: "teacher",
            },
            function (response) {
                var teachers = JSON.parse(response);
                createTeachersList(teachers);
            }
        );
    }

    function createTeachersList(teachers) {
        $("[name='subjectTeacher']").append($('<option>'));
        for (var key in teachers) {
            $("[name='subjectTeacher']").append($('<option>', {
                value: teachers[key].ID,
                text: teachers[key].name + ' ' + teachers[key].surname
            }));
        }
    }

    function addSubject() {
        $.post(
            "http://localhost/Repositories/eDziennik/insert.php",
            {
                table: "subject_teacher",
                data: {
                    subject_ID: $('#subjectName option:selected').val(),
                    teacher_ID: $('#subjectTeacher option:selected').val(),
                    group_ID: groupId
                }
            },
            function (response) {
                if(JSON.parse(response)[0]) {
                    var subject = JSON.parse(response)[0];
                    appendSubject(subject);
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
        $("#subjectName").val("");
        $("#subjectTeacher").val("");
    }

    function appendSubject(subject) {
        var tableRow = "<tr><td id='subject_" + subject.subject_ID + "'><a href='/Repositories/eDziennik/groups/" + groupId + "/subjects/" + subject.subject_ID + "'>" +
            subject.subjectName + "</a></td><td id='teacher_" + subject.teacher_ID + "'>" +
            subject.teacherName + " " + subject.teacherSurname + "</td><td>" + createEditButton(subject.ID) + "</td><td>" +
            createDeleteButton(subject.ID) + "</td></tr>";
        $('#subjectsList').append(tableRow);
        setEditEvent(subject.ID);
        setDeleteEvent(subject.ID);
    }

//Funkcja tworząca przycisk edycji
    function createEditButton(id) {
        return "<input type='button' id='edit_" + id + "' value='Edytuj' />";
    }

//Funkcja tworząca przycisk usuwania
    function createDeleteButton(id) {
        return "<input type='button' id='delete_" + id + "' value='Usuń' />";
    }

    function updateGroupSubject(id) {
        $.post(
            "http://localhost/Repositories/eDziennik/update.php",
            {
                table: "subject_teacher",
                conditions: {ID: id},
                set: {
                    subject_ID: $('#editedSubjectName option:selected').val(),
                    teacher_ID: $('#editedSubjectTeacher option:selected').val()
                },
                operator: ''
            },
            function (response) {
                if (JSON.parse(response)) {
                    $('#edit_' + id).parent().siblings("[id^='subject_']").find("a").text($('#editedSubjectName option:selected').text());
                    $('#edit_' + id).parent().siblings("[id^='subject_']").attr("id", "subject_" + $('#editedSubjectName option:selected').val());
                    $('#edit_' + id).parent().siblings("[id^='teacher_']").text($('#editedSubjectTeacher option:selected').text());
                    $('#edit_' + id).parent().siblings("[id^='teacher_']").attr("id", "teacher_" + $('#editedSubjectTeacher option:selected').val());
                    showEditForm = false;
                    showHideEditForm();
                }
                else
                    $('#errorMessage').text("Wystąpił błąd");
            }
        );
    }

    function deleteSubject(element) {
        var id = element.attr("id").replace("delete_", '');
        $.post(
            "http://localhost/Repositories/eDziennik/delete.php",
            {
                table: "subject_teacher",
                data: {id: id},
                operator: ''
            },
            function (response) {
                if (JSON.parse(response)) {
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