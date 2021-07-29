const pup = require('puppeteer');
var totalComments = 0

const comments = [
    "🔥🔥",
    "trabalhe como se deus não existisse e tenha fé como vc não precisasse trabalhar.",
    "Ora et labora"
];

function itsTime() {
    const _date = new Date();
    if (_date.getMinutes() == 00 || _date.getMinutes() == 15 || _date.getMinutes() == 30 || _date.getMinutes() == 45) {
        return true;
    }
    return false;
}

async function play() {
    const browser = await pup.launch({
        headless: false,
        executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
        userDataDir: '%userprofile%\\AppData\\Local\\Google\\Chrome\\User Data\\AllowCookies'
    })

    const page = await browser.newPage()
    await page.setViewport({
        width: 1600,
        height: 800,
        deviceScaleFactor: 1,
    });

    await page.goto("https://www.instagram.com/p/CQGt9majlPk/", {
        waitUntil: 'load',
        timeout: 0,
    });

    setInterval(async() => {
        if (totalComments < 5) {
            if (itsTime()) {
                await page.waitForSelector('textarea');
                await page.type('textarea', comments[Math.floor(Math.random() * comments.length)]);
                await page.click('button[type="submit"]');
                totalComments = totalComments + 1
                console.log('Total de comentários: ' + totalComments)
            }
        } else {
            totalComments = 0
        }
    }, 1000);
}

play()