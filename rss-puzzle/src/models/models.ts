export type WordCard = {
  audioExample: string;
  textExample: string;
  textExampleTranslate: string;
  id: number;
  word: string;
  wordTranslate: string;
};
export type LevelData = {
  id: string;
  name: string;
  imageSrc: string;
  cutSrc: string;
  author: string;
  year: string;
};
export type Round = {
  levelData: LevelData;
  words: WordCard[];
};
export type Level = {
  rounds: Round[];
  roundsCount: 45;
};
