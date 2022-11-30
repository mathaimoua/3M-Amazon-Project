const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
import axios from "axios";

const apikey = process.env.REACT_APP_RAINFOREST_API_KEY;

const params = {
  api_key: apikey,
  type: "search",
  amazon_domain: "amazon.com",
  search_term: "3M",
  exclude_sponsored: "true",
  sort_by: "average_review",
  currency: "usd",
  refinements: "p_89/3M",
};

axios
  .get("https://api.rainforestapi.com/request", { params })
  .then((response) => {
    // print the JSON response from Rainforest API
    console.log(JSON.stringify(response.data, 0, 2));
    res.send(response.data);
  })
  .catch((error) => {
    // catch and print the error
    console.log(error);
  });
