const Article = require("../src/Article");

function tvaArticles(cart){
    if(!Array.isArray(cart)){
        throw new Error("There is no cart");
    }
    if(cart.length === 0){
        throw new Error("Cart is empty");
    }
    if(cart.some(element => !(element instanceof Article ))){
        throw new Error("Cart contains invalid items");
    }
    if(cart.some(element => element.price <= 0)){
        throw new Error("Price of item must be positive and > 0");
    }

    cart.forEach(article => {
        let tvaRate = 0;
        if (article.category === "Livre") {
            tvaRate = 5.5 / 100;
        } else if (article.category === "DVD") {
            tvaRate = 10 / 100;
        } else if (article.category === "Jeux vidéo") {
            tvaRate = 20 / 100;
        }
        article.price += article.price * tvaRate;
    });

    return cart;
}

function totalTTC(cart){
    if(cart.length === 0){
        return 0;
    }

    cart = tvaArticles(cart);

    if(cart.some(element => element.quantity <= 0)){
        throw new Error("Qtt should be > 0");
    }

    return cart.reduce((total, article) => {
        return total + article.price * article.quantity; // Sum up price * quantity for each article
    }, 0);
}

function deliveryFees(total){
    if(total == 0){
        throw new Error("Total should be > 0");
    }

    if(total < 50) return 10;
    if(total >= 50 && total <=100) return 50;

    return 0;
}

function genererRecapitulatif(cart){
    const total = totalTTC(cart);
    const fees = deliveryFees(total);
    const totalDelivery = total + fees;


    return [
        total,
        fees,
        totalDelivery
    ];
}

module.exports = {tvaArticles, totalTTC, deliveryFees, genererRecapitulatif}