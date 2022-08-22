import { Discount } from '../models/Discount';
import { CommonService } from './common.service';

export class DiscountsService extends CommonService {
    private static baseUrl: string = String(process.env.REACT_APP_DISCOUNTS_URL);

    static async getAll(lastKey?: any): Promise<Array<Discount>> {
        try {
            return await DiscountsService.get<Array<Discount>>(
                `${DiscountsService.baseUrl}`,
                lastKey
            );
        } catch (e) {
            return [];
        }
    }

    static async addNew(product: Partial<Discount>): Promise<Discount> {
        try {
            return await DiscountsService.post<Discount>(
                `${DiscountsService.baseUrl}/add`, 
                product
            );
        } catch (e) {
            throw e;
        }
    }

    static async deleteRule(id: string): Promise<void> {
        await DiscountsService.delete(`${DiscountsService.baseUrl}/${id}`);
    }

    static async updateRule(discount: Partial<Discount>): Promise<void> {
        await DiscountsService.patch(`${DiscountsService.baseUrl}/${discount.id}`, discount);
    }
}
