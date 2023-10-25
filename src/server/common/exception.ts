import { guidGenerator } from '@/lib/functions/string';
import { HTTP_BAD_REQUEST } from './http-code';

export class TRExeception extends Error {
    id: string = 'TR-' + guidGenerator();
    status: number;

    constructor(message?: string, status?: number) {
        super(message);
        console.log({ id: this.id, error: message });
        this.name = this.constructor.name;
        this.status = status || HTTP_BAD_REQUEST;
    }
}
