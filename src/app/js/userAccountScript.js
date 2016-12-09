$('document').ready(function () {

    completeUserData();

    function completeUserData() {
        $('#userName').val($.cookie("name"));
        $('#userSurname').val($.cookie("surname"));
        $('#userLogin').val($.cookie("login"));
        $('#userLogin').attr('disabled', 'disabled');
        if($.cookie("groupName")) {
            $('#userGroup').val($.cookie("groupName"));
            $('#userName').attr('disabled', 'disabled');
            $('#userSurname').attr('disabled', 'disabled');
        }
        else
            $('#userGroup').parent().hide();

        $('#changeUserData').on('click', function(event) {
            event.preventDefault();
            if($('#userDataForm').valid()) {
                $('#errorMessage').empty();
                changeUserData();
            }
            else
                $('#errorMessage').text("Nie można zaktualizować. Formularz zawiera błędy.");
        });
    }

    $('#userDataForm').validate({
        errorElement: "span",
        rules:{
            userName: {
                required: true,
                nameSurnameMatch: true
            },
            userSurname: {
                required: true,
                nameSurnameMatch: true
            },
            newUserPassword: {
                passwordMatch: true
            },
            newUserPasswordAgain: {
                equalTo: "#newUserPassword"
            }
        },
        messages: {
            userName: {
                required: "Podaj swoje imię",
                nameSurnameMatch: "Imię zawiera niepoprawne znaki. Imię musi się zaczynać od dużej litery. Dozwolone znaki to małe i duże litery."
            },
            userSurname: {
                required: "Podaj swoje nazwisko",
                nameSurnameMatch: "Nazwisko zawiera niepoprawne znaki. Nazwisko musi się zaczynać od dużej litery. Dozwolone znaki to małe i duże litery."
            },
            newUserPassword: {
               // required: "Podaj hasło",
                passwordMatch: "Hasło jest w niepoprawnym formacie. Dozwolone znaki to małe i duże litery, cyfry od 0 do 9 oraz znaki _, #, @, *, !, &, $. " +
                "Hasło musi zawierać co najmniej 8 znaków."
            },
            newUserPasswordAgain: {
               // required: "Powtórz hasło",
                equalTo: "Pole musi mieć taką samą wartość"
            }
        }
    });

    $.validator.addMethod("nameSurnameMatch",
        function(value, element) {
            return this.optional( element ) || /^[A-ZŹŻĄĘĆŃŚŁÓ][a-zźżąęśćńół]{1,19}$/.test( value );
    });

    $.validator.addMethod("passwordMatch",
        function(value, element) {
            return this.optional( element ) || /([A-Za-z0-9#@*!&$_]){8,32}/.test( value );
    });

    function changeUserData() {
        $.post(
            "update.php",
            {
                action: "changeUserData",
                id: {ID: $.cookie("ID")},
                userType: checkUserType(),
                set: {
                    name: $('#userName').val(),
                    surname: $('#userSurname').val(),
                    password: $('#newUserPassword').val()
                },
                operator: ""
            },
            function(response){
                if(JSON.parse(response)) {
                    console.log(response);
                 //   window.location = "/Repositories/eDziennik/web/notes";
                }
                else
                    $('#errorMessage').text("Wystąpił błąd");
            }
        );
    }

    function checkUserType() {
        if($.cookie('type'))
            return "teacher";
        else
            return "student";
    }

});