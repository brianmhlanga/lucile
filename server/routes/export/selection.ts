import puppeteer from "puppeteer";


export default defineEventHandler(async(event)=>{
    try {
        const body = await readBody(event);

        // Validate input
       
        // Destruct body
        const { selection } = body;
        
    
        const browser = await puppeteer.launch({ 
            headless: true,
            args: [
                '--disable-features=IsolateOrigins',
                '--disable-site-isolation-trials',
                '--autoplay-policy=user-gesture-required',
                '--disable-background-networking',
                '--disable-background-timer-throttling',
                '--disabled-backgrounding-occluded-windows',
                '--disable-breakpad',
                '--disable-client-side-phishing-detection',
                '--disable-component-update',
                '--disable-default-apps',
                '--disable-dev-shm-usage',
                '--disable-domain-reliability',
                '--disable-extensions',
                '--disable-features=AudioServiceOutOfProcess',
                '--disable-hang-monitor',
                '--disable-ipc-flooding-protection',
                '--disable-notifications',
                '--disable-offer-store-unmasked-wallet-cards',
                '--disable-popup-blocking',
                '--disable-print-preview',
                '--disable-prompt-on-repost',
                '--disable-renderer-backgrounding',
                '--disable-speech-api',
                '--disable-sync',
                '--hide-scrollbars',
                '--ignore-gpu-blacklist',
                '--metrics-recording-only',
                '--mute-audio',
                '--no-default-browser-check',
                '--no-first-run',
                '--no-pings',
                '--no-zygote',
                '--no-sandbox',
                '--password-store=basic',
                '--use-gl=swiftshader',
                '--use-mock-keychain'
            ] 
        });
        
        const page = await browser.newPage();

        // Create PDF from URL
        await page.goto(`http://localhost:3000/export-${ selection }`, { waitUntil: 'networkidle0' });
        
        const stream = await page.pdf({ format: 'a4'});

        await browser.close();
        return stream;
    } catch (error) {
        console.error(error);
        setResponseStatus(event, 500);

        return false
    }
});