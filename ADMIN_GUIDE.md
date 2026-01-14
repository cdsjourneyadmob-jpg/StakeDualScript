# 🔐 Admin License Management Guide

## Quick Start

### Your Admin License
- **License Key**: `123456789`
- **Type**: Admin (permanent access)
- **Status**: Active

### Managing Customer Licenses

#### 1. Run Admin Tool
```bash
npm run admin
```

#### 2. Add New License for Customer
1. Choose option `1` (Add new license)
2. Enter license key (or press Enter for random 9-digit key)
3. Choose license type:
   - `1` = trial (7 days) - Free trial
   - `2` = weekly (7 days) - $150 payment
   - `3` = monthly (30 days) - $499 payment
   - `4` = admin (permanent) - For you only
4. Enter customer email
5. License is automatically created with start/end dates

#### 3. View All Licenses
- Choose option `2` to see all active licenses
- Shows license key, type, email, dates, and status

#### 4. Extend License (Renewals)
- Choose option `3`
- Enter license key to extend
- Enter additional days (7 for weekly, 30 for monthly)

#### 5. Deactivate License
- Choose option `4` for refunds/cancellations
- Enter license key to deactivate

## License Types & Pricing

| Type | Duration | Price | Use Case |
|------|----------|-------|----------|
| trial | 7 days | Free | New customer trial |
| weekly | 7 days | $150 | Short-term users |
| monthly | 30 days | $499 | Main revenue stream |
| admin | Permanent | N/A | Your access only |

## Customer Workflow

### When Customer Buys License:

1. **Customer pays you** (PayPal, crypto, bank transfer, etc.)
2. **You generate license** using admin tool
3. **Send license key** to customer
4. **Customer runs**: `node dualbet.js`
5. **Customer enters license key** when prompted
6. **Bot validates and runs**

### Example Customer Instructions:
```
Thank you for your purchase! 

Your license key: 847392615
Type: monthly (30 days)

To use:
1. Download the bot files
2. Run: node dualbet.js  
3. Enter your license key when prompted
4. Update your Stake.com cookies in the code
5. Start earning!

Support: [Your contact info]
```

## License File Structure

The `licenses.json` file stores all licenses:

```json
{
  "123456789": {
    "type": "admin",
    "email": "admin@stakedualscript.com", 
    "startDate": "2024-01-01",
    "endDate": "2030-12-31",
    "status": "active"
  },
  "847392615": {
    "type": "monthly",
    "email": "customer@example.com",
    "startDate": "2024-01-14", 
    "endDate": "2024-02-13",
    "status": "active"
  }
}
```

## Payment Processing

### Manual Process (Recommended for Start):
1. Customer contacts you (Telegram, email, etc.)
2. You send payment details (PayPal, crypto wallet, etc.)
3. Customer sends payment
4. You verify payment received
5. Generate license using admin tool
6. Send license key to customer

### Payment Methods to Accept:
- **PayPal** (easiest for customers)
- **Cryptocurrency** (Bitcoin, USDT, etc.)
- **Bank transfer** (for larger amounts)
- **Cash App, Venmo** (US customers)

## Customer Support

### Common Issues:
1. **"Invalid license key"** - Check spelling, regenerate if needed
2. **"License expired"** - Extend license or customer needs to renew
3. **"Bot not working"** - Help with cookies/tokens setup
4. **"Connection failed"** - Network/VPN issues

### Support Channels:
- **Telegram**: Create @YourBotSupport channel
- **Discord**: Create support server
- **Email**: Set up support email
- **WhatsApp**: For premium customers

## Revenue Tracking

### Monthly Revenue Example:
- 10 weekly licenses × $150 = $1,500
- 20 monthly licenses × $499 = $9,980
- **Total**: $11,480/month

### Growth Strategy:
1. **Start with trials** - Build trust
2. **Focus on monthly** - Recurring revenue
3. **Excellent support** - Happy customers refer others
4. **Regular updates** - Keep customers subscribed

## Security Tips

1. **Keep licenses.json secure** - This is your revenue database
2. **Backup regularly** - Don't lose customer data
3. **Use strong admin license** - Keep 123456789 secret
4. **Monitor usage** - Watch for license sharing
5. **Update bot regularly** - Stay ahead of Stake.com changes

## Scaling Up

### When you have 50+ customers:
- Consider automated payment processing (Stripe)
- Build customer dashboard
- Hire support staff
- Create affiliate program

### When you have 200+ customers:
- Dedicated license server
- Advanced analytics
- Multiple bot versions
- Team expansion

---

**Ready to start earning? Your admin license (123456789) is active and ready to go!**

Run `npm run admin` to start managing customer licenses.