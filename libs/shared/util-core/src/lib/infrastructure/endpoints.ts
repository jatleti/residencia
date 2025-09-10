export class Endpoints {
    static API_DEV = 'http://localhost:3030/v1';
    static API_PROD = 'https://api.noutly.com/v1';

    static DOMAIN_DEV = '.localhost';
    static DOMAIN_PROD = '.noutly.com';

    static PUBLIC_API_DEV = 'http://localhost:3030';
    static PUBLIC_API_PROD = 'https://api.noutly.com';

    public static get API(): string {
        if (window.location.origin.includes('localhost')) {
            return this.API_DEV;
        } else {
            return this.API_PROD;
        }
    }

    public static get BUCKET(): string {
        return 'https://www.witandbit.com/buckets/noutly/';
    }

    public static get DOMAIN(): string {
        if (window.location.origin.includes('localhost')) {
            return this.DOMAIN_DEV;
        } else {
            return this.DOMAIN_PROD;
        }
    }

    public static get PUBLIC_API(): string {
        if (window.location.origin.includes('http://localhost') || window.location.origin.includes('http://192.168.')) {
            return this.PUBLIC_API_DEV;
        } else {
            return this.PUBLIC_API_PROD;
        }
    }
}
