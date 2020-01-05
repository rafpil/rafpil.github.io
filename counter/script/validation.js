class validation {
    checkForm() {
        let correct = true;
        let roadName = document.getElementById("roadName");
        let startVal = document.getElementById("startVal");
        let stopVal = document.getElementById("stopVal");

        //road name validation

        if (roadName.validity.valueMissing) {
            new alert().showAlert("alert-danger", "Brak oznaczenia drogi!", 5000);
            roadName.classList.add("is-invalid");
            correct = false;
        } else {
            roadName.classList.remove("is-invalid");
        }

        //start value  validation

        if (startVal.validity.valueMissing) {
            new alert().showAlert("alert-danger", "Brak wartości początkowej!", 5000);
            startVal.classList.add("is-invalid");
            correct = false;
        } else if ((/\b(\d*(,|\+)\d\d\d)\b/gm).exec(startVal.value) == null) {
            new alert().showAlert("alert-danger", "Zły format wartości początkowej!", 5000);
            startVal.classList.add("is-invalid");
            correct = false;
        } else if (parseFloat(startVal.value) > parseFloat(stopVal.value)) {
            new alert().showAlert("alert-danger", "Wartość początkowa jest większa od wartości końcowej!", 5000);
            startVal.classList.add("is-invalid");
            correct = false;
        } else {
            startVal.classList.remove("is-invalid");
        }

        //start value  validation

        if (stopVal.validity.valueMissing) {
            new alert().showAlert("alert-danger", "Brak wartości końcowej!", 5000);
            stopVal.classList.add("is-invalid");
            correct = false;
        } else if ((/\b(\d*(,|\+)\d\d\d)\b/gm).exec(stopVal.value) == null) {
            new alert().showAlert("alert-danger", "Zły format wartości końcowej!", 5000);
            stopVal.classList.add("is-invalid");
            correct = false;
        } else {
            stopVal.classList.remove("is-invalid");
        }

        return correct;
    }
}