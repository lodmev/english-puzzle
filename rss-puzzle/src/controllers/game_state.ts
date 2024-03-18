import { Level } from '../models/models';
import getLevel from '../utils/fetch';
import appState from './app_state';
import RoundState from './round-state';

const levelFiles: string[] = [
  'wordCollectionLevel1.json',
  'wordCollectionLevel2.json',
  'wordCollectionLevel3.json',
  'wordCollectionLevel4.json',
  'wordCollectionLevel5.json',
  'wordCollectionLevel6.json',
];

export default class GameState {
  currentLevel: Level | null = null;

  currentLevelIndex = -1;

  currentRoundIndex = 0;

  private getSavedRound() {
    const nextRound = appState.getValue('savedRound');
    if (nextRound != null && typeof nextRound === 'object') {
      this.currentLevelIndex = nextRound.level;
      this.currentRoundIndex = nextRound.round;
    } else {
      this.currentLevelIndex = 0;
    }
  }

  private toNextLevel() {
    if (this.currentLevelIndex + 1 >= levelFiles.length) {
      this.currentLevelIndex = 0;
    } else {
      this.currentLevelIndex += 1;
    }
  }

  private toNextRound(maxRounds: number) {
    if (this.currentRoundIndex + 1 >= maxRounds) {
      this.currentRoundIndex = 0;
      this.toNextLevel();
      return true;
    }
    this.currentRoundIndex += 1;
    return false;
  }

  private async loadRound(needNextRound: boolean) {
    if (this.currentLevelIndex === -1) {
      this.getSavedRound();
    }
    if (this.currentLevel != null) {
      if (needNextRound) {
        const needNextLevel = this.toNextRound(this.currentLevel.roundsCount);
        if (!needNextLevel) {
          return this.currentLevel.rounds[this.currentRoundIndex];
        }
      }
    }
    this.currentLevel = await getLevel(levelFiles[this.currentLevelIndex]);
    return this.currentLevel.rounds[this.currentRoundIndex];
  }

  async getRound(needNextRound: boolean = false) {
    const round = await this.loadRound(needNextRound);
    const roundState = new RoundState(round);
    await roundState.getReady();
    return roundState;
  }
}
