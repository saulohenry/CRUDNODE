import { NextFunction, Request, Response, Router } from 'express';
import { getCarroRepository, Carro } from './model';

export const router: Router = Router();

router.get('/Carro', async function (req: Request, res: Response, next: NextFunction) {
  try {
    const repository = await getCarroRepository();
    const allCarros = await repository.find();
    res.send(allCarros);
  }
  catch (err) {
    return next(err);
  }
});

router.get('/Carro/:id', async function (req: Request, res: Response, next: NextFunction) {
  try {
    const repository = await getCarroRepository();
    const Carro = await repository.find({id: req.params.id});
    res.send(Carro);
  }
  catch (err) {
    return next(err);
  }
});

router.post('/Carro', async function (req: Request, res: Response, next: NextFunction) {
  try {
    const repository = await getCarroRepository();
    const Carro = new Carro();
    Carro.name = req.body.name;
    Carro.sku = req.body.sku;
    Carro.description = req.body.description;
    Carro.price = Number.parseFloat(req.body.price);
    Carro.stock = Number.parseInt(req.body.stock);

    const result = await repository.save(Carro);
    res.send(result);
  }
  catch (err) {
    return next(err);
  }
});

router.post('/Carro/:id', async function (req: Request, res: Response, next: NextFunction) {
  try {
    const repository = await getCarroRepository();
    const Carro = await repository.findOne({id: req.params.id});
    Carro.name = req.body.name;
    Carro.sku = req.body.sku;
    Carro.description = req.body.description;
    Carro.price = Number.parseFloat(req.body.price);
    Carro.stock = Number.parseInt(req.body.stock);

    const result = await repository.save(Carro);
    res.send(result);
  }
  catch (err) {
    return next(err);
  }
});

router.delete('/Carro/:id', async function (req: Request, res: Response, next: NextFunction) {
  try {
    const repository = await getCarroRepository();
    await repository.delete({id: req.params.id});
    res.send('OK');
  }
  catch (err) {
    return next(err);
  }
});