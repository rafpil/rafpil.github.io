class main {
    constructor() {
        this.sum = new rowData(new Array(10).fill(0, 0, 10), new Array(10).fill(0, 0, 10), "SUMA");
        this.data = [];
    }

    showTableBig(rowData, idElement) {
        let td = `<td><span>${rowData.name}</span><i class="fa fa-trash-o hidden" onclick="main.removeSelectRow(this)"></i></td>`;
        for (let i = 0; i < 10; i++) {
            td += `<td>${rowData.he[i]}</td>`;
        }
        for (let i = 0; i < 10; i++) {
            td += `<td>${rowData.km[i]}</td>`;
        }
        let row = `<tr>${td}</tr>`;
        document.getElementById(idElement).insertAdjacentHTML('beforeend', row);
    }

    showTableSmall(rowData, idElement) {

        //if element is sum table don`t add trash icon
        let trash = (idElement != "tSumSmall") ? "fa-trash-o" : "";

        let headerTableSmall = `<table class="table tSmall">
                                <thead>
                                    <tr class="tSmall">
                                        <th rowspan="2"><i class="fa ${trash}" onclick="main.removeSelectTable(this)"></i></th>
                                        <th colspan="2" scope="colgroup"> ${rowData.name} </th>
                                    </tr>
                                    <tr class="tSmall">
                                        <th>Hektometry</th>
                                        <th>Kilometry</th>
                                    </tr>
                                </thead>`;

        let rowTableSmall = () => {
            let data = '';
            for (let i = 0; i < 10; i++) {
                data += `<tr>
                            <td scope="col">${i}</td>
                            <td scope="col">${rowData.he[i]}</td>
                            <td scope="col">${rowData.km[i]}</td>
                        </tr>`;
            }
            return data;
        }

        let bodyTableSmall = '<tbody>' + rowTableSmall() + '</tbody>' + '</table>';
        let wholeTableSmall = headerTableSmall + bodyTableSmall;
        let tSmall = document.getElementById(idElement);
        tSmall.insertAdjacentHTML('beforeend', wholeTableSmall);
    }

    addRow() {
        if (new validation().checkForm()) {
            let counter = new Counter();
            let countData = counter.countData(counter.getMileage('startVal'), counter.getMileage('stopVal'), counter.getName("roadName"));


            this.showTableBig(countData, "tBodyBig");
            this.showTableSmall(countData, "tSmall");

            this.data.push(countData);
            this.addToSum(countData);
            if (this.data.length) {
                document.getElementById("tBig").classList.remove("hidden");
                document.getElementById("startInfo").classList.add("no-display");
            }

            new alert().showAlert("alert-success", "Dodano dane!", 3000);

            document.getElementById("form").reset();
            document.getElementById("roadName").classList.remove("is-invalid");
            document.getElementById("startVal").classList.remove("is-invalid");
            document.getElementById("stopVal").classList.remove("is-invalid");

            document.getElementById("tSumSmall").children[0].children[0].children[0].children[0].children[0].classList.remove("fa-trash-o");
        }
    }

    addToSum(countData) {
        for (let i = 0; i < 10; i++) {
            this.sum.km[i] += countData.km[i];
            this.sum.he[i] += countData.he[i];
        }

        let tableBig = document.getElementById("tBig");
        tableBig.deleteTFoot();
        tableBig.createTFoot().setAttribute("id", "tFootBig");
        this.showTableBig(this.sum, "tFootBig");

        let tSumSmall = document.getElementById("tSumSmall");
        tSumSmall.innerHTML = '';
        this.showTableSmall(this.sum, "tSumSmall");
    }

    subtractFromSum(id) {
        for (let i = 0; i < 10; i++) {
            this.sum.km[i] -= this.data[id].km[i];
            this.sum.he[i] -= this.data[id].he[i];
        }

        let tableBig = document.getElementById("tBig");
        tableBig.deleteTFoot();
        tableBig.createTFoot().setAttribute("id", "tFootBig");
        this.showTableBig(this.sum, "tFootBig");

        let tSumSmall = document.getElementById("tSumSmall");
        tSumSmall.innerHTML = '';
        this.showTableSmall(this.sum, "tSumSmall");
    }

    removeSelectTable(e) {
        let selectTable = e.parentNode.parentNode.parentNode.parentNode;
        let dataIndex = null;

        for (let i = 0; i < selectTable.parentNode.children.length; i++) {
            if (selectTable.parentNode.children[i] == selectTable) {
                dataIndex = i;
            }
        }
        selectTable.remove();
        this.subtractFromSum(dataIndex);
        this.data.splice(dataIndex, 1);

        // we have to remove row from big table
        document.getElementById("tBig").deleteRow(dataIndex + 2);

        if (!this.data.length) {
            document.getElementById("tSumSmall").innerHTML = '';
            document.getElementById("startInfo").classList.remove("no-display");
            document.getElementById("tBig").classList.add("hidden");
            document.getElementById("startInfo").classList.remove("no-display");;
        }
        new alert().showAlert("alert-success", "Usunięto wybrane dane!", 3000);
    }

    removeSelectRow(e) {
        let rowIndex = e.parentNode.parentNode.rowIndex;
        document.getElementById("tBig").deleteRow(rowIndex);
        this.subtractFromSum(rowIndex - 2);
        this.data.splice(rowIndex - 2, 1);

        // we have to remove table from small view
        document.getElementById("tSmall").children[rowIndex - 2].remove();

        if (!this.data.length) {
            document.getElementById("tSumSmall").innerHTML = '';
            document.getElementById("startInfo").classList.remove("no-display");
            document.getElementById("tBig").classList.add("hidden");
            document.getElementById("startInfo").classList.remove("no-display");
        }
        new alert().showAlert("alert-success", "Usunięto wybrane dane!", 3000);
    }
};