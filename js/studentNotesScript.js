$('document').ready(function () {
    var groupId, studentId;
    //Ustawienie odpowiedniego id w odnoœniku do zak³adki "Przedmioty"
    changeUrlParameter();
    getAllSubjects();
    $('#searchedSubjectName').change(function () {
        displayStudentNotes();
    });

//Funkcja zmieniaj¹ca atrybut href odnoœnika do zak³adki "Przedmioty"
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
                var subjects = JSON.parse(response);
                createSubjectsList(subjects);
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
                table: "note",
                subjectId: $('#searchedSubjectName option:selected').val(),
                studentId: studentId
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

    function appendNote(note) {
        var tableRow = "<tr><td>" + note.note + "</td><td>" + note.name + "</td>";
        $('#notesList').append(tableRow);
    }
});
