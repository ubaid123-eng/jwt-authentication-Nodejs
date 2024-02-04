const mongoodb = require("mongoose");

const connectdb = async () => {
  try {
    const conn = await mongoodb.connect(process.env.MONGOO_URL);
    console.log(`mongoo db connected !!!! at  ${conn.connection.host}`);
  } catch (err) {
    console.error(`ERROR: ${err.message}`);
    process.exit(1);
  }
};

module.exports = { connectdb };
