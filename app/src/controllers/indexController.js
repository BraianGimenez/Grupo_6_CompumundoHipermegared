const fs = require("fs");
const path = require("path");

const productsFilePath = path.join(__dirname, '../database/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

module.exports = {
    index: (req, res) => {
        let special = products.filter(products => {
            return products.category == "destacado"
        });
        let inSale = products.filter(products => {
            return products.category == "oferta"
        });
        let normalProduct = products.filter(products => {
            return products.category == "producto"
        });
        res.render("index", {
            products,special , inSale , normalProduct,
            session: req.session
        })
    },
    search: (req, res) => {
        let {productSearch} = req.query

        let searchResult = products.filter(product  => (product.name.toLowerCase().includes(productSearch) || product.name.toUpperCase().includes(productSearch) || product.name.match(productSearch)) );

       res.render("search",{
            productSearch,
            searchResult,
            session: req.session
        });

    },
  
    about: (req, res) => {
        res.render("nosotros", {
            session: req.session
        })
    }
}