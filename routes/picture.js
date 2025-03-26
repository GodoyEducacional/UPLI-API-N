const express = require("express");
const router = express.Router();

const upload = require("../config/multer");

const PictureController = require("../controllers/PictureControllers");

router.post("/", upload.single("file"), PictureController.create);
