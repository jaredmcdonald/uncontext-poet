var express = require('express');

module.exports = function (SourceTextModel) {
  var router = express.Router();

  router.get('/:id', function (req, res) {
    var id = req.params.id;
    SourceTextModel.findById(id, function (err, item) {
      if (err) {
        return res.status(404).send('Not Found');
      }

      res.render('display', {
        title : buildPageTitle(item.parsed),
        item : item
      });
    });

  });

  return router;
}


function buildPageTitle (parsed) {
  return parsed.slice(0, 3).join(' ') + '...';
}
