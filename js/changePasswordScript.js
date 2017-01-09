$('document').ready(function () {

    $('#changeStudentPassword').on('click', function(event) {
        event.preventDefault();
        if($('#changeStudentPasswordForm').valid()) {
            $('#errorMessage').empty();
            changePassword();
        }
        else
            $('#errorMessage').text("Nie można zmienić hasła. Formularz zawiera błędy.");
    });

    $('#changeStudentPasswordForm').validate({
        errorElement: "span",
        rules:{
            newStudentPassword: {
                required: true,
                passwordMatch: true,
                passwordUniqueness: true
            },
            newStudentPasswordAgain: {
                required: true,
                equalTo: "#newStudentPassword"
            }
        },
        messages: {
            newStudentPassword: {
                required: "Podaj hasło",
                passwordMatch: "Hasło jest w niepoprawnym formacie. Dozwolone znaki to małe i duże litery, cyfry od 0 do 9 oraz znaki _, #, @, *, !, &, $. " +
                "Hasło musi zawierać co najmniej 8 znaków.",
                passwordUniqueness: "Hasło nie może być takie samo jak istniejące"
            },
            newStudentPasswordAgain: {
                required: "Powtórz hasło",
                equalTo: "Pole musi mieć taką samą wartość"
            }
        }
    });

    $.validator.addMethod("passwordMatch",
        function(value, element) {
            return this.optional( element ) || /^([A-Za-z0-9#@*!&$_]){8,32}$/.test( value );
    });

    $.validator.addMethod("passwordUniqueness", function(value) {
        var responseValue;
        $.ajax({
            type: 'POST',
            url:  "get.php",
            data: {
                action: "checkPassword",
                studentId: $.cookie('ID'),
                password: value
            },
            dataType: "json",
            success: function(resp){
                responseValue = JSON.parse(resp);
            },
            error: function(request, error){
               // alert(" Can't do because: " + error);
            },
            async: false
        });
        return responseValue;
    });

    function changePassword() {
        $.post(
            "update.php",
            {
                action: "changeStudentPassword",
                conditions: {ID: $.cookie("ID")},
                set: {
                    password: $('#newStudentPassword').val(),
                    passwordAgain: $('#newStudentPasswordAgain').val(),
                    visited: 1
                },
                operator: ""
            },
            function(response){
                if(JSON.parse(response)) {
                    window.location = "/Repositories/eDziennik/notes";
                }
                else
                    $('#errorMessage').text("Wystąpił błąd");
            }
        );
    }
});