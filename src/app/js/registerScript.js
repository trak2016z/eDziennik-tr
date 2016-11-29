//document.getElementById("register").addEventListener('click', register);




$('document').ready(function () {

    function register() {
        console.log("REGISTER USER");
        /* $.post(
         "register.php",
         {
         table: "teacher",
         name: document.getElementById("name").value,
         surname: document.getElementById("surname").value,
         login: document.getElementById("login").value,
         password: document.getElementById("password").value,
         passwordAgain: document.getElementById("passwordAgain").value
         },
         function(data){
         console.log("Dane otrzymane: " + data);
         }
         );*/
    }

    $('#registerForm').validate({
        rules:{
            name: {
                required: true,
                nameMatch: true
            },
            password: {
                required: true,
                minlength: 6
            },
            passwordAgain: {
                equalTo: "#password"
            }
        },
        messages: {
            name: "Podaj swoje imie",
            passwordAgain: "Pole musi mieć taką samą wartość",
            password: {
                minlength: "Za krótkie"
            }
        }
    });

    $.validator.addMethod("nameMatch",
        function(value, element) {
            return this.optional( element ) || /[A-ZŹŻĄĘĆŃŚŁÓ][a-zźżąęśćńół]{1,19}/.test( value );
        }, 'Please enter a valid email address.');

        $('#register').on('click', function(e){
        e.preventDefault();
        register();
    });

});

window.onload = init;
function init() {
   /* $('#registerForm').validate({
        rules: {

            name: "required"
            //  minlength: 2,
            // maxlength: 20,

        },
        messages: {
            name: {
                required: "wpisz!"
            }
            // minlength: jQuery.validator.format("Please, at least {0} characters are necessary"),
            // maxlength: jQuery.validator.format("Please, at least {0} characters are ")
        }
});*/
//    $("#name").on({
//        blur: function () {
//            emptyField($(this));
//        },
//        change: function () {
//            validateNameSurname($(this));
//        }
//    });
//
//    $("#surname").on({
//        blur: function() {
//            emptyField($(this));
//        },
//        change: function() {
//            validateNameSurname($(this));
//        }
//    });
//
//    $("#login").on({
//        blur: function() {
//            emptyField($(this));
//        },
//        change: function() {
//            validateLogin($(this));
//        }
//    });
//}

function validateNameSurname(element) {
    var nameSurnamePattern = /[A-ZŹŻĄĘĆŃŚŁÓ][a-zźżąęśćńół]{1,19}/;
    if((element.val().length == 1)||(element.val().length > 20)) {
       // $(this).prop('invalid', true);
        element.addClass("formError");
        $('#'+ element.attr('id') + 'Message').text("Błąd");
       // $("#register").attr("disabled", "disabled");
    }
    else {
       // $(this).prop('valid', true);
        if(element.val().match(nameSurnamePattern)) {
            element.removeClass("formError");
            $('#' + element.attr('id') + 'Message').empty();
            //$("#register").removeAttr("disabled");
        }
        else {
            $('#'+ element.attr('id') + 'Message').text("pattern");
        }
    }
}

function validateLogin(element) {
    var loginPattern = /[A-Za-z][A-Za-z0-9_]{7,31}/;
    if(!element.val().match(loginPattern)) {
        element.addClass("formError");
        $('#'+ element.attr('id') + 'Message').text("Pattern");
        // $("#register").attr("disabled", "disabled");
    }
    else {
        element.removeClass("formError");
        $('#' + element.attr('id') + 'Message').empty();
        checkLoginUniqueness(element.val());
    }
}

function checkLoginUniqueness(login) {
    var responseValue;
    $.post(
        "get.php",
        {
            action: "checkLogin",
            data: {
                login: login
            }
        },
        function(response){
            if(JSON.parse(response)) {
                $('#login').removeClass("formError");
                $('#loginMessage').empty();
            }
            else {
                $('#login').addClass("formError");
                $('#loginMessage').text("Juz jest");
            }
        }

    );
}

function emptyField(element) {
    if(element.val() == "") {
        element.addClass("formError");
        $('#' + element.attr('id') + 'Message').text("Puste");
        //$("#register").attr("disabled", "disabled");
    }
}

//Funkcja do rejestracji nauczyciela
}

