$('document').ready(function () {
    var showInsertForm = false;
    var showEditForm = false;
    var groupId, groups;
    //Ustawienie odpowiedniego id w odnośniku do zakładki "Przedmioty"
    changeUrlParameter();
    //Ukrycie formularza dodawania studenta
    showHideInsertForm();
    showHideEditForm();
    getAllStudents();
    //Ustawienie zdarzenia dla przycisku
    $('#addStudent').click(function () {
        showInsertForm = true;
        showHideInsertForm();
    });
    getGroups();
    $('#saveStudent').on('click', function (event) {
        event.preventDefault();
        if($('#addStudentForm').valid()) {
            $('#errorMessage').empty();
            addStudent();
        }
        else
            $('#errorMessage').text("Nie można zapisać. Formularz zawiera błędy.");
    });


//Funkcja zmieniająca atrybut href odnośnika do zakładki "Przedmioty"
    function changeUrlParameter() {
        var linkToUpdate = $('a').eq(1).attr('href');
        var currentUrl = location.href.split("/");
        groupId = currentUrl[currentUrl.indexOf("groups") + 1];
        linkToUpdate = linkToUpdate.replace(":id", groupId);
        $('a').eq(1).attr('href', linkToUpdate);
    }

    $('#addStudentForm').validate({
        errorElement: "span",
        rules:{
            studentName: {
                required: true,
                nameSurnameMatch: true
            },
            studentSurname: {
                required: true,
                nameSurnameMatch: true
            }
        },
        messages: {
            studentName: {
                required: "Podaj imię",
                nameSurnameMatch: "Imię zawiera niepoprawne znaki. Imię musi się zaczynać od dużej litery. Dozwolone znaki to małe i duże litery."
            },
            studentSurname: {
                required: "Podaj nazwisko",
                nameSurnameMatch: "Nazwisko zawiera niepoprawne znaki. Nazwisko musi się zaczynać od dużej litery. Dozwolone znaki to małe i duże litery."
            }
        }
    });

    $('#editStudentForm').validate({
        errorElement: "span",
        rules:{
            editedStudentName: {
                required: true,
                nameSurnameMatch: true,
            },
            editedStudentSurname: {
                required: true,
                nameSurnameMatch: true
            }
        },
        messages: {
            editedStudentName: {
                required: "Podaj imię",
                nameSurnameMatch: "Imię zawiera niepoprawne znaki. Imię musi się zaczynać od dużej litery. Dozwolone znaki to małe i duże litery."
            },
            editedStudentSurname: {
                required: "Podaj nazwisko",
                nameSurnameMatch: "Nazwisko zawiera niepoprawne znaki. Nazwisko musi się zaczynać od dużej litery. Dozwolone znaki to małe i duże litery."
            }
        }
    });

    $.validator.addMethod("nameSurnameMatch",
        function(value, element) {
            return this.optional( element ) || /^[A-ZŹŻĄĘĆŃŚŁÓ][a-zźżąęśćńół]{1,19}$/.test( value );
    });

//Funkcja sterująca widocznością formularza dodawania studenta
    function showHideInsertForm() {
        if (showInsertForm) {
            showEditForm = false;
            showHideEditForm();
            $('#addStudentForm').show();
        }
        else
            $('#addStudentForm').hide();
    }

//Funkcja sterująca widocznością formularza edycji
    function showHideEditForm() {
        if (showEditForm) {
            showInsertForm = false;
            showHideInsertForm();
            $('#editStudentForm').show();
        }
        else
            $('#editStudentForm').hide();
    }

    function getAllStudents() {
        $.post(
            "../../get.php",
            {
                table: "student",
                group_ID: groupId
            },
            function (response) {
                var studentsOfGroup = JSON.parse(response);
                //console.log(studentsOfGroup);
                createStudentsList(studentsOfGroup);
            }
        );
    }

    function createStudentsList(students) {
        for (var key in students) {
            appendStudent(students[key]);
            //Ustawienie zdarzeń dla przycisków edycji i usuwania
            $("#edit_" + students[key].ID).click(function () {
                prepareEditForm($(this));
                showEditForm = true;
                showHideEditForm();
            });
            $("#delete_" + students[key].ID).click(function () {
                deleteStudent($(this))
            });
        }
    }

//Funkcja ustawiająca aktualną nazwę grupy w polu text formularza edycji
    function completeTextField(studentID) {
        $('#editedStudentName').val($('#studentName_' + studentID).text());
        $('#editedStudentSurname').val($('#studentSurname_' + studentID).text());
        $("#editedStudentGroupName").val(groupId);
    }

//Funkcja ustawiająca zdarzenie dla przycisku zapisania w formularzu edycji
    function prepareEditForm(element) {
        var id = element.attr("id").replace("edit_", '');
        completeTextField(id);
        $('#updateStudent').on('click', function (event) {
            event.preventDefault();
            if($('#editStudentForm').valid()) {
                $('#errorMessage').empty();
                updateStudent(id);
                id = null;
            }
            else
                $('#errorMessage').text("Nie można zaktualizować. Formularz zawiera błędy.");
        });
    }

//Funkcja do pobierania istniejących grup
    function getGroups() {
        $.post(
            "../../get.php",
            {
                table: "group"
            },
            function (response) {
                groups = JSON.parse(response);
                createGroupsList(groups);
            }
        );
    }

//Funkcja wstawiająca pobrane grupy do elementu select w formularzu dodawania studenta
    function createGroupsList(groups) {
        $("[name='groupName']").append($('<option>'));
        for (var key in groups) {
            $("[name='groupName']").append($('<option>', {value: groups[key].ID, text: groups[key].name}));
        }
    }

    function addStudent() {
        $.post(
            "../../insert.php",
            {
                table: "student",
                data: {
                    name: $('#studentName').val(),
                    surname: $('#studentSurname').val(),
                    login: checkLogin(),
                    password: generatePassword(),
                   // group_ID: $('#addedStudentGroupName option:selected').val()
                    group_ID: groupId
                }
            },
            function (response) {
                if (JSON.parse(response)) {
                    var addedStudent = JSON.parse(response)[0];
                    console.log(response);
                    appendStudent(addedStudent);
                    showInsertForm = false;
                    showHideInsertForm();
                }
                else
                    $('#errorMessage').text("Wystąpił błąd");
            }
        );
    }

//Metoda do zamieniania polskich znaków diakrytycznych
    function changeDiacriticsChars(value) {
        for (var i = 0; i < value.length; i++) {
            value = value.replace(/ą/g, 'a');
            value = value.replace(/Ą/g, 'A');
            value = value.replace(/ć/g, 'c');
            value = value.replace(/Ć/g, 'C');
            value = value.replace(/ę/g, 'e');
            value = value.replace(/Ę/g, 'E');
            value = value.replace(/ł/g, 'l');
            value = value.replace(/Ł/g, 'L');
            value = value.replace(/ń/g, 'n');
            value = value.replace(/Ń/g, 'N');
            value = value.replace(/ó/g, 'o');
            value = value.replace(/Ó/g, 'O');
            value = value.replace(/ś/g, 's');
            value = value.replace(/Ś/g, 'S');
            value = value.replace(/ż/g, 'z');
            value = value.replace(/Ż/g, 'Z');
            value = value.replace(/ź/g, 'z');
            value = value.replace(/Ź/g, 'Z');
        }
        return value;
    };

//Metoda do generowania loginu
    function generateLogin() {
        var generatedLogin;
        var namePart = $('#studentName').val().slice(0, 3);
        generatedLogin = changeDiacriticsChars(namePart);
        var surnamePart = $('#studentSurname').val().slice(0, 3);
        generatedLogin += changeDiacriticsChars(surnamePart);
        generatedLogin += "_";
        generatedLogin += Math.floor(Math.random() * 100).toString();
        generatedLogin += Math.floor(Math.random() * 100).toString();
        return generatedLogin;
    };

    function checkLogin() {
        var responseFrom, login;
        do {
            login = generateLogin();
            $.ajax({
                type: 'POST',
                url: "../../get.php",
                data: {
                    action: "checkLogin",
                    login: login
                },
                dataType: "json",
                success: function (d) {
                    responseFrom = JSON.parse(d);
                },
                error: function (request, error) {
                    // console.log(arguments);
                    alert(" Can't do because: " + error);
                },
                async: false
            });
        }
        while (responseFrom);


     /*   var responseFrom, login;
        do {
            login = generateLogin();
            // login = 'jasiu33';
            $.post(
                "../../get.php",
                {
                    action: "checkLogin",
                    data: {
                        login: login
                    }
                },
                function (response) {
                    responseFrom = JSON.parse(response);
                }
            );
        }
        while (responseFrom);*/
        return login;
    }

//Metoda do generowania hasła
    function generatePassword() {
        var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789#@*!&$";
        var generatedPassword = "";
        for (var i = 0; i < 12; i++) {
            var letter = chars.charAt(getRandomInt(0, 67));
            generatedPassword = generatedPassword + letter;
        }
        return generatedPassword;
    };

//Metoda losująca liczbę całkowitą z określonego przedziału
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    function appendStudent(studentData) {
        var tableRow = "<tr><td id='studentName_" + studentData.ID + "'><a href='/Repositories/eDziennik/web/groups/" + groupId + "/students/" + studentData.ID + "'>"
            + studentData.name + "</a></td><td id='studentSurname_" + studentData.ID + "'>" +
            studentData.surname + "</td><td>" + createEditButton(studentData.ID) + "</td><td>" +
            createDeleteButton(studentData.ID) + "</td></tr>";
        $('#studentsList').append(tableRow);
    }

//Funkcja tworząca przycisk edycji
    function createEditButton(id) {
        return "<input type='button' id='edit_" + id + "' value='Edytuj' />";
    }

//Funkcja tworząca przycisk usuwania
    function createDeleteButton(id) {
        return "<input type='button' id='delete_" + id + "' value='Usuń' />";
    }

    function updateStudent(id) {
        $.post(
            "../../update.php",
            {
                table: "student",
                id: {ID: id},
                set: {
                    name: $('#editedStudentName').val(),
                    surname: $('#editedStudentSurname').val(),
                    group_ID: $('#editedStudentGroupName option:selected').val()
                },
                operator: ''
            },
            function (response) {
                if (JSON.parse(response)) {
                    $('#studentName_' + id).text($('#editedStudentName').val());
                    $('#studentSurname_' + id).text($('#editedStudentSurname').val());
                    showEditForm = false;
                    showHideEditForm();
                }
                else
                    $('#errorMessage').text("Wystąpił błąd");
            }
        );
    }

//Funkcja do usuwania grupy
    function deleteStudent(element) {
        var id = element.attr("id").replace("delete_", '');
        $.post(
            "../../delete.php",
            {
                table: "student",
                data: {id: id},
                operator: ''
            },
            function (response) {
                if (JSON.parse(response)) {
                    removeStudent(id);
                }
                else
                    $('#errorMessage').text("Wystąpił błąd");
            }
        );
    }

//Usuwanie grupy z tabeli
    function removeStudent(id) {
        $('#delete_' + id).parent().parent().remove();
    }
});