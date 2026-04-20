import { Request } from "express";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname).toLowerCase();
        const uniqueName = `${Date.now()}-${file.fieldname}${ext}`;
        cb(null, uniqueName);
    }
});

export const uploadResumes = multer({
    storage,
    fileFilter: (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
        const ext = path.extname(file.originalname).toLowerCase();
        const allowedExtensions = ['.pdf', '.docx','.zip'];

        if (!allowedExtensions.includes(ext)) {
            cb(new Error("Only PDF and DOCX files are supported"));
            return;
        }
        cb(null, true);
    }
}).array('resumes', 20);