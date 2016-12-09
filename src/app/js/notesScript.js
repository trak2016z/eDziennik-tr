$('document').ready(function () {

    getStudentSubjects();
    $('#studentSubjectName').on('change', function() {
        getStudentNotes();
    });

    function getStudentSubjects() {
        $.post(
            "get.php",
            {
                action: "getStudentSubjects",
                group_ID: $.cookie("groupID")
            },
            function (response) {
                var studentsSubjects = JSON.parse(response);
                createStudentSubjectsList(studentsSubjects);
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
                action: "getStudentNotes",
                student_ID: $.cookie("groupID"),
                subject_ID: $('#studentSubjectName option:selected').val()
            },
            function (response) {

                var studentsNotes = JSON.parse(response);
                console.log(studentsNotes);
                createStudentNotesList(studentsNotes);
            }
        )
    }

    function createStudentNotesList(studentsNotes) {
        for(var key in studentsNotes) {
            appendNote(studentsNotes[key]);
        }
    }

    function appendNote(note) {
        console.log(note.note);
        var tableRow = "<tr><td>" + note.note + "</td><td>" + note.categoryName +"</td></tr>";
        $('#studentNotesList').append(tableRow);
    }
});