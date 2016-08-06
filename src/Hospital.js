import React, { PropTypes } from 'react';
import Chart from './Chart';

class Hospital extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'Hospital';
  }
  render() {
    const { hospital } = this.props;

    let monthData = [];
    let sum = 0;

    for (let i = 1; i <= 12; i++) {
      const month = i+'\u6708';
      monthData.push(hospital[month]);
      sum += parseInt(hospital[month], 10);
    };

    const avg = sum/12.;

    monthData.unshift( hospital['醫院簡稱'] );

    return (
      <div>
        <div>
          <h1> name: { hospital['醫院簡稱'] || 'None' } </h1>
          <h3> full name: { hospital['醫事機構名稱'] || 'None' } </h3>
          type: { hospital['特約類別'] || 'None' } <br />
          address: { hospital['地址'] || 'None' } <br />
          average ratio: { avg || 'None' }
        </div>
        <Chart columns={[monthData]} />
      </div>
    );
  }
}

Hospital.propTypes = {
  hospital: PropTypes.object.isRequired,
};

export default Hospital;