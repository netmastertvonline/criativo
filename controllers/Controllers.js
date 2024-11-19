const buscarMagazineLuiza = require("../bots/buscarMagazineLuiza");
const print = require("../bots/print");

let items;

module.exports = class Controller {

    static home(req, res) {
        res.render("home");
    }

    static search(req, res) {
        res.render("search");
    }

    static async searchPost(req, res, next) {
        let {option, cod} = req.body;
        let tratado = cod.trim().trimEnd().split(",")
        
        try {
            if (tratado.length === 1 && tratado[0] === "") {
                
                if (option === "1") {
                    for (let idx = 0; idx < tratado.length; idx++) {
                        
                        items = await buscarMagazineLuiza(tratado[idx])
                        
                        if (!items) {
                            // Caso não haja items, interrompe o fluxo e chama o next()
                            return next(new Error('Items não encontrados'));
                        }
                        
                        if (items && items.title) {
                            await print()
                        }
                    }
                }
            }

        } catch (error) {
            console.log(error);    
        }
        
        await res.redirect("/search")
        return    
    }

    static searchEnd(req, res) {
        res.render("searchEnd", { items })
    }

}