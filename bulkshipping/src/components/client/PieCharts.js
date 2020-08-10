import React, { Component } from 'react';
import Chart from 'react-apexcharts';
class PieCharts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        chart: {
          width: 380,
          type: 'pie',
        },
        labels: Object.keys(props.vesselDetails),
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }]
      },
      series: Object.values(props.vesselDetails),
    };
  }

  render() {
    return (
      <div className='app'>
        <div className='row' />

        <div className='row'>
          <div className='col percentage-chart'>
            <Chart
              options={this.state.options}
              series={this.state.series}
              type='pie'
              width={this.props.role === 'Client' ? 500 : 350}
            />
          </div>
        </div>
      </div>
    );
  }
}
export default PieCharts;