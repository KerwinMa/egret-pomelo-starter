import * as xlsx from 'xlsx';
import * as fs from 'fs';
import * as path from 'path';
import { BuilderInterface, BuilderOpts } from './interface';
import { JsonTranser } from './sheetsTranser/jsonTranser';
export class ExcelBuilder implements BuilderInterface {
    dirPath: string;
    outDirPath: string;
    opts: BuilderOpts;
    constructor (dirPath: string, outDirPath: string, opts: BuilderOpts) {
        this.dirPath = dirPath;
        this.outDirPath = outDirPath;
        this.opts = opts;
    }

    
    async readDirFIles (): Promise<any> {
        return new Promise((resolve, reject) => {
            fs.readdir(this.dirPath, (err, files) => {
                if (err) reject(err);
                resolve(files);
            });
        });
    }

    async getFilesSheet (): Promise<any> {
        const files = await this.readDirFIles();
        if (!files || files.length === 0) console.warn(`there is no files in ${this.dirPath}`);
        for (const index in files) {
            const fileName = files[index];
            const filePath = path.resolve(this.dirPath, fileName);
            const workbook = xlsx.readFile(filePath);
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            this.transSheet(sheet, this.opts);
        }
    }

    transSheet (sheet: object, opts: BuilderOpts) {
        const transer = new JsonTranser (sheet, opts);
        transer.trans();
    }

    async build (): Promise<void> {
        await this.getFilesSheet();
    }
}

