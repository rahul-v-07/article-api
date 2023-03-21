import fs from "fs";
import { promisify } from "util";

const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);

async function createFileIfDoesNotExist(path: string, defaultData: string) {
    try {
        await readFileAsync(path);
      } catch (e) {
        console.info(`Creating file ${path} with ${defaultData}`);
        await writeFileAsync(path, defaultData);
      }
}

async function readAndParseData(path: string): Promise<unknown> {
    const data = await readFileAsync(path, "utf8");
    return JSON.parse(data);
}

function writeDataToFile(path: string, data: unknown) {
    return writeFileAsync(path, JSON.stringify(data));
}

export { createFileIfDoesNotExist, readAndParseData, writeDataToFile };