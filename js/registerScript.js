$('document').ready(function () {

    function register() {
        $.post(
             "register.php",
             {
                 table: "teacher",
                 name: $("#name").val(),
                 surname: $("#surname").val(),
                 login: $("#login").val(),
                 password: $("#password").val(),
                 passwordAgain: $("#passwordAgain").val()
             },
             function(data){
                if(JSON.parse(data))
                    $('#errorMessage').text("Zostałeś poprawnie zarejestrowany");
                 else
                    $('#errorMessage').text("Wystąpił błąd");
             }
        );
    }

    $('#registerForm').validate({
        errorElement: "span",
        rules:{
            name: {
                required: true,
                nameSurnameMatch: true
            },
            surname: {
                required: true,
                nameSurnameMatch: true
            },
            login: {
                required: true,
                loginMatch: true,
                loginUniqueness: true
            },
            password: {
                required: true,
                passwordMatch: true
            },
            passwordAgain: {
                required: true,
                equalTo: "#password"
            }
        },
        messages: {
            name: {
                required: "Podaj swoje imię",
                nameSurnameMatch: "Imię zawiera niepoprawne znaki. Imię musi się zaczynać od dużej litery. Dozwolone znaki to małe i duże litery."
            },
            surname: {
                required: "Podaj swoje nazwisko",
                nameSurnameMatch: "Nazwisko zawiera niepoprawne znaki. Nazwisko musi się zaczynać od dużej litery. Dozwolone znaki to małe i duże litery."
            },
            login: {
                required: "Podaj login",
                loginMatch: "Login jest w niepoprawnym formacie. Dozwolone znaki to małe i duże litery, cyfry od 0 do 9 oraz _. Login musi się zaczynać od litery " +
                "i mieć co najmniej 8 znaków.",
                loginUniqueness: "Podany login jest już używany"
            },
            password: {
                required: "Podaj hasło",
                passwordMatch: "Hasło jest w niepoprawnym formacie. Dozwolone znaki to małe i duże litery, cyfry od 0 do 9 oraz znaki _, #, @, *, !, &, $. " +
                "Hasło musi zawierać co najmniej 8 znaków."
            },
            passwordAgain: {
                required: "Powtórz hasło",
                equalTo: "Pole musi mieć taką samą wartość"
            }
        }
    });

    $.validator.addMethod("nameSurnameMatch",
        function(value, element) {
            return this.optional( element ) || /^[A-ZŹŻĄĘĆŃŚŁÓ][a-zźżąęśćńół]{1,19}$/.test( value );
    });

    $.validator.addMethod("loginMatch",
        function(value, element) {
            return this.optional( element ) || /^[A-Za-z][A-Za-z0-9_]{7,31}$/.test( value );
    });

    $.validator.addMethod("passwordMatch",
        function(value, element) {
            return this.optional( element ) || /([A-Za-z0-9#@*!&$_]){8,32}/.test( value );
    });

    $.validator.addMethod("loginUniqueness", function(value) {
        var responseValue;
        $.ajax({
            type: 'POST',
            url:  "get.php",
            data: {
                action: "checkLogin",
                login: value
            },
            dataType: "json",
            success: function(resp){
                responseValue = JSON.parse(resp);
            },
            error: function(request, error){
                console.log(arguments);
            },
            async: false
        });
        return responseValue;
    });


    $('#register').on('click', function(event){
        event.preventDefault();
        if($('#registerForm').valid()) {
            $('#errorMessage').empty();
            register();
        }
        else
            $('#errorMessage').text("Nie można zarejestrować. Formularz zawiera błędy.");
    });

});


