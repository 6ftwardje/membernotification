const fetch = require('node-fetch');

module.exports = async function sendNotification(message) {
  const response = await fetch('https://api.pushover.net/1/messages.json', {
    method: 'POST',
    body: new URLSearchParams({
      token: process.env.PUSHOVER_TOKEN,
      user: process.env.PUSHOVER_USER,
      message
    })
  });
  return response.ok;
}; 