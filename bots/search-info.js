const puppeteer = require("puppeteer");
const translateGenres = require("../lib/translateGenres");
const dir = __dirname + '/../authenticationMagazine';

module.exports = async function searchInfo(codigo) {
    let cod = codigo;
    let url = `https://www.imdb.com/find/?q=${cod}&ref_=nv_sr_sm`;

    const browser = await puppeteer.launch({ headless: "new", ignoreDefaultArgs: ['--disable-extensions'], userDataDir: dir });
    const page = await browser.newPage();
    let imgUrl = null;
    let imgUrlBig = null;

    try {
        await page.goto(url);

        await page.waitForSelector('.ipc-metadata-list li');
        // Clica no primeiro <li> encontrado
        await page.click('.ipc-metadata-list li:first-child');

        // Captura título
        await page.waitForSelector('h1[data-testid="hero__pageTitle"]');
        const title = await page.$eval('h1[data-testid="hero__pageTitle"] .hero__primary-text', el => el.textContent.trim());
        console.log('Título:', title);

        // Captura sinopse
        await page.waitForSelector('p[data-testid="plot"]');
        const plot = await page.$eval('p[data-testid="plot"] span[data-testid="plot-xs_to_m"]', el => {
            let text = el.textContent.trim();
            const endIndex = text.indexOf('...');
            if (endIndex !== -1) {
                text = text.substring(0, endIndex + 3);
            }
            return text;
        });
        console.log('Sinopse:', plot);

        // Captura gêneros
        await page.waitForSelector('.ipc-chip-list__scroller a');
        const genres = await page.$$eval('.ipc-chip-list__scroller a .ipc-chip__text', elements => 
            elements.slice(0, 2).map(el => el.textContent.trim())
        );
        const translatedGenres = translateGenres(genres);
        console.log('Gêneros:', genres);
        console.log('Gêneros Traduzidos:', translatedGenres);

// Espera até que a imagem principal esteja carregada
await page.waitForSelector('.ipc-image');
imgUrl = await page.$eval('.ipc-image', img => img.src);
console.log('Imagem URL:', imgUrl);

// Tenta encontrar o overlay e capturar a imagem maior
const overlayElement = await page.$('div.ipc-lockup-overlay__screen');
if (overlayElement) {
    try {
        await overlayElement.click(); // Clica no overlay
        console.log('Elemento clicado com sucesso');

        // Aguarda a imagem maior aparecer após o clique
        await page.waitForSelector('div.sc-7c0a9e7c-2.hXyMhR img', { visible: true, timeout: 5000 });

        // Captura a URL da imagem maior
        imgUrlBig = await page.$eval('div.sc-7c0a9e7c-2.hXyMhR img', img => img.src);
        
        if (imgUrlBig) {
            // Se imgUrlBig estiver disponível, substitui a imgUrl
            imgUrl = imgUrlBig;
            console.log('URL da imagem maior:', imgUrl);
        }
    } catch (error) {
        console.log('Erro ao tentar capturar a imagem maior:', error.message);
        // Caso o erro ocorra, continua com a imagem principal
        console.log('Usando a primeira imagem encontrada:', imgUrl);
    }
} else {
    console.log('Elemento de overlay não encontrado');
}

console.log('Imagem final URL:', imgUrl);



        const items = {
            title,
            plot,
            genres: translatedGenres,
            imgUrl
        };

        return items;

    } catch (error) {
        console.error('Erro:', error);
    } finally {
        // Não fechar o navegador para fins de depuração
        // Remova ou ajuste para produção
        await browser.close();
    }
};
