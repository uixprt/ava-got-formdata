import { Base } from './base';

export interface PublicFile extends Base {
  url: string;
  resizeUrl: string;
  type: string;
  fileTypeId: number;
  size: number;
  isPrivate: boolean;
  isPrivateResize: boolean;
  filePath: string;
  filePathResize: string;
  bucketName: string;
}
