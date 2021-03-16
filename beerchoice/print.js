let header = document.createElement("h1");
header.innerHTML = "Vælg en Øl-type";
document.body.before(header);

let beerChosen = document.querySelectorAll("#beerForm input");
document.getElementById("knap").addEventListener("click", checkedFunction);
function checkedFunction() {
    beerChosen.forEach(element => {
        if (element.checked === true) {
            console.log(element.value);
        }
    });
}