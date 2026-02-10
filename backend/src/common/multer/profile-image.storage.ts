
import { diskStorage } from 'multer';
import { extname } from 'path';

export const profileImageStorage = diskStorage({
  destination: './uploads/users',
  filename: (req, file, cb) => {
    const unique =
      'user-' + Date.now() + '-' + Math.round(Math.random() * 1e6);
    cb(null, unique + extname(file.originalname));
  },
});
