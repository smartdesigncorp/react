//Dependencias
import {minify} from 'html-minifier';

export function compress(content){
  return minify(content.fn(this),{
    removeComents: true,
    collapseWhitespace: true,
    minifyJS:true
  });
}
