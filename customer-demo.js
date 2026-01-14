#!/usr/bin/env node

console.log('🚀 StakeDualScript - Professional Gambling Bot');
console.log('===============================================\n');

// Simulate customer entering license key
const customerLicenseKey = process.argv[2] || 'DEMO-WEEKLY-2024';

console.log(`🔑 License Key Entered: ${customerLicenseKey}`);
console.log('🔍 Validating license...\n');

// License validation
function validateLicense(key) {
    const validKeys = [
        'DEMO-WEEKLY-2024',
        'DEMO-MONTHLY-2024', 
        'TEST-LICENSE-KEY',
        'CUSTOMER-WEEKLY-001',
        'CUSTOMER-MONTHLY-001'
    ];
    return validKeys.includes(key);
}

if (validateLicense(customerLicenseKey)) {
    console.log('✅ License Valid! Starting StakeDualScript Bot...\n');
    
    console.log('🎯 Bot Configuration:');
    console.log('   Strategy: Dual-Game Automation (Crash + Slide)');
    console.log('   Base Bet: 0.02 INR');
    console.log('   Normal Cashout: 1.25x (80% win rate)');
    console.log('   Gamble Cashout: 1.10x (90% win rate)');
    console.log('   Max Session Loss: 100 INR');
    console.log('   Cooldown: 20 seconds between bets\n');
    
    console.log('🔧 Setup Required:');
    console.log('   1. Login to Stake.com in your browser');
    console.log('   2. Open Developer Tools (F12)');
    console.log('   3. Go to Network tab and make a bet');
    console.log('   4. Copy cookies and tokens from request headers');
    console.log('   5. Update configuration when prompted\n');
    
    console.log('⚠️  Configuration Status: COOKIES NEEDED');
    console.log('📋 Follow INSTALLATION.md for detailed setup steps');
    console.log('💰 Bot will start earning automatically after configuration!');
    
} else {
    console.log('❌ Invalid License Key!');
    console.log('\n💡 Get Your License:');
    console.log('   📧 Email: harryverma0002@example.com');
    console.log('   📱 Telegram: @YourTelegramHandle');
    console.log('\n💰 Pricing:');
    console.log('   Weekly License: $150 (7 days)');
    console.log('   Monthly License: $499 (30 days)');
}

console.log('\n🛡️  StakeDualScript - Your Path to Automated Profits!');