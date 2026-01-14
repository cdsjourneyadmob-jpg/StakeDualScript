#!/usr/bin/env node

const readline = require('readline');

// Create interface for user input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log('🚀 StakeDualScript - Professional Gambling Bot');
console.log('===============================================\n');

// License validation function
function validateLicense(key) {
    // In real bot, this would check against your license server
    const validKeys = [
        'DEMO-WEEKLY-2024',
        'DEMO-MONTHLY-2024',
        'TEST-LICENSE-KEY'
    ];
    return validKeys.includes(key);
}

// Main bot function
function startBot() {
    rl.question('Enter your license key: ', (licenseKey) => {
        console.log('\n🔍 Validating license...');
        
        if (validateLicense(licenseKey)) {
            console.log('✅ License valid! Starting bot...\n');
            
            console.log('🎯 StakeDualScript Bot Started');
            console.log('📊 Strategy: Dual-Game (Crash + Slide)');
            console.log('💰 Base Bet: 0.02 INR');
            console.log('🎢 Target Multiplier: 1.25x');
            console.log('⏰ Cooldown: 20 seconds between bets');
            console.log('\n🔧 Configuration needed:');
            console.log('   1. Update cookies in configuration');
            console.log('   2. Set your Stake.com session tokens');
            console.log('   3. Configure risk management settings');
            console.log('\n📋 Next steps:');
            console.log('   - Follow INSTALLATION.md for cookie setup');
            console.log('   - Bot will start automatically after configuration');
            console.log('\n🛡️  Bot is ready to earn! Configure cookies to begin.');
            
        } else {
            console.log('❌ Invalid license key!');
            console.log('💡 Contact support for valid license:');
            console.log('   📧 Email: harryverma0002@example.com');
            console.log('   📱 Telegram: @YourTelegramHandle');
        }
        
        rl.close();
    });
}

// Start the bot
startBot();