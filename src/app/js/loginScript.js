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
                    //console.log(user);

                    console.log(sessionStorage.getItem('isUserLogged'));
                    if (checkUserType(user) == 'admin') {
                        window.location.href = "/Repositories/eDziennik/web/teachers";
                    }
                    else if (checkUserType(user) == 'teacher') {
                        console.log("teacher");
                        window.location = "/Repositories/eDziennik/web/groups";
                    }
                    else {
                        window.location = "/Repositories/eDziennik/web/notes";
                    }
                }
                else
                    $('#errorMessage').text(JSON.parse(response));
            }
        );
    }

    function checkUserType(responseObject) {
        if(responseObject.type) {
        //if(responseObject[0].type) {
            //return isAdmin(responseObject[0].type);
            return isAdmin(responseObject.type);
        }
        else
            return false;
    }

    function isAdmin(type) {
        if(type == 1)
        //if(type == "admin")
            return "admin";
        else
            return "teacher";
    }

    $('#logButton').click(function() {
        log();
    })
});




