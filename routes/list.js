'use strict';

var express = require('express');

module.exports = function (SourceTextModel) {
  var router = express.Router();

  router.get('/', function (req, res) {
    SourceTextModel.find().exec(function (err, sourceTexts) {
      if (err) {
        return res.status(500).send('Internal Server Error');
      }

      res.render('list', {
        title: 'All source texts',
        sourceTexts: sourceTexts
      });
    });
  });

  return router;
}
