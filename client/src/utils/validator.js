export const fileFormatError = 1;
export const fileSizeError = 2;
export const fileSizeLimit = 15 * 1000000;

export const fileUploadValidator = (items) => {
  console.log(items);
  const arrayItem = [...items];
  const regx = /image/;
  if (arrayItem.some((item) => !item.type.match(regx))) {
    return fileFormatError;
  }
  if (arrayItem.some((item) => item.getAsFile().size > fileSizeLimit)) {
    return fileSizeError;
  }
  return 0;
};
