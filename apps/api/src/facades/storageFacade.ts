import fs from 'fs';
import { v1 as uuidv1 } from 'uuid';
import sharp from 'sharp';

import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import process from 'process';
import { getSignedUrlBucket } from '../factories/functions.factory';
import { CustomResponse } from '../entities/customresponse';

export class StorageFacade {
    public async addFile(body: any, file: any, path: any): Promise<any> {
        // Create a unique name for the blob
        const aux = file.name.split('.');
        const extension = aux[aux.length - 1];
        const blobName = uuidv1() + '.' + extension;

        // vamos a comprobar que no deja subir archivos que sean scripts svg y demás
        const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'pdf', 'doc', 'docx', 'xls', 'xlsx'];
        if (allowedExtensions.indexOf(extension) === -1) {
            throw <CustomResponse>{
                status: 500,
                message: 'Invalid file extension',
            };
        }

        let defaultPermission: 'private' | 'public-read' = 'private';
        if (process.env.S3_DEFAULT_PERMISSIONS === 'public-read') {
            defaultPermission = 'public-read';
        }

        const S3 = new S3Client({
            region: 'auto',
            endpoint: process.env.S3_ENDPOINT,
            credentials: {
                accessKeyId: process.env.S3_APIKEY,
                secretAccessKey: process.env.S3_SECRET,
            },
        });

        // create buffer file
        const buffer = Buffer.from(file.data);

        await S3.send(
            new PutObjectCommand({
                Body: buffer,
                Bucket: process.env.S3_BUCKET,
                Key: blobName,
                ContentType: file.mimetype,
                ACL: defaultPermission,
            }),
        );

        const fileUrl = 'https://' + process.env.S3_BUCKET_URL + '/' + blobName;

        return {
            name: file.name,
            file: fileUrl,
            signedFile: await getSignedUrlBucket(fileUrl),
        };
    }

    public async addPhoto(body: any, file: any, path: any): Promise<any> {
        // Create a unique name for the blob
        const aux = file.name.split('.');
        const extension = aux[aux.length - 1];
        const blobName = uuidv1() + '.' + extension;

        if (!path) {
            path = 'images';
        }

        let defaultPermission: 'private' | 'public-read' = 'private';
        if (process.env.S3_DEFAULT_PERMISSIONS === 'public-read') {
            defaultPermission = 'public-read';
        }

        const S3 = new S3Client({
            region: 'auto',
            endpoint: process.env.S3_ENDPOINT,
            credentials: {
                accessKeyId: process.env.S3_APIKEY,
                secretAccessKey: process.env.S3_SECRET,
            },
        });

        const imageBuffer = await sharp(file.data)
            .resize({
                width: 300,
                height: 300,
                fit: sharp.fit.cover,
            })
            .toBuffer();
        const metadata = await sharp(imageBuffer).metadata();

        console.log('width: ' + metadata.width);
        console.log('height: ' + metadata.height);

        // buffer to const image
        const image = sharp(imageBuffer);

        const left = Math.max(0, (metadata.width - 300) / 2);
        const top = Math.max(0, (metadata.height - 300) / 2);

        console.log('width: ' + metadata.width);
        console.log('height: ' + metadata.height);
        console.log('left: ' + left);
        console.log('top: ' + top);

        await image
            .extract({ left: Math.round(left), top: Math.round(top), width: 300, height: 300 })
            .toBuffer()
            .then(async (outputBuffer) => {
                try {
                    await S3.send(
                        new PutObjectCommand({
                            Body: outputBuffer,
                            Bucket: process.env.S3_BUCKET,
                            Key: blobName,
                            ContentType: file.mimetype,
                            ACL: defaultPermission,
                        }),
                    );
                } catch (e) {
                    console.log(e);
                    return {};
                }
            })
            .catch((err) => {
                console.error(err);
                throw err;
            });

        const fileUrl = 'https://' + process.env.S3_BUCKET_URL + '/' + blobName;

        return {
            name: file.name,
            file: fileUrl,
            signedFile: await getSignedUrlBucket(fileUrl),
        };
    }
}
