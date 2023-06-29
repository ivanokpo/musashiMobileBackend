import AWS from "aws-sdk";

AWS.config.update({
  region: "eu-west-2",
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  maxRetries: 15,
  retryDelayOptions: { base: 500 },
});

const db = new AWS.DynamoDB.DocumentClient();

const Table = "musashiQuotes";

export { db, Table };
