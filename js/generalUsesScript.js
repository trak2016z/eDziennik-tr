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
        window.location.href = "/Repositories/eDziennik/userAccount";
    });

    $('#logOutButton').on("click", function(event) {
        event.preventDefault();
        $.post(
            "logOut.php",
            function(data){
                $.removeCookie("name", null);
                $.removeCookie("surname", null);
                controlLogoutButton();
                window.location.href = "/Repositories/eDziennik/login";
            }
        );
    });
});