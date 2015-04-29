var express = require('express');

module.exports = function (SourceTextModel) {
  var router = express.Router();

  router.post('/', function (req, res) {
    // parse it and save the parsed form in the DB


    new SourceTextModel({
      text : req.body.source,
      parsed : parseText(req.body.source)
    }).save(function (err, newItem) {

      if (err) {
        return res.status(500).send('Internal Server Error');
      }

      res.redirect('/display/' + newItem._id);
    });


  });

  return router;
}

// parse
function parseText (text) {
  return text.replace(/[\n\r]/g, ' ')
          // .replace(/\./g, '')
             .split(' ')
             .filter(function (w) { return w.length > 0 });
}
