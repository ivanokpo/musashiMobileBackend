import { db, Table } from "./db.config.js";
import AWS from "aws-sdk";

//get random quote by ID
const getRandomQuote = async ( key = "id") => {
    const paramsForId = {
        TableName: Table
    }

    const { Items = [] } = await db.scan(paramsForId).promise()
    const generateId = () => {
        const randomId = Math.floor(Math.random() * Items.length + 1);
            return randomId
          }

  const params = {
    TableName: Table,
    Key: {
      [key]: generateId(),
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
