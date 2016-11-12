console.log("script");

document.getElementById("register").addEventListener('click', reg);

function reg() {
    $.post(
        "insert.php",
        {
            table: "teacher",
            name: "Johny",
            surname: "Bravo",
            login: "login33",
            password: "password"
        },
        function(data){
            console.log("Dane otrzymane: " + data);
        }
    );
}
function registerTeacher() {
 //   alert("click");
    $.ajax({
        method: 'POST',
        url: "insert.php",
        dataType : 'json',
        data: {
            table: "teacher",
            name: "Johny",
            surname: "Bravo",
            login: "login33",
            password: "password"
        },
        /*success: function(json) {
            jQuery.each(json, function(i, ob) {
                console.log(i, ob);
            });
        }*/
        success: function(response) {
            console.log( "Dane zwrotne: " + response );
        }
       /* complete: function() {
            $("#loading").hide();
        },*/
       /* error: function() {
            console.log( "Wyst¹pi³ b³¹d w po³¹czeniu :(");
        }*/
    })
}