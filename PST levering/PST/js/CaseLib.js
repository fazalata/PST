/*Få opp alle sakene*/
if (!localStorage.getItem("lstCases")) {
    localStorage.setItem("lstCases", "[]");
}

/*Sak tabell*/
function CasesModel() {
    var lstCases = JSON.parse(localStorage.getItem("lstCases"));
    var lastCaseid = parseInt(localStorage.getItem("lastCaseId")) || 0;

    /*Oppdatere eksisterende sak*/
    function updateLs() {
        localStorage.setItem("lstCases", JSON.stringify(lstCases));
        localStorage.setItem("lastCaseId", lastCaseid);
    }
    
    /*Åpne Redigere saken*/
    function getCaseById(caseId) {
        return lstCases.find(item => item.id == caseId);
    }

    /*Legg til sak*/
    this.add = (objCase) => {
        objCase.id = ++lastCaseid;
        lstCases.push(objCase);
        updateLs();
        return true;
    }

    /*Oppdatere Sak*/
    this.update = (caseId, setCase) => {
        let objCase = getCaseById(caseId);
        if (!objCase) {
            throw Error("Sak ikke funnet");
        }

        for (let key in setCase) {
            if (key == "id") {
                continue;
            }
            objCase[key] = setCase[key];
        }
        updateLs();
        return true;
    }
    /*Slette saken*/
    this.delete = (caseId) => {
        let objCase = getCaseById(caseId);
        if (!objCase) {
            throw Error("Sak ikke funnet");
        }
        for (let index in lstCases) {
            if (lstCases[index].id == objCase.id) {
                lstCases.splice(index, 1);
            }
        }
        updateLs();
        return true;
    }
    /*Få ut sak*/
    this.list = (caseId) => {
        if (caseId) {
            return getCaseById(caseId);
        }

        return lstCases;
    }
}

/*Class til legg til knappen på admin side*/
class CaseSchema {
    index;
    constructor(index, title, catagory) {
        this.index = index;
        this.title = title ? title : "";
        this.description = this.index ? "Denne saken handler om " + this.title : "";
        this.dateCreated = new Date().toLocaleDateString();
        this.pictures = [this.index ? `case-${this.index - 1}.jpg` : ""];
        this.category = catagory || "ikke satt";
        this.isResolved = false;
    }

}

const caseLib = new CasesModel();