import reloj1 from '../../assets/img/reloj1.webp';
import reloj2 from '../../assets/img/reloj2.png';
import reloj3 from '../../assets/img/reloj3.webp';

const imagesByFilename = {
  'reloj1.jpg': reloj1,
  'reloj1.webp': reloj1,
  'reloj2.jpg': reloj2,
  'reloj2.png': reloj2,
  'reloj3.jpg': reloj3,
  'reloj3.webp': reloj3
};

export const fallbackProductImage = reloj1;

export const resolveProductImage = (image) => {
  if (!image) {
    return fallbackProductImage;
  }

  const filename = image.split('?')[0].split('/').pop()?.toLowerCase();
  return imagesByFilename[filename] || image;
};

export const handleProductImageError = (event) => {
  if (event.currentTarget.src !== fallbackProductImage) {
    event.currentTarget.src = fallbackProductImage;
  }
};
