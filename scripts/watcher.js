window.googleDocCallback = function () { return true; };
// localstorage
// googleSheets
export default class Watcher {
  constructor(player) {
  
    this.storage = localStorage;
    this.player;

    this.dburl = 'https://script.google.com/macros/s/AKfycbzCjBiwblbXFC9RLP3Rl1_pJP3qqmPXY50cugMjwF6115FjYdl3syIhZzz3-1BVTCH7/exec?callback=googleDocCallback&';

    this._setInitialData(player);
  }

  _setInitialData(player) {
    if(player) {
      this.player = {
        name: player.name,
        startDate: player.startDate,
        try: player.try,
        deaths: player.deaths,
      }
    } else {
      this.player = {
        name: '',
        startDate: '',
        try: 0,
        deaths: 0,
      }
    }
  }

  saveData() {
    this.storage.setItem('player', JSON.stringify(this.player));
    this._setToDB();
  }

  setDate(date) {
    this.player.startDate = date;
  }

  setName(name) {
    this.player.name = name;
  }

  incTry() {
    this.player.try++;
    this.saveData();
  }

  incDeaths() {
    this.player.deaths++;
    this.saveData();
  }

  _setToDB() {
    fetch( `${this.dburl}name=${this.player.name}` )
  }
}