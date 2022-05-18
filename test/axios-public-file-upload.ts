import test from 'ava';
import { BASE_URL } from './config/';
import { getAuthorizationToken, uploadPublicFileFromUrl } from './utils';

test.only('public file upload', async (t) => {
  const token = await getAuthorizationToken();
  const fileUrl = `https://faces-img.xcdn.link/thumb-lorem-face-${Math.floor(
    Math.random() * 6796,
  )}_thumb.jpg`;
  const data = await uploadPublicFileFromUrl(fileUrl, BASE_URL, token);

  console.log(data);

  t.deepEqual(Object.keys(data as any), [
    'id',
    'name',
    'url',
    'resizeUrl',
    'type',
    'fileTypeId',
    'size',
    'isPrivate',
    'isPrivateResize',
    'filePath',
    'filePathResize',
    'bucketName',
  ]);
});
