import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");

export const readDB = (collection: string) => {
  const filePath = path.join(DATA_DIR, `${collection}.json`);
  if (!fs.existsSync(filePath)) {
    return [];
  }
  const data = fs.readFileSync(filePath, "utf-8");
  try {
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

export const writeDB = (collection: string, data: any) => {
  const filePath = path.join(DATA_DIR, `${collection}.json`);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
};

export const generateId = (collection: string, prefix: string) => {
  const data = readDB(collection);
  if (data.length === 0) return `${prefix}000001`;
  const lastItem = data[data.length - 1];
  const lastIdNum = parseInt(lastItem.id.replace(prefix, ""), 10);
  const newIdNum = lastIdNum + 1;
  return `${prefix}${newIdNum.toString().padStart(6, "0")}`;
};
