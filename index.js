var http = require("http");
const sqlite3 = require("sqlite3").verbose();
let db = new sqlite3.Database("./nodesql.db", (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Connected to the in-memory SQlite database.");
});

function dbConnect() {
  return new Promise((resolve, reject) => {
    // var items = [1];
    // db.serialize(function () {
    //   var stmt = db.prepare("INSERT INTO lorem VALUES (?)");

    //   for (var i = 0; i < 10; i++) {
    //     stmt.run("Ipsum " + i);
    //   }
    //   stmt.finalize();

    db.all("SELECT * FROM lorem WHERE info = 'Ipsum 3'", function (err, row) {
      db.close((err) => {
        if (err) {
          console.log(err);
        }
        console.log("Closed the database connection.");
        return;
      });
      resolve(row);
      //   });
    });
  });
}

var server = http.createServer(async (req, res) => {
  let items = [];

  try {
    let dbItems = await dbConnect();
    items = [...items, dbItems];
  } catch (err) {
    console.log(err);
  }

  let html = "";
  items.forEach((item) => {
    html += html + " " + JSON.stringify(item);
  });

  res.end(html);
});

server.listen(3000);