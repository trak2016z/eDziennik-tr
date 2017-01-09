$('document').ready(function () {
    var groupId, studentId;
    //Ustawienie odpowiedniego id w odnośniku do zakładki "Przedmioty"
    changeUrlParameter();
    getAllSubjects();
    $('#searchedSubjectName').change(function () {
        displayStudentNotes();
    });

//Funkcja zmieniająca atrybut href odnośnika do zakładki "Przedmioty"
    function changeUrlParameter() {
        var linkToUpdate = $('a').eq(1).attr('href');
        var currentUrl = location.href.split("/");
        groupId = currentUrl[currentUrl.indexOf("groups") + 1];
        studentId = currentUrl[currentUrl.indexOf("students") + 1];
    }

    function getAllSubjects() {
        $.post(
            "http://localhost/Repositories/eDziennik/get.php",
            {
                table: "subject_teacher",
                groupId: groupId
            },
            function (response) {
                if(JSON.parse(response)) {
                    var subjects = JSON.parse(response);
                    createSubjectsList(subjects);
                }
                else {
                    $('#searchForm').hide();
                    $('#message').text("Ta grupa nie ma przypisanych żadnych przedmiotów");
                }
            }
        );
    }

    function createSubjectsList(subjects) {
        $("[name='subjectName']").append($('<option>'));
        for (var key in subjects) {
            $("[name='subjectName']").append($('<option>', {value: subjects[key].subject_ID, text: subjects[key].subjectName}));
        }
    }

    function displayStudentNotes() {
        $.post(
            "http://localhost/Repositories/eDziennik/get.php",
            {
                table: "student_notes",
                subjectId: $('#searchedSubjectName option:selected').val(),
                studentId: studentId
            },
            function (response) {
                if(JSON.parse(response)) {
                    var notes = JSON.parse(response);
                    createNotesList(notes);
                }
                else {
                    $('#notesList').hide();
                    $('#message').text("Brak ocen");
                }
            }
        );
    }

    function createNotesList(notes) {
        for (var key in notes) {
            appendNote(notes[key]);
        }
    }

    function appendNote(note) {
        var tableRow = "<tr><td>" + note.note + "</td><td>" + note.name + "</td>";
        $('#notesList').append(tableRow);
    }
});
