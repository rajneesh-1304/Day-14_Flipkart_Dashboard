import { diskStorage } from "multer";
import { extname } from "path";
import { v4 as uuid } from "uuid";

export const productImageStorage = diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, `${uniqueSuffix}${extname(file.originalname)}`);
    },
});