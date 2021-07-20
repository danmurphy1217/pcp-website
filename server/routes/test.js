import fetch from "node-fetch";
import express from "express";
import axios from "axios";
import config from "config";

const router = express.Router();
const delay = (ms) => new Promise((resolve, reject) => setTimeout(resolve, ms));

router.get("/test", async (req, res) => {
    return res.status(200).json({message: "Hello!"});
});

export default router;