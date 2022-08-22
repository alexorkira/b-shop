import { Product } from '../models/Product';
import { CommonService } from './common.service';

export class ProductsService extends CommonService {
    private static baseUrl: string = String(process.env.REACT_APP_PRODUCTS_URL);

    static async getAll(lastKey?: any): Promise<Array<Product>> {
        try {
            return await ProductsService.get<Array<Product>>(
                `${ProductsService.baseUrl}`,
                lastKey
            );
        } catch (e) {
            return [];
        }
    }

    static async addNew(product: Partial<Product>): Promise<Product> {
        try {
            return await ProductsService.post<Product>(
                `${ProductsService.baseUrl}/add`, 
                product
            );
        } catch (e) {
            throw e;
        }
    }

    static async remove(sku: string): Promise<Product> {
        try {
            return await ProductsService.delete<Product>(
                `${ProductsService.baseUrl}/${sku}`, 
            );
        } catch (e) {
            throw e;
        }
    }
}
