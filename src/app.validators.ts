import { FileValidator } from '@nestjs/common';
import * as gjv from 'geojson-validation';

export class GeoDataFileValidator extends FileValidator {
  private _error: string[];

  constructor(protected readonly validationOptions: any) {
    super(validationOptions);
  }

  public isValid(file?: Express.Multer.File): boolean {
    try {
      const json = JSON.parse(file.buffer.toString());
      this._error = gjv.valid(json, true);
      return this._error.length === 0;
    } catch (error) {
      return false;
    }
  }

  public buildErrorMessage(): string {
    return this._error.toString();
  }
}
