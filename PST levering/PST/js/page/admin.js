/*Få opp sakene på admin side*/
$(document).ready(() => {
    window.lstCases = caseLib.list();
    renderCaseTable();
    
});

/*Tabell på admin side*/
function renderCaseTable() {
    $("#tbCases").empty();
    for (let objCase of window.lstCases) {
        let rowStr = `<tr>
                <td>${objCase.title}</td>
                <td>${objCase.description}</td>
                <td>${objCase.dateCreated}</td>
                <td>
                    <a href="case-details.html?caseId=${objCase.id}">
                        <img src="images/cases/${objCase.pictures[0]}">
                    </a>
                </td>
                <td>${objCase.category}</td>
                <td>${objCase.isResolved ? "Ja" : "Nei"}</td>
                <td>
                    <button class="action-btn" onclick="editCase(${objCase.id});">Rediger</button>
                    <button class="action-btn" onclick="deleteCase(${objCase.id});">Slett</button>
                </td>
            </tr>`;
        $("#tbCases").append(rowStr);
    }
}

/*Legg till knappen på admin side*/
function renderAddEditModal() {
    $("#modalAddEditCase").empty();

    $("#modalAddEditCase").append(`
            <div class="modal-close" onclick="$('#modalAddEditCase').hide()">X</div>
            <form id="frmAddEditCase" onsubmit="event.preventDefault();onCaseAddEdit();">
                <table class="table">
                    <tr>
                        <td>Tittel</td>
                        <td>
                            <input type="text" required name="Tiitel" onchange="objCase.title=event.target.value" placeholder="Tittel" value="${objCase.title}" />
                        </td>
                    </tr>
                    <tr>
                        <td>Beskrivelse</td>
                        <td>
                            <textarea required style="width:100%;height:100px;"onchange="objCase.description=event.target.value" name="beskerivelse" placeholder="Beskrivelse">${objCase.description}</textarea>
                        </td>
                    </tr>
                    <tr>
                        <td>Dato opprettet</td>
                        <td>
                            <input required type="text" onchange="objCase.dateCreated=event.target.value" name="Dato opprettet" placeholder="Dato opprettet" value="${objCase.dateCreated}" />
                        </td>
                    </tr>
                    <tr>
                        <td>Bilder</td>
                        <td>
                        <input required type="text" onchange="objCase.pictures[0]=event.target.value;" name="bilder" placeholder="Sak bilde" value="${objCase.pictures[0]}" />
                            
                        <small>Vennligst skriv inn navnet på bilde i bilde box. Den filen må eksisterede i /imags/cases/your-file-name.jpg</small>
                        </td>
                    </tr>
                    <tr>
                        <td>Kategori</td>
                        <td>
                            <input required type="text" onchange="objCase.category=event.target.value" name="Kategori" placeholder="Kategori" value="${objCase.category}" />
                        </td>
                    </tr>
                    <tr>
                        <td>Løst</td>
                        <td>
                            <select required name="isResolved" onchange="objCase.isResolved=event.target.value" >
                                <option value="true" ${objCase.isResolved ? "selected" : ""}>Ja</option>
                                <option value="false" ${!objCase.isResolved ? "selected" : ""}>Nei</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>
                            <button class="action-btn" type="submit">Legg til</button>
                        </td>
                    </tr>
                </table>
            </form>
        `);

}

/*legge til ny sak*/
function addNewCase() {
    window.objCase = new CaseSchema();
    $('#modalAddEditCase').show();
    renderAddEditModal();
}

/*Redigere sak*/
function editCase(caseId) {
    window.objCase = caseLib.list(caseId);
    $('#modalAddEditCase').show();
    renderAddEditModal();
}
/*Slette saken*/
function deleteCase(caseId) {
    var res = confirm("Vil du slette denne saken?");
    if (res) {
        caseLib.delete(caseId);
        alert("Sak slettet vellykket");
        window.lstCases = caseLib.list();
        renderCaseTable();
    }
}

/*Sak legg til på admin side*/
function onCaseAddEdit() {
    try {
        console.log(objCase);
        if (objCase.id) {
            var res = caseLib.update(objCase.id, objCase);
            alert("Oppdatering vellykket");
        }
        else {
            var res = caseLib.add(objCase);
            alert("Ny sak ble lagt til vellykket");
        }
        $('#modalAddEditCase').hide();
        window.lstCases = caseLib.list();
        renderCaseTable();
    }
    catch (ex) {
        console.log(ex);

    }
}
/*legg til bilde*/
function addImageLine(caseId) {
    objCase.pictures.push("");
    renderAddEditModal();
}
/*fjerne bilde*/
function removeImageLine(caseId, index) {
    objCase.pictures.splice(index, 1);
    renderAddEditModal();
}
