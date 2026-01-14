const JavaScriptObfuscator = require('javascript-obfuscator');
const fs = require('fs');

// Files to obfuscate
const filesToObfuscate = ['dualbet.js', 'admin-license.js', 'test-connection.js'];

const obfuscationOptions = {
    compact: true,
    controlFlowFlattening: true,
    controlFlowFlatteningThreshold: 0.75,
    deadCodeInjection: true,
    deadCodeInjectionThreshold: 0.4,
    debugProtection: true,
    debugProtectionInterval: true,
    disableConsoleOutput: true,
    identifierNamesGenerator: 'hexadecimal',
    log: false,
    renameGlobals: false,
    rotateStringArray: true,
    selfDefending: true,
    shuffleStringArray: true,
    splitStrings: true,
    splitStringsChunkLength: 10,
    stringArray: true,
    stringArrayEncoding: ['base64'],
    stringArrayThreshold: 0.75,
    transformObjectKeys: true,
    unicodeEscapeSequence: false
};

// Create obfuscated directory
if (!fs.existsSync('obfuscated')) {
    fs.mkdirSync('obfuscated');
}

filesToObfuscate.forEach(file => {
    if (fs.existsSync(file)) {
        const code = fs.readFileSync(file, 'utf8');
        const obfuscatedCode = JavaScriptObfuscator.obfuscate(code, obfuscationOptions);
        fs.writeFileSync(`obfuscated/${file}`, obfuscatedCode.getObfuscatedCode());
        console.log(`✅ Obfuscated: ${file}`);
    }
});

// Copy other necessary files
const filesToCopy = ['package.json', 'licenses.json', 'README.md', 'INSTALLATION.md'];
filesToCopy.forEach(file => {
    if (fs.existsSync(file)) {
        fs.copyFileSync(file, `obfuscated/${file}`);
        console.log(`📋 Copied: ${file}`);
    }
});

console.log('\n🎉 Obfuscation complete! Check the "obfuscated" folder.');