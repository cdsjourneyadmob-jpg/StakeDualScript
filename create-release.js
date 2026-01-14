const fs = require('fs');
const path = require('path');

console.log('🚀 Creating distribution release...\n');

// Create releases directory
if (!fs.existsSync('releases')) {
    fs.mkdirSync('releases');
    console.log('📁 Created releases directory');
}

// Files to keep in public repo (distribution only)
const publicFiles = [
    'README.md',
    'INSTALLATION.md', 
    'DISTRIBUTION.md',
    'package.json',
    'licenses.json',
    '.gitignore'
];

// Files to remove from public repo (source code)
const sourceFiles = [
    'dualbet.js',
    'admin-license.js', 
    'test-connection.js',
    'obfuscate.js',
    'create-release.js'
];

console.log('📋 Files that will remain in public repo:');
publicFiles.forEach(file => {
    if (fs.existsSync(file)) {
        console.log(`  ✅ ${file}`);
    }
});

console.log('\n🔒 Source code files to remove from public repo:');
sourceFiles.forEach(file => {
    if (fs.existsSync(file)) {
        console.log(`  ⚠️  ${file} - CONTAINS SOURCE CODE`);
    }
});

console.log('\n⚠️  WARNING: Your source code is currently visible to everyone!');
console.log('🔧 Next steps:');
console.log('1. Make this repository private, OR');
console.log('2. Remove source code files and keep only distribution files');
console.log('3. Build binaries for distribution');

// Create a sample distribution structure
const distributionStructure = `
# 📁 Recommended Public Repository Structure

## Keep These Files (Safe for Public):
- README.md (marketing/info)
- INSTALLATION.md (setup guide)  
- DISTRIBUTION.md (how to get the bot)
- package.json (metadata only)
- licenses.json (license validation data)
- dist/ (compiled binaries)
- releases/ (version releases)

## Remove These Files (Contains Source Code):
- dualbet.js ❌
- admin-license.js ❌  
- test-connection.js ❌
- obfuscate.js ❌
- Any other .js files ❌

## Distribution Process:
1. Customer pays → Gets license key
2. Downloads binary from releases/
3. Runs binary → Enters license key
4. Follows INSTALLATION.md for setup
`;

fs.writeFileSync('REPOSITORY_STRUCTURE.md', distributionStructure);
console.log('\n📄 Created REPOSITORY_STRUCTURE.md with recommendations');