require("dotenv").config();
const express = require("express");
const app = express();
const axios = require("axios");
const { route } = require("./users");
const db = require("../models");
const router = express.Router();
