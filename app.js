const db = require("./db");
const express = require("express");
const app = express();
const port = 3000;
app.use(express.json());

 

app.get("/books/:Id", (req, res) => {
  const id = req.params.Id;
  db.get("SELECT * FROM books WHERE id = ?", [id], (err, row) => {
    if (err) {
      return console.error(err.message);
    } 

    if (row) {
      res.json(row);
    }
    else {
      res.status(404).send("Book not found");
    }


  }
  );
});

app.get("/books", (req, res) => {
  db.all("SELECT * FROM books", [], (err, rows) => {
    if (err) {
      return console.error(err.message);
    }
    res.json(rows);
  });
});
app.put("/books/:Id", (req, res) => {
  const id = req.params.Id;
  const { title, author } = req.body;
  db.run("UPDATE books SET title = ?, author = ? WHERE id = ?", [title, author, id], (err) => {
    if (err) {
      return console.error(err.message);
    }
    res.send("Book updated");
  });
   
});

app.delete("/books/:Id", (req, res) => {
  const id = req.params.Id;
  db.run("DELETE FROM books WHERE id = ?", [id], (err) => {
    if (err) {
      return console.error(err.message);
    }
    res.send("Book deleted");
  });

});

app.post("/books", (req, res) => {
  console.log("POST /books");
  const book = {
    id: req.body.id,
    title: req.body.title,
    author: req.body.author,
  };
  db.run("INSERT INTO books (id, title, author) VALUES (?, ?, ?)", [book.id, book.title, book.author], (err) => {
    if (err) {
      return console.error(err.message);
    }
    res.send("Book added");
  });

 
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
