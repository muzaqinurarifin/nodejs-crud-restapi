import db from '../config/db.js';

export const getAllProducts = (req, res) => {
    db.query('SELECT * FROM products', (err, results) => {
        if (err) return res.status(500).json({ message: err });
        res.json(results);
    });
};

export const getProductById = (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM products WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ message: err });
        if (results.length === 0) return res.status(404).json({ message: 'Produk tidak ditemukan' });
        res.json({ message: 'Berhasil', data: results[0] });
    });
};

export const createProduct = (req, res) => {
    const { category_id, name, price } = req.body;
    db.query(
        'INSERT INTO products (category_id, name, price) VALUES (?, ?, ?)', 
        [category_id, name, price], 
        (err, results) => {
            if (err) return res.status(500).json({ message: err });
            res.status(201).json({ 
                message: 'Produk telah dibuat', 
                data: { id: results.insertId, category_id, name, price } 
            });
        }
    );
};

export const updateProduct = (req, res) => {
    const { id } = req.params;
    const { category_id, name, price } = req.body;
    db.query(
        'UPDATE products SET category_id = ?, name = ?, price = ? WHERE id = ?', 
        [category_id, name, price, id],
        (err, results) => {
            if (err) return res.status(500).json({ message: err });
            if (results.affectedRows === 0) return res.status(404).json({ message: 'Produk tidak ditemukan' });
            res.json({ message: 'Produk telah diupdate' });
        }
    );
};

export const deleteProduct = (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM products WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ message: err });
        if (results.affectedRows === 0) return res.status(404).json({ message: 'Produk tidak ditemukan' });
        res.json({ message: 'Produk telah dihapus' });
    });
};