import fs from "fs-extra";
import mammoth from "mammoth";
import path from "path";
import AdmZip from "adm-zip";

const pdf = require("pdf-parse");
export const extractTextFromFile = async (filePath: string) => {
    const ext = path.extname(filePath).toLowerCase();

    if (ext === ".pdf") {
        const buffer = await fs.readFile(filePath);
        const data = await pdf(buffer);
        return data.text;
    }

    if (ext === ".docx") {
        const result = await mammoth.extractRawText({ path: filePath });
        return result.value;
    }

    return "no pdf read";
};

export const extractZip = async (zipPath: string) => {
    const extractPath = path.join(
        path.dirname(zipPath),
        `extracted-${Date.now()}`
    );

    await fs.ensureDir(extractPath);

    const zip = new AdmZip(zipPath);
    zip.extractAllTo(extractPath, true);


    const getAllFiles = async (dir: string): Promise<string[]> => {
        const entries = await fs.readdir(dir);
        const files = await Promise.all(
            entries.map(async (entry) => {
                const fullPath = path.join(dir, entry);
                const stat = await fs.stat(fullPath);

                return stat.isDirectory()
                    ? getAllFiles(fullPath)
                    : fullPath;
            })
        );
        return files.flat();
    };

    const filePaths = await getAllFiles(extractPath);

    return {
        extractPath,
        filePaths
    };
};