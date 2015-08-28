import SourceTextModel from '../models/source';
import {Router} from 'express';

const router = Router();

router.post('/', (req, res) => {
  // parse it and save the parsed form in the DB
  new SourceTextModel({
    text : req.body.source,
    parsed : parseText(req.body.source)
  }).save((err, newItem) => {

    if (err) {
      return res.status(500).send('Internal Server Error');
    }

    res.redirect('/display/' + newItem._id);
  });

});

// parse
function parseText (text) {
  return text.replace(/[\n\r]/g, ' ')
          // .replace(/\./g, '')
             .split(' ')
             .filter((w) => w.length > 0);
}

export default router;
