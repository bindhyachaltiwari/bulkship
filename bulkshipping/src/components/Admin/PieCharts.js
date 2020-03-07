import React,{Component} from 'react';
import PieChart from 'react-minimal-pie-chart';
class PieCharts extends Component {
constructor(props) {
    super(props);
}
render() {
    return(
        <PieChart
  animate={false}
  animationDuration={500}
  animationEasing="ease-out"
  cx={50}
  cy={50}
  data={[
    {
      color: '#E38627',
      title: 'One',
      value: 10
    },
    {
      color: '#C13C37',
      title: 'Two',
      value: 15
    },
    {
      color: '#6A2135',
      title: 'Three',
      value: 20
    }
  ]}
  label={true}
  labelPosition={50}
  labelStyle={{
    fill: '#121212',
    fontFamily: 'sans-serif',
    fontSize: '5px'
  }}
  lengthAngle={360}
  lineWidth={100}
  onClick={undefined}
  onMouseOut={undefined}
  onMouseOver={undefined}
  paddingAngle={0}
  radius={50}
  rounded={false}
  startAngle={0}
  style={{
    height: '700px'
  }}
  viewBoxSize={[
    100,
    100
  ]}
/>
    )
}
}
export default PieCharts;