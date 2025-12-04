const router=require('express').Router();
const multer=require('multer')
const {uploadFile} = require('../controllers/filemanage.controller')

const upload = multer({ storage: multer.memoryStorage() }); // FILE IN MEMORY

router.route("/upload").post(upload.single("file"), uploadFile);


module.exports=router;