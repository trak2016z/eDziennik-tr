$('document').ready(function () {
    var showInsertForm = false;
    var showEditForm = false;
    var showAddedStudentData = false;
    var groupId, groups;
    //Ustawienie odpowiedniego id w odnośniku do zakładki "Przedmioty"
    changeUrlParameter();
    //Ukrycie formularza dodawania studenta
    showHideInsertForm();
    showHideEditForm();
    showHideAddedStudentData();
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

    $('#hideAddStudentForm').on("click", function() {
        showInsertForm = false;
        showHideInsertForm();
    });

    $('#hideEditStudentForm').on("click", function() {
        showEditForm = false;
        showHideEditForm();
    });

    $('#hideAddedStudentData').on("click", function() {
        showAddedStudentData = false;
        showHideAddedStudentData();
    });

//Funkcja zmieniająca atrybut href odnośnika do zakładki "Przedmioty"
    function changeUrlParameter() {
        var linkToUpdate = $('a').eq(0).attr('href');
        var currentUrl = location.href.split("/");
        groupId = currentUrl[currentUrl.indexOf("groups") + 1];
        linkToUpdate = linkToUpdate.replace(":id", groupId);
        $('a').eq(0).attr('href', linkToUpdate);
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

    function showHideAddedStudentData() {
        if (showAddedStudentData) {
            $('#addedStudentData').show();
        }
        else
            $('#addedStudentData').hide();
    }

    function getAllStudents() {
        $.post(
            "http://localhost/Repositories/eDziennik/get.php",
            {
                table: "student",
                group_ID: groupId
            },
            function (response) {
                var studentsOfGroup = JSON.parse(response);
                createStudentsList(studentsOfGroup);
            }
        );
    }

    function createStudentsList(students) {
        for (var key in students) {
            appendStudent(students[key]);
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
            deleteStudent($(this)) });
    }

//Funkcja ustawiająca aktualną nazwę grupy w polu text formularza edycji
    function completeTextField(studentID) {
        $('#editedStudentName').val($('#studentName_' + studentID).text());
        $('#editedStudentName').attr("data-id", studentID);
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
                updateStudent($('#editedStudentName').attr("data-id"));
                id = null;
            }
            else
                $('#errorMessage').text("Nie można zaktualizować. Formularz zawiera błędy.");
        });
    }

//Funkcja do pobierania istniejących grup
    function getGroups() {
        $.post(
            "http://localhost/Repositories/eDziennik/get.php",
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
        var login = checkLogin();
        var password = generatePassword();
        $.post(
            "http://localhost/Repositories/eDziennik/insert.php",
            {
                table: "student",
                data: {
                    name: $('#studentName').val(),
                    surname: $('#studentSurname').val(),
                    login: login,
                    password: password,
                    group_ID: groupId
                }
            },
            function (response) {
                if (JSON.parse(response)) {
                    var addedStudent = JSON.parse(response)[0];
                    appendStudent(addedStudent);
                    showInsertForm = false;
                    showHideInsertForm();
                    displayAddedStudentData(addedStudent, password);
                    clearFormInputs();
                }
                else
                    $('#errorMessage').text("Wystąpił błąd");
            }
        );
    }

    function clearFormInputs() {
        $("#studentName").val("");
        $("#studentSurname").val("");
    }

    function displayAddedStudentData(addedStudent, password) {
        $('#addedStudentName').text(addedStudent.name);
        $('#addedStudentSurname').text(addedStudent.surname);
        $('#addedStudentLogin').text(addedStudent.login);
        $('#addedStudentPassword').text(password);
        showAddedStudentData = true;
        showHideAddedStudentData();
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
                url: "http://localhost/Repositories/eDziennik/get.php",
                data: {
                    action: "checkLogin",
                    login: login
                },
                dataType: "json",
                success: function (resp) {
                    responseFrom = JSON.parse(resp);
                },
                error: function (request, error) {
                    // console.log(arguments);
                  //  alert(" Can't do because: " + error);
                },
                async: false
            });
        }
        while (!responseFrom);
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
        var tableRow = "<tr><td><a href='/Repositories/eDziennik/groups/" + groupId + "/students/" + studentData.ID + "'><span id='studentName_" + studentData.ID + "'>"
            + studentData.name + "</span> <span id='studentSurname_" + studentData.ID + "'>" + studentData.surname + "</span></a></td><td>" + createEditButton(studentData.ID) + "</td><td>" +
            createDeleteButton(studentData.ID) + "</td></tr>";
        $('#studentsList').append(tableRow);
        setEditEvent(studentData.ID);
        setDeleteEvent(studentData.ID);
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
            "http://localhost/Repositories/eDziennik/update.php",
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
            "http://localhost/Repositories/eDziennik/delete.php",
            {
                table: "student",
                data: {id: id},
                operator: ''
            },
            function (response) {
                if (JSON.parse(response)) {
                    showEditForm = false;
                    showHideEditForm();
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