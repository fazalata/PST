/*Få opp sakene på detaljer siden*/
$(document).ready(() => {
    let caseId = utils.parseQueryString().caseId;
    if(caseId == "0"){
        window.objCase = caseLib.list()[0];
    }
    else{
        window.objCase = caseLib.list(caseId);
    }
    renderCaseDetail();
    renderCaseImage();

});
/*Detaljer om saken fuksjoner*/
function renderCaseDetail() {
    $("#divCaseDetail").empty();
    $("#divCaseDetail").append(`
                <div>
                    <div class="text-center case-detail-title">
                       <span>${objCase.title}</span>
                    </div>
                    <div class="text-right">
                        <span style="padding:20px"><span class="text-bold">Kategori</span>: ${objCase.category}</span>
                        <span style="padding:20px">${objCase.isResolved ? '<span class="text-bold" style="color:green">Løst</span>' : '<span class="text-bold" style="color:red">Ikke løst</span>'}</span>
                        <span style="padding:20px">${objCase.dateCreated}</span>
                    </div>
                    <br>
                    <br>
                    <div>
                        <span class="case-title">Beskrivelse :-</span>
                    </div>
                    <div style="padding:10px 60px 60px 60px;border-bottom: 2px solid lightgray">
                        <span style="text-align:justify;">
                            ${objCase.description}
                        </span>
                    </div>
                </div>
        `);
}
/*Bilde på detaljer siden*/
function renderCaseImage() {
    $("#divCaseDetailImages").empty();
    for (let picture of window.objCase.pictures) {
        $("#divCaseDetailImages").append(`
            <div class="display-inlines">
                <img src="images/cases/${picture}" class="case-detail-img-list">
            </div>
    `);
    }
}