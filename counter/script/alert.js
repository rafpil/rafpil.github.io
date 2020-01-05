class alert {
    showAlert(type, msg, time) {
        let node = document.createElement("DIV");
        node.classList.add("alert", type);
        let textnode = document.createTextNode(msg);
        node.appendChild(textnode);
        document.getElementById("alerts").appendChild(node);
        setTimeout(() => {
            document.getElementById("alerts").removeChild(document.getElementById("alerts").children[0])
        }, time);
    }
}