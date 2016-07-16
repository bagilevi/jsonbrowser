var fs = require('fs');
var jsStringEscape = require('js-string-escape');


// --- Redis ---

var redis = require("redis"),
    client = redis.createClient();

client.on("error", function (err) {
  console.log("Error " + err);
});

// --- Utils ---

function generateRandomString(length) {
  // Source: http://stackoverflow.com/a/1349426/157328
  var text = "";
  var possible = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789";
  for(var i=0; i < (length || 10); i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

function insertJsonIntoTemplate(template, jsonString) {
  return template.replace(
    "var jsonDocument;",
    "var jsonDocument = '" + jsStringEscape(jsonString) + "';"
  );
}

// --- Express ---

module.exports = function(app) {
  var bodyParser = require('body-parser');
  app.use(bodyParser.json());

  app.get('/status', function (req, res) {
    res.send('OK');
  });

  app.post('/documents', function (req, res) {
    const key = generateRandomString(10);
    const value = JSON.stringify(req.body);
    client.set(key, value, function(err, reply) {
      if (err) {
        console.log("Redis: " + reply);
        res.status(500, send("Unable to save document."));
      } else {
        if (req.query.return == 'json') {
          res.send(JSON.stringify({ path: "/documents/" + key }));
        } else {
          res.redirect("/documents/" + key);
        }
      }
    });
  });

  app.get('/documents/:key', function (req, res) {
    const key = req.params.key;
    client.get(key, function(err, reply) {
      if (err) {
        console.log("Redis: " + reply);
        res.status(500).send("Unable to load document.");
      } else if (reply) {
        var template = fs.readFileSync(__dirname + '/../index.html', 'utf8');
        res.send(insertJsonIntoTemplate(template, reply));
      } else {
        res.status(404).send("Document not found.");
      }
    });
  });
}
