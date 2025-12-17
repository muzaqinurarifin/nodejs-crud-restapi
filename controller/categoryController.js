import db from '../config/db.js';

export const getAllCategories = (req, res) => {
    db.query('SELECT * FROM categories', (err, results) => {
        if (err) return res.status(500).json({ message: err });
        res.json({ message: 'Berhasil', data: results });
    });
};

export const getCategoryById = (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM categories WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ message: err });
        if (results.length === 0) return res.status(404).json({ message: 'Kategori tidak ditemukan' });
        res.json({ message: 'Berhasil', data: results[0] });
    });
};

export const createCategory = (req, res) => {
    const { name } = req.body;
    db.query('INSERT INTO categories (name) VALUES (?)', [name], (err, results) => {
        if (err) return res.status(500).json({ message: err });
        res.status(201).json({ 
            message: 'Kategori telah dibuat', 
            data: { id: results.insertId, name } 
        });
    });
};

export const updateCategory = (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    db.query('UPDATE categories SET name = ? WHERE id = ?', [name, id], (err, results) => {
        if (err) return res.status(500).json({ message: err });
        if (results.affectedRows === 0) return res.status(404).json({ message: 'Kategori tidak ditemukan' });
        res.json({ message: 'Kategori telah diupdate' });
    });
};

export const deleteCategory = (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM categories WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ message: err });
        if (results.affectedRows === 0) return res.status(404).json({ message: 'Kategori tidak ditemukan' });
        res.json({ message: 'Kategori telah dihapus' });
    });
};