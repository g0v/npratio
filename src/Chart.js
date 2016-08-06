import React, { PropTypes } from 'react';
import C3Chart from 'react-c3js';

// const json= {
//   data1: [30, 20, 50, 40, 60, 50],
//   data2: [200, 130, 90, 240, 130, 220],
//   data3: [300, 200, 160, 400, 250, 250]
// }

class Chart extends React.Component {
  render() { 
    const data = {
      json: this.props.jsonData,
    };
    const axis = {
      x: {
        label: '月份',
      },
      y: {
        label: '護病比數字',
      },
    };
    return (
      <C3Chart data={data} axis={axis} />
    );
  }
}

Chart.propTypes = {
  jsonData: PropTypes.object.isRequired,
}

export default Chart;