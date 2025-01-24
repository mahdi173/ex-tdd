const Article = require("../src/Article");
const { tvaArticles, totalTTC, deliveryFees, genererRecapitulatif} = require("../src/Cart");

describe("When I try to add TVA my cart", () => {
    test('with no items, I should have a error of msg', () => {
        let cart = [];
        expect(() => tvaArticles(cart)).toThrow("Cart is empty");
    });

    test("with items with a negative or null price, then I should get an error", () => {
        const item1 = new Article(1, "Harry Potter", 0, "livres", 2);
        const item2 = new Article(2, "Inception", -14.99, "dvd",1);
        const item3 = new Article(3, "The Witcher 3", 5,  "jeux vidéo", 1);
        let cart = [item1, item2, item3];
        expect(() => tvaArticles(cart)).toThrow("Price of item must be positive and > 0");
    });

    test("with correct items, then I should apply TVA to each price", () => {
        const item1 = new Article(1, "Harry Potter", 12.99, "livres", 2);
        const item2 = new Article(2, "Inception", 14.99, "dvd",1);
        const item3 = new Article(3, "The Witcher 3",  39.99,  "jeux vidéo", 1);
        let cart = [item1, item2, item3];


        const test1 = new Article(1, "Harry Potter",   14.42, "livres", 2);
        const test2 = new Article(2, "Inception", 16.49, "dvd",1);
        const test3 = new Article(3, "The Witcher 3",  47.99,  "jeux vidéo", 1);
        let cartTest = [test1, test2, test3];

        const newCart = tvaArticles(cart);
        expect(newCart).toEqual(cartTest);
    });

    test("without a cart, then I should get an error", () => {
        expect(() => tvaArticles(undefined)).toThrow("There is no cart");
    });

    test('with invalid items in the cart, then I should get an error', () => {
        let cart = ["hello", "hi", "ffff", "dded", "test"];
        expect(() => tvaArticles(cart)).toThrow("Cart contains invalid items");
    });
});

describe("When I try to calculate Total TTC of my cart", () => {
    test('with no items, I should get 0', () => {
        let cart = [];
        const total = totalTTC(cart);
        expect(total).toBe(0);
    });

    test('with items with 0 or negative qtt, I should have a error of msg', () => {
        const item1 = new Article(1, "Harry Potter", 10, "livres", 0);
        const item2 = new Article(3, "The Witcher 3", 5,  "jeux vidéo", 1);
        let cart = [item1, item2];
        expect(() => totalTTC(cart)).toThrow("Qtt should be > 0");
    });

    test("with correct items, then I should get tottal TTC", () => {
        const item1 = new Article(1, "Harry Potter",  12.99, "livres", 2);
        const item2 = new Article(2, "Inception", 14.99, "dvd",1);
        const item3 = new Article(3, "The Witcher 3",  39.99,  "jeux vidéo", 1);
        let cart = [item1, item2, item3];
        const total = totalTTC(cart);
        expect(total).toBe(91.86);
    });
});

describe("When I try to submit my cat I get delivery fees", () => {
    test('with total 0, I should get errr', () => {       
        expect(() => deliveryFees(0)).toThrow("Total should be > 0");
    });

    test('with Total < 50, I should get 50', () => {
        expect(deliveryFees(23)).toBe(10);
    });

    test('with Total >= 50  <=100, I should get 50', () => {
        expect(deliveryFees(55)).toBe(50);
    });

    test('with total >100, I should get 0', () => {
        expect(deliveryFees(55)).toBe(0);
    });
});

describe("When I try to submit my cat I get delivery fees", () => {
    test('with total 0, I should get errr', () => {       
        expect(() => deliveryFees(0)).toThrow("Total should be > 0");
    });

    test('with Total < 50, I should get 50', () => {
        expect(deliveryFees(23)).toBe(10);
    });

    test('with Total >= 50  <=100, I should get 50', () => {
        expect(deliveryFees(55)).toBe(50);
    });

    test('with total >100, I should get 0', () => {
        expect(deliveryFees(55)).toBe(0);
    });
});


describe("When I try to submit my cat I get delivery fees", () => {
    test('Total < 50 : vérification correcte du récapitulatif avec un article', () => {
        const article1 = new Article(1, 'Article 1', 20, 'cat1', 1);
        const resultat = genererRecapitulatif([article1]);
        expect(resultat).toEqual({
            total: 20,
            fraisLivraison: 10,
            totalAvecLivraison: 30,
        });
    });

    test('Total entre 50 et 100 : vérification correcte du récapitulatif avec plusieurs articles', () => {
        const article1 = new Article(1, 'Article 1', 20, 'cat1', 1);
        const article2 = new Article(2, 'Article 2', 30, 'cat2', 1);
        const resultat = genererRecapitulatif([article1, article2]);
        expect(resultat).toEqual({
            total: 50,
            fraisLivraison: 5,
            totalAvecLivraison: 55,
        });
    });

    test('Total >= 100 : vérification correcte du récapitulatif avec plusieurs articles', () => {
        const article1 = new Article(1, 'Article 1', 40, 'cat1', 2);
        const article2 = new Article(2, 'Article 2', 30, 'cat2', 2);
        const resultat = genererRecapitulatif([article1, article2]);
        expect(resultat).toEqual({
            total: 140,
            fraisLivraison: 0,
            totalAvecLivraison: 140,
        });
    });
});