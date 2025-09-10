export interface SessionToken {
    userId: string;
    name: string | null;
    surname: string | null;
    permissions: string[] | null;
    tokenId: string;
    apiKeyToken: string;
    defaultCompany: number;
}
