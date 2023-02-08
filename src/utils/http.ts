/**
 * This file is part of ts-node-express-boilerplate.
 * @link     : https://zhaiyiming.com/
 * @author   : Emil Zhai (root@derzh.com)
 * @modifier : Emil Zhai (root@derzh.com)
 * @copyright: Copyright (c) 2018 TINYMINS.
 */

import fs from 'fs';
import path from 'path';

import { ExpressResponse } from '../types';
import { rootPath } from './environment';

export const httpRootPath = path.resolve(rootPath, 'src/wwwroot');

export const findRequestFile = (basePath: string, relativePath: string): string | undefined => {
  let absolutePath = path.resolve(path.join(basePath, relativePath));
  if (relativePath.endsWith('/')) {
    absolutePath += '/';
  }
  if (!absolutePath.startsWith(basePath)) {
    return void 0;
  }
  if (!absolutePath.endsWith('/') && fs.existsSync(absolutePath) && fs.lstatSync(absolutePath).isFile()) {
    return absolutePath;
  }
  let autoAbsolutePath = path.join(absolutePath, 'index.html');
  if (fs.existsSync(autoAbsolutePath) && fs.lstatSync(autoAbsolutePath).isFile()) {
    return autoAbsolutePath;
  }
  autoAbsolutePath = `${absolutePath}.ts`;
  if (fs.existsSync(autoAbsolutePath) && fs.lstatSync(autoAbsolutePath).isFile()) {
    return autoAbsolutePath;
  }
  autoAbsolutePath = `${absolutePath}.js`;
  if (fs.existsSync(autoAbsolutePath) && fs.lstatSync(autoAbsolutePath).isFile()) {
    return autoAbsolutePath;
  }
  autoAbsolutePath = path.join(absolutePath, 'index.ts');
  if (fs.existsSync(autoAbsolutePath) && fs.lstatSync(autoAbsolutePath).isFile()) {
    return autoAbsolutePath;
  }
  return void 0;
};

export const sendFile = (res: ExpressResponse, filePath: string) => {
  res.sendFile(filePath, { dotfiles: 'allow' }, (e) => {
    try {
      if (e) {
        res.status(e.name === 'NotFoundError' ? 404 : 500);
        res.send(e.message);
      } else {
        res.status(500);
      }
    } catch {}
    res.end();
  });
};
