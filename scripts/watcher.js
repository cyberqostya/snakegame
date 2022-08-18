// localstorage
// googleSheets
export default class Watcher {
  constructor(player) {
  
    this.storage = localStorage;
    this.player;

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
    // отправка в таблицы
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
}