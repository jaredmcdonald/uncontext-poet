import SourceTextModel from '../models/source';
import {Router} from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.render('index', { title: 'Express' });
});

export default router;
