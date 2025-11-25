import fs from 'fs/promises';
import path from 'path';

const dataDir = path.join(process.cwd(), 'data');

export const readData = async (fileName: string) => {
  const filePath = path.join(dataDir, fileName);
  const data = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(data);
};

export const writeData = async (fileName: string, data: any) => {
  const filePath = path.join(dataDir, fileName);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
};
