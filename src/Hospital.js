import React, { PropTypes } from 'react';
import Chart from './Chart';

class Hospital extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'Hospital';
  }
  render() {
    const { hospital } = this.props;

    let jsonData = {};
    let cmp;

    if (hospital['醫院簡稱'] !== undefined) {
      let monthData = [];
      let sum = 0;

      for (let i = 1; i <= 12; i++) {
        const month = i+'\u6708';
        monthData.push(hospital[month]);
        sum += parseInt(hospital[month], 10);
      };

      const avg = sum/12.;
      let avgData = [];
      for (let i = 0; i < 12; i++) {
        avgData.push(avg.toFixed(1));
      };
      jsonData[hospital['醫院簡稱']] = monthData;
      jsonData['本院平均'] = avgData;

      cmp = <Chart jsonData={jsonData} />;
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
};

export default Hospital;