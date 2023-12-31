import express from "express";
import { getRandomQuote } from "./db.js";

const router = express.Router();

//get recipe by id
router.get("/quotes/random", async (request, response) => {
  //get id out of parameters found in request
  

  //call get request method from db.js
  const { success, data } = await getRandomQuote();

  if (success) {
    response.json({ data });
  } else {
    response.status(404).end();
  }
});

export default router;
