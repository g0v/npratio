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
  render() {
    return (
      <div className="viewport">
        <SearchBar
          placeholder="搜尋醫院"
          onChange={(input, resolve) => {
            resolve(_.take([].concat(fuse.search(input)), 5));
          }}
          onSearch={(input) => {
            if (!input) return;
            console.info('Searching:', input);
          }}
        />
        <Hospital hospital={list[0]} />
      </div>
    );
  }
}

export default App;
