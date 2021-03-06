export class GameState {
  constructor(lives: number) {
    this._lives = lives;
  }

  _gameRunning = false;
  _maxLives = 5;
  _lives = 3;
  _score = 0;

  _catsReturnedinARow = 0;

  public onLifeLost: (sender: GameState) => void;
  public onLifeGained: (sender: GameState) => void;
  public onScoreInc: (sender: GameState) => void;

  get catsReturnedinARow() {
    return this._catsReturnedinARow;
  }

  set catsReturnedinARow(newValue) {
    // If there are more than 5 returned in a row then add a life
    if (newValue > 5) {
      this.gainLife();
      this._catsReturnedinARow = 0;
    } else {
      this._catsReturnedinARow = newValue;
    }
  }

  get lives() {
    return this._lives;
  }

  get score() {
    return this._score;
  }

  get gameRunning() {
    return this._gameRunning;
  }

  startGame() {
    this._gameRunning = true;
  }

  stopGame() {
    this._gameRunning = false;
  }

  loseLife() {
    // Reset cats returned
    this.catsReturnedinARow = 0;
    this._lives--;
    if (this.onLifeLost) this.onLifeLost(this);
  }

  gainLife() {
    if (this._lives < this._maxLives) {
      this._lives++;
      if (this.onLifeGained) this.onLifeGained(this);
    }
  }

  increaseScore(amount: number) {
    // Increase cats returned
    this.catsReturnedinARow++;
    this._score += amount;
    if (this.onScoreInc) this.onScoreInc(this);
  }

}
