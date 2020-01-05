document.getElementById("tBodyBig").addEventListener("mouseover", function (element) {

    let selectElement = element.target;

    let elements = document.getElementsByClassName("table-row");

    for (let i = 0; i < elements.length; i++) {
        elements[i].classList.remove('table-row');
    }

    let trash = document.querySelectorAll("#tBig .fa-trash-o");
    for (let i = 0; i < trash.length; i++) {
        trash[i].classList.add('hidden');
    }

    if (selectElement.nodeName == "TD") {
        selectElement.parentNode.classList.add("table-row");
        selectElement.parentNode.firstChild.children[1].classList.remove("hidden");
    } else if (selectElement.nodeName == "SPAN" || "I") {
        selectElement.parentNode.parentNode.classList.add("table-row");
        selectElement.parentNode.parentNode.firstChild.children[1].classList.remove("hidden");
    }
});

document.getElementById("tableView").addEventListener("mouseleave", function () {
    let elements = document.getElementsByClassName("table-row");
    for (let i = 0; i < elements.length; i++) {
        elements[i].classList.remove('table-row');
    }

    let trash = document.querySelectorAll("#tBig .fa-trash-o");
    for (let i = 0; i < trash.length; i++) {
        trash[i].classList.add('hidden');
    }
});

document.getElementById("addButton").addEventListener("click", function (event) {
    event.preventDefault();
});

document.getElementById("generatePDF").addEventListener("click", function (event) {
    event.preventDefault();
});