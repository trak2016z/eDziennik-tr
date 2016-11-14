window.onload = init;

function init() {
    var linkToUpdate = $('a').eq(0).attr('href');
    var currentUrl = location.href.split("/");
    linkToUpdate = linkToUpdate.replace(":id", currentUrl[currentUrl.indexOf("groups") + 1]);
    $('a').eq(0).attr('href', linkToUpdate);
}