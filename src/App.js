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
    average: {
      '1月': 8.2,
      '2月': 7.7,
      '3月': 8.16,
      '4月': 8.21,
      '5月': 8.26,
      '6月': 8.23,
      '7月': 8.2,
      '8月': 8.04,
      '9月': 8.08,
      '10月': 8.19,
      '11月': 8.05,
      '12月': 7.93,
    },
  }
  render() {
    const { hospital, average } = this.state;

    return (
      <div className="viewport">
        <h1>台灣各醫院護病比</h1>
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
          <Hospital hospital={hospital} average={average} />
        </div>
        <div>
          橫軸是月份，縱軸就是傳說中的「護病比」！也就是「一個護理人員要照顧幾個病人」，數字越高越血汗。
        </div>
        <div className="tip">
          <div>護病比1-2月劇烈變動，依經驗有以下可能原因：</div>
          <ul>
            <li>過年前後時段，選擇性開刀會減少，外科病床多的醫院，護病比會降低。</li>
            <li>過年後是護理人員離職高峰（年終獎金已領、準備7月的各種考試等），護病比會攀升。</li>
          </ul>
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
