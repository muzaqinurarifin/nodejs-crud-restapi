import db from "../config/db.js";


export const getUsers = (req, res) => {
  db.query("SELECT * FROM users", (err, results) => {
    // jika ada error
    if (err)
      return res.status(500).json({
        message: err,
      });

    // jika sukses
    res.json(results);
  });
};


export const insertUsers = (req, res) => {
  const { name, email, password } = req.body;

  db.query(
    "INSERT INTO users (name, email, password) values(?,?,?)",
    [name, email, password],
    (err, results) => {
      if (err) return res.status(500).json({ message: err });
      res.json({ message: "Data berhasil disimpan" });
    }
  );
};


export const showById = (req, res) => {
  const { id } = req.params;

  db.query("SELECT * FROM users WHERE id=?", [id], (err, results) => {
    // jika ada error
    if (err) return res.status(500).json({ message: err });

    // jika data tidak ditemukan
    if (results.length === 0)
      return res.status(400).json({ message: "Data tidak ditemukan" });

    // berhasil
    res.json(results[0]);
  });
};


// Perhatikan urutan (req, res) di bawah ini
export const updateUser = (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;

  db.query(
    "UPDATE users SET name=?, email=?, password=? WHERE id=?",
    [name, email, password, id],
    (err, results) => {
      if (err) {
        console.error(err); 
        return res.status(500).json({ message: "Database Error", error: err });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({ message: "User tidak ditemukan" });
      }

      res.json({ message: "Data berhasil diubah" });
    }
  );
};


export const deleteUser = (req, res) => {
  const { id } = req.params;

  db.query(
    "DELETE FROM users WHERE id=?",
    [id],
    (err, results) => {
      if (err) return res.status(500).json({ message: err });

      res.json({ message: "Data berhasil dihapus" });
    }
  );
};
