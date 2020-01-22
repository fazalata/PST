/*Få opp alle sakene på forsiden*/
$(document).ready(() => {
    window.lstCases = caseLib.list();
    if (lstCases.length == 0) {
        utils.createFirst9Case();
    }
    renderCaseList();
});

/*Saker på forsiden*/
function renderCaseList() {
    $("#divCases").empty();
    for (let objCase of window.lstCases) {
        $("#divCases").append(`
            <div class="grid-item" >
                <div class="text-left">
                    <span class="case-title">${objCase.title}</span>
                </div>
                <br>
                <a href="case-details.html?caseId=${objCase.id}">
                    <img src="images/cases/${objCase.pictures[0]}" class="home-case-img">
                </a>
                <div class="text-left" style="font-size:19px;margin-top:5px;">
                    <span>Kategori : ${objCase.category}</span>
                </div>
                <a href="case-details.html?caseId=${objCase.id}" class="les-mer-a">
                    <div class="les-mer-btn"> Les mer </div>
                </a>
            </div>
    `);
    }
}