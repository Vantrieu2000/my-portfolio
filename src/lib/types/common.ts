import { IUser } from '@/server/schemas/users';

export type Pagination = {
    page: string | number;
    pageSize: string | number;
};

export type GenericObject<T = any> = {
    [key: string]: T;
};

export type MetadataOptions = {
    title?: string;
    description?: string;
    image?: string;
};

export type ApiResponse<T> = {
    success: boolean;
    statusCode: number;
    message: string;
    data?: T;
    id?: string;
};

export type SessionUser = { user: Omit<IUser, 'password'> | null } | null;

export type ValueOf<T> = T[keyof T];

export type PageWithSearchParams = {
    searchParams: { [key: string]: string };
};
export type PageWithRouteParams<T extends string[] = string[]> = {
    params: { [key in T[number]]: string };
};

export type JSXChildren = string | JSX.Element | JSX.Element[]
