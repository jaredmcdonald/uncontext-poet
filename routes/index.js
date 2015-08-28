import SourceTextModel from '../models/source';
import {Router} from 'express';

const router = Router();

// static routes
router.get('/', (req, res) => res.render('index', { title: 'Express' }));
router.get('/about', (req, res) => res.render('about', { title: 'About' }));

export default router;
