const axios = require("axios");
const fs = require("fs");
const path = require("path");
const readline = require("readline");

// ========== LICENSE SYSTEM ==========
class SimpleLicenseManager {
    constructor() {
        this.licenseFile = path.join(__dirname, 'licenses.json');
    }

    loadLicenses() {
        try {
            if (!fs.existsSync(this.licenseFile)) {
                console.log("❌ License file not found!");
                return {};
            }
            const data = fs.readFileSync(this.licenseFile, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            console.log("❌ Error reading license file:", error.message);
            return {};
        }
    }

    validateLicense(licenseKey) {
        const licenses = this.loadLicenses();
        const license = licenses[licenseKey];

        if (!license) {
            return { valid: false, error: "Invalid license key" };
        }

        if (license.status !== "active") {
            return { valid: false, error: "License is not active" };
        }

        const now = new Date();
        const endDate = new Date(license.endDate);

        if (now > endDate) {
            return { valid: false, error: "License has expired. Please renew your subscription." };
        }

        // Calculate days remaining
        const daysRemaining = Math.ceil((endDate - now) / (1000 * 60 * 60 * 24));

        return {
            valid: true,
            license: license,
            daysRemaining: daysRemaining
        };
    }

    async promptForLicense() {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        return new Promise((resolve) => {
            rl.question('🔐 Enter your license key: ', (licenseKey) => {
                rl.close();
                resolve(licenseKey.trim());
            });
        });
    }
}

// ========== ORIGINAL BOT CODE ==========
const FRESH_COOKIES = `currency_hideZeroBalances=false; locale=en; fiat_number_format=en; sidebarView=hidden; quick_bet_popup=false; oddsFormat=decimal; sportMarketGroupMap={}; level_up_vip_flag=; cookie_last_vip_tab=progress; _ga=GA1.1.699017466.1767416209; intercom-id-cx1ywgf2=7c871e03-958e-4c10-9eb2-32d61fc8662e; intercom-device-id-cx1ywgf2=ac2c195a-17b5-4b5a-ba9b-ecb67d13f778; g_state={"i_l":0,"i_ll":1767416784539,"i_b":"BiKIyr9NixIp4ZkHCnXi+lXCcS8XsBhVigQYeVNzA5c","i_e":{"enable_itp_optimization":0}}; session_info={"id":"852c10b5-6b61-4e75-8980-c05a057e8e3b","sessionName":"Chrome (Mac)","ip":"152.56.67.182","country":"IN","city":"Navi Mumbai (Ghansoli)","active":true,"updatedAt":"Sat, 03 Jan 2026 05:07:20 GMT","__typename":"UserSession"}; cookie_consent=true; fullscreen_preference=false; currency_currency=inr; currency_currencyView=inr; leftSidebarView_v2=minimized; __cf_bm=7sqDZ9XA6oKipN_7tHEe_zM.caueROSChxF6Io7Iefg-1768373471-1.0.1.1-zKGxPTP0YIhq6F2Tcy4Sj.wVKfKtlpnL7lJFOYCOqT7nw6EJkE0n6ASl_nyl4M85wiV7wn7aqVgRWhhgrSrwqjTyOjKOOzybd9UTLDAMgwY; _cfuvid=Ik3wvdjINI0MgvH05r22KyLYnnwvWjgRAEXhZhEKdFs-1768373497217-0.0.1.1-604800000; cf_clearance=edOrswihN8FfJ60kfKI.eIzF.bnTrZqbc5DwDnsMutA-1768373502-1.2.1.1-RGyTHhf.nPwjUZx0EbeRjMQbBAEOGxbDgISuMH9OdN6lR9i.5y04FwaUBNAMCih6Fxb9VVWU8d.AqDQ8nujt3ib6GPcLtsvhGPyWUOI_xadQKGH.DlwyP4H70Pb1hCTs8fyfizgejlex8hqfFpXD5q_qnGSnnOnfeBuw2sCzoIeVaNnWvAPKMn76zIavEbCZeSrSCkxoVpsIhUxRzflhFo0hIgMT_hxAwa2qV9VNZzQa4MMkgwkYlbrCR9Bo46Dp; session=066db8b4b7dd8207f1baf69a46a8cb2476a734a6059d261518dc2912d37af0e5e7641e0f3764c4992e538186e08a105c; mp_e29e8d653fb046aa5a7d7b151ecf6f99_mixpanel=%7B%22distinct_id%22%3A%221a1030aa-bbed-496a-9f19-45c4e4b33526%22%2C%22%24device_id%22%3A%22042085a2-f6b6-45d5-a14c-fafb4938b6c7%22%2C%22%24initial_referrer%22%3A%22https%3A%2F%2Fstake.com%2F%3F__cf_chl_tk%3DvzgtP75bsWuekEgadxLp4Ns81.wOim.oCY37V8RlYdY-1767416194-1.0.1.1-d2JJsaMlofHcE2smsLRr3bYBt1UwtwYaq41RWYNehrk%22%2C%22%24initial_referring_domain%22%3A%22stake.com%22%2C%22__mps%22%3A%7B%7D%2C%22__mpso%22%3A%7B%7D%2C%22__mpus%22%3A%7B%7D%2C%22__mpa%22%3A%7B%7D%2C%22__mpu%22%3A%7B%7D%2C%22__mpr%22%3A%5B%5D%2C%22__mpap%22%3A%5B%5D%2C%22%24search_engine%22%3A%22google%22%2C%22%24user_id%22%3A%221a1030aa-bbed-496a-9f19-45c4e4b33526%22%7D; intercom-session-cx1ywgf2=ZnY0V3JOWmRreFFFaTJwSFVsMkZrNTFxYjlOVk8wNEtyNU9pY2lJbFZPRzVLMTNkOFhKMm50NXozejVkTmFIQWsyWWluWXFWT1I0WW52VEpUWXVqOGl2angvTWJjM1NjVnNDWGZQbnNJTE09LS0vTEp0UjAvZU1XbWlFdTl3MW9JclRRPT0=--4b287e705325d1557bd4652b1f4722fc2a3c78d3; _ga_TWGX3QNXGG=GS2.1.s1768373482$o40$g1$t1768374093$j24$l0$h1897268833; _dd_s=rum=0&expire=1768374993951&logs=1&id=2038525b-cabb-4774-b3b9-36aac7994ce4&created=1768368267842`;

// ========== CONFIGURATION ==========
const CONFIG = {
    BASE_BET: 0.02,           // 0.05 INR base bet
    MAX_BET: 100,              // 100 INR max
    MAX_SESSION_LOSS: 100,     // Stop at 100 INR loss
    NORMAL_CASHOUT: 1.25,     // 80% win chance
    GAMBLE_CASHOUT: 1.10,      // 50% win chance
    CURRENCY: "inr",
    WAIT_BETWEEN_BETS: 20000, // 20 seconds between bets
    RESULT_CHECK_INTERVAL: 15000, // 15 seconds between result checks
    MAX_RESULT_CHECKS: 8      // Max 8 checks (2 minutes)
};

// Game types
const GAMES = {
    CRASH: 'crash',
    SLIDE: 'slide'
};

// Generate random profit target (1-10 INR)
function getRandomProfitTarget() {
    return 1 + Math.random() * 9; // 1 to 10 INR
}

// Generate random identifier for slide bet
function generateSlideIdentifier() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-';
    let result = 'w_';
    for (let i = 0; i < 20; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

// ========== GET CURRENT BALANCE ==========
async function getCurrentBalance() {
    try {
        const balanceQuery = `
            query { 
                user { 
                    balances { 
                        available { 
                            amount 
                            currency 
                        } 
                    } 
                } 
            }
        `;
        
        const response = await axios({
            method: 'post',
            url: 'https://stake.com/_api/graphql',
            headers: {
                'accept': '*/*',
                'content-type': 'application/json',
                'cookie': FRESH_COOKIES,
                'origin': 'https://stake.com',
                'referer': 'https://stake.com/casino/games/crash',
                'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36',
                'x-access-token': '066db8b4b7dd8207f1baf69a46a8cb2476a734a6059d261518dc2912d37af0e5e7641e0f3764c4992e538186e08a105c',
                'x-lockdown-token': 's5MNWtjTM5TvCMkAzxov'
            },
            data: { query: balanceQuery },
            timeout: 15000
        });
        
        const balances = response.data?.data?.user?.balances;
        const inrBalance = balances?.find(b => b.available.currency === 'inr');
        
        if (inrBalance) {
            return inrBalance.available.amount;
        }
        
        return null;
    } catch (error) {
        console.log(`⚠️ Balance check failed: ${error.message}`);
        return null;
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// ========== PLACE CRASH BET FUNCTION ==========
async function placeCrashBet(amount, cashoutAt, betNumber, isGamble = false) {
    const betType = isGamble ? "GAMBLE" : "NORMAL";
    const winChance = isGamble ? "50%" : "80%";
    
    console.log(`🚀 CRASH ${betType} Bet #${betNumber}: ${amount.toFixed(2)} INR @ ${cashoutAt}x (${winChance} chance)`);
    
    // Step 1: Get balance BEFORE placing bet
    console.log(`💰 Checking balance before bet...`);
    const balanceBeforeBet = await getCurrentBalance();
    
    if (balanceBeforeBet === null) {
        console.log(`❌ Could not get balance before bet`);
        return { success: false, error: "Could not get balance" };
    }
    
    console.log(`💰 Balance before bet: ${balanceBeforeBet.toFixed(2)} INR`);
    
    const betQuery = `
        mutation MultiplayerCrashBet($amount: Float!, $currency: CurrencyEnum!, $cashoutAt: Float!) {
            multiplayerCrashBet(amount: $amount, currency: $currency, cashoutAt: $cashoutAt) {
                id
                user {
                    id
                    name
                    preferenceHideBets
                }
                payoutMultiplier
                gameId
                amount
                payout
                currency
                result
                updatedAt
                cashoutAt
                btcAmount: amount(currency: btc)
            }
        }
    `;
    
    try {
        // Step 2: Place the bet
        const betResponse = await axios({
            method: 'post',
            url: 'https://stake.com/_api/graphql',
            headers: {
                'accept': '*/*',
                'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
                'content-type': 'application/json',
                'cookie': FRESH_COOKIES,
                'origin': 'https://stake.com',
                'referer': 'https://stake.com/casino/games/crash',
                'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36',
                'x-access-token': '066db8b4b7dd8207f1baf69a46a8cb2476a734a6059d261518dc2912d37af0e5e7641e0f3764c4992e538186e08a105c',
                'x-lockdown-token': 's5MNWtjTM5TvCMkAzxov'
            },
            data: {
                query: betQuery,
                variables: {
                    amount: amount,
                    currency: CONFIG.CURRENCY,
                    cashoutAt: cashoutAt
                }
            },
            timeout: 15000
        });
        
        const betData = betResponse.data?.data?.multiplayerCrashBet;
        if (!betData) {
            console.log("❌ No bet data received");
            return { success: false, error: "No bet data" };
        }
        
        console.log(`📋 Crash bet placed: ID ${betData.id.substring(0, 8)}...`);
        console.log(`💰 Bet amount: ${betData.amount} ${betData.currency.toUpperCase()}`);
        console.log(`⏳ Waiting for game result...`);
        
        // Step 3: Wait for result using balance tracking
        const result = await waitForResult(betData.id, amount, balanceBeforeBet, GAMES.CRASH);
        
        return {
            success: true,
            betId: betData.id,
            gameId: betData.gameId,
            result: result,
            gameType: GAMES.CRASH
        };
        
    } catch (error) {
        console.log(`❌ Crash bet failed: ${error.message}`);
        return { success: false, error: error.message };
    }
}

// ========== PLACE SLIDE BET FUNCTION ==========
async function placeSlideBet(amount, cashoutAt, betNumber, isGamble = false) {
    const betType = isGamble ? "GAMBLE" : "NORMAL";
    const winChance = isGamble ? "50%" : "80%";
    
    console.log(`🎢 SLIDE ${betType} Bet #${betNumber}: ${amount.toFixed(2)} INR @ ${cashoutAt}x (${winChance} chance)`);
    
    // Step 1: Get balance BEFORE placing bet
    console.log(`💰 Checking balance before bet...`);
    const balanceBeforeBet = await getCurrentBalance();
    
    if (balanceBeforeBet === null) {
        console.log(`❌ Could not get balance before bet`);
        return { success: false, error: "Could not get balance" };
    }
    
    console.log(`💰 Balance before bet: ${balanceBeforeBet.toFixed(2)} INR`);
    
    const slideQuery = `
        mutation MultiplayerSlideBet($amount: Float!, $currency: CurrencyEnum!, $cashoutAt: Float!, $identifier: String!) {
            multiplayerSlideBet(
                amount: $amount
                currency: $currency
                cashoutAt: $cashoutAt
                identifier: $identifier
            ) {
                __typename
                ...MultiplayerSlideBet
                user {
                    id
                    activeSlideBet {
                        ...MultiplayerSlideBet
                    }
                }
            }
        }

        fragment MultiplayerSlideBet on MultiplayerSlideBet {
            id
            user {
                id
                name
                preferenceHideBets
            }
            payoutMultiplier
            gameId
            amount
            payout
            currency
            slideResult: result
            updatedAt
            cashoutAt
            btcAmount: amount(currency: btc)
            active
            createdAt
        }
    `;
    
    try {
        const identifier = generateSlideIdentifier();
        
        // Step 2: Place the bet
        const betResponse = await axios({
            method: 'post',
            url: 'https://stake.com/_api/graphql',
            headers: {
                'accept': '*/*',
                'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
                'content-type': 'application/json',
                'cookie': FRESH_COOKIES,
                'origin': 'https://stake.com',
                'referer': 'https://stake.com/casino/games/slide',
                'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36',
                'x-access-token': '066db8b4b7dd8207f1baf69a46a8cb2476a734a6059d261518dc2912d37af0e5e7641e0f3764c4992e538186e08a105c',
                'x-lockdown-token': 's5MNWtjTM5TvCMkAzxov'
            },
            data: {
                query: slideQuery,
                variables: {
                    amount: amount,
                    currency: CONFIG.CURRENCY,
                    cashoutAt: cashoutAt,
                    identifier: identifier
                }
            },
            timeout: 15000
        });
        
        const betData = betResponse.data?.data?.multiplayerSlideBet;
        if (!betData) {
            console.log("❌ No bet data received");
            return { success: false, error: "No bet data" };
        }
        
        console.log(`📋 Slide bet placed: ID ${betData.id.substring(0, 8)}...`);
        console.log(`💰 Bet amount: ${betData.amount} ${betData.currency.toUpperCase()}`);
        console.log(`🎲 Identifier: ${identifier}`);
        console.log(`⏳ Waiting for game result...`);
        
        // Step 3: Wait for result using balance tracking
        const result = await waitForResult(betData.id, amount, balanceBeforeBet, GAMES.SLIDE);
        
        return {
            success: true,
            betId: betData.id,
            gameId: betData.gameId,
            result: result,
            gameType: GAMES.SLIDE
        };
        
    } catch (error) {
        console.log(`❌ Slide bet failed: ${error.message}`);
        return { success: false, error: error.message };
    }
}

// ========== WAIT FOR RESULT ==========
async function waitForResult(betId, betAmount, balanceBeforeBet, gameType) {
    console.log(`🔍 Monitoring balance changes for ${gameType.toUpperCase()}...`);
    console.log(`📊 Expected: Win = +${(betAmount * 0.25).toFixed(2)} INR | Loss = -${betAmount.toFixed(2)} INR`);
    
    const maxWaitTime = 120000; // 120 seconds (2 minutes) - increased for slide
    const checkInterval = 10000; // Check every 10 seconds - more frequent
    const startTime = Date.now();
    
    // Different initial wait times for different games
    const initialWait = gameType === GAMES.SLIDE ? 20000 : 15000; // 20s for slide, 15s for crash
    console.log(`⏳ Waiting ${initialWait/1000} seconds for ${gameType} game to complete...`);
    await sleep(initialWait);
    
    let balanceHistory = []; // Track balance changes over time
    let stableCount = 0; // Count how many times balance stayed the same
    
    while (Date.now() - startTime < maxWaitTime) {
        const elapsed = Math.round((Date.now() - startTime) / 1000);
        console.log(`⏳ Check at ${elapsed}s (max 120s)...`);
        
        const currentBalance = await getCurrentBalance();
        
        if (currentBalance !== null) {
            const balanceChange = currentBalance - balanceBeforeBet;
            console.log(`💰 Balance: ${currentBalance.toFixed(2)} INR (change: ${balanceChange >= 0 ? '+' : ''}${balanceChange.toFixed(2)})`);
            
            // Add to balance history
            balanceHistory.push({
                balance: currentBalance,
                change: balanceChange,
                timestamp: Date.now()
            });
            
            // Keep only last 5 readings
            if (balanceHistory.length > 5) {
                balanceHistory.shift();
            }
            
            // Check for clear WIN (balance increased significantly)
            if (balanceChange > 0.001) { // More than 0.001 INR increase
                const profit = balanceChange;
                const payout = betAmount + profit;
                console.log(`✅ ${gameType.toUpperCase()} WIN DETECTED - Balance increased by ${profit.toFixed(4)} INR`);
                return {
                    win: true,
                    profit: profit,
                    payout: payout,
                    balance: currentBalance
                };
            }
            
            // For losses, wait for more confirmations
            if (balanceChange <= -betAmount * 0.95) { // Balance decreased by almost full bet amount
                stableCount++;
                console.log(`📉 Potential loss detected (${stableCount}/3 confirmations)`);
                
                // Need 3 consecutive confirmations of loss OR if we're past 60 seconds
                if (stableCount >= 3 || elapsed > 60) {
                    console.log(`❌ ${gameType.toUpperCase()} LOSS CONFIRMED - Balance decreased by bet amount`);
                    return {
                        win: false,
                        profit: -betAmount,
                        payout: 0,
                        balance: currentBalance
                    };
                }
            } else {
                stableCount = 0; // Reset if balance doesn't show loss
            }
            
            // Special handling for slide - check if balance is exactly bet amount less
            if (gameType === GAMES.SLIDE && Math.abs(balanceChange + betAmount) < 0.001) {
                // Balance is exactly bet amount less, but wait a bit more for slide
                if (elapsed > 45) { // Wait at least 45 seconds for slide
                    console.log(`⏰ ${gameType.toUpperCase()} - Extended wait complete, confirming result...`);
                    
                    // Do one final check after a short wait
                    await sleep(5000);
                    const finalCheck = await getCurrentBalance();
                    if (finalCheck !== null) {
                        const finalChange = finalCheck - balanceBeforeBet;
                        if (finalChange > 0.001) {
                            console.log(`✅ ${gameType.toUpperCase()} LATE WIN - Balance increased by ${finalChange.toFixed(4)} INR`);
                            return {
                                win: true,
                                profit: finalChange,
                                payout: betAmount + finalChange,
                                balance: finalCheck
                            };
                        }
                    }
                }
            }
        } else {
            console.log(`⚠️ Could not get current balance`);
        }
        
        // Wait before next check
        if (Date.now() - startTime < maxWaitTime - checkInterval) {
            await sleep(checkInterval);
        }
    }
    
    // Final timeout handling
    const finalBalance = await getCurrentBalance();
    if (finalBalance !== null) {
        const finalChange = finalBalance - balanceBeforeBet;
        console.log(`⏰ 120 seconds elapsed - Final balance change: ${finalChange >= 0 ? '+' : ''}${finalChange.toFixed(4)} INR`);
        
        if (finalChange > 0.001) {
            console.log(`✅ TIMEOUT WIN - Balance increased`);
            return {
                win: true,
                profit: finalChange,
                payout: betAmount + finalChange,
                balance: finalBalance
            };
        } else {
            console.log(`❌ TIMEOUT LOSS - Balance did not increase`);
            return {
                win: false,
                profit: -betAmount,
                payout: 0,
                balance: finalBalance
            };
        }
    }
    
    // Fallback - assume loss
    console.log(`⏰ TIMEOUT - Assuming loss`);
    return {
        win: false,
        profit: -betAmount,
        payout: 0,
        balance: finalBalance || balanceBeforeBet
    };
}

// ========== MAIN BOT FUNCTION ==========
async function runBot() {
    console.log("🚀 Dual Game Bot - Crash & Slide Alternating Strategy");
    console.log("=".repeat(70));
    console.log(`💰 Base bet: ${CONFIG.BASE_BET.toFixed(2)} INR @ ${CONFIG.NORMAL_CASHOUT}x (80% win)`);
    console.log(`🎲 Gamble mode: ${CONFIG.GAMBLE_CASHOUT}x (50% win chance)`);
    console.log(`🎯 Dynamic profit targets: 1-10 INR`);
    console.log(`🚫 Max session loss: ${CONFIG.MAX_SESSION_LOSS.toFixed(2)} INR`);
    console.log(`🎮 Games: CRASH 🚀 ↔️ SLIDE 🎢 (alternating every bet)`);
    console.log("=".repeat(70));
    
    // Bot state
    let stats = {
        totalBets: 0,
        wins: 0,
        losses: 0,
        sessionProfit: 0,
        totalBackup: 0,
        balance: 320, // Starting balance in INR
        crashBets: 0,
        slideBets: 0,
        crashWins: 0,
        slideWins: 0
    };
    
    let currentBet = CONFIG.BASE_BET;
    let currentProfitTarget = getRandomProfitTarget();
    let isInGambleMode = false;
    let multiplier = 1; // For double progression
    let currentGame = GAMES.CRASH; // Start with crash
    
    console.log(`💰 Starting balance: ${stats.balance.toFixed(2)} INR`);
    console.log(`🎯 First profit target: ${currentProfitTarget.toFixed(2)} INR`);
    console.log(`🎮 Starting with: ${currentGame.toUpperCase()}\n`);
    
    while (true) {
        stats.totalBets++;
        
        // Check if we should enter gamble mode
        if (!isInGambleMode && stats.sessionProfit >= currentProfitTarget) {
            console.log(`\n🎯 PROFIT TARGET REACHED!`);
            console.log(`💰 Session profit: ${stats.sessionProfit.toFixed(2)} INR`);
            console.log(`🎲 Entering GAMBLE MODE (50% chance @ ${CONFIG.GAMBLE_CASHOUT}x)`);
            console.log(`🏆 Win: Double profit → Backup | 💸 Loss: Reset to base bet\n`);
            
            isInGambleMode = true;
            currentBet = stats.sessionProfit; // Bet the entire session profit
        }
        
        // Check balance
        if (currentBet > stats.balance) {
            console.log("\n❌ Insufficient balance!");
            break;
        }
        
        // Choose cashout multiplier
        const cashoutAt = isInGambleMode ? CONFIG.GAMBLE_CASHOUT : CONFIG.NORMAL_CASHOUT;
        
        // Place bet based on current game
        let betResult;
        if (currentGame === GAMES.CRASH) {
            stats.crashBets++;
            betResult = await placeCrashBet(currentBet, cashoutAt, stats.totalBets, isInGambleMode);
        } else {
            stats.slideBets++;
            betResult = await placeSlideBet(currentBet, cashoutAt, stats.totalBets, isInGambleMode);
        }
        
        if (!betResult.success) {
            console.log(`⚠️ ${currentGame.toUpperCase()} bet failed: ${betResult.error}, waiting 5 seconds...`);
            await sleep(5000);
            continue;
        }
        
        // Process result
        const result = betResult.result;
        const isWin = result.win;
        const profit = result.profit;
        const actualPayout = result.payout;
        
        // Update balance
        stats.balance = result.balance;
        
        if (isWin) {
            stats.wins++;
            if (currentGame === GAMES.CRASH) {
                stats.crashWins++;
            } else {
                stats.slideWins++;
            }
            
            console.log(`✅ ${currentGame.toUpperCase()} WON - Payout: ${actualPayout.toFixed(2)} INR, Profit: +${profit.toFixed(2)} INR`);
            console.log(`🏦 Balance: ${stats.balance.toFixed(2)} INR`);
            
            if (isInGambleMode) {
                // Successful gamble - add to backup and reset
                stats.totalBackup += actualPayout;
                console.log(`🏆 GAMBLE WON! Added ${actualPayout.toFixed(2)} INR to backup`);
                console.log(`💎 Total backup: ${stats.totalBackup.toFixed(2)} INR`);
                
                // Reset for new session
                stats.sessionProfit = 0;
                currentBet = CONFIG.BASE_BET;
                currentProfitTarget = getRandomProfitTarget();
                isInGambleMode = false;
                multiplier = 1;
                
                console.log(`🔄 Reset to base bet, new target: ${currentProfitTarget.toFixed(2)} INR\n`);
                
            } else {
                // Normal win - add to session profit
                stats.sessionProfit += profit;
                
                // Reset multiplier after win
                multiplier = 1;
                currentBet = CONFIG.BASE_BET;
                
                console.log(`📈 Session profit: ${stats.sessionProfit.toFixed(2)}/${currentProfitTarget.toFixed(2)} INR`);
            }
            
        } else {
            stats.losses++;
            
            console.log(`❌ ${currentGame.toUpperCase()} LOST - Lost: ${currentBet.toFixed(2)} INR`);
            console.log(`📉 Balance: ${stats.balance.toFixed(2)} INR`);
            
            // Generate random cooldown between 2-5 minutes (120000-300000 ms)
            const cooldownMs = 120000 + Math.random() * 180000; // 2-5 minutes
            const cooldownMinutes = (cooldownMs / 60000).toFixed(1);
            
            console.log(`⏸️ LOSS DETECTED - Starting cooldown timer: ${cooldownMinutes} minutes`);
            console.log(`🕐 Cooldown helps handle continuous losses and prevents emotional betting`);
            
            if (isInGambleMode) {
                // Failed gamble - lose session profit and reset
                console.log(`💸 GAMBLE LOST! Lost ${stats.sessionProfit.toFixed(2)} INR session profit`);
                
                // Reset for new session
                stats.sessionProfit = 0;
                currentBet = CONFIG.BASE_BET;
                currentProfitTarget = getRandomProfitTarget();
                isInGambleMode = false;
                multiplier = 1;
                
                console.log(`🔄 Reset to base bet, new target: ${currentProfitTarget.toFixed(2)} INR`);
                
            } else {
                // Normal loss - continue with progression
                stats.sessionProfit += profit; // profit is negative
                
                // 5x the bet (progression)
                multiplier = Math.min(multiplier * 5, CONFIG.MAX_BET / CONFIG.BASE_BET);
                currentBet = CONFIG.BASE_BET * multiplier;
                
                console.log(`📉 Session profit: ${stats.sessionProfit.toFixed(2)}/${currentProfitTarget.toFixed(2)} INR`);
                console.log(`📊 Next bet: ${currentBet.toFixed(2)} INR (x${multiplier})`);
            }
            
            // Apply cooldown timer after loss
            console.log(`⏳ Cooling down for ${cooldownMinutes} minutes...`);
            await sleep(cooldownMs);
            console.log(`✅ Cooldown complete - Ready for next bet`);
        }
        
        // Switch game for next bet (alternating every bet)
        currentGame = currentGame === GAMES.CRASH ? GAMES.SLIDE : GAMES.CRASH;
        console.log(`🔄 Next game: ${currentGame.toUpperCase()}`);
        
        // Show current status
        console.log(`💎 Backup: ${stats.totalBackup.toFixed(2)} INR | 📊 Session: ${stats.sessionProfit.toFixed(2)} INR`);
        
        // Calculate win rates
        const overallWinRate = stats.totalBets > 0 ? (stats.wins / stats.totalBets * 100).toFixed(1) : '0.0';
        const crashWinRate = stats.crashBets > 0 ? (stats.crashWins / stats.crashBets * 100).toFixed(1) : '0.0';
        const slideWinRate = stats.slideBets > 0 ? (stats.slideWins / stats.slideBets * 100).toFixed(1) : '0.0';
        
        console.log(`📊 Overall: ${stats.wins}W/${stats.losses}L (${overallWinRate}%)`);
        console.log(`🚀 Crash: ${stats.crashWins}W/${stats.crashBets - stats.crashWins}L (${crashWinRate}%) | 🎢 Slide: ${stats.slideWins}W/${stats.slideBets - stats.slideWins}L (${slideWinRate}%)\n`);
        
        // Check maximum session loss
        if (stats.sessionProfit <= -CONFIG.MAX_SESSION_LOSS) {
            console.log(`❌ Max session loss reached! Session loss: ${Math.abs(stats.sessionProfit).toFixed(2)} INR`);
            console.log(`💎 Current backup: ${stats.totalBackup.toFixed(2)} INR`);
            
            // Reset session but keep backup
            stats.sessionProfit = 0;
            currentBet = CONFIG.BASE_BET;
            currentProfitTarget = getRandomProfitTarget();
            isInGambleMode = false;
            multiplier = 1;
            
            console.log(`🔄 Starting fresh session, new target: ${currentProfitTarget.toFixed(2)} INR\n`);
        }
        
        // Check if next bet would exceed balance
        if (currentBet > stats.balance) {
            console.log(`⚠️ Next bet (${currentBet.toFixed(2)}) exceeds balance (${stats.balance.toFixed(2)})`);
            console.log(`💎 Final backup: ${stats.totalBackup.toFixed(2)} INR`);
            break;
        }
        
        // Wait between bets
        console.log(`⏳ Waiting ${CONFIG.WAIT_BETWEEN_BETS/1000} seconds before next bet...`);
        await sleep(CONFIG.WAIT_BETWEEN_BETS);
    }
    
    // Final summary
    console.log("\n" + "=".repeat(70));
    console.log("SESSION SUMMARY");
    console.log("=".repeat(70));
    console.log(`Total bets: ${stats.totalBets}`);
    console.log(`Overall wins: ${stats.wins} (${((stats.wins/stats.totalBets)*100).toFixed(1)}%)`);
    console.log(`Overall losses: ${stats.losses}`);
    console.log(`🚀 Crash: ${stats.crashBets} bets, ${stats.crashWins} wins (${stats.crashBets > 0 ? ((stats.crashWins/stats.crashBets)*100).toFixed(1) : '0.0'}%)`);
    console.log(`🎢 Slide: ${stats.slideBets} bets, ${stats.slideWins} wins (${stats.slideBets > 0 ? ((stats.slideWins/stats.slideBets)*100).toFixed(1) : '0.0'}%)`);
    console.log(`Final session profit: ${stats.sessionProfit.toFixed(2)} INR`);
    console.log(`Total backup: ${stats.totalBackup.toFixed(2)} INR`);
    console.log(`Final balance: ${stats.balance.toFixed(2)} INR`);
    console.log("=".repeat(70));
}

// ========== MAIN EXECUTION ==========
async function main() {
    console.log("🔐 StakeDualScript - Licensed Version");
    console.log("=".repeat(50));
    
    const licenseManager = new SimpleLicenseManager();
    
    // Get license key from user
    const licenseKey = await licenseManager.promptForLicense();
    
    // Validate license
    const validation = licenseManager.validateLicense(licenseKey);
    
    if (!validation.valid) {
        console.log(`❌ ${validation.error}`);
        console.log(`\n💰 Purchase license at: https://t.me/your_telegram_handle`);
        console.log(`📧 Contact: your-email@example.com`);
        process.exit(1);
    }
    
    // Show license info
    const license = validation.license;
    console.log(`✅ License Valid!`);
    console.log(`📋 Plan: ${license.type.toUpperCase()}`);
    console.log(`👤 Email: ${license.email}`);
    console.log(`📅 Valid until: ${license.endDate}`);
    console.log(`⏰ Days remaining: ${validation.daysRemaining}`);
    
    // Warning if license expires soon
    if (validation.daysRemaining <= 7) {
        console.log(`⚠️ WARNING: License expires in ${validation.daysRemaining} days!`);
        console.log(`🔄 Renew at: https://t.me/your_telegram_handle`);
    }
    
    console.log("\n🚀 Starting bot...\n");
    
    // Start the bot
    await runBot();
}

// Start the application
main().catch(error => {
    console.log("Fatal error:", error);
    console.log("🔄 Restarting in 60 seconds...");
    setTimeout(main, 60000);
});