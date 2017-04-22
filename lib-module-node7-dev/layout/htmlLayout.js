/* eslint-disable jsx-a11y/html-has-lang, prefer-template */
import assetUrl from './assetUrl';
import uneval from './uneval';
import { ReactElementType as _ReactElementType } from '../types';

import t from 'flow-runtime';
const ReactElementType = t.tdz(() => _ReactElementType);
const HelmetDataAttributeType = t.type('HelmetDataAttributeType', t.object(t.property('toString', t.function(t.return(t.string()))), t.property('toComponent', t.function(t.return(t.ref(ReactElementType))))));
const HelmetDataType = t.type('HelmetDataType', t.object(t.property('htmlAttributes', HelmetDataAttributeType), t.property('title', HelmetDataAttributeType), t.property('base', HelmetDataAttributeType), t.property('meta', HelmetDataAttributeType), t.property('link', HelmetDataAttributeType), t.property('script', HelmetDataAttributeType), t.property('style', HelmetDataAttributeType)));


export const LayoutOptionsType = t.type('LayoutOptionsType', t.exactObject(t.property('layoutBody', t.nullable(t.function())), t.property('version', t.string()), t.property('moduleIdentifier', t.nullable(t.string())), t.property('scriptName', t.union(t.string(), t.boolean(false))), t.property('styleName', t.nullable(t.string())), t.property('initialData', t.nullable(t.any())), t.property('initialBrowserContext', t.nullable(t.any())), t.property('polyfillFeatures', t.nullable(t.string()))));

const wrapContent = content => `<div id="react-app">${content}</div>`;

export default (function htmlLayout(helmet, content, {
  layoutBody,
  version,
  moduleIdentifier,
  scriptName,
  styleName,
  initialData,
  initialBrowserContext,
  polyfillFeatures = 'default,es6,es7,localStorage,fetch,Intl'
}) {
  let _contentType = t.string();

  const _returnType = t.return(t.string());

  t.param('helmet', HelmetDataType).assert(helmet);
  t.param('content', _contentType).assert(content);
  return _returnType.assert(`<!doctype html>
<html ${helmet.htmlAttributes.toString()}>
  <head>
    ${helmet.title.toString()}
    ${helmet.meta.toString()}
    ${helmet.link.toString()}
    ${helmet.base.toString()}
    <link rel="stylesheet" href="${assetUrl(`/${styleName || 'index'}.css`, version)}" />
    ${helmet.style.toString()}
    ${polyfillFeatures && `<script defer src="${`https://polyfill.io/v2/polyfill.min.js?features=${polyfillFeatures}&unknown=polyfill`}"></script>`}
    ${helmet.script.toString()}
    ${scriptName === false ? null : `<script>${`${moduleIdentifier ? `window.MODULE_IDENTIFIER='${moduleIdentifier}';` : ''}` + `window.VERSION='${version}';` + `window.initialData=${uneval(initialData)};` + (!initialBrowserContext ? '' : `window.initialBrowserContext=${uneval(initialBrowserContext)};`)}</script>`}
    ${scriptName === false ? null : `<script defer src="${assetUrl(`/${scriptName}.js`, version)}"></script>`}
  </head>
  <body ${helmet.bodyAttributes.toString()}>
    ${layoutBody ? layoutBody(wrapContent(content)) : wrapContent(content)}
  </body>
</html>`);
});
//# sourceMappingURL=htmlLayout.js.map