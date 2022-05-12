
import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import ProductRepository from '../repositories/ProductRepository';

class ProductController {

  async index(request: Request, response: Response) {
    const productRepository = getCustomRepository(ProductRepository);

    const products = await productRepository.find();

    return response.json(products);
  }

  async show(request: Request, response: Response) {
    const productRepository = getCustomRepository(ProductRepository);

    const { id } = request.params;

    const product = await productRepository.findOne(id);

    return response.json(product);
  }

  async create(request: Request, response: Response) {
    const productRepository = getCustomRepository(ProductRepository);
    const { name } = request.body;
    const existProduct = await productRepository.findOne({ name });
    if (existProduct) {
      return response.status(400).json({ err: "Product already exist." });
    }
    const product = productRepository.create({ name });
    await productRepository.save(product);
    return response.json(product);
  }
}

export default new ProductController();
