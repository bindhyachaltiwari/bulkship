import React from 'react';
const { default: ReactApexChart } = require("react-apexcharts");

class ApexChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            series: [{
                name: 'Actual',
                data: props.actualData
            }, {
                name: 'Original',
                data: props.originalData
            }],
            options: {
                chart: {
                    type: 'bar',
                    height: 500
                },
                plotOptions: {
                    bar: {
                        horizontal: false,
                        columnWidth: '55%',
                        endingShape: 'rounded'
                    },
                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    show: true,
                    width: 2,
                    colors: ['transparent']
                },
                xaxis: {
                    categories: ['VOYAGE DAYS', 'LOAD PORT DELAY', 'DISCHARGE PORT DELAY', 'INTERMEDIATE PORT DELAY', 'IFO', 'MDO', 'LOAD PORT DA', 'DISCHARGE PORT DA', 'INTERMEDIATE PORT DA'],
                },
                yaxis: {
                    title: {
                        text: '$'
                    }
                },
                fill: {
                    opacity: 1
                },
                tooltip: {
                    y: {
                        formatter: function (val) {
                            return '$' + val
                        }
                    }
                }
            },
        };
    }

    render() {
        return (
            <div id="chart">
                <ReactApexChart options={this.state.options} series={this.state.series} type="bar" height={500} />
            </div>
        );
    }
}

export default ApexChart;