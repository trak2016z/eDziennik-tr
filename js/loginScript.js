$('document').ready(function () {

    function log() {
        $.post(
            "log.php",
            {
                login: $('#login').val(),
                password: $('#password').val()
            },
            function(response){
                if(typeof(JSON.parse(response)) == 'object') {
                    var user = JSON.parse(response);
                    if (checkUserType(user) == 'admin') {
                        window.location.href = "/Repositories/eDziennik/teachers";
                    }
                    else if (checkUserType(user) == 'teacher') {
                        window.location = "/Repositories/eDziennik/groups";
                    }
                    else {
                        if(user.visited == 0)
                            window.location = "/Repositories/eDziennik/changePassword";
                        else
                            window.location = "/Repositories/eDziennik/notes";
                    }
                }
                else
                    $('#errorMessage').text(JSON.parse(response));
            }
        );
    }

    function checkUserType(responseObject) {
        if(responseObject.type) {
            return isAdmin(responseObject.type);
        }
        else
            return false;
    }

    function isAdmin(type) {
        if(type == 1)
            return "admin";
        else
            return "teacher";
    }

    $('#logButton').on('click', function(event) {
        event.preventDefault();
        log();
    });
});




