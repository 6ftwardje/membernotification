const { google } = require('googleapis');
const sendNotification = require('../../pushover');

// Initialize YouTube API client
const youtube = google.youtube('v3');

// Store the last check time and members
let lastCheckTime = null;
let lastMembers = new Set();

async function getYouTubeMembers() {
  try {
    const response = await youtube.members.list({
      part: 'snippet',
      maxResults: 50,
      key: process.env.YOUTUBE_API_KEY
    });

    return response.data.items.map(item => ({
      id: item.id,
      name: item.snippet.memberDetails.displayName,
      joinDate: new Date(item.snippet.publishedAt)
    }));
  } catch (error) {
    console.error('Error fetching YouTube members:', error);
    return [];
  }
}

exports.handler = async function checkmembersscheduled() {
  try {
    const currentMembers = await getYouTubeMembers();
    const currentMembersSet = new Set(currentMembers.map(m => m.id));
    
    // Find new members
    const newMembers = currentMembers.filter(member => !lastMembers.has(member.id));
    
    if (newMembers.length > 0) {
      const message = newMembers.map(member => 
        `🎉 ${member.name} joined at ${member.joinDate.toLocaleString()}`
      ).join('\n');
      
      await sendNotification(message);
    }
    
    // Update last check time and members
    lastCheckTime = new Date();
    lastMembers = currentMembersSet;
    
    return {
      statusCode: 200,
      body: JSON.stringify({ 
        message: 'Check complete',
        newMembers: newMembers.length
      })
    };
  } catch (error) {
    console.error('Error in handler:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        message: 'Error checking members',
        error: error.message 
      })
    };
  }
};

// Set to run every minute
exports.schedule = "@every 1m"; 