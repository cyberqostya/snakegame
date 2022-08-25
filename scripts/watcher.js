// localstorage
// googleSheets
export default class Watcher {
  constructor(player) {
  
    this.storage = localStorage;
    this.player;

    this.dburl = 'https://script.google.com/macros/s/AKfycbzCjBiwblbXFC9RLP3Rl1_pJP3qqmPXY50cugMjwF6115FjYdl3syIhZzz3-1BVTCH7/exec?';
    this.fetchMods = {
      save: 'save',
      incDeaths: 'incDeaths',
      incTry: 'incTry',
      easterCoord: 'easterCoord',
      easterKonami: 'easterKonami',
    }

    this._setInitialData(player);
  }

  _setInitialData(player) {
    if(player) {
      this.player = {
        name: player.name,
        startDate: player.startDate,
        try: player.try,
        deaths: player.deaths,
        deathLvl: player.deathLvl,
        isCoordEggReceived: false,
        isKonamiEggReceived: false,
      }
    } else {
      this.player = {
        name: '',
        startDate: '',
        try: 0,
        deaths: 0,
        deathLvl: 1,
        isCoordEggReceived: false,
        isKonamiEggReceived: false,
      }
    }
  }

  saveData(mode = this.fetchMods.save) {
    this.storage.setItem('player', JSON.stringify(this.player));

    switch (mode) {
      case this.fetchMods.save: this._setToDB(); break;
      case this.fetchMods.incTry: this._setTryToDB(); break;
      case this.fetchMods.incDeaths: this._setDeathsToDB(); break;
      case this.fetchMods.easterCoord: this._setEasterCoordToDB(); break;
      case this.fetchMods.easterKonami: this._setEasterKonamiToDB(); break;
    }
    
  }

  setDate(date) {
    this.player.startDate = date;
  }

  setName(name) {
    this.player.name = name;
  }

  incTry() {
    this.player.try++;
    this.saveData( this.fetchMods.incTry );
  }

  incDeaths(deathLvl) {
    this.player.deaths++;
    this.player.deathLvl = deathLvl;
    this.saveData( this.fetchMods.incDeaths );
  }

  getCoordEgg() {
    this.player.isCoordEggReceived = true;
    this.saveData( this.fetchMods.easterCoord );
  }

  getKonamiEgg() {
    this.player.isKonamiEggReceived = true;
    this.saveData( this.fetchMods.easterKonami );
  }

  _setToDB() {
    fetch(`${this.dburl}name=${this.player.name}&date=${this.player.startDate}&tries=${this.player.try}&deaths=${this.player.deaths}`)
      .catch(e => console.log('Что-то с fetch'));
  }

  _setDeathsToDB() {
    fetch(`${this.dburl}name=${this.player.name}&deaths=${this.player.deaths}&deathLvl=${this.player.deathLvl}`)
      .catch(e => console.log('Что-то с fetch'));
  }

  _setTryToDB() {
    fetch(`${this.dburl}name=${this.player.name}&tries=${this.player.try}`)
      .catch(e => console.log('Что-то с fetch'));
  }

  _setEasterCoordToDB() {
    fetch(`${this.dburl}name=${this.player.name}&eastercoord=true`)
      .catch(e => console.log('Что-то с fetch'));
  }

  _setEasterKonamiToDB() {
    fetch(`${this.dburl}name=${this.player.name}&easterkonami=true`)
      .catch(e => console.log('Что-то с fetch'));
  }
}