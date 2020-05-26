"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const model_1 = require("./model");
exports.router = express_1.Router();
exports.router.get('/Carro', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const repository = yield model_1.getCarroRepository();
            const allCarros = yield repository.find();
            res.send(allCarros);
        }
        catch (err) {
            return next(err);
        }
    });
});
exports.router.get('/Carro/:id', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const repository = yield model_1.getCarroRepository();
            const Carro = yield repository.find({ id: req.params.id });
            res.send(Carro);
        }
        catch (err) {
            return next(err);
        }
    });
});
exports.router.post('/Carro', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const repository = yield model_1.getCarroRepository();
            const Carro = new Carro();
            Carro.name = req.body.name;
            Carro.sku = req.body.sku;
            Carro.description = req.body.description;
            Carro.price = Number.parseFloat(req.body.price);
            Carro.stock = Number.parseInt(req.body.stock);
            const result = yield repository.save(Carro);
            res.send(result);
        }
        catch (err) {
            return next(err);
        }
    });
});
exports.router.post('/Carro/:id', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const repository = yield model_1.getCarroRepository();
            const Carro = yield repository.findOne({ id: req.params.id });
            Carro.name = req.body.name;
            Carro.sku = req.body.sku;
            Carro.description = req.body.description;
            Carro.price = Number.parseFloat(req.body.price);
            Carro.stock = Number.parseInt(req.body.stock);
            const result = yield repository.save(Carro);
            res.send(result);
        }
        catch (err) {
            return next(err);
        }
    });
});
exports.router.delete('/Carro/:id', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const repository = yield model_1.getCarroRepository();
            yield repository.delete({ id: req.params.id });
            res.send('OK');
        }
        catch (err) {
            return next(err);
        }
    });
});
