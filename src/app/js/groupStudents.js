window.onload = init;
var showInsertForm = false;

function init() {
    //Ustawienie odpowiedniego id w odno�niku do zak�adki "Przedmioty"
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

//Funkcja zmieniaj�ca atrybut href odno�nika do zak�adki "Przedmioty"
function changeUrlParameter() {
    var linkToUpdate = $('a').eq(1).attr('href');
    var currentUrl = location.href.split("/");
    linkToUpdate = linkToUpdate.replace(":id", currentUrl[currentUrl.indexOf("groups") + 1]);
    $('a').eq(1).attr('href', linkToUpdate);
}

//Funkcja steruj�ca widoczno�ci� formularza dodawania studenta
function showHideInsertForm() {
    if(showInsertForm)
        $('#addStudentForm').show();
    else
        $('#addStudentForm').hide();
}

//Funkcja do pobierania istniej�cych grup
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

//Funkcja wstawiaj�ca pobrane grupy do elementu select w formularzu dodawania studenta
function createGroupsList(groups) {
    for(var key in groups) {
        $('#group').append($('<option>', {value: groups[key].ID, text: groups[key].name}));
    }
}