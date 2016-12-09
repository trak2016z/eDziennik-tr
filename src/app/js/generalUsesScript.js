function controlLogoutButton() {
    if($.cookie("ID")) {
        $('#logOutButton').show();
        $('#userAccountButton').show();
    }
    else {
        $('#logOutButton').hide();
        $('#userAccountButton').hide();
    }
}

$('document').ready(function () {
    controlLogoutButton();
    $('#userAccountButton').click(function() {
        window.location.href = "/Repositories/eDziennik/web/userAccount";
    });

    $('#logOutButton').click(function() {
        $.post(
            "logOut.php",
            function(data){
                console.log("Dane otrzymane: " + data);
                controlLogoutButton();
                window.location.href = "/Repositories/eDziennik/web/login";
            }
        );
    });
});