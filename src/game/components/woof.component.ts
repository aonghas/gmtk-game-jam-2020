import { Assets } from '../assets';
import { Component } from '../component';
import { intBetween } from '../utils';

export class WoofComponent extends Component {

  public static readonly KEY = Symbol();

  private static readonly NUM_SOUNDS = 1;

  private interval: number;
  private timeUntilSound: number;
  private woofChance: number;

  constructor(interval: number, chance: number) {
    super(WoofComponent.KEY);

    this.timeUntilSound = this.interval = interval;
    this.woofChance = chance;
  }

  public update(delta: number) {
    if (this.isSoundReady(delta)) {
      this.attemptSound();
      this.resetSoundTimer();
    }
  }

  private isSoundReady(delta: number): boolean {
    this.timeUntilSound -= delta;
    return this.timeUntilSound <= 0;
  }

  private attemptSound(): void {
    if (this.shouldPlaySound()) {
      this.playSound();
    }
  }

  private shouldPlaySound(): boolean {
    return Math.random() < this.woofChance;
  }

  public playSound(): void {
    let soundId = intBetween(1, WoofComponent.NUM_SOUNDS).toString();
    if (soundId.length < 2) {
      soundId = '0' + soundId;
    }

    Assets.playSound(`woof${soundId}.ogg`);
  }

  private resetSoundTimer(): void {
    this.timeUntilSound = this.interval;
  }

}
