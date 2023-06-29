import { db, Table } from "./db.config.js";
import AWS from "aws-sdk";

//get random quote by ID
const getRandomQuote = async (value, key = "id") => {
  const params = {
    TableName: Table,
    Key: {
      [key]: parseInt(value),
    },
  };
  try {
    const { Item = {} } = await db.get(params).promise();
    return { success: true, data: Item };
  } catch (error) {
    return { success: false, data: null };
  }
};

export { getRandomQuote };
