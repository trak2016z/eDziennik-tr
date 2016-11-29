document.getElementById("logButton").addEventListener('click', log);

function log() {
    $.post(
        "log.php",
        {
            login: $('#login').val(),
            password: $('#password').val()
        },
        function(response){
           // console.log(response);
          //  console.log(typeof(JSON.parse(response)));
            if(typeof(JSON.parse(response)) == 'object') {
                var user = JSON.parse(response);
                if (checkUserType(user) == 'admin') {
                    window.location.href = "/Repositories/eDziennik/web/teachers";
                }
                else if (checkUserType(user) == 'teacher') {
                    console.log("teacher");
                    // window.location = "/Repositories/eDziennik/web/student/" + user.ID;
                }
                else {
                    console.log("student");
                }
            }
            else
                $('#errorMessage').text(JSON.parse(response));
        }
    );
}

function checkUserType(responseObject) {
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
