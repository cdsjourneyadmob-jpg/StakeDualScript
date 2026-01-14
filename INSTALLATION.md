# 🚀 StakeDualScript Installation Guide

## Prerequisites

- **Node.js 16+** - [Download here](https://nodejs.org/)
- **Active Stake.com account** with funds
- **Valid license key** - [Purchase here](https://t.me/your_telegram_handle)

## Step 1: Download & Setup

```bash
# Clone the repository
git clone https://github.com/cdsjourneyadmob-jpg/StakeDualScript.git
cd StakeDualScript

# Install dependencies
npm install
```

## Step 2: Run the Bot

```bash
# Start the bot
npm start
```

The bot will ask for your license key. Enter the key you received after purchase.

## Step 3: Update Your Cookies & Tokens

1. **Login to Stake.com** in your browser
2. **Open Developer Tools** (F12)
3. **Go to Network tab**
4. **Make any bet** to capture requests
5. **Copy the cookies and tokens** from the request headers

### Edit Configuration

Open `dualbet.js` and update:

```javascript
// Update these with your actual values
const FRESH_COOKIES = `your_cookies_here`;

// In the headers section, update:
'x-access-token': 'your_access_token_here',
'x-lockdown-token': 'your_lockdown_token_here'
```

## Step 4: Configure Risk Settings (Optional)

```javascript
const CONFIG = {
    BASE_BET: 0.02,           // Starting bet amount (INR)
    MAX_BET: 100,             // Maximum bet limit
    MAX_SESSION_LOSS: 100,    // Stop loss limit
    NORMAL_CASHOUT: 1.25,     // Conservative cashout (80% win)
    GAMBLE_CASHOUT: 1.10,     // Aggressive cashout (50% win)
    CURRENCY: "inr",          // Your currency
    WAIT_BETWEEN_BETS: 20000, // 20 seconds between bets
};
```

## Step 5: Start Earning!

```bash
npm start
```

The bot will display:
- ✅ Real-time balance updates
- 📊 Win/loss statistics  
- 💰 Profit tracking
- 🎯 Current strategy status

## 🛠️ Troubleshooting

### License Issues
- Make sure you entered the correct license key
- Check if your license has expired
- Contact support for license problems

### Connection Issues
```bash
# Test connection
npm test
```

### Common Problems

**"Invalid license key"**
- Double-check the license key spelling
- Contact support if the key is correct

**"License expired"**
- Renew your subscription
- Contact support for renewal

**"Invalid cookies"**
- Update cookies from fresh browser session
- Ensure you're logged into Stake.com

**"Insufficient balance"**
- Add funds to your Stake account
- Lower BASE_BET amount in config

**"Network timeout"**
- Check internet connection
- Try different VPN location if using one

## 📞 Support

- **Email**: harryverma0002@example.com

## ⚠️ Important Notes

1. **Keep your license key private**
2. **Keep cookies/tokens private**
3. **Start with small bets**
4. **Monitor performance regularly**
5. **Respect gambling laws in your jurisdiction**

## 💰 Pricing

- **Weekly**: $150 (7 days)
- **Monthly**: $499 (30 days)
- **Contact**: [Telegram](https://t.me/your_telegram_handle)

---

**Ready to earn? Your bot is now configured and ready to run!**

```bash
npm start
```