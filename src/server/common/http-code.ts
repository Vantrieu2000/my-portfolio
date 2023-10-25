import { ApiResponse } from '@/lib/types/common';

export const HTTP_OK = 200;
export const HTTP_CREATED = 201;
export const HTTP_ACCEPTED = 202;
export const HTTP_BAD_REQUEST = 400;
export const HTTP_UNAUTHORIZED = 401;
export const HTTP_FORBIDDEN = 403;
export const HTTP_NOT_FOUND = 404;
export const HTTP_METHOD_NOT_ALLOWED = 405;
export const HTTP_CONFLICT = 409;
export const HTTP_UNPROCESSABLE_ENTITY = 422;
export const HTTP_INTERNAL_SERVER_ERROR = 500;

const MESSAGES: { [key: number]: string } = {
    [HTTP_OK]: `Request was successfully completed`,
    [HTTP_CREATED]: `Request was successfully created`,
    [HTTP_ACCEPTED]: `Request was accepted`,
    [HTTP_BAD_REQUEST]: `Bad request`,
    [HTTP_UNAUTHORIZED]: `You are not authorized`,
    [HTTP_FORBIDDEN]: `Forbidden resource`,
    [HTTP_NOT_FOUND]: `Resource not found`,
    [HTTP_METHOD_NOT_ALLOWED]: `Method is not allowed`,
    [HTTP_CONFLICT]: `Resource is conflicted`,
    [HTTP_UNPROCESSABLE_ENTITY]: `This entity cannot be processed`,
    [HTTP_INTERNAL_SERVER_ERROR]: `An error occurred on the server`,
};

export function RESPONSE<T>({
    status = HTTP_OK,
    data,
    message,
    id,
}: {
    status?: number;
    data?: T;
    message?: string;
    id?: string;
}): [ApiResponse<T>, { status: number }] {
    return [
        {
            success: status < 300,
            statusCode: status,
            message: message || MESSAGES[status],
            data,
            id,
        },
        { status },
    ];
}
