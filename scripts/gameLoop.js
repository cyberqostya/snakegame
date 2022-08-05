export default class GameLoop {
  constructor(config, update, draw) {
    this.config = config;
    this.update = update;
    this.draw = draw;
    this.gameLoopId;
  }

  start = () => {
    this.gameLoopId = requestAnimationFrame( this.start );

    if( ++this.config.step < this.config.maxStep ) return;
    this.config.step = 0;
    this.update();
    this.draw();
  }

  stop = () => {
    cancelAnimationFrame(this.gameLoopId);
  }
}