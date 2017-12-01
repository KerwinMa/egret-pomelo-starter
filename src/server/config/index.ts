import * as requireDirectory from 'require-directory';
import * as path from 'path';

const NODE_ENV = process.env.NODE_ENV || 'development';
const dirPath = path.resolve(__dirname, `../../../config/${NODE_ENV}`);
const config = <any> requireDirectory(module, dirPath);

export default config;
