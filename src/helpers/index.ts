import { serialize } from 'object-to-formdata';

/* eslint-disable no-plusplus */
export const score = (p: number, n: number): number => {
  if (p === 0 && n === 0) {
    return 0;
  }
  const r =
    ((p + 1.9208) / (p + n) -
      (1.96 * Math.sqrt((p * n) / (p + n) + 0.9604)) / (p + n)) /
    (1 + 3.8416 / (p + n));
  return Number(r.toFixed(2));
};

export const rate = (ratings: number[]): number => {
  if (ratings.length === 0) {
    return 0;
  }

  const sum = ratings.reduce((acc, rating) => acc + rating, 0);

  return sum / ratings.length;
};

export const average = (ratings: number[]): number => {
  if (ratings.length === 0) {
    return 0;
  }

  const sum: number = ratings.reduce((acc, rating) => acc + rating, 0);
  const final = Number(sum / ratings.length).toFixed(1);

  return Number(final);
};

interface IWithCdnOptions {
  w: number;
  h: number;
  q: number;
  img: string;
}
/**
 * With CDN Image Resizer
 * @func
 * @category helpers
 * @param {object} options - image options
 * @param {number} options.w - image width
 * @param {number} options.h - image height
 * @param {number} options.q - image quality
 * @param {string} options.img - image url without protocol
 * @returns {string}
 * @example
 * ```js
 *  withCdn(w: 100, h: 100, q: 100, img: 'http://domain.com/path/to/image.jpg')
 * ```
 */
export const withCdn = (options: IWithCdnOptions): string => {
  const { w, h, q, img } = options;

  if (img === null) {
    return img;
  }

  const cdnUrl = `https://cdn.efectifity.com/img/?w=${w}&h=${h}&q=${
    q || 100
  }&img=${img?.replace('https://', '')}`;

  return cdnUrl;
};

export const convertDate = (datestring: string, showHour: boolean = false) => {
  if (!datestring) {
    return datestring;
  }
  const initialDate = datestring.replace('T', ' ');

  const formattedDate = new Date(initialDate).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
    ...(showHour && {
      hour: '2-digit',
      minute: '2-digit',
    }),
    hour12: true,
  });

  if (formattedDate.toLowerCase() === 'invalid date') {
    return initialDate;
  }

  return formattedDate;
};

export const getFormData = (object: any) => {
  const formData = serialize(object, {
    noAttributesWithArrayNotation: true,
    noFilesWithArrayNotation: true,
  });

  return formData;
};
