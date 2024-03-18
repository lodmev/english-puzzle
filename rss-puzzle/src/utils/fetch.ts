import { LEVELS_URL } from '../constants';
import { Level } from '../models/models';

async function getData<T>(url: string) {
  const resp = await fetch(url);
  const data = <T>await resp.json();
  return data;
}

async function getLevel(levelFile: string): Promise<Level> {
  const url = `${LEVELS_URL}${levelFile}`;
  const levelData = await getData<Level>(url);
  return levelData;
}
export default getLevel;
