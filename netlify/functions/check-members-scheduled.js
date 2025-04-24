const sendNotification = require('../../pushover');

exports.handler = async function checkMembersScheduled() {
  try {
    const success = await sendNotification('🔔 Test notification from YouTube Member Notifier!');
    
    if (success) {
      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Test notification sent successfully!' })
      };
    } else {
      return {
        statusCode: 500,
        body: JSON.stringify({ message: 'Failed to send test notification' })
      };
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error sending notification', error: error.message })
    };
  }
};

// Temporarily disable the schedule for testing
// exports.schedule = "@hourly"; 