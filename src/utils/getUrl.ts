// not exactly clear if the image source directory would be common for all images

export const constructImgUrl = (url: string, id: string) => {
  const commonUrl = url.substring(0, url.lastIndexOf('/'));
  if (!url) {
    return '';
  }
  return `${commonUrl}/${id}.png`;
};
