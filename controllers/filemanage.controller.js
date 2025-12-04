require("dotenv").config();
const express = require("express");
const multer = require("multer");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { Upload } = require("@aws-sdk/lib-storage");



const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});


const uploadFile = async (req, res) => {
  try {
    console.log(req.file)
    const file = req.file;
    const Key = `uploads/${Date.now()}_${file.originalname}`;

    const uploadParams = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: "public-read", // optional
    };

    const uploadResult = await new Upload({
      client: s3,
      params: uploadParams,
    }).done();

    res.json({ success: true, fileUrl: uploadResult.Location });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  uploadFile,
};