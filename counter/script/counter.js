class Counter {

    getMileage(formIdValue) {
        let string = (document.getElementById(formIdValue).value).replace(/,|\+/g, '.');
        return parseFloat(string);
    }

    getName(formIdValue) {
        return document.getElementById(formIdValue).value;
    }

    countData(start, stop, name) {

        let km = new Array(10).fill(0, 0, 10);
        let he = new Array(10).fill(0, 0, 10);

        do {
            for (let i = 0; i < (start - start % 1).toString().length; i++) {
                km[(start - start % 1).toString().charAt(i)] += 1;
            }

            he[(start % 1).toFixed(1) * 10] += 1;

            start = (start * 10 + 0.1 * 10) / 10;

        } while (start.toFixed(1) != (stop + 0.1).toFixed(1))

        return new rowData(km, he, name);
    }
}