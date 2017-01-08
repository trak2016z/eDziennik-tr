$('document').ready(function () {
    //Pobranie wszystkich nauczycieli
    $.post(
        "get.php",
        {
            table: "teacher"
        },
        function (response) {
            var teachers = JSON.parse(response);
            createTeachersList(teachers);
        }
    );

//Funkcja tworząca tabelę z danymi nauczycieli i ustawiająca zdarzenie dla przycieku aktywacji/deaktywacji
    function createTeachersList(teachers) {
        for (var key in teachers) {
            appendTeacher(teachers[key]);
            $("#" + teachers[key].ID).click(function () {
                changeActivity($(this))
            });
        }
    }

//Funkcja tworząca pojedynczy wiersz tabeli
    function appendTeacher(teacherData) {
        var tableRow = "<tr><td>" + teacherData.name + "</td><td>" + teacherData.surname + "</td><td id='activity_" + teacherData.ID + "'>" +
            checkActivity(teacherData.is_active) + "</td><td>" + createActivateButton(teacherData.ID, teacherData.is_active) + "</td></tr>";
        $('#teachersList').append(tableRow);
    }


//Funkcja zwracająca informację o aktywności/nieaktywności konta nauczyciela
    function checkActivity(active) {
        if (active == 1)
            return "Aktywny";
        else
            return "Nieaktywny";
    }

//Funkcja tworząca przycisk akywacji/deaktywacji
    function createActivateButton(id, active) {
        if (active == 1)
            return "<input type='button' id='" + id + "' value='Deaktywuj' />";
        else
            return "<input type='button' id='" + id + "' value='Aktywuj' />";
    }

//Funkcja do aktywacji/deaktywacji kont nauczycieli
    function changeActivity(button) {
        if (button.attr("value") == "Aktywuj") {
            $.post(
                "update.php",
                {
                    table: "teacher",
                    conditions: {ID: button.attr("id")},
                    set: {is_active: 1},
                    operator: ''
                },
                function (response) {
                    if (JSON.parse(response)) {
                        $('#activity_' + button.attr("id")).html("Aktywny");
                        button.attr("value", "Deaktywuj");
                    }
                    else
                        $('#errorMessage').text("Wystąpił błąd");
                }
            );
        }
        else {
            $.post(
                "update.php",
                {
                    table: "teacher",
                    conditions: {ID: button.attr("id")},
                    set: {is_active: 0},
                    operator: ''
                },
                function (response) {
                    if (JSON.parse(response)) {
                        $('#activity_' + button.attr("id")).html("Nieaktywny");
                        button.attr("value", "Aktywuj");
                    }
                    else
                        $('#errorMessage').text("Wystąpił błąd");
                }
            );
        }
    }
});
