import multer from "multer";

const TYPE_IMAGE = {
  "image/png": "png",
  "image/jpg": "jpg",
  "image/jpeg": "jpeg",
};

const maxFile = 1 * 1024 * 1024;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/image");
  },
  filename: (req, file, cb) => {
    const ext = TYPE_IMAGE[file.mimetype];
    cb(null, `${file.fieldname}-${Date.now()}.${ext}`);
  },
});
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const fileUpload = multer({
  storage,
  fileFilter,
  limits: { fileSize: maxFile },
}).single("image");

export default fileUpload;
