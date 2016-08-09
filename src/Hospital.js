import React, { PropTypes } from 'react';
import C3Chart from 'react-c3js';
const d3 = require('d3');
import './Hospital.css';

const axis = {
  x: {
    label: '月份',
    type: 'category',
    categories: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
  },
  y: {
    label: {
      text: '護病比率',
      position: 'outer-middle',
    },
    tick: {
      format: d3.format('.3n'),
    },
  },
};

class Hospital extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'Hospital';
  }
  render() {
    const { hospital, average } = this.props;

    let jsonData = {};
    let cmp;

    if (hospital['醫院簡稱'] !== undefined) {
      let monthData = [];
      let avgData = [];
      let sum = 0;

      for (let i = 1; i <= 12; i++) {
        const month = i+'\u6708';
        monthData.push(hospital[month]);
        avgData.push(average[month]);
        sum += parseFloat(hospital[month]);
      };

      jsonData[hospital['醫院簡稱']] = monthData;
      // jsonData['全台平均'] = avgData;

      let avg = sum/12;
      avg = avg.toFixed(1);

      let grid = {
        y: {
          lines: [{
            value: avg,
            text: hospital['醫院簡稱'] + '年度平均',
            position: 'start',
            class: 'local',
          }],
        },
      };

      const data = {json: jsonData};
      cmp = <C3Chart data={data} axis={axis} grid={grid} />;
    } else {
      cmp = <div>{' '}</div>;
    }

    return (
      <div>
        {cmp}
      </div>
    );
  }
}

Hospital.propTypes = {
  hospital: PropTypes.object.isRequired,
  average: PropTypes.object.isRequired,
};

export default Hospital;