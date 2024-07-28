import { Injectable } from '@nestjs/common';
import { v2 as cloudinary, UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';
import * as streamifier from 'streamifier';

@Injectable()
export class CloudinaryService {
  uploadFile(file: Express.Multer.File): Promise<{ public_id: string, secure_url: string }> {
    return new Promise<{ public_id: string, secure_url: string }>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        (error, result: UploadApiResponse) => {
          if (error) {
            return reject(error);
          }
          const { public_id, secure_url } = result;
          resolve({ public_id, secure_url });
        },
      );

      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });
  }
  deleteImageFromCloudinary(public_id: string): Promise<{ result: string }> {
    return new Promise<{ result: string }>((resolve, reject) => {
      cloudinary.uploader.destroy(public_id, (error, result) => {
        if (error) {
          return reject(error);
        }
        resolve(result);
      });
    });
  }
}
