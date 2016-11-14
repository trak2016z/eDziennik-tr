window.onload = init;
var showInsertForm = false;

function init() {
    //Ustawienie odpowiedniego id w odnośniku do zakładki "Przedmioty"
    changeUrlParameter();
    //Ukrycie formularza dodawania studenta
    showHideInsertForm();
    //Ustawienie zdarzenia dla przycisku
    $('#addStudent').click(function() {
        showInsertForm = true;
        showHideInsertForm();
    })
    getGroups();
}

//Funkcja zmieniająca atrybut href odnośnika do zakładki "Przedmioty"
function changeUrlParameter() {
    var linkToUpdate = $('a').eq(1).attr('href');
    var currentUrl = location.href.split("/");
    linkToUpdate = linkToUpdate.replace(":id", currentUrl[currentUrl.indexOf("groups") + 1]);
    $('a').eq(1).attr('href', linkToUpdate);
}

//Funkcja sterująca widocznością formularza dodawania studenta
function showHideInsertForm() {
    if(showInsertForm)
        $('#addStudentForm').show();
    else
        $('#addStudentForm').hide();
}

//Funkcja do pobierania istniejących grup
function getGroups() {
    $.post(
        "get.php",
        {
            table: "group"
        },
        function(response){
            var groups = JSON.parse(response);
            createGroupsList(groups);
        }
    );
}

//Funkcja wstawiająca pobrane grupy do elementu select w formularzu dodawania studenta
function createGroupsList(groups) {
    for(var key in groups) {
        $('#group').append($('<option>', {value: groups[key].ID, text: groups[key].name}));
    }
}