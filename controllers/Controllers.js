const searchInfo = require("../bots/search-info");
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
        let {option, layout, cod} = req.body;
        let tratado = cod.trim().trimEnd().split(",")
        
        try {                
                if (option === "1") {
                    for (let idx = 0; idx < tratado.length; idx++) {
                        
                        items = await searchInfo(tratado[idx])
                        
                        if (!items) {
                            next();
                        }
                        
                        if (items && items.title) {
                            await print(layout)
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

    static searchEnd2(req, res) {
        res.render("searchEnd2", { items })
    }

}