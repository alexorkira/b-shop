import axios from 'axios';

export class CommonService {
    // lastKey optional, needs when the data retrieving is too slow and the db (for ex. DynamoDB) fails to provide any data
    protected static async get<T>(api: string, lastKey?: any): Promise<T> {
        const params = Object.assign(
            lastKey ? { ...lastKey } : {},
        );
        try {
            const res = await axios.get(
                api,
                {
                    // Right now we don't have any authentication system
                    // headers: {
                    //     'x-access-token': LocalStorageService.getToken(),
                    // },
                    params,
                },
            );
            return res.data;
        } catch (e: unknown) {
            if (axios.isAxiosError(e)) {
                throw e.response;
            }
            throw e;
        }
    }

    protected static async post<T>(api: string, data: any): Promise<T> {
        try {
           const res = await axios.post(
                api,
                { ...data },
                {
                    // Right now we don't have any authentication system
                    // headers: {
                    //     'x-access-token': LocalStorageService.getToken(),
                    // },
                },
            );
            return res.data;
        } catch (e: unknown) {
            if (axios.isAxiosError(e)) {
                throw e.response;
            }
            throw e;
        }
    }

    protected static async delete<T>(api: string): Promise<T> {
        try {
            const res = await axios.delete(api);
            return res.data;
        } catch (e: unknown) {
            if (axios.isAxiosError(e)) {
                throw e.response;
            }
            throw e;
        }
    }

    protected static async patch<T>(api: string, data: any): Promise<T> {
        try {
            const res = await axios.patch(api, { ...data});
            return res.data;
        } catch (e: unknown) {
            if (axios.isAxiosError(e)) {
                throw e.response;
            }
            throw e;
        }
    }
}