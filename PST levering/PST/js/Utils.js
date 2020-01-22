/*Få sak opp på detaljer siden.*/
function Utils() {
    this.parseQueryString = () => {
        let query = {}; window.location.search.replace("?", "").split("#")[0].split("&").forEach(part => { query[part.split("=")[0]] = part.split("=")[1] });
        return query;
    }
    
    /*9 saker på forsiden*/
    this.createFirst9Case = () => {
        if (!(localStorage.getItem("lstCases") && JSON.parse(localStorage.getItem("lstCases")).length > 0)) {
            caseLib.add(new CaseSchema(1, "Russisk tjenestemann", "Spionasje"));
            caseLib.add(new CaseSchema(2, "Kinesisk etterretning", "Spionasje"));
            caseLib.add(new CaseSchema(3, "Terrorangrep mot fotballstadion", "Terrosime"));
            caseLib.add(new CaseSchema(4, "Atombombe mot Norge", "ikke-spredning"));
            caseLib.add(new CaseSchema(5, "Trussel mot 17 mai", "Terrosime"));
            caseLib.add(new CaseSchema(6, "Donald Trump", "Myndighetsfolk"));
            caseLib.add(new CaseSchema(7, "Draps Trussel mot Erna solberg", "Myndighetsfolk"));
            caseLib.add(new CaseSchema(8, "Trussel mot Oslo Lufthavn", "Terrosime"));
            caseLib.add(new CaseSchema(9, "Imran Khan til Norge", "Myndighetsfolk"));
        }
    }
}

const utils = new Utils();
