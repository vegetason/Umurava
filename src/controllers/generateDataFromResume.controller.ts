import { Request, Response } from "express";
import fs from "fs-extra";
import path from "path";
import { extractZip } from "../services";
import { extractTextFromFile } from "../services";
import { parseResumeWithGemini } from "../services/gemni.service";
import { saveTalentProfile } from "../services/talentProfile.service";
import { JobDescriptionInfoType } from "../types/jobDescriptionInfo.type";
import { createJobDescription } from "../services/jobDescription.service";

export async function generateData(req: Request, res: Response) {
    const files = req.files as Express.Multer.File[];
    const jobDescription=req.body as JobDescriptionInfoType

    if (!files || files.length === 0) {
        return res.status(400).json({ message: "No files uploaded" });
    }

    const results: any[] = [];

    for (const file of files) {
        const ext = path.extname(file.originalname).toLowerCase();

        if (ext === ".zip") {
            const { extractPath, filePaths } = await extractZip(file.path);

            for (const innerFile of filePaths) {
                try {
                    const text = await extractTextFromFile(innerFile);
                    results.push({ file: innerFile, content: text });
                } catch (err) {
                    console.error("Error reading file:", innerFile);
                } finally {
                    await fs.remove(innerFile);
                }
            }

            await fs.remove(extractPath);

            await fs.remove(file.path);
        }

        else {
            try {
                const text = await extractTextFromFile(file.path);
                results.push({ file: file.originalname, content: text });
            } catch (err) {
                console.error("Error reading file:", file.path);
            } finally {
                await fs.remove(file.path);
            }
        }
    }
    const saved = await Promise.all(
        results.map(async (r) => {
            const parsed = await parseResumeWithGemini(r.content);
            const profile = await saveTalentProfile(parsed);
            return { file: r.file, profile };
        })
    );


    return res.json({ saved ,jobDescription});
}