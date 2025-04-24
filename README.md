# 📣 YouTube Member Notifier (Netlify + Pushover)

This project checks for new YouTube channel members and sends a push notification to your phone using **Netlify Functions** and **Pushover**.

## 🔧 Requirements

- A YouTube channel with memberships enabled (and API access)
- A [Pushover](https://pushover.net) account (free for testing)
- A [GitHub](https://github.com) account
- A [Netlify](https://netlify.com) account

## 🛠️ Setup Steps

### 1. Clone This Repository

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
cd YOUR_REPO
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Deploy to Netlify

1. Go to Netlify → "Add New Site" → "Import from GitHub"
2. Select your repository
3. Configure:
   - Build command: leave blank
   - Publish directory: leave blank
   - Functions directory: netlify/functions

### 4. Set Environment Variables

In Netlify Site Settings → Environment Variables, add:

| Key | Value |
|-----|-------|
| PUSHOVER_TOKEN | Your Pushover App Token |
| PUSHOVER_USER | Your Pushover User Key |

You can get these from your Pushover dashboard.

### 5. Customize

- Replace the dummy `getYouTubeMembers()` function with a real YouTube Data API call
- Use Netlify's KV storage or another service to store member data between runs
- Customize the message content

## 📝 Notes

- The function runs hourly by default
- You can modify the schedule in `netlify/functions/check-members.scheduled.js`
- Make sure to replace the dummy member data with real YouTube API integration 