import { IUser } from '@/server/schemas/users';
import { Types } from 'mongoose';

export interface ArticleResponse {
    _id: string;
    title: string;
    type: string;
    image: {
        type: 'image';
        asset: {
            _ref: string;
        };
    };
    description: string;
    author: string;
    readTime: number;
    publishedAt: Date;
    createdAt: Date;
    updatedAt: Date;
    sections: [];
    tags: string[];
}

export interface ArticleDetailResponse {
    article: ArticleResponse;
    more_article: ArticleResponse[];
    article_likes: (IUser | Types.ObjectId)[];
}
