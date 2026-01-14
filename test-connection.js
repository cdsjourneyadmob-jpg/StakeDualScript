const axios = require('axios');

// Test connection to Stake.com
async function testConnection() {
    console.log('🔍 Testing connection to Stake.com...\n');
    
    try {
        // Test basic connectivity
        console.log('1. Testing basic connectivity...');
        const response = await axios.get('https://stake.com', {
            timeout: 10000,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
            }
        });
        
        if (response.status === 200) {
            console.log('✅ Basic connectivity: OK');
        } else {
            console.log('❌ Basic connectivity: Failed');
            return;
        }
        
        // Test GraphQL endpoint
        console.log('\n2. Testing GraphQL endpoint...');
        const graphqlResponse = await axios.post('https://stake.com/_api/graphql', {
            query: 'query { __typename }'
        }, {
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
            }
        });
        
        if (graphqlResponse.status === 200) {
            console.log('✅ GraphQL endpoint: OK');
        } else {
            console.log('❌ GraphQL endpoint: Failed');
        }
        
        // Test license server (mock)
        console.log('\n3. Testing license server...');
        try {
            await axios.get('https://api.stakedualscript.com/health', { timeout: 5000 });
            console.log('✅ License server: OK');
        } catch (error) {
            console.log('⚠️ License server: Not available (normal for development)');
        }
        
        console.log('\n🎉 Connection test completed!');
        console.log('\n📋 Next steps:');
        console.log('1. Purchase license at: https://buy.stakedualscript.com');
        console.log('2. Activate license: npm run activate YOUR_KEY your@email.com');
        console.log('3. Update cookies in dualbet-licensed.js');
        console.log('4. Run bot: npm start');
        
    } catch (error) {
        console.log(`❌ Connection test failed: ${error.message}`);
        console.log('\n🔧 Troubleshooting:');
        console.log('- Check internet connection');
        console.log('- Try different VPN location');
        console.log('- Verify firewall settings');
        console.log('- Contact support if issues persist');
    }
}

testConnection();