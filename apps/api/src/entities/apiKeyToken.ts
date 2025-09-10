export interface ApiKeytoken {
    id: string;
    token: string;
    description: string | null;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date | null;
    access_on: Date | null;
    ip: string | null;
}
