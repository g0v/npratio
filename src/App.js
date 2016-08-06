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
    hospital: list[0],
  }
  render() {
    const { hospital } = this.state;

    return (
      <div className="viewport">
        <div className="searchbar">
          <SearchBar
            placeholder="搜尋醫院"
            onChange={(input, resolve) => {
              resolve(_.take([].concat(fuse.search(input), list), 5));
            }}
            onSearch={(hospital) => {
              if (!hospital) return;
              this.setState({ hospital });
            }}
          />
        </div>
        <div className="hospital">
          <Hospital hospital={hospital} />
        </div>
        <div className="tip">
          <div>如果你覺得某家醫院的數字「是假的！」，可以試試看：〈盡量附上相關事證依據喔！〉</div>
            <ol>
              <li><a target="_blank" href="http://opinion.nhi.gov.tw/iftpa/PA01T02.php">找政府！寫信到衛福部健保署署長信箱[點我]</a></li>
              <li><a target="_blank" href="https://www.facebook.com/TMAL119/?fref=ts">找醫勞盟！傳訊息給醫勞盟粉絲團[點我]</a></li>
              <li><a target="_blank" href="https://docs.google.com/spreadsheets/d/17hkvPVgqW06rO7TQMQGgIpJMiJ4QTiGQXGDzoNXGjKE/edit#gid=0">找民代！從立委咖電喂找立委反映[點我]</a></li>
            </ol>
        </div>
      </div>
    );
  }
}

export default App;
