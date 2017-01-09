$('document').ready(function () {

    getStudentSubjects();
    $('#studentSubjectName').on('change', function() {
        getStudentNotes();
    });

    function getStudentSubjects() {
        $.post(
            "get.php",
            {
                table: "student_subjects",
                groupId: $.cookie("groupID")
            },
            function (response) {
                if(JSON.parse(response)) {
                    var studentsSubjects = JSON.parse(response);
                    createStudentSubjectsList(studentsSubjects);
                    getStudentNotes();
                }
                else {
                    $('#studentSubjectName').hide();
                    $('#message').text("Twoja grupa nie ma przypisanych żadnych przedmiotów");
                }
            }
        )
    }

    function createStudentSubjectsList(studentsSubjects) {
        for (var key in studentsSubjects) {
            $("[name='studentSubjectName']").append($('<option>', {value: studentsSubjects[key].ID, text: studentsSubjects[key].name}));
        }
    }

    function getStudentNotes() {
        $.post(
            "get.php",
            {
                table: "student_notes",
                studentId: $.cookie("ID"),
                subjectId: $('#studentSubjectName option:selected').val()
            },
            function (response) {
                if(JSON.parse(response)) {
                    var studentsNotes = JSON.parse(response);
                    createStudentNotesList(studentsNotes);
                }
                else {
                    $('#studentNotesList').hide();
                    $('#message').text("Brak ocen z tego przedmiotu");
                }
            }
        )
    }

    function createStudentNotesList(studentsNotes) {
        for(var key in studentsNotes) {
            appendNote(studentsNotes[key]);
        }
    }

    function appendNote(note) {
        var tableRow = "<tr><td>" + note.note + "</td><td>" + note.name +"</td></tr>";
        $('#studentNotesList').append(tableRow);
    }
});