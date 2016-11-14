document.getElementById("register").addEventListener('click', register);

window.onload = init;
function init() {
    $("#name").on({
        blur: function () {
            emp($(this));
        },
        change: function () {
            validateNameSurname($(this));
        }
    });

    $("#surname").on({
        blur: function() {
            emp($(this));
        },
        change: function() {
            validateNameSurname($(this));
        }
    });
}

function validateNameSurname(element) {
    if((element.val().length == 1)||(element.val().length > 20)) {
       // $(this).prop('invalid', true);
        element.addClass("formError");
        $('#'+ element.attr('id') + 'Message').text("Błąd");
       // $("#register").attr("disabled", "disabled");
    }
    else {
       // $(this).prop('valid', true);
        element.removeClass("formError");
        $('#'+ element.attr('id') + 'Message').empty();
        //$("#register").removeAttr("disabled");
    }
}

function emp(element) {
    if(element.val() == "") {
        $('#' + element.attr('id') + 'Message').text("Puste");
        //$("#register").attr("disabled", "disabled");
    }
}

//Funkcja do rejestracji nauczyciela
function register() {
    $.post(
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
    );
}

