const app = require("../app");
const db = require("../model/db");
const path = require("path");
const createFolderIsExist = require("../helpers/create-dir");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

db.then(() => {
  app.listen(PORT, async () => {
    const PUBLIC_DIR = process.env.PUBLIC_DIR;
    const UPLOAD_DIR = process.env.UPLOAD_DIR;
    const IMAGES_DIR = path.join(process.cwd(), "public", "images");

    await createFolderIsExist(PUBLIC_DIR);
    await createFolderIsExist(UPLOAD_DIR);
    await createFolderIsExist(IMAGES_DIR);

    console.log(`Server running. Use our API on port: ${PORT}`);
  });
}).catch((err) => {
  console.log(`Server not running. Error message: ${err.message}`);
  process.exit(1);
});
