import { CommonService } from './common.service';

export class CheckoutService extends CommonService {
    private static baseUrl: string = String(process.env.REACT_APP_CHECKOUT_URL);

    //TODO: Replace any with a Checkout interface
    static async checkout(list: Array<string>): Promise<any> {
        return CheckoutService.post<any>(
            `${CheckoutService.baseUrl}`,
            { list }
        );
    }
}

