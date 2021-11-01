const multer = require("multer");
const uuid = require("uuid");
const pathUploads = "./public/uploads";

/*upload foto*/
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, pathUploads);
  },
  filename: (req, file, cb) => {
    cb(null, uuid.v4().toString() + "_" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/gif" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jfif"
  ) {
    cb(null, true);
  } else {
    cb("Type file is not access", false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: 1024 * 1024 * 5,
});

module.exports = upload;
