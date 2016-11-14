document.getElementById("logButton").addEventListener('click', log);

function log() {
    $.post(
        "log.php",
        {
            login: $('#login').val(),
            password: $('#password').val()
        },
        function(response){
            var user = JSON.parse(response);
            console.log(checkUserType(user));
            if(checkUserType(user)) {
                window.location = "/Repositories/eDziennik/web/teachers";
            }
            else {
                window.location = "/Repositories/eDziennik/web/student/" + user.ID;
            }
        }
    );
}

function checkUserType(responseObject) {
    console.log(responseObject);
    if(responseObject[0].type) {
        return isAdmin(responseObject[0].type);
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
