const widthCol = 27;
const headerPdf = 'Zestawienie liczby poszczególnych cyfr naklejanych na słupki prowadzące';
const generateInfoPDF = 'Wygenerowano dnia ' + (new Intl.DateTimeFormat('pl', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
})).format(new Date()) + ' r.';



class PDF {

    constructor(data) {
        this.data = data;
        this.docDefinition = {
            pageSize: 'A4',
            pageOrientation: 'landscape',
            pageMargins: [20, 20, 20, 30],
            footer: function (currentPage, pageCount, pageSize) {
                return {
                    columns: [{
                            width: pageSize.width / 2,
                            text: generateInfoPDF,
                            margin: [20, 0]
                        },
                        {
                            width: pageSize.width / 2,
                            text: currentPage + '/' + pageCount,
                            alignment: 'right',
                            margin: [20, 0]
                        }
                    ]
                }
            },
            content: [{
                    text: headerPdf,
                    style: 'h1'
                },
                {
                    style: 'table',
                    table: {
                        widths: [75, widthCol, widthCol, widthCol, widthCol, widthCol, widthCol, widthCol, widthCol, widthCol, widthCol, widthCol, widthCol, widthCol, widthCol, widthCol, widthCol, widthCol, widthCol, widthCol, widthCol, widthCol],
                        headerRows: 2,
                        body: this.data
                    },
                    layout: {
                        fillColor: function (rowIndex, node, columnIndex) {
                            return (rowIndex + 1 === node.table.body.length) ? '#007AFF' : null;
                        },
                        fillColor: function (rowIndex, node, columnIndex) {
                            return (rowIndex % 2 !== 0 && rowIndex !== 0 && rowIndex !== 1 && node.table.body.length > 5 && rowIndex + 1 !== node.table.body.length) ? '#4CC8FA' : null;
                        }
                    }

                }
            ],
            styles: {
                h1: {
                    fontSize: 18,
                    alignment: 'center',
                    bold: true,
                    margin: [10, 10]
                },
                subheader: {
                    bold: true,
                    fontSize: 13,
                    color: 'white',
                    fillColor: '#007AFF',
                },
                footer: {
                    bold: true,
                    fontSize: 13,
                    color: 'white',
                    fillColor: '#007AFF',
                },
                table: {
                    alignment: 'center'
                },
                header: {
                    bold: true,
                    fontSize: 13,
                    color: 'white',
                    fillColor: '#007AFF',
                },
            },
        };
    }

    generatePDF() {
        pdfMake.createPdf(this.docDefinition).open();
    }

    exportToPDF(data, sum) {
        if (data.length) {
            new PDF(new converter().convert(data, sum)).generatePDF();
        } else {
            new alert().showAlert("alert-warning", "Brak danych do utworzenia PDF!", 5000);
        }
    }
}