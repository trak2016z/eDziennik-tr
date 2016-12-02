sessionStorage.setItem('isUserLogged', false);

function controlLogoutButton() {
    if(sessionStorage.getItem('isUserLogged') == 'true')
        $('#logOutButton').show();
    else
        $('#logOutButton').hide();
}

$('document').ready(function () {
    console.log(sessionStorage.getItem('isUserLogged'));
    controlLogoutButton();
    $('#logOutButton').click(function() {
        $.post(
            "logOut.php",
            function(data){
                console.log("Dane otrzymane: " + data);
                sessionStorage.setItem('isUserLogged', false);
                controlLogoutButton();
                window.location.href = "/Repositories/eDziennik/web/login";
            }
        );
    })


});