import React, { PropTypes } from 'react';
import C3Chart from 'react-c3js';

// const names = {
//   data1: 'Name 1',
//   data2: 'Name 2',
//   data3: 'Name 3',
// };

// const src = [
//   ['data1', 220, 240, 270, 250, 280],
//   ['data2', 180, 150, 300, 70, 120],
//   ['data3', 200, 310, 150, 100, 180]
// ];

class Chart extends React.Component {
  render() { 
    const data = {
      columns: this.props.columns,
      names: this.props.names,
      mimeType: 'json',
    };
    return (
      <C3Chart data={data} />
    );
  }
}

Chart.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  names: PropTypes.string,
}

export default Chart;