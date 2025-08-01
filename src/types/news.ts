export interface News {
    id?: string;
    title?: string;
    content?: string;
    status?: string;
    publishDate?: string;
    thumbnail?: string;
    category?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface NewsCategory {
    id?: string;
    name?: string;
    slug?: string;
    description?: string;
    parent_id?: string;
    created_at?: string;
    updated_at?: string;
    current?: number;
    pageSize?: number;
}