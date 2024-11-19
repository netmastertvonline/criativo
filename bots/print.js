const puppeteer = require("puppeteer");

function generateRandomCode(length = 8) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        code += chars[randomIndex];
    }
    return code;
}

module.exports = async function print() {
    let url;

    const cod = generateRandomCode(); 

    url = "http://localhost:3000/searchEnd";
    

    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    await page.goto(url);
    await page.setViewport({ width: 1080, height: 1920 });

    await page.screenshot({ path: `criativos/${cod}.png` });
    
    await browser.close();
    return;
}
