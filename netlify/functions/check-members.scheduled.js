const sendNotification = require('../../pushover');

let lastMembers = ['Alice', 'Bob']; // Replace this with real stored state

async function getYouTubeMembers() {
  // TODO: Replace with actual YouTube Data API call
  return ['Alice', 'Bob', 'Charlie']; // Simulated new member: Charlie
}

exports.handler = async function () {
  const currentMembers = await getYouTubeMembers();

  const newMembers = currentMembers.filter(m => !lastMembers.includes(m));

  if (newMembers.length > 0) {
    await sendNotification(`🎉 New member(s): ${newMembers.join(', ')}`);
    lastMembers = currentMembers;
  }

  return {
    statusCode: 200,
    body: 'Check complete',
  };
};

exports.schedule = "@hourly"; // Run every hour (change if needed) 