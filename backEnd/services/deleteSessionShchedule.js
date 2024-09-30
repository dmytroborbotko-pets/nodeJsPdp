const Session = require("../models/Session");
const jwt = require("jsonwebtoken");

const deleteSessionSchedule = async () => {
  try {
    const sessions = await Session.find({});
    if (!sessions || sessions.length === 0) {
      return false;
    }
    console.log(`sessions: ${JSON.stringify(sessions)}`);
    const currentTimestamp = Math.floor(Date.now() / 1000);

    for (const session of sessions) {
      const token = session.token;
      try {
        const decodedToken = jwt.decode(token);
        if (
          decodedToken &&
          decodedToken.exp &&
          decodedToken.exp < currentTimestamp
        ) {
          await Session.deleteOne({ _id: session._id });
        }
      } catch (tokenError) {
        console.error("Error decoding token:", tokenError);
      }
    }
    return true;
  } catch (error) {
    console.error("Error in deleteSessionSchedule:", error);
    return false;
  }
};

module.exports = { deleteSessionSchedule };
