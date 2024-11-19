const puppeteer = require("puppeteer");
const { translateGenre } = require("../lib/translateGenres");
const dir = __dirname + './../authenticationMagazine';

module.exports = async function buscarMagazineLuiza(codigo) {
    let cod = codigo;
    let url = `https://www.imdb.com/find/?q=${cod}&ref_=nv_sr_sm`;

    const browser = await puppeteer.launch({ headless: false, ignoreDefaultArgs: ['--disable-extensions'], userDataDir: dir });
    const page = await browser.newPage();

    try {
        await page.goto(url);

        await page.waitForSelector('.ipc-metadata-list li');

        // Clica no primeiro <li> encontrado
        await page.click('.ipc-metadata-list li:first-child');

        await page.waitForSelector('h1[data-testid="hero__pageTitle"]');
        const title = await page.$eval('h1[data-testid="hero__pageTitle"] .hero__primary-text', el => el.textContent);
        console.log('Título:', title);

        // Aguarda o carregamento do elemento <p>
        await page.waitForSelector('p[data-testid="plot"]');
        const plot = await page.$eval('p[data-testid="plot"] span[data-testid="plot-xs_to_m"]', el => {
            let text = el.textContent.trim();
            // Verifica se existe "..." no texto e corta até aí
            const endIndex = text.indexOf('...');
            if (endIndex !== -1) {
                text = text.substring(0, endIndex + 3); // Inclui os "..."
            }
            return text;
        });
        console.log('Sinopse:', plot);

        // Aguarda o carregamento dos elementos <a>
        await page.waitForSelector('.ipc-chip-list__scroller a');
        const genres = await page.$$eval('.ipc-chip-list__scroller a .ipc-chip__text', elements => {
            // Mapeia os textos dos elementos para um array, limitando a 4 itens
            return elements.slice(0, 4).map(el => el.textContent.trim());
        });
        console.log('Gêneros:', genres);

        // Pega o URL da imagem
        const imgUrl = await page.$eval('img.ipc-image', img => img.src);
        console.log('URL da imagem:', imgUrl);

        const items = {
            title,
            plot,
            genres,
            imgUrl
        };

        return items;

    } catch (error) {
        console.error('Erro:', error);
    } finally {
        await browser.close();
    }
};
