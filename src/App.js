import React, { Component } from 'react';
import _ from 'lodash';
import Fuse from 'fuse.js';
import SearchBar from './SearchBar';
import Hospital from './Hospital';
import data from './data/data.json';
import './App.css';

const list = _.map(data, (item) => ({ ...item, name: item['醫事機構名稱'] }));

var fuse = new Fuse(
  list, {
  keys: [
    '醫事機構名稱',
    '醫院簡稱'
  ]
});

class App extends Component {
  state = {
    hospital: {}
  }
  render() {
    const { hospital } = this.state;
    return (
      <div className="viewport">
        <SearchBar
          placeholder="搜尋醫院"
          onChange={(input, resolve) => {
            resolve(_.take([].concat(fuse.search(input)), 5));
          }}
          onSearch={(hospital) => {
            if (!hospital) return;
            this.setState({ hospital });
          }}
        />
        <Hospital hospital={hospital} />
      </div>
    );
  }
}

export default App;
