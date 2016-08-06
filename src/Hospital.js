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
    for (let i = 1; i <= 12; i++) {
      const month = i+'\u6708';
      monthData.push(hospital[month]);
    };
    monthData.unshift( hospital['醫院簡稱'] );

    return (
      <div>
        <div>
          type: { hospital['特約類別'] } <br />
          name: { hospital['醫院簡稱'] } <br />
          full name: { hospital['醫事機構名稱'] } <br />
          address: { hospital['地址'] } <br />
          data: { monthData.map(d => d + ' ' ) }
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