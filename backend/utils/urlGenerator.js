import DataURIParser from 'datauri/parser.js';

import path from 'path';

// const getDataUrl = (file) =>{
//     const parser = new DataURIParser();
//     const extName = path.extname(file.originalName).toString();
//     return parser.format(extName, file.buffer);
// }


const getDataUrl = (file) => {
  if (!file) {
    throw new Error('No file provided');
  }
  const parser = new DataURIParser();
  const extName = path.extname(file.originalname).toString();
  return parser.format(extName, file.buffer);
};

export default getDataUrl;