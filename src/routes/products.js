const express = require('express');
const db = require('../utils/db');
const productsRouter = express.Router();

productsRouter.use((req, res, next) => {
    console.log('Products auth check middleware');
    console.log(req.user);
    if (req.user) next();
    else res.send(401);
});

productsRouter.get('/', (req, res) => {
    const { category } = req.query;

    db.query('SELECT * FROM products ORDER BY productId', (err, result) => {
        if (err) {
            throw err
        }
        if (category) {
            const filteredProducts = result.rows.filter((r) => r.category.toLowerCase() == category.toLowerCase());
            res.send(filteredProducts);
        } else res.status(200).send(result.rows);
    })
});

productsRouter.get('/:productId', (req, res) => {
    const id = req.params.productId

    db.query('SELECT * FROM products WHERE productId = $1', [id], (err, result) => {
        if (err) {
            throw err
        }
        const product = result.rows[0]

        if (product) {
            res.status(200).json(product)
        } else {
            res.status(404).send('Product not found!')
        }
    })
});

productsRouter.post('/new-product', (req, res) => {
    const { productId, name, price, category } = req.body

    db.query('INSERT INTO products (productId, name, price, category) VALUES ($1, $2, $3, $4)', 
    [productId, name, price, category], (err, result) => {
        if (err) {
            throw err
        }
        res.status(201).send('New product added!')
    })
});

productsRouter.put('/update-product/:productId', (req, res, next) => {
    const id = req.params.productId
    const { name, price, category } = req.body

    db.query(
        'UPDATE products SET name = $1, price = $2, category = $3 WHERE productId = $4', [name, price, category, id], (err, result) => {
        if (err) {
            throw err
        }
        res.status(200).send('Product updated!')
    })
})

productsRouter.delete('/delete-product/:productId', (req, res, next) => {
    const id = req.params.productId

    db.query(`DELETE FROM products WHERE productId = ${id}`, (err, result) => {
        if (err) {
            throw err
        }
        res.status(200).send('Product deleted')
    })
});

module.exports = productsRouter;