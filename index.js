const AWS = require("aws-sdk");
const db = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = process.env.TABLE_NAME;

exports.handler = async () => {
  try {
    const data = await db.scan({ TableName: TABLE_NAME }).promise();
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data.Items),
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Something went wrong" }),
    };
  }
};

