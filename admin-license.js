#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const crypto = require('crypto');

class LicenseAdmin {
    constructor() {
        this.licenseFile = path.join(__dirname, 'licenses.json');
    }

    loadLicenses() {
        try {
            if (!fs.existsSync(this.licenseFile)) {
                return {};
            }
            const data = fs.readFileSync(this.licenseFile, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            console.log("❌ Error reading license file:", error.message);
            return {};
        }
    }

    saveLicenses(licenses) {
        try {
            fs.writeFileSync(this.licenseFile, JSON.stringify(licenses, null, 2));
            return true;
        } catch (error) {
            console.log("❌ Error saving license file:", error.message);
            return false;
        }
    }

    generateRandomLicense() {
        // Generate random 9-digit license key
        return Math.floor(100000000 + Math.random() * 900000000).toString();
    }

    addLicense(licenseKey, type, email, days) {
        const licenses = this.loadLicenses();
        
        const startDate = new Date().toISOString().split('T')[0];
        const endDate = new Date(Date.now() + (days * 24 * 60 * 60 * 1000)).toISOString().split('T')[0];
        
        licenses[licenseKey] = {
            type: type,
            email: email,
            startDate: startDate,
            endDate: endDate,
            status: "active"
        };
        
        if (this.saveLicenses(licenses)) {
            console.log(`✅ License added successfully!`);
            console.log(`🔑 License Key: ${licenseKey}`);
            console.log(`📋 Type: ${type}`);
            console.log(`👤 Email: ${email}`);
            console.log(`📅 Valid from: ${startDate} to ${endDate}`);
            console.log(`⏰ Duration: ${days} days`);
            return true;
        }
        return false;
    }

    listLicenses() {
        const licenses = this.loadLicenses();
        const keys = Object.keys(licenses);
        
        if (keys.length === 0) {
            console.log("📝 No licenses found.");
            return;
        }
        
        console.log("\n📋 Current Licenses:");
        console.log("=".repeat(80));
        console.log("License Key  | Type     | Email                    | Start Date | End Date   | Status");
        console.log("=".repeat(80));
        
        keys.forEach(key => {
            const license = licenses[key];
            const now = new Date();
            const endDate = new Date(license.endDate);
            const isExpired = now > endDate;
            const status = isExpired ? "EXPIRED" : license.status.toUpperCase();
            
            console.log(`${key.padEnd(12)} | ${license.type.padEnd(8)} | ${license.email.padEnd(24)} | ${license.startDate} | ${license.endDate} | ${status}`);
        });
        console.log("=".repeat(80));
    }

    extendLicense(licenseKey, additionalDays) {
        const licenses = this.loadLicenses();
        
        if (!licenses[licenseKey]) {
            console.log(`❌ License key ${licenseKey} not found!`);
            return false;
        }
        
        const currentEndDate = new Date(licenses[licenseKey].endDate);
        const newEndDate = new Date(currentEndDate.getTime() + (additionalDays * 24 * 60 * 60 * 1000));
        
        licenses[licenseKey].endDate = newEndDate.toISOString().split('T')[0];
        licenses[licenseKey].status = "active";
        
        if (this.saveLicenses(licenses)) {
            console.log(`✅ License extended successfully!`);
            console.log(`🔑 License Key: ${licenseKey}`);
            console.log(`📅 New end date: ${licenses[licenseKey].endDate}`);
            console.log(`⏰ Extended by: ${additionalDays} days`);
            return true;
        }
        return false;
    }

    deactivateLicense(licenseKey) {
        const licenses = this.loadLicenses();
        
        if (!licenses[licenseKey]) {
            console.log(`❌ License key ${licenseKey} not found!`);
            return false;
        }
        
        licenses[licenseKey].status = "deactivated";
        
        if (this.saveLicenses(licenses)) {
            console.log(`✅ License deactivated successfully!`);
            console.log(`🔑 License Key: ${licenseKey}`);
            return true;
        }
        return false;
    }

    async promptInput(question) {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        return new Promise((resolve) => {
            rl.question(question, (answer) => {
                rl.close();
                resolve(answer.trim());
            });
        });
    }

    async showMenu() {
        console.log("\n🔐 StakeDualScript License Admin");
        console.log("=".repeat(40));
        console.log("1. Add new license");
        console.log("2. List all licenses");
        console.log("3. Extend license");
        console.log("4. Deactivate license");
        console.log("5. Generate random license key");
        console.log("6. Exit");
        console.log("=".repeat(40));
        
        const choice = await this.promptInput("Choose option (1-6): ");
        return choice;
    }

    async run() {
        console.log("🚀 StakeDualScript License Management System");
        
        while (true) {
            const choice = await this.showMenu();
            
            switch (choice) {
                case '1':
                    await this.handleAddLicense();
                    break;
                case '2':
                    this.listLicenses();
                    break;
                case '3':
                    await this.handleExtendLicense();
                    break;
                case '4':
                    await this.handleDeactivateLicense();
                    break;
                case '5':
                    console.log(`🎲 Random license key: ${this.generateRandomLicense()}`);
                    break;
                case '6':
                    console.log("👋 Goodbye!");
                    process.exit(0);
                default:
                    console.log("❌ Invalid choice. Please try again.");
            }
            
            await this.promptInput("\nPress Enter to continue...");
        }
    }

    async handleAddLicense() {
        console.log("\n➕ Add New License");
        console.log("-".repeat(20));
        
        const licenseKey = await this.promptInput("License key (or press Enter for random): ");
        const finalKey = licenseKey || this.generateRandomLicense();
        
        console.log("\nLicense Types:");
        console.log("1. trial (7 days)");
        console.log("2. weekly (7 days)");
        console.log("3. monthly (30 days)");
        console.log("4. admin (permanent)");
        
        const typeChoice = await this.promptInput("Choose type (1-4): ");
        const types = { '1': 'trial', '2': 'weekly', '3': 'monthly', '4': 'admin' };
        const type = types[typeChoice];
        
        if (!type) {
            console.log("❌ Invalid type choice!");
            return;
        }
        
        const email = await this.promptInput("Email address: ");
        
        let days;
        if (type === 'admin') {
            days = 365 * 10; // 10 years for admin
        } else if (type === 'monthly') {
            days = 30;
        } else {
            days = 7; // trial and weekly
        }
        
        this.addLicense(finalKey, type, email, days);
    }

    async handleExtendLicense() {
        console.log("\n⏰ Extend License");
        console.log("-".repeat(20));
        
        const licenseKey = await this.promptInput("License key to extend: ");
        const additionalDays = parseInt(await this.promptInput("Additional days: "));
        
        if (isNaN(additionalDays) || additionalDays <= 0) {
            console.log("❌ Invalid number of days!");
            return;
        }
        
        this.extendLicense(licenseKey, additionalDays);
    }

    async handleDeactivateLicense() {
        console.log("\n🚫 Deactivate License");
        console.log("-".repeat(20));
        
        const licenseKey = await this.promptInput("License key to deactivate: ");
        const confirm = await this.promptInput(`Are you sure you want to deactivate ${licenseKey}? (yes/no): `);
        
        if (confirm.toLowerCase() === 'yes') {
            this.deactivateLicense(licenseKey);
        } else {
            console.log("❌ Deactivation cancelled.");
        }
    }
}

// Run the admin tool
const admin = new LicenseAdmin();
admin.run().catch(error => {
    console.log("❌ Error:", error.message);
    process.exit(1);
});