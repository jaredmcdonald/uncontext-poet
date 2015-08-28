import SourceTextModel from '../models/source';
import {Router} from 'express';

const router = Router();

router.get('/', (req, res) => {
  SourceTextModel.find().exec((err, sourceTexts) => {
    if (err) {
      return res.status(500).send('Internal Server Error');
    }

    res.render('list', {
      title: 'All source texts',
      sourceTexts
    });
  });
});

export default router;
