import { childLogger } from '@/lib/functions/logger';

export class BaseService {
    protected _name: string;
    logger;

    constructor(name: string) {
        this._name = name;

        this.logger = childLogger(name);
    }
}
