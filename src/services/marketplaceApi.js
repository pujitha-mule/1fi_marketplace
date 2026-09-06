import { mockMarketplaceProducts } from '../data/marketplaceData';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export class MarketplaceApi {
  constructor() {
    this.products = [...mockMarketplaceProducts];
  }

  async getProducts() {
    await delay(800);
    return this.products;
  }

  async getProductById(id) {
    await delay(600);
    
    const product = this.products.find(p => p.id === id);
    if (!product) {
      throw new Error('Product not found');
    }
    
    return product;
  }
}