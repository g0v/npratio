import React, { Component } from 'react';
import _ from 'lodash';
import SearchBar from './SearchBar';
import data from './data/data.json';
import './App.css';

const list = _.map(data, (item) => ({ ...item, name: item['醫事機構名稱'] }));

class App extends Component {
  render() {
    return (
      <div className="viewport">
        <SearchBar
          placeholder="搜尋醫院"
          onChange={(input, resolve) => {
            const keyword = input.split('');
            console.log(keyword);
            const suggestion = _.map(list, (item) => {
              if (item['醫事機構名稱'] === input) {
                return {...item, priority: 5};
              } else if (item['醫院簡稱'] === input) {
                return {...item, priority: 4};
              }

              return {...item, priority: 0};
            });
            ;
            resolve(_.take(_.sortBy(suggestion, ['priority']), 5));
          }}
          onSearch={(input) => {
            if (!input) return;
            console.info('Searching:', input);
          }}
        />
      </div>
    );
  }
}

export default App;
