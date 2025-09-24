import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import process from 'process';

export function checkPermissions(requiredPermission: string[]) {
    return (req: any, res: any, next: any) => {
        const userPermissions: string[] = req.body.userSession.permissions;
        let permitted = false;

        if (requiredPermission.length === 0) {
            permitted = true;
        } else {
            if (userPermissions) {
                for (const permission of requiredPermission) {
                    if (userPermissions.includes(permission)) {
                        permitted = true;
                        break;
                    }
                }
            }
        }

        if (permitted) {
            next();
        } else {
            res.status(403).json({
                error: {
                    status: 403,
                    message: 'Forbidden' + requiredPermission.toString(),
                },
            });
        }
    };
}

export async function getSignedUrlBucket(key: string, expiredTimeSeconds = -1): Promise<string> {
    if (process.env.S3_DEFAULT_PERMISSIONS === 'public-read') {
        return key;
    }

    const S3 = new S3Client({
        region: 'auto',
        endpoint: process.env.S3_ENDPOINT,
        credentials: {
            accessKeyId: process.env.S3_APIKEY,
            secretAccessKey: process.env.S3_SECRET,
        },
    });

    const objectName = key.split('https://' + process.env.S3_BUCKET_URL + '/')[1];

    let expiresIn = Number(process.env.S3_SIGNED_URL_EXPIRES_IN);
    if (expiredTimeSeconds > 0) {
        expiresIn = expiredTimeSeconds;
    }

    return await getSignedUrl(S3, new GetObjectCommand({ Bucket: process.env.S3_BUCKET, Key: objectName }), {
        expiresIn,
    });
}

export async function isSignedUrlBucket(key: string): Promise<boolean> {
    return !key.includes('https://' + process.env.S3_BUCKET_URL + '/');
}
