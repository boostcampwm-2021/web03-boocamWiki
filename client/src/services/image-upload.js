import { fileSizeError, fileFormatError } from '../utils/validator';

export const getImgUrl = async (item, type = 0) => {
  const image = item;
  console.log(item);
  const datas = new FormData();
  datas.append('image', image, image.name);
  const result = await fetch('/api/images', {
    method: 'POST',
    body: datas,
  });
  const url = await result.json();
  const imgUrl = `![${image.name}](${url.imageLink})`;
  if (type === 0) {
    return imgUrl;
  }
  return url.imageLink;
};

export const sendToStorage = async (items) => {
  const itemArray = [...items];
  const result = await Promise.all(itemArray.map((item) => getImgUrl(item)));
  return result;
};

export const showErrorCode = (errorCode) => {
  switch (errorCode) {
    case fileFormatError:
      alert('image 형식의 파일을 올려주세요');
      break;
    case fileSizeError:
      alert('15MB 이하의 이미지만 올려주세요');
      break;
    default:
      break;
  }
};
