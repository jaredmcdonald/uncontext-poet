import SourceTextModel from '../models/source';
import {Router} from 'express';

const router = Router();

router.get('/:id', (req, res) => {
  const id = req.params.id;
  SourceTextModel.findById(id, (err, item) => {
    if (err) {
      return res.status(404).send('Not Found');
    }

    res.render('display', {
      title: buildPageTitle(item.parsed),
      item
    });
  });

});

function buildPageTitle (parsed) {
  return `${parsed.slice(0, 3).join(' ')}...`;
}

export default router;
