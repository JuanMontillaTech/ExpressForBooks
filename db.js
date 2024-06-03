const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./mydb.db', (err) => {
    if (err) {
    console.error(err.message);
  }
  console.log('Connected to the mydb database.');
  // descomente a db.run para crear una tabla luego que este creada comentela
   // db.run("CREATE TABLE books (id INTEGER PRIMARY KEY, title TEXT, author TEXT)");
});
 
module.exports = db;