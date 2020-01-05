class converter {
    convert(data, sum) {
        let dataToPDF = [
            [{
                    text: 'DROGA',
                    style: 'header',
                    margin: [0, 10, 0, 0],
                    rowSpan: 2
                },
                {
                    text: 'HEKTORMETRY',
                    style: 'header',
                    colSpan: 10,
                    alignment: 'center'
                }, {}, {}, {}, {}, {}, {}, {}, {}, {},
                {
                    text: 'KILOMETRY',
                    style: 'header',
                    colSpan: 10,
                    alignment: 'center'
                }, {}, {}, {}, {}, {}, {}, {}, {}, {}
            ],
            [{}, {
                text: '0',
                style: 'subheader'
            }, {
                text: '1',
                style: 'subheader'
            }, {
                text: '2',
                style: 'subheader'
            }, {
                text: '3',
                style: 'subheader'
            }, {
                text: '4',
                style: 'subheader'
            }, {
                text: '5',
                style: 'subheader'
            }, {
                text: '6',
                style: 'subheader'
            }, {
                text: '7',
                style: 'subheader'
            }, {
                text: '8',
                style: 'subheader'
            }, {
                text: '9',
                style: 'subheader'
            }, {
                text: '0',
                style: 'subheader'
            }, {
                text: '1',
                style: 'subheader'
            }, {
                text: '2',
                style: 'subheader'
            }, {
                text: '3',
                style: 'subheader'
            }, {
                text: '4',
                style: 'subheader'
            }, {
                text: '5',
                style: 'subheader'
            }, {
                text: '6',
                style: 'subheader'
            }, {
                text: '7',
                style: 'subheader'
            }, {
                text: '8',
                style: 'subheader'
            }, {
                text: '9',
                style: 'subheader'
            }, ]
        ];
        this.data = data;
        this.sum = sum;
console.log(sum);
        for (let j = 0; j < data.length; j++) {
            dataToPDF.push([{
                style: '',
                text: data[j].name
            }]);

            for (let i = 0; i < 10; i++) {
                dataToPDF[dataToPDF.length - 1].push({
                    style: '',
                    text: data[j].he[i]
                });
            }
            for (let i = 0; i < 10; i++) {
                dataToPDF[dataToPDF.length - 1].push({
                    style: '',
                    text: data[j].km[i]
                });
            }
        }
        dataToPDF.push([{
            style: 'footer',
            text: sum.name
        }]);

        for (let i = 0; i < 10; i++) {
            dataToPDF[dataToPDF.length - 1].push({
                style: 'footer',
                text: sum.he[i]
            });
        }
        for (let i = 0; i < 10; i++) {
            dataToPDF[dataToPDF.length - 1].push({
                style: 'footer',
                text: sum.km[i]
            });
        }
        return dataToPDF;
    }
}