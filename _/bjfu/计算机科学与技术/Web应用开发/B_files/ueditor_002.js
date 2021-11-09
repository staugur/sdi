(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){var FilterCSS=require("cssfilter").FilterCSS;var _=require("./util");function getDefaultWhiteList(){return{a:["target","href","title"],abbr:["title"],address:[],area:["shape","coords","href","alt"],article:[],aside:[],audio:["autoplay","controls","loop","preload","src"],b:[],bdi:["dir"],bdo:["dir"],big:[],blockquote:["cite"],br:[],caption:[],center:[],cite:[],code:[],col:["align","valign","span","width"],colgroup:["align","valign","span","width"],dd:[],del:["datetime"],details:["open"],div:[],dl:[],dt:[],em:[],font:["color","size","face"],footer:[],h1:[],h2:[],h3:[],h4:[],h5:[],h6:[],header:[],hr:[],i:[],img:["src","alt","title","width","height"],ins:["datetime"],li:[],mark:[],nav:[],ol:[],p:[],pre:[],s:[],section:[],small:[],span:[],sub:[],sup:[],strong:[],table:["width","border","align","valign"],tbody:["align","valign"],td:["width","rowspan","colspan","align","valign"],tfoot:["align","valign"],th:["width","rowspan","colspan","align","valign"],thead:["align","valign"],tr:["rowspan","align","valign"],tt:[],u:[],ul:[],video:["autoplay","controls","loop","preload","src","height","width"]}}var defaultCSSFilter=new FilterCSS;function onTag(tag,html,options){}function onIgnoreTag(tag,html,options){}function onTagAttr(tag,name,value){}function onIgnoreTagAttr(tag,name,value){}function escapeHtml(html){return html.replace(REGEXP_LT,"&lt;").replace(REGEXP_GT,"&gt;")}function safeAttrValue(tag,name,value,cssFilter){cssFilter=cssFilter||defaultCSSFilter;value=friendlyAttrValue(value);if(name==="href"||name==="src"){value=_.trim(value);if(value==="#")return"#";if(!(value.substr(0,7)==="http://"||value.substr(0,8)==="https://"||value.substr(0,7)==="mailto:"||value[0]==="#"||value[0]==="/")){return""}}else if(name==="background"){REGEXP_DEFAULT_ON_TAG_ATTR_4.lastIndex=0;if(REGEXP_DEFAULT_ON_TAG_ATTR_4.test(value)){return""}}else if(name==="style"){REGEXP_DEFAULT_ON_TAG_ATTR_7.lastIndex=0;if(REGEXP_DEFAULT_ON_TAG_ATTR_7.test(value)){return""}REGEXP_DEFAULT_ON_TAG_ATTR_8.lastIndex=0;if(REGEXP_DEFAULT_ON_TAG_ATTR_8.test(value)){REGEXP_DEFAULT_ON_TAG_ATTR_4.lastIndex=0;if(REGEXP_DEFAULT_ON_TAG_ATTR_4.test(value)){return""}}value=cssFilter.process(value)}value=escapeAttrValue(value);return value}var REGEXP_LT=/</g;var REGEXP_GT=/>/g;var REGEXP_QUOTE=/"/g;var REGEXP_QUOTE_2=/&quot;/g;var REGEXP_ATTR_VALUE_1=/&#([a-zA-Z0-9]*);?/gim;var REGEXP_ATTR_VALUE_COLON=/&colon;?/gim;var REGEXP_ATTR_VALUE_NEWLINE=/&newline;?/gim;var REGEXP_DEFAULT_ON_TAG_ATTR_3=/\/\*|\*\//gm;var REGEXP_DEFAULT_ON_TAG_ATTR_4=/((j\s*a\s*v\s*a|v\s*b|l\s*i\s*v\s*e)\s*s\s*c\s*r\s*i\s*p\s*t\s*|m\s*o\s*c\s*h\s*a)\:/gi;var REGEXP_DEFAULT_ON_TAG_ATTR_5=/^[\s"'`]*(d\s*a\s*t\s*a\s*)\:/gi;var REGEXP_DEFAULT_ON_TAG_ATTR_6=/^[\s"'`]*(d\s*a\s*t\s*a\s*)\:\s*image\//gi;var REGEXP_DEFAULT_ON_TAG_ATTR_7=/e\s*x\s*p\s*r\s*e\s*s\s*s\s*i\s*o\s*n\s*\(.*/gi;var REGEXP_DEFAULT_ON_TAG_ATTR_8=/u\s*r\s*l\s*\(.*/gi;function escapeQuote(str){return str.replace(REGEXP_QUOTE,"&quot;")}function unescapeQuote(str){return str.replace(REGEXP_QUOTE_2,'"')}function escapeHtmlEntities(str){return str.replace(REGEXP_ATTR_VALUE_1,function replaceUnicode(str,code){return code[0]==="x"||code[0]==="X"?String.fromCharCode(parseInt(code.substr(1),16)):String.fromCharCode(parseInt(code,10))})}function escapeDangerHtml5Entities(str){return str.replace(REGEXP_ATTR_VALUE_COLON,":").replace(REGEXP_ATTR_VALUE_NEWLINE," ")}function clearNonPrintableCharacter(str){var str2="";for(var i=0,len=str.length;i<len;i++){str2+=str.charCodeAt(i)<32?" ":str.charAt(i)}return _.trim(str2)}function friendlyAttrValue(str){str=unescapeQuote(str);str=escapeHtmlEntities(str);str=escapeDangerHtml5Entities(str);str=clearNonPrintableCharacter(str);return str}function escapeAttrValue(str){str=escapeQuote(str);str=escapeHtml(str);return str}function onIgnoreTagStripAll(){return""}function StripTagBody(tags,next){if(typeof next!=="function"){next=function(){}}var isRemoveAllTag=!Array.isArray(tags);function isRemoveTag(tag){if(isRemoveAllTag)return true;return _.indexOf(tags,tag)!==-1}var removeList=[];var posStart=false;return{onIgnoreTag:function(tag,html,options){if(isRemoveTag(tag)){if(options.isClosing){var ret="[/removed]";var end=options.position+ret.length;removeList.push([posStart!==false?posStart:options.position,end]);posStart=false;return ret}else{if(!posStart){posStart=options.position}return"[removed]"}}else{return next(tag,html,options)}},remove:function(html){var rethtml="";var lastPos=0;_.forEach(removeList,function(pos){rethtml+=html.slice(lastPos,pos[0]);lastPos=pos[1]});rethtml+=html.slice(lastPos);return rethtml}}}function stripCommentTag(html){return html.replace(STRIP_COMMENT_TAG_REGEXP,"")}var STRIP_COMMENT_TAG_REGEXP=/<!--[\s\S]*?-->/g;function stripBlankChar(html){var chars=html.split("");chars=chars.filter(function(char){var c=char.charCodeAt(0);if(c===127)return false;if(c<=31){if(c===10||c===13)return true;return false}return true});return chars.join("")}exports.whiteList=getDefaultWhiteList();exports.getDefaultWhiteList=getDefaultWhiteList;exports.onTag=onTag;exports.onIgnoreTag=onIgnoreTag;exports.onTagAttr=onTagAttr;exports.onIgnoreTagAttr=onIgnoreTagAttr;exports.safeAttrValue=safeAttrValue;exports.escapeHtml=escapeHtml;exports.escapeQuote=escapeQuote;exports.unescapeQuote=unescapeQuote;exports.escapeHtmlEntities=escapeHtmlEntities;exports.escapeDangerHtml5Entities=escapeDangerHtml5Entities;exports.clearNonPrintableCharacter=clearNonPrintableCharacter;exports.friendlyAttrValue=friendlyAttrValue;exports.escapeAttrValue=escapeAttrValue;exports.onIgnoreTagStripAll=onIgnoreTagStripAll;exports.StripTagBody=StripTagBody;exports.stripCommentTag=stripCommentTag;exports.stripBlankChar=stripBlankChar;exports.cssFilter=defaultCSSFilter},{"./util":4,cssfilter:8}],2:[function(require,module,exports){var DEFAULT=require("./default");var parser=require("./parser");var FilterXSS=require("./xss");function filterXSS(html,options){var xss=new FilterXSS(options);return xss.process(html)}exports=module.exports=filterXSS;exports.FilterXSS=FilterXSS;for(var i in DEFAULT)exports[i]=DEFAULT[i];for(var i in parser)exports[i]=parser[i];if(typeof window!=="undefined"){window.filterXSS=module.exports}},{"./default":1,"./parser":3,"./xss":5}],3:[function(require,module,exports){var _=require("./util");function getTagName(html){var i=html.indexOf(" ");if(i===-1){var tagName=html.slice(1,-1)}else{var tagName=html.slice(1,i+1)}tagName=_.trim(tagName).toLowerCase();if(tagName.slice(0,1)==="/")tagName=tagName.slice(1);if(tagName.slice(-1)==="/")tagName=tagName.slice(0,-1);return tagName}function isClosing(html){return html.slice(0,2)==="</"}function parseTag(html,onTag,escapeHtml){"user strict";var rethtml="";var lastPos=0;var tagStart=false;var quoteStart=false;var currentPos=0;var len=html.length;var currentHtml="";var currentTagName="";for(currentPos=0;currentPos<len;currentPos++){var c=html.charAt(currentPos);if(tagStart===false){if(c==="<"){tagStart=currentPos;continue}}else{if(quoteStart===false){if(c==="<"){rethtml+=escapeHtml(html.slice(lastPos,currentPos));tagStart=currentPos;lastPos=currentPos;continue}if(c===">"){rethtml+=escapeHtml(html.slice(lastPos,tagStart));currentHtml=html.slice(tagStart,currentPos+1);currentTagName=getTagName(currentHtml);rethtml+=onTag(tagStart,rethtml.length,currentTagName,currentHtml,isClosing(currentHtml));lastPos=currentPos+1;tagStart=false;continue}if((c==='"'||c==="'")&&html.charAt(currentPos-1)==="="){quoteStart=c;continue}}else{if(c===quoteStart){quoteStart=false;continue}}}}if(lastPos<html.length){rethtml+=escapeHtml(html.substr(lastPos))}return rethtml}var REGEXP_ATTR_NAME=/[^a-zA-Z0-9_:\.\-]/gim;function parseAttr(html,onAttr){"user strict";var lastPos=0;var retAttrs=[];var tmpName=false;var len=html.length;function addAttr(name,value){name=_.trim(name);name=name.replace(REGEXP_ATTR_NAME,"").toLowerCase();if(name.length<1)return;var ret=onAttr(name,value||"");if(ret)retAttrs.push(ret)}for(var i=0;i<len;i++){var c=html.charAt(i);var v,j;if(tmpName===false&&c==="="){tmpName=html.slice(lastPos,i);lastPos=i+1;continue}if(tmpName!==false){if(i===lastPos&&(c==='"'||c==="'")&&html.charAt(i-1)==="="){j=html.indexOf(c,i+1);if(j===-1){break}else{v=_.trim(html.slice(lastPos+1,j));addAttr(tmpName,v);tmpName=false;i=j;lastPos=i+1;continue}}}if(c===" "){if(tmpName===false){j=findNextEqual(html,i);if(j===-1){v=_.trim(html.slice(lastPos,i));addAttr(v);tmpName=false;lastPos=i+1;continue}else{i=j-1;continue}}else{j=findBeforeEqual(html,i-1);if(j===-1){v=_.trim(html.slice(lastPos,i));v=stripQuoteWrap(v);addAttr(tmpName,v);tmpName=false;lastPos=i+1;continue}else{continue}}}}if(lastPos<html.length){if(tmpName===false){addAttr(html.slice(lastPos))}else{addAttr(tmpName,stripQuoteWrap(_.trim(html.slice(lastPos))))}}return _.trim(retAttrs.join(" "))}function findNextEqual(str,i){for(;i<str.length;i++){var c=str[i];if(c===" ")continue;if(c==="=")return i;return-1}}function findBeforeEqual(str,i){for(;i>0;i--){var c=str[i];if(c===" ")continue;if(c==="=")return i;return-1}}function isQuoteWrapString(text){if(text[0]==='"'&&text[text.length-1]==='"'||text[0]==="'"&&text[text.length-1]==="'"){return true}else{return false}}function stripQuoteWrap(text){if(isQuoteWrapString(text)){return text.substr(1,text.length-2)}else{return text}}exports.parseTag=parseTag;exports.parseAttr=parseAttr},{"./util":4}],4:[function(require,module,exports){module.exports={indexOf:function(arr,item){var i,j;if(Array.prototype.indexOf){return arr.indexOf(item)}for(i=0,j=arr.length;i<j;i++){if(arr[i]===item){return i}}return-1},forEach:function(arr,fn,scope){var i,j;if(Array.prototype.forEach){return arr.forEach(fn,scope)}for(i=0,j=arr.length;i<j;i++){fn.call(scope,arr[i],i,arr)}},trim:function(str){if(String.prototype.trim){return str.trim()}return str.replace(/(^\s*)|(\s*$)/g,"")}}},{}],5:[function(require,module,exports){var FilterCSS=require("cssfilter").FilterCSS;var DEFAULT=require("./default");var parser=require("./parser");var parseTag=parser.parseTag;var parseAttr=parser.parseAttr;var _=require("./util");function isNull(obj){return obj===undefined||obj===null}function getAttrs(html){var i=html.indexOf(" ");if(i===-1){return{html:"",closing:html[html.length-2]==="/"}}html=_.trim(html.slice(i+1,-1));var isClosing=html[html.length-1]==="/";if(isClosing)html=_.trim(html.slice(0,-1));return{html:html,closing:isClosing}}function FilterXSS(options){options=options||{};if(options.stripIgnoreTag){if(options.onIgnoreTag){console.error('Notes: cannot use these two options "stripIgnoreTag" and "onIgnoreTag" at the same time')}options.onIgnoreTag=DEFAULT.onIgnoreTagStripAll}options.whiteList=options.whiteList||DEFAULT.whiteList;options.onTag=options.onTag||DEFAULT.onTag;options.onTagAttr=options.onTagAttr||DEFAULT.onTagAttr;options.onIgnoreTag=options.onIgnoreTag||DEFAULT.onIgnoreTag;options.onIgnoreTagAttr=options.onIgnoreTagAttr||DEFAULT.onIgnoreTagAttr;options.safeAttrValue=options.safeAttrValue||DEFAULT.safeAttrValue;options.escapeHtml=options.escapeHtml||DEFAULT.escapeHtml;options.css=options.css||{};this.options=options;this.cssFilter=new FilterCSS(options.css)}FilterXSS.prototype.process=function(html){html=html||"";html=html.toString();if(!html)return"";var me=this;var options=me.options;var whiteList=options.whiteList;var onTag=options.onTag;var onIgnoreTag=options.onIgnoreTag;var onTagAttr=options.onTagAttr;var onIgnoreTagAttr=options.onIgnoreTagAttr;var safeAttrValue=options.safeAttrValue;var escapeHtml=options.escapeHtml;var cssFilter=me.cssFilter;if(options.stripBlankChar){html=DEFAULT.stripBlankChar(html)}if(!options.allowCommentTag){html=DEFAULT.stripCommentTag(html)}var stripIgnoreTagBody=false;if(options.stripIgnoreTagBody){var stripIgnoreTagBody=DEFAULT.StripTagBody(options.stripIgnoreTagBody,onIgnoreTag);onIgnoreTag=stripIgnoreTagBody.onIgnoreTag}var retHtml=parseTag(html,function(sourcePosition,position,tag,html,isClosing){var info={sourcePosition:sourcePosition,position:position,isClosing:isClosing,isWhite:tag in whiteList};var ret=onTag(tag,html,info);if(!isNull(ret))return ret;if(info.isWhite){if(info.isClosing){return"</"+tag+">"}var attrs=getAttrs(html);var whiteAttrList=whiteList[tag];var attrsHtml=parseAttr(attrs.html,function(name,value){var isWhiteAttr=_.indexOf(whiteAttrList,name)!==-1;var ret=onTagAttr(tag,name,value,isWhiteAttr);if(!isNull(ret))return ret;if(isWhiteAttr){value=safeAttrValue(tag,name,value,cssFilter);if(value){return name+'="'+value+'"'}else{return name}}else{var ret=onIgnoreTagAttr(tag,name,value,isWhiteAttr);if(!isNull(ret))return ret;return}});var html="<"+tag;if(attrsHtml)html+=" "+attrsHtml;if(attrs.closing)html+=" /";html+=">";return html}else{var ret=onIgnoreTag(tag,html,info);if(!isNull(ret))return ret;return escapeHtml(html)}},escapeHtml);if(stripIgnoreTagBody){retHtml=stripIgnoreTagBody.remove(retHtml)}return retHtml};module.exports=FilterXSS},{"./default":1,"./parser":3,"./util":4,cssfilter:8}],6:[function(require,module,exports){var DEFAULT=require("./default");var parseStyle=require("./parser");var _=require("./util");function isNull(obj){return obj===undefined||obj===null}function FilterCSS(options){options=options||{};options.whiteList=options.whiteList||DEFAULT.whiteList;options.onAttr=options.onAttr||DEFAULT.onAttr;options.onIgnoreAttr=options.onIgnoreAttr||DEFAULT.onIgnoreAttr;this.options=options}FilterCSS.prototype.process=function(css){css=css||"";css=css.toString();if(!css)return"";var me=this;var options=me.options;var whiteList=options.whiteList;var onAttr=options.onAttr;var onIgnoreAttr=options.onIgnoreAttr;var retCSS=parseStyle(css,function(sourcePosition,position,name,value,source){var check=whiteList[name];var isWhite=false;if(check===true)isWhite=check;else if(typeof check==="function")isWhite=check(value);else if(check instanceof RegExp)isWhite=check.test(value);if(isWhite!==true)isWhite=false;var opts={position:position,sourcePosition:sourcePosition,source:source,isWhite:isWhite};if(isWhite){var ret=onAttr(name,value,opts);if(isNull(ret)){return name+":"+value}else{return ret}}else{var ret=onIgnoreAttr(name,value,opts);if(!isNull(ret)){return ret}}});return retCSS};module.exports=FilterCSS},{"./default":7,"./parser":9,"./util":10}],7:[function(require,module,exports){function getDefaultWhiteList(){var whiteList={};whiteList["align-content"]=false;whiteList["align-items"]=false;whiteList["align-self"]=false;whiteList["alignment-adjust"]=false;whiteList["alignment-baseline"]=false;whiteList["all"]=false;whiteList["anchor-point"]=false;whiteList["animation"]=false;whiteList["animation-delay"]=false;whiteList["animation-direction"]=false;whiteList["animation-duration"]=false;whiteList["animation-fill-mode"]=false;whiteList["animation-iteration-count"]=false;whiteList["animation-name"]=false;whiteList["animation-play-state"]=false;whiteList["animation-timing-function"]=false;whiteList["azimuth"]=false;whiteList["backface-visibility"]=false;whiteList["background"]=true;whiteList["background-attachment"]=true;whiteList["background-clip"]=true;whiteList["background-color"]=true;whiteList["background-image"]=true;whiteList["background-origin"]=true;whiteList["background-position"]=true;whiteList["background-repeat"]=true;whiteList["background-size"]=true;whiteList["baseline-shift"]=false;whiteList["binding"]=false;whiteList["bleed"]=false;whiteList["bookmark-label"]=false;whiteList["bookmark-level"]=false;whiteList["bookmark-state"]=false;whiteList["border"]=true;whiteList["border-bottom"]=true;whiteList["border-bottom-color"]=true;whiteList["border-bottom-left-radius"]=true;whiteList["border-bottom-right-radius"]=true;whiteList["border-bottom-style"]=true;whiteList["border-bottom-width"]=true;whiteList["border-collapse"]=true;whiteList["border-color"]=true;whiteList["border-image"]=true;whiteList["border-image-outset"]=true;whiteList["border-image-repeat"]=true;whiteList["border-image-slice"]=true;whiteList["border-image-source"]=true;whiteList["border-image-width"]=true;whiteList["border-left"]=true;whiteList["border-left-color"]=true;whiteList["border-left-style"]=true;whiteList["border-left-width"]=true;whiteList["border-radius"]=true;whiteList["border-right"]=true;whiteList["border-right-color"]=true;whiteList["border-right-style"]=true;whiteList["border-right-width"]=true;whiteList["border-spacing"]=true;whiteList["border-style"]=true;whiteList["border-top"]=true;whiteList["border-top-color"]=true;whiteList["border-top-left-radius"]=true;whiteList["border-top-right-radius"]=true;whiteList["border-top-style"]=true;whiteList["border-top-width"]=true;whiteList["border-width"]=true;whiteList["bottom"]=false;whiteList["box-decoration-break"]=true;whiteList["box-shadow"]=true;whiteList["box-sizing"]=true;whiteList["box-snap"]=true;whiteList["box-suppress"]=true;whiteList["break-after"]=true;whiteList["break-before"]=true;whiteList["break-inside"]=true;whiteList["caption-side"]=false;whiteList["chains"]=false;whiteList["clear"]=true;whiteList["clip"]=false;whiteList["clip-path"]=false;whiteList["clip-rule"]=false;whiteList["color"]=true;whiteList["color-interpolation-filters"]=true;whiteList["column-count"]=false;whiteList["column-fill"]=false;whiteList["column-gap"]=false;whiteList["column-rule"]=false;whiteList["column-rule-color"]=false;whiteList["column-rule-style"]=false;whiteList["column-rule-width"]=false;whiteList["column-span"]=false;whiteList["column-width"]=false;whiteList["columns"]=false;whiteList["contain"]=false;whiteList["content"]=false;whiteList["counter-increment"]=false;whiteList["counter-reset"]=false;whiteList["counter-set"]=false;whiteList["crop"]=false;whiteList["cue"]=false;whiteList["cue-after"]=false;whiteList["cue-before"]=false;whiteList["cursor"]=false;whiteList["direction"]=false;whiteList["display"]=true;whiteList["display-inside"]=true;whiteList["display-list"]=true;whiteList["display-outside"]=true;whiteList["dominant-baseline"]=false;whiteList["elevation"]=false;whiteList["empty-cells"]=false;whiteList["filter"]=false;whiteList["flex"]=false;whiteList["flex-basis"]=false;whiteList["flex-direction"]=false;whiteList["flex-flow"]=false;whiteList["flex-grow"]=false;whiteList["flex-shrink"]=false;whiteList["flex-wrap"]=false;whiteList["float"]=false;whiteList["float-offset"]=false;whiteList["flood-color"]=false;whiteList["flood-opacity"]=false;whiteList["flow-from"]=false;whiteList["flow-into"]=false;whiteList["font"]=true;whiteList["font-family"]=true;whiteList["font-feature-settings"]=true;whiteList["font-kerning"]=true;whiteList["font-language-override"]=true;whiteList["font-size"]=true;whiteList["font-size-adjust"]=true;whiteList["font-stretch"]=true;whiteList["font-style"]=true;whiteList["font-synthesis"]=true;whiteList["font-variant"]=true;whiteList["font-variant-alternates"]=true;whiteList["font-variant-caps"]=true;whiteList["font-variant-east-asian"]=true;whiteList["font-variant-ligatures"]=true;whiteList["font-variant-numeric"]=true;whiteList["font-variant-position"]=true;whiteList["font-weight"]=true;whiteList["grid"]=false;whiteList["grid-area"]=false;whiteList["grid-auto-columns"]=false;whiteList["grid-auto-flow"]=false;whiteList["grid-auto-rows"]=false;whiteList["grid-column"]=false;whiteList["grid-column-end"]=false;whiteList["grid-column-start"]=false;whiteList["grid-row"]=false;whiteList["grid-row-end"]=false;whiteList["grid-row-start"]=false;whiteList["grid-template"]=false;whiteList["grid-template-areas"]=false;whiteList["grid-template-columns"]=false;whiteList["grid-template-rows"]=false;whiteList["hanging-punctuation"]=false;whiteList["height"]=true;whiteList["hyphens"]=false;whiteList["icon"]=false;whiteList["image-orientation"]=false;whiteList["image-resolution"]=false;whiteList["ime-mode"]=false;whiteList["initial-letters"]=false;whiteList["inline-box-align"]=false;whiteList["justify-content"]=false;whiteList["justify-items"]=false;whiteList["justify-self"]=false;whiteList["left"]=false;whiteList["letter-spacing"]=true;whiteList["lighting-color"]=true;whiteList["line-box-contain"]=false;whiteList["line-break"]=false;whiteList["line-grid"]=false;whiteList["line-height"]=false;whiteList["line-snap"]=false;whiteList["line-stacking"]=false;whiteList["line-stacking-ruby"]=false;whiteList["line-stacking-shift"]=false;whiteList["line-stacking-strategy"]=false;whiteList["list-style"]=true;whiteList["list-style-image"]=true;whiteList["list-style-position"]=true;whiteList["list-style-type"]=true;whiteList["margin"]=true;whiteList["margin-bottom"]=true;whiteList["margin-left"]=true;whiteList["margin-right"]=true;whiteList["margin-top"]=true;whiteList["marker-offset"]=false;whiteList["marker-side"]=false;whiteList["marks"]=false;whiteList["mask"]=false;whiteList["mask-box"]=false;whiteList["mask-box-outset"]=false;whiteList["mask-box-repeat"]=false;whiteList["mask-box-slice"]=false;whiteList["mask-box-source"]=false;whiteList["mask-box-width"]=false;whiteList["mask-clip"]=false;whiteList["mask-image"]=false;whiteList["mask-origin"]=false;whiteList["mask-position"]=false;whiteList["mask-repeat"]=false;whiteList["mask-size"]=false;whiteList["mask-source-type"]=false;whiteList["mask-type"]=false;whiteList["max-height"]=true;whiteList["max-lines"]=false;whiteList["max-width"]=true;whiteList["min-height"]=true;whiteList["min-width"]=true;whiteList["move-to"]=false;whiteList["nav-down"]=false;whiteList["nav-index"]=false;whiteList["nav-left"]=false;whiteList["nav-right"]=false;whiteList["nav-up"]=false;whiteList["object-fit"]=false;whiteList["object-position"]=false;whiteList["opacity"]=false;whiteList["order"]=false;whiteList["orphans"]=false;whiteList["outline"]=false;whiteList["outline-color"]=false;whiteList["outline-offset"]=false;whiteList["outline-style"]=false;whiteList["outline-width"]=false;whiteList["overflow"]=false;whiteList["overflow-wrap"]=false;whiteList["overflow-x"]=false;whiteList["overflow-y"]=false;whiteList["padding"]=true;whiteList["padding-bottom"]=true;whiteList["padding-left"]=true;whiteList["padding-right"]=true;whiteList["padding-top"]=true;whiteList["page"]=false;whiteList["page-break-after"]=false;whiteList["page-break-before"]=false;whiteList["page-break-inside"]=false;whiteList["page-policy"]=false;whiteList["pause"]=false;whiteList["pause-after"]=false;whiteList["pause-before"]=false;whiteList["perspective"]=false;whiteList["perspective-origin"]=false;whiteList["pitch"]=false;whiteList["pitch-range"]=false;whiteList["play-during"]=false;whiteList["position"]=false;whiteList["presentation-level"]=false;whiteList["quotes"]=false;whiteList["region-fragment"]=false;whiteList["resize"]=false;whiteList["rest"]=false;whiteList["rest-after"]=false;whiteList["rest-before"]=false;whiteList["richness"]=false;whiteList["right"]=false;whiteList["rotation"]=false;whiteList["rotation-point"]=false;whiteList["ruby-align"]=false;whiteList["ruby-merge"]=false;whiteList["ruby-position"]=false;whiteList["shape-image-threshold"]=false;whiteList["shape-outside"]=false;whiteList["shape-margin"]=false;whiteList["size"]=false;whiteList["speak"]=false;whiteList["speak-as"]=false;whiteList["speak-header"]=false;whiteList["speak-numeral"]=false;whiteList["speak-punctuation"]=false;whiteList["speech-rate"]=false;whiteList["stress"]=false;whiteList["string-set"]=false;whiteList["tab-size"]=false;whiteList["table-layout"]=false;whiteList["text-align"]=true;whiteList["text-align-last"]=true;whiteList["text-combine-upright"]=true;whiteList["text-decoration"]=true;whiteList["text-decoration-color"]=true;whiteList["text-decoration-line"]=true;whiteList["text-decoration-skip"]=true;whiteList["text-decoration-style"]=true;whiteList["text-emphasis"]=true;whiteList["text-emphasis-color"]=true;whiteList["text-emphasis-position"]=true;whiteList["text-emphasis-style"]=true;whiteList["text-height"]=true;whiteList["text-indent"]=true;whiteList["text-justify"]=true;whiteList["text-orientation"]=true;whiteList["text-overflow"]=true;whiteList["text-shadow"]=true;whiteList["text-space-collapse"]=true;whiteList["text-transform"]=true;whiteList["text-underline-position"]=true;whiteList["text-wrap"]=true;whiteList["top"]=false;whiteList["transform"]=false;whiteList["transform-origin"]=false;whiteList["transform-style"]=false;whiteList["transition"]=false;whiteList["transition-delay"]=false;whiteList["transition-duration"]=false;whiteList["transition-property"]=false;whiteList["transition-timing-function"]=false;whiteList["unicode-bidi"]=false;whiteList["vertical-align"]=false;whiteList["visibility"]=false;whiteList["voice-balance"]=false;whiteList["voice-duration"]=false;whiteList["voice-family"]=false;whiteList["voice-pitch"]=false;whiteList["voice-range"]=false;whiteList["voice-rate"]=false;whiteList["voice-stress"]=false;whiteList["voice-volume"]=false;whiteList["volume"]=false;whiteList["white-space"]=false;whiteList["widows"]=false;whiteList["width"]=true;whiteList["will-change"]=false;whiteList["word-break"]=true;whiteList["word-spacing"]=true;whiteList["word-wrap"]=true;whiteList["wrap-flow"]=false;whiteList["wrap-through"]=false;whiteList["writing-mode"]=false;whiteList["z-index"]=false;return whiteList}function onAttr(name,value,options){}function onIgnoreAttr(name,value,options){}exports.whiteList=getDefaultWhiteList();exports.getDefaultWhiteList=getDefaultWhiteList;exports.onAttr=onAttr;exports.onIgnoreAttr=onIgnoreAttr},{}],8:[function(require,module,exports){var DEFAULT=require("./default");var FilterCSS=require("./css");function filterCSS(html,options){var xss=new FilterCSS(options);return xss.process(html)}exports=module.exports=filterCSS;exports.FilterCSS=FilterCSS;for(var i in DEFAULT)exports[i]=DEFAULT[i];if(typeof window!=="undefined"){window.filterCSS=module.exports}},{"./css":6,"./default":7}],9:[function(require,module,exports){var _=require("./util");function parseStyle(css,onAttr){css=_.trimRight(css);if(css[css.length-1]!==";")css+=";";var cssLength=css.length;var isParenthesisOpen=false;var lastPos=0;var i=0;var retCSS="";function addNewAttr(){if(!isParenthesisOpen){var source=_.trim(css.slice(lastPos,i));var j=source.indexOf(":");if(j!==-1){var name=_.trim(source.slice(0,j));var value=_.trim(source.slice(j+1));if(name){var ret=onAttr(lastPos,retCSS.length,name,value,source);if(ret)retCSS+=ret+"; "}}}lastPos=i+1}for(;i<cssLength;i++){var c=css[i];if(c==="/"&&css[i+1]==="*"){var j=css.indexOf("*/",i+2);if(j===-1)break;i=j+1;lastPos=i+1;isParenthesisOpen=false}else if(c==="("){isParenthesisOpen=true}else if(c===")"){isParenthesisOpen=false}else if(c===";"){if(isParenthesisOpen){}else{addNewAttr()}}else if(c==="\n"){addNewAttr()}}return _.trim(retCSS)}module.exports=parseStyle},{"./util":10}],10:[function(require,module,exports){module.exports={indexOf:function(arr,item){var i,j;if(Array.prototype.indexOf){return arr.indexOf(item)}for(i=0,j=arr.length;i<j;i++){if(arr[i]===item){return i}}return-1},forEach:function(arr,fn,scope){var i,j;if(Array.prototype.forEach){return arr.forEach(fn,scope)}for(i=0,j=arr.length;i<j;i++){fn.call(scope,arr[i],i,arr)}},trim:function(str){if(String.prototype.trim){return str.trim()}return str.replace(/(^\s*)|(\s*$)/g,"")},trimRight:function(str){if(String.prototype.trimRight){return str.trimRight()}return str.replace(/(\s*$)/g,"")}}},{}]},{},[2]);
! function() {
	function getListener(a, b, c) {
		var d;
		return b = b.toLowerCase(), (d = a.__allListeners || c && (a.__allListeners = {})) && (d[b] || c && (d[b] = []))
	}

	function getDomNode(a, b, c, d, e, f) {
		var h, g = d && a[b];
		for (!g && (g = a[c]); !g && (h = (h || a).parentNode);) {
			if ("BODY" == h.tagName || f && !f(h)) return null;
			g = h[c]
		}
		return g && e && !e(g) ? getDomNode(g, b, c, !1, e) : g
	}
	var baidu, dom, browser, ie, webkit, gecko, opera, utils, EventBase, dtd, attrFix, styleBlock, domUtils, fillCharReg, filterWord, htmlparser, filterNode, keymap, LocalStorage;
	UEDITOR_CONFIG = window.UEDITOR_CONFIG || {}, baidu = window.baidu || {}, window.baidu = baidu, window.UE = baidu.editor = window.UE || {}, UE.plugins = {}, UE.commands = {}, UE.instants = {}, UE.I18N = {}, UE._customizeUI = {}, UE.version = "1.4.3", dom = UE.dom = {}, browser = UE.browser = function() {
			var d, e, f, g, a = navigator.userAgent.toLowerCase(),
				b = window.opera,
				c = {
					ie: /(msie\s|trident.*rv:)([\w.]+)/.test(a),
					opera: !!b && b.version,
					webkit: a.indexOf(" applewebkit/") > -1,
					mac: a.indexOf("macintosh") > -1,
					quirks: "BackCompat" == document.compatMode
				};
			return c.gecko = "Gecko" == navigator.product && !c.webkit && !c.opera && !c.ie, d = 0, c.ie && (e = a.match(/(?:msie\s([\w.]+))/), f = a.match(/(?:trident.*rv:([\w.]+))/), d = e && f && e[1] && f[1] ? Math.max(1 * e[1], 1 * f[1]) : e && e[1] ? 1 * e[1] : f && f[1] ? 1 * f[1] : 0, c.ie11Compat = 11 == document.documentMode, c.ie9Compat = 9 == document.documentMode, c.ie8 = !!document.documentMode, c.ie8Compat = 8 == document.documentMode, c.ie7Compat = 7 == d && !document.documentMode || 7 == document.documentMode, c.ie6Compat = 7 > d || c.quirks, c.ie9above = d > 8, c.ie9below = 9 > d, c.ie11above = d > 10, c.ie11below = 11 > d), c.gecko && (g = a.match(/rv:([\d\.]+)/), g && (g = g[1].split("."), d = 1e4 * g[0] + 100 * (g[1] || 0) + 1 * (g[2] || 0))), /chrome\/(\d+\.\d)/i.test(a) && (c.chrome = +RegExp["$1"]), /(\d+\.\d)?(?:\.\d)?\s+safari\/?(\d+\.\d+)?/i.test(a) && !/chrome/i.test(a) && (c.safari = +(RegExp["$1"] || RegExp["$2"])), c.opera && (d = parseFloat(b.version())), c.webkit && (d = parseFloat(a.match(/ applewebkit\/(\d+)/)[1])), c.version = d, c.isCompatible = !c.mobile && (c.ie && d >= 6 || c.gecko && d >= 10801 || c.opera && d >= 9.5 || c.air && d >= 1 || c.webkit && d >= 522 || !1), c
		}(), ie = browser.ie, webkit = browser.webkit, gecko = browser.gecko, opera = browser.opera, utils = UE.utils = {
			each: function(a, b, c) {
				var d, e, f;
				if (null != a)
					if (a.length === +a.length) {
						for (d = 0, e = a.length; e > d; d++)
							if (b.call(c, a[d], d, a) === !1) return !1
					} else
						for (f in a)
							if (a.hasOwnProperty(f) && b.call(c, a[f], f, a) === !1) return !1
			},
			makeInstance: function(a) {
				var b = new Function;
				return b.prototype = a, a = new b, b.prototype = null, a
			},
			extend: function(a, b, c) {
				if (b)
					for (var d in b) c && a.hasOwnProperty(d) || (a[d] = b[d]);
				return a
			},
			extend2: function(a) {
				var c, d, e, b = arguments;
				for (c = 1; c < b.length; c++) {
					d = b[c];
					for (e in d) a.hasOwnProperty(e) || (a[e] = d[e])
				}
				return a
			},
			inherits: function(a, b) {
				var c = a.prototype,
					d = utils.makeInstance(b.prototype);
				return utils.extend(d, c, !0), a.prototype = d, d.constructor = a
			},
			bind: function(a, b) {
				return function() {
					return a.apply(b, arguments)
				}
			},
			defer: function(a, b, c) {
				var d;
				return function() {
					c && clearTimeout(d), d = setTimeout(a, b)
				}
			},
			indexOf: function(a, b, c) {
				var d = -1;
				return c = this.isNumber(c) ? c : 0, this.each(a, function(a, e) {
					return e >= c && a === b ? (d = e, !1) : void 0
				}), d
			},
			removeItem: function(a, b) {
				for (var c = 0, d = a.length; d > c; c++) a[c] === b && (a.splice(c, 1), c--)
			},
			trim: function(a) {
				return a.replace(/(^[ \t\n\r]+)|([ \t\n\r]+$)/g, "")
			},
			listToMap: function(a) {
				if (!a) return {};
				a = utils.isArray(a) ? a : a.split(",");
				for (var c, b = 0, d = {}; c = a[b++];) d[c.toUpperCase()] = d[c] = 1;
				return d
			},
			unhtml: function(a, b) {
				return a ? a.replace(b || /[&<">'](?:(amp|lt|quot|gt|#39|nbsp|#\d+);)?/g, function(a, b) {
					return b ? a : {
						"<": "&lt;",
						"&": "&amp;",
						'"': "&quot;",
						">": "&gt;",
						"'": "&#39;"
					}[a]
				}) : ""
			},
			html: function(a) {
				return a ? a.replace(/&((g|l|quo)t|amp|#39|nbsp);/g, function() {
					return {
						"&lt;": "<",
						"&amp;": "&",
						"&quot;": '"',
						"&gt;": ">",
						"&#39;": "'",
						"&nbsp;": " "
					}
				}) : ""
			},
			cssStyleToDomStyle: function() {
				var a = document.createElement("div").style,
					b = {
						"float": void 0 != a.cssFloat ? "cssFloat" : void 0 != a.styleFloat ? "styleFloat" : "float"
					};
				return function(a) {
					return b[a] || (b[a] = a.toLowerCase().replace(/-./g, function(a) {
						return a.charAt(1).toUpperCase()
					}))
				}
			}(),
			loadFile: function() {
				function b(b, c) {
					try {
						for (var e, d = 0; e = a[d++];)
							if (e.doc === b && e.url == (c.src || c.href)) return e
					} catch (f) {
						return null
					}
				}
				var a = [];
				return function(c, d, e) {
					var g, h, i, f = b(c, d);
					if (f) return f.ready ? e && e() : f.funs.push(e), void 0;
					if (a.push({
							doc: c,
							url: d.src || d.href,
							funs: [e]
						}), !c.body) {
						g = [];
						for (h in d) "tag" != h && g.push(h + '="' + d[h] + '"');
						return c.write("<" + d.tag + " " + g.join(" ") + " ></" + d.tag + ">"), void 0
					}
					if (!d.id || !c.getElementById(d.id)) {
						i = c.createElement(d.tag), delete d.tag;
						for (h in d) i.setAttribute(h, d[h]);
						i.onload = i.onreadystatechange = function() {
							if (!this.readyState || /loaded|complete/.test(this.readyState)) {
								if (f = b(c, d), f.funs.length > 0) {
									f.ready = 1;
									for (var a; a = f.funs.pop();) a()
								}
								i.onload = i.onreadystatechange = null
							}
						}, i.onerror = function() {
							throw Error("The load " + (d.href || d.src) + " fails,check the url settings of file ueditor.config.js ")
						}, c.getElementsByTagName("head")[0].appendChild(i)
					}
				}
			}(),
			isEmptyObject: function(a) {
				if (null == a) return !0;
				if (this.isArray(a) || this.isString(a)) return 0 === a.length;
				for (var b in a)
					if (a.hasOwnProperty(b)) return !1;
				return !0
			},
			fixColor: function(a, b) {
				var c, e, d;
				if (/color/i.test(a) && /rgba?/.test(b)) {
					if (c = b.split(","), c.length > 3) return "";
					for (b = "#", d = 0; e = c[d++];) e = parseInt(e.replace(/[^\d]/gi, ""), 10).toString(16), b += 1 == e.length ? "0" + e : e;
					b = b.toUpperCase()
				}
				return b
			},
			optCss: function(a) {
				function e(a, b) {
					var c, d, e, f, g, h;
					if (!a) return "";
					if (c = a.top, d = a.bottom, e = a.left, f = a.right, g = "", c && e && d && f) g += ";" + b + ":" + (c == d && d == e && e == f ? c : c == d && e == f ? c + " " + e : e == f ? c + " " + e + " " + d : c + " " + f + " " + d + " " + e) + ";";
					else
						for (h in a) g += ";" + b + "-" + h + ":" + a[h] + ";";
					return g
				}
				var b, c;
				return a = a.replace(/(padding|margin|border)\-([^:]+):([^;]+);?/gi, function(a, d, e, f) {
					if (1 == f.split(" ").length) switch (d) {
						case "padding":
							return !b && (b = {}), b[e] = f, "";
						case "margin":
							return !c && (c = {}), c[e] = f, "";
						case "border":
							return "initial" == f ? "" : a
					}
					return a
				}), a += e(b, "padding") + e(c, "margin"), a.replace(/^[ \n\r\t;]*|[ \n\r\t]*$/, "").replace(/;([ \n\r\t]+)|\1;/g, ";").replace(/(&((l|g)t|quot|#39))?;{2,}/g, function(a, b) {
					return b ? b + ";;" : ";"
				})
			},
			clone: function(a, b) {
				var c, d;
				b = b || {};
				for (d in a) a.hasOwnProperty(d) && (c = a[d], "object" == typeof c ? (b[d] = utils.isArray(c) ? [] : {}, utils.clone(a[d], b[d])) : b[d] = c);
				return b
			},
			transUnitToPx: function(a) {
				if (!/(pt|cm)/.test(a)) return a;
				var b;
				switch (a.replace(/([\d.]+)(\w+)/, function(c, d, e) {
					a = d, b = e
				}), b) {
					case "cm":
						a = 25 * parseFloat(a);
						break;
					case "pt":
						a = Math.round(96 * parseFloat(a) / 72)
				}
				return a + (a ? "px" : "")
			},
			domReady: function() {
				function b(b) {
					b.isReady = !0;
					for (var c; c = a.pop(); c());
				}
				var a = [];
				return function(c, d) {
					d = d || window;
					var e = d.document;
					c && a.push(c), "complete" === e.readyState ? b(e) : (e.isReady && b(e), browser.ie && 11 != browser.version ? (function() {
						if (!e.isReady) {
							try {
								e.documentElement.doScroll("left")
							} catch (a) {
								return setTimeout(arguments.callee, 0), void 0
							}
							b(e)
						}
					}(), d.attachEvent("onload", function() {
						b(e)
					})) : (e.addEventListener("DOMContentLoaded", function() {
						e.removeEventListener("DOMContentLoaded", arguments.callee, !1), b(e)
					}, !1), d.addEventListener("load", function() {
						b(e)
					}, !1)))
				}
			}(),
			cssRule: browser.ie && 11 != browser.version ? function(a, b, c) {
				var d, e;
				return void 0 === b || b && b.nodeType && 9 == b.nodeType ? (c = b && b.nodeType && 9 == b.nodeType ? b : c || document, d = c.indexList || (c.indexList = {}), e = d[a], void 0 !== e ? c.styleSheets[e].cssText : void 0) : (c = c || document, d = c.indexList || (c.indexList = {}), e = d[a], "" === b ? void 0 !== e ? (c.styleSheets[e].cssText = "", delete d[a], !0) : !1 : (void 0 !== e ? sheetStyle = c.styleSheets[e] : (sheetStyle = c.createStyleSheet("", e = c.styleSheets.length), d[a] = e), sheetStyle.cssText = b, void 0))
			} : function(a, b, c) {
				var e;
				return void 0 === b || b && b.nodeType && 9 == b.nodeType ? (c = b && b.nodeType && 9 == b.nodeType ? b : c || document, e = c.getElementById(a), e ? e.innerHTML : void 0) : (c = c || document, e = c.getElementById(a), "" === b ? e ? (e.parentNode.removeChild(e), !0) : !1 : (e ? e.innerHTML = b : (e = c.createElement("style"), e.id = a, e.innerHTML = b, c.getElementsByTagName("head")[0].appendChild(e)), void 0))
			},
			sort: function(a, b) {
				var c, d, e, f, g;
				for (b = b || function(a, b) {
						return a.localeCompare(b)
					}, c = 0, d = a.length; d > c; c++)
					for (e = c, f = a.length; f > e; e++) b(a[c], a[e]) > 0 && (g = a[c], a[c] = a[e], a[e] = g);
				return a
			},
			serializeParam: function(a) {
				var c, d, b = [];
				for (c in a)
					if ("method" != c && "timeout" != c && "async" != c)
						if ("function" != (typeof a[c]).toLowerCase() && "object" != (typeof a[c]).toLowerCase()) b.push(encodeURIComponent(c) + "=" + encodeURIComponent(a[c]));
						else if (utils.isArray(a[c]))
					for (d = 0; d < a[c].length; d++) b.push(encodeURIComponent(c) + "[]=" + encodeURIComponent(a[c][d]));
				return b.join("&")
			},
			formatUrl: function(a) {
				var b = a.replace(/&&/g, "&");
				return b = b.replace(/\?&/g, "?"), b = b.replace(/&$/g, ""), b = b.replace(/&#/g, "#"), b = b.replace(/&+/g, "&")
			},
			isCrossDomainUrl: function(a) {
				var b = document.createElement("a");
				// return b.href = a, browser.ie && (b.href = b.href), !(b.protocol == location.protocol && b.hostname == location.hostname && (b.port == location.port || "80" == b.port && "" == location.port || "" == b.port && "80" == location.port))
				return b.href = a, browser.ie && (b.href = b.href), !(b.protocol == location.protocol && b.hostname == location.hostname && (b.port == location.port || "80" == b.port && "" == location.port || "" == b.port && "80" == location.port || "443" == b.port && "" == location.port || "" == b.port && "443" == location.port))

			},
			clearEmptyAttrs: function(a) {
				for (var b in a) "" === a[b] && delete a[b];
				return a
			},
			str2json: function(a) {
				return utils.isString(a) ? window.JSON ? JSON.parse(a) : new Function("return " + utils.trim(a || ""))() : null
			},
			json2str: function() {
				function b(b) {
					return /["\\\x00-\x1f]/.test(b) && (b = b.replace(/["\\\x00-\x1f]/g, function(b) {
						var c = a[b];
						return c ? c : (c = b.charCodeAt(), "\\u00" + Math.floor(c / 16).toString(16) + (c % 16).toString(16))
					})), '"' + b + '"'
				}

				function c(a) {
					var d, e, f, b = ["["],
						c = a.length;
					for (e = 0; c > e; e++) switch (f = a[e], typeof f) {
						case "undefined":
						case "function":
						case "unknown":
							break;
						default:
							d && b.push(","), b.push(utils.json2str(f)), d = 1
					}
					return b.push("]"), b.join("")
				}

				function d(a) {
					return 10 > a ? "0" + a : a
				}

				function e(a) {
					return '"' + a.getFullYear() + "-" + d(a.getMonth() + 1) + "-" + d(a.getDate()) + "T" + d(a.getHours()) + ":" + d(a.getMinutes()) + ":" + d(a.getSeconds()) + '"'
				}
				if (window.JSON) return JSON.stringify;
				var a = {
					"\b": "\\b",
					"	": "\\t",
					"\n": "\\n",
					"\f": "\\f",
					"\r": "\\r",
					'"': '\\"',
					"\\": "\\\\"
				};
				return function(a) {
					var g, h, d, f, i;
					switch (typeof a) {
						case "undefined":
							return "undefined";
						case "number":
							return isFinite(a) ? String(a) : "null";
						case "string":
							return b(a);
						case "boolean":
							return String(a);
						default:
							if (null === a) return "null";
							if (utils.isArray(a)) return c(a);
							if (utils.isDate(a)) return e(a);
							d = ["{"], f = utils.json2str;
							for (i in a)
								if (Object.prototype.hasOwnProperty.call(a, i)) switch (h = a[i], typeof h) {
									case "undefined":
									case "unknown":
									case "function":
										break;
									default:
										g && d.push(","), g = 1, d.push(f(i) + ":" + f(h))
								}
								return d.push("}"), d.join("")
					}
				}
			}()
		}, utils.each(["String", "Function", "Array", "Number", "RegExp", "Object", "Date"], function(a) {
			UE.utils["is" + a] = function(b) {
				return Object.prototype.toString.apply(b) == "[object " + a + "]"
			}
		}), EventBase = UE.EventBase = function() {}, EventBase.prototype = {
			addListener: function(a, b) {
				a = utils.trim(a).split(/\s+/);
				for (var d, c = 0; d = a[c++];) getListener(this, d, !0).push(b)
			},
			on: function(a, b) {
				return this.addListener(a, b)
			},
			off: function(a, b) {
				return this.removeListener(a, b)
			},
			trigger: function() {
				return this.fireEvent.apply(this, arguments)
			},
			removeListener: function(a, b) {
				a = utils.trim(a).split(/\s+/);
				for (var d, c = 0; d = a[c++];) utils.removeItem(getListener(this, d) || [], b)
			},
			fireEvent: function() {
				var c, b, e, f, g, d, a = arguments[0];
				for (a = utils.trim(a).split(" "), b = 0; c = a[b++];) {
					if (d = getListener(this, c))
						for (g = d.length; g--;)
							if (d[g]) {
								if (f = d[g].apply(this, arguments), f === !0) return f;
								void 0 !== f && (e = f)
							}(f = this["on" + c.toLowerCase()]) && (e = f.apply(this, arguments))
				}
				return e
			}
		}, dtd = dom.dtd = function() {
			function a(a) {
				for (var b in a) a[b.toUpperCase()] = a[b];
				return a
			}
			var b = utils.extend2,
				c = a({
					isindex: 1,
					fieldset: 1
				}),
				d = a({
					input: 1,
					button: 1,
					select: 1,
					textarea: 1,
					label: 1
				}),
				e = b(a({
					a: 1
				}), d),
				f = b({
					iframe: 1
				}, e),
				g = a({
					hr: 1,
					ul: 1,
					menu: 1,
					div: 1,
					blockquote: 1,
					noscript: 1,
					table: 1,
					center: 1,
					address: 1,
					dir: 1,
					pre: 1,
					h5: 1,
					dl: 1,
					h4: 1,
					noframes: 1,
					h6: 1,
					ol: 1,
					h1: 1,
					h3: 1,
					h2: 1
				}),
				h = a({
					ins: 1,
					del: 1,
					script: 1,
					style: 1
				}),
				i = b(a({
					b: 1,
					acronym: 1,
					bdo: 1,
					"var": 1,
					"#": 1,
					abbr: 1,
					code: 1,
					br: 1,
					i: 1,
					cite: 1,
					kbd: 1,
					u: 1,
					strike: 1,
					s: 1,
					tt: 1,
					strong: 1,
					q: 1,
					samp: 1,
					em: 1,
					dfn: 1,
					span: 1
				}), h),
				j = b(a({
					sub: 1,
					img: 1,
					embed: 1,
					object: 1,
					sup: 1,
					basefont: 1,
					map: 1,
					applet: 1,
					font: 1,
					big: 1,
					small: 1
				}), i),
				k = b(a({
					p: 1
				}), j),
				l = b(a({
					iframe: 1
				}), j, d),
				m = a({
					img: 1,
					embed: 1,
					noscript: 1,
					br: 1,
					kbd: 1,
					center: 1,
					button: 1,
					basefont: 1,
					h5: 1,
					h4: 1,
					samp: 1,
					h6: 1,
					ol: 1,
					h1: 1,
					h3: 1,
					h2: 1,
					form: 1,
					font: 1,
					"#": 1,
					select: 1,
					menu: 1,
					ins: 1,
					abbr: 1,
					label: 1,
					code: 1,
					table: 1,
					script: 1,
					cite: 1,
					input: 1,
					iframe: 1,
					strong: 1,
					textarea: 1,
					noframes: 1,
					big: 1,
					small: 1,
					span: 1,
					hr: 1,
					sub: 1,
					bdo: 1,
					"var": 1,
					div: 1,
					object: 1,
					sup: 1,
					strike: 1,
					dir: 1,
					map: 1,
					dl: 1,
					applet: 1,
					del: 1,
					isindex: 1,
					fieldset: 1,
					ul: 1,
					b: 1,
					acronym: 1,
					a: 1,
					blockquote: 1,
					i: 1,
					u: 1,
					s: 1,
					tt: 1,
					address: 1,
					q: 1,
					pre: 1,
					p: 1,
					em: 1,
					dfn: 1
				}),
				n = b(a({
					a: 0
				}), l),
				o = a({
					tr: 1
				}),
				p = a({
					"#": 1
				}),
				q = b(a({
					param: 1
				}), m),
				r = b(a({
					form: 1
				}), c, f, g, k),
				s = a({
					li: 1,
					ol: 1,
					ul: 1
				}),
				t = a({
					style: 1,
					script: 1
				}),
				u = a({
					base: 1,
					link: 1,
					meta: 1,
					title: 1
				}),
				v = b(u, t),
				w = a({
					head: 1,
					body: 1
				}),
				x = a({
					html: 1
				}),
				y = a({
					address: 1,
					blockquote: 1,
					center: 1,
					dir: 1,
					div: 1,
					dl: 1,
					fieldset: 1,
					form: 1,
					h1: 1,
					h2: 1,
					h3: 1,
					h4: 1,
					h5: 1,
					h6: 1,
					hr: 1,
					isindex: 1,
					menu: 1,
					noframes: 1,
					ol: 1,
					p: 1,
					pre: 1,
					table: 1,
					ul: 1
				}),
				z = a({
					area: 1,
					base: 1,
					basefont: 1,
					br: 1,
					col: 1,
					command: 1,
					dialog: 1,
					embed: 1,
					hr: 1,
					img: 1,
					input: 1,
					isindex: 1,
					keygen: 1,
					link: 1,
					meta: 1,
					param: 1,
					source: 1,
					track: 1,
					wbr: 1
				});
			return a({
				$nonBodyContent: b(x, w, u),
				$block: y,
				$inline: n,
				$inlineWithA: b(a({
					a: 1
				}), n),
				$body: b(a({
					script: 1,
					style: 1
				}), y),
				$cdata: a({
					script: 1,
					style: 1
				}),
				$empty: z,
				$nonChild: a({
					iframe: 1,
					textarea: 1
				}),
				$listItem: a({
					dd: 1,
					dt: 1,
					li: 1
				}),
				$list: a({
					ul: 1,
					ol: 1,
					dl: 1
				}),
				$isNotEmpty: a({
					table: 1,
					ul: 1,
					ol: 1,
					dl: 1,
					iframe: 1,
					area: 1,
					base: 1,
					col: 1,
					hr: 1,
					img: 1,
					embed: 1,
					input: 1,
					link: 1,
					meta: 1,
					param: 1,
					h1: 1,
					h2: 1,
					h3: 1,
					h4: 1,
					h5: 1,
					h6: 1
				}),
				$removeEmpty: a({
					a: 1,
					abbr: 1,
					acronym: 1,
					address: 1,
					b: 1,
					bdo: 1,
					big: 1,
					cite: 1,
					code: 1,
					del: 1,
					dfn: 1,
					em: 1,
					font: 1,
					i: 1,
					ins: 1,
					label: 1,
					kbd: 1,
					q: 1,
					s: 1,
					samp: 1,
					small: 1,
					span: 1,
					strike: 1,
					strong: 1,
					sub: 1,
					sup: 1,
					tt: 1,
					u: 1,
					"var": 1
				}),
				$removeEmptyBlock: a({
					p: 1,
					div: 1
				}),
				$tableContent: a({
					caption: 1,
					col: 1,
					colgroup: 1,
					tbody: 1,
					td: 1,
					tfoot: 1,
					th: 1,
					thead: 1,
					tr: 1,
					table: 1
				}),
				$notTransContent: a({
					pre: 1,
					script: 1,
					style: 1,
					textarea: 1
				}),
				html: w,
				head: v,
				style: p,
				script: p,
				body: r,
				base: {},
				link: {},
				meta: {},
				title: p,
				col: {},
				tr: a({
					td: 1,
					th: 1
				}),
				img: {},
				embed: {},
				colgroup: a({
					thead: 1,
					col: 1,
					tbody: 1,
					tr: 1,
					tfoot: 1
				}),
				noscript: r,
				td: r,
				br: {},
				th: r,
				center: r,
				kbd: n,
				button: b(k, g),
				basefont: {},
				h5: n,
				h4: n,
				samp: n,
				h6: n,
				ol: s,
				h1: n,
				h3: n,
				option: p,
				h2: n,
				form: b(c, f, g, k),
				select: a({
					optgroup: 1,
					option: 1
				}),
				font: n,
				ins: n,
				menu: s,
				abbr: n,
				label: n,
				table: a({
					thead: 1,
					col: 1,
					tbody: 1,
					tr: 1,
					colgroup: 1,
					caption: 1,
					tfoot: 1
				}),
				code: n,
				tfoot: o,
				cite: n,
				li: r,
				input: {},
				iframe: r,
				strong: n,
				textarea: p,
				noframes: r,
				big: n,
				small: n,
				span: a({
					"#": 1,
					br: 1,
					b: 1,
					strong: 1,
					u: 1,
					i: 1,
					em: 1,
					sub: 1,
					sup: 1,
					strike: 1,
					span: 1
				}),
				hr: n,
				dt: n,
				sub: n,
				optgroup: a({
					option: 1
				}),
				param: {},
				bdo: n,
				"var": n,
				div: r,
				object: q,
				sup: n,
				dd: r,
				strike: n,
				area: {},
				dir: s,
				map: b(a({
					area: 1,
					form: 1,
					p: 1
				}), c, h, g),
				applet: q,
				dl: a({
					dt: 1,
					dd: 1
				}),
				del: n,
				isindex: {},
				fieldset: b(a({
					legend: 1
				}), m),
				thead: o,
				ul: s,
				acronym: n,
				b: n,
				a: b(a({
					a: 1
				}), l),
				blockquote: b(a({
					td: 1,
					tr: 1,
					tbody: 1,
					li: 1
				}), r),
				caption: n,
				i: n,
				u: n,
				tbody: o,
				s: n,
				address: b(f, k),
				tt: n,
				legend: n,
				q: n,
				pre: b(i, e),
				p: b(a({
					a: 1
				}), n),
				em: n,
				dfn: n
			})
		}(), attrFix = ie && browser.version < 9 ? {
			tabindex: "tabIndex",
			readonly: "readOnly",
			"for": "htmlFor",
			"class": "className",
			maxlength: "maxLength",
			cellspacing: "cellSpacing",
			cellpadding: "cellPadding",
			rowspan: "rowSpan",
			colspan: "colSpan",
			usemap: "useMap",
			frameborder: "frameBorder"
		} : {
			tabindex: "tabIndex",
			readonly: "readOnly"
		}, styleBlock = utils.listToMap(["-webkit-box", "-moz-box", "block", "list-item", "table", "table-row-group", "table-header-group", "table-footer-group", "table-row", "table-column-group", "table-column", "table-cell", "table-caption"]), domUtils = dom.domUtils = {
			NODE_ELEMENT: 1,
			NODE_DOCUMENT: 9,
			NODE_TEXT: 3,
			NODE_COMMENT: 8,
			NODE_DOCUMENT_FRAGMENT: 11,
			POSITION_IDENTICAL: 0,
			POSITION_DISCONNECTED: 1,
			POSITION_FOLLOWING: 2,
			POSITION_PRECEDING: 4,
			POSITION_IS_CONTAINED: 8,
			POSITION_CONTAINS: 16,
			fillChar: ie && "6" == browser.version ? "﻿" : "​",
			keys: {
				8: 1,
				46: 1,
				16: 1,
				17: 1,
				18: 1,
				37: 1,
				38: 1,
				39: 1,
				40: 1,
				13: 1
			},
			getPosition: function(a, b) {
				var c, d, e, f;
				if (a === b) return 0;
				for (d = [a], e = [b], c = a; c = c.parentNode;) {
					if (c === b) return 10;
					d.push(c)
				}
				for (c = b; c = c.parentNode;) {
					if (c === a) return 20;
					e.push(c)
				}
				if (d.reverse(), e.reverse(), d[0] !== e[0]) return 1;
				for (f = -1; f++, d[f] === e[f];);
				for (a = d[f], b = e[f]; a = a.nextSibling;)
					if (a === b) return 4;
				return 2
			},
			getNodeIndex: function(a, b) {
				for (var c = a, d = 0; c = c.previousSibling;) b && 3 == c.nodeType ? c.nodeType != c.nextSibling.nodeType && d++ : d++;
				return d
			},
			inDoc: function(a, b) {
				return 10 == domUtils.getPosition(a, b)
			},
			findParent: function(a, b, c) {
				if (a && !domUtils.isBody(a))
					for (a = c ? a : a.parentNode; a;) {
						if (!b || b(a) || domUtils.isBody(a)) return b && !b(a) && domUtils.isBody(a) ? null : a;
						a = a.parentNode
					}
				return null
			},
			findParentByTagName: function(a, b, c, d) {
				return b = utils.listToMap(utils.isArray(b) ? b : [b]), domUtils.findParent(a, function(a) {
					return b[a.tagName] && !(d && d(a))
				}, c)
			},
			findParents: function(a, b, c, d) {
				for (var e = b && (c && c(a) || !c) ? [a] : []; a = domUtils.findParent(a, c);) e.push(a);
				return d ? e : e.reverse()
			},
			insertAfter: function(a, b) {
				return a.nextSibling ? a.parentNode.insertBefore(b, a.nextSibling) : a.parentNode.appendChild(b)
			},
			remove: function(a, b) {
				var d, c = a.parentNode;
				if (c) {
					if (b && a.hasChildNodes())
						for (; d = a.firstChild;) c.insertBefore(d, a);
					c.removeChild(a)
				}
				return a
			},
			getNextDomNode: function(a, b, c, d) {
				return getDomNode(a, "firstChild", "nextSibling", b, c, d)
			},
			getPreDomNode: function(a, b, c, d) {
				return getDomNode(a, "lastChild", "previousSibling", b, c, d)
			},
			isBookmarkNode: function(a) {
				return 1 == a.nodeType && a.id && /^_baidu_bookmark_/i.test(a.id)
			},
			getWindow: function(a) {
				var b = a.ownerDocument || a;
				return b.defaultView || b.parentWindow
			},
			getCommonAncestor: function(a, b) {
				if (a === b) return a;
				for (var c = [a], d = [b], e = a, f = -1; e = e.parentNode;) {
					if (e === b) return e;
					c.push(e)
				}
				for (e = b; e = e.parentNode;) {
					if (e === a) return e;
					d.push(e)
				}
				for (c.reverse(), d.reverse(); f++, c[f] === d[f];);
				return 0 == f ? null : c[f - 1]
			},
			clearEmptySibling: function(a, b, c) {
				function d(a, b) {
					for (var c; a && !domUtils.isBookmarkNode(a) && (domUtils.isEmptyInlineElement(a) || !new RegExp("[^	\n\r" + domUtils.fillChar + "]").test(a.nodeValue));) c = a[b], domUtils.remove(a), a = c
				}!b && d(a.nextSibling, "nextSibling"), !c && d(a.previousSibling, "previousSibling")
			},
			split: function(a, b) {
				var d, e, f, c = a.ownerDocument;
				return browser.ie && b == a.nodeValue.length ? (d = c.createTextNode(""), domUtils.insertAfter(a, d)) : (e = a.splitText(b), browser.ie8 && (f = c.createTextNode(""), domUtils.insertAfter(e, f), domUtils.remove(f)), e)
			},
			isWhitespace: function(a) {
				return !new RegExp("[^ 	\n\r" + domUtils.fillChar + "]").test(a.nodeValue)
			},
			getXY: function(a) {
				for (var b = 0, c = 0; a.offsetParent;) c += a.offsetTop, b += a.offsetLeft, a = a.offsetParent;
				return {
					x: b,
					y: c
				}
			},
			on: function(a, b, c) {
				var f, g, d = utils.isArray(b) ? b : utils.trim(b).split(/\s+/),
					e = d.length;
				if (e)
					for (; e--;) b = d[e], a.addEventListener ? a.addEventListener(b, c, !1) : (c._d || (c._d = {
						els: []
					}), f = b + c.toString(), g = utils.indexOf(c._d.els, a), c._d[f] && -1 != g || (-1 == g && c._d.els.push(a), c._d[f] || (c._d[f] = function(a) {
						return c.call(a.srcElement, a || window.event)
					}), a.attachEvent("on" + b, c._d[f])));
				a = null
			},
			un: function(a, b, c) {
				var f, h, d = utils.isArray(b) ? b : utils.trim(b).split(/\s+/),
					e = d.length;
				if (e)
					for (; e--;)
						if (b = d[e], a.removeEventListener) a.removeEventListener(b, c, !1);
						else {
							f = b + c.toString();
							try {
								a.detachEvent("on" + b, c._d ? c._d[f] : c)
							} catch (g) {}
							c._d && c._d[f] && (h = utils.indexOf(c._d.els, a), -1 != h && c._d.els.splice(h, 1), 0 == c._d.els.length && delete c._d[f])
						}
			},
			isSameElement: function(a, b) {
				var c, d, e, f, g, h, i;
				if (a.tagName != b.tagName) return !1;
				if (c = a.attributes, d = b.attributes, !ie && c.length != d.length) return !1;
				for (g = 0, h = 0, i = 0; e = c[i++];) {
					if ("style" == e.nodeName) {
						if (e.specified && g++, domUtils.isSameStyle(a, b)) continue;
						return !1
					}
					if (ie) {
						if (!e.specified) continue;
						g++, f = d.getNamedItem(e.nodeName)
					} else f = b.attributes[e.nodeName];
					if (!f.specified || e.nodeValue != f.nodeValue) return !1
				}
				if (ie) {
					for (i = 0; f = d[i++];) f.specified && h++;
					if (g != h) return !1
				}
				return !0
			},
			isSameStyle: function(a, b) {
				var e, g, f, c = a.style.cssText.replace(/( ?; ?)/g, ";").replace(/( ?: ?)/g, ":"),
					d = b.style.cssText.replace(/( ?; ?)/g, ";").replace(/( ?: ?)/g, ":");
				if (browser.opera) {
					if (c = a.style, d = b.style, c.length != d.length) return !1;
					for (e in c)
						if (!/^(\d+|csstext)$/i.test(e) && c[e] != d[e]) return !1;
					return !0
				}
				if (!c || !d) return c == d;
				if (c = c.split(";"), d = d.split(";"), c.length != d.length) return !1;
				for (f = 0; g = c[f++];)
					if (-1 == utils.indexOf(d, g)) return !1;
				return !0
			},
			isBlockElm: function(a) {
				return 1 == a.nodeType && (dtd.$block[a.tagName] || styleBlock[domUtils.getComputedStyle(a, "display")]) && !dtd.$nonChild[a.tagName]
			},
			isBody: function(a) {
				return a && 1 == a.nodeType && "body" == a.tagName.toLowerCase()
			},
			breakParent: function(a, b) {
				var c, f, g, d = a,
					e = a;
				do {
					for (d = d.parentNode, f ? (c = d.cloneNode(!1), c.appendChild(f), f = c, c = d.cloneNode(!1), c.appendChild(g), g = c) : (f = d.cloneNode(!1), g = f.cloneNode(!1)); c = e.previousSibling;) f.insertBefore(c, f.firstChild);
					for (; c = e.nextSibling;) g.appendChild(c);
					e = d
				} while (b !== d);
				return c = b.parentNode, c.insertBefore(f, b), c.insertBefore(g, b), c.insertBefore(a, g), domUtils.remove(b), a
			},
			isEmptyInlineElement: function(a) {
				if (1 != a.nodeType || !dtd.$removeEmpty[a.tagName]) return 0;
				for (a = a.firstChild; a;) {
					if (domUtils.isBookmarkNode(a)) return 0;
					if (1 == a.nodeType && !domUtils.isEmptyInlineElement(a) || 3 == a.nodeType && !domUtils.isWhitespace(a)) return 0;
					a = a.nextSibling
				}
				return 1
			},
			trimWhiteTextNode: function(a) {
				function b(b) {
					for (var c;
						(c = a[b]) && 3 == c.nodeType && domUtils.isWhitespace(c);) a.removeChild(c)
				}
				b("firstChild"), b("lastChild")
			},
			mergeChild: function(a, b, c) {
				var f, e, g, i, h, d = domUtils.getElementsByTagName(a, a.tagName.toLowerCase());
				for (e = 0; f = d[e++];)
					if (f.parentNode && !domUtils.isBookmarkNode(f))
						if ("span" != f.tagName.toLowerCase()) domUtils.isSameElement(a, f) && domUtils.remove(f, !0);
						else {
							if (a === f.parentNode && (domUtils.trimWhiteTextNode(a), 1 == a.childNodes.length)) {
								a.style.cssText = f.style.cssText + ";" + a.style.cssText, domUtils.remove(f, !0);
								continue
							}
							if (f.style.cssText = a.style.cssText + ";" + f.style.cssText, c && (g = c.style))
								for (g = g.split(";"), h = 0; i = g[h++];) f.style[utils.cssStyleToDomStyle(i.split(":")[0])] = i.split(":")[1];
							domUtils.isSameStyle(f, a) && domUtils.remove(f, !0)
						}
			},
			getElementsByTagName: function(a, b, c) {
				var d, e, g, f, h, j, i;
				for (c && utils.isString(c) && (d = c, c = function(a) {
						return domUtils.hasClass(a, d)
					}), b = utils.trim(b).replace(/[ ]{2,}/g, " ").split(" "), e = [], f = 0; g = b[f++];)
					for (h = a.getElementsByTagName(g), i = 0; j = h[i++];)(!c || c(j)) && e.push(j);
				return e
			},
			mergeToParent: function(a) {
				for (var b = a.parentNode; b && dtd.$removeEmpty[b.tagName];) {
					if (b.tagName == a.tagName || "A" == b.tagName) {
						if (domUtils.trimWhiteTextNode(b), "SPAN" == b.tagName && !domUtils.isSameStyle(b, a) || "A" == b.tagName && "SPAN" == a.tagName) {
							if (b.childNodes.length > 1 || b !== a.parentNode) {
								a.style.cssText = b.style.cssText + ";" + a.style.cssText, b = b.parentNode;
								continue
							}
							b.style.cssText += ";" + a.style.cssText, "A" == b.tagName && (b.style.textDecoration = "underline")
						}
						if ("A" != b.tagName) {
							b === a.parentNode && domUtils.remove(a, !0);
							break
						}
					}
					b = b.parentNode
				}
			},
			mergeSibling: function(a, b, c) {
				function d(a, b, c) {
					var d;
					if ((d = c[a]) && !domUtils.isBookmarkNode(d) && 1 == d.nodeType && domUtils.isSameElement(c, d)) {
						for (; d.firstChild;) "firstChild" == b ? c.insertBefore(d.lastChild, c.firstChild) : c.appendChild(d.firstChild);
						domUtils.remove(d)
					}
				}!b && d("previousSibling", "firstChild", a), !c && d("nextSibling", "lastChild", a)
			},
			unSelectable: ie && browser.ie9below || browser.opera ? function(a) {
				a.onselectstart = function() {
					return !1
				}, a.onclick = a.onkeyup = a.onkeydown = function() {
					return !1
				}, a.unselectable = "on", a.setAttribute("unselectable", "on");
				for (var c, b = 0; c = a.all[b++];) switch (c.tagName.toLowerCase()) {
					case "iframe":
					case "textarea":
					case "input":
					case "select":
						break;
					default:
						c.unselectable = "on", a.setAttribute("unselectable", "on")
				}
			} : function(a) {
				a.style.MozUserSelect = a.style.webkitUserSelect = a.style.msUserSelect = a.style.KhtmlUserSelect = "none"
			},
			removeAttributes: function(a, b) {
				var d, c, e;
				for (b = utils.isArray(b) ? b : utils.trim(b).replace(/[ ]{2,}/g, " ").split(" "), c = 0; d = b[c++];) {
					switch (d = attrFix[d] || d) {
						case "className":
							a[d] = "";
							break;
						case "style":
							a.style.cssText = "", e = a.getAttributeNode("style"), !browser.ie && e && a.removeAttributeNode(e)
					}
					a.removeAttribute(d)
				}
			},
			createElement: function(a, b, c) {
				return domUtils.setAttributes(a.createElement(b), c)
			},
			setAttributes: function(a, b) {
				var c, d;
				for (c in b)
					if (b.hasOwnProperty(c)) switch (d = b[c], c) {
						case "class":
							a.className = d;
							break;
						case "style":
							a.style.cssText = a.style.cssText + ";" + d;
							break;
						case "innerHTML":
							a[c] = d;
							break;
						case "value":
							a.value = d;
							break;
						default:
							a.setAttribute(attrFix[c] || c, d)
					}
					return a
			},
			getComputedStyle: function(a, b) {
				var d, e, f, c = "width height top left";
				if (c.indexOf(b) > -1) return a["offset" + b.replace(/^\w/, function(a) {
					return a.toUpperCase()
				})] + "px";
				if (3 == a.nodeType && (a = a.parentNode), browser.ie && browser.version < 9 && "font-size" == b && !a.style.fontSize && !dtd.$empty[a.tagName] && !dtd.$nonChild[a.tagName]) return d = a.ownerDocument.createElement("span"), d.style.cssText = "padding:0;border:0;font-family:simsun;", d.innerHTML = ".", a.appendChild(d), e = d.offsetHeight, a.removeChild(d), d = null, e + "px";
				try {
					f = domUtils.getStyle(a, b) || (window.getComputedStyle ? domUtils.getWindow(a).getComputedStyle(a, "").getPropertyValue(b) : (a.currentStyle || a.style)[utils.cssStyleToDomStyle(b)])
				} catch (g) {
					return ""
				}
				return utils.transUnitToPx(utils.fixColor(b, f))
			},
			removeClasses: function(a, b) {
				b = utils.isArray(b) ? b : utils.trim(b).replace(/[ ]{2,}/g, " ").split(" ");
				for (var d, c = 0, e = a.className; d = b[c++];) e = e.replace(new RegExp("\\b" + d + "\\b"), "");
				e = utils.trim(e).replace(/[ ]{2,}/g, " "), e ? a.className = e : domUtils.removeAttributes(a, ["class"])
			},
			addClass: function(a, b) {
				if (a) {
					b = utils.trim(b).replace(/[ ]{2,}/g, " ").split(" ");
					for (var d, c = 0, e = a.className; d = b[c++];) new RegExp("\\b" + d + "\\b").test(e) || (e += " " + d);
					a.className = utils.trim(e)
				}
			},
			hasClass: function(a, b) {
				if (utils.isRegExp(b)) return b.test(a.className);
				b = utils.trim(b).replace(/[ ]{2,}/g, " ").split(" ");
				for (var d, c = 0, e = a.className; d = b[c++];)
					if (!new RegExp("\\b" + d + "\\b", "i").test(e)) return !1;
				return c - 1 == b.length
			},
			preventDefault: function(a) {
				a.preventDefault ? a.preventDefault() : a.returnValue = !1
			},
			removeStyle: function(a, b) {
				browser.ie ? ("color" == b && (b = "(^|;)" + b), a.style.cssText = a.style.cssText.replace(new RegExp(b + "[^:]*:[^;]+;?", "ig"), "")) : a.style.removeProperty ? a.style.removeProperty(b) : a.style.removeAttribute(utils.cssStyleToDomStyle(b)), a.style.cssText || domUtils.removeAttributes(a, ["style"])
			},
			getStyle: function(a, b) {
				var c = a.style[utils.cssStyleToDomStyle(b)];
				return utils.fixColor(b, c)
			},
			setStyle: function(a, b, c) {
				a.style[utils.cssStyleToDomStyle(b)] = c, utils.trim(a.style.cssText) || this.removeAttributes(a, "style")
			},
			setStyles: function(a, b) {
				for (var c in b) b.hasOwnProperty(c) && domUtils.setStyle(a, c, b[c])
			},
			removeDirtyAttr: function(a) {
				for (var c, b = 0, d = a.getElementsByTagName("*"); c = d[b++];) c.removeAttribute("_moz_dirty");
				a.removeAttribute("_moz_dirty")
			},
			getChildCount: function(a, b) {
				var c = 0,
					d = a.firstChild;
				for (b = b || function() {
						return 1
					}; d;) b(d) && c++, d = d.nextSibling;
				return c
			},
			isEmptyNode: function(a) {
				return !a.firstChild || 0 == domUtils.getChildCount(a, function(a) {
					return !domUtils.isBr(a) && !domUtils.isBookmarkNode(a) && !domUtils.isWhitespace(a)
				})
			},
			clearSelectedArr: function(a) {
				for (var b; b = a.pop();) domUtils.removeAttributes(b, ["class"])
			},
			scrollToView: function(a, b, c) {
				var h, i, d = function() {
						var a = b.document,
							c = "CSS1Compat" == a.compatMode;
						return {
							width: (c ? a.documentElement.clientWidth : a.body.clientWidth) || 0,
							height: (c ? a.documentElement.clientHeight : a.body.clientHeight) || 0
						}
					},
					e = function(a) {
						if ("pageXOffset" in a) return {
							x: a.pageXOffset || 0,
							y: a.pageYOffset || 0
						};
						var b = a.document;
						return {
							x: b.documentElement.scrollLeft || b.body.scrollLeft || 0,
							y: b.documentElement.scrollTop || b.body.scrollTop || 0
						}
					},
					f = d().height,
					g = -1 * f + c;
				g += a.offsetHeight || 0, h = domUtils.getXY(a), g += h.y, i = e(b).y, (g > i || i - f > g) && b.scrollTo(0, g + (0 > g ? -20 : 20))
			},
			isBr: function(a) {
				return 1 == a.nodeType && "BR" == a.tagName
			},
			isFillChar: function(a, b) {
				if (3 != a.nodeType) return !1;
				var c = a.nodeValue;
				return b ? new RegExp("^" + domUtils.fillChar).test(c) : !c.replace(new RegExp(domUtils.fillChar, "g"), "").length
			},
			isStartInblock: function(a) {
				var e, f, g, b = a.cloneRange(),
					c = 0,
					d = b.startContainer;
				if (1 == d.nodeType && d.childNodes[b.startOffset])
					for (d = d.childNodes[b.startOffset], f = d.previousSibling; f && domUtils.isFillChar(f);) d = f, f = f.previousSibling;
				for (this.isFillChar(d, !0) && 1 == b.startOffset && (b.setStartBefore(d), d = b.startContainer); d && domUtils.isFillChar(d);) e = d, d = d.previousSibling;
				for (e && (b.setStartBefore(e), d = b.startContainer), 1 == d.nodeType && domUtils.isEmptyNode(d) && 1 == b.startOffset && b.setStart(d, 0).collapse(!0); !b.startOffset;) {
					if (d = b.startContainer, domUtils.isBlockElm(d) || domUtils.isBody(d)) {
						c = 1;
						break
					}
					if (f = b.startContainer.previousSibling) {
						for (; f && domUtils.isFillChar(f);) g = f, f = f.previousSibling;
						g ? b.setStartBefore(g) : b.setStartBefore(b.startContainer)
					} else b.setStartBefore(b.startContainer)
				}
				return c && !domUtils.isBody(b.startContainer) ? 1 : 0
			},
			isEmptyBlock: function(a, b) {
				if (1 != a.nodeType) return 0;
				if (b = b || new RegExp("[  	\r\n" + domUtils.fillChar + "]", "g"), a[browser.ie ? "innerText" : "textContent"].replace(b, "").length > 0) return 0;
				for (var c in dtd.$isNotEmpty)
					if (a.getElementsByTagName(c).length) return 0;
				return 1
			},
			setViewportOffset: function(a, b) {
				var c = 0 | parseInt(a.style.left),
					d = 0 | parseInt(a.style.top),
					e = a.getBoundingClientRect(),
					f = b.left - e.left,
					g = b.top - e.top;
				f && (a.style.left = c + f + "px"), g && (a.style.top = d + g + "px")
			},
			fillNode: function(a, b) {
				var c = browser.ie ? a.createTextNode(domUtils.fillChar) : a.createElement("br");
				b.innerHTML = "", b.appendChild(c)
			},
			moveChild: function(a, b, c) {
				for (; a.firstChild;) c && b.firstChild ? b.insertBefore(a.lastChild, b.firstChild) : b.appendChild(a.firstChild)
			},
			hasNoAttributes: function(a) {
				return browser.ie ? /^<\w+\s*?>/.test(a.outerHTML) : 0 == a.attributes.length
			},
			isCustomeNode: function(a) {
				return 1 == a.nodeType && a.getAttribute("_ue_custom_node_")
			},
			isTagNode: function(a, b) {
				return 1 == a.nodeType && new RegExp("\\b" + a.tagName + "\\b", "i").test(b)
			},
			filterNodeList: function(a, b, c) {
				var e, d = [];
				return utils.isFunction(b) || (e = b, b = function(a) {
					return -1 != utils.indexOf(utils.isArray(e) ? e : e.split(" "), a.tagName.toLowerCase())
				}), utils.each(a, function(a) {
					b(a) && d.push(a)
				}), 0 == d.length ? null : 1 != d.length && c ? d : d[0]
			},
			isInNodeEndBoundary: function(a, b) {
				var c = a.startContainer;
				if (3 == c.nodeType && a.startOffset != c.nodeValue.length) return 0;
				if (1 == c.nodeType && a.startOffset != c.childNodes.length) return 0;
				for (; c !== b;) {
					if (c.nextSibling) return 0;
					c = c.parentNode
				}
				return 1
			},
			isBoundaryNode: function(a, b) {
				for (var c; !domUtils.isBody(a);)
					if (c = a, a = a.parentNode, c !== a[b]) return !1;
				return !0
			},
			fillHtml: browser.ie11below ? "&nbsp;" : "<br/>"
		}, fillCharReg = new RegExp(domUtils.fillChar, "g"),
		function() {
			function d(a) {
				a.collapsed = a.startContainer && a.endContainer && a.startContainer === a.endContainer && a.startOffset == a.endOffset
			}

			function e(a) {
				return !a.collapsed && 1 == a.startContainer.nodeType && a.startContainer === a.endContainer && 1 == a.endOffset - a.startOffset
			}

			function f(a, b, c, e) {
				return 1 == b.nodeType && (dtd.$empty[b.tagName] || dtd.$nonChild[b.tagName]) && (c = domUtils.getNodeIndex(b) + (a ? 0 : 1), b = b.parentNode), a ? (e.startContainer = b, e.startOffset = c, e.endContainer || e.collapse(!0)) : (e.endContainer = b, e.endOffset = c, e.startContainer || e.collapse(!1)), d(e), e
			}

			function g(a, b) {
				var i, j, k, l, m, n, o, p, r, q, s, c = a.startContainer,
					d = a.endContainer,
					e = a.startOffset,
					f = a.endOffset,
					g = a.document,
					h = g.createDocumentFragment();
				if (1 == c.nodeType && (c = c.childNodes[e] || (i = c.appendChild(g.createTextNode("")))), 1 == d.nodeType && (d = d.childNodes[f] || (j = d.appendChild(g.createTextNode("")))), c === d && 3 == c.nodeType) return h.appendChild(g.createTextNode(c.substringData(e, f - e))), b && (c.deleteData(e, f - e), a.collapse(!0)), h;
				for (m = h, n = domUtils.findParents(c, !0), o = domUtils.findParents(d, !0), p = 0; n[p] == o[p];) p++;
				for (q = p; r = n[q]; q++) {
					for (k = r.nextSibling, r == c ? i || (3 == a.startContainer.nodeType ? (m.appendChild(g.createTextNode(c.nodeValue.slice(e))), b && c.deleteData(e, c.nodeValue.length - e)) : m.appendChild(b ? c : c.cloneNode(!0))) : (l = r.cloneNode(!1), m.appendChild(l)); k && k !== d && k !== o[q];) r = k.nextSibling, m.appendChild(b ? k : k.cloneNode(!0)), k = r;
					m = l
				}
				for (m = h, n[p] || (m.appendChild(n[p - 1].cloneNode(!1)), m = m.firstChild), q = p; s = o[q]; q++) {
					if (k = s.previousSibling, s == d ? j || 3 != a.endContainer.nodeType || (m.appendChild(g.createTextNode(d.substringData(0, f))), b && d.deleteData(0, f)) : (l = s.cloneNode(!1), m.appendChild(l)), q != p || !n[p])
						for (; k && k !== c;) s = k.previousSibling, m.insertBefore(b ? k : k.cloneNode(!0), m.firstChild), k = s;
					m = l
				}
				return b && a.setStartBefore(o[p] ? n[p] ? o[p] : n[p - 1] : o[p - 1]).collapse(!0), i && domUtils.remove(i), j && domUtils.remove(j), h
			}

			function i(a, b) {
				try {
					if (c && domUtils.inDoc(c, a))
						if (c.nodeValue.replace(fillCharReg, "").length) c.nodeValue = c.nodeValue.replace(fillCharReg, "");
						else {
							var d = c.parentNode;
							for (domUtils.remove(c); d && domUtils.isEmptyInlineElement(d) && (browser.safari ? !(domUtils.getPosition(d, b) & domUtils.POSITION_CONTAINS) : !d.contains(b));) c = d.parentNode, domUtils.remove(d), d = c
						}
				} catch (e) {}
			}

			function j(a, b) {
				var c;
				for (a = a[b]; a && domUtils.isFillChar(a);) c = a[b], domUtils.remove(a), a = c
			}
			var c, a = 0,
				b = domUtils.fillChar,
				h = dom.Range = function(a) {
					var b = this;
					b.startContainer = b.startOffset = b.endContainer = b.endOffset = null, b.document = a, b.collapsed = !0
				};
			h.prototype = {
				cloneContents: function() {
					return this.collapsed ? null : g(this, 0)
				},
				deleteContents: function() {
					var a;
					return this.collapsed || g(this, 1), browser.webkit && (a = this.startContainer, 3 != a.nodeType || a.nodeValue.length || (this.setStartBefore(a).collapse(!0), domUtils.remove(a))), this
				},
				extractContents: function() {
					return this.collapsed ? null : g(this, 2)
				},
				setStart: function(a, b) {
					return f(!0, a, b, this)
				},
				setEnd: function(a, b) {
					return f(!1, a, b, this)
				},
				setStartAfter: function(a) {
					return this.setStart(a.parentNode, domUtils.getNodeIndex(a) + 1)
				},
				setStartBefore: function(a) {
					return this.setStart(a.parentNode, domUtils.getNodeIndex(a))
				},
				setEndAfter: function(a) {
					return this.setEnd(a.parentNode, domUtils.getNodeIndex(a) + 1)
				},
				setEndBefore: function(a) {
					return this.setEnd(a.parentNode, domUtils.getNodeIndex(a))
				},
				setStartAtFirst: function(a) {
					return this.setStart(a, 0)
				},
				setStartAtLast: function(a) {
					return this.setStart(a, 3 == a.nodeType ? a.nodeValue.length : a.childNodes.length)
				},
				setEndAtFirst: function(a) {
					return this.setEnd(a, 0)
				},
				setEndAtLast: function(a) {
					return this.setEnd(a, 3 == a.nodeType ? a.nodeValue.length : a.childNodes.length)
				},
				selectNode: function(a) {
					return this.setStartBefore(a).setEndAfter(a)
				},
				selectNodeContents: function(a) {
					return this.setStart(a, 0).setEndAtLast(a)
				},
				cloneRange: function() {
					var a = this;
					return new h(a.document).setStart(a.startContainer, a.startOffset).setEnd(a.endContainer, a.endOffset)
				},
				collapse: function(a) {
					var b = this;
					return a ? (b.endContainer = b.startContainer, b.endOffset = b.startOffset) : (b.startContainer = b.endContainer, b.startOffset = b.endOffset), b.collapsed = !0, b
				},
				shrinkBoundary: function(a) {
					function e(a) {
						return 1 == a.nodeType && !domUtils.isBookmarkNode(a) && !dtd.$empty[a.tagName] && !dtd.$nonChild[a.tagName]
					}
					for (var c, b = this, d = b.collapsed; 1 == b.startContainer.nodeType && (c = b.startContainer.childNodes[b.startOffset]) && e(c);) b.setStart(c, 0);
					if (d) return b.collapse(!0);
					if (!a)
						for (; 1 == b.endContainer.nodeType && b.endOffset > 0 && (c = b.endContainer.childNodes[b.endOffset - 1]) && e(c);) b.setEnd(c, c.childNodes.length);
					return b
				},
				getCommonAncestor: function(a, b) {
					var c = this,
						d = c.startContainer,
						f = c.endContainer;
					return d === f ? a && e(this) && (d = d.childNodes[c.startOffset], 1 == d.nodeType) ? d : b && 3 == d.nodeType ? d.parentNode : d : domUtils.getCommonAncestor(d, f)
				},
				trimBoundary: function(a) {
					var b, c, d, e, f;
					return this.txtToElmBoundary(), b = this.startContainer, c = this.startOffset, d = this.collapsed, e = this.endContainer, 3 == b.nodeType && (0 == c ? this.setStartBefore(b) : c >= b.nodeValue.length ? this.setStartAfter(b) : (f = domUtils.split(b, c), b === e ? this.setEnd(f, this.endOffset - c) : b.parentNode === e && (this.endOffset += 1), this.setStartBefore(f)), d) ? this.collapse(!0) : (a || (c = this.endOffset, e = this.endContainer, 3 == e.nodeType && (0 == c ? this.setEndBefore(e) : (c < e.nodeValue.length && domUtils.split(e, c), this.setEndAfter(e)))), this)
				},
				txtToElmBoundary: function(a) {
					function b(a, b) {
						var c = a[b + "Container"],
							d = a[b + "Offset"];
						3 == c.nodeType && (d ? d >= c.nodeValue.length && a["set" + b.replace(/(\w)/, function(a) {
							return a.toUpperCase()
						}) + "After"](c) : a["set" + b.replace(/(\w)/, function(a) {
							return a.toUpperCase()
						}) + "Before"](c))
					}
					return (a || !this.collapsed) && (b(this, "start"), b(this, "end")), this
				},
				insertNode: function(a) {
					var d, e, f, b = a,
						c = 1;
					return 11 == a.nodeType && (b = a.firstChild, c = a.childNodes.length), this.trimBoundary(!0), d = this.startContainer, e = this.startOffset, f = d.childNodes[e], f ? d.insertBefore(a, f) : d.appendChild(a), b.parentNode === this.endContainer && (this.endOffset = this.endOffset + c), this.setStartBefore(b)
				},
				setCursor: function(a, b) {
					return this.collapse(!a).select(b)
				},
				createBookmark: function(b, c) {
					var d, e = this.document.createElement("span");
					return e.style.cssText = "display:none;line-height:0px;", e.appendChild(this.document.createTextNode("‍")), e.id = "_baidu_bookmark_start_" + (c ? "" : a++), this.collapsed || (d = e.cloneNode(!0), d.id = "_baidu_bookmark_end_" + (c ? "" : a++)), this.insertNode(e), d && this.collapse().insertNode(d).setEndBefore(d), this.setStartAfter(e), {
						start: b ? e.id : e,
						end: d ? b ? d.id : d : null,
						id: b
					}
				},
				moveToBookmark: function(a) {
					var b = a.id ? this.document.getElementById(a.start) : a.start,
						c = a.end && a.id ? this.document.getElementById(a.end) : a.end;
					return this.setStartBefore(b), domUtils.remove(b), c ? (this.setEndBefore(c), domUtils.remove(c)) : this.collapse(!0), this
				},
				enlarge: function(a, b) {
					var d, e, c = domUtils.isBody,
						f = this.document.createTextNode("");
					if (a) {
						for (e = this.startContainer, 1 == e.nodeType ? e.childNodes[this.startOffset] ? d = e = e.childNodes[this.startOffset] : (e.appendChild(f), d = e = f) : d = e;;) {
							if (domUtils.isBlockElm(e)) {
								for (e = d;
									(d = e.previousSibling) && !domUtils.isBlockElm(d);) e = d;
								this.setStartBefore(e);
								break
							}
							d = e, e = e.parentNode
						}
						for (e = this.endContainer, 1 == e.nodeType ? ((d = e.childNodes[this.endOffset]) ? e.insertBefore(f, d) : e.appendChild(f), d = e = f) : d = e;;) {
							if (domUtils.isBlockElm(e)) {
								for (e = d;
									(d = e.nextSibling) && !domUtils.isBlockElm(d);) e = d;
								this.setEndAfter(e);
								break
							}
							d = e, e = e.parentNode
						}
						f.parentNode === this.endContainer && this.endOffset--, domUtils.remove(f)
					}
					if (!this.collapsed) {
						for (; !(0 != this.startOffset || b && b(this.startContainer) || c(this.startContainer));) this.setStartBefore(this.startContainer);
						for (; !(this.endOffset != (1 == this.endContainer.nodeType ? this.endContainer.childNodes.length : this.endContainer.nodeValue.length) || b && b(this.endContainer) || c(this.endContainer));) this.setEndAfter(this.endContainer)
					}
					return this
				},
				enlargeToBlockElm: function(a) {
					for (; !domUtils.isBlockElm(this.startContainer);) this.setStartBefore(this.startContainer);
					if (!a)
						for (; !domUtils.isBlockElm(this.endContainer);) this.setEndAfter(this.endContainer);
					return this
				},
				adjustmentBoundary: function() {
					if (!this.collapsed) {
						for (; !domUtils.isBody(this.startContainer) && this.startOffset == this.startContainer[3 == this.startContainer.nodeType ? "nodeValue" : "childNodes"].length && this.startContainer[3 == this.startContainer.nodeType ? "nodeValue" : "childNodes"].length;) this.setStartAfter(this.startContainer);
						for (; !domUtils.isBody(this.endContainer) && !this.endOffset && this.endContainer[3 == this.endContainer.nodeType ? "nodeValue" : "childNodes"].length;) this.setEndBefore(this.endContainer)
					}
					return this
				},
				applyInlineStyle: function(a, b, c) {
					var h, i, d, e, f, g, j, l, k, m, n, p, o, q;
					if (this.collapsed) return this;
					for (this.trimBoundary().enlarge(!1, function(a) {
							return 1 == a.nodeType && domUtils.isBlockElm(a)
						}).adjustmentBoundary(), d = this.createBookmark(), e = d.end, f = function(a) {
							return 1 == a.nodeType ? "br" != a.tagName.toLowerCase() : !domUtils.isWhitespace(a)
						}, g = domUtils.getNextDomNode(d.start, !1, f), j = this.cloneRange(); g && domUtils.getPosition(g, e) & domUtils.POSITION_PRECEDING;)
						if (3 == g.nodeType || dtd[a][g.tagName]) {
							for (j.setStartBefore(g), h = g; h && (3 == h.nodeType || dtd[a][h.tagName]) && h !== e;) i = h, h = domUtils.getNextDomNode(h, 1 == h.nodeType, null, function(b) {
								return dtd[a][b.tagName]
							});
							if (k = j.setEndAfter(i).extractContents(), c && c.length > 0) {
								for (n = m = c[0].cloneNode(!1), o = 1; p = c[o++];) m.appendChild(p.cloneNode(!1)), m = m.firstChild;
								l = m
							} else l = j.document.createElement(a);
							if (b && domUtils.setAttributes(l, b), l.appendChild(k), j.insertNode(c ? n : l), "span" == a && b.style && /text\-decoration/.test(b.style) && (q = domUtils.findParentByTagName(l, "a", !0)) ? (domUtils.setAttributes(q, b), domUtils.remove(l, !0), l = q) : (domUtils.mergeSibling(l), domUtils.clearEmptySibling(l)), domUtils.mergeChild(l, b), g = domUtils.getNextDomNode(l, !1, f), domUtils.mergeToParent(l), h === e) break
						} else g = domUtils.getNextDomNode(g, !0, f);
					return this.moveToBookmark(d)
				},
				removeInlineStyle: function(a) {
					var b, c, e, f, d, h, g;
					if (this.collapsed) return this;
					for (a = utils.isArray(a) ? a : [a], this.shrinkBoundary().adjustmentBoundary(), b = this.startContainer, c = this.endContainer;;) {
						if (1 == b.nodeType) {
							if (utils.indexOf(a, b.tagName.toLowerCase()) > -1) break;
							if ("body" == b.tagName.toLowerCase()) {
								b = null;
								break
							}
						}
						b = b.parentNode
					}
					for (;;) {
						if (1 == c.nodeType) {
							if (utils.indexOf(a, c.tagName.toLowerCase()) > -1) break;
							if ("body" == c.tagName.toLowerCase()) {
								c = null;
								break
							}
						}
						c = c.parentNode
					}
					for (d = this.createBookmark(), b && (f = this.cloneRange().setEndBefore(d.start).setStartBefore(b), e = f.extractContents(), f.insertNode(e), domUtils.clearEmptySibling(b, !0), b.parentNode.insertBefore(d.start, b)), c && (f = this.cloneRange().setStartAfter(d.end).setEndAfter(c), e = f.extractContents(), f.insertNode(e), domUtils.clearEmptySibling(c, !1, !0), c.parentNode.insertBefore(d.end, c.nextSibling)), g = domUtils.getNextDomNode(d.start, !1, function(a) {
							return 1 == a.nodeType
						}); g && g !== d.end;) h = domUtils.getNextDomNode(g, !0, function(a) {
						return 1 == a.nodeType
					}), utils.indexOf(a, g.tagName.toLowerCase()) > -1 && domUtils.remove(g, !0), g = h;
					return this.moveToBookmark(d)
				},
				getClosedNode: function() {
					var a, b, c;
					return this.collapsed || (b = this.cloneRange().adjustmentBoundary().shrinkBoundary(), e(b) && (c = b.startContainer.childNodes[b.startOffset], c && 1 == c.nodeType && (dtd.$empty[c.tagName] || dtd.$nonChild[c.tagName]) && (a = c))), a
				},
				select: browser.ie ? function(a, d) {
					var e, f, l, h, k, m, n, o;
					if (this.collapsed || this.shrinkBoundary(), f = this.getClosedNode(), f && !d) {
						try {
							e = this.document.body.createControlRange(), e.addElement(f), e.select()
						} catch (g) {}
						return this
					}
					h = this.createBookmark(), k = h.start, e = this.document.body.createTextRange(), e.moveToElementText(k), e.moveStart("character", 1), this.collapsed ? a || 3 == this.startContainer.nodeType || (n = this.document.createTextNode(b), o = this.document.createElement("span"), o.appendChild(this.document.createTextNode(b)), k.parentNode.insertBefore(o, k), k.parentNode.insertBefore(n, k), i(this.document, n), c = n, j(o, "previousSibling"), j(k, "nextSibling"), e.moveStart("character", -1), e.collapse(!0)) : (m = this.document.body.createTextRange(), l = h.end, m.moveToElementText(l), e.setEndPoint("EndToEnd", m)), this.moveToBookmark(h), o && domUtils.remove(o);
					try {
						e.select()
					} catch (g) {}
					return this
				} : function(a) {
					function d(a) {
						function b(b, c, d) {
							3 == b.nodeType && b.nodeValue.length < c && (a[d + "Offset"] = b.nodeValue.length)
						}
						b(a.startContainer, a.startOffset, "start"), b(a.endContainer, a.endOffset, "end")
					}
					var g, h, k, l, e = domUtils.getWindow(this.document),
						f = e.getSelection();
					if (browser.gecko ? this.document.body.focus() : e.focus(), f) {
						if (f.removeAllRanges(), this.collapsed && !a && (h = this.startContainer, k = h, 1 == h.nodeType && (k = h.childNodes[this.startOffset]), 3 == h.nodeType && this.startOffset || (k ? k.previousSibling && 3 == k.previousSibling.nodeType : h.lastChild && 3 == h.lastChild.nodeType) || (g = this.document.createTextNode(b), this.insertNode(g), i(this.document, g), j(g, "previousSibling"), j(g, "nextSibling"), c = g, this.setStart(g, browser.webkit ? 1 : 0).collapse(!0))), l = this.document.createRange(), this.collapsed && browser.opera && 1 == this.startContainer.nodeType)
							if (k = this.startContainer.childNodes[this.startOffset]) {
								for (; k && domUtils.isBlockElm(k) && 1 == k.nodeType && k.childNodes[0];) k = k.childNodes[0];
								k && this.setStartBefore(k).collapse(!0)
							} else k = this.startContainer.lastChild, k && domUtils.isBr(k) && this.setStartBefore(k).collapse(!0);
						d(this), l.setStart(this.startContainer, this.startOffset), l.setEnd(this.endContainer, this.endOffset), f.addRange(l)
					}
					return this
				},
				scrollToView: function(a, b) {
					a = a ? window : domUtils.getWindow(this.document);
					var c = this,
						d = c.document.createElement("span");
					return d.innerHTML = "&nbsp;", c.cloneRange().insertNode(d), domUtils.scrollToView(d, a, b), domUtils.remove(d), c
				},
				inFillChar: function() {
					var a = this.startContainer;
					return this.collapsed && 3 == a.nodeType && a.nodeValue.replace(new RegExp("^" + domUtils.fillChar), "").length + 1 == a.nodeValue.length ? !0 : !1
				},
				createAddress: function(a, b) {
					function e(a) {
						var h, g, i, j, k, c = a ? d.startContainer : d.endContainer,
							e = domUtils.findParents(c, !0, function(a) {
								return !domUtils.isBody(a)
							}),
							f = [];
						for (g = 0; h = e[g++];) f.push(domUtils.getNodeIndex(h, b));
						if (i = 0, b)
							if (3 == c.nodeType) {
								for (j = c.previousSibling; j && 3 == j.nodeType;) i += j.nodeValue.replace(fillCharReg, "").length, j = j.previousSibling;
								i += a ? d.startOffset : d.endOffset
							} else if (c = c.childNodes[a ? d.startOffset : d.endOffset]) i = domUtils.getNodeIndex(c, b);
						else
							for (c = a ? d.startContainer : d.endContainer, k = c.firstChild; k;)
								if (domUtils.isFillChar(k)) k = k.nextSibling;
								else if (i++, 3 == k.nodeType)
							for (; k && 3 == k.nodeType;) k = k.nextSibling;
						else k = k.nextSibling;
						else i = a ? domUtils.isFillChar(c) ? 0 : d.startOffset : d.endOffset;
						return 0 > i && (i = 0), f.push(i), f
					}
					var c = {},
						d = this;
					return c.startAddress = e(!0), a || (c.endAddress = d.collapsed ? [].concat(c.startAddress) : e()), c
				},
				moveToAddress: function(a, b) {
					function d(a, b) {
						var e, f, h, g, i, d = c.document.body;
						for (g = 0, i = a.length; i > g; g++)
							if (h = a[g], e = d, d = d.childNodes[h], !d) {
								f = h;
								break
							}
						b ? d ? c.setStartBefore(d) : c.setStart(e, f) : d ? c.setEndBefore(d) : c.setEnd(e, f)
					}
					var c = this;
					return d(a.startAddress, !0), !b && a.endAddress && d(a.endAddress), c
				},
				equals: function(a) {
					for (var b in this)
						if (this.hasOwnProperty(b) && this[b] !== a[b]) return !1;
					return !0
				},
				traversal: function(a, b) {
					var c, d, e, f;
					if (this.collapsed) return this;
					for (c = this.createBookmark(), d = c.end, e = domUtils.getNextDomNode(c.start, !1, b); e && e !== d && domUtils.getPosition(e, d) & domUtils.POSITION_PRECEDING;) f = domUtils.getNextDomNode(e, !1, b), a(e), e = f;
					return this.moveToBookmark(c)
				}
			}
		}(),
		function() {
			function a(a, b) {
				var d, f, k, e, g, h, i, j, l, m, n, c = domUtils.getNodeIndex;
				if (a = a.duplicate(), a.collapse(b), d = a.parentElement(), !d.hasChildNodes()) return {
					container: d,
					offset: 0
				};
				for (e = d.children, g = a.duplicate(), h = 0, i = e.length - 1, j = -1; i >= h;)
					if (j = Math.floor((h + i) / 2), f = e[j], g.moveToElementText(f), l = g.compareEndPoints("StartToStart", a), l > 0) i = j - 1;
					else {
						if (!(0 > l)) return {
							container: d,
							offset: c(f)
						};
						h = j + 1
					}
				if (-1 == j) {
					if (g.moveToElementText(d), g.setEndPoint("StartToStart", a), k = g.text.replace(/(\r\n|\r)/g, "\n").length, e = d.childNodes, !k) return f = e[e.length - 1], {
						container: f,
						offset: f.nodeValue.length
					};
					for (m = e.length; k > 0;) k -= e[--m].nodeValue.length;
					return {
						container: e[m],
						offset: -k
					}
				}
				if (g.collapse(l > 0), g.setEndPoint(l > 0 ? "StartToStart" : "EndToStart", a), k = g.text.replace(/(\r\n|\r)/g, "\n").length, !k) return dtd.$empty[f.tagName] || dtd.$nonChild[f.tagName] ? {
					container: d,
					offset: c(f) + (l > 0 ? 0 : 1)
				} : {
					container: f,
					offset: l > 0 ? 0 : f.childNodes.length
				};
				for (; k > 0;) try {
					n = f, f = f[l > 0 ? "previousSibling" : "nextSibling"], k -= f.nodeValue.length
				} catch (o) {
					return {
						container: d,
						offset: c(n)
					}
				}
				return {
					container: f,
					offset: l > 0 ? -k : f.nodeValue.length + k
				}
			}

			function b(b, c) {
				if (b.item) c.selectNode(b.item(0));
				else {
					var d = a(b, !0);
					c.setStart(d.container, d.offset), 0 != b.compareEndPoints("StartToEnd", b) && (d = a(b, !1), c.setEnd(d.container, d.offset))
				}
				return c
			}

			function c(a) {
				var b, d;
				try {
					b = a.getNative().createRange()
				} catch (c) {
					return null
				}
				return d = b.item ? b.item(0) : b.parentElement(), (d.ownerDocument || d) === a.document ? b : null
			}
			var d = dom.Selection = function(a) {
				var d, b = this;
				b.document = a, browser.ie9below && (d = domUtils.getWindow(a).frameElement, domUtils.on(d, "beforedeactivate", function() {
					b._bakIERange = b.getIERange()
				}), domUtils.on(d, "activate", function() {
					try {
						!c(b) && b._bakIERange && b._bakIERange.select()
					} catch (a) {}
					b._bakIERange = null
				})), d = a = null
			};
			d.prototype = {
				rangeInBody: function(a, b) {
					var c = browser.ie9below || b ? a.item ? a.item() : a.parentElement() : a.startContainer;
					return c === this.document.body || domUtils.inDoc(c, this.document)
				},
				getNative: function() {
					var a = this.document;
					try {
						return a ? browser.ie9below ? a.selection : domUtils.getWindow(a).getSelection() : null
					} catch (b) {
						return null
					}
				},
				getIERange: function() {
					var a = c(this);
					return !a && this._bakIERange ? this._bakIERange : a
				},
				cache: function() {
					this.clear(), this._cachedRange = this.getRange(), this._cachedStartElement = this.getStart(), this._cachedStartElementPath = this.getStartElementPath()
				},
				getStartElementPath: function() {
					if (this._cachedStartElementPath) return this._cachedStartElementPath;
					var a = this.getStart();
					return a ? domUtils.findParents(a, !0, null, !0) : []
				},
				clear: function() {
					this._cachedStartElementPath = this._cachedRange = this._cachedStartElement = null
				},
				isFocus: function() {
					try {
						if (browser.ie9below) {
							var a = c(this);
							return !(!a || !this.rangeInBody(a))
						}
						return !!this.getNative().rangeCount
					} catch (b) {
						return !1
					}
				},
				getRange: function() {
					function c(b) {
						for (var c = a.document.body.firstChild, d = b.collapsed; c && c.firstChild;) b.setStart(c, 0), c = c.firstChild;
						b.startContainer || b.setStart(a.document.body, 0), d && b.collapse(!0)
					}
					var d, e, g, h, i, a = this;
					if (null != a._cachedRange) return this._cachedRange;
					if (d = new baidu.editor.dom.Range(a.document), browser.ie9below)
						if (e = a.getIERange()) try {
							b(e, d)
						} catch (f) {
							c(d)
						} else c(d);
						else if (g = a.getNative(), g && g.rangeCount) h = g.getRangeAt(0), i = g.getRangeAt(g.rangeCount - 1), d.setStart(h.startContainer, h.startOffset).setEnd(i.endContainer, i.endOffset), d.collapsed && domUtils.isBody(d.startContainer) && !d.startOffset && c(d);
					else {
						if (this._bakRange && domUtils.inDoc(this._bakRange.startContainer, this.document)) return this._bakRange;
						c(d)
					}
					return this._bakRange = d
				},
				getStart: function() {
					if (this._cachedStartElement) return this._cachedStartElement;
					var b, c, d, e, a = browser.ie9below ? this.getIERange() : this.getRange();
					if (browser.ie9below) {
						if (!a) return this.document.body.firstChild;
						if (a.item) return a.item(0);
						for (b = a.duplicate(), b.text.length > 0 && b.moveStart("character", 1), b.collapse(1), c = b.parentElement(), e = d = a.parentElement(); d = d.parentNode;)
							if (d == c) {
								c = e;
								break
							}
					} else if (a.shrinkBoundary(), c = a.startContainer, 1 == c.nodeType && c.hasChildNodes() && (c = c.childNodes[Math.min(c.childNodes.length - 1, a.startOffset)]), 3 == c.nodeType) return c.parentNode;
					return c
				},
				getText: function() {
					var a, b;
					return this.isFocus() && (a = this.getNative()) ? (b = browser.ie9below ? a.createRange() : a.getRangeAt(0), browser.ie9below ? b.text : b.toString()) : ""
				},
				clearRange: function() {
					this.getNative()[browser.ie9below ? "empty" : "removeAllRanges"]()
				}
			}
		}(),
		function() {
			function c(a, b) {
				var c, e, d, f;
				if (b.textarea)
					if (utils.isString(b.textarea)) {
						for (d = 0, f = domUtils.getElementsByTagName(a, "textarea"); e = f[d++];)
							if (e.id == "ueditor_textarea_" + b.options.textarea) {
								c = e;
								break
							}
					} else c = b.textarea;
				c || (a.appendChild(c = domUtils.createElement(document, "textarea", {
					name: b.options.textarea,
					id: "ueditor_textarea_" + b.options.textarea,
					style: "display:none"
				})), b.textarea = c), !c.getAttribute("name") && c.setAttribute("name", b.options.textarea), c.value = b.hasContents() ? b.options.allHtmlEnabled ? b.getAllHtml() : b.getContent(null, null, !0) : ""
			}

			function e(a) {
				for (var b in a) return b
			}

			function f(a) {
				a.langIsReady = !0, a.fireEvent("langReady")
			}
			var b, a = 0,
				g = UE.Editor = function(b) {
					var c = this;
					c.uid = a++, EventBase.call(c), c.commands = {}, c.options = utils.extend(utils.clone(b || {}), UEDITOR_CONFIG, !0), c.shortcutkeys = {}, c.inputRules = [], c.outputRules = [], c.setOpt(g.defaultOptions(c)), c.loadServerConfig(), utils.isEmptyObject(UE.I18N) ? utils.loadFile(document, {
						src: c.options.langPath + c.options.lang + "/" + c.options.lang + ".js",
						tag: "script",
						type: "text/javascript",
						defer: "defer"
					}, function() {
						UE.plugin.load(c), f(c)
					}) : (c.options.lang = e(UE.I18N), UE.plugin.load(c), f(c)), UE.instants["ueditorInstant" + c.uid] = c
				};
			g.prototype = {
				registerCommand: function(a, b) {
					this.commands[a] = b
				},
				ready: function(a) {
					var b = this;
					a && (b.isReady ? a.apply(b) : b.addListener("ready", a))
				},
				setOpt: function(a, b) {
					var c = {};
					utils.isString(a) ? c[a] = b : c = a, utils.extend(this.options, c, !0)
				},
				getOpt: function(a) {
					return this.options[a]
				},
				destroy: function() {
					var b, c, d, e, a = this;
					a.fireEvent("destroy"), b = a.container.parentNode, c = a.textarea, c ? c.style.display = "" : (c = document.createElement("textarea"), b.parentNode.insertBefore(c, b)), c.style.width = a.iframe.offsetWidth + "px", c.style.height = a.iframe.offsetHeight + "px", c.value = a.getContent(), c.id = a.key, b.innerHTML = "", domUtils.remove(b), d = a.key;
					for (e in a) a.hasOwnProperty(e) && delete this[e];
					UE.delEditor(d)
				},
				render: function(a) {
					var e, b = this,
						c = b.options,
						d = function(b) {
							return parseInt(domUtils.getComputedStyle(a, b))
						};
					utils.isString(a) && (a = document.getElementById(a)), a && (c.minFrameWidth = c.initialFrameWidth ? c.initialFrameWidth : c.initialFrameWidth = a.offsetWidth, c.initialFrameHeight ? c.minFrameHeight = c.initialFrameHeight : c.initialFrameHeight = c.minFrameHeight = a.offsetHeight, a.style.width = /%$/.test(c.initialFrameWidth) ? "100%" : c.initialFrameWidth - d("padding-left") - d("padding-right") + "px", a.style.height = /%$/.test(c.initialFrameHeight) ? "100%" : c.initialFrameHeight - d("padding-top") - d("padding-bottom") + "px", a.style.zIndex = c.zIndex, e = (ie && browser.version < 9 ? "" : "<!DOCTYPE html>") + "<html xmlns='http://www.w3.org/1999/xhtml' class='view' ><head>" + "<style type='text/css'>" + ".view{padding:0;word-wrap:break-word;cursor:text;height:90%;}\n" + "body{margin:8px;font-family:sans-serif;font-size:16px;}" + "p{margin:5px 0;}</style>" + (c.iframeCssUrl ? "<link rel='stylesheet' type='text/css' href='" + utils.unhtml(c.iframeCssUrl) + "'/>" : "") + (c.initialStyle ? "<style>" + c.initialStyle + "</style>" : "") + "</head><body class='view' ></body>" + "<script type='text/javascript' " + (ie ? "defer='defer'" : "") + " id='_initialScript'>" + "setTimeout(function(){editor = window.parent.UE.instants['ueditorInstant" + b.uid + "'];editor._setup(document);},0);" + "var _tmpScript = document.getElementById('_initialScript');_tmpScript.parentNode.removeChild(_tmpScript);</script></html>", a.appendChild(domUtils.createElement(document, "iframe", {
						id: "ueditor_" + b.uid,
						width: "100%",
						height: "100%",
						frameborder: "0",
						src: "javascript:void(function(){document.open();" + (c.customDomain && document.domain != location.hostname ? 'document.domain="' + document.domain + '";' : "") + 'document.write("' + e + '");document.close();}())'
					})), a.style.overflow = "hidden", setTimeout(function() {
						/%$/.test(c.initialFrameWidth) && (c.minFrameWidth = c.initialFrameWidth = a.offsetWidth), /%$/.test(c.initialFrameHeight) && (c.minFrameHeight = c.initialFrameHeight = a.offsetHeight, a.style.height = c.initialFrameHeight + "px")
					}))
				},
				_setup: function(a) {
					var e, f, g, b = this,
						d = b.options;
					for (ie ? (a.body.disabled = !0, a.body.contentEditable = !0, a.body.disabled = !1) : a.body.contentEditable = !0, a.body.spellcheck = !1, b.document = a, b.window = a.defaultView || a.parentWindow, b.iframe = b.window.frameElement, b.body = a.body, b.selection = new dom.Selection(a), browser.gecko && (e = this.selection.getNative()) && e.removeAllRanges(), this._initEvents(), f = this.iframe.parentNode; !domUtils.isBody(f); f = f.parentNode)
						if ("FORM" == f.tagName) {
							b.form = f, b.options.autoSyncData ? domUtils.on(b.window, "blur", function() {
								c(f, b)
							}) : domUtils.on(f, "submit", function() {
								c(this, b)
							});
							break
						}
					d.initialContent && (d.autoClearinitialContent ? (g = b.execCommand, b.execCommand = function() {
						return b.fireEvent("firstBeforeExecCommand"), g.apply(b, arguments)
					}, this._setDefaultContent(d.initialContent)) : this.setContent(d.initialContent, !1, !0)), domUtils.isEmptyNode(b.body) && (b.body.innerHTML = "<p>" + (browser.ie ? "" : "<br/>") + "</p>"), d.focus && setTimeout(function() {
						b.focus(b.options.focusInEnd), !b.options.autoClearinitialContent && b._selectionChange()
					}, 0), b.container || (b.container = this.iframe.parentNode), d.fullscreen && b.ui && b.ui.setFullScreen(!0);
					try {
						b.document.execCommand("2D-position", !1, !1)
					} catch (h) {}
					try {
						b.document.execCommand("enableInlineTableEditing", !1, !1)
					} catch (h) {}
					try {
						b.document.execCommand("enableObjectResizing", !1, !1)
					} catch (h) {}
					b._bindshortcutKeys(), b.isReady = 1, b.fireEvent("ready"), d.onready && d.onready.call(b), browser.ie9below || domUtils.on(b.window, ["blur", "focus"], function(a) {
						if ("blur" == a.type) {
							b._bakRange = b.selection.getRange();
							try {
								b._bakNativeRange = b.selection.getNative().getRangeAt(0), b.selection.getNative().removeAllRanges()
							} catch (a) {
								b._bakNativeRange = null
							}
						} else try {
							b._bakRange && b._bakRange.select()
						} catch (a) {}
					}), browser.gecko && browser.version <= 10902 && (b.body.contentEditable = !1, setTimeout(function() {
						b.body.contentEditable = !0
					}, 100), setInterval(function() {
						b.body.style.height = b.iframe.offsetHeight - 20 + "px"
					}, 100)), !d.isShow && b.setHide(), d.readonly && b.setDisabled()
				},
				sync: function(a) {
					var b = this,
						d = a ? document.getElementById(a) : domUtils.findParent(b.iframe.parentNode, function(a) {
							return "FORM" == a.tagName
						}, !0);
					d && c(d, b)
				},
				setHeight: function(a, b) {
					a !== parseInt(this.iframe.parentNode.style.height) && (this.iframe.parentNode.style.height = a + "px"), !b && (this.options.minFrameHeight = this.options.initialFrameHeight = a), this.body.style.height = a + "px", !b && this.trigger("setHeight")
				},
				addshortcutkey: function(a, b) {
					var c = {};
					b ? c[a] = b : c = a, utils.extend(this.shortcutkeys, c)
				},
				_bindshortcutKeys: function() {
					var a = this,
						b = this.shortcutkeys;
					a.addListener("keydown", function(c, d) {
						var f, g, i, h, j, k, e = d.keyCode || d.which;
						for (f in b)
							for (g = b[f].split(","), h = 0; i = g[h++];) i = i.split(":"), j = i[0], k = i[1], (/^(ctrl)(\+shift)?\+(\d+)$/.test(j.toLowerCase()) || /^(\d+)$/.test(j)) && (("ctrl" == RegExp.$1 ? d.ctrlKey || d.metaKey : 0) && ("" != RegExp.$2 ? d[RegExp.$2.slice(1) + "Key"] : 1) && e == RegExp.$3 || e == RegExp.$1) && (-1 != a.queryCommandState(f, k) && a.execCommand(f, k), domUtils.preventDefault(d))
					})
				},
				getContent: function(a, b, c, d, e) {
					var g, f = this;
					return a && utils.isFunction(a) && (b = a, a = ""), (b ? b() : this.hasContents()) ? (f.fireEvent("beforegetcontent"), g = UE.htmlparser(f.body.innerHTML, d), f.filterOutputRule(g), f.fireEvent("aftergetcontent", a, g), g.toHtml(e)) : ""
				},
				getAllHtml: function() {
					var d, a = this,
						b = [];
					return a.fireEvent("getAllHtml", b), browser.ie && browser.version > 8 && (d = "", utils.each(a.document.styleSheets, function(a) {
						d += a.href ? '<link rel="stylesheet" type="text/css" href="' + a.href + '" />' : "<style>" + a.cssText + "</style>"
					}), utils.each(a.document.getElementsByTagName("script"), function(a) {
						d += a.outerHTML
					})), "<html><head>" + (a.options.charset ? '<meta http-equiv="Content-Type" content="text/html; charset=' + a.options.charset + '"/>' : "") + (d || a.document.getElementsByTagName("head")[0].innerHTML) + b.join("\n") + "</head>" + "<body " + (ie && browser.version < 9 ? 'class="view"' : "") + ">" + a.getContent(null, null, !0) + "</body></html>"
				},
				getPlainTxt: function() {
					var a = new RegExp(domUtils.fillChar, "g"),
						b = this.body.innerHTML.replace(/[\n\r]/g, "");
					return b = b.replace(/<(p|div)[^>]*>(<br\/?>|&nbsp;)<\/\1>/gi, "\n").replace(/<br\/?>/gi, "\n").replace(/<[^>/]+>/g, "").replace(/(\n)?<\/([^>]+)>/g, function(a, b, c) {
						return dtd.$block[c] ? "\n" : b ? b : ""
					}), b.replace(a, "").replace(/\u00a0/g, " ").replace(/&nbsp;/g, " ")
				},
				getContentTxt: function() {
					var a = new RegExp(domUtils.fillChar, "g");
					return this.body[browser.ie ? "innerText" : "textContent"].replace(a, "").replace(/\u00a0/g, " ")
				},
				setContent: function(a, b, d) {
					function g(a) {
						return "DIV" == a.tagName && a.getAttribute("cdata_tag")
					}
					var f, i, h, j, k, e = this;
					if (e.fireEvent("beforesetcontent", a), f = UE.htmlparser(a), e.filterInputRule(f), a = f.toHtml(), e.body.innerHTML = (b ? e.body.innerHTML : "") + a, "p" == e.options.enterTag)
						if (h = this.body.firstChild, !h || 1 == h.nodeType && (dtd.$cdata[h.tagName] || g(h) || domUtils.isCustomeNode(h)) && h === this.body.lastChild) this.body.innerHTML = "<p>" + (browser.ie ? "&nbsp;" : "<br/>") + "</p>" + this.body.innerHTML;
						else
							for (j = e.document.createElement("p"); h;) {
								for (; h && (3 == h.nodeType || 1 == h.nodeType && dtd.p[h.tagName] && !dtd.$cdata[h.tagName]);) i = h.nextSibling, j.appendChild(h), h = i;
								if (j.firstChild) {
									if (!h) {
										e.body.appendChild(j);
										break
									}
									h.parentNode.insertBefore(j, h), j = e.document.createElement("p")
								}
								h = h.nextSibling
							}
						e.fireEvent("aftersetcontent"), e.fireEvent("contentchange"), !d && e._selectionChange(), e._bakRange = e._bakIERange = e._bakNativeRange = null, browser.gecko && (k = this.selection.getNative()) && k.removeAllRanges(), e.options.autoSyncData && e.form && c(e.form, e)
				},
				focus: function(a) {
					var b, c, d;
					try {
						b = this, c = b.selection.getRange(), a ? (d = b.body.lastChild, d && 1 == d.nodeType && !dtd.$empty[d.tagName] && (domUtils.isEmptyBlock(d) ? c.setStartAtFirst(d) : c.setStartAtLast(d), c.collapse(!0)), c.setCursor(!0)) : (!c.collapsed && domUtils.isBody(c.startContainer) && 0 == c.startOffset && (d = b.body.firstChild, d && 1 == d.nodeType && !dtd.$empty[d.tagName] && c.setStartAtFirst(d).collapse(!0)), c.select(!0)), this.fireEvent("focus selectionchange")
					} catch (e) {}
				},
				isFocus: function() {
					return this.selection.isFocus()
				},
				blur: function() {
					var b, a = this.selection.getNative();
					a.empty && browser.ie ? (b = document.body.createTextRange(), b.moveToElementText(document.body), b.collapse(!0), b.select(), a.empty()) : a.removeAllRanges()
				},
				_initEvents: function() {
					var a = this,
						b = a.document,
						c = a.window;
					a._proxyDomEvent = utils.bind(a._proxyDomEvent, a), domUtils.on(b, ["click", "contextmenu", "mousedown", "keydown", "keyup", "keypress", "mouseup", "mouseover", "mouseout", "selectstart"], a._proxyDomEvent), domUtils.on(c, ["focus", "blur"], a._proxyDomEvent), domUtils.on(a.body, "drop", function(b) {
						browser.gecko && b.stopPropagation && b.stopPropagation(), a.fireEvent("contentchange")
					}), domUtils.on(b, ["mouseup", "keydown"], function(b) {
						"keydown" == b.type && (b.ctrlKey || b.metaKey || b.shiftKey || b.altKey) || 2 != b.button && a._selectionChange(250, b)
					})
				},
				_proxyDomEvent: function(a) {
					return this.fireEvent("before" + a.type.replace(/^on/, "").toLowerCase()) === !1 ? !1 : this.fireEvent(a.type.replace(/^on/, ""), a) === !1 ? !1 : this.fireEvent("after" + a.type.replace(/^on/, "").toLowerCase())
				},
				_selectionChange: function(a, c) {
					var f, g, h, d = this,
						e = !1;
					browser.ie && browser.version < 9 && c && "mouseup" == c.type && (h = this.selection.getRange(), h.collapsed || (e = !0, f = c.clientX, g = c.clientY)), clearTimeout(b), b = setTimeout(function() {
						var a, h;
						if (d.selection && d.selection.getNative()) {
							if (e && "None" == d.selection.getNative().type) {
								a = d.document.body.createTextRange();
								try {
									a.moveToPoint(f, g)
								} catch (b) {
									a = null
								}
							}
							a && (h = d.selection.getIERange, d.selection.getIERange = function() {
								return a
							}), d.selection.cache(), h && (d.selection.getIERange = h), d.selection._cachedRange && d.selection._cachedStartElement && (d.fireEvent("beforeselectionchange"), d.fireEvent("selectionchange", !!c), d.fireEvent("afterselectionchange"), d.selection.clear())
						}
					}, a || 50)
				},
				_callCmdFn: function(a, b) {
					var d, e, c = b[0].toLowerCase();
					return d = this.commands[c] || UE.commands[c], e = d && d[a], d && e || "queryCommandState" != a ? e ? e.apply(this, b) : void 0 : 0
				},
				execCommand: function(a) {
					a = a.toLowerCase();
					var c, b = this,
						d = b.commands[a] || UE.commands[a];
					return d && d.execCommand ? (d.notNeedUndo || b.__hasEnterExecCommand ? (c = this._callCmdFn("execCommand", arguments), !b.__hasEnterExecCommand && !d.ignoreContentChange && !b._ignoreContentChange && b.fireEvent("contentchange")) : (b.__hasEnterExecCommand = !0, -1 != b.queryCommandState.apply(b, arguments) && (b.fireEvent("saveScene"), b.fireEvent.apply(b, ["beforeexeccommand", a].concat(arguments)), c = this._callCmdFn("execCommand", arguments), b.fireEvent.apply(b, ["afterexeccommand", a].concat(arguments)), b.fireEvent("saveScene")), b.__hasEnterExecCommand = !1), !b.__hasEnterExecCommand && !d.ignoreContentChange && !b._ignoreContentChange && b._selectionChange(), c) : null
				},
				queryCommandState: function() {
					return this._callCmdFn("queryCommandState", arguments)
				},
				queryCommandValue: function() {
					return this._callCmdFn("queryCommandValue", arguments)
				},
				hasContents: function(a) {
					var c, b, d, f, e;
					if (a)
						for (b = 0; c = a[b++];)
							if (this.document.getElementsByTagName(c).length > 0) return !0;
					if (!domUtils.isEmptyBlock(this.body)) return !0;
					for (a = ["div"], b = 0; c = a[b++];)
						for (d = domUtils.getElementsByTagName(this.document, c), e = 0; f = d[e++];)
							if (domUtils.isCustomeNode(f)) return !0;
					return !1
				},
				reset: function() {
					this.fireEvent("reset")
				},
				setEnabled: function() {
					var b, a = this;
					if ("false" == a.body.contentEditable) {
						a.body.contentEditable = !0, b = a.selection.getRange();
						try {
							b.moveToBookmark(a.lastBk), delete a.lastBk
						} catch (c) {
							b.setStartAtFirst(a.body).collapse(!0)
						}
						b.select(!0), a.bkqueryCommandState && (a.queryCommandState = a.bkqueryCommandState, delete a.bkqueryCommandState), a.bkqueryCommandValue && (a.queryCommandValue = a.bkqueryCommandValue, delete a.bkqueryCommandValue), a.fireEvent("selectionchange")
					}
				},
				enable: function() {
					return this.setEnabled()
				},
				setDisabled: function(a) {
					var b = this;
					a = a ? utils.isArray(a) ? a : [a] : [], "true" == b.body.contentEditable && (b.lastBk || (b.lastBk = b.selection.getRange().createBookmark(!0)), b.body.contentEditable = !1, b.bkqueryCommandState = b.queryCommandState, b.bkqueryCommandValue = b.queryCommandValue, b.queryCommandState = function(c) {
						return -1 != utils.indexOf(a, c) ? b.bkqueryCommandState.apply(b, arguments) : -1
					}, b.queryCommandValue = function(c) {
						return -1 != utils.indexOf(a, c) ? b.bkqueryCommandValue.apply(b, arguments) : null
					}, b.fireEvent("selectionchange"))
				},
				disable: function(a) {
					return this.setDisabled(a)
				},
				_setDefaultContent: function() {
					function a() {
						var b = this;
						b.document.getElementById("initContent") && (b.body.innerHTML = "<p>" + (ie ? "" : "<br/>") + "</p>", b.removeListener("firstBeforeExecCommand focus", a), setTimeout(function() {
							b.focus(), b._selectionChange()
						}, 0))
					}
					return function(b) {
						var c = this;
						c.body.innerHTML = '<p id="initContent">' + b + "</p>", c.addListener("firstBeforeExecCommand focus", a)
					}
				}(),
				setShow: function() {
					var a = this,
						b = a.selection.getRange();
					if ("none" == a.container.style.display) {
						try {
							b.moveToBookmark(a.lastBk), delete a.lastBk
						} catch (c) {
							b.setStartAtFirst(a.body).collapse(!0)
						}
						setTimeout(function() {
							b.select(!0)
						}, 100), a.container.style.display = ""
					}
				},
				show: function() {
					return this.setShow()
				},
				setHide: function() {
					var a = this;
					a.lastBk || (a.lastBk = a.selection.getRange().createBookmark(!0)), a.container.style.display = "none"
				},
				hide: function() {
					return this.setHide()
				},
				getLang: function(a) {
					var d, c, b = UE.I18N[this.options.lang];
					if (!b) throw Error("not import language file");
					for (a = (a || "").split("."), c = 0;
						(d = a[c++]) && (b = b[d], b););
					return b
				},
				getContentLength: function(a, b) {
					var e, d, c = this.getContent(!1, !1, !0).length;
					// if (a)
						// for (b = (b || []).concat(["hr", "img", "iframe"]), c = this.getContentTxt().replace(/[\t\r\n]+/g, "").length, d = 0; e = b[d++];) c += this.document.getElementsByTagName(e).length;
					return c
				},
				addInputRule: function(a) {
					this.inputRules.push(a)
				},
				filterInputRule: function(a) {
					for (var c, b = 0; c = this.inputRules[b++];) c.call(this, a)
				},
				addOutputRule: function(a) {
					this.outputRules.push(a)
				},
				filterOutputRule: function(a) {
					for (var c, b = 0; c = this.outputRules[b++];) c.call(this, a)
				},
				getActionUrl: function(a) {
					var b = this.getOpt(a) || a,
						c = this.getOpt("imageUrl"),
						d = this.getOpt("serverUrl");
					return !d && c && (d = c.replace(/^(.*[\/]).+([\.].+)$/, "$1controller$2")), d ? (d = d + (-1 == d.indexOf("?") ? "?" : "&") + "action=" + (b || ""), utils.formatUrl(d)) : ""
				}
			}, utils.inherits(g, EventBase)
		}(), UE.Editor.defaultOptions = function(a) {
			var b = a.options.UEDITOR_HOME_URL;
			return {
				isShow: !0,
				initialContent: "",
				initialStyle: "",
				autoClearinitialContent: !1,
				iframeCssUrl: b + "themes/iframe.css",
				textarea: "editorValue",
				focus: !1,
				focusInEnd: !0,
				autoClearEmptyNode: !0,
				fullscreen: !1,
				readonly: !1,
				zIndex: 999,
				imagePopup: !0,
				enterTag: "p",
				customDomain: !1,
				lang: "zh-cn",
				langPath: b + "lang/",
				theme: "default",
				themePath: b + "themes/",
				allHtmlEnabled: !1,
				scaleEnabled: !1,
				tableNativeEditInFF: !1,
				autoSyncData: !0,
				fileNameFormat: "{time}{rand:6}"
			}
		},
		function() {
			UE.Editor.prototype.loadServerConfig = function() {
				function showErrorMsg(a) {
					console && console.error(a)
				}
				var me = this;
				setTimeout(function() {
					try {
						me.options.imageUrl && me.setOpt("serverUrl", me.options.imageUrl.replace(/^(.*[\/]).+([\.].+)$/, "$1controller$2"));
						var configUrl = me.getActionUrl("config"),
							isJsonp = utils.isCrossDomainUrl(configUrl);
						me._serverConfigLoaded = !1, configUrl && UE.ajax.request(configUrl, {
							method: "GET",
							dataType: isJsonp ? "jsonp" : "",
							onsuccess: function(r) {
								try {
									var config = isJsonp ? r : eval("(" + r.responseText + ")");
									utils.extend(me.options, config), me.fireEvent("serverConfigLoaded"), me._serverConfigLoaded = !0
								} catch (e) {
									showErrorMsg(me.getLang("loadconfigFormatError"))
								}
							},
							onerror: function() {
								showErrorMsg(me.getLang("loadconfigHttpError"))
							}
						})
					} catch (e) {
						showErrorMsg(me.getLang("loadconfigError"))
					}
				})
			}, UE.Editor.prototype.isServerConfigLoaded = function() {
				var a = this;
				return a._serverConfigLoaded || !1
			}, UE.Editor.prototype.afterConfigReady = function(a) {
				var b, c;
				a && utils.isFunction(a) && (b = this, c = function() {
					a.apply(b, arguments), b.removeListener("serverConfigLoaded", c)
				}, b.isServerConfigLoaded() ? a.call(b, "serverConfigLoaded") : b.addListener("serverConfigLoaded", c))
			}
		}(), UE.ajax = function() {
			function d(a) {
				var c, d, b = [];
				for (c in a)
					if ("method" != c && "timeout" != c && "async" != c && "dataType" != c && "callback" != c && void 0 != a[c] && null != a[c])
						if ("function" != (typeof a[c]).toLowerCase() && "object" != (typeof a[c]).toLowerCase()) b.push(encodeURIComponent(c) + "=" + encodeURIComponent(a[c]));
						else if (utils.isArray(a[c]))
					for (d = 0; d < a[c].length; d++) b.push(encodeURIComponent(c) + "[]=" + encodeURIComponent(a[c][d]));
				return b.join("&")
			}

			function e(a, b) {
				var h, i, j, k, l, e = c(),
					f = !1,
					g = {
						method: "POST",
						timeout: 5e3,
						async: !0,
						data: {},
						onsuccess: function() {},
						onerror: function() {}
					};
				"object" == typeof a && (b = a, a = b.url), e && a && (h = b ? utils.extend(g, b) : g, i = d(h), utils.isEmptyObject(h.data) || (i += (i ? "&" : "") + d(h.data)), j = setTimeout(function() {
					4 != e.readyState && (f = !0, e.abort(), clearTimeout(j))
				}, h.timeout), k = h.method.toUpperCase(), l = a + (-1 == a.indexOf("?") ? "?" : "&") + ("POST" == k ? "" : i + "&noCache=" + +new Date), e.open(k, l, h.async), e.onreadystatechange = function() {
					4 == e.readyState && (f || 200 != e.status ? h.onerror(e) : h.onsuccess(e))
				}, "POST" == k ? (e.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), e.send(i)) : e.send(null))
			}

			function f(a, b) {
				function o(a, b, c) {
					a.setAttribute("type", "text/javascript"), a.setAttribute("defer", "defer"), c && a.setAttribute("charset", c), a.setAttribute("src", b), document.getElementsByTagName("head")[0].appendChild(a)
				}

				function p(a) {
					return function() {
						try {
							if (a) f.onerror && f.onerror();
							else try {
								clearTimeout(k), c.apply(window, arguments)
							} catch (b) {}
						} catch (d) {
							f.onerror && f.onerror.call(window, d)
						} finally {
							f.oncomplete && f.oncomplete.apply(window, arguments), e.parentNode && e.parentNode.removeChild(e), window[i] = null;
							try {
								delete window[i]
							} catch (b) {}
						}
					}
				}
				var i, k, m, n, c = b.onsuccess || function() {},
					e = document.createElement("SCRIPT"),
					f = b || {},
					g = f["charset"],
					h = f["jsonp"] || "callback",
					j = f["timeOut"] || 0,
					l = new RegExp("(\\?|&)" + h + "=([^&]*)");
				utils.isFunction(c) ? (i = "bd__editor__" + Math.floor(2147483648 * Math.random()).toString(36), window[i] = p(0)) : utils.isString(c) ? i = c : (m = l.exec(a)) && (i = m[2]), a = a.replace(l, "$1" + h + "=" + i), a.search(l) < 0 && (a += (a.indexOf("?") < 0 ? "?" : "&") + h + "=" + i), n = d(b), utils.isEmptyObject(b.data) || (n += (n ? "&" : "") + d(b.data)), n && (a = a.replace(/\?/, "?" + n + "&")), e.onerror = p(1), j && (k = setTimeout(p(1), j)), o(e, a, g)
			}
			var c, a = "XMLHttpRequest()";
			try {
				new ActiveXObject("Msxml2.XMLHTTP"), a = "ActiveXObject('Msxml2.XMLHTTP')"
			} catch (b) {
				try {
					new ActiveXObject("Microsoft.XMLHTTP"), a = "ActiveXObject('Microsoft.XMLHTTP')"
				} catch (b) {}
			}
			return c = new Function("return new " + a), {
				request: function(a, b) {
					b && "jsonp" == b.dataType ? f(a, b) : e(a, b)
				},
				getJSONP: function(a, b, c) {
					var d = {
						data: b,
						oncomplete: c
					};
					f(a, d)
				}
			}
		}(), filterWord = UE.filterWord = function() {
			function a(a) {
				return /(class="?Mso|style="[^"]*\bmso\-|w:WordDocument|<(v|o):|lang=)/gi.test(a)
			}

			function b(a) {
				return a = a.replace(/[\d.]+\w+/g, function(a) {
					return utils.transUnitToPx(a)
				})
			}

			function c(a) {
				return a.replace(/[\t\r\n]+/g, " ").replace(/<!--[\s\S]*?-->/gi, "").replace(/<v:shape [^>]*>[\s\S]*?.<\/v:shape>/gi, function(a) {
					if (browser.opera) return "";
					try {
						if (/Bitmap/i.test(a)) return "";
						var c = a.match(/width:([ \d.]*p[tx])/i)[1],
							d = a.match(/height:([ \d.]*p[tx])/i)[1],
							e = a.match(/src=\s*"([^"]*)"/i)[1];
						return '<img width="' + b(c) + '" height="' + b(d) + '" src="' + e + '" />'
					} catch (f) {
						return ""
					}
				}).replace(/<\/?div[^>]*>/g, "").replace(/v:\w+=(["']?)[^'"]+\1/g, "").replace(/<(!|script[^>]*>.*?<\/script(?=[>\s])|\/?(\?xml(:\w+)?|xml|meta|link|style|\w+:\w+)(?=[\s\/>]))[^>]*>/gi, "").replace(/<p [^>]*class="?MsoHeading"?[^>]*>(.*?)<\/p>/gi, "<p><strong>$1</strong></p>").replace(/\s+(class|lang|align)\s*=\s*(['"]?)([\w-]+)\2/gi, function(a, b, c, d) {
					return "class" == b && "MsoListParagraph" == d ? a : ""
				}).replace(/<(font|span)[^>]*>(\s*)<\/\1>/gi, function(a, b, c) {
					return c.replace(/[\t\r\n ]+/g, " ")
				}).replace(/(<[a-z][^>]*)\sstyle=(["'])([^\2]*?)\2/gi, function(a, c, d, e) {
					var i, h, j, k, l, f = [],
						g = e.replace(/^\s+|\s+$/, "").replace(/&#39;/g, "'").replace(/&quot;/gi, "'").replace(/[\d.]+(cm|pt)/g, function(a) {
							return utils.transUnitToPx(a)
						}).split(/;\s*/g);
					for (h = 0; i = g[h]; h++)
						if (l = i.split(":"), 2 == l.length) {
							if (j = l[0].toLowerCase(), k = l[1].toLowerCase(), /^(background)\w*/.test(j) && 0 == k.replace(/(initial|\s)/g, "").length || /^(margin)\w*/.test(j) && /^0\w+$/.test(k)) continue;
							switch (j) {
								case "mso-padding-alt":
								case "mso-padding-top-alt":
								case "mso-padding-right-alt":
								case "mso-padding-bottom-alt":
								case "mso-padding-left-alt":
								case "mso-margin-alt":
								case "mso-margin-top-alt":
								case "mso-margin-right-alt":
								case "mso-margin-bottom-alt":
								case "mso-margin-left-alt":
								case "mso-height":
								case "mso-width":
								case "mso-vertical-align-alt":
									/<table/.test(c) || (f[h] = j.replace(/^mso-|-alt$/g, "") + ":" + b(k));
									continue;
								case "horiz-align":
									f[h] = "text-align:" + k;
									continue;
								case "vert-align":
									f[h] = "vertical-align:" + k;
									continue;
								case "font-color":
								case "mso-foreground":
									f[h] = "color:" + k;
									continue;
								case "mso-background":
								case "mso-highlight":
									f[h] = "background:" + k;
									continue;
								case "mso-default-height":
									f[h] = "min-height:" + b(k);
									continue;
								case "mso-default-width":
									f[h] = "min-width:" + b(k);
									continue;
								case "mso-padding-between-alt":
									f[h] = "border-collapse:separate;border-spacing:" + b(k);
									continue;
								case "text-line-through":
									("single" == k || "double" == k) && (f[h] = "text-decoration:line-through");
									continue;
								case "mso-zero-height":
									"yes" == k && (f[h] = "display:none");
									continue;
								case "margin":
									if (!/[1-9]/.test(k)) continue
							}
							if (/^(mso|column|font-emph|lang|layout|line-break|list-image|nav|panose|punct|row|ruby|sep|size|src|tab-|table-border|text-(?:decor|trans)|top-bar|version|vnd|word-break)/.test(j) || /text\-indent|padding|margin/.test(j) && /\-[\d.]+/.test(k)) continue;
							f[h] = j + ":" + l[1]
						}
					return c + (f.length ? ' style="' + f.join(";").replace(/;{2,}/g, ";") + '"' : "")
				})
			}
			return function(b) {
				return a(b) ? c(b) : b
			}
		}(),
		function() {
			function f(a, b, c) {
				return a.push(e), b + (c ? 1 : -1)
			}

			function g(a, b) {
				for (var c = 0; b > c; c++) a.push(d)
			}

			function h(a, b, c, d) {
				switch (a.type) {
					case "root":
						for (var l, e = 0; l = a.children[e++];) c && "element" == l.type && !dtd.$inlineWithA[l.tagName] && e > 1 && (f(b, d, !0), g(b, d)), h(l, b, c, d);
						break;
					case "text":
						i(a, b);
						break;
					case "element":
						j(a, b, c, d);
						break;
					case "comment":
						k(a, b, c)
				}
				return b
			}

			function i(a, b) {
				"pre" == a.parentNode.tagName ? b.push(a.data) : b.push(c[a.parentNode.tagName] ? utils.html(a.data) : a.data.replace(/[ ]{2}/g, " &nbsp;"))
			}

			function j(a, c, d, e) {
				var j, k, m, l, i = "";
				if (a.attrs) {
					i = [], j = a.attrs;
					for (k in j) i.push(k + (void 0 !== j[k] ? '="' + (b[k] ? utils.html(j[k]).replace(/["]/g, function() {
						return "&quot;"
					}) : utils.unhtml(j[k])) + '"' : ""));
					i = i.join(" ")
				}
				if (c.push("<" + a.tagName + (i ? " " + i : "") + (dtd.$empty[a.tagName] ? "/" : "") + ">"), d && !dtd.$inlineWithA[a.tagName] && "pre" != a.tagName && a.children && a.children.length && (e = f(c, e, !0), g(c, e)), a.children && a.children.length)
					for (l = 0; m = a.children[l++];) d && "element" == m.type && !dtd.$inlineWithA[m.tagName] && l > 1 && (f(c, e), g(c, e)), h(m, c, d, e);
				dtd.$empty[a.tagName] || (d && !dtd.$inlineWithA[a.tagName] && "pre" != a.tagName && a.children && a.children.length && (e = f(c, e), g(c, e)), c.push("</" + a.tagName + ">"))
			}

			function k(a, b) {
				b.push("<!--" + a.data + "-->")
			}

			function l(a, b) {
				var c, e, d;
				if ("element" == a.type && a.getAttr("id") == b) return a;
				if (a.children && a.children.length)
					for (d = 0; e = a.children[d++];)
						if (c = l(e, b)) return c
			}

			function m(a, b, c) {
				if ("element" == a.type && a.tagName == b && c.push(a), a.children && a.children.length)
					for (var e, d = 0; e = a.children[d++];) m(e, b, c)
			}

			function n(a, b) {
				if (a.children && a.children.length)
					for (var d, c = 0; d = a.children[c];) n(d, b), d.parentNode && (d.children && d.children.length && b(d), d.parentNode && c++);
				else b(a)
			}
			var a = UE.uNode = function(a) {
					this.type = a.type, this.data = a.data, this.tagName = a.tagName, this.parentNode = a.parentNode, this.attrs = a.attrs || {}, this.children = a.children
				},
				b = {
					href: 1,
					src: 1,
					_src: 1,
					_href: 1,
					cdata_data: 1
				},
				c = {
					style: 1,
					script: 1
				},
				d = "    ",
				e = "\n";
			a.createElement = function(b) {
				return /[<>]/.test(b) ? UE.htmlparser(b).children[0] : new a({
					type: "element",
					children: [],
					tagName: b
				})
			}, a.createText = function(a, b) {
				return new UE.uNode({
					type: "text",
					data: b ? a : utils.unhtml(a || "")
				})
			}, a.prototype = {
				toHtml: function(a) {
					var b = [];
					return h(this, b, a, 0), b.join("")
				},
				innerHTML: function(a) {
					var c, b, d;
					if ("element" != this.type || dtd.$empty[this.tagName]) return this;
					if (utils.isString(a)) {
						if (this.children)
							for (b = 0; c = this.children[b++];) c.parentNode = null;
						for (this.children = [], d = UE.htmlparser(a), b = 0; c = d.children[b++];) this.children.push(c), c.parentNode = this;
						return this
					}
					return d = new UE.uNode({
						type: "root",
						children: this.children
					}), d.toHtml()
				},
				innerText: function(b, c) {
					if ("element" != this.type || dtd.$empty[this.tagName]) return this;
					if (b) {
						if (this.children)
							for (var e, d = 0; e = this.children[d++];) e.parentNode = null;
						return this.children = [], this.appendChild(a.createText(b, c)), this
					}
					return this.toHtml().replace(/<[^>]+>/g, "")
				},
				getData: function() {
					return "element" == this.type ? "" : this.data
				},
				firstChild: function() {
					return this.children ? this.children[0] : null
				},
				lastChild: function() {
					return this.children ? this.children[this.children.length - 1] : null
				},
				previousSibling: function() {
					var c, b, a = this.parentNode;
					for (b = 0; c = a.children[b]; b++)
						if (c === this) return 0 == b ? null : a.children[b - 1]
				},
				nextSibling: function() {
					var c, b, a = this.parentNode;
					for (b = 0; c = a.children[b++];)
						if (c === this) return a.children[b]
				},
				replaceChild: function(a, b) {
					if (this.children) {
						a.parentNode && a.parentNode.removeChild(a);
						for (var d, c = 0; d = this.children[c]; c++)
							if (d === b) return this.children.splice(c, 1, a), b.parentNode = null, a.parentNode = this, a
					}
				},
				appendChild: function(a) {
					if ("root" == this.type || "element" == this.type && !dtd.$empty[this.tagName]) {
						this.children || (this.children = []), a.parentNode && a.parentNode.removeChild(a);
						for (var c, b = 0; c = this.children[b]; b++)
							if (c === a) {
								this.children.splice(b, 1);
								break
							}
						return this.children.push(a), a.parentNode = this, a
					}
				},
				insertBefore: function(a, b) {
					if (this.children) {
						a.parentNode && a.parentNode.removeChild(a);
						for (var d, c = 0; d = this.children[c]; c++)
							if (d === b) return this.children.splice(c, 0, a), a.parentNode = this, a
					}
				},
				insertAfter: function(a, b) {
					if (this.children) {
						a.parentNode && a.parentNode.removeChild(a);
						for (var d, c = 0; d = this.children[c]; c++)
							if (d === b) return this.children.splice(c + 1, 0, a), a.parentNode = this, a
					}
				},
				removeChild: function(a, b) {
					var d, c, f, e;
					if (this.children)
						for (c = 0; d = this.children[c]; c++)
							if (d === a) {
								if (this.children.splice(c, 1), d.parentNode = null, b && d.children && d.children.length)
									for (e = 0; f = d.children[e]; e++) this.children.splice(c + e, 0, f), f.parentNode = this;
								return d
							}
				},
				getAttr: function(a) {
					return this.attrs && this.attrs[a.toLowerCase()]
				},
				setAttr: function(a, b) {
					if (!a) return delete this.attrs, void 0;
					if (this.attrs || (this.attrs = {}), utils.isObject(a))
						for (var c in a) a[c] ? this.attrs[c.toLowerCase()] = a[c] : delete this.attrs[c];
					else b ? this.attrs[a.toLowerCase()] = b : delete this.attrs[a]
				},
				getIndex: function() {
					var c, b, a = this.parentNode;
					for (b = 0; c = a.children[b]; b++)
						if (c === this) return b;
					return -1
				},
				getNodeById: function(a) {
					var b, d, c;
					if (this.children && this.children.length)
						for (c = 0; d = this.children[c++];)
							if (b = l(d, a)) return b
				},
				getNodesByTagName: function(a) {
					a = utils.trim(a).replace(/[ ]{2,}/g, " ").split(" ");
					var b = [],
						c = this;
					return utils.each(a, function(a) {
						if (c.children && c.children.length)
							for (var e, d = 0; e = c.children[d++];) m(e, a, b)
					}), b
				},
				getStyle: function(a) {
					var c, d, b = this.getAttr("style");
					return b ? (c = new RegExp("(^|;)\\s*" + a + ":([^;]+)", "i"), d = b.match(c), d && d[0] ? d[2] : "") : ""
				},
				setStyle: function(a, b) {
					function c(a, b) {
						var c = new RegExp("(^|;)\\s*" + a + ":([^;]+;?)", "gi");
						d = d.replace(c, "$1"), b && (d = a + ":" + utils.unhtml(b) + ";" + d)
					}
					var e, d = this.getAttr("style");
					if (d || (d = ""), utils.isObject(a))
						for (e in a) c(e, a[e]);
					else c(a, b);
					this.setAttr("style", utils.trim(d))
				},
				traversal: function(a) {
					return this.children && this.children.length && n(this, a), this
				}
			}
		}(), htmlparser = UE.htmlparser = function(a, b) {
			function j(a, b) {
				if (i[a.tagName]) {
					var c = g.createElement(i[a.tagName]);
					a.appendChild(c), c.appendChild(g.createText(b)), a = c
				} else a.appendChild(g.createText(b))
			}

			function k(a, b, c) {
				var e, j, i, l, n, m;
				if (e = h[b]) {
					for (i = a;
						"root" != i.type;) {
						if (utils.isArray(e) ? -1 != utils.indexOf(e, i.tagName) : e == i.tagName) {
							a = i, j = !0;
							break
						}
						i = i.parentNode
					}
					j || (a = k(a, utils.isArray(e) ? e[0] : e))
				}
				if (l = new g({
						parentNode: a,
						type: "element",
						tagName: b.toLowerCase(),
						children: dtd.$empty[b] ? null : []
					}), c) {
					for (m = {}; n = d.exec(c);) m[n[1].toLowerCase()] = f[n[1].toLowerCase()] ? n[2] || n[3] || n[4] : utils.unhtml(n[2] || n[3] || n[4]);
					l.attrs = m
				}
				return a.children.push(l), dtd.$empty[b] ? a : l
			}

			function l(a, b) {
				a.children.push(new g({
					type: "comment",
					data: b,
					parentNode: a
				}))
			}
			var f, g, h, i, m, n, o, p, q, r, c = /<(?:(?:\/([^>]+)>)|(?:!--([\S|\s]*?)-->)|(?:([^\s\/<>]+)\s*((?:(?:"[^"]*")|(?:'[^']*')|[^"'<>])*)\/?>))/g,
				d = /([\w\-:.]+)(?:(?:\s*=\s*(?:(?:"([^"]*)")|(?:'([^']*)')|([^\s>]+)))|(?=\s|$))/g,
				e = {
					b: 1,
					code: 1,
					i: 1,
					u: 1,
					strike: 1,
					s: 1,
					tt: 1,
					strong: 1,
					q: 1,
					samp: 1,
					em: 1,
					span: 1,
					sub: 1,
					img: 1,
					sup: 1,
					font: 1,
					big: 1,
					small: 1,
					iframe: 1,
					a: 1,
					br: 1,
					pre: 1
				};
			for (a = a.replace(new RegExp(domUtils.fillChar, "g"), ""), b || (a = a.replace(new RegExp("[\\r\\t\\n" + (b ? "" : " ") + "]*</?(\\w+)\\s*(?:[^>]*)>[\\r\\t\\n" + (b ? "" : " ") + "]*", "g"), function(a, c) {
					return c && e[c.toLowerCase()] ? a.replace(/(^[\n\r]+)|([\n\r]+$)/g, "") : a.replace(new RegExp("^[\\r\\n" + (b ? "" : " ") + "]+"), "").replace(new RegExp("[\\r\\n" + (b ? "" : " ") + "]+$"), "")
				})), f = {
					href: 1,
					src: 1
				}, g = UE.uNode, h = {
					td: "tr",
					tr: ["tbody", "thead", "tfoot"],
					tbody: "table",
					th: "tr",
					thead: "table",
					tfoot: "table",
					caption: "table",
					li: ["ul", "ol"],
					dt: "dl",
					dd: "dl",
					option: "select"
				}, i = {
					ol: "li",
					ul: "li"
				}, n = 0, o = 0, p = new g({
					type: "root",
					children: []
				}), q = p; m = c.exec(a);) {
				n = m.index;
				try {
					if (n > o && j(q, a.slice(o, n)), m[3]) dtd.$cdata[q.tagName] ? j(q, m[0]) : q = k(q, m[3].toLowerCase(), m[4]);
					else if (m[1]) {
						if ("root" != q.type)
							if (dtd.$cdata[q.tagName] && !dtd.$cdata[m[1]]) j(q, m[0]);
							else {
								for (r = q;
									"element" == q.type && q.tagName != m[1].toLowerCase();)
									if (q = q.parentNode, "root" == q.type) throw q = r, "break";
								q = q.parentNode
							}
					} else m[2] && l(q, m[2])
				} catch (s) {}
				o = c.lastIndex
			}
			return o < a.length && j(q, a.slice(o)), p
		}, filterNode = UE.filterNode = function() {
			function a(b, c) {
				var d, e, f, h, g, i, k, j, l, m;
				switch (b.type) {
					case "text":
						break;
					case "element":
						if (d = c[b.tagName])
							if ("-" === d) b.parentNode.removeChild(b);
							else if (utils.isFunction(d))
							if (e = b.parentNode, f = b.getIndex(), d(b), b.parentNode) {
								if (b.children)
									for (g = 0; h = b.children[g];) a(h, c), h.parentNode && g++
							} else
								for (g = f; h = e.children[g];) a(h, c), h.parentNode && g++;
						else {
							if (i = d["$"], i && b.attrs) {
								j = {};
								for (l in i) k = b.getAttr(l), "style" == l && utils.isArray(i[l]) && (m = [], utils.each(i[l], function(a) {
									var c;
									(c = b.getStyle(a)) && m.push(a + ":" + c)
								}), k = m.join(";")), k && (j[l] = k);
								b.attrs = j
							}
							if (b.children)
								for (g = 0; h = b.children[g];) a(h, c), h.parentNode && g++
						} else if (dtd.$cdata[b.tagName]) b.parentNode.removeChild(b);
						else
							for (e = b.parentNode, f = b.getIndex(), b.parentNode.removeChild(b, !0), g = f; h = e.children[g];) a(h, c), h.parentNode && g++;
						break;
					case "comment":
						b.parentNode.removeChild(b)
				}
			}
			return function(b, c) {
				var d, f, e;
				if (utils.isEmptyObject(c)) return b;
				for ((d = c["-"]) && utils.each(d.split(" "), function(a) {
						c[a] = "-"
					}), e = 0; f = b.children[e];) a(f, c), f.parentNode && e++;
				return b
			}
		}(), UE.plugin = function() {
			var a = {};
			return {
				register: function(b, c, d, e) {
					d && utils.isFunction(d) && (e = d, d = null), a[b] = {
						optionName: d || b,
						execFn: c,
						afterDisabled: e
					}
				},
				load: function(b) {
					utils.each(a, function(a) {
						var c = a.execFn.call(b);
						b.options[a.optionName] !== !1 ? c && utils.each(c, function(a, c) {
							switch (c.toLowerCase()) {
								case "shortcutkey":
									b.addshortcutkey(a);
									break;
								case "bindevents":
									utils.each(a, function(a, c) {
										b.addListener(c, a)
									});
									break;
								case "bindmultievents":
									utils.each(utils.isArray(a) ? a : [a], function(a) {
										var c = utils.trim(a.type).split(/\s+/);
										utils.each(c, function(c) {
											b.addListener(c, a.handler)
										})
									});
									break;
								case "commands":
									utils.each(a, function(a, c) {
										b.commands[c] = a
									});
									break;
								case "outputrule":
									b.addOutputRule(a);
									break;
								case "inputrule":
									b.addInputRule(a);
									break;
								case "defaultoptions":
									b.setOpt(a)
							}
						}) : a.afterDisabled && a.afterDisabled.call(b)
					}), utils.each(UE.plugins, function(a) {
						a.call(b)
					})
				},
				run: function(b, c) {
					var d = a[b];
					d && d.exeFn.call(c)
				}
			}
		}(), keymap = UE.keymap = {
			Backspace: 8,
			Tab: 9,
			Enter: 13,
			Shift: 16,
			Control: 17,
			Alt: 18,
			CapsLock: 20,
			Esc: 27,
			Spacebar: 32,
			PageUp: 33,
			PageDown: 34,
			End: 35,
			Home: 36,
			Left: 37,
			Up: 38,
			Right: 39,
			Down: 40,
			Insert: 45,
			Del: 46,
			NumLock: 144,
			Cmd: 91,
			"=": 187,
			"-": 189,
			b: 66,
			i: 73,
			z: 90,
			y: 89,
			v: 86,
			x: 88,
			s: 83,
			n: 78
		}, LocalStorage = UE.LocalStorage = function() {
			function c() {
				var a = document.createElement("div");
				return a.style.display = "none", a.addBehavior ? (a.addBehavior("#default#userdata"), {
					getItem: function(c) {
						var d = null;
						try {
							document.body.appendChild(a), a.load(b), d = a.getAttribute(c), document.body.removeChild(a)
						} catch (e) {}
						return d
					},
					setItem: function(c, d) {
						document.body.appendChild(a), a.setAttribute(c, d), a.save(b), document.body.removeChild(a)
					},
					removeItem: function(c) {
						document.body.appendChild(a), a.removeAttribute(c), a.save(b), document.body.removeChild(a)
					}
				}) : null
			}
			var a = window.localStorage || c() || null,
				b = "localStorage";
			return {
				saveLocalData: function(b, c) {
					return a && c ? (a.setItem(b, c), !0) : !1
				},
				getLocalData: function(b) {
					return a ? a.getItem(b) : null
				},
				removeItem: function(b) {
					a && a.removeItem(b)
				}
			}
		}(),
		function() {
			var a = "ueditor_preference";
			UE.Editor.prototype.setPreferences = function(b, c) {
				var e, d = {};
				utils.isString(b) ? d[b] = c : d = b, e = LocalStorage.getLocalData(a), e && (e = utils.str2json(e)) ? utils.extend(e, d) : e = d, e && LocalStorage.saveLocalData(a, utils.json2str(e))
			}, UE.Editor.prototype.getPreferences = function(b) {
				var c = LocalStorage.getLocalData(a);
				return c && (c = utils.str2json(c)) ? b ? c[b] : c : null
			}, UE.Editor.prototype.removePreferences = function(b) {
				var c = LocalStorage.getLocalData(a);
				c && (c = utils.str2json(c)) && (c[b] = void 0, delete c[b]), c && LocalStorage.saveLocalData(a, utils.json2str(c))
			}
		}(), UE.plugins["defaultfilter"] = function() {
			var a = this;
			a.setOpt({
				allowDivTransToP: !0,
				disabledTableInTable: !0
			}), a.addInputRule(function(b) {
				function e(a) {
					for (; a && "element" == a.type;) {
						if ("td" == a.tagName) return !0;
						a = a.parentNode
					}
					return !1
				}
				var d, c = this.options.allowDivTransToP;
				b.traversal(function(b) {
					var f, g, h, i;
					if ("element" == b.type) {
						if (!dtd.$cdata[b.tagName] && a.options.autoClearEmptyNode && dtd.$inline[b.tagName] && !dtd.$empty[b.tagName] && (!b.attrs || utils.isEmptyObject(b.attrs))) return b.firstChild() ? "span" != b.tagName || b.attrs && !utils.isEmptyObject(b.attrs) || b.parentNode.removeChild(b, !0) : b.parentNode.removeChild(b), void 0;
						switch (b.tagName) {
							case "style":
							case "script":
								b.setAttr({
									cdata_tag: b.tagName,
									cdata_data: b.innerHTML() || "",
									_ue_custom_node_: "true"
								}), b.tagName = "div", b.innerHTML("");
								break;
							case "a":
								(d = b.getAttr("href")) && b.setAttr("_href", d);
								break;
							case "img":
								if ((d = b.getAttr("src")) && /^data:/.test(d)) {
									b.parentNode.removeChild(b);
									break
								}
								b.setAttr("_src", b.getAttr("src"));
								break;
							case "span":
								browser.webkit && (d = b.getStyle("white-space")) && /nowrap|normal/.test(d) && (b.setStyle("white-space", ""), a.options.autoClearEmptyNode && utils.isEmptyObject(b.attrs) && b.parentNode.removeChild(b, !0)), d = b.getAttr("id"), d && /^_baidu_bookmark_/i.test(d) && b.parentNode.removeChild(b);
								break;
							case "p":
								(d = b.getAttr("align")) && (b.setAttr("align"), b.setStyle("text-align", d)), utils.each(b.children, function(a) {
									var c, d, e;
									if ("element" == a.type && "p" == a.tagName) {
										for (c = a.nextSibling(), b.parentNode.insertAfter(a, b), d = a; c;) e = c.nextSibling(), b.parentNode.insertAfter(c, d), d = c, c = e;
										return !1
									}
								}), b.firstChild() || b.innerHTML(browser.ie ? "&nbsp;" : "<br/>");
								break;
							case "div":
								if (b.getAttr("cdata_tag")) break;
								if (d = b.getAttr("class"), d && /^line number\d+/.test(d)) break;
								if (!c) break;
								for (g = UE.uNode.createElement("p"); f = b.firstChild();) "text" != f.type && UE.dom.dtd.$block[f.tagName] ? g.firstChild() ? (b.parentNode.insertBefore(g, b), g = UE.uNode.createElement("p")) : b.parentNode.insertBefore(f, b) : g.appendChild(f);
								g.firstChild() && b.parentNode.insertBefore(g, b), b.parentNode.removeChild(b);
								break;
							case "dl":
								b.tagName = "ul";
								break;
							case "dt":
							case "dd":
								b.tagName = "li";
								break;
							case "li":
								h = b.getAttr("class"), h && /list\-/.test(h) || b.setAttr(), i = b.getNodesByTagName("ol ul"), UE.utils.each(i, function(a) {
									b.parentNode.insertAfter(a, b)
								});
								break;
							case "td":
							case "th":
							case "caption":
								b.children && b.children.length || b.appendChild(browser.ie11below ? UE.uNode.createText(" ") : UE.uNode.createElement("br"));
								break;
							case "table":
								a.options.disabledTableInTable && e(b) && (b.parentNode.insertBefore(UE.uNode.createText(b.innerText()), b), b.parentNode.removeChild(b))
						}
					}
				})
			}), a.addOutputRule(function(b) {
				var c;
				b.traversal(function(b) {
					if ("element" == b.type) {
						if (a.options.autoClearEmptyNode && dtd.$inline[b.tagName] && !dtd.$empty[b.tagName] && (!b.attrs || utils.isEmptyObject(b.attrs))) return b.firstChild() ? "span" != b.tagName || b.attrs && !utils.isEmptyObject(b.attrs) || b.parentNode.removeChild(b, !0) : b.parentNode.removeChild(b), void 0;
						switch (b.tagName) {
							case "div":
								(c = b.getAttr("cdata_tag")) && (b.tagName = c, b.appendChild(UE.uNode.createText(b.getAttr("cdata_data"))), b.setAttr({
									cdata_tag: "",
									cdata_data: "",
									_ue_custom_node_: ""
								}));
								break;
							case "a":
								(c = b.getAttr("_href")) && b.setAttr({
									href: utils.html(c),
									_href: ""
								});
								break;
							case "span":
								c = b.getAttr("id"), c && /^_baidu_bookmark_/i.test(c) && b.parentNode.removeChild(b);
								break;
							case "img":
								(c = b.getAttr("_src")) && b.setAttr({
									src: b.getAttr("_src"),
									_src: ""
								})
						}
					}
				})
			})
		}, UE.commands["inserthtml"] = {
			execCommand: function(a, b, c) {
				var e, f, g, h, j, i, k, l, n, m, o, p, q, r, s, d = this;
				if (b && d.fireEvent("beforeinserthtml", b) !== !0) {
					if (e = d.selection.getRange(), f = e.document.createElement("div"), f.style.display = "inline", c || (g = UE.htmlparser(b), d.options.filterRules && UE.filterNode(g, d.options.filterRules), d.filterInputRule(g), b = g.toHtml()), f.innerHTML = utils.trim(b), !e.collapsed && (h = e.startContainer, domUtils.isFillChar(h) && e.setStartBefore(h), h = e.endContainer, domUtils.isFillChar(h) && e.setEndAfter(h), e.txtToElmBoundary(), e.endContainer && 1 == e.endContainer.nodeType && (h = e.endContainer.childNodes[e.endOffset], h && domUtils.isBr(h) && e.setEndAfter(h)), 0 == e.startOffset && (h = e.startContainer, domUtils.isBoundaryNode(h, "firstChild") && (h = e.endContainer, e.endOffset == (3 == h.nodeType ? h.nodeValue.length : h.childNodes.length) && domUtils.isBoundaryNode(h, "lastChild") && (d.body.innerHTML = "<p>" + (browser.ie ? "" : "<br/>") + "</p>", e.setStart(d.body.firstChild, 0).collapse(!0)))), !e.collapsed && e.deleteContents(), 1 == e.startContainer.nodeType && (i = e.startContainer.childNodes[e.startOffset], i && domUtils.isBlockElm(i) && (j = i.previousSibling) && domUtils.isBlockElm(j)))) {
						for (e.setEnd(j, j.childNodes.length).collapse(); i.firstChild;) j.appendChild(i.firstChild);
						domUtils.remove(i)
					}
					if (m = 0, e.inFillChar() && (i = e.startContainer, domUtils.isFillChar(i) ? (e.setStartBefore(i).collapse(!0), domUtils.remove(i)) : domUtils.isFillChar(i, !0) && (i.nodeValue = i.nodeValue.replace(fillCharReg, ""), e.startOffset--, e.collapsed && e.collapse(!0))), o = domUtils.findParentByTagName(e.startContainer, "li", !0)) {
						for (; i = f.firstChild;) {
							for (; i && (3 == i.nodeType || !domUtils.isBlockElm(i) || "HR" == i.tagName);) p = i.nextSibling, e.insertNode(i).collapse(), q = i, i = p;
							if (i)
								if (/^(ol|ul)$/i.test(i.tagName)) {
									for (; i.firstChild;) q = i.firstChild, domUtils.insertAfter(o, i.firstChild), o = o.nextSibling;
									domUtils.remove(i)
								} else p = i.nextSibling, r = d.document.createElement("li"), domUtils.insertAfter(o, r), r.appendChild(i), q = i, i = p, o = r
						}
						o = domUtils.findParentByTagName(e.startContainer, "li", !0), domUtils.isEmptyBlock(o) && domUtils.remove(o), q && e.setStartAfter(q).collapse(!0).select(!0)
					} else {
						for (; i = f.firstChild;) {
							if (m) {
								for (s = d.document.createElement("p"); i && (3 == i.nodeType || !dtd.$block[i.tagName]);) n = i.nextSibling, s.appendChild(i), i = n;
								s.firstChild && (i = s)
							}
							if (e.insertNode(i), n = i.nextSibling, !m && i.nodeType == domUtils.NODE_ELEMENT && domUtils.isBlockElm(i) && (k = domUtils.findParent(i, function(a) {
									return domUtils.isBlockElm(a)
								}), k && "body" != k.tagName.toLowerCase() && (!dtd[k.tagName][i.nodeName] || i.parentNode !== k))) {
								if (dtd[k.tagName][i.nodeName])
									for (l = i.parentNode; l !== k;) j = l, l = l.parentNode;
								else j = k;
								domUtils.breakParent(i, j || l), j = i.previousSibling, domUtils.trimWhiteTextNode(j), j.childNodes.length || domUtils.remove(j), !browser.ie && (p = i.nextSibling) && domUtils.isBlockElm(p) && p.lastChild && !domUtils.isBr(p.lastChild) && p.appendChild(d.document.createElement("br")), m = 1
							}
							if (p = i.nextSibling, !f.firstChild && p && domUtils.isBlockElm(p)) {
								e.setStart(p, 0).collapse(!0);
								break
							}
							e.setEndAfter(i).collapse()
						}
						if (i = e.startContainer, n && domUtils.isBr(n) && domUtils.remove(n), domUtils.isBlockElm(i) && domUtils.isEmptyNode(i))
							if (n = i.nextSibling) domUtils.remove(i), 1 == n.nodeType && dtd.$block[n.tagName] && e.setStart(n, 0).collapse(!0).shrinkBoundary();
							else try {
								i.innerHTML = browser.ie ? domUtils.fillChar : "<br/>"
							} catch (t) {
								e.setStartBefore(i), domUtils.remove(i)
							}
							try {
								e.select(!0)
							} catch (t) {}
					}
					setTimeout(function() {
						e = d.selection.getRange(), e.scrollToView(d.autoHeightEnabled, d.autoHeightEnabled ? domUtils.getXY(d.iframe).y : 0), d.fireEvent("afterinserthtml", b)
					}, 200)
				}
			}
		}, UE.plugins["autotypeset"] = function() {
			function g(a, b) {
				return a && 3 != a.nodeType ? domUtils.isBr(a) ? 1 : a && a.parentNode && e[a.tagName.toLowerCase()] ? f && f.contains(a) || a.getAttribute("pagebreak") ? 0 : b ? !domUtils.isEmptyBlock(a) : domUtils.isEmptyBlock(a, new RegExp("[\\s" + domUtils.fillChar + "]", "g")) : void 0 : 0
			}

			function h(a) {
				a.style.cssText || (domUtils.removeAttributes(a, ["style"]), "span" == a.tagName.toLowerCase() && domUtils.hasNoAttributes(a) && domUtils.remove(a, !0))
			}

			function i(a, e) {
				var l, m, o, n, q, p, r, s, u, t, v, w, x, i = this;
				if (e) {
					if (!b.pasteFilter) return;
					l = i.document.createElement("div"), l.innerHTML = e.html
				} else l = i.document.body;
				for (m = domUtils.getElementsByTagName(l, "*"), n = 0; o = m[n++];)
					if (i.fireEvent("excludeNodeinautotype", o) !== !0) {
						if (b.clearFontSize && o.style.fontSize && (domUtils.removeStyle(o, "font-size"), h(o)), b.clearFontFamily && o.style.fontFamily && (domUtils.removeStyle(o, "font-family"), h(o)), g(o)) {
							if (b.mergeEmptyline)
								for (p = o.nextSibling, r = domUtils.isBr(o); g(p) && (q = p, p = q.nextSibling, !r || p && (!p || domUtils.isBr(p)));) domUtils.remove(q);
							if (b.removeEmptyline && domUtils.inDoc(o, l) && !d[o.parentNode.tagName.toLowerCase()]) {
								if (domUtils.isBr(o) && (p = o.nextSibling, p && !domUtils.isBr(p))) continue;
								domUtils.remove(o);
								continue
							}
						}
						if (g(o, !0) && "SPAN" != o.tagName && (b.indent && (o.style.textIndent = b.indentValue), b.textAlign && (o.style.textAlign = b.textAlign)), b.removeClass && o.className && !c[o.className.toLowerCase()]) {
							if (f && f.contains(o)) continue;
							domUtils.removeAttributes(o, ["class"])
						}
						if (b.imageBlockLine && "img" == o.tagName.toLowerCase() && !o.getAttribute("emotion"))
							if (e) switch (s = o, b.imageBlockLine) {
								case "left":
								case "right":
								case "none":
									for (t = s.parentNode; dtd.$inline[t.tagName] || "A" == t.tagName;) t = t.parentNode;
									if (q = t, "P" == q.tagName && "center" == domUtils.getStyle(q, "text-align") && !domUtils.isBody(q) && 1 == domUtils.getChildCount(q, function(a) {
											return !domUtils.isBr(a) && !domUtils.isWhitespace(a)
										}))
										if (u = q.previousSibling, p = q.nextSibling, u && p && 1 == u.nodeType && 1 == p.nodeType && u.tagName == p.tagName && domUtils.isBlockElm(u)) {
											for (u.appendChild(q.firstChild); p.firstChild;) u.appendChild(p.firstChild);
											domUtils.remove(q), domUtils.remove(p)
										} else domUtils.setStyle(q, "text-align", "");
									domUtils.setStyle(s, "float", b.imageBlockLine);
									break;
								case "center":
									if ("center" != i.queryCommandValue("imagefloat")) {
										for (t = s.parentNode, domUtils.setStyle(s, "float", "none"), q = s; t && 1 == domUtils.getChildCount(t, function(a) {
												return !domUtils.isBr(a) && !domUtils.isWhitespace(a)
											}) && (dtd.$inline[t.tagName] || "A" == t.tagName);) q = t, t = t.parentNode;
										v = i.document.createElement("p"), domUtils.setAttributes(v, {
											style: "text-align:center"
										}), q.parentNode.insertBefore(v, q), v.appendChild(q), domUtils.setStyle(q, "float", "")
									}
							} else w = i.selection.getRange(), w.selectNode(o).select(), i.execCommand("imagefloat", b.imageBlockLine);
						b.removeEmptyNode && b.removeTagNames[o.tagName.toLowerCase()] && domUtils.hasNoAttributes(o) && domUtils.isEmptyBlock(o) && domUtils.remove(o)
					}
				b.tobdc && (x = UE.htmlparser(l.innerHTML), x.traversal(function(a) {
					"text" == a.type && (a.data = k(a.data))
				}), l.innerHTML = x.toHtml()), b.bdc2sb && (x = UE.htmlparser(l.innerHTML), x.traversal(function(a) {
					"text" == a.type && (a.data = j(a.data))
				}), l.innerHTML = x.toHtml()), e && (e.html = l.innerHTML)
			}

			function j(a) {
				var c, d, b = "";
				for (c = 0; c < a.length; c++) d = a.charCodeAt(c), b += d >= 65281 && 65373 >= d ? String.fromCharCode(a.charCodeAt(c) - 65248) : 12288 == d ? String.fromCharCode(a.charCodeAt(c) - 12288 + 32) : a.charAt(c);
				return b
			}

			function k(a) {
				var b, d;
				for (a = utils.html(a), b = "", d = 0; d < a.length; d++) b += 32 == a.charCodeAt(d) ? String.fromCharCode(12288) : a.charCodeAt(d) < 127 ? String.fromCharCode(a.charCodeAt(d) + 65248) : a.charAt(d);
				return b
			}

			function l() {
				var b = a.getPreferences("autotypeset");
				utils.extend(a.options.autotypeset, b)
			}
			this.setOpt({
				autotypeset: {
					mergeEmptyline: !0,
					removeClass: !0,
					removeEmptyline: !1,
					textAlign: "left",
					imageBlockLine: "center",
					pasteFilter: !1,
					clearFontSize: !1,
					clearFontFamily: !1,
					removeEmptyNode: !1,
					removeTagNames: utils.extend({
						div: 1
					}, dtd.$removeEmpty),
					indent: !1,
					indentValue: "2em",
					bdc2sb: !1,
					tobdc: !1
				}
			});
			var f, a = this,
				b = a.options.autotypeset,
				c = {
					selectTdClass: 1,
					pagebreak: 1,
					anchorclass: 1
				},
				d = {
					li: 1
				},
				e = {
					div: 1,
					p: 1,
					blockquote: 1,
					center: 1,
					h1: 1,
					h2: 1,
					h3: 1,
					h4: 1,
					h5: 1,
					h6: 1,
					span: 1
				};
			b && (l(), b.pasteFilter && a.addListener("beforepaste", i), a.commands["autotypeset"] = {
				execCommand: function() {
					a.removeListener("beforepaste", i), b.pasteFilter && a.addListener("beforepaste", i), i.call(a)
				}
			})
		}, UE.plugin.register("autosubmit", function() {
			return {
				shortcutkey: {
					autosubmit: "ctrl+13"
				},
				commands: {
					autosubmit: {
						execCommand: function() {
							var a = this,
								b = domUtils.findParentByTagName(a.iframe, "form", !1);
							if (b) {
								if (a.fireEvent("beforesubmit") === !1) return;
								a.sync(), b.submit()
							}
						}
					}
				}
			}
		}), UE.plugin.register("background", function() {
			function e(a) {
				var b = {},
					c = a.split(";");
				return utils.each(c, function(a) {
					var c = a.indexOf(":"),
						d = utils.trim(a.substr(0, c)).toLowerCase();
					d && (b[d] = utils.trim(a.substr(c + 1) || ""))
				}), b
			}

			function f(c) {
				var d, e;
				if (c) {
					d = [];
					for (e in c) c.hasOwnProperty(e) && d.push(e + ":" + c[e] + "; ");
					utils.cssRule(b, d.length ? "body{" + d.join("") + "}" : "", a.document)
				} else utils.cssRule(b, "", a.document)
			}
			var c, a = this,
				b = "editor_background",
				d = new RegExp("body[\\s]*\\{(.+)\\}", "i"),
				g = a.hasContents;
			return a.hasContents = function() {
				return a.queryCommandValue("background") ? !0 : g.apply(a, arguments)
			}, {
				bindEvents: {
					getAllHtml: function(b, c) {
						var g, h, i, d = this.body,
							e = domUtils.getComputedStyle(d, "background-image"),
							f = "";
						f = e.indexOf(a.options.imagePath) > 0 ? e.substring(e.indexOf(a.options.imagePath), e.length - 1).replace(/"|\(|\)/gi, "") : "none" != e ? e.replace(/url\("?|"?\)/gi, "") : "", g = '<style type="text/css">body{', h = {
							"background-color": domUtils.getComputedStyle(d, "background-color") || "#ffffff",
							"background-image": f ? "url(" + f + ")" : "",
							"background-repeat": domUtils.getComputedStyle(d, "background-repeat") || "",
							"background-position": browser.ie ? domUtils.getComputedStyle(d, "background-position-x") + " " + domUtils.getComputedStyle(d, "background-position-y") : domUtils.getComputedStyle(d, "background-position"),
							height: domUtils.getComputedStyle(d, "height")
						};
						for (i in h) h.hasOwnProperty(i) && (g += i + ":" + h[i] + "; ");
						g += "}</style> ", c.push(g)
					},
					aftersetcontent: function() {
						0 == c && f()
					}
				},
				inputRule: function(a) {
					c = !1, utils.each(a.getNodesByTagName("p"), function(a) {
						var b = a.getAttr("data-background");
						b && (c = !0, f(e(b)), a.parentNode.removeChild(a))
					})
				},
				outputRule: function(a) {
					var c = this,
						e = (utils.cssRule(b, c.document) || "").replace(/[\n\r]+/g, "").match(d);
					e && a.appendChild(UE.uNode.createElement('<p style="display:none;" data-background="' + utils.trim(e[1].replace(/"/g, "").replace(/[\s]+/g, " ")) + '"><br/></p>'))
				},
				commands: {
					background: {
						execCommand: function(a, b) {
							f(b)
						},
						queryCommandValue: function() {
							var a = this,
								c = (utils.cssRule(b, a.document) || "").replace(/[\n\r]+/g, "").match(d);
							return c ? e(c[1]) : null
						},
						notNeedUndo: !0
					}
				}
			}
		}), UE.commands["imagefloat"] = {
			execCommand: function(a, b) {
				var e, g, h, i, f, c = this,
					d = c.selection.getRange();
				if (!d.collapsed && (e = d.getClosedNode(), e && "IMG" == e.tagName)) switch (b) {
					case "left":
					case "right":
					case "none":
						for (f = e.parentNode; dtd.$inline[f.tagName] || "A" == f.tagName;) f = f.parentNode;
						if (g = f, "P" == g.tagName && "center" == domUtils.getStyle(g, "text-align")) {
							if (!domUtils.isBody(g) && 1 == domUtils.getChildCount(g, function(a) {
									return !domUtils.isBr(a) && !domUtils.isWhitespace(a)
								}))
								if (h = g.previousSibling, i = g.nextSibling, h && i && 1 == h.nodeType && 1 == i.nodeType && h.tagName == i.tagName && domUtils.isBlockElm(h)) {
									for (h.appendChild(g.firstChild); i.firstChild;) h.appendChild(i.firstChild);
									domUtils.remove(g), domUtils.remove(i)
								} else domUtils.setStyle(g, "text-align", "");
							d.selectNode(e).select()
						}
						domUtils.setStyle(e, "float", "none" == b ? "" : b), "none" == b && domUtils.removeAttributes(e, "align");
						break;
					case "center":
						if ("center" != c.queryCommandValue("imagefloat")) {
							for (f = e.parentNode, domUtils.setStyle(e, "float", ""), domUtils.removeAttributes(e, "align"), g = e; f && 1 == domUtils.getChildCount(f, function(a) {
									return !domUtils.isBr(a) && !domUtils.isWhitespace(a)
								}) && (dtd.$inline[f.tagName] || "A" == f.tagName);) g = f, f = f.parentNode;
							d.setStartBefore(g).setCursor(!1), f = c.document.createElement("div"), f.appendChild(g), domUtils.setStyle(g, "float", ""), c.execCommand("insertHtml", '<p id="_img_parent_tmp" style="text-align:center">' + f.innerHTML + "</p>"), g = c.document.getElementById("_img_parent_tmp"), g.removeAttribute("id"), g = g.firstChild, d.selectNode(g).select(), i = g.parentNode.nextSibling, i && domUtils.isEmptyNode(i) && domUtils.remove(i)
						}
				}
			},
			queryCommandValue: function() {
				var b, c, a = this.selection.getRange();
				return a.collapsed ? "none" : (b = a.getClosedNode(), b && 1 == b.nodeType && "IMG" == b.tagName ? (c = domUtils.getComputedStyle(b, "float") || b.getAttribute("align"), "none" == c && (c = "center" == domUtils.getComputedStyle(b.parentNode, "text-align") ? "center" : c), {
					left: 1,
					right: 1,
					center: 1
				}[c] ? c : "none") : "none")
			},
			queryCommandState: function() {
				var b, a = this.selection.getRange();
				return a.collapsed ? -1 : (b = a.getClosedNode(), b && 1 == b.nodeType && "IMG" == b.tagName ? 0 : -1)
			}
		}, UE.commands["insertimage"] = {
			execCommand: function(a, b) {
				var c, d, e, f, g, j, h, i, k;
				if (b = utils.isArray(b) ? b : [b], b.length && (c = this, d = c.selection.getRange(), e = d.getClosedNode(), c.fireEvent("beforeinsertimage", b) !== !0)) {
					if (!e || !/img/i.test(e.tagName) || "edui-faked-video" == e.className && -1 == e.className.indexOf("edui-upload-video") || e.getAttribute("word_img")) {
						if (h = [], i = "", j = b[0], 1 == b.length) i = '<img src="' + j.src + '" ' + (j._src ? ' _src="' + j._src + '" ' : "") + (j.width ? 'width="' + j.width + '" ' : "") + (j.height ? ' height="' + j.height + '" ' : "") + ("left" == j["floatStyle"] || "right" == j["floatStyle"] ? ' style="float:' + j["floatStyle"] + ';"' : "") + (j.title && "" != j.title ? ' title="' + j.title + '"' : "") + (j.border && "0" != j.border ? ' border="' + j.border + '"' : "") + (j.alt && "" != j.alt ? ' alt="' + j.alt + '"' : "") + (j.hspace && "0" != j.hspace ? ' hspace = "' + j.hspace + '"' : "") + (j.vspace && "0" != j.vspace ? ' vspace = "' + j.vspace + '"' : "") + "/>", "center" == j["floatStyle"] && (i = '<p style="text-align: center">' + i + "</p>"), h.push(i);
						else
							for (k = 0; j = b[k++];) i = "<p " + ("center" == j["floatStyle"] ? 'style="text-align: center" ' : "") + '><img src="' + j.src + '" ' + (j.width ? 'width="' + j.width + '" ' : "") + (j._src ? ' _src="' + j._src + '" ' : "") + (j.height ? ' height="' + j.height + '" ' : "") + ' style="' + (j["floatStyle"] && "center" != j["floatStyle"] ? "float:" + j["floatStyle"] + ";" : "") + (j.border || "") + '" ' + (j.title ? ' title="' + j.title + '"' : "") + " /></p>", h.push(i);
						c.execCommand("insertHtml", h.join(""))
					} else f = b.shift(), g = f["floatStyle"], delete f["floatStyle"], domUtils.setAttributes(e, f), c.execCommand("imagefloat", g), b.length > 0 && (d.setStartAfter(e).setCursor(!1, !0), c.execCommand("insertimage", b));
					c.fireEvent("afterinsertimage", b)
				}
			}
		}, UE.plugins["justify"] = function() {
			var b = domUtils.isBlockElm,
				c = {
					left: 1,
					right: 1,
					center: 1,
					justify: 1
				},
				d = function(a, c) {
					var i, f, g, h, j, k, l, d = a.createBookmark(),
						e = function(a) {
							return 1 == a.nodeType ? "br" != a.tagName.toLowerCase() && !domUtils.isBookmarkNode(a) : !domUtils.isWhitespace(a)
						};
					for (a.enlarge(!0), f = a.createBookmark(), g = domUtils.getNextDomNode(f.start, !1, e), h = a.cloneRange(); g && !(domUtils.getPosition(g, f.end) & domUtils.POSITION_FOLLOWING);)
						if (3 != g.nodeType && b(g)) g = domUtils.getNextDomNode(g, !0, e);
						else {
							for (h.setStartBefore(g); g && g !== f.end && !b(g);) i = g, g = domUtils.getNextDomNode(g, !1, null, function(a) {
								return !b(a)
							});
							h.setEndAfter(i), j = h.getCommonAncestor(), !domUtils.isBody(j) && b(j) ? (domUtils.setStyles(j, utils.isString(c) ? {
								"text-align": c
							} : c), g = j) : (k = a.document.createElement("p"), domUtils.setStyles(k, utils.isString(c) ? {
								"text-align": c
							} : c), l = h.extractContents(), k.appendChild(l), h.insertNode(k), g = k), g = domUtils.getNextDomNode(g, !1, e)
						}
					return a.moveToBookmark(f).moveToBookmark(d)
				};
			UE.commands["justify"] = {
				execCommand: function(a, b) {
					var e, c = this.selection.getRange();
					return c.collapsed && (e = this.document.createTextNode("p"), c.insertNode(e)), d(c, b), e && (c.setStartBefore(e).collapse(!0), domUtils.remove(e)), c.select(), !0
				},
				queryCommandValue: function() {
					var a = this.selection.getStart(),
						b = domUtils.getComputedStyle(a, "text-align");
					return c[b] ? b : "left"
				},
				queryCommandState: function() {
					var a = this.selection.getStart(),
						b = a && domUtils.findParentByTagName(a, ["td", "th", "caption"], !0);
					return b ? -1 : 0
				}
			}
		}, UE.plugins["font"] = function() {
			function e(a) {
				for (var b;
					(b = a.parentNode) && "SPAN" == b.tagName && 1 == domUtils.getChildCount(b, function(a) {
						return !domUtils.isBookmarkNode(a) && !domUtils.isBr(a)
					});) b.style.cssText += a.style.cssText, domUtils.remove(a, !0), a = b
			}

			function f(a, b, c) {
				var e, f;
				d[b] && (a.adjustmentBoundary(), a.collapsed || 1 != a.startContainer.nodeType || (e = a.startContainer.childNodes[a.startOffset], e && domUtils.isTagNode(e, "span") && (f = a.createBookmark(), utils.each(domUtils.getElementsByTagName(e, "span"), function(a) {
					a.parentNode && !domUtils.isBookmarkNode(a) && ("backcolor" != b || domUtils.getComputedStyle(a, "background-color").toLowerCase() !== c) && (domUtils.removeStyle(a, d[b]), 0 == a.style.cssText.replace(/^\s+$/, "").length && domUtils.remove(a, !0))
				}), a.moveToBookmark(f))))
			}

			function g(a, b, c) {
				var h, d = a.collapsed,
					g = a.createBookmark();
				if (d)
					for (h = g.start.parentNode; dtd.$inline[h.tagName];) h = h.parentNode;
				else h = domUtils.getCommonAncestor(g.start, g.end);
				utils.each(domUtils.getElementsByTagName(h, "span"), function(a) {
					var d, f;
					if (a.parentNode && !domUtils.isBookmarkNode(a)) {
						if (/\s*border\s*:\s*none;?\s*/i.test(a.style.cssText)) return /^\s*border\s*:\s*none;?\s*$/.test(a.style.cssText) ? domUtils.remove(a, !0) : domUtils.removeStyle(a, "border"), void 0;
						if (/border/i.test(a.style.cssText) && "SPAN" == a.parentNode.tagName && /border/i.test(a.parentNode.style.cssText) && (a.style.cssText = a.style.cssText.replace(/border[^:]*:[^;]+;?/gi, "")), "fontborder" != b || "none" != c)
							for (d = a.nextSibling; d && 1 == d.nodeType && "SPAN" == d.tagName;)
								if (domUtils.isBookmarkNode(d) && "fontborder" == b) a.appendChild(d), d = a.nextSibling;
								else {
									if (d.style.cssText == a.style.cssText && (domUtils.moveChild(d, a), domUtils.remove(d)), a.nextSibling === d) break;
									d = a.nextSibling
								}
						e(a), browser.ie && browser.version > 8 && (f = domUtils.findParent(a, function(a) {
							return "SPAN" == a.tagName && /background-color/.test(a.style.cssText)
						}), f && !/background-color/.test(a.style.cssText) && (a.style.backgroundColor = f.style.backgroundColor))
					}
				}), a.moveToBookmark(g), f(a, b, c)
			}
			var h, a = this,
				b = {
					forecolor: "color",
					backcolor: "background-color",
					fontsize: "font-size",
					fontfamily: "font-family",
					underline: "text-decoration",
					strikethrough: "text-decoration",
					fontborder: "border"
				},
				c = {
					underline: 1,
					strikethrough: 1,
					fontborder: 1
				},
				d = {
					forecolor: "color",
					backcolor: "background-color",
					fontsize: "font-size",
					fontfamily: "font-family"
				};
			a.setOpt({
				fontfamily: [{
					name: "songti",
					val: "宋体,SimSun"
				}, {
					name: "yahei",
					val: "微软雅黑,Microsoft YaHei"
				}, {
					name: "kaiti",
					val: "楷体,楷体_GB2312, SimKai"
				}, {
					name: "heiti",
					val: "黑体, SimHei"
				}, {
					name: "lishu",
					val: "隶书, SimLi"
				}, {
					name: "andaleMono",
					val: "andale mono"
				}, {
					name: "arial",
					val: "arial, helvetica,sans-serif"
				}, {
					name: "arialBlack",
					val: "arial black,avant garde"
				}, {
					name: "comicSansMs",
					val: "comic sans ms"
				}, {
					name: "impact",
					val: "impact,chicago"
				}, {
					name: "timesNewRoman",
					val: "times new roman"
				}],
				fontsize: [10, 11, 12, 14, 16, 18, 20, 24, 36]
			}), a.addInputRule(function(a) {
				utils.each(a.getNodesByTagName("u s del font strike"), function(a) {
					var b, c, d;
					if ("font" == a.tagName) {
						b = [];
						for (c in a.attrs) switch (c) {
							case "size":
								b.push("font-size:" + ({
									1: "10",
									2: "12",
									3: "16",
									4: "18",
									5: "24",
									6: "32",
									7: "48"
								}[a.attrs[c]] || a.attrs[c]) + "px");
								break;
							case "color":
								b.push("color:" + a.attrs[c]);
								break;
							case "face":
								b.push("font-family:" + a.attrs[c]);
								break;
							case "style":
								b.push(a.attrs[c])
						}
						a.attrs = {
							style: b.join(";")
						}
					} else d = "u" == a.tagName ? "underline" : "line-through", a.attrs = {
						style: (a.getAttr("style") || "") + "text-decoration:" + d + ";"
					};
					a.tagName = "span"
				})
			});
			for (h in b) ! function(a, b) {
				UE.commands[a] = {
					execCommand: function(d, e) {
						var i, f, h, j, k;
						if (e = e || (this.queryCommandState(d) ? "none" : "underline" == d ? "underline" : "fontborder" == d ? "1px solid #000" : "line-through"), f = this, h = this.selection.getRange(), "default" == e) h.collapsed && (i = f.document.createTextNode("font"), h.insertNode(i).select()), f.execCommand("removeFormat", "span,a", b), i && (h.setStartBefore(i).collapse(!0), domUtils.remove(i)), g(h, d, e), h.select();
						else if (h.collapsed) {
							if (j = domUtils.findParentByTagName(h.startContainer, "span", !0), i = f.document.createTextNode("font"), !j || j.children.length || j[browser.ie ? "innerText" : "textContent"].replace(fillCharReg, "").length) {
								if (h.insertNode(i), h.selectNode(i).select(), j = h.document.createElement("span"), c[a]) {
									if (domUtils.findParentByTagName(i, "a", !0)) return h.setStartBefore(i).setCursor(), domUtils.remove(i), void 0;
									f.execCommand("removeFormat", "span,a", b)
								}
								if (j.style.cssText = b + ":" + e, i.parentNode.insertBefore(j, i), !browser.ie || browser.ie && 9 == browser.version)
									for (k = j.parentNode; !domUtils.isBlockElm(k);) "SPAN" == k.tagName && (j.style.cssText = k.style.cssText + ";" + j.style.cssText), k = k.parentNode;
								opera ? setTimeout(function() {
									h.setStart(j, 0).collapse(!0), g(h, d, e), h.select()
								}) : (h.setStart(j, 0).collapse(!0), g(h, d, e), h.select())
							} else h.insertNode(i), c[a] && (h.selectNode(i).select(), f.execCommand("removeFormat", "span,a", b, null), j = domUtils.findParentByTagName(i, "span", !0), h.setStartBefore(i)), j && (j.style.cssText += ";" + b + ":" + e), h.collapse(!0).select();
							domUtils.remove(i)
						} else c[a] && f.queryCommandValue(a) && f.execCommand("removeFormat", "span,a", b), h = f.selection.getRange(), h.applyInlineStyle("span", {
							style: b + ":" + e
						}), g(h, d, e), h.select();
						return !0
					},
					queryCommandValue: function(a) {
						var e, d, g, f, h, c = this.selection.getStart();
						if ("underline" == a || "strikethrough" == a) {
							for (d = c; d && !domUtils.isBlockElm(d) && !domUtils.isBody(d);) {
								if (1 == d.nodeType && (e = domUtils.getComputedStyle(d, b), "none" != e)) return e;
								d = d.parentNode
							}
							return "none"
						}
						if ("fontborder" == a) {
							for (f = c; f && dtd.$inline[f.tagName];) {
								if ((g = domUtils.getComputedStyle(f, "border")) && /1px/.test(g) && /solid/.test(g)) return g;
								f = f.parentNode
							}
							return ""
						}
						return "FontSize" == a ? (h = domUtils.getComputedStyle(c, b), f = /^([\d\.]+)(\w+)$/.exec(h), f ? Math.floor(f[1]) + f[2] : h) : domUtils.getComputedStyle(c, b)
					},
					queryCommandState: function(a) {
						if (!c[a]) return 0;
						var b = this.queryCommandValue(a);
						return "fontborder" == a ? /1px/.test(b) && /solid/.test(b) : "underline" == a ? /underline/.test(b) : /line\-through/.test(b)
					}
				}
			}(h, b[h])
		}, UE.plugins["link"] = function() {
			function a(a) {
				var b = a.startContainer,
					c = a.endContainer;
				(b = domUtils.findParentByTagName(b, "a", !0)) && a.setStartBefore(b), (c = domUtils.findParentByTagName(c, "a", !0)) && a.setEndAfter(c)
			}

			function b(b, c, d) {
				var g, h, i, e = b.cloneRange(),
					f = d.queryCommandValue("link");
				a(b = b.adjustmentBoundary()), g = b.startContainer, 1 == g.nodeType && f && (g = g.childNodes[b.startOffset], g && 1 == g.nodeType && "A" == g.tagName && /^(?:https?|ftp|file)\s*:\s*\/\//.test(g[browser.ie ? "innerText" : "textContent"]) && (g[browser.ie ? "innerText" : "textContent"] = utils.html(c.textValue || c.href))), (!e.collapsed || f) && (b.removeInlineStyle("a"), e = b.cloneRange()), e.collapsed ? (h = b.document.createElement("a"), i = "", c.textValue ? (i = utils.html(c.textValue), delete c.textValue) : i = utils.html(c.href), domUtils.setAttributes(h, c), g = domUtils.findParentByTagName(e.startContainer, "a", !0), g && domUtils.isInNodeEndBoundary(e, g) && b.setStartAfter(g).collapse(!0), h[browser.ie ? "innerText" : "textContent"] = i, b.insertNode(h).selectNode(h)) : b.applyInlineStyle("a", c)
			}
			UE.commands["unlink"] = {
				execCommand: function() {
					var c, b = this.selection.getRange();
					(!b.collapsed || domUtils.findParentByTagName(b.startContainer, "a", !0)) && (c = b.createBookmark(), a(b), b.removeInlineStyle("a").moveToBookmark(c).select())
				},
				queryCommandState: function() {
					return !this.highlight && this.queryCommandValue("link") ? 0 : -1
				}
			}, UE.commands["link"] = {
				execCommand: function(a, c) {
					var d;
					c._href && (c._href = utils.unhtml(c._href, /[<">]/g)), c.href && (c.href = utils.unhtml(c.href, /[<">]/g)), c.textValue && (c.textValue = utils.unhtml(c.textValue, /[<">]/g)), b(d = this.selection.getRange(), c, this), d.collapse().select(!0)
				},
				queryCommandValue: function() {
					var b, c, d, e, g, h, f, j, i, a = this.selection.getRange();
					if (!a.collapsed) {
						if (a.shrinkBoundary(), c = 3 != a.startContainer.nodeType && a.startContainer.childNodes[a.startOffset] ? a.startContainer.childNodes[a.startOffset] : a.startContainer, d = 3 == a.endContainer.nodeType || 0 == a.endOffset ? a.endContainer : a.endContainer.childNodes[a.endOffset - 1], e = a.getCommonAncestor(), b = domUtils.findParentByTagName(e, "a", !0), !b && 1 == e.nodeType)
							for (f = e.getElementsByTagName("a"), i = 0; j = f[i++];)
								if (g = domUtils.getPosition(j, c), h = domUtils.getPosition(j, d), (g & domUtils.POSITION_FOLLOWING || g & domUtils.POSITION_CONTAINS) && (h & domUtils.POSITION_PRECEDING || h & domUtils.POSITION_CONTAINS)) {
									b = j;
									break
								}
						return b
					}
					return b = a.startContainer, b = 1 == b.nodeType ? b : b.parentNode, b && (b = domUtils.findParentByTagName(b, "a", !0)) && !domUtils.isInNodeEndBoundary(a, b) ? b : void 0
				},
				queryCommandState: function() {
					var a = this.selection.getRange().getClosedNode(),
						b = a && ("edui-faked-video" == a.className || -1 != a.className.indexOf("edui-upload-video"));
					return b ? -1 : 0
				}
			}
		}, UE.plugins["insertframe"] = function() {
			function b() {
				a._iframe && delete a._iframe
			}
			var a = this;
			a.addListener("selectionchange", function() {
				b()
			})
		}, UE.commands["scrawl"] = {
			queryCommandState: function() {
				return browser.ie && browser.version <= 8 ? -1 : 0
			}
		}, UE.plugins["removeformat"] = function() {
			var a = this;
			a.setOpt({
				removeFormatTags: "b,big,code,del,dfn,em,font,i,ins,kbd,q,samp,small,span,strike,strong,sub,sup,tt,u,var",
				removeFormatAttributes: "class,style,lang,width,height,align,hspace,valign"
			}), a.commands["removeformat"] = {
				execCommand: function(a, b, c, d, e) {
					function m(a) {
						var b, c, d;
						if (3 == a.nodeType || "span" != a.tagName.toLowerCase()) return 0;
						if (browser.ie && (b = a.attributes, b.length)) {
							for (c = 0, d = b.length; d > c; c++)
								if (b[c].specified) return 0;
							return 1
						}
						return !a.attributes.length
					}

					function n(a) {
						var d, j, h, n, p, o, q, b = a.createBookmark();
						for (a.collapsed && a.enlarge(!0), e || (d = domUtils.findParentByTagName(a.startContainer, "a", !0), d && a.setStartBefore(d), d = domUtils.findParentByTagName(a.endContainer, "a", !0), d && a.setEndAfter(d)), i = a.createBookmark(), o = i.start;
							(k = o.parentNode) && !domUtils.isBlockElm(k);) domUtils.breakParent(o, k), domUtils.clearEmptySibling(o);
						if (i.end) {
							for (o = i.end;
								(k = o.parentNode) && !domUtils.isBlockElm(k);) domUtils.breakParent(o, k), domUtils.clearEmptySibling(o);
							for (h = domUtils.getNextDomNode(i.start, !1, l); h && h != i.end;) j = domUtils.getNextDomNode(h, !0, l), dtd.$empty[h.tagName.toLowerCase()] || domUtils.isBookmarkNode(h) || (f.test(h.tagName) ? c ? (domUtils.removeStyle(h, c), m(h) && "text-decoration" != c && domUtils.remove(h, !0)) : domUtils.remove(h, !0) : dtd.$tableContent[h.tagName] || dtd.$list[h.tagName] || (domUtils.removeAttributes(h, g), m(h) && domUtils.remove(h, !0))), h = j
						}
						for (n = i.start.parentNode, !domUtils.isBlockElm(n) || dtd.$tableContent[n.tagName] || dtd.$list[n.tagName] || domUtils.removeAttributes(n, g), n = i.end.parentNode, i.end && domUtils.isBlockElm(n) && !dtd.$tableContent[n.tagName] && !dtd.$list[n.tagName] && domUtils.removeAttributes(n, g), a.moveToBookmark(i).moveToBookmark(b), o = a.startContainer, q = a.collapsed; 1 == o.nodeType && domUtils.isEmptyNode(o) && dtd.$removeEmpty[o.tagName];) p = o.parentNode, a.setStartBefore(o), a.startContainer === a.endContainer && a.endOffset--, domUtils.remove(o), o = p;
						if (!q)
							for (o = a.endContainer; 1 == o.nodeType && domUtils.isEmptyNode(o) && dtd.$removeEmpty[o.tagName];) p = o.parentNode, a.setEndBefore(o), domUtils.remove(o), o = p
					}
					var i, k, f = new RegExp("^(?:" + (b || this.options.removeFormatTags).replace(/,/g, "|") + ")$", "i"),
						g = c ? [] : (d || this.options.removeFormatAttributes).split(","),
						h = new dom.Range(this.document),
						l = function(a) {
							return 1 == a.nodeType
						};
					h = this.selection.getRange(), n(h), h.select()
				}
			}
		}, UE.plugins["blockquote"] = function() {
			function b(a) {
				return domUtils.filterNodeList(a.selection.getStartElementPath(), "blockquote")
			}
			var a = this;
			a.commands["blockquote"] = {
				execCommand: function(a, c) {
					var h, i, j, k, l, n, m, o, p, q, r, s, t, d = this.selection.getRange(),
						e = b(this),
						f = dtd.blockquote,
						g = d.createBookmark();
					if (e)
						for (h = d.startContainer, i = domUtils.isBlockElm(h) ? h : domUtils.findParent(h, function(a) {
								return domUtils.isBlockElm(a)
							}), j = d.endContainer, k = domUtils.isBlockElm(j) ? j : domUtils.findParent(j, function(a) {
								return domUtils.isBlockElm(a)
							}), i = domUtils.findParentByTagName(i, "li", !0) || i, k = domUtils.findParentByTagName(k, "li", !0) || k, "LI" == i.tagName || "TD" == i.tagName || i === e || domUtils.isBody(i) ? domUtils.remove(e, !0) : domUtils.breakParent(i, e), i !== k && (e = domUtils.findParentByTagName(k, "blockquote"), e && ("LI" == k.tagName || "TD" == k.tagName || domUtils.isBody(k) ? e.parentNode && domUtils.remove(e, !0) : domUtils.breakParent(k, e))), l = domUtils.getElementsByTagName(this.document, "blockquote"), m = 0; n = l[m++];) n.childNodes.length ? domUtils.getPosition(n, i) & domUtils.POSITION_FOLLOWING && domUtils.getPosition(n, k) & domUtils.POSITION_PRECEDING && domUtils.remove(n, !0) : domUtils.remove(n);
					else {
						for (o = d.cloneRange(), p = 1 == o.startContainer.nodeType ? o.startContainer : o.startContainer.parentNode, q = p, r = 1;;) {
							if (domUtils.isBody(p)) {
								q !== p ? d.collapsed ? (o.selectNode(q), r = 0) : o.setStartBefore(q) : o.setStart(p, 0);
								break
							}
							if (!f[p.tagName]) {
								d.collapsed ? o.selectNode(q) : o.setStartBefore(q);
								break
							}
							q = p, p = p.parentNode
						}
						if (r)
							for (q = p = p = 1 == o.endContainer.nodeType ? o.endContainer : o.endContainer.parentNode;;) {
								if (domUtils.isBody(p)) {
									q !== p ? o.setEndAfter(q) : o.setEnd(p, p.childNodes.length);
									break
								}
								if (!f[p.tagName]) {
									o.setEndAfter(q);
									break
								}
								q = p, p = p.parentNode
							}
						for (p = d.document.createElement("blockquote"), domUtils.setAttributes(p, c), p.appendChild(o.extractContents()), o.insertNode(p), s = domUtils.getElementsByTagName(p, "blockquote"), m = 0; t = s[m++];) t.parentNode && domUtils.remove(t, !0)
					}
					d.moveToBookmark(g).select()
				},
				queryCommandState: function() {
					return b(this) ? 1 : 0
				}
			}
		}, UE.commands["touppercase"] = UE.commands["tolowercase"] = {
			execCommand: function(a) {
				var d, e, f, g, b = this,
					c = b.selection.getRange();
				if (c.collapsed) return c;
				for (d = c.createBookmark(), e = d.end, f = function(a) {
						return !domUtils.isBr(a) && !domUtils.isWhitespace(a)
					}, g = domUtils.getNextDomNode(d.start, !1, f); g && domUtils.getPosition(g, e) & domUtils.POSITION_PRECEDING && (3 == g.nodeType && (g.nodeValue = g.nodeValue["touppercase" == a ? "toUpperCase" : "toLowerCase"]()), g = domUtils.getNextDomNode(g, !0, f), g !== e););
				c.moveToBookmark(d).select()
			}
		}, UE.commands["indent"] = {
			execCommand: function() {
				var a = this,
					b = a.queryCommandState("indent") ? "0em" : a.options.indentValue || "2em";
				a.execCommand("Paragraph", "p", {
					style: "text-indent:" + b
				})
			},
			queryCommandState: function() {
				var a = domUtils.filterNodeList(this.selection.getStartElementPath(), "p h1 h2 h3 h4 h5 h6");
				return a && a.style.textIndent && parseInt(a.style.textIndent) ? 1 : 0
			}
		}, UE.commands["print"] = {
			execCommand: function() {
				this.window.print()
			},
			notNeedUndo: 1
		}, UE.commands["preview"] = {
			execCommand: function() {
				var a = window.open("", "_blank", ""),
					b = a.document;
				b.open(), b.write('<!DOCTYPE html><html><head><meta charset="utf-8"/><script src="' + this.options.UEDITOR_HOME_URL + 'ueditor.parse.js"></script><script>' + "setTimeout(function(){uParse('div',{rootPath: '" + this.options.UEDITOR_HOME_URL + "'})},300)" + "</script></head><body><div>" + this.getContent(null, null, !0) + "</div></body></html>"), b.close()
			},
			notNeedUndo: 1
		}, UE.plugins["selectall"] = function() {
			var a = this;
			a.commands["selectall"] = {
				execCommand: function() {
					var a = this,
						b = a.body,
						c = a.selection.getRange();
					c.selectNodeContents(b), domUtils.isEmptyBlock(b) && (browser.opera && b.firstChild && 1 == b.firstChild.nodeType && c.setStartAtFirst(b.firstChild), c.collapse(!0)), c.select(!0)
				},
				notNeedUndo: 1
			}, a.addshortcutkey({
				selectAll: "ctrl+65"
			})
		}, UE.plugins["paragraph"] = function() {
			var a = this,
				b = domUtils.isBlockElm,
				c = ["TD", "LI", "PRE"],
				d = function(a, d, e, f) {
					var i, m, j, k, l, n, g = a.createBookmark(),
						h = function(a) {
							return 1 == a.nodeType ? "br" != a.tagName.toLowerCase() && !domUtils.isBookmarkNode(a) : !domUtils.isWhitespace(a)
						};
					for (a.enlarge(!0), j = a.createBookmark(), k = domUtils.getNextDomNode(j.start, !1, h), l = a.cloneRange(); k && !(domUtils.getPosition(k, j.end) & domUtils.POSITION_FOLLOWING);)
						if (3 != k.nodeType && b(k)) k = domUtils.getNextDomNode(k, !0, h);
						else {
							for (l.setStartBefore(k); k && k !== j.end && !b(k);) m = k, k = domUtils.getNextDomNode(k, !1, null, function(a) {
								return !b(a)
							});
							l.setEndAfter(m), i = a.document.createElement(d), e && (domUtils.setAttributes(i, e), f && "customstyle" == f && e.style && (i.style.cssText = e.style)), i.appendChild(l.extractContents()), domUtils.isEmptyNode(i) && domUtils.fillChar(a.document, i), l.insertNode(i), n = i.parentNode, b(n) && !domUtils.isBody(i.parentNode) && -1 == utils.indexOf(c, n.tagName) && (f && "customstyle" == f || (n.getAttribute("dir") && i.setAttribute("dir", n.getAttribute("dir")), n.style.cssText && (i.style.cssText = n.style.cssText + ";" + i.style.cssText), n.style.textAlign && !i.style.textAlign && (i.style.textAlign = n.style.textAlign), n.style.textIndent && !i.style.textIndent && (i.style.textIndent = n.style.textIndent), n.style.padding && !i.style.padding && (i.style.padding = n.style.padding)), e && /h\d/i.test(n.tagName) && !/h\d/i.test(i.tagName) ? (domUtils.setAttributes(n, e), f && "customstyle" == f && e.style && (n.style.cssText = e.style), domUtils.remove(i, !0), i = n) : domUtils.remove(i.parentNode, !0)), k = -1 != utils.indexOf(c, n.tagName) ? n : i, k = domUtils.getNextDomNode(k, !1, h)
						}
					return a.moveToBookmark(j).moveToBookmark(g)
				};
			a.setOpt("paragraph", {
				p: "",
				h1: "",
				h2: "",
				h3: "",
				h4: "",
				h5: "",
				h6: ""
			}), a.commands["paragraph"] = {
				execCommand: function(a, b, c, e) {
					var g, h, i, f = this.selection.getRange();
					return f.collapsed && (g = this.document.createTextNode("p"), f.insertNode(g), browser.ie && (h = g.previousSibling, h && domUtils.isWhitespace(h) && domUtils.remove(h), h = g.nextSibling, h && domUtils.isWhitespace(h) && domUtils.remove(h))), f = d(f, b, c, e), g && (f.setStartBefore(g).collapse(!0), pN = g.parentNode, domUtils.remove(g), domUtils.isBlockElm(pN) && domUtils.isEmptyNode(pN) && domUtils.fillNode(this.document, pN)), browser.gecko && f.collapsed && 1 == f.startContainer.nodeType && (i = f.startContainer.childNodes[f.startOffset], i && 1 == i.nodeType && i.tagName.toLowerCase() == b && f.setStart(i, 0).collapse(!0)), f.select(), !0
				},
				queryCommandValue: function() {
					var a = domUtils.filterNodeList(this.selection.getStartElementPath(), "p h1 h2 h3 h4 h5 h6");
					return a ? a.tagName.toLowerCase() : ""
				}
			}
		},UE.plugins["xssFilter"] = function() {
			var config = UEDITOR_CONFIG;
			var whitList = config.whitList;

			function filter(node) {

				var tagName = node.tagName;
				var attrs = node.attrs;

				if (!whitList.hasOwnProperty(tagName)) {
					node.parentNode.removeChild(node);
					return false;
				}

				UE.utils.each(attrs, function (val, key) {

					if (whitList[tagName].indexOf(key) === -1) {
						node.setAttr(key);
					}
				});
			}

			// 添加inserthtmlpaste等操作用的过滤规则
			if (whitList && config.xssFilterRules) {
				this.options.filterRules = function () {

					var result = {};

					UE.utils.each(whitList, function(val, key) {
						result[key] = function (node) {
							return filter(node);
						};
					});

					return result;
				}();
			}

			var tagList = [];

			UE.utils.each(whitList, function (val, key) {
				tagList.push(key);
			});

			// 添加input过滤规则
			//
			if (whitList && config.inputXssFilter) {
				this.addInputRule(function (root) {

					root.traversal(function(node) {
						if (node.type !== 'element') {
							return false;
						}
						filter(node);
					});
				});
			}
			// 添加output过滤规则
			//
			if (whitList && config.outputXssFilter) {
				this.addOutputRule(function (root) {

					root.traversal(function(node) {
						if (node.type !== 'element') {
							return false;
						}
						filter(node);
					});
				});
			}
		},
		function() {
			var a = domUtils.isBlockElm,
				b = function(a) {
					return domUtils.filterNodeList(a.selection.getStartElementPath(), function(a) {
						return a && 1 == a.nodeType && a.getAttribute("dir")
					})
				},
				c = function(c, d, e) {
					var f, l, i, j, k, m, n, o, g = function(a) {
							return 1 == a.nodeType ? !domUtils.isBookmarkNode(a) : !domUtils.isWhitespace(a)
						},
						h = b(d);
					if (h && c.collapsed) return h.setAttribute("dir", e), c;
					for (f = c.createBookmark(), c.enlarge(!0), i = c.createBookmark(), j = domUtils.getNextDomNode(i.start, !1, g), k = c.cloneRange(); j && !(domUtils.getPosition(j, i.end) & domUtils.POSITION_FOLLOWING);)
						if (3 != j.nodeType && a(j)) j = domUtils.getNextDomNode(j, !0, g);
						else {
							for (k.setStartBefore(j); j && j !== i.end && !a(j);) l = j, j = domUtils.getNextDomNode(j, !1, null, function(b) {
								return !a(b)
							});
							k.setEndAfter(l), m = k.getCommonAncestor(), !domUtils.isBody(m) && a(m) ? (m.setAttribute("dir", e), j = m) : (n = c.document.createElement("p"), n.setAttribute("dir", e), o = k.extractContents(), n.appendChild(o), k.insertNode(n), j = n), j = domUtils.getNextDomNode(j, !1, g)
						}
					return c.moveToBookmark(i).moveToBookmark(f)
				};
			UE.commands["directionality"] = {
				execCommand: function(a, b) {
					var e, d = this.selection.getRange();
					return d.collapsed && (e = this.document.createTextNode("d"), d.insertNode(e)), c(d, this, b), e && (d.setStartBefore(e).collapse(!0), domUtils.remove(e)), d.select(), !0
				},
				queryCommandValue: function() {
					var a = b(this);
					return a ? a.getAttribute("dir") : "ltr"
				}
			}
		}(), UE.plugins["horizontal"] = function() {
			var a = this;
			a.commands["horizontal"] = {
				execCommand: function(a) {
					var c, d, e, b = this;
					return -1 !== b.queryCommandState(a) ? (b.execCommand("insertHtml", "<hr>"), c = b.selection.getRange(), d = c.startContainer, 1 != d.nodeType || d.childNodes[c.startOffset] || (e = d.childNodes[c.startOffset - 1]) && 1 == e.nodeType && "HR" == e.tagName && ("p" == b.options.enterTag ? (e = b.document.createElement("p"), c.insertNode(e), c.setStart(e, 0).setCursor()) : (e = b.document.createElement("br"), c.insertNode(e), c.setStartBefore(e).setCursor())), !0) : void 0
				},
				queryCommandState: function() {
					return domUtils.filterNodeList(this.selection.getStartElementPath(), "table") ? -1 : 0
				}
			}, a.addListener("delkeydown", function(a, b) {
				var d, e, c = this.selection.getRange();
				return c.txtToElmBoundary(!0), domUtils.isStartInblock(c) && (d = c.startContainer, e = d.previousSibling, e && domUtils.isTagNode(e, "hr")) ? (domUtils.remove(e), c.select(), domUtils.preventDefault(b), !0) : void 0
			})
		}, UE.commands["time"] = UE.commands["date"] = {
			execCommand: function(a, b) {
				function d(a, b) {
					var c = ("0" + a.getHours()).slice(-2),
						d = ("0" + a.getMinutes()).slice(-2),
						e = ("0" + a.getSeconds()).slice(-2);
					return b = b || "hh:ii:ss", b.replace(/hh/gi, c).replace(/ii/gi, d).replace(/ss/gi, e)
				}

				function e(a, b) {
					var c = ("000" + a.getFullYear()).slice(-4),
						d = c.slice(-2),
						e = ("0" + (a.getMonth() + 1)).slice(-2),
						f = ("0" + a.getDate()).slice(-2);
					return b = b || "yyyy-mm-dd", b.replace(/yyyy/gi, c).replace(/yy/gi, d).replace(/mm/gi, e).replace(/dd/gi, f)
				}
				var c = new Date;
				this.execCommand("insertHtml", "time" == a ? d(c, b) : e(c, b))
			}
		}, UE.plugins["rowspacing"] = function() {
			var a = this;
			a.setOpt({
				rowspacingtop: ["5", "10", "15", "20", "25"],
				rowspacingbottom: ["5", "10", "15", "20", "25"]
			}), a.commands["rowspacing"] = {
				execCommand: function(a, b, c) {
					return this.execCommand("paragraph", "p", {
						style: "margin-" + c + ":" + b + "px"
					}), !0
				},
				queryCommandValue: function(a, b) {
					var d, c = domUtils.filterNodeList(this.selection.getStartElementPath(), function(a) {
						return domUtils.isBlockElm(a)
					});
					return c ? (d = domUtils.getComputedStyle(c, "margin-" + b).replace(/[^\d]/g, ""), d ? d : 0) : 0
				}
			}
		}, UE.plugins["lineheight"] = function() {
			var a = this;
			a.setOpt({
				lineheight: ["1", "1.5", "1.75", "2", "3", "4", "5"]
			}), a.commands["lineheight"] = {
				execCommand: function(a, b) {
					return this.execCommand("paragraph", "p", {
						style: "line-height:" + ("1" == b ? "normal" : b + "em")
					}), !0
				},
				queryCommandValue: function() {
					var b, a = domUtils.filterNodeList(this.selection.getStartElementPath(), function(a) {
						return domUtils.isBlockElm(a)
					});
					return a ? (b = domUtils.getComputedStyle(a, "line-height"), "normal" == b ? 1 : b.replace(/[^\d.]*/gi, "")) : void 0
				}
			}
		}, UE.plugins["insertcode"] = function() {
			var a = this;
			a.ready(function() {
				utils.cssRule("pre", "pre{margin:.5em 0;padding:.4em .6em;border-radius:8px;background:#f8f8f8;}", a.document)
			}), a.setOpt("insertcode", {
				as3: "ActionScript3",
				bash: "Bash/Shell",
				cpp: "C/C++",
				css: "Css",
				cf: "CodeFunction",
				"c#": "C#",
				delphi: "Delphi",
				diff: "Diff",
				erlang: "Erlang",
				groovy: "Groovy",
				html: "Html",
				java: "Java",
				jfx: "JavaFx",
				js: "Javascript",
				pl: "Perl",
				php: "Php",
				plain: "Plain Text",
				ps: "PowerShell",
				python: "Python",
				ruby: "Ruby",
				scala: "Scala",
				sql: "Sql",
				vb: "Vb",
				xml: "Xml"
			}), a.commands["insertcode"] = {
				execCommand: function(a, b) {
					var f, g, h, i, c = this,
						d = c.selection.getRange(),
						e = domUtils.findParentByTagName(d.startContainer, "pre", !0);
					e ? e.className = "brush:" + b + ";toolbar:false;" : (f = "", d.collapsed ? f = browser.ie && browser.ie11below ? browser.version <= 8 ? "&nbsp;" : "" : "<br/>" : (g = d.extractContents(), h = c.document.createElement("div"), h.appendChild(g), utils.each(UE.filterNode(UE.htmlparser(h.innerHTML.replace(/[\r\t]/g, "")), c.options.filterTxtRules).children, function(a) {
						if (browser.ie && browser.ie11below && browser.version > 8) "element" == a.type ? "br" == a.tagName ? f += "\n" : dtd.$empty[a.tagName] || (utils.each(a.children, function(b) {
							"element" == b.type ? "br" == b.tagName ? f += "\n" : dtd.$empty[a.tagName] || (f += b.innerText()) : f += b.data
						}), /\n$/.test(f) || (f += "\n")) : f += a.data + "\n", !a.nextSibling() && /\n$/.test(f) && (f = f.replace(/\n$/, ""));
						else if (browser.ie && browser.ie11below) "element" == a.type ? "br" == a.tagName ? f += "<br>" : dtd.$empty[a.tagName] || (utils.each(a.children, function(b) {
							"element" == b.type ? "br" == b.tagName ? f += "<br>" : dtd.$empty[a.tagName] || (f += b.innerText()) : f += b.data
						}), /br>$/.test(f) || (f += "<br>")) : f += a.data + "<br>", !a.nextSibling() && /<br>$/.test(f) && (f = f.replace(/<br>$/, ""));
						else if (f += "element" == a.type ? dtd.$empty[a.tagName] ? "" : a.innerText() : a.data, !/br\/?\s*>$/.test(f)) {
							if (!a.nextSibling()) return;
							f += "<br>"
						}
					})), c.execCommand("inserthtml", '<pre id="coder"class="brush:' + b + ';toolbar:false">' + f + "</pre>", !0), e = c.document.getElementById("coder"), domUtils.removeAttributes(e, "id"), i = e.previousSibling, i && (3 == i.nodeType && 1 == i.nodeValue.length && browser.ie && 6 == browser.version || domUtils.isEmptyBlock(i)) && domUtils.remove(i), d = c.selection.getRange(), domUtils.isEmptyBlock(e) ? d.setStart(e, 0).setCursor(!1, !0) : d.selectNodeContents(e).select())
				},
				queryCommandValue: function() {
					var a = this.selection.getStartElementPath(),
						b = "";
					return utils.each(a, function(a) {
						if ("PRE" == a.nodeName) {
							var c = a.className.match(/brush:([^;]+)/);
							return b = c && c[1] ? c[1] : "", !1
						}
					}), b
				}
			}, a.addInputRule(function(a) {
				utils.each(a.getNodesByTagName("pre"), function(a) {
					var c, b = a.getNodesByTagName("br");
					return b.length ? (browser.ie && browser.ie11below && browser.version > 8 && utils.each(b, function(a) {
						var b = UE.uNode.createText("\n");
						a.parentNode.insertBefore(b, a), a.parentNode.removeChild(a)
					}), void 0) : (browser.ie && browser.ie11below && browser.version > 8 || (c = a.innerText().split(/\n/), a.innerHTML(""), utils.each(c, function(b) {
						b.length && a.appendChild(UE.uNode.createText(b)), a.appendChild(UE.uNode.createElement("br"))
					})), void 0)
				})
			}), a.addOutputRule(function(a) {
				utils.each(a.getNodesByTagName("pre"), function(a) {
					var b = "";
					utils.each(a.children, function(a) {
						b += "text" == a.type ? a.data.replace(/[ ]/g, "&nbsp;").replace(/\n$/, "") : "br" == a.tagName ? "\n" : dtd.$empty[a.tagName] ? a.innerText() : ""
					}), a.innerText(b.replace(/(&nbsp;|\n)+$/, ""))
				})
			}), a.notNeedCodeQuery = {
				help: 1,
				undo: 1,
				redo: 1,
				source: 1,
				print: 1,
				searchreplace: 1,
				fullscreen: 1,
				preview: 1,
				insertparagraph: 1,
				elementpath: 1,
				insertcode: 1,
				inserthtml: 1,
				selectall: 1
			}, a.queryCommandState, a.queryCommandState = function(a) {
				var b = this;
				return !b.notNeedCodeQuery[a.toLowerCase()] && b.selection && b.queryCommandValue("insertcode") ? -1 : UE.Editor.prototype.queryCommandState.apply(this, arguments)
			}, a.addListener("beforeenterkeydown", function() {
				var d, e, f, g, h, i, j, k, l, b = a.selection.getRange(),
					c = domUtils.findParentByTagName(b.startContainer, "pre", !0);
				if (c) {
					if (a.fireEvent("saveScene"), b.collapsed || b.deleteContents(), !browser.ie || browser.ie9above) {
						for (d = a.document.createElement("br"), b.insertNode(d).setStartAfter(d).collapse(!0), e = d.nextSibling, e || browser.ie && !(browser.version > 10) ? b.setStartAfter(d) : b.insertNode(d.cloneNode(!1)), c = d.previousSibling; c;)
							if (f = c, c = c.previousSibling, !c || "BR" == c.nodeName) {
								c = f;
								break
							}
						if (c) {
							for (g = ""; c && "BR" != c.nodeName && new RegExp("^[\\s" + domUtils.fillChar + "]*$").test(c.nodeValue);) g += c.nodeValue, c = c.nextSibling;
							"BR" != c.nodeName && (h = c.nodeValue.match(new RegExp("^([\\s" + domUtils.fillChar + "]+)")), h && h[1] && (g += h[1])), g && (g = a.document.createTextNode(g), b.insertNode(g).setStartAfter(g))
						}
						b.collapse(!0).select(!0)
					} else if (browser.version > 8) i = a.document.createTextNode("\n"), j = b.startContainer, 0 == b.startOffset ? (k = j.previousSibling, k && (b.insertNode(i), l = a.document.createTextNode(" "), b.setStartAfter(i).insertNode(l).setStart(l, 0).collapse(!0).select(!0))) : (b.insertNode(i).setStartAfter(i), l = a.document.createTextNode(" "), j = b.startContainer.childNodes[b.startOffset], j && !/^\n/.test(j.nodeValue) && b.setStartBefore(i), b.insertNode(l).setStart(l, 0).collapse(!0).select(!0));
					else {
						for (d = a.document.createElement("br"), b.insertNode(d), b.insertNode(a.document.createTextNode(domUtils.fillChar)), b.setStartAfter(d), c = d.previousSibling; c;)
							if (f = c, c = c.previousSibling, !c || "BR" == c.nodeName) {
								c = f;
								break
							}
						if (c) {
							for (g = ""; c && "BR" != c.nodeName && new RegExp("^[ " + domUtils.fillChar + "]*$").test(c.nodeValue);) g += c.nodeValue, c = c.nextSibling;
							"BR" != c.nodeName && (h = c.nodeValue.match(new RegExp("^([ " + domUtils.fillChar + "]+)")), h && h[1] && (g += h[1])), g = a.document.createTextNode(g), b.insertNode(g).setStartAfter(g)
						}
						b.collapse(!0).select()
					}
					return a.fireEvent("saveScene"), !0
				}
			}), a.addListener("tabkeydown", function(b, c) {
				var f, g, h, i, d = a.selection.getRange(),
					e = domUtils.findParentByTagName(d.startContainer, "pre", !0);
				if (e) {
					if (a.fireEvent("saveScene"), c.shiftKey);
					else if (d.collapsed) i = a.document.createTextNode("    "), d.insertNode(i).setStartAfter(i).collapse(!0).select(!0);
					else {
						for (f = d.createBookmark(), g = f.start.previousSibling; g;) {
							if (e.firstChild === g && !domUtils.isBr(g)) {
								e.insertBefore(a.document.createTextNode("    "), g);
								break
							}
							if (domUtils.isBr(g)) {
								e.insertBefore(a.document.createTextNode("    "), g.nextSibling);
								break
							}
							g = g.previousSibling
						}
						for (h = f.end, g = f.start.nextSibling, e.firstChild === f.start && e.insertBefore(a.document.createTextNode("    "), g.nextSibling); g && g !== h;) {
							if (domUtils.isBr(g) && g.nextSibling) {
								if (g.nextSibling === h) break;
								e.insertBefore(a.document.createTextNode("    "), g.nextSibling)
							}
							g = g.nextSibling
						}
						d.moveToBookmark(f).select()
					}
					return a.fireEvent("saveScene"), !0
				}
			}), a.addListener("beforeinserthtml", function(a, b) {
				var f, g, h, c = this,
					d = c.selection.getRange(),
					e = domUtils.findParentByTagName(d.startContainer, "pre", !0);
				return e ? (d.collapsed || d.deleteContents(), f = "", browser.ie && browser.version > 8 ? (utils.each(UE.filterNode(UE.htmlparser(b), c.options.filterTxtRules).children, function(a) {
					"element" == a.type ? "br" == a.tagName ? f += "\n" : dtd.$empty[a.tagName] || (utils.each(a.children, function(b) {
						"element" == b.type ? "br" == b.tagName ? f += "\n" : dtd.$empty[a.tagName] || (f += b.innerText()) : f += b.data
					}), /\n$/.test(f) || (f += "\n")) : f += a.data + "\n", !a.nextSibling() && /\n$/.test(f) && (f = f.replace(/\n$/, ""))
				}), g = c.document.createTextNode(utils.html(f.replace(/&nbsp;/g, " "))), d.insertNode(g).selectNode(g).select()) : (h = c.document.createDocumentFragment(), utils.each(UE.filterNode(UE.htmlparser(b), c.options.filterTxtRules).children, function(a) {
					"element" == a.type ? "br" == a.tagName ? h.appendChild(c.document.createElement("br")) : dtd.$empty[a.tagName] || (utils.each(a.children, function(b) {
						"element" == b.type ? "br" == b.tagName ? h.appendChild(c.document.createElement("br")) : dtd.$empty[a.tagName] || h.appendChild(c.document.createTextNode(utils.html(b.innerText().replace(/&nbsp;/g, " ")))) : h.appendChild(c.document.createTextNode(utils.html(b.data.replace(/&nbsp;/g, " "))))
					}), "BR" != h.lastChild.nodeName && h.appendChild(c.document.createElement("br"))) : h.appendChild(c.document.createTextNode(utils.html(a.data.replace(/&nbsp;/g, " ")))), a.nextSibling() || "BR" != h.lastChild.nodeName || h.removeChild(h.lastChild)
				}), d.insertNode(h).select()), !0) : void 0
			}), a.addListener("keydown", function(a, b) {
				var f, e, g, h, c = this,
					d = b.keyCode || b.which;
				if (40 == d && (e = c.selection.getRange(), g = e.startContainer, e.collapsed && (f = domUtils.findParentByTagName(e.startContainer, "pre", !0)) && !f.nextSibling)) {
					for (h = f.lastChild; h && "BR" == h.nodeName;) h = h.previousSibling;
					(h === g || e.startContainer === f && e.startOffset == f.childNodes.length) && (c.execCommand("insertparagraph"), domUtils.preventDefault(b))
				}
			}), a.addListener("delkeydown", function(b, c) {
				var e, f, d = this.selection.getRange();
				return d.txtToElmBoundary(!0), e = d.startContainer, domUtils.isTagNode(e, "pre") && d.collapsed && domUtils.isStartInblock(d) ? (f = a.document.createElement("p"), domUtils.fillNode(a.document, f), e.parentNode.insertBefore(f, e), domUtils.remove(e), d.setStart(f, 0).setCursor(!1, !0), domUtils.preventDefault(c), !0) : void 0
			})
		}, UE.commands["cleardoc"] = {
			execCommand: function() {
				var b = this,
					c = b.options.enterTag,
					d = b.selection.getRange();
				"br" == c ? (b.body.innerHTML = "<br/>", d.setStart(b.body, 0).setCursor()) : (b.body.innerHTML = "<p>" + (ie ? "" : "<br/>") + "</p>", d.setStart(b.body.firstChild, 0).setCursor(!1, !0)), setTimeout(function() {
					b.fireEvent("clearDoc")
				}, 0)
			}
		}, UE.plugin.register("anchor", function() {
			return {
				bindEvents: {
					ready: function() {
						utils.cssRule("anchor", ".anchorclass{background: url('" + this.options.themePath + this.options.theme + "/images/anchor.gif') no-repeat scroll left center transparent;cursor: auto;display: inline-block;height: 16px;width: 15px;}", this.document)
					}
				},
				outputRule: function(a) {
					utils.each(a.getNodesByTagName("img"), function(a) {
						var b;
						(b = a.getAttr("anchorname")) && (a.tagName = "a", a.setAttr({
							anchorname: "",
							name: b,
							"class": ""
						}))
					})
				},
				inputRule: function(a) {
					utils.each(a.getNodesByTagName("a"), function(a) {
						var b;
						(b = a.getAttr("name")) && !a.getAttr("href") && (a.tagName = "img", a.setAttr({
							anchorname: a.getAttr("name"),
							"class": "anchorclass"
						}), a.setAttr("name"))
					})
				},
				commands: {
					anchor: {
						execCommand: function(a, b) {
							var e, c = this.selection.getRange(),
								d = c.getClosedNode();
							d && d.getAttribute("anchorname") ? b ? d.setAttribute("anchorname", b) : (c.setStartBefore(d).setCursor(), domUtils.remove(d)) : b && (e = this.document.createElement("img"), c.collapse(!0), domUtils.setAttributes(e, {
								anchorname: b,
								"class": "anchorclass"
							}), c.insertNode(e).setStartAfter(e).setCursor(!1, !0))
						}
					}
				}
			}
		}), UE.plugins["wordcount"] = function() {
			var b, a = this;
			a.setOpt("wordCount", !0), a.addListener("contentchange", function() {
				a.fireEvent("wordcount")
			}), a.addListener("ready", function() {
				var a = this;
				domUtils.on(a.body, "keyup", function(c) {
					var d = c.keyCode || c.which,
						e = {
							16: 1,
							18: 1,
							20: 1,
							37: 1,
							38: 1,
							39: 1,
							40: 1
						};
					d in e || (clearTimeout(b), b = setTimeout(function() {
						a.fireEvent("wordcount")
					}, 200))
				})
			})
		}, UE.plugins["pagebreak"] = function() {
			function c(b) {
				if (domUtils.isEmptyBlock(b)) {
					for (var d, c = b.firstChild; c && 1 == c.nodeType && domUtils.isEmptyBlock(c);) d = c, c = c.firstChild;
					!d && (d = b), domUtils.fillNode(a.document, d)
				}
			}

			function d(a) {
				return a && 1 == a.nodeType && "HR" == a.tagName && "pagebreak" == a.className
			}
			var a = this,
				b = ["td"];
			a.setOpt("pageBreakTag", "_ueditor_page_break_tag_"), a.ready(function() {
				utils.cssRule("pagebreak", ".pagebreak{display:block;clear:both !important;cursor:default !important;width: 100% !important;margin:0;}", a.document)
			}), a.addInputRule(function(b) {
				b.traversal(function(b) {
					if ("text" == b.type && b.data == a.options.pageBreakTag) {
						var c = UE.uNode.createElement('<hr class="pagebreak" noshade="noshade" size="5" style="-webkit-user-select: none;">');
						b.parentNode.insertBefore(c, b), b.parentNode.removeChild(b)
					}
				})
			}), a.addOutputRule(function(b) {
				utils.each(b.getNodesByTagName("hr"), function(b) {
					if ("pagebreak" == b.getAttr("class")) {
						var c = UE.uNode.createText(a.options.pageBreakTag);
						b.parentNode.insertBefore(c, b), b.parentNode.removeChild(b)
					}
				})
			}), a.commands["pagebreak"] = {
				execCommand: function() {
					var i, g, h, j, k, l, m, n, e = a.selection.getRange(),
						f = a.document.createElement("hr");
					if (domUtils.setAttributes(f, {
							"class": "pagebreak",
							noshade: "noshade",
							size: "5"
						}), domUtils.unSelectable(f), g = domUtils.findParentByTagName(e.startContainer, b, !0), h = [], g) switch (g.tagName) {
						case "TD":
							i = g.parentNode, i.previousSibling ? (i.parentNode.insertBefore(f, i), h = domUtils.findParents(f)) : (j = domUtils.findParentByTagName(i, "table"), j.parentNode.insertBefore(f, j), h = domUtils.findParents(f, !0)), i = h[1], f !== i && domUtils.breakParent(f, i), a.fireEvent("afteradjusttable", a.document)
					} else {
						if (!e.collapsed)
							for (e.deleteContents(), k = e.startContainer; !domUtils.isBody(k) && domUtils.isBlockElm(k) && domUtils.isEmptyNode(k);) e.setStartBefore(k).collapse(!0), domUtils.remove(k), k = e.startContainer;
						for (e.insertNode(f), i = f.parentNode; !domUtils.isBody(i);) domUtils.breakParent(f, i), l = f.nextSibling, l && domUtils.isEmptyBlock(l) && domUtils.remove(l), i = f.parentNode;
						l = f.nextSibling, m = f.previousSibling, d(m) ? domUtils.remove(m) : m && c(m), l ? (d(l) ? domUtils.remove(l) : c(l), e.setEndAfter(f).collapse(!1)) : (n = a.document.createElement("p"), f.parentNode.appendChild(n), domUtils.fillNode(a.document, n), e.setStart(n, 0).collapse(!0)), e.select(!0)
					}
				}
			}
		}, UE.plugin.register("wordimage", function() {
			var a = this,
				b = [];
			return {
				commands: {
					wordimage: {
						execCommand: function() {
							var e, d, f, b = domUtils.getElementsByTagName(a.body, "img"),
								c = [];
							for (d = 0; e = b[d++];) f = e.getAttribute("word_img"), f && c.push(f);
							return c
						},
						queryCommandState: function() {
							b = domUtils.getElementsByTagName(a.body, "img");
							for (var d, c = 0; d = b[c++];)
								if (d.getAttribute("word_img")) return 1;
							return -1
						},
						notNeedUndo: !0
					}
				},
				inputRule: function(b) {
					utils.each(b.getNodesByTagName("img"), function(b) {
						var c = b.attrs,
							d = parseInt(c.width) < 128 || parseInt(c.height) < 43,
							e = a.options,
							f = e.UEDITOR_HOME_URL + "themes/default/images/spacer.gif";
						c["src"] && /^(?:(file:\/+))/.test(c["src"]) && b.setAttr({
							width: c.width,
							height: c.height,
							alt: c.alt,
							word_img: c.src,
							src: f,
							style: "background:url(" + (d ? e.themePath + e.theme + "/images/word.gif" : e.langPath + e.lang + "/images/localimage.png") + ") no-repeat center center;border:1px solid #ddd"
						})
					})
				}
			}
		}), UE.plugins["dragdrop"] = function() {
			var a = this;
			a.ready(function() {
				domUtils.on(this.body, "dragend", function() {
					var e, d, b = a.selection.getRange(),
						c = b.getClosedNode() || a.selection.getStart();
					if (c && "IMG" == c.tagName) {
						for (d = c.previousSibling;
							(e = c.nextSibling) && 1 == e.nodeType && "SPAN" == e.tagName && !e.firstChild;) domUtils.remove(e);
						(!d || 1 != d.nodeType || domUtils.isEmptyBlock(d)) && d || e && (!e || domUtils.isEmptyBlock(e)) || (d && "P" == d.tagName && !domUtils.isEmptyBlock(d) ? (d.appendChild(c), domUtils.moveChild(e, d), domUtils.remove(e)) : e && "P" == e.tagName && !domUtils.isEmptyBlock(e) && e.insertBefore(c, e.firstChild), d && "P" == d.tagName && domUtils.isEmptyBlock(d) && domUtils.remove(d), e && "P" == e.tagName && domUtils.isEmptyBlock(e) && domUtils.remove(e), b.selectNode(c).select(), a.fireEvent("saveScene"))
					}
				})
			}), a.addListener("keyup", function(b, c) {
				var f, e, d = c.keyCode || c.which;
				13 == d && (e = a.selection.getRange(), (f = domUtils.findParentByTagName(e.startContainer, "p", !0)) && "center" == domUtils.getComputedStyle(f, "text-align") && domUtils.removeStyle(f, "text-align"))
			})
		}, UE.plugins["undo"] = function() {
			function h(a, b) {
				if (a.length != b.length) return 0;
				for (var c = 0, d = a.length; d > c; c++)
					if (a[c] != b[c]) return 0;
				return 1
			}

			function i(a, b) {
				return a.collapsed != b.collapsed ? 0 : h(a.startAddress, b.startAddress) && h(a.endAddress, b.endAddress) ? 1 : 0
			}

			function j() {
				this.list = [], this.index = 0, this.hasUndo = !1, this.hasRedo = !1, this.undo = function() {
					if (this.hasUndo) {
						if (!this.list[this.index - 1] && 1 == this.list.length) return this.reset(), void 0;
						for (; this.list[this.index].content == this.list[this.index - 1].content;)
							if (this.index--, 0 == this.index) return this.restore(0);
						this.restore(--this.index)
					}
				}, this.redo = function() {
					if (this.hasRedo) {
						for (; this.list[this.index].content == this.list[this.index + 1].content;)
							if (this.index++, this.index == this.list.length - 1) return this.restore(this.index);
						this.restore(++this.index)
					}
				}, this.restore = function() {
					var d, a = this.editor,
						b = this.list[this.index],
						c = UE.htmlparser(b.content.replace(e, ""));
					a.options.autoClearEmptyNode = !1, a.filterInputRule(c), a.options.autoClearEmptyNode = g, a.document.body.innerHTML = c.toHtml(), a.fireEvent("afterscencerestore"), browser.ie && utils.each(domUtils.getElementsByTagName(a.document, "td th caption p"), function(b) {
						domUtils.isEmptyNode(b) && domUtils.fillNode(a.document, b)
					});
					try {
						d = new dom.Range(a.document).moveToAddress(b.address), d.select(f[d.startContainer.nodeName.toLowerCase()])
					} catch (h) {}
					this.update(), this.clearKey(), a.fireEvent("reset", !0)
				}, this.getScene = function() {
					var d, e, a = this.editor,
						b = a.selection.getRange(),
						c = b.createAddress(!1, !0);
					return a.fireEvent("beforegetscene"), d = UE.htmlparser(a.body.innerHTML), a.options.autoClearEmptyNode = !1, a.filterOutputRule(d), a.options.autoClearEmptyNode = g, e = d.toHtml(), a.fireEvent("aftergetscene"), {
						address: c,
						content: e
					}
				}, this.save = function(d, e) {
					clearTimeout(a);
					var f = this.getScene(e),
						g = this.list[this.index];
					g && g.content != f.content && b.trigger("contentchange"), g && g.content == f.content && (d ? 1 : i(g.address, f.address)) || (this.list = this.list.slice(0, this.index + 1), this.list.push(f), this.list.length > c && this.list.shift(), this.index = this.list.length - 1, this.clearKey(), this.update())
				}, this.update = function() {
					this.hasRedo = !!this.list[this.index + 1], this.hasUndo = !!this.list[this.index - 1]
				}, this.reset = function() {
					this.list = [], this.index = 0, this.hasUndo = !1, this.hasRedo = !1, this.clearKey()
				}, this.clearKey = function() {
					m = 0, n = null
				}
			}
			var a, n, l, m, o, p, b = this,
				c = b.options.maxUndoCount || 20,
				d = b.options.maxInputCount || 20,
				e = new RegExp(domUtils.fillChar + "|</hr>", "gi"),
				f = {
					ol: 1,
					ul: 1,
					table: 1,
					tbody: 1,
					tr: 1,
					body: 1
				},
				g = b.options.autoClearEmptyNode;
			b.undoManger = new j, b.undoManger.editor = b, b.addListener("saveScene", function() {
				var a = Array.prototype.splice.call(arguments, 1);
				this.undoManger.save.apply(this.undoManger, a)
			}), b.addListener("reset", function(a, b) {
				b || this.undoManger.reset()
			}), b.commands["redo"] = b.commands["undo"] = {
				execCommand: function(a) {
					this.undoManger[a]()
				},
				queryCommandState: function(a) {
					return this.undoManger["has" + ("undo" == a.toLowerCase() ? "Undo" : "Redo")] ? 0 : -1
				},
				notNeedUndo: 1
			}, l = {
				16: 1,
				17: 1,
				18: 1,
				37: 1,
				38: 1,
				39: 1,
				40: 1
			}, m = 0, o = !1, b.addListener("ready", function() {
				domUtils.on(this.body, "compositionstart", function() {
					o = !0
				}), domUtils.on(this.body, "compositionend", function() {
					o = !1
				})
			}), b.addshortcutkey({
				Undo: "ctrl+90",
				Redo: "ctrl+89"
			}), p = !0, b.addListener("keydown", function(b, c) {
				function g(a) {
					a.undoManger.save(!1, !0), a.fireEvent("selectionchange")
				}
				var e = this,
					f = c.keyCode || c.which;
				if (!(l[f] || c.ctrlKey || c.metaKey || c.shiftKey || c.altKey)) {
					if (o) return;
					if (!e.selection.getRange().collapsed) return e.undoManger.save(!1, !0), p = !1, void 0;
					0 == e.undoManger.list.length && e.undoManger.save(!0), clearTimeout(a), a = setTimeout(function() {
						if (o) var a = setInterval(function() {
							o || (g(e), clearInterval(a))
						}, 300);
						else g(e)
					}, 200), n = f, m++, m >= d && g(e)
				}
			}), b.addListener("keyup", function(a, b) {
				var c = b.keyCode || b.which;
				if (!(l[c] || b.ctrlKey || b.metaKey || b.shiftKey || b.altKey)) {
					if (o) return;
					p || (this.undoManger.save(!1, !0), p = !0)
				}
			}), b.stopCmdUndo = function() {
				b.__hasEnterExecCommand = !0
			}, b.startCmdUndo = function() {
				b.__hasEnterExecCommand = !1
			}
		}, UE.plugins["paste"] = function() {
			function a(a) {
				var c, d, e, b = this.document;
				b.getElementById("baidu_pastebin") || (c = this.selection.getRange(), d = c.createBookmark(), e = b.createElement("div"), e.id = "baidu_pastebin", browser.webkit && e.appendChild(b.createTextNode(domUtils.fillChar + domUtils.fillChar)), b.body.appendChild(e), d.start.style.display = "", e.style.cssText = "position:absolute;width:1px;height:1px;overflow:hidden;left:-1000px;white-space:nowrap;top:" + domUtils.getXY(d.start).y + "px", c.selectNodeContents(e).select(!0), setTimeout(function() {
					if (browser.webkit)
						for (var h, f = 0, g = b.querySelectorAll("#baidu_pastebin"); h = g[f++];) {
							if (!domUtils.isEmptyNode(h)) {
								e = h;
								break
							}
							domUtils.remove(h)
						}
					try {
						e.parentNode.removeChild(e)
					} catch (i) {}
					c.moveToBookmark(d).select(!0), a(e)
				}, 0))
			}

			function f(a) {
				return a.replace(/<(\/?)([\w\-]+)([^>]*)>/gi, function(a, b, c, d) {
					return c = c.toLowerCase(), {
						img: 1
					}[c] ? a : (d = d.replace(/([\w\-]*?)\s*=\s*(("([^"]*)")|('([^']*)')|([^\s>]+))/gi, function(a, b, c) {
						return {
							src: 1,
							href: 1,
							name: 1
						}[b.toLowerCase()] ? b + "=" + c + " ": ""
					}), {
						span: 1,
						div: 1
					}[c] ? "" : "<" + b + c + " " + utils.trim(d) + ">")
				})
			}

			function g(a) {
				var g, h, j, i, k, l, m, n, o, p, q, r, s, t, u, v;
				if (a.firstChild) {
					for (h = domUtils.getElementsByTagName(a, "span"), i = 0; j = h[i++];)("_baidu_cut_start" == j.id || "_baidu_cut_end" == j.id) && domUtils.remove(j);
					if (browser.webkit) {
						for (k = a.querySelectorAll("div br"), i = 0; l = k[i++];) m = l.parentNode, "DIV" == m.tagName && 1 == m.childNodes.length && (m.innerHTML = "<p><br/></p>", domUtils.remove(m));
						for (n = a.querySelectorAll("#baidu_pastebin"), i = 0; o = n[i++];) {
							for (p = b.document.createElement("p"), o.parentNode.insertBefore(p, o); o.firstChild;) p.appendChild(o.firstChild);
							domUtils.remove(o)
						}
						for (q = a.querySelectorAll("meta"), i = 0; r = q[i++];) domUtils.remove(r);
						for (k = a.querySelectorAll("br"), i = 0; r = k[i++];) /^apple-/i.test(r.className) && domUtils.remove(r)
					}
					if (browser.gecko)
						for (s = a.querySelectorAll("[_moz_dirty]"), i = 0; r = s[i++];) r.removeAttribute("_moz_dirty");
					if (!browser.ie)
						for (t = a.querySelectorAll("span.Apple-style-span"), i = 0; r = t[i++];) domUtils.remove(r, !0);
					if (g = a.innerHTML, g = UE.filterWord(g), u = UE.htmlparser(g), b.options.filterRules && UE.filterNode(u, b.options.filterRules), b.filterInputRule(u), browser.webkit && (v = u.lastChild(), v && "element" == v.type && "br" == v.tagName && u.removeChild(v), utils.each(b.body.querySelectorAll("div"), function(a) {
							domUtils.isEmptyBlock(a) && domUtils.remove(a, !0)
						})), g = {
							html: u.toHtml()
						}, b.fireEvent("beforepaste", g, u), !g.html) return;
					u = UE.htmlparser(g.html, !0), 1 === b.queryCommandState("pasteplain") ? b.execCommand("insertHtml", UE.filterNode(u, b.options.filterTxtRules).toHtml(), !0) : (UE.filterNode(u, b.options.filterTxtRules), c = u.toHtml(), d = g.html, e = b.selection.getRange().createAddress(!0), b.execCommand("insertHtml", b.getOpt("retainOnlyLabelPasted") === !0 ? f(d) : d, !0)), b.fireEvent("afterpaste", g)
				}
			}
			var c, d, e, b = this;
			b.setOpt({
				retainOnlyLabelPasted: !1
			}), b.addListener("pasteTransfer", function(a, g) {
				var h, i, j, k, l, m, n, o;
				if (e && c && d && c != d) {
					if (h = b.selection.getRange(), h.moveToAddress(e, !0), !h.collapsed) {
						for (; !domUtils.isBody(h.startContainer);) {
							if (i = h.startContainer, 1 == i.nodeType) {
								if (i = i.childNodes[h.startOffset], !i) {
									h.setStartBefore(h.startContainer);
									continue
								}
								j = i.previousSibling, j && 3 == j.nodeType && new RegExp("^[\n\r	 " + domUtils.fillChar + "]*$").test(j.nodeValue) && h.setStartBefore(j)
							}
							if (0 != h.startOffset) break;
							h.setStartBefore(h.startContainer)
						}
						for (; !domUtils.isBody(h.endContainer);) {
							if (k = h.endContainer, 1 == k.nodeType) {
								if (k = k.childNodes[h.endOffset], !k) {
									h.setEndAfter(h.endContainer);
									continue
								}
								l = k.nextSibling, l && 3 == l.nodeType && new RegExp("^[\n\r	" + domUtils.fillChar + "]*$").test(l.nodeValue) && h.setEndAfter(l)
							}
							if (h.endOffset != h.endContainer[3 == h.endContainer.nodeType ? "nodeValue" : "childNodes"].length) break;
							h.setEndAfter(h.endContainer)
						}
					}
					for (h.deleteContents(), h.select(!0), b.__hasEnterExecCommand = !0, m = d, 2 === g ? m = f(m) : g && (m = c), b.execCommand("inserthtml", m, !0), b.__hasEnterExecCommand = !1, n = b.selection.getRange(); !domUtils.isBody(n.startContainer) && !n.startOffset && n.startContainer[3 == n.startContainer.nodeType ? "nodeValue" : "childNodes"].length;) n.setStartBefore(n.startContainer);
					o = n.createAddress(!0), e.endAddress = o.startAddress
				}
			}), b.addListener("ready", function() {
				domUtils.on(b.body, "cut", function() {
					var a = b.selection.getRange();
					!a.collapsed && b.undoManger && b.undoManger.save()
				}), domUtils.on(b.body, browser.ie || browser.opera ? "keydown" : "paste", function(c) {
					(!browser.ie && !browser.opera || (c.ctrlKey || c.metaKey) && "86" == c.keyCode) && a.call(b, function(a) {
						g(a)
					})
				})
			}), b.commands["paste"] = {
				execCommand: function() {
					browser.ie ? (a.call(b, function(a) {
						g(a)
					}), b.document.execCommand("paste")) : alert(b.getLang("pastemsg"))
				}
			}
		}, UE.plugins["pasteplain"] = function() {
			var b, a = this;
			a.setOpt({
				pasteplain: !1,
				filterTxtRules: function() {
					function a(a) {
						a.tagName = "p", a.setStyle()
					}

					function b(a) {
						a.parentNode.removeChild(a, !0)
					}
					return {
						"-": "script style object iframe embed input select",
						p: {
							$: {}
						},
						br: {
							$: {}
						},
						div: function(a) {
							for (var b, c = UE.uNode.createElement("p"); b = a.firstChild();) "text" != b.type && UE.dom.dtd.$block[b.tagName] ? c.firstChild() ? (a.parentNode.insertBefore(c, a), c = UE.uNode.createElement("p")) : a.parentNode.insertBefore(b, a) : c.appendChild(b);
							c.firstChild() && a.parentNode.insertBefore(c, a), a.parentNode.removeChild(a)
						},
						ol: b,
						ul: b,
						dl: b,
						dt: b,
						dd: b,
						li: b,
						caption: a,
						th: a,
						tr: a,
						h1: a,
						h2: a,
						h3: a,
						h4: a,
						h5: a,
						h6: a,
						td: function(a) {
							var b = !!a.innerText();
							b && a.parentNode.insertAfter(UE.uNode.createText(" &nbsp; &nbsp;"), a), a.parentNode.removeChild(a, a.innerText())
						}
					}
				}()
			}), b = a.options.pasteplain, a.commands["pasteplain"] = {
				queryCommandState: function() {
					return b ? 1 : 0
				},
				execCommand: function() {
					b = 0 | !b
				},
				notNeedUndo: 1
			}
		}, UE.plugins["list"] = function() {
			function d(a) {
				var c, b = [];
				for (c in a) b.push(c);
				return b
			}

			function h(a) {
				var b = a.className;
				return domUtils.hasClass(a, /custom_/) ? b.match(/custom_(\w+)/)[1] : domUtils.getStyle(a, "list-style-type")
			}

			function i(a, b) {
				utils.each(domUtils.getElementsByTagName(a, "ol ul"), function(d) {
					var f, g, i, l, m, n, o;
					domUtils.inDoc(d, a) && (f = d.parentNode, f.tagName == d.tagName && (g = h(d) || ("OL" == d.tagName ? "decimal" : "disc"), i = h(f) || ("OL" == f.tagName ? "decimal" : "disc"), g == i && (l = utils.indexOf(e[d.tagName], g), l = l + 1 == e[d.tagName].length ? 0 : l + 1, k(d, e[d.tagName][l]))), m = 0, n = 2, domUtils.hasClass(d, /custom_/) ? /[ou]l/i.test(f.tagName) && domUtils.hasClass(f, /custom_/) || (n = 1) : /[ou]l/i.test(f.tagName) && domUtils.hasClass(f, /custom_/) && (n = 3), o = domUtils.getStyle(d, "list-style-type"), o && (d.style.cssText = "list-style-type:" + o), d.className = utils.trim(d.className.replace(/list-paddingleft-\w+/, "")) + " list-paddingleft-" + n, utils.each(domUtils.getElementsByTagName(d, "li"), function(a) {
						var b, e, f;
						if (a.style.cssText && (a.style.cssText = ""), !a.firstChild) return domUtils.remove(a), void 0;
						if (a.parentNode === d) {
							if (m++, domUtils.hasClass(d, /custom_/))
								if (b = 1, e = h(d), "OL" == d.tagName) {
									if (e) switch (e) {
										case "cn":
										case "cn1":
										case "cn2":
											m > 10 && (0 == m % 10 || m > 10 && 20 > m) ? b = 2 : m > 20 && (b = 3);
											break;
										case "num2":
											m > 9 && (b = 2)
									}
									a.className = "list-" + c[e] + m + " " + "list-" + e + "-paddingleft-" + b
								} else a.className = "list-" + c[e] + " " + "list-" + e + "-paddingleft";
							else a.className = a.className.replace(/list-[\w\-]+/gi, "");
							f = a.getAttribute("class"), null === f || f.replace(/\s/g, "") || domUtils.removeAttributes(a, "class")
						}
					}), !b && j(d, d.tagName.toLowerCase(), h(d) || domUtils.getStyle(d, "list-style-type"), !0))
				})
			}

			function j(a, b, c, d) {
				var f, e = a.nextSibling;
				e && 1 == e.nodeType && e.tagName.toLowerCase() == b && (h(e) || domUtils.getStyle(e, "list-style-type") || ("ol" == b ? "decimal" : "disc")) == c && (domUtils.moveChild(e, a), 0 == e.childNodes.length && domUtils.remove(e)), e && domUtils.isFillChar(e) && domUtils.remove(e), f = a.previousSibling, f && 1 == f.nodeType && f.tagName.toLowerCase() == b && (h(f) || domUtils.getStyle(f, "list-style-type") || ("ol" == b ? "decimal" : "disc")) == c && domUtils.moveChild(a, f), f && domUtils.isFillChar(f) && domUtils.remove(f), !d && domUtils.isEmptyBlock(a) && domUtils.remove(a), h(a) && i(a.ownerDocument, !0)
			}

			function k(a, b) {
				c[b] && (a.className = "custom_" + b);
				try {
					domUtils.setStyle(a, "list-style-type", b)
				} catch (d) {}
			}

			function l(a) {
				var b = a.previousSibling;
				b && domUtils.isEmptyBlock(b) && domUtils.remove(b), b = a.nextSibling, b && domUtils.isEmptyBlock(b) && domUtils.remove(b)
			}

			function m(a) {
				for (; a && !domUtils.isBody(a);) {
					if ("TABLE" == a.nodeName) return null;
					if ("LI" == a.nodeName) return a;
					a = a.parentNode
				}
			}
			var e, f, g, a = this,
				b = {
					TD: 1,
					PRE: 1,
					BLOCKQUOTE: 1
				},
				c = {
					cn: "cn-1-",
					cn1: "cn-2-",
					cn2: "cn-3-",
					num: "num-1-",
					num1: "num-2-",
					num2: "num-3-",
					dash: "dash",
					dot: "dot"
				};
			a.setOpt({
				autoTransWordToList: !1,
				insertorderedlist: {
					num: "",
					num1: "",
					num2: "",
					cn: "",
					cn1: "",
					cn2: "",
					decimal: "",
					"lower-alpha": "",
					"lower-roman": "",
					"upper-alpha": "",
					"upper-roman": ""
				},
				insertunorderedlist: {
					circle: "",
					disc: "",
					square: "",
					dash: "",
					dot: ""
				},
				listDefaultPaddingLeft: "30",
				listiconpath: "http://bs.baidu.com/listicon/",
				maxListLevel: -1,
				disablePInList: !1
			}), e = {
				OL: d(a.options.insertorderedlist),
				UL: d(a.options.insertunorderedlist)
			}, f = a.options.listiconpath;
			for (g in c) a.options.insertorderedlist.hasOwnProperty(g) || a.options.insertunorderedlist.hasOwnProperty(g) || delete c[g];
			a.ready(function() {
				var d, e, b = [];
				for (d in c) {
					if ("dash" == d || "dot" == d) b.push("li.list-" + c[d] + "{background-image:url(" + f + c[d] + ".gif)}"), b.push("ul.custom_" + d + "{list-style:none;}ul.custom_" + d + " li{background-position:0 3px;background-repeat:no-repeat}");
					else {
						for (e = 0; 99 > e; e++) b.push("li.list-" + c[d] + e + "{background-image:url(" + f + "list-" + c[d] + e + ".gif)}");
						b.push("ol.custom_" + d + "{list-style:none;}ol.custom_" + d + " li{background-position:0 3px;background-repeat:no-repeat}")
					}
					switch (d) {
						case "cn":
							b.push("li.list-" + d + "-paddingleft-1{padding-left:25px}"), b.push("li.list-" + d + "-paddingleft-2{padding-left:40px}"), b.push("li.list-" + d + "-paddingleft-3{padding-left:55px}");
							break;
						case "cn1":
							b.push("li.list-" + d + "-paddingleft-1{padding-left:30px}"), b.push("li.list-" + d + "-paddingleft-2{padding-left:40px}"), b.push("li.list-" + d + "-paddingleft-3{padding-left:55px}");
							break;
						case "cn2":
							b.push("li.list-" + d + "-paddingleft-1{padding-left:40px}"), b.push("li.list-" + d + "-paddingleft-2{padding-left:55px}"), b.push("li.list-" + d + "-paddingleft-3{padding-left:68px}");
							break;
						case "num":
						case "num1":
							b.push("li.list-" + d + "-paddingleft-1{padding-left:25px}");
							break;
						case "num2":
							b.push("li.list-" + d + "-paddingleft-1{padding-left:35px}"), b.push("li.list-" + d + "-paddingleft-2{padding-left:40px}");
							break;
						case "dash":
							b.push("li.list-" + d + "-paddingleft{padding-left:35px}");
							break;
						case "dot":
							b.push("li.list-" + d + "-paddingleft{padding-left:20px}")
					}
				}
				b.push(".list-paddingleft-1{padding-left:0}"), b.push(".list-paddingleft-2{padding-left:" + a.options.listDefaultPaddingLeft + "px}"), b.push(".list-paddingleft-3{padding-left:" + 2 * a.options.listDefaultPaddingLeft + "px}"), utils.cssRule("list", "ol,ul{margin:0;pading:0;" + (browser.ie ? "" : "width:95%") + "}li{clear:both;}" + b.join("\n"), a.document)
			}), a.ready(function() {
				domUtils.on(a.body, "cut", function() {
					setTimeout(function() {
						var c, e, d, f, b = a.selection.getRange();
						b.collapsed || (c = domUtils.findParentByTagName(b.startContainer, "li", !0)) && !c.nextSibling && domUtils.isEmptyBlock(c) && (d = c.parentNode, (e = d.previousSibling) ? (domUtils.remove(d), b.setStartAtLast(e).collapse(!0), b.select(!0)) : (e = d.nextSibling) ? (domUtils.remove(d), b.setStartAtFirst(e).collapse(!0), b.select(!0)) : (f = a.document.createElement("p"), domUtils.fillNode(a.document, f), d.parentNode.insertBefore(f, d), domUtils.remove(d), b.setStart(f, 0).collapse(!0), b.select(!0)))
					})
				})
			}), a.addListener("beforepaste", function(a, b) {
				var g, j, k, d = this,
					f = d.selection.getRange(),
					i = UE.htmlparser(b.html, !0);
				(g = domUtils.findParentByTagName(f.startContainer, "li", !0)) && (j = g.parentNode, k = "OL" == j.tagName ? "ul" : "ol", utils.each(i.getNodesByTagName(k), function(b) {
					var d, f, g;
					b.tagName = j.tagName, b.setAttr(), b.parentNode === i ? a = h(j) || ("OL" == j.tagName ? "decimal" : "disc") : (d = b.parentNode.getAttr("class"), a = d && /custom_/.test(d) ? d.match(/custom_(\w+)/)[1] : b.parentNode.getStyle("list-style-type"), a || (a = "OL" == j.tagName ? "decimal" : "disc")), f = utils.indexOf(e[j.tagName], a), b.parentNode !== i && (f = f + 1 == e[j.tagName].length ? 0 : f + 1), g = e[j.tagName][f], c[g] ? b.setAttr("class", "custom_" + g) : b.setStyle("list-style-type", g)
				})), b.html = i.toHtml()
			}), a.getOpt("disablePInList") === !0 && a.addOutputRule(function(a) {
				utils.each(a.getNodesByTagName("li"), function(a) {
					var b = [],
						c = 0;
					utils.each(a.children, function(d) {
						var e, f;
						if ("p" == d.tagName) {
							for (; e = d.children.pop();) b.splice(c, 0, e), e.parentNode = a, lastNode = e;
							e = b[b.length - 1], e && "element" == e.type && "br" == e.tagName || (f = UE.uNode.createElement("br"), f.parentNode = a, b.push(f)), c = b.length
						}
					}), b.length && (a.children = b)
				})
			}), a.addInputRule(function(b) {
				function f(a, b) {
					var f, c = b.firstChild();
					if (c && "element" == c.type && "span" == c.tagName && /Wingdings|Symbol/.test(c.getStyle("font-family"))) {
						for (f in e)
							if (e[f] == c.data) return f;
						return "disc"
					}
					for (f in d)
						if (d[f].test(a)) return f
				}
				if (utils.each(b.getNodesByTagName("li"), function(a) {
						var d, c, e, f, b = UE.uNode.createElement("p");
						for (c = 0; d = a.children[c];) "text" == d.type || dtd.p[d.tagName] ? b.appendChild(d) : b.firstChild() ? (a.insertBefore(b, d), b = UE.uNode.createElement("p"), c += 2) : c++;
						(b.firstChild() && !b.parentNode || !a.firstChild()) && a.appendChild(b), b.firstChild() || b.innerHTML(browser.ie ? "&nbsp;" : "<br/>"), e = a.firstChild(), f = e.lastChild(), f && "text" == f.type && /^\s*$/.test(f.data) && e.removeChild(f)
					}), a.options.autoTransWordToList) {
					var d = {
							num1: /^\d+\)/,
							decimal: /^\d+\./,
							"lower-alpha": /^[a-z]+\)/,
							"upper-alpha": /^[A-Z]+\./,
							cn: /^[\u4E00\u4E8C\u4E09\u56DB\u516d\u4e94\u4e03\u516b\u4e5d]+[\u3001]/,
							cn2: /^\([\u4E00\u4E8C\u4E09\u56DB\u516d\u4e94\u4e03\u516b\u4e5d]+\)/
						},
						e = {
							square: "n"
						};
					utils.each(b.getNodesByTagName("p"), function(b) {
						function e(a, b, c) {
							var e, f;
							"ol" == a.tagName ? browser.ie ? (e = b.firstChild(), "element" == e.type && "span" == e.tagName && d[c].test(e.innerText()) && b.removeChild(e)) : b.innerHTML(b.innerHTML().replace(d[c], "")) : b.removeChild(b.firstChild()), f = UE.uNode.createElement("li"), f.appendChild(b), a.appendChild(f)
						}
						var h, g, i, j, k;
						if ("MsoListParagraph" == b.getAttr("class")) {
							if (b.setStyle("margin", ""), b.setStyle("margin-left", ""), b.setAttr("class", ""), g = b, i = b, "li" != b.parentNode.tagName && (h = f(b.innerText(), b))) {
								for (j = UE.uNode.createElement(a.options.insertorderedlist.hasOwnProperty(h) ? "ol" : "ul"), c[h] ? j.setAttr("class", "custom_" + h) : j.setStyle("list-style-type", h); b && "li" != b.parentNode.tagName && f(b.innerText(), b);) g = b.nextSibling(), g || b.parentNode.insertBefore(j, b), e(j, b, h), b = g;
								!j.parentNode && b && b.parentNode && b.parentNode.insertBefore(j, b)
							}
							k = i.firstChild(), k && "element" == k.type && "span" == k.tagName && /^\s*(&nbsp;)+\s*$/.test(k.innerText()) && k.parentNode.removeChild(k)
						}
					})
				}
			}), a.addListener("contentchange", function() {
				i(a.document)
			}), a.addListener("keydown", function(b, c) {
				function d() {
					c.preventDefault ? c.preventDefault() : c.returnValue = !1, a.fireEvent("contentchange"), a.undoManger && a.undoManger.save()
				}

				function e(a, b) {
					for (; a && !domUtils.isBody(a);) {
						if (b(a)) return null;
						if (1 == a.nodeType && /[ou]l/i.test(a.tagName)) return a;
						a = a.parentNode
					}
					return null
				}
				var g, h, i, j, k, m, n, o, p, q, r, s, t, u, v, f = c.keyCode || c.which;
				if (13 == f && !c.shiftKey && (g = a.selection.getRange(), h = domUtils.findParent(g.startContainer, function(a) {
						return domUtils.isBlockElm(a)
					}, !0), i = domUtils.findParentByTagName(g.startContainer, "li", !0), h && "PRE" != h.tagName && !i && (j = h.innerHTML.replace(new RegExp(domUtils.fillChar, "g"), ""), /^\s*1\s*\.[^\d]/.test(j) && (h.innerHTML = j.replace(/^\s*1\s*\./, ""), g.setStartAtLast(h).collapse(!0).select(), a.__hasEnterExecCommand = !0, a.execCommand("insertorderedlist"), a.__hasEnterExecCommand = !1)), k = a.selection.getRange(), m = e(k.startContainer, function(a) {
						return "TABLE" == a.tagName
					}), n = k.collapsed ? m : e(k.endContainer, function(a) {
						return "TABLE" == a.tagName
					}), m && n && m === n)) {
					if (!k.collapsed) {
						if (m = domUtils.findParentByTagName(k.startContainer, "li", !0), n = domUtils.findParentByTagName(k.endContainer, "li", !0), !m || !n || m !== n) return o = k.cloneRange(), p = o.collapse(!1).createBookmark(), k.deleteContents(), o.moveToBookmark(p), i = domUtils.findParentByTagName(o.startContainer, "li", !0), l(i), o.select(), d(), void 0;
						if (k.deleteContents(), i = domUtils.findParentByTagName(k.startContainer, "li", !0), i && domUtils.isEmptyBlock(i)) return v = i.previousSibling, next = i.nextSibling, s = a.document.createElement("p"), domUtils.fillNode(a.document, s), q = i.parentNode, v && next ? (k.setStart(next, 0).collapse(!0).select(!0), domUtils.remove(i)) : ((v || next) && v ? i.parentNode.parentNode.insertBefore(s, q.nextSibling) : q.parentNode.insertBefore(s, q), domUtils.remove(i), q.firstChild || domUtils.remove(q), k.setStart(s, 0).setCursor()), d(), void 0
					}
					if (i = domUtils.findParentByTagName(k.startContainer, "li", !0)) {
						if (domUtils.isEmptyBlock(i)) {
							if (p = k.createBookmark(), q = i.parentNode, i !== q.lastChild ? (domUtils.breakParent(i, q), l(i)) : (q.parentNode.insertBefore(i, q.nextSibling), domUtils.isEmptyNode(q) && domUtils.remove(q)), !dtd.$list[i.parentNode.tagName])
								if (domUtils.isBlockElm(i.firstChild)) domUtils.remove(i, !0);
								else {
									for (s = a.document.createElement("p"), i.parentNode.insertBefore(s, i); i.firstChild;) s.appendChild(i.firstChild);
									domUtils.remove(i)
								}
							k.moveToBookmark(p).select()
						} else {
							if (r = i.firstChild, !r || !domUtils.isBlockElm(r)) {
								for (s = a.document.createElement("p"), !i.firstChild && domUtils.fillNode(a.document, s); i.firstChild;) s.appendChild(i.firstChild);
								i.appendChild(s), r = s
							}
							t = a.document.createElement("span"), k.insertNode(t), domUtils.breakParent(t, i), u = t.nextSibling, r = u.firstChild, r || (s = a.document.createElement("p"), domUtils.fillNode(a.document, s), u.appendChild(s), r = s), domUtils.isEmptyNode(r) && (r.innerHTML = "", domUtils.fillNode(a.document, r)), k.setStart(r, 0).collapse(!0).shrinkBoundary().select(), domUtils.remove(t), v = u.previousSibling, v && domUtils.isEmptyBlock(v) && (v.innerHTML = "<p></p>", domUtils.fillNode(a.document, v.firstChild))
						}
						d()
					}
				}
				if (8 == f && (k = a.selection.getRange(), k.collapsed && domUtils.isStartInblock(k) && (o = k.cloneRange().trimBoundary(), i = domUtils.findParentByTagName(k.startContainer, "li", !0), i && domUtils.isStartInblock(o)))) {
					if (m = domUtils.findParentByTagName(k.startContainer, "p", !0), m && m !== i.firstChild) return q = domUtils.findParentByTagName(m, ["ol", "ul"]), domUtils.breakParent(m, q), l(m), a.fireEvent("contentchange"), k.setStart(m, 0).setCursor(!1, !0), a.fireEvent("saveScene"), domUtils.preventDefault(c), void 0;
					if (i && (v = i.previousSibling)) {
						if (46 == f && i.childNodes.length) return;
						if (dtd.$list[v.tagName] && (v = v.lastChild), a.undoManger && a.undoManger.save(), r = i.firstChild, domUtils.isBlockElm(r))
							if (domUtils.isEmptyNode(r))
								for (v.appendChild(r), k.setStart(r, 0).setCursor(!1, !0); i.firstChild;) v.appendChild(i.firstChild);
							else t = a.document.createElement("span"), k.insertNode(t), domUtils.isEmptyBlock(v) && (v.innerHTML = ""), domUtils.moveChild(i, v), k.setStartBefore(t).collapse(!0).select(!0), domUtils.remove(t);
						else if (domUtils.isEmptyNode(i)) s = a.document.createElement("p"), v.appendChild(s), k.setStart(s, 0).setCursor();
						else
							for (k.setEnd(v, v.childNodes.length).collapse().select(!0); i.firstChild;) v.appendChild(i.firstChild);
						return domUtils.remove(i), a.fireEvent("contentchange"), a.fireEvent("saveScene"), domUtils.preventDefault(c), void 0
					}
					if (i && !i.previousSibling) {
						if (q = i.parentNode, p = k.createBookmark(), domUtils.isTagNode(q.parentNode, "ol ul")) q.parentNode.insertBefore(i, q), domUtils.isEmptyNode(q) && domUtils.remove(q);
						else {
							for (; i.firstChild;) q.parentNode.insertBefore(i.firstChild, q);
							domUtils.remove(i), domUtils.isEmptyNode(q) && domUtils.remove(q)
						}
						return k.moveToBookmark(p).setCursor(!1, !0), a.fireEvent("contentchange"), a.fireEvent("saveScene"), domUtils.preventDefault(c), void 0
					}
				}
			}), a.addListener("keyup", function(b, c) {
				var f, e, d = c.keyCode || c.which;
				8 == d && (e = a.selection.getRange(), (f = domUtils.findParentByTagName(e.startContainer, ["ol", "ul"], !0)) && j(f, f.tagName.toLowerCase(), h(f) || domUtils.getComputedStyle(f, "list-style-type"), !0))
			}), a.addListener("tabkeydown", function() {
				function c(b) {
					if (-1 != a.options.maxListLevel) {
						for (var c = b.parentNode, d = 0;
							/[ou]l/i.test(c.tagName);) d++, c = c.parentNode;
						if (d >= a.options.maxListLevel) return !0
					}
				}
				var f, g, i, l, m, o, q, n, p, r, s, b = a.selection.getRange(),
					d = domUtils.findParentByTagName(b.startContainer, "li", !0);
				if (d) {
					if (!b.collapsed) {
						for (a.fireEvent("saveScene"), f = b.createBookmark(), n = 0, p = domUtils.findParents(d); q = p[n++];)
							if (domUtils.isTagNode(q, "ol ul")) {
								o = q;
								break
							}
						if (r = d, f.end)
							for (; r && !(domUtils.getPosition(r, f.end) & domUtils.POSITION_FOLLOWING);)
								if (c(r)) r = domUtils.getNextDomNode(r, !1, null, function(a) {
									return a !== o
								});
								else {
									for (g = r.parentNode, i = a.document.createElement(g.tagName), l = utils.indexOf(e[i.tagName], h(g) || domUtils.getComputedStyle(g, "list-style-type")), s = l + 1 == e[i.tagName].length ? 0 : l + 1, m = e[i.tagName][s], k(i, m), g.insertBefore(i, r); r && !(domUtils.getPosition(r, f.end) & domUtils.POSITION_FOLLOWING);) {
										if (d = r.nextSibling, i.appendChild(r), !d || domUtils.isTagNode(d, "ol ul")) {
											if (d)
												for (;
													(d = d.firstChild) && "LI" != d.tagName;);
											else d = domUtils.getNextDomNode(r, !1, null, function(a) {
												return a !== o
											});
											break
										}
										r = d
									}
									j(i, i.tagName.toLowerCase(), m), r = d
								}
						return a.fireEvent("contentchange"), b.moveToBookmark(f).select(), !0
					}
					if (c(d)) return !0;
					if (g = d.parentNode, i = a.document.createElement(g.tagName), l = utils.indexOf(e[i.tagName], h(g) || domUtils.getComputedStyle(g, "list-style-type")), l = l + 1 == e[i.tagName].length ? 0 : l + 1, m = e[i.tagName][l], k(i, m), domUtils.isStartInblock(b)) return a.fireEvent("saveScene"), f = b.createBookmark(), g.insertBefore(i, d), i.appendChild(d), j(i, i.tagName.toLowerCase(), m), a.fireEvent("contentchange"), b.moveToBookmark(f).select(!0), !0
				}
			}), a.commands["insertorderedlist"] = a.commands["insertunorderedlist"] = {
				execCommand: function(a, c) {
					var d, e, f, g, i, r, s, t, u, l, n, o, p, q, v, w, y, x, z, A, B, C, D, H, E, F, G, I, J, K;
					if (c || (c = "insertorderedlist" == a.toLowerCase() ? "decimal" : "disc"), d = this, e = this.selection.getRange(), f = function(a) {
							return 1 == a.nodeType ? "br" != a.tagName.toLowerCase() : !domUtils.isWhitespace(a)
						}, g = "insertorderedlist" == a.toLowerCase() ? "ol" : "ul", i = d.document.createDocumentFragment(), e.adjustmentBoundary().shrinkBoundary(), l = e.createBookmark(!0), n = m(d.document.getElementById(l.start)), o = 0, p = m(d.document.getElementById(l.end)), q = 0, n || p) {
						if (n && (r = n.parentNode), l.end || (p = n), p && (s = p.parentNode), r === s) {
							for (; n !== p;) {
								if (u = n, n = n.nextSibling, !domUtils.isBlockElm(u.firstChild)) {
									for (v = d.document.createElement("p"); u.firstChild;) v.appendChild(u.firstChild);
									u.appendChild(v)
								}
								i.appendChild(u)
							}
							if (u = d.document.createElement("span"), r.insertBefore(u, p), !domUtils.isBlockElm(p.firstChild)) {
								for (v = d.document.createElement("p"); p.firstChild;) v.appendChild(p.firstChild);
								p.appendChild(v)
							}
							if (i.appendChild(p), domUtils.breakParent(u, r), domUtils.isEmptyNode(u.previousSibling) && domUtils.remove(u.previousSibling), domUtils.isEmptyNode(u.nextSibling) && domUtils.remove(u.nextSibling), w = h(r) || domUtils.getComputedStyle(r, "list-style-type") || ("insertorderedlist" == a.toLowerCase() ? "decimal" : "disc"), r.tagName.toLowerCase() == g && w == c) {
								for (x = 0, z = d.document.createDocumentFragment(); y = i.firstChild;)
									if (domUtils.isTagNode(y, "ol ul")) z.appendChild(y);
									else
										for (; y.firstChild;) z.appendChild(y.firstChild), domUtils.remove(y);
								u.parentNode.insertBefore(z, u)
							} else t = d.document.createElement(g), k(t, c), t.appendChild(i), u.parentNode.insertBefore(t, u);
							return domUtils.remove(u), t && j(t, g, c), e.moveToBookmark(l).select(), void 0
						}
						if (n) {
							for (; n;) {
								if (u = n.nextSibling, domUtils.isTagNode(n, "ol ul")) i.appendChild(n);
								else {
									for (A = d.document.createDocumentFragment(), B = 0; n.firstChild;) domUtils.isBlockElm(n.firstChild) && (B = 1), A.appendChild(n.firstChild);
									B ? i.appendChild(A) : (C = d.document.createElement("p"), C.appendChild(A), i.appendChild(C)), domUtils.remove(n)
								}
								n = u
							}
							r.parentNode.insertBefore(i, r.nextSibling), domUtils.isEmptyNode(r) ? (e.setStartBefore(r), domUtils.remove(r)) : e.setStartAfter(r), o = 1
						}
						if (p && domUtils.inDoc(s, d.document)) {
							for (n = s.firstChild; n && n !== p;) {
								if (u = n.nextSibling, domUtils.isTagNode(n, "ol ul")) i.appendChild(n);
								else {
									for (A = d.document.createDocumentFragment(), B = 0; n.firstChild;) domUtils.isBlockElm(n.firstChild) && (B = 1), A.appendChild(n.firstChild);
									B ? i.appendChild(A) : (C = d.document.createElement("p"), C.appendChild(A), i.appendChild(C)), domUtils.remove(n)
								}
								n = u
							}
							D = domUtils.createElement(d.document, "div", {
								tmpDiv: 1
							}), domUtils.moveChild(p, D), i.appendChild(D), domUtils.remove(p), s.parentNode.insertBefore(i, s), e.setEndBefore(s), domUtils.isEmptyNode(s) && domUtils.remove(s), q = 1
						}
					}
					for (o || e.setStartBefore(d.document.getElementById(l.start)), l.end && !q && e.setEndAfter(d.document.getElementById(l.end)), e.enlarge(!0, function(a) {
							return b[a.tagName]
						}), i = d.document.createDocumentFragment(), E = e.createBookmark(), F = domUtils.getNextDomNode(E.start, !1, f), G = e.cloneRange(), I = domUtils.isBlockElm; F && F !== E.end && domUtils.getPosition(F, E.end) & domUtils.POSITION_PRECEDING;)
						if (3 == F.nodeType || dtd.li[F.tagName]) {
							if (1 == F.nodeType && dtd.$list[F.tagName]) {
								for (; F.firstChild;) i.appendChild(F.firstChild);
								H = domUtils.getNextDomNode(F, !1, f), domUtils.remove(F), F = H;
								continue
							}
							for (H = F, G.setStartBefore(F); F && F !== E.end && (!I(F) || domUtils.isBookmarkNode(F));) H = F, F = domUtils.getNextDomNode(F, !1, null, function(a) {
								return !b[a.tagName]
							});
							if (F && I(F) && (u = domUtils.getNextDomNode(H, !1, f), u && domUtils.isBookmarkNode(u) && (F = domUtils.getNextDomNode(u, !1, f), H = u)), G.setEndAfter(H), F = domUtils.getNextDomNode(H, !1, f), J = e.document.createElement("li"), J.appendChild(G.extractContents()), domUtils.isEmptyNode(J)) {
								for (H = e.document.createElement("p"); J.firstChild;) H.appendChild(J.firstChild);
								J.appendChild(H)
							}
							i.appendChild(J)
						} else F = domUtils.getNextDomNode(F, !0, f);
					for (e.moveToBookmark(E).collapse(!0), t = d.document.createElement(g), k(t, c), t.appendChild(i), e.insertNode(t), j(t, g, c), x = 0, K = domUtils.getElementsByTagName(t, "div"); y = K[x++];) y.getAttribute("tmpDiv") && domUtils.remove(y, !0);
					e.moveToBookmark(l).select()
				},
				queryCommandState: function(a) {
					var e, d, b = "insertorderedlist" == a.toLowerCase() ? "ol" : "ul",
						c = this.selection.getStartElementPath();
					for (d = 0; e = c[d++];) {
						if ("TABLE" == e.nodeName) return 0;
						if (b == e.nodeName.toLowerCase()) return 1
					}
					return 0
				},
				queryCommandValue: function(a) {
					var d, f, e, b = "insertorderedlist" == a.toLowerCase() ? "ol" : "ul",
						c = this.selection.getStartElementPath();
					for (e = 0; f = c[e++];) {
						if ("TABLE" == f.nodeName) {
							d = null;
							break
						}
						if (b == f.nodeName.toLowerCase()) {
							d = f;
							break
						}
					}
					return d ? h(d) || domUtils.getComputedStyle(d, "list-style-type") : null
				}
			}
		},
		function() {
			var a = {
				textarea: function(a, b) {
					var c = b.ownerDocument.createElement("textarea");
					return c.style.cssText = "position:absolute;resize:none;width:100%;height:100%;border:0;padding:0;margin:0;overflow-y:auto;", browser.ie && browser.version < 8 && (c.style.width = b.offsetWidth + "px", c.style.height = b.offsetHeight + "px", b.onresize = function() {
						c.style.width = b.offsetWidth + "px", c.style.height = b.offsetHeight + "px"
					}), b.appendChild(c), {
						setContent: function(a) {
							c.value = a
						},
						getContent: function() {
							return c.value
						},
						select: function() {
							var a;
							browser.ie ? (a = c.createTextRange(), a.collapse(!0), a.select()) : (c.setSelectionRange(0, 0), c.focus())
						},
						dispose: function() {
							b.removeChild(c), b.onresize = null, c = null, b = null
						}
					}
				},
				codemirror: function(a, b) {
					var c = window.CodeMirror(b, {
							mode: "text/html",
							tabMode: "indent",
							lineNumbers: !0,
							lineWrapping: !0
						}),
						d = c.getWrapperElement();
					return d.style.cssText = 'position:absolute;left:0;top:0;width:100%;height:100%;font-family:consolas,"Courier new",monospace;font-size:13px;', c.getScrollerElement().style.cssText = "position:absolute;left:0;top:0;width:100%;height:100%;", c.refresh(), {
						getCodeMirror: function() {
							return c
						},
						setContent: function(a) {
							c.setValue(a)
						},
						getContent: function() {
							return c.getValue()
							// return filterXSS(c.getValue())
						},
						select: function() {
							c.focus()
						},
						dispose: function() {
							b.removeChild(d), d = null, c = null
						}
					}
				}
			};
			UE.plugins["source"] = function() {
				function g(d) {
					return a["codemirror" == c.sourceEditor && window.CodeMirror ? "codemirror" : "textarea"](b, d)
				}
				var e, f, h, i, j, k, b = this,
					c = this.options,
					d = !1;
				c.sourceEditor = browser.ie ? "textarea" : c.sourceEditor || "codemirror", b.setOpt({
					sourceEditorFirst: !1
				}), b.commands["source"] = {
					execCommand: function() {
						var a, c, k, l, m;
						if (d = !d) j = b.selection.getRange().createAddress(!1, !0), b.undoManger && b.undoManger.save(!0), browser.gecko && (b.body.contentEditable = !1), h = b.iframe.style.cssText, b.iframe.style.cssText += "position:absolute;left:-32768px;top:-32768px;", b.fireEvent("beforegetcontent"), a = UE.htmlparser(b.body.innerHTML), b.filterOutputRule(a), a.traversal(function(a) {
							if ("element" == a.type) switch (a.tagName) {
								case "td":
								case "th":
								case "caption":
									a.children && 1 == a.children.length && "br" == a.firstChild().tagName && a.removeChild(a.firstChild());
									break;
								case "pre":
									a.innerText(a.innerText().replace(/&nbsp;/g, " "))
							}
						}), b.fireEvent("aftergetcontent"), c = a.toHtml(!0), e = g(b.iframe.parentNode), e.setContent(c), f = b.setContent, b.setContent = function(a) {
							var c = UE.htmlparser(a);
							b.filterInputRule(c), a = c.toHtml(), e.setContent(a)
						}, setTimeout(function() {
							e.select(), b.addListener("fullscreenchanged", function() {
								try {
									e.getCodeMirror().refresh()
								} catch (a) {}
							})
						}), i = b.getContent, b.getContent = function() {
							return e.getContent() || "<p>" + (browser.ie ? "" : "<br/>") + "</p>"
						};
						else if (b.iframe.style.cssText = h, k = e.getContent() || "<p>" + (browser.ie ? "" : "<br/>") + "</p>", k = k.replace(new RegExp("[\\r\\t\\n ]*</?(\\w+)\\s*(?:[^>]*)>", "g"), function(a, b) {
								return b && !dtd.$inlineWithA[b.toLowerCase()] ? a.replace(/(^[\n\r\t ]*)|([\n\r\t ]*$)/g, "") : a.replace(/(^[\n\r\t]*)|([\n\r\t]*$)/g, "")
							}), b.setContent = f, b.setContent(k), e.dispose(), e = null, b.getContent = i, l = b.body.firstChild, l || (b.body.innerHTML = "<p>" + (browser.ie ? "" : "<br/>") + "</p>", l = b.body.firstChild), b.undoManger && b.undoManger.save(!0), browser.gecko) m = document.createElement("input"), m.style.cssText = "position:absolute;left:0;top:-32768px", document.body.appendChild(m), b.body.contentEditable = !1, setTimeout(function() {
							domUtils.setViewportOffset(m, {
								left: -32768,
								top: 0
							}), m.focus(), setTimeout(function() {
								b.body.contentEditable = !0, b.selection.getRange().moveToAddress(j).select(!0), domUtils.remove(m)
							})
						});
						else try {
							b.selection.getRange().moveToAddress(j).select(!0)
						} catch (n) {}
						this.fireEvent("sourcemodechanged", d)
					},
					queryCommandState: function() {
						return 0 | d
					},
					notNeedUndo: 1
				}, k = b.queryCommandState, b.queryCommandState = function(a) {
					return a = a.toLowerCase(), d ? a in {
						source: 1,
						fullscreen: 1
					} ? 1 : -1 : k.apply(this, arguments)
				}, "codemirror" == c.sourceEditor && b.addListener("ready", function() {
					utils.loadFile(document, {
						src: c.codeMirrorJsUrl || c.UEDITOR_HOME_URL + "third-party/codemirror/codemirror.js",
						tag: "script",
						type: "text/javascript",
						defer: "defer"
					}, function() {
						c.sourceEditorFirst && setTimeout(function() {
							b.execCommand("source")
						}, 0)
					}), utils.loadFile(document, {
						tag: "link",
						rel: "stylesheet",
						type: "text/css",
						href: c.codeMirrorCssUrl || c.UEDITOR_HOME_URL + "third-party/codemirror/codemirror.css"
					})
				})
			}
		}(), UE.plugins["enterkey"] = function() {
			var a, b = this,
				c = b.options.enterTag;
			b.addListener("keyup", function(c, d) {
				var h, f, g, i, k, j, l, e = d.keyCode || d.which;
				if (13 == e)
					if (f = b.selection.getRange(), g = f.startContainer, browser.ie) b.fireEvent("saveScene", !0, !0);
					else {
						if (/h\d/i.test(a)) {
							if (browser.gecko) i = domUtils.findParentByTagName(g, ["h1", "h2", "h3", "h4", "h5", "h6", "blockquote", "caption", "table"], !0), i || (b.document.execCommand("formatBlock", !1, "<p>"), h = 1);
							else if (1 == g.nodeType) {
								if (j = b.document.createTextNode(""), f.insertNode(j), k = domUtils.findParentByTagName(j, "div", !0)) {
									for (l = b.document.createElement("p"); k.firstChild;) l.appendChild(k.firstChild);
									k.parentNode.insertBefore(l, k), domUtils.remove(k), f.setStartBefore(j).setCursor(), h = 1
								}
								domUtils.remove(j)
							}
							b.undoManger && h && b.undoManger.save()
						}
						browser.opera && f.select()
					}
			}), b.addListener("keydown", function(d, e) {
				var g, h, i, j, k, l, m, f = e.keyCode || e.which;
				if (13 == f) {
					if (b.fireEvent("beforeenterkeydown")) return domUtils.preventDefault(e), void 0;
					if (b.fireEvent("saveScene", !0, !0), a = "", g = b.selection.getRange(), !g.collapsed && (h = g.startContainer, i = g.endContainer, j = domUtils.findParentByTagName(h, "td", !0), k = domUtils.findParentByTagName(i, "td", !0), j && k && j !== k || !j && k || j && !k)) return e.preventDefault ? e.preventDefault() : e.returnValue = !1, void 0;
					if ("p" == c) browser.ie || (h = domUtils.findParentByTagName(g.startContainer, ["ol", "ul", "p", "h1", "h2", "h3", "h4", "h5", "h6", "blockquote", "caption"], !0), h || browser.opera ? (a = h.tagName, "p" == h.tagName.toLowerCase() && browser.gecko && domUtils.removeDirtyAttr(h)) : (b.document.execCommand("formatBlock", !1, "<p>"), browser.gecko && (g = b.selection.getRange(), h = domUtils.findParentByTagName(g.startContainer, "p", !0), h && domUtils.removeDirtyAttr(h))));
					else if (e.preventDefault ? e.preventDefault() : e.returnValue = !1, g.collapsed) l = g.document.createElement("br"), g.insertNode(l), m = l.parentNode, m.lastChild === l ? (l.parentNode.insertBefore(l.cloneNode(!0), l), g.setStartBefore(l)) : g.setStartAfter(l), g.setCursor();
					else if (g.deleteContents(), h = g.startContainer, 1 == h.nodeType && (h = h.childNodes[g.startOffset])) {
						for (; 1 == h.nodeType;) {
							if (dtd.$empty[h.tagName]) return g.setStartBefore(h).setCursor(), b.undoManger && b.undoManger.save(), !1;
							if (!h.firstChild) return l = g.document.createElement("br"), h.appendChild(l), g.setStart(h, 0).setCursor(), b.undoManger && b.undoManger.save(), !1;
							h = h.firstChild
						}
						h === g.startContainer.childNodes[g.startOffset] ? (l = g.document.createElement("br"), g.insertNode(l).setCursor()) : g.setStart(h, 0).setCursor()
					} else l = g.document.createElement("br"), g.insertNode(l).setStartAfter(l).setCursor()
				}
			})
		}, UE.plugins["keystrokes"] = function() {
			var a = this,
				b = !0;
			a.addListener("keydown", function(c, d) {
				var g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, e = d.keyCode || d.which,
					f = a.selection.getRange();
				if (!f.collapsed && !(d.ctrlKey || d.shiftKey || d.altKey || d.metaKey) && (e >= 65 && 90 >= e || e >= 48 && 57 >= e || e >= 96 && 111 >= e || {
						13: 1,
						8: 1,
						46: 1
					}[e]) && (g = f.startContainer, domUtils.isFillChar(g) && f.setStartBefore(g), g = f.endContainer, domUtils.isFillChar(g) && f.setEndAfter(g), f.txtToElmBoundary(), f.endContainer && 1 == f.endContainer.nodeType && (g = f.endContainer.childNodes[f.endOffset], g && domUtils.isBr(g) && f.setEndAfter(g)), 0 == f.startOffset && (g = f.startContainer, domUtils.isBoundaryNode(g, "firstChild") && (g = f.endContainer, f.endOffset == (3 == g.nodeType ? g.nodeValue.length : g.childNodes.length) && domUtils.isBoundaryNode(g, "lastChild"))))) return a.fireEvent("saveScene"), a.body.innerHTML = "<p>" + (browser.ie ? "" : "<br/>") + "</p>", f.setStart(a.body.firstChild, 0).setCursor(!1, !0), a._selectionChange(), void 0;
				if (e == keymap.Backspace) {
					if (f = a.selection.getRange(), b = f.collapsed, a.fireEvent("delkeydown", d)) return;
					if (f.collapsed && f.inFillChar() && (h = f.startContainer, domUtils.isFillChar(h) ? (f.setStartBefore(h).shrinkBoundary(!0).collapse(!0), domUtils.remove(h)) : (h.nodeValue = h.nodeValue.replace(new RegExp("^" + domUtils.fillChar), ""), f.startOffset--, f.collapse(!0).select(!0))), h = f.getClosedNode()) return a.fireEvent("saveScene"), f.setStartBefore(h), domUtils.remove(h), f.setCursor(), a.fireEvent("saveScene"), domUtils.preventDefault(d), void 0;
					if (!browser.ie && (h = domUtils.findParentByTagName(f.startContainer, "table", !0), i = domUtils.findParentByTagName(f.endContainer, "table", !0), h && !i || !h && i || h !== i)) return d.preventDefault(), void 0
				}
				if (e == keymap.Tab) {
					if (j = {
							ol: 1,
							ul: 1,
							table: 1
						}, a.fireEvent("tabkeydown", d)) return domUtils.preventDefault(d), void 0;
					for (k = a.selection.getRange(), a.fireEvent("saveScene"), l = 0, m = "", n = a.options.tabSize || 4, o = a.options.tabNode || "&nbsp;"; n > l; l++) m += o;
					if (p = a.document.createElement("span"), p.innerHTML = m + domUtils.fillChar, k.collapsed) k.insertNode(p.cloneNode(!0).firstChild).setCursor(!0);
					else if (q = function(a) {
							return domUtils.isBlockElm(a) && !j[a.tagName.toLowerCase()]
						}, h = domUtils.findParent(k.startContainer, q, !0), i = domUtils.findParent(k.endContainer, q, !0), h && i && h === i) k.deleteContents(), k.insertNode(p.cloneNode(!0).firstChild).setCursor(!0);
					else {
						for (r = k.createBookmark(), k.enlarge(!0), s = k.createBookmark(), t = domUtils.getNextDomNode(s.start, !1, q); t && !(domUtils.getPosition(t, s.end) & domUtils.POSITION_FOLLOWING);) t.insertBefore(p.cloneNode(!0).firstChild, t.firstChild), t = domUtils.getNextDomNode(t, !1, q);
						k.moveToBookmark(s).moveToBookmark(r).select()
					}
					domUtils.preventDefault(d)
				}
				if (browser.gecko && 46 == e && (k = a.selection.getRange(), k.collapsed && (h = k.startContainer, domUtils.isEmptyBlock(h)))) {
					for (u = h.parentNode; 1 == domUtils.getChildCount(u) && !domUtils.isBody(u);) h = u, u = u.parentNode;
					return h === u.lastChild && d.preventDefault(), void 0
				}
			}), a.addListener("keyup", function(a, c) {
				var e, g, h, i, j, k, d = c.keyCode || c.which,
					f = this;
				if (d == keymap.Backspace) {
					if (f.fireEvent("delkeyup")) return;
					if (e = f.selection.getRange(), e.collapsed) {
						if (h = ["h1", "h2", "h3", "h4", "h5", "h6"], (g = domUtils.findParentByTagName(e.startContainer, h, !0)) && domUtils.isEmptyBlock(g)) {
							if (i = g.previousSibling, i && "TABLE" != i.nodeName) return domUtils.remove(g), e.setStartAtLast(i).setCursor(!1, !0), void 0;
							if (j = g.nextSibling, j && "TABLE" != j.nodeName) return domUtils.remove(g), e.setStartAtFirst(j).setCursor(!1, !0), void 0
						}
						domUtils.isBody(e.startContainer) && (g = domUtils.createElement(f.document, "p", {
							innerHTML: browser.ie ? domUtils.fillChar : "<br/>"
						}), e.insertNode(g).setStart(g, 0).setCursor(!1, !0))
					}!b && (3 == e.startContainer.nodeType || 1 == e.startContainer.nodeType && domUtils.isEmptyBlock(e.startContainer)) && (browser.ie ? (k = e.document.createElement("span"), e.insertNode(k).setStartBefore(k).collapse(!0), e.select(), domUtils.remove(k)) : e.select())
				}
			})
		}, UE.plugins["fiximgclick"] = function() {
			function b() {
				this.editor = null, this.resizer = null, this.cover = null, this.doc = document, this.prePos = {
					x: 0,
					y: 0
				}, this.startPos = {
					x: 0,
					y: 0
				}
			}
			var a = !1;
			return function() {
					var c = [
						[0, 0, -1, -1],
						[0, 0, 0, -1],
						[0, 0, 1, -1],
						[0, 0, -1, 0],
						[0, 0, 1, 0],
						[0, 0, -1, 1],
						[0, 0, 0, 1],
						[0, 0, 1, 1]
					];
					b.prototype = {
						init: function(a) {
							var c, d, e, b = this;
							for (b.editor = a, b.startPos = this.prePos = {
									x: 0,
									y: 0
								}, b.dragId = -1, c = [], d = b.cover = document.createElement("div"), e = b.resizer = document.createElement("div"), d.id = b.editor.ui.id + "_imagescale_cover", d.style.cssText = "position:absolute;display:none;z-index:" + b.editor.options.zIndex + ";filter:alpha(opacity=0); opacity:0;background:#CCC;", domUtils.on(d, "mousedown click", function() {
									b.hide()
								}), i = 0; 8 > i; i++) c.push('<span class="edui-editor-imagescale-hand' + i + '"></span>');
							e.id = b.editor.ui.id + "_imagescale", e.className = "edui-editor-imagescale", e.innerHTML = c.join(""), e.style.cssText += ";display:none;border:1px solid #3b77ff;z-index:" + b.editor.options.zIndex + ";", b.editor.ui.getDom().appendChild(d), b.editor.ui.getDom().appendChild(e), b.initStyle(), b.initEvents()
						},
						initStyle: function() {
							utils.cssRule("imagescale", ".edui-editor-imagescale{display:none;position:absolute;border:1px solid #38B2CE;cursor:hand;-webkit-box-sizing: content-box;-moz-box-sizing: content-box;box-sizing: content-box;}.edui-editor-imagescale span{position:absolute;width:6px;height:6px;overflow:hidden;font-size:0px;display:block;background-color:#3C9DD0;}.edui-editor-imagescale .edui-editor-imagescale-hand0{cursor:nw-resize;top:0;margin-top:-4px;left:0;margin-left:-4px;}.edui-editor-imagescale .edui-editor-imagescale-hand1{cursor:n-resize;top:0;margin-top:-4px;left:50%;margin-left:-4px;}.edui-editor-imagescale .edui-editor-imagescale-hand2{cursor:ne-resize;top:0;margin-top:-4px;left:100%;margin-left:-3px;}.edui-editor-imagescale .edui-editor-imagescale-hand3{cursor:w-resize;top:50%;margin-top:-4px;left:0;margin-left:-4px;}.edui-editor-imagescale .edui-editor-imagescale-hand4{cursor:e-resize;top:50%;margin-top:-4px;left:100%;margin-left:-3px;}.edui-editor-imagescale .edui-editor-imagescale-hand5{cursor:sw-resize;top:100%;margin-top:-3px;left:0;margin-left:-4px;}.edui-editor-imagescale .edui-editor-imagescale-hand6{cursor:s-resize;top:100%;margin-top:-3px;left:50%;margin-left:-4px;}.edui-editor-imagescale .edui-editor-imagescale-hand7{cursor:se-resize;top:100%;margin-top:-3px;left:100%;margin-left:-3px;}")
						},
						initEvents: function() {
							var a = this;
							a.startPos.x = a.startPos.y = 0, a.isDraging = !1
						},
						_eventHandler: function(b) {
							var d, c = this;
							switch (b.type) {
								case "mousedown":
									d = b.target || b.srcElement, -1 != d.className.indexOf("edui-editor-imagescale-hand") && -1 == c.dragId && (c.dragId = d.className.slice(-1), c.startPos.x = c.prePos.x = b.clientX, c.startPos.y = c.prePos.y = b.clientY, domUtils.on(c.doc, "mousemove", c.proxy(c._eventHandler, c)));
									break;
								case "mousemove":
									-1 != c.dragId && (c.updateContainerStyle(c.dragId, {
										x: b.clientX - c.prePos.x,
										y: b.clientY - c.prePos.y
									}), c.prePos.x = b.clientX, c.prePos.y = b.clientY, a = !0, c.updateTargetElement());
									break;
								case "mouseup":
									-1 != c.dragId && (c.updateContainerStyle(c.dragId, {
										x: b.clientX - c.prePos.x,
										y: b.clientY - c.prePos.y
									}), c.updateTargetElement(), c.target.parentNode && c.attachTo(c.target), c.dragId = -1), domUtils.un(c.doc, "mousemove", c.proxy(c._eventHandler, c)), a && (a = !1, c.editor.fireEvent("contentchange"))
							}
						},
						updateTargetElement: function() {
							var a = this;
							domUtils.setStyles(a.target, {
								width: a.resizer.style.width,
								height: a.resizer.style.height
							}), a.target.width = parseInt(a.resizer.style.width), a.target.height = parseInt(a.resizer.style.height), a.attachTo(a.target)
						},
						updateContainerStyle: function(a, b) {
							var f, d = this,
								e = d.resizer;
							0 != c[a][0] && (f = parseInt(e.style.left) + b.x, e.style.left = d._validScaledProp("left", f) + "px"), 0 != c[a][1] && (f = parseInt(e.style.top) + b.y, e.style.top = d._validScaledProp("top", f) + "px"), 0 != c[a][2] && (f = e.clientWidth + c[a][2] * b.x, e.style.width = d._validScaledProp("width", f) + "px"), 0 != c[a][3] && (f = e.clientHeight + c[a][3] * b.y, e.style.height = d._validScaledProp("height", f) + "px")
						},
						_validScaledProp: function(a, b) {
							var c = this.resizer,
								d = document;
							switch (b = isNaN(b) ? 0 : b, a) {
								case "left":
									return 0 > b ? 0 : b + c.clientWidth > d.clientWidth ? d.clientWidth - c.clientWidth : b;
								case "top":
									return 0 > b ? 0 : b + c.clientHeight > d.clientHeight ? d.clientHeight - c.clientHeight : b;
								case "width":
									return 0 >= b ? 1 : b + c.offsetLeft > d.clientWidth ? d.clientWidth - c.offsetLeft : b;
								case "height":
									return 0 >= b ? 1 : b + c.offsetTop > d.clientHeight ? d.clientHeight - c.offsetTop : b
							}
						},
						hideCover: function() {
							this.cover.style.display = "none"
						},
						showCover: function() {
							var a = this,
								b = domUtils.getXY(a.editor.ui.getDom()),
								c = domUtils.getXY(a.editor.iframe);
							domUtils.setStyles(a.cover, {
								width: a.editor.iframe.offsetWidth + "px",
								height: a.editor.iframe.offsetHeight + "px",
								top: c.y - b.y + "px",
								left: c.x - b.x + "px",
								position: "absolute",
								display: ""
							})
						},
						show: function(a) {
							var b = this;
							b.resizer.style.display = "block", a && b.attachTo(a), domUtils.on(this.resizer, "mousedown", b.proxy(b._eventHandler, b)), domUtils.on(b.doc, "mouseup", b.proxy(b._eventHandler, b)), b.showCover(), b.editor.fireEvent("afterscaleshow", b), b.editor.fireEvent("saveScene")
						},
						hide: function() {
							var a = this;
							a.hideCover(), a.resizer.style.display = "none", domUtils.un(a.resizer, "mousedown", a.proxy(a._eventHandler, a)), domUtils.un(a.doc, "mouseup", a.proxy(a._eventHandler, a)), a.editor.fireEvent("afterscalehide", a)
						},
						proxy: function(a, b) {
							return function() {
								return a.apply(b || this, arguments)
							}
						},
						attachTo: function(a) {
							var b = this,
								c = b.target = a,
								d = this.resizer,
								e = domUtils.getXY(c),
								f = domUtils.getXY(b.editor.iframe),
								g = domUtils.getXY(d.parentNode);
							domUtils.setStyles(d, {
								width: c.width + "px",
								height: c.height + "px",
								left: f.x + e.x - b.editor.document.body.scrollLeft - g.x - parseInt(d.style.borderLeftWidth) + "px",
								top: f.y + e.y - b.editor.document.body.scrollTop - g.y - parseInt(d.style.borderTopWidth) + "px"
							})
						}
					}
				}(),
				function() {
					var c, a = this;
					a.setOpt("imageScaleEnabled", !0), !browser.ie && a.options.imageScaleEnabled && a.addListener("click", function() {
						var j, h, i, f = a.selection.getRange(),
							g = f.getClosedNode();
						if (g && "IMG" == g.tagName && "false" != a.body.contentEditable) {
							if (-1 != g.className.indexOf("edui-faked-music") || g.getAttribute("anchorname") || domUtils.hasClass(g, "loadingclass") || domUtils.hasClass(g, "loaderrorclass")) return;
							c || (c = new b, c.init(a), a.ui.getDom().appendChild(c.resizer), h = function() {
								c.hide(), c.target && a.selection.getRange().selectNode(c.target).select()
							}, i = function(a) {
								var b = a.target || a.srcElement;
								!b || void 0 !== b.className && -1 != b.className.indexOf("edui-editor-imagescale") || h(a)
							}, a.addListener("afterscaleshow", function() {
								a.addListener("beforekeydown", h), a.addListener("beforemousedown", i), domUtils.on(document, "keydown", h), domUtils.on(document, "mousedown", i), a.selection.getNative().removeAllRanges()
							}), a.addListener("afterscalehide", function() {
								a.removeListener("beforekeydown", h), a.removeListener("beforemousedown", i), domUtils.un(document, "keydown", h), domUtils.un(document, "mousedown", i);
								var d = c.target;
								d.parentNode && a.selection.getRange().selectNode(d).select()
							}), domUtils.on(c.resizer, "mousedown", function(b) {
								a.selection.getNative().removeAllRanges();
								var d = b.target || b.srcElement;
								d && -1 == d.className.indexOf("edui-editor-imagescale-hand") && (j = setTimeout(function() {
									c.hide(), c.target && a.selection.getRange().selectNode(d).select()
								}, 200))
							}), domUtils.on(c.resizer, "mouseup", function(a) {
								var b = a.target || a.srcElement;
								b && -1 == b.className.indexOf("edui-editor-imagescale-hand") && clearTimeout(j)
							})), c.show(g)
						} else c && "none" != c.resizer.style.display && c.hide()
					}), browser.webkit && a.addListener("click", function(b, c) {
						if ("IMG" == c.target.tagName && "false" != a.body.contentEditable) {
							var d = new dom.Range(a.document);
							d.selectNode(c.target).select()
						}
					})
				}
		}(), UE.plugin.register("autolink", function() {
			var a = 0;
			return browser.ie ? {} : {
				bindEvents: {
					reset: function() {
						a = 0
					},
					keydown: function(a, b) {
						var g, h, e, f, i, m, k, l, c = this,
							d = b.keyCode || b.which;
						if (32 == d || 13 == d) {
							for (e = c.selection.getNative(), f = e.getRangeAt(0).cloneRange(), i = f.startContainer; 1 == i.nodeType && f.startOffset > 0 && (i = f.startContainer.childNodes[f.startOffset - 1]);) f.setStart(i, 1 == i.nodeType ? i.childNodes.length : i.nodeValue.length), f.collapse(!0), i = f.startContainer;
							do {
								if (0 == f.startOffset) {
									for (i = f.startContainer.previousSibling; i && 1 == i.nodeType;) i = i.lastChild;
									if (!i || domUtils.isFillChar(i)) break;
									g = i.nodeValue.length
								} else i = f.startContainer, g = f.startOffset;
								f.setStart(i, g - 1), h = f.toString().charCodeAt(0)
							} while (160 != h && 32 != h);
							if (f.toString().replace(new RegExp(domUtils.fillChar, "g"), "").match(/(?:https?:\/\/|ssh:\/\/|ftp:\/\/|file:\/|www\.)/i)) {
								for (; f.toString().length && !/^(?:https?:\/\/|ssh:\/\/|ftp:\/\/|file:\/|www\.)/i.test(f.toString());) try {
									f.setStart(f.startContainer, f.startOffset + 1)
								} catch (j) {
									for (i = f.startContainer; !(next = i.nextSibling);) {
										if (domUtils.isBody(i)) return;
										i = i.parentNode
									}
									f.setStart(next, 0)
								}
								if (domUtils.findParentByTagName(f.startContainer, "a", !0)) return;
								k = c.document.createElement("a"), l = c.document.createTextNode(" "), c.undoManger && c.undoManger.save(), k.appendChild(f.extractContents()), k.href = k.innerHTML = k.innerHTML.replace(/<[^>]+>/g, ""), m = k.getAttribute("href").replace(new RegExp(domUtils.fillChar, "g"), ""), m = /^(?:https?:\/\/)/gi.test(m) ? m : "http://" + m, k.setAttribute("_src", utils.html(m)), k.href = utils.html(m), f.insertNode(k), k.parentNode.insertBefore(l, k.nextSibling), f.setStart(l, 0), f.collapse(!0), e.removeAllRanges(), e.addRange(f), c.undoManger && c.undoManger.save()
							}
						}
					}
				}
			}
		}, function() {
			function b(a) {
				if (3 == a.nodeType) return null;
				if ("A" == a.nodeName) return a;
				for (var b = a.lastChild; b;) {
					if ("A" == b.nodeName) return b;
					if (3 == b.nodeType) {
						if (domUtils.isWhitespace(b)) {
							b = b.previousSibling;
							continue
						}
						return null
					}
					b = b.lastChild
				}
			}
			var a = {
				37: 1,
				38: 1,
				39: 1,
				40: 1,
				13: 1,
				32: 1
			};
			browser.ie && this.addListener("keyup", function(c, d) {
				var g, h, i, j, e = this,
					f = d.keyCode;
				if (a[f])
					if (g = e.selection.getRange(), h = g.startContainer, 13 == f) {
						for (; h && !domUtils.isBody(h) && !domUtils.isBlockElm(h);) h = h.parentNode;
						h && !domUtils.isBody(h) && "P" == h.nodeName && (i = h.previousSibling, i && 1 == i.nodeType && (i = b(i), i && !i.getAttribute("_href") && domUtils.remove(i, !0)))
					} else 32 == f ? 3 == h.nodeType && /^\s$/.test(h.nodeValue) && (h = h.previousSibling, h && "A" == h.nodeName && !h.getAttribute("_href") && domUtils.remove(h, !0)) : (h = domUtils.findParentByTagName(h, "a", !0), h && !h.getAttribute("_href") && (j = g.createBookmark(), domUtils.remove(h, !0), g.moveToBookmark(j).select(!0)))
			})
		}), UE.plugins["autoheight"] = function() {
			function g() {
				var a = this;
				clearTimeout(f), h || (!a.queryCommandState || a.queryCommandState && 1 != a.queryCommandState("source")) && (f = setTimeout(function() {
					for (var b = a.body.lastChild; b && 1 != b.nodeType;) b = b.previousSibling;
					b && 1 == b.nodeType && (b.style.clear = "both", e = Math.max(domUtils.getXY(b).y + b.offsetHeight + 25, Math.max(d.minFrameHeight, d.initialFrameHeight)), e != c && (e !== parseInt(a.iframe.parentNode.style.height) && (a.iframe.parentNode.style.height = e + "px"), a.body.style.height = e + "px", c = e), domUtils.removeStyle(b, "clear"))
				}, 50))
			}
			var b, e, f, c, d, h, a = this;
			a.autoHeightEnabled = a.options.autoHeightEnabled !== !1, a.autoHeightEnabled && (c = 0, d = a.options, a.addListener("fullscreenchanged", function(a, b) {
				h = b
			}), a.addListener("destroy", function() {
				a.removeListener("contentchange afterinserthtml keyup mouseup", g)
			}), a.enableAutoHeight = function() {
				var c, a = this;
				a.autoHeightEnabled && (c = a.document, a.autoHeightEnabled = !0, b = c.body.style.overflowY, c.body.style.overflowY = "hidden", a.addListener("contentchange afterinserthtml keyup mouseup", g), setTimeout(function() {
					g.call(a)
				}, browser.gecko ? 100 : 0), a.fireEvent("autoheightchanged", a.autoHeightEnabled))
			}, a.disableAutoHeight = function() {
				a.body.style.overflowY = b || "", a.removeListener("contentchange", g), a.removeListener("keyup", g), a.removeListener("mouseup", g), a.autoHeightEnabled = !1, a.fireEvent("autoheightchanged", a.autoHeightEnabled)
			}, a.on("setHeight", function() {
				a.disableAutoHeight()
			}), a.addListener("ready", function() {
				var b, c;
				a.enableAutoHeight(), domUtils.on(browser.ie ? a.body : a.document, browser.webkit ? "dragover" : "drop", function() {
					clearTimeout(b), b = setTimeout(function() {
						g.call(a)
					}, 100)
				}), window.onscroll = function() {
					null === c ? c = this.scrollY : 0 == this.scrollY && 0 != c && (a.window.scrollTo(0, 0), c = null)
				}
			}))
		}, UE.plugins["autofloat"] = function() {
			function h() {
				return UE.ui ? 1 : (alert(b.autofloatMsg), 0)
			}

			function i() {
				var a = document.body.style;
				a.backgroundImage = 'url("about:blank")', a.backgroundAttachment = "fixed"
			}

			function p() {
				var b = domUtils.getXY(l),
					c = domUtils.getComputedStyle(l, "position"),
					e = domUtils.getComputedStyle(l, "left");
				l.style.width = l.offsetWidth + "px", l.style.zIndex = 1 * a.options.zIndex + 1, l.parentNode.insertBefore(k, l), f || g && browser.ie ? ("absolute" != l.style.position && (l.style.position = "absolute"), l.style.top = (document.body.scrollTop || document.documentElement.scrollTop) - m + d + "px") : (browser.ie7Compat && o && (o = !1, l.style.left = domUtils.getXY(l).x - document.documentElement.getBoundingClientRect().left + 2 + "px"), "fixed" != l.style.position && (l.style.position = "fixed", l.style.top = d + "px", ("absolute" == c || "relative" == c) && parseFloat(e) && (l.style.left = b.x + "px")))
			}

			function q() {
				o = !0, k.parentNode && k.parentNode.removeChild(k), l.style.cssText = j
			}

			function r() {
				var b = n(a.container),
					c = a.options.toolbarTopOffset || 0;
				b.top < 0 && b.bottom - l.offsetHeight > c ? p() : q()
			}
			var c, d, e, f, g, j, l, m, n, k, o, s, a = this,
				b = a.getLang();
			a.setOpt({
				topOffset: 0
			}), c = a.options.autoFloatEnabled !== !1, d = a.options.topOffset, c && (e = UE.ui.uiUtils, f = browser.ie && browser.version <= 6, g = browser.quirks, k = document.createElement("div"), o = !0, s = utils.defer(function() {
				r()
			}, browser.ie ? 200 : 100, !0), a.addListener("destroy", function() {
				domUtils.un(window, ["scroll", "resize"], r), a.removeListener("keydown", s)
			}), a.addListener("ready", function() {
				if (h(a)) {
					if (!a.ui) return;
					n = e.getClientRect, l = a.ui.getDom("toolbarbox"), m = n(l).top, j = l.style.cssText, k.style.height = l.offsetHeight + "px", f && i(), domUtils.on(window, ["scroll", "resize"], r), a.addListener("keydown", s), a.addListener("beforefullscreenchange", function(a, b) {
						b && q()
					}), a.addListener("fullscreenchanged", function(a, b) {
						b || r()
					}), a.addListener("sourcemodechanged", function() {
						setTimeout(function() {
							r()
						}, 0)
					}), a.addListener("clearDoc", function() {
						setTimeout(function() {
							r()
						}, 0)
					})
				}
			}))
		}, UE.plugins["video"] = function() {
			function b(b, c, d, e, f, g, h) {
				var i, j;
				switch (h) {
					case "image":
						i = "<img " + (e ? 'id="' + e + '"' : "") + ' width="' + c + '" height="' + d + '" _url="' + b + '" class="' + g.replace(/\bvideo-js\b/, "") + '"' + ' src="' + a.options.UEDITOR_HOME_URL + 'themes/default/images/spacer.gif" style="background:url(' + a.options.UEDITOR_HOME_URL + "themes/default/images/videologo.gif) no-repeat center center; border:1px solid gray;" + (f ? "float:" + f + ";" : "") + '" />';
						break;
					case "embed":
						i = '<embed type="application/x-shockwave-flash" class="' + g + '" pluginspage="http://www.macromedia.com/go/getflashplayer"' + ' src="' + utils.html(b) + '" width="' + c + '" height="' + d + '"' + (f ? ' style="float:' + f + '"' : "") + ' wmode="transparent" play="true" loop="false" menu="false" allowscriptaccess="never" allowfullscreen="true" >';
						break;
					case "video":
						j = b.substr(b.lastIndexOf(".") + 1), "ogv" == j && (j = "ogg"), i = "<video" + (e ? ' id="' + e + '"' : "") + ' class="' + g + ' video-js" ' + (f ? ' style="float:' + f + '"' : "") + ' controls preload="none" width="' + c + '" height="' + d + '" src="' + b + '" data-setup="{}">' + '<source src="' + b + '" type="video/' + j + '" /></video>'
				}
				return i
			}

			function c(a, c) {
				utils.each(a.getNodesByTagName(c ? "img" : "embed video"), function(a) {
					var e, d = a.getAttr("class");
					d && -1 != d.indexOf("edui-faked-video") && (e = b(c ? a.getAttr("_url") : a.getAttr("src"), a.getAttr("width"), a.getAttr("height"), null, a.getStyle("float") || "", d, c ? "embed" : "image"), a.parentNode.replaceChild(UE.uNode.createElement(e), a)), d && -1 != d.indexOf("edui-upload-video") && (e = b(c ? a.getAttr("_url") : a.getAttr("src"), a.getAttr("width"), a.getAttr("height"), null, a.getStyle("float") || "", d, c ? "video" : "image"), a.parentNode.replaceChild(UE.uNode.createElement(e), a))
				})
			}
			var a = this;
			a.addOutputRule(function(a) {
				c(a, !0)
			}), a.addInputRule(function(a) {
				c(a)
			}), a.commands["insertvideo"] = {
				execCommand: function(c, d, e) {
					var h, f, g, j, i, k, l, m;
					for (d = utils.isArray(d) ? d : [d], f = [], g = "tmpVedio", i = 0, k = d.length; k > i; i++) j = d[i], h = "upload" == e ? "edui-upload-video video-js vjs-default-skin" : "edui-faked-video", f.push(b(j.url, j.width || 420, j.height || 280, g + i, null, h, "image"));
					for (a.execCommand("inserthtml", f.join(""), !0), l = this.selection.getRange(), i = 0, k = d.length; k > i; i++) m = this.document.getElementById("tmpVedio" + i), domUtils.removeAttributes(m, "id"), l.selectNode(m).select(), a.execCommand("imagefloat", d[i].align)
				},
				queryCommandState: function() {
					var b = a.selection.getRange().getClosedNode(),
						c = b && ("edui-faked-video" == b.className || -1 != b.className.indexOf("edui-upload-video"));
					return c ? 1 : 0
				}
			}
		},
		function() {
			function b() {}
			var a = UE.UETable = function(a) {
				this.table = a, this.indexTable = [], this.selectedTds = [], this.cellsRange = {}, this.update(a)
			};
			a.removeSelectedClass = function(a) {
				utils.each(a, function(a) {
					domUtils.removeClasses(a, "selectTdClass")
				})
			}, a.addSelectedClass = function(a) {
				utils.each(a, function(a) {
					domUtils.addClass(a, "selectTdClass")
				})
			}, a.isEmptyBlock = function(a) {
				var c, b = new RegExp(domUtils.fillChar, "g");
				if (a[browser.ie ? "innerText" : "textContent"].replace(/^\s*$/, "").replace(b, "").length > 0) return 0;
				for (c in dtd.$isNotEmpty)
					if (dtd.$isNotEmpty.hasOwnProperty(c) && a.getElementsByTagName(c).length) return 0;
				return 1
			}, a.getWidth = function(a) {
				return a ? parseInt(domUtils.getComputedStyle(a, "width"), 10) : 0
			}, a.getTableCellAlignState = function(a) {
				!utils.isArray(a) && (a = [a]);
				var b = {},
					c = ["align", "valign"],
					d = null,
					e = !0;
				return utils.each(a, function(a) {
					return utils.each(c, function(c) {
						if (d = a.getAttribute(c), !b[c] && d) b[c] = d;
						else if (!b[c] || d !== b[c]) return e = !1, !1
					}), e
				}), e ? b : null
			}, a.getTableItemsByRange = function(a) {
				var c, d, e, f, b = a.selection.getStart();
				return b && b.id && 0 === b.id.indexOf("_baidu_bookmark_start_") && b.nextSibling && (b = b.nextSibling), c = b && domUtils.findParentByTagName(b, ["td", "th"], !0), d = c && c.parentNode, e = b && domUtils.findParentByTagName(b, "caption", !0), f = e ? e.parentNode : d && d.parentNode.parentNode, {
					cell: c,
					tr: d,
					table: f,
					caption: e
				}
			}, a.getUETableBySelected = function(b) {
				var c = a.getTableItemsByRange(b).table;
				return c && c.ueTable && c.ueTable.selectedTds.length ? c.ueTable : null
			}, a.getDefaultValue = function(a, b) {
				var d, e, f, g, h, c = {
					thin: "0px",
					medium: "1px",
					thick: "2px"
				};
				return b ? (h = b.getElementsByTagName("td")[0], g = domUtils.getComputedStyle(b, "border-left-width"), d = parseInt(c[g] || g, 10), g = domUtils.getComputedStyle(h, "padding-left"), e = parseInt(c[g] || g, 10), g = domUtils.getComputedStyle(h, "border-left-width"), f = parseInt(c[g] || g, 10), {
					tableBorder: d,
					tdPadding: e,
					tdBorder: f
				}) : (b = a.document.createElement("table"), b.insertRow(0).insertCell(0).innerHTML = "xxx", a.body.appendChild(b), h = b.getElementsByTagName("td")[0], g = domUtils.getComputedStyle(b, "border-left-width"), d = parseInt(c[g] || g, 10), g = domUtils.getComputedStyle(h, "padding-left"), e = parseInt(c[g] || g, 10), g = domUtils.getComputedStyle(h, "border-left-width"), f = parseInt(c[g] || g, 10), domUtils.remove(b), {
					tableBorder: d,
					tdPadding: e,
					tdBorder: f
				})
			}, a.getUETable = function(b) {
				var c = b.tagName.toLowerCase();
				return b = "td" == c || "th" == c || "caption" == c ? domUtils.findParentByTagName(b, "table", !0) : b, b.ueTable || (b.ueTable = new a(b)), b.ueTable
			}, a.cloneCell = function(a, b, c) {
				var d, e;
				return !a || utils.isString(a) ? this.table.ownerDocument.createElement(a || "td") : (d = domUtils.hasClass(a, "selectTdClass"), d && domUtils.removeClasses(a, "selectTdClass"), e = a.cloneNode(!0), b && (e.rowSpan = e.colSpan = 1), !c && domUtils.removeAttributes(e, "width height"), !c && domUtils.removeAttributes(e, "style"), e.style.borderLeftStyle = "", e.style.borderTopStyle = "", e.style.borderLeftColor = a.style.borderRightColor, e.style.borderLeftWidth = a.style.borderRightWidth, e.style.borderTopColor = a.style.borderBottomColor, e.style.borderTopWidth = a.style.borderBottomWidth, d && domUtils.addClass(a, "selectTdClass"), e)
			}, a.prototype = {
				getMaxRows: function() {
					var d, c, e, g, f, a = this.table.rows,
						b = 1;
					for (c = 0; d = a[c]; c++) {
						for (e = 1, f = 0; g = d.cells[f++];) e = Math.max(g.rowSpan || 1, e);
						b = Math.max(e + c, b)
					}
					return b
				},
				getMaxCols: function() {
					var e, d, f, h, g, i, a = this.table.rows,
						b = 0,
						c = {};
					for (d = 0; e = a[d]; d++) {
						for (f = 0, g = 0; h = e.cells[g++];)
							if (f += h.colSpan || 1, h.rowSpan && h.rowSpan > 1)
								for (i = 1; i < h.rowSpan; i++) c["row_" + (d + i)] ? c["row_" + (d + i)]++ : c["row_" + (d + i)] = h.colSpan || 1;
						f += c["row_" + d] || 0, b = Math.max(f, b)
					}
					return b
				},
				getCellColIndex: function() {},
				getHSideCell: function(a, c) {
					var e, f, d, g, h;
					try {
						return d = this.getCellInfo(a), g = this.selectedTds.length, h = this.cellsRange, !c && (g ? !h.beginColIndex : !d.colIndex) || c && (g ? h.endColIndex == this.colsNum - 1 : d.colIndex == this.colsNum - 1) ? null : (e = g ? h.beginRowIndex : d.rowIndex, f = c ? g ? h.endColIndex + 1 : d.colIndex + 1 : g ? h.beginColIndex - 1 : d.colIndex < 1 ? 0 : d.colIndex - 1, this.getCell(this.indexTable[e][f].rowIndex, this.indexTable[e][f].cellIndex))
					} catch (i) {
						b(i)
					}
				},
				getTabNextCell: function(a, b) {
					var f, c = this.getCellInfo(a),
						d = b || c.rowIndex,
						e = c.colIndex + 1 + (c.colSpan - 1);
					try {
						f = this.getCell(this.indexTable[d][e].rowIndex, this.indexTable[d][e].cellIndex)
					} catch (g) {
						try {
							d = 1 * d + 1, e = 0, f = this.getCell(this.indexTable[d][e].rowIndex, this.indexTable[d][e].cellIndex)
						} catch (g) {}
					}
					return f
				},
				getVSideCell: function(a, c, d) {
					var f, g, e, h, i;
					try {
						return e = this.getCellInfo(a), h = this.selectedTds.length && !d, i = this.cellsRange, !c && 0 == e.rowIndex || c && (h ? i.endRowIndex == this.rowsNum - 1 : e.rowIndex + e.rowSpan > this.rowsNum - 1) ? null : (f = c ? h ? i.endRowIndex + 1 : e.rowIndex + e.rowSpan : h ? i.beginRowIndex - 1 : e.rowIndex - 1, g = h ? i.beginColIndex : e.colIndex, this.getCell(this.indexTable[f][g].rowIndex, this.indexTable[f][g].cellIndex))
					} catch (j) {
						b(j)
					}
				},
				getSameEndPosCells: function(a, c) {
					var d, e, f, g, h, i, k, j, l;
					try {
						for (d = "x" === c.toLowerCase(), e = domUtils.getXY(a)[d ? "x" : "y"] + a["offset" + (d ? "Width" : "Height")], f = this.table.rows, g = null, h = [], i = 0; i < this.rowsNum; i++)
							for (g = f[i].cells, j = 0;
								(k = g[j++]) && (l = domUtils.getXY(k)[d ? "x" : "y"] + k["offset" + (d ? "Width" : "Height")], !(l > e && d)) && (a != k && e != l || (1 == k[d ? "colSpan" : "rowSpan"] && h.push(k), !d)););
						return h
					} catch (m) {
						b(m)
					}
				},
				setCellContent: function(a, b) {
					a.innerHTML = b || (browser.ie ? domUtils.fillChar : "<br />")
				},
				cloneCell: a.cloneCell,
				getSameStartPosXCells: function(a) {
					var e, c, d, f, g, i, h, j;
					try {
						for (c = domUtils.getXY(a).x + a.offsetWidth, d = this.table.rows, f = [], g = 0; g < this.rowsNum; g++)
							for (e = d[g].cells, h = 0;
								(i = e[h++]) && (j = domUtils.getXY(i).x, !(j > c));)
								if (j == c && 1 == i.colSpan) {
									f.push(i);
									break
								}
						return f
					} catch (k) {
						b(k)
					}
				},
				update: function(a) {
					var b, c, d, e, f, g, i, h, k, j, l, m, n, o, p, q, r, s, t, u, v, w;
					for (this.table = a || this.table, this.selectedTds = [], this.cellsRange = {}, this.indexTable = [], b = this.table.rows, c = this.getMaxRows(), d = c - b.length, e = this.getMaxCols(); d--;) this.table.insertRow(b.length);
					for (this.rowsNum = c, this.colsNum = e, f = 0, g = b.length; g > f; f++) this.indexTable[f] = new Array(e);
					for (h = 0; i = b[h]; h++)
						for (j = 0, l = i.cells; k = l[j]; j++) {
							for (k.rowSpan > c && (k.rowSpan = c), m = j, n = k.rowSpan || 1, o = k.colSpan || 1; this.indexTable[h][m];) m++;
							for (p = 0; n > p; p++)
								for (q = 0; o > q; q++) this.indexTable[h + p][m + q] = {
									rowIndex: h,
									cellIndex: j,
									colIndex: m,
									rowSpan: n,
									colSpan: o
								}
						}
					for (p = 0; c > p; p++)
						for (q = 0; e > q; q++) void 0 === this.indexTable[p][q] && (i = b[p], k = i.cells[i.cells.length - 1], k = k ? k.cloneNode(!0) : this.table.ownerDocument.createElement("td"), this.setCellContent(k), 1 !== k.colSpan && (k.colSpan = 1), 1 !== k.rowSpan && (k.rowSpan = 1), i.appendChild(k), this.indexTable[p][q] = {
							rowIndex: p,
							cellIndex: k.cellIndex,
							colIndex: q,
							rowSpan: 1,
							colSpan: 1
						});
					if (r = domUtils.getElementsByTagName(this.table, "td"), s = [], utils.each(r, function(a) {
							domUtils.hasClass(a, "selectTdClass") && s.push(a)
						}), s.length && (t = s[0], u = s[s.length - 1], v = this.getCellInfo(t), w = this.getCellInfo(u), this.selectedTds = s, this.cellsRange = {
							beginRowIndex: v.rowIndex,
							beginColIndex: v.colIndex,
							endRowIndex: w.rowIndex + w.rowSpan - 1,
							endColIndex: w.colIndex + w.colSpan - 1
						}), !domUtils.hasClass(this.table.rows[0], "firstRow"))
						for (domUtils.addClass(this.table.rows[0], "firstRow"), f = 1; f < this.table.rows.length; f++) domUtils.removeClasses(this.table.rows[f], "firstRow")
				},
				getCellInfo: function(a) {
					var b, c, d, e, f, g;
					if (a)
						for (b = a.cellIndex, c = a.parentNode.rowIndex, d = this.indexTable[c], e = this.colsNum, f = b; e > f; f++)
							if (g = d[f], g.rowIndex === c && g.cellIndex === b) return g
				},
				getCell: function(a, b) {
					return a < this.rowsNum && this.table.rows[a].cells[b] || null
				},
				deleteCell: function(a, b) {
					b = "number" == typeof b ? b : a.parentNode.rowIndex;
					var c = this.table.rows[b];
					c.deleteCell(a.cellIndex)
				},
				getCellsRange: function(a, b) {
					function c(a, b, e, f) {
						var k, l, m, g = a,
							h = b,
							i = e,
							j = f;
						if (a > 0)
							for (l = b; f > l; l++) k = d.indexTable[a][l], m = k.rowIndex, a > m && (g = Math.min(m, g));
						if (f < d.colsNum)
							for (m = a; e > m; m++) k = d.indexTable[m][f], l = k.colIndex + k.colSpan - 1, l > f && (j = Math.max(l, j));
						if (e < d.rowsNum)
							for (l = b; f > l; l++) k = d.indexTable[e][l], m = k.rowIndex + k.rowSpan - 1, m > e && (i = Math.max(m, i));
						if (b > 0)
							for (m = a; e > m; m++) k = d.indexTable[m][b], l = k.colIndex, b > l && (h = Math.min(k.colIndex, h));
						return g != a || h != b || i != e || j != f ? c(g, h, i, j) : {
							beginRowIndex: a,
							beginColIndex: b,
							endRowIndex: e,
							endColIndex: f
						}
					}
					var d, e, f, g, h, i, j;
					try {
						return d = this, e = d.getCellInfo(a), a === b ? {
							beginRowIndex: e.rowIndex,
							beginColIndex: e.colIndex,
							endRowIndex: e.rowIndex + e.rowSpan - 1,
							endColIndex: e.colIndex + e.colSpan - 1
						} : (f = d.getCellInfo(b), g = Math.min(e.rowIndex, f.rowIndex), h = Math.min(e.colIndex, f.colIndex), i = Math.max(e.rowIndex + e.rowSpan - 1, f.rowIndex + f.rowSpan - 1), j = Math.max(e.colIndex + e.colSpan - 1, f.colIndex + f.colSpan - 1), c(g, h, i, j))
					} catch (k) {}
				},
				getCells: function(a) {
					var f, g, h, b, c, d, e, i, j, k, l, m;
					for (this.clearSelected(), b = a.beginRowIndex, c = a.beginColIndex, d = a.endRowIndex, e = a.endColIndex, i = {}, j = [], k = b; d >= k; k++)
						for (l = c; e >= l; l++)
							if (f = this.indexTable[k][l], g = f.rowIndex, h = f.colIndex, m = g + "|" + h, !i[m]) {
								if (i[m] = 1, k > g || l > h || g + f.rowSpan - 1 > d || h + f.colSpan - 1 > e) return null;
								j.push(this.getCell(g, f.cellIndex))
							}
					return j
				},
				clearSelected: function() {
					a.removeSelectedClass(this.selectedTds), this.selectedTds = [], this.cellsRange = {}
				},
				setSelected: function(b) {
					var c = this.getCells(b);
					a.addSelectedClass(c), this.selectedTds = c, this.cellsRange = b
				},
				isFullRow: function() {
					var a = this.cellsRange;
					return a.endColIndex - a.beginColIndex + 1 == this.colsNum
				},
				isFullCol: function() {
					var a = this.cellsRange,
						b = this.table,
						c = b.getElementsByTagName("th"),
						d = a.endRowIndex - a.beginRowIndex + 1;
					return c.length ? d == this.rowsNum || d == this.rowsNum - 1 : d == this.rowsNum
				},
				getNextCell: function(a, c, d) {
					var f, g, e, h, i;
					try {
						return e = this.getCellInfo(a), h = this.selectedTds.length && !d, i = this.cellsRange, !c && 0 == e.rowIndex || c && (h ? i.endRowIndex == this.rowsNum - 1 : e.rowIndex + e.rowSpan > this.rowsNum - 1) ? null : (f = c ? h ? i.endRowIndex + 1 : e.rowIndex + e.rowSpan : h ? i.beginRowIndex - 1 : e.rowIndex - 1, g = h ? i.beginColIndex : e.colIndex, this.getCell(this.indexTable[f][g].rowIndex, this.indexTable[f][g].cellIndex))
					} catch (j) {
						b(j)
					}
				},
				getPreviewCell: function(a, c) {
					var e, f, d, g, h;
					try {
						return d = this.getCellInfo(a), g = this.selectedTds.length, h = this.cellsRange, !c && (g ? !h.beginColIndex : !d.colIndex) || c && (g ? h.endColIndex == this.colsNum - 1 : d.rowIndex > this.colsNum - 1) ? null : (e = c ? g ? h.beginRowIndex : d.rowIndex < 1 ? 0 : d.rowIndex - 1 : g ? h.beginRowIndex : d.rowIndex, f = c ? g ? h.endColIndex + 1 : d.colIndex : g ? h.beginColIndex - 1 : d.colIndex < 1 ? 0 : d.colIndex - 1, this.getCell(this.indexTable[e][f].rowIndex, this.indexTable[e][f].cellIndex))
					} catch (i) {
						b(i)
					}
				},
				moveContent: function(b, c) {
					if (!a.isEmptyBlock(c)) {
						if (a.isEmptyBlock(b)) return b.innerHTML = c.innerHTML, void 0;
						var d = b.lastChild;
						for (3 != d.nodeType && dtd.$block[d.tagName] || b.appendChild(b.ownerDocument.createElement("br")); d = c.firstChild;) b.appendChild(d)
					}
				},
				mergeRight: function(a) {
					var b = this.getCellInfo(a),
						c = b.colIndex + b.colSpan,
						d = this.indexTable[b.rowIndex][c],
						e = this.getCell(d.rowIndex, d.cellIndex);
					a.colSpan = b.colSpan + d.colSpan, a.removeAttribute("width"), this.moveContent(a, e), this.deleteCell(e, d.rowIndex), this.update()
				},
				mergeDown: function(a) {
					var b = this.getCellInfo(a),
						c = b.rowIndex + b.rowSpan,
						d = this.indexTable[c][b.colIndex],
						e = this.getCell(d.rowIndex, d.cellIndex);
					a.rowSpan = b.rowSpan + d.rowSpan, a.removeAttribute("height"), this.moveContent(a, e), this.deleteCell(e, d.rowIndex), this.update()
				},
				mergeRange: function() {
					var c, d, e, g, f, h, i, j, k, a = this.cellsRange,
						b = this.getCell(a.beginRowIndex, this.indexTable[a.beginRowIndex][a.beginColIndex].cellIndex);
					for ("TH" == b.tagName && a.endRowIndex !== a.beginRowIndex && (c = this.indexTable, d = this.getCellInfo(b), b = this.getCell(1, c[1][d.colIndex].cellIndex), a = this.getCellsRange(b, this.getCell(c[this.rowsNum - 1][d.colIndex].rowIndex, c[this.rowsNum - 1][d.colIndex].cellIndex))), e = this.getCells(a), f = 0; g = e[f++];) g !== b && (this.moveContent(b, g), this.deleteCell(g));
					if (b.rowSpan = a.endRowIndex - a.beginRowIndex + 1, b.rowSpan > 1 && b.removeAttribute("height"), b.colSpan = a.endColIndex - a.beginColIndex + 1, b.colSpan > 1 && b.removeAttribute("width"), b.rowSpan == this.rowsNum && 1 != b.colSpan && (b.colSpan = 1), b.colSpan == this.colsNum && 1 != b.rowSpan) {
						if (h = b.parentNode.rowIndex, this.table.deleteRow)
							for (f = h + 1, i = h + 1, j = b.rowSpan; j > f; f++) this.table.deleteRow(i);
						else
							for (f = 0, j = b.rowSpan - 1; j > f; f++) k = this.table.rows[h + 1], k.parentNode.removeChild(k);
						b.rowSpan = 1
					}
					this.update()
				},
				insertRow: function(a, b) {
					function h(a, b, c) {
						var d, e, f;
						0 == a ? (d = c.nextSibling || c.previousSibling, e = d.cells[a], "TH" == e.tagName && (e = b.ownerDocument.createElement("th"), e.appendChild(b.firstChild), c.insertBefore(e, b), domUtils.remove(b))) : "TH" == b.tagName && (f = b.ownerDocument.createElement("td"), f.appendChild(b.firstChild), c.insertBefore(f, b), domUtils.remove(b))
					}
					var f, i, j, l, c = this.colsNum,
						d = this.table,
						e = d.insertRow(a),
						g = "string" == typeof b && "TH" == b.toUpperCase();
					if (0 == a || a == this.rowsNum)
						for (i = 0; c > i; i++) f = this.cloneCell(b, !0), this.setCellContent(f), f.getAttribute("vAlign") && f.setAttribute("vAlign", f.getAttribute("vAlign")), e.appendChild(f), g || h(i, f, e);
					else
						for (j = this.indexTable[a], i = 0; c > i; i++) l = j[i], l.rowIndex < a ? (f = this.getCell(l.rowIndex, l.cellIndex), f.rowSpan = l.rowSpan + 1) : (f = this.cloneCell(b, !0), this.setCellContent(f), e.appendChild(f)), g || h(i, f, e);
					return this.update(), e
				},
				deleteRow: function(a) {
					var f, g, h, i, l, j, k, m, n, o, p, q, r, s, b = this.table.rows[a],
						c = this.indexTable[a],
						d = this.colsNum,
						e = 0;
					for (f = 0; d > f;) g = c[f], h = this.getCell(g.rowIndex, g.cellIndex), h.rowSpan > 1 && g.rowIndex == a && (i = h.cloneNode(!0), i.rowSpan = h.rowSpan - 1, i.innerHTML = "", h.rowSpan = 1, j = a + 1, k = this.table.rows[j], m = this.getPreviewMergedCellsNum(j, f) - e, f > m ? (l = f - m - 1, domUtils.insertAfter(k.cells[l], i)) : k.cells.length && k.insertBefore(i, k.cells[0]), e += 1), f += h.colSpan || 1;
					for (n = [], o = {}, f = 0; d > f; f++) p = c[f].rowIndex, q = c[f].cellIndex, r = p + "_" + q, o[r] || (o[r] = 1, h = this.getCell(p, q), n.push(h));
					s = [], utils.each(n, function(a) {
						1 == a.rowSpan ? a.parentNode.removeChild(a) : s.push(a)
					}), utils.each(s, function(a) {
						a.rowSpan--
					}), b.parentNode.removeChild(b), this.update()
				},
				insertCol: function(a, b, c) {
					function j(a, b, c) {
						var d, e;
						0 == a ? (d = b.nextSibling || b.previousSibling, "TH" == d.tagName && (d = b.ownerDocument.createElement("th"), d.appendChild(b.firstChild), c.insertBefore(d, b), domUtils.remove(b))) : "TH" == b.tagName && (e = b.ownerDocument.createElement("td"), e.appendChild(b.firstChild), c.insertBefore(e, b), domUtils.remove(b))
					}
					var f, g, k, l, d = this.rowsNum,
						e = 0,
						h = parseInt((this.table.offsetWidth - 20 * (this.colsNum + 1) - (this.colsNum + 1)) / (this.colsNum + 1), 10),
						i = "string" == typeof b && "TH" == b.toUpperCase();
					if (0 == a || a == this.colsNum)
						for (; d > e; e++) f = this.table.rows[e], k = f.cells[0 == a ? a : f.cells.length], g = this.cloneCell(b, !0), this.setCellContent(g), g.setAttribute("vAlign", g.getAttribute("vAlign")), k && g.setAttribute("width", k.getAttribute("width")), a ? domUtils.insertAfter(f.cells[f.cells.length - 1], g) : f.insertBefore(g, f.cells[0]), i || j(e, g, f);
					else
						for (; d > e; e++) l = this.indexTable[e][a], l.colIndex < a ? (g = this.getCell(l.rowIndex, l.cellIndex), g.colSpan = l.colSpan + 1) : (f = this.table.rows[e], k = f.cells[l.cellIndex], g = this.cloneCell(b, !0), this.setCellContent(g), g.setAttribute("vAlign", g.getAttribute("vAlign")), k && g.setAttribute("width", k.getAttribute("width")), k ? f.insertBefore(g, k) : f.appendChild(g)), i || j(e, g, f);
					this.update(), this.updateWidth(h, c || {
						tdPadding: 10,
						tdBorder: 1
					})
				},
				updateWidth: function(b, c) {
					var f, d = this.table,
						e = a.getWidth(d) - 2 * c.tdPadding - c.tdBorder + b;
					return e < d.ownerDocument.body.offsetWidth ? (d.setAttribute("width", e), void 0) : (f = domUtils.getElementsByTagName(this.table, "td th"), utils.each(f, function(a) {
						a.setAttribute("width", b)
					}), void 0)
				},
				deleteCol: function(a) {
					var h, i, j, k, l, b = this.indexTable,
						c = this.table.rows,
						d = this.table.getAttribute("width"),
						e = 0,
						f = this.rowsNum,
						g = {};
					for (h = 0; f > h;) i = b[h], j = i[a], k = j.rowIndex + "_" + j.colIndex, g[k] || (g[k] = 1, l = this.getCell(j.rowIndex, j.cellIndex), e || (e = l && parseInt(l.offsetWidth / l.colSpan, 10).toFixed(0)), l.colSpan > 1 ? l.colSpan-- : c[h].deleteCell(j.cellIndex), h += j.rowSpan || 1);
					this.table.setAttribute("width", d - e), this.update()
				},
				splitToCells: function(a) {
					var b = this,
						c = this.splitToRows(a);
					utils.each(c, function(a) {
						b.splitToCols(a)
					})
				},
				splitToRows: function(a) {
					var f, g, h, i, b = this.getCellInfo(a),
						c = b.rowIndex,
						d = b.colIndex,
						e = [];
					for (a.rowSpan = 1, e.push(a), f = c, g = c + b.rowSpan; g > f; f++) f != c && (h = this.table.rows[f], i = h.insertCell(d - this.getPreviewMergedCellsNum(f, d)), i.colSpan = b.colSpan, this.setCellContent(i), i.setAttribute("vAlign", a.getAttribute("vAlign")), i.setAttribute("align", a.getAttribute("align")), a.style.cssText && (i.style.cssText = a.style.cssText), e.push(i));
					return this.update(), e
				},
				getPreviewMergedCellsNum: function(a, b) {
					var e, f, g, c = this.indexTable[a],
						d = 0;
					for (e = 0; b > e;) f = c[e].colSpan, g = c[e].rowIndex, d += f - (g == a ? 1 : 0), e += f;
					return d
				},
				splitToCols: function(a) {
					var g, h, i, j, k, b = (a.offsetWidth / a.colSpan - 22).toFixed(0),
						c = this.getCellInfo(a),
						d = c.rowIndex,
						e = c.colIndex,
						f = [];
					for (a.colSpan = 1, a.setAttribute("width", b), f.push(a), g = e, h = e + c.colSpan; h > g; g++) g != e && (i = this.table.rows[d], j = i.insertCell(this.indexTable[d][g].cellIndex + 1), j.rowSpan = c.rowSpan, this.setCellContent(j), j.setAttribute("vAlign", a.getAttribute("vAlign")), j.setAttribute("align", a.getAttribute("align")), j.setAttribute("width", b), a.style.cssText && (j.style.cssText = a.style.cssText), "TH" == a.tagName && (k = a.ownerDocument.createElement("th"), k.appendChild(j.firstChild), k.setAttribute("vAlign", a.getAttribute("vAlign")), k.rowSpan = j.rowSpan, i.insertBefore(k, j), domUtils.remove(j)), f.push(j));
					return this.update(), f
				},
				isLastCell: function(a, b, c) {
					b = b || this.rowsNum, c = c || this.colsNum;
					var d = this.getCellInfo(a);
					return d.rowIndex + d.rowSpan == b && d.colIndex + d.colSpan == c
				},
				getLastCell: function(a) {
					a = a || this.table.getElementsByTagName("td"), this.getCellInfo(a[0]);
					var h, c = this,
						d = a[0],
						e = d.parentNode,
						f = 0,
						g = 0;
					return utils.each(a, function(a) {
						a.parentNode == e && (g += a.colSpan || 1), f += a.rowSpan * a.colSpan || 1
					}), h = f / g, utils.each(a, function(a) {
						return c.isLastCell(a, h, g) ? (d = a, !1) : void 0
					}), d
				},
				selectRow: function(a) {
					var b = this.indexTable[a],
						c = this.getCell(b[0].rowIndex, b[0].cellIndex),
						d = this.getCell(b[this.colsNum - 1].rowIndex, b[this.colsNum - 1].cellIndex),
						e = this.getCellsRange(c, d);
					this.setSelected(e)
				},
				selectTable: function() {
					var a = this.table.getElementsByTagName("td"),
						b = this.getCellsRange(a[0], a[a.length - 1]);
					this.setSelected(b)
				},
				setBackground: function(a, b) {
					var c, d, e, f, h, g, i;
					if ("string" == typeof b) utils.each(a, function(a) {
						a.style.backgroundColor = b
					});
					else if ("object" == typeof b)
						for (b = utils.extend({
								repeat: !0,
								colorList: ["#ddd", "#fff"]
							}, b), c = this.getCellInfo(a[0]).rowIndex, d = 0, e = b.colorList, f = function(a, b, c) {
								return a[b] ? a[b] : c ? a[b % a.length] : ""
							}, g = 0; h = a[g++];) i = this.getCellInfo(h), h.style.backgroundColor = f(e, c + d == i.rowIndex ? d : ++d, b.repeat)
				},
				removeBackground: function(a) {
					utils.each(a, function(a) {
						a.style.backgroundColor = ""
					})
				}
			}
		}(),
		function() {
			function f(a, b) {
				var e, c = domUtils.getElementsByTagName(a, "td th");
				utils.each(c, function(a) {
					a.removeAttribute("width")
				}), a.setAttribute("width", g(b, !0, d(b, a))), e = [], setTimeout(function() {
					utils.each(c, function(a) {
						1 == a.colSpan && e.push(a.offsetWidth)
					}), utils.each(c, function(a, b) {
						1 == a.colSpan && a.setAttribute("width", e[b] + "")
					})
				}, 0)
			}

			function g(a, b, c) {
				var d = a.body;
				return d.offsetWidth - (b ? 2 * parseInt(domUtils.getComputedStyle(d, "margin-left"), 10) : 0) - 2 * c.tableBorder - (a.options.offsetWidth || 0)
			}

			function h(a) {
				var d, c = b(a).cell;
				return c ? (d = e(c), d.selectedTds.length ? d.selectedTds : [c]) : []
			}
			var a = UE.UETable,
				b = function(b) {
					return a.getTableItemsByRange(b)
				},
				c = function(b) {
					return a.getUETableBySelected(b)
				},
				d = function(b, c) {
					return a.getDefaultValue(b, c)
				},
				e = function(b) {
					return a.getUETable(b)
				};
			UE.commands["inserttable"] = {
				queryCommandState: function() {
					return b(this).table ? -1 : 0
				},
				execCommand: function(a, b) {
					function c(a, b) {
						var f, g, c = [],
							d = a.numRows,
							e = a.numCols;
						for (f = 0; d > f; f++) {
							for (c.push("<tr" + (0 == f ? ' class="firstRow"' : "") + ">"), g = 0; e > g; g++) c.push('<td width="' + b + '"  vAlign="' + a.tdvalign + '" >' + (browser.ie && browser.version < 11 ? domUtils.fillChar : "<br/>") + "</td>");
							c.push("</tr>")
						}
						return "<table><tbody>" + c.join("") + "</tbody></table>"
					}
					var e, f, g, h, i, j, k;
					b || (b = utils.extend({}, {
						numCols: this.options.defaultCols,
						numRows: this.options.defaultRows,
						tdvalign: this.options.tdvalign
					})), e = this, f = this.selection.getRange(), g = f.startContainer, h = domUtils.findParent(g, function(a) {
						return domUtils.isBlockElm(a)
					}, !0) || e.body, i = d(e), j = h.offsetWidth, k = Math.floor(j / b.numCols - 2 * i.tdPadding - i.tdBorder), !b.tdvalign && (b.tdvalign = e.options.tdvalign), e.execCommand("inserthtml", c(b, k))
				}
			}, UE.commands["insertparagraphbeforetable"] = {
				queryCommandState: function() {
					return b(this).cell ? 0 : -1
				},
				execCommand: function() {
					var c, a = b(this).table;
					a && (c = this.document.createElement("p"), c.innerHTML = browser.ie ? "&nbsp;" : "<br />", a.parentNode.insertBefore(c, a), this.selection.getRange().setStart(c, 0).setCursor())
				}
			}, UE.commands["deletetable"] = {
				queryCommandState: function() {
					var a = this.selection.getRange();
					return domUtils.findParentByTagName(a.startContainer, "table", !0) ? 0 : -1
				},
				execCommand: function(a, b) {
					var d, c = this.selection.getRange();
					b = b || domUtils.findParentByTagName(c.startContainer, "table", !0), b && (d = b.nextSibling, d || (d = domUtils.createElement(this.document, "p", {
						innerHTML: browser.ie ? domUtils.fillChar : "<br/>"
					}), b.parentNode.insertBefore(d, b)), domUtils.remove(b), c = this.selection.getRange(), 3 == d.nodeType ? c.setStartBefore(d) : c.setStart(d, 0), c.setCursor(!1, !0), this.fireEvent("tablehasdeleted"))
				}
			}, UE.commands["cellalign"] = {
				queryCommandState: function() {
					return h(this).length ? 0 : -1
				},
				execCommand: function(a, b) {
					var e, d, c = h(this);
					if (c.length)
						for (d = 0; e = c[d++];) e.setAttribute("align", b)
				}
			}, UE.commands["cellvalign"] = {
				queryCommandState: function() {
					return h(this).length ? 0 : -1
				},
				execCommand: function(a, b) {
					var e, d, c = h(this);
					if (c.length)
						for (d = 0; e = c[d++];) e.setAttribute("vAlign", b)
				}
			}, UE.commands["insertcaption"] = {
				queryCommandState: function() {
					var a = b(this).table;
					return a ? 0 == a.getElementsByTagName("caption").length ? 1 : -1 : -1
				},
				execCommand: function() {
					var c, d, a = b(this).table;
					a && (c = this.document.createElement("caption"), c.innerHTML = browser.ie ? domUtils.fillChar : "<br/>", a.insertBefore(c, a.firstChild), d = this.selection.getRange(), d.setStart(c, 0).setCursor())
				}
			}, UE.commands["deletecaption"] = {
				queryCommandState: function() {
					var a = this.selection.getRange(),
						b = domUtils.findParentByTagName(a.startContainer, "table");
					return b ? 0 == b.getElementsByTagName("caption").length ? -1 : 1 : -1
				},
				execCommand: function() {
					var c, a = this.selection.getRange(),
						b = domUtils.findParentByTagName(a.startContainer, "table");
					b && (domUtils.remove(b.getElementsByTagName("caption")[0]), c = this.selection.getRange(), c.setStart(b.rows[0].cells[0], 0).setCursor())
				}
			}, UE.commands["inserttitle"] = {
				queryCommandState: function() {
					var c, a = b(this).table;
					return a ? (c = a.rows[0], "th" != c.cells[c.cells.length - 1].tagName.toLowerCase() ? 0 : -1) : -1
				},
				execCommand: function() {
					var c, a = b(this).table;
					a && e(a).insertRow(0, "th"), c = a.getElementsByTagName("th")[0], this.selection.getRange().setStart(c, 0).setCursor(!1, !0)
				}
			}, UE.commands["deletetitle"] = {
				queryCommandState: function() {
					var c, a = b(this).table;
					return a ? (c = a.rows[0], "th" == c.cells[c.cells.length - 1].tagName.toLowerCase() ? 0 : -1) : -1
				},
				execCommand: function() {
					var c, a = b(this).table;
					a && domUtils.remove(a.rows[0]), c = a.getElementsByTagName("td")[0], this.selection.getRange().setStart(c, 0).setCursor(!1, !0)
				}
			}, UE.commands["inserttitlecol"] = {
				queryCommandState: function() {
					var c, a = b(this).table;
					return a ? (c = a.rows[a.rows.length - 1], c.getElementsByTagName("th").length ? -1 : 0) : -1
				},
				execCommand: function() {
					var d, c = b(this).table;
					c && e(c).insertCol(0, "th"), f(c, this), d = c.getElementsByTagName("th")[0], this.selection.getRange().setStart(d, 0).setCursor(!1, !0)
				}
			}, UE.commands["deletetitlecol"] = {
				queryCommandState: function() {
					var c, a = b(this).table;
					return a ? (c = a.rows[a.rows.length - 1], c.getElementsByTagName("th").length ? 0 : -1) : -1
				},
				execCommand: function() {
					var c, d, a = b(this).table;
					if (a)
						for (c = 0; c < a.rows.length; c++) domUtils.remove(a.rows[c].children[0]);
					f(a, this), d = a.getElementsByTagName("td")[0], this.selection.getRange().setStart(d, 0).setCursor(!1, !0)
				}
			}, UE.commands["mergeright"] = {
				queryCommandState: function() {
					var g, h, i, j, k, c = b(this),
						d = c.table,
						f = c.cell;
					return d && f ? (g = e(d), g.selectedTds.length ? -1 : (h = g.getCellInfo(f), i = h.colIndex + h.colSpan, i >= g.colsNum ? -1 : (j = g.indexTable[h.rowIndex][i], k = d.rows[j.rowIndex].cells[j.cellIndex], k && f.tagName == k.tagName ? j.rowIndex == h.rowIndex && j.rowSpan == h.rowSpan ? 0 : -1 : -1))) : -1
				},
				execCommand: function() {
					var c = this.selection.getRange(),
						d = c.createBookmark(!0),
						f = b(this).cell,
						g = e(f);
					g.mergeRight(f), c.moveToBookmark(d).select()
				}
			}, UE.commands["mergedown"] = {
				queryCommandState: function() {
					var g, h, i, j, k, c = b(this),
						d = c.table,
						f = c.cell;
					return d && f ? (g = e(d), g.selectedTds.length ? -1 : (h = g.getCellInfo(f), i = h.rowIndex + h.rowSpan, i >= g.rowsNum ? -1 : (j = g.indexTable[i][h.colIndex], k = d.rows[j.rowIndex].cells[j.cellIndex], k && f.tagName == k.tagName ? j.colIndex == h.colIndex && j.colSpan == h.colSpan ? 0 : -1 : -1))) : -1
				},
				execCommand: function() {
					var a = this.selection.getRange(),
						c = a.createBookmark(!0),
						d = b(this).cell,
						f = e(d);
					f.mergeDown(d), a.moveToBookmark(c).select()
				}
			}, UE.commands["mergecells"] = {
				queryCommandState: function() {
					return c(this) ? 0 : -1
				},
				execCommand: function() {
					var b, d, a = c(this);
					a && a.selectedTds.length && (b = a.selectedTds[0], a.mergeRange(), d = this.selection.getRange(), domUtils.isEmptyBlock(b) ? d.setStart(b, 0).collapse(!0) : d.selectNodeContents(b), d.select())
				}
			}, UE.commands["insertrow"] = {
				queryCommandState: function() {
					var a = b(this),
						c = a.cell;
					return c && ("TD" == c.tagName || "TH" == c.tagName && a.tr !== a.table.rows[0]) && e(a.table).rowsNum < this.options.maxRowNum ? 0 : -1
				},
				execCommand: function() {
					var j, k, l, a = this.selection.getRange(),
						c = a.createBookmark(!0),
						d = b(this),
						f = d.cell,
						g = d.table,
						h = e(g),
						i = h.getCellInfo(f);
					if (h.selectedTds.length)
						for (j = h.cellsRange, k = 0, l = j.endRowIndex - j.beginRowIndex + 1; l > k; k++) h.insertRow(j.beginRowIndex, f);
					else h.insertRow(i.rowIndex, f);
					a.moveToBookmark(c).select(), "enabled" === g.getAttribute("interlaced") && this.fireEvent("interlacetable", g)
				}
			}, UE.commands["insertrownext"] = {
				queryCommandState: function() {
					var a = b(this),
						c = a.cell;
					return c && "TD" == c.tagName && e(a.table).rowsNum < this.options.maxRowNum ? 0 : -1
				},
				execCommand: function() {
					var j, k, l, a = this.selection.getRange(),
						c = a.createBookmark(!0),
						d = b(this),
						f = d.cell,
						g = d.table,
						h = e(g),
						i = h.getCellInfo(f);
					if (h.selectedTds.length)
						for (j = h.cellsRange, k = 0, l = j.endRowIndex - j.beginRowIndex + 1; l > k; k++) h.insertRow(j.endRowIndex + 1, f);
					else h.insertRow(i.rowIndex + i.rowSpan, f);
					a.moveToBookmark(c).select(), "enabled" === g.getAttribute("interlaced") && this.fireEvent("interlacetable", g)
				}
			}, UE.commands["deleterow"] = {
				queryCommandState: function() {
					var a = b(this);
					return a.cell ? 0 : -1
				},
				execCommand: function() {
					var j, k, l, m, a = b(this).cell,
						c = e(a),
						d = c.cellsRange,
						f = c.getCellInfo(a),
						g = c.getVSideCell(a),
						h = c.getVSideCell(a, !0),
						i = this.selection.getRange();
					if (utils.isEmptyObject(d)) c.deleteRow(f.rowIndex);
					else
						for (j = d.beginRowIndex; j < d.endRowIndex + 1; j++) c.deleteRow(d.beginRowIndex);
					k = c.table, k.getElementsByTagName("td").length ? 1 == f.rowSpan || f.rowSpan == d.endRowIndex - d.beginRowIndex + 1 ? (h || g) && i.selectNodeContents(h || g).setCursor(!1, !0) : (m = c.getCell(f.rowIndex, c.indexTable[f.rowIndex][f.colIndex].cellIndex), m && i.selectNodeContents(m).setCursor(!1, !0)) : (l = k.nextSibling, domUtils.remove(k), l && i.setStart(l, 0).setCursor(!1, !0)), "enabled" === k.getAttribute("interlaced") && this.fireEvent("interlacetable", k)
				}
			}, UE.commands["insertcol"] = {
				queryCommandState: function() {
					var c = b(this),
						d = c.cell;
					return d && ("TD" == d.tagName || "TH" == d.tagName && d !== c.tr.cells[0]) && e(c.table).colsNum < this.options.maxColNum ? 0 : -1
				},
				execCommand: function(a) {
					var f, g, h, i, j, k, c = this.selection.getRange(),
						d = c.createBookmark(!0);
					if (-1 != this.queryCommandState(a)) {
						if (f = b(this).cell, g = e(f), h = g.getCellInfo(f), g.selectedTds.length)
							for (i = g.cellsRange, j = 0, k = i.endColIndex - i.beginColIndex + 1; k > j; j++) g.insertCol(i.beginColIndex, f);
						else g.insertCol(h.colIndex, f);
						c.moveToBookmark(d).select(!0)
					}
				}
			}, UE.commands["insertcolnext"] = {
				queryCommandState: function() {
					var a = b(this),
						c = a.cell;
					return c && e(a.table).colsNum < this.options.maxColNum ? 0 : -1
				},
				execCommand: function() {
					var h, i, j, a = this.selection.getRange(),
						c = a.createBookmark(!0),
						d = b(this).cell,
						f = e(d),
						g = f.getCellInfo(d);
					if (f.selectedTds.length)
						for (h = f.cellsRange, i = 0, j = h.endColIndex - h.beginColIndex + 1; j > i; i++) f.insertCol(h.endColIndex + 1, d);
					else f.insertCol(g.colIndex + g.colSpan, d);
					a.moveToBookmark(c).select()
				}
			}, UE.commands["deletecol"] = {
				queryCommandState: function() {
					var a = b(this);
					return a.cell ? 0 : -1
				},
				execCommand: function() {
					var i, j, k, l, a = b(this).cell,
						c = e(a),
						d = c.cellsRange,
						f = c.getCellInfo(a),
						g = c.getHSideCell(a),
						h = c.getHSideCell(a, !0);
					if (utils.isEmptyObject(d)) c.deleteCol(f.colIndex);
					else
						for (i = d.beginColIndex; i < d.endColIndex + 1; i++) c.deleteCol(d.beginColIndex);
					j = c.table, k = this.selection.getRange(), j.getElementsByTagName("td").length ? domUtils.inDoc(a, this.document) ? k.setStart(a, 0).setCursor(!1, !0) : h && domUtils.inDoc(h, this.document) ? k.selectNodeContents(h).setCursor(!1, !0) : g && domUtils.inDoc(g, this.document) && k.selectNodeContents(g).setCursor(!0, !0) : (l = j.nextSibling, domUtils.remove(j), l && k.setStart(l, 0).setCursor(!1, !0))
				}
			}, UE.commands["splittocells"] = {
				queryCommandState: function() {
					var d, a = b(this),
						c = a.cell;
					return c ? (d = e(a.table), d.selectedTds.length > 0 ? -1 : c && (c.colSpan > 1 || c.rowSpan > 1) ? 0 : -1) : -1
				},
				execCommand: function() {
					var a = this.selection.getRange(),
						c = a.createBookmark(!0),
						d = b(this).cell,
						f = e(d);
					f.splitToCells(d), a.moveToBookmark(c).select()
				}
			}, UE.commands["splittorows"] = {
				queryCommandState: function() {
					var d, a = b(this),
						c = a.cell;
					return c ? (d = e(a.table), d.selectedTds.length > 0 ? -1 : c && c.rowSpan > 1 ? 0 : -1) : -1
				},
				execCommand: function() {
					var a = this.selection.getRange(),
						c = a.createBookmark(!0),
						d = b(this).cell,
						f = e(d);
					f.splitToRows(d), a.moveToBookmark(c).select()
				}
			}, UE.commands["splittocols"] = {
				queryCommandState: function() {
					var d, a = b(this),
						c = a.cell;
					return c ? (d = e(a.table), d.selectedTds.length > 0 ? -1 : c && c.colSpan > 1 ? 0 : -1) : -1
				},
				execCommand: function() {
					var a = this.selection.getRange(),
						c = a.createBookmark(!0),
						d = b(this).cell,
						f = e(d);
					f.splitToCols(d), a.moveToBookmark(c).select()
				}
			}, UE.commands["adaptbytext"] = UE.commands["adaptbywindow"] = {
				queryCommandState: function() {
					return b(this).table ? 0 : -1
				},
				execCommand: function(a) {
					var e, c = b(this),
						d = c.table;
					d && ("adaptbywindow" == a ? f(d, this) : (e = domUtils.getElementsByTagName(d, "td th"), utils.each(e, function(a) {
						a.removeAttribute("width")
					}), d.removeAttribute("width")))
				}
			}, UE.commands["averagedistributecol"] = {
				queryCommandState: function() {
					var a = c(this);
					return a ? a.isFullRow() || a.isFullCol() ? 0 : -1 : -1
				},
				execCommand: function() {
					function f() {
						var c, k, i, j, l, a = e.table,
							f = 0,
							g = 0,
							h = d(b, a);
						if (e.isFullRow()) f = a.offsetWidth, g = e.colsNum;
						else
							for (i = e.cellsRange.beginColIndex, j = e.cellsRange.endColIndex, l = i; j >= l;) k = e.selectedTds[l], f += k.offsetWidth, l += k.colSpan, g += 1;
						return c = Math.ceil(f / g) - 2 * h.tdBorder - 2 * h.tdPadding
					}

					function g(a) {
						utils.each(domUtils.getElementsByTagName(e.table, "th"), function(a) {
							a.setAttribute("width", "")
						});
						var b = e.isFullRow() ? domUtils.getElementsByTagName(e.table, "td") : e.selectedTds;
						utils.each(b, function(b) {
							1 == b.colSpan && b.setAttribute("width", a)
						})
					}
					var b = this,
						e = c(b);
					e && e.selectedTds.length && g(f())
				}
			}, UE.commands["averagedistributerow"] = {
				queryCommandState: function() {
					var a = c(this);
					return a ? a.selectedTds && /th/gi.test(a.selectedTds[0].tagName) ? -1 : a.isFullRow() || a.isFullCol() ? 0 : -1 : -1
				},
				execCommand: function() {
					function f() {
						var a, c, l, m, j, k, n, o, p, q, r, f = 0,
							g = e.table,
							h = d(b, g),
							i = parseInt(domUtils.getComputedStyle(g.getElementsByTagName("td")[0], "padding-top"));
						if (e.isFullCol()) j = domUtils.getElementsByTagName(g, "caption"), k = domUtils.getElementsByTagName(g, "th"), j.length > 0 && (l = j[0].offsetHeight), k.length > 0 && (m = k[0].offsetHeight), f = g.offsetHeight - (l || 0) - (m || 0), c = 0 == k.length ? e.rowsNum : e.rowsNum - 1;
						else {
							for (n = e.cellsRange.beginRowIndex, o = e.cellsRange.endRowIndex, p = 0, q = domUtils.getElementsByTagName(g, "tr"), r = n; o >= r; r++) f += q[r].offsetHeight, p += 1;
							c = p
						}
						return a = browser.ie && browser.version < 9 ? Math.ceil(f / c) : Math.ceil(f / c) - 2 * h.tdBorder - 2 * i
					}

					function g(a) {
						var b = e.isFullCol() ? domUtils.getElementsByTagName(e.table, "td") : e.selectedTds;
						utils.each(b, function(b) {
							1 == b.rowSpan && b.setAttribute("height", a)
						})
					}
					var b = this,
						e = c(b);
					e && e.selectedTds.length && g(f())
				}
			}, UE.commands["cellalignment"] = {
				queryCommandState: function() {
					return b(this).table ? 0 : -1
				},
				execCommand: function(a, b) {
					var f, g, d = this,
						e = c(d);
					e ? utils.each(e.selectedTds, function(a) {
						domUtils.setAttributes(a, b)
					}) : (f = d.selection.getStart(), g = f && domUtils.findParentByTagName(f, ["td", "th", "caption"], !0), /caption/gi.test(g.tagName) ? (g.style.textAlign = b.align, g.style.verticalAlign = b.vAlign) : domUtils.setAttributes(g, b), d.selection.getRange().setCursor(!0))
				},
				queryCommandValue: function() {
					var d, c = b(this).cell;
					return c || (c = h(this)[0]), c ? (d = UE.UETable.getUETable(c).selectedTds, !d.length && (d = c), UE.UETable.getTableCellAlignState(d)) : null
				}
			}, UE.commands["tablealignment"] = {
				queryCommandState: function() {
					return browser.ie && browser.version < 8 ? -1 : b(this).table ? 0 : -1
				},
				execCommand: function(a, b) {
					var c = this,
						d = c.selection.getStart(),
						e = d && domUtils.findParentByTagName(d, ["table"], !0);
					e && e.setAttribute("align", b)
				}
			}, UE.commands["edittable"] = {
				queryCommandState: function() {
					return b(this).table ? 0 : -1
				},
				execCommand: function(a, b) {
					var e, c = this.selection.getRange(),
						d = domUtils.findParentByTagName(c.startContainer, "table");
					d && (e = domUtils.getElementsByTagName(d, "td").concat(domUtils.getElementsByTagName(d, "th"), domUtils.getElementsByTagName(d, "caption")), utils.each(e, function(a) {
						a.style.borderColor = b
					}))
				}
			}, UE.commands["edittd"] = {
				queryCommandState: function() {
					return b(this).table ? 0 : -1
				},
				execCommand: function(a, b) {
					var f, g, d = this,
						e = c(d);
					e ? utils.each(e.selectedTds, function(a) {
						a.style.backgroundColor = b
					}) : (f = d.selection.getStart(), g = f && domUtils.findParentByTagName(f, ["td", "th", "caption"], !0), g && (g.style.backgroundColor = b))
				}
			}, UE.commands["settablebackground"] = {
				queryCommandState: function() {
					return h(this).length > 1 ? 0 : -1
				},
				execCommand: function(a, b) {
					var c, d;
					c = h(this), d = e(c[0]), d.setBackground(c, b)
				}
			}, UE.commands["cleartablebackground"] = {
				queryCommandState: function() {
					var c, b, a = h(this);
					if (!a.length) return -1;
					for (b = 0; c = a[b++];)
						if ("" !== c.style.backgroundColor) return 0;
					return -1
				},
				execCommand: function() {
					var a = h(this),
						b = e(a[0]);
					b.removeBackground(a)
				}
			}, UE.commands["interlacetable"] = UE.commands["uninterlacetable"] = {
				queryCommandState: function(a) {
					var d, c = b(this).table;
					return c ? (d = c.getAttribute("interlaced"), "interlacetable" == a ? "enabled" === d ? -1 : 0 : d && "disabled" !== d ? 0 : -1) : -1
				},
				execCommand: function(a, c) {
					var d = b(this).table;
					"interlacetable" == a ? (d.setAttribute("interlaced", "enabled"), this.fireEvent("interlacetable", d, c)) : (d.setAttribute("interlaced", "disabled"), this.fireEvent("uninterlacetable", d))
				}
			}, UE.commands["setbordervisible"] = {
				queryCommandState: function() {
					var c = b(this).table;
					return c ? 0 : -1
				},
				execCommand: function() {
					var a = b(this).table;
					utils.each(domUtils.getElementsByTagName(a, "td"), function(a) {
						a.style.borderWidth = "1px", a.style.borderStyle = "solid"
					})
				}
			}
		}(), UE.plugins["table"] = function() {
			function q() {}

			function C(a) {
				D(a, "width", !0), D(a, "height", !0)
			}

			function D(a, b, c) {
				a.style[b] && (c && a.setAttribute(b, parseInt(a.style[b], 10)), a.style[b] = "")
			}

			function E(a) {
				if ("TD" == a.tagName || "TH" == a.tagName) return a;
				var b;
				return (b = domUtils.findParentByTagName(a, "td", !0) || domUtils.findParentByTagName(a, "th", !0)) ? b : null
			}

			function F(a) {
				var c, b = new RegExp(domUtils.fillChar, "g");
				if (a[browser.ie ? "innerText" : "textContent"].replace(/^\s*$/, "").replace(b, "").length > 0) return 0;
				for (c in dtd.$isNotEmpty)
					if (a.getElementsByTagName(c).length) return 0;
				return 1
			}

			function G(b) {
				return b.pageX || b.pageY ? {
					x: b.pageX,
					y: b.pageY
				} : {
					x: b.clientX + a.document.body.scrollLeft - a.document.body.clientLeft,
					y: b.clientY + a.document.body.scrollTop - a.document.body.clientTop
				}
			}

			function H(b) {
				var d, c, e, g;
				if (!fb()) try {
					if (c = E(b.target || b.srcElement), f && (a.body.style.webkitUserSelect = "none", (Math.abs(j.x - b.clientX) > h || Math.abs(j.y - b.clientY) > h) && (Z(), f = !1, i = 0, _(b))), t && y) return i = 0, a.body.style.webkitUserSelect = "none", a.selection.getNative()[browser.ie9below ? "empty" : "removeAllRanges"](), d = G(b), O(a, !0, t, d, c), "h" == t ? x.style.left = M(y, b) + "px" : "v" == t && (x.style.top = N(y, b) + "px"), void 0;
					if (c) {
						if (a.fireEvent("excludetable", c) === !0) return;
						if (d = G(b), e = S(c, d), g = domUtils.findParentByTagName(c, "table", !0), L(g, c, b, !0)) {
							if (a.fireEvent("excludetable", g) === !0) return;
							a.body.style.cursor = "url(" + a.options.cursorpath + "h.png),pointer"
						} else if (L(g, c, b)) {
							if (a.fireEvent("excludetable", g) === !0) return;
							a.body.style.cursor = "url(" + a.options.cursorpath + "v.png),pointer"
						} else a.body.style.cursor = "text", /\d/.test(e) && (e = e.replace(/\d/, ""), c = m(c).getPreviewCell(c, "v" == e)), O(a, c ? !!e : !1, c ? e : "", d, c)
					} else J(!1, g, a)
				} catch (l) {
					q(l)
				}
			}

			function J(a, b, c) {
				if (a) K(b, c);
				else {
					if (w) return;
					I = setTimeout(function() {
						!w && v && v.parentNode && v.parentNode.removeChild(v)
					}, 2e3)
				}
			}

			function K(a, b) {
				function f(c, d) {
					clearTimeout(e), e = setTimeout(function() {
						b.fireEvent("tableClicked", a, d)
					}, 300)
				}

				function g() {
					clearTimeout(e);
					var d = m(a),
						f = a.rows[0].cells[0],
						g = d.getLastCell(),
						h = d.getCellsRange(f, g);
					b.selection.getRange().setStart(f, 0).setCursor(!1, !0), d.setSelected(h)
				}
				var e, c = domUtils.getXY(a),
					d = a.ownerDocument;
				return v && v.parentNode ? v : (v = d.createElement("div"), v.contentEditable = !1, v.innerHTML = "", v.style.cssText = "width:15px;height:15px;background-image:url(" + b.options.UEDITOR_HOME_URL + "dialogs/table/dragicon.png);position: absolute;cursor:move;top:" + (c.y - 15) + "px;left:" + c.x + "px;", domUtils.unSelectable(v), v.onmouseover = function() {
					w = !0
				}, v.onmouseout = function() {
					w = !1
				}, domUtils.on(v, "click", function(a, b) {
					f(b, this)
				}), domUtils.on(v, "dblclick", function(a, b) {
					g(b)
				}), domUtils.on(v, "dragstart", function(a, b) {
					domUtils.preventDefault(b)
				}), d.body.appendChild(v), void 0)
			}

			function L(a, b, c, d) {
				var g, h, e = G(c),
					f = S(b, e);
				return d ? (g = a.getElementsByTagName("caption")[0], h = g ? g.offsetHeight : 0, "v1" == f && e.y - domUtils.getXY(a).y - h < 8) : "h1" == f && e.x - domUtils.getXY(a).x < 8
			}

			function M(b, c) {
				var f, g, h, i, j, d = m(b);
				return d ? (f = d.getSameEndPosCells(b, "x")[0], g = d.getSameStartPosXCells(b)[0], h = G(c).x, i = (f ? domUtils.getXY(f).x : domUtils.getXY(d.table).x) + 20, j = g ? domUtils.getXY(g).x + g.offsetWidth - 20 : a.body.offsetWidth + 5 || parseInt(domUtils.getComputedStyle(a.body, "width"), 10), i += e, j -= e, i > h ? i : h > j ? j : h) : void 0
			}

			function N(a, b) {
				try {
					var c = domUtils.getXY(a).y,
						d = G(b).y;
					return c > d ? c : d
				} catch (e) {
					q(e)
				}
			}

			function O(a, b, c, d, e) {
				try {
					a.body.style.cursor = "h" == c ? "col-resize" : "v" == c ? "row-resize" : "text", browser.ie && (!c || z || n(a) ? ob(a) : (nb(a, a.document), pb(c, e))), u = b
				} catch (f) {
					q(f)
				}
			}

			function S(a, b) {
				var c = domUtils.getXY(a);
				return c ? c.x + a.offsetWidth - b.x < g ? "h" : b.x - c.x < g ? "h1" : c.y + a.offsetHeight - b.y < g ? "v" : b.y - c.y < g ? "v1" : "" : ""
			}

			function T(b, c) {
				var d, e, f;
				fb() || (j = {
					x: c.clientX,
					y: c.clientY
				}, 2 == c.button ? (d = n(a), e = !1, d && (f = sb(a, c), utils.each(d.selectedTds, function(a) {
					a === f && (e = !0)
				}), e ? (f = d.selectedTds[0], setTimeout(function() {
					a.selection.getRange().setStart(f, 0).setCursor(!1, !0)
				}, 0)) : (p(domUtils.getElementsByTagName(a.body, "th td")), d.clearSelected()))) : W(c))
			}

			function V(b) {
				var c, d, e, f, g, h, j, k;
				i = 0, b = b || a.window.event, c = E(b.target || b.srcElement), c && (d = S(c, G(b))) && (ob(a), "h1" == d && (d = "h", L(domUtils.findParentByTagName(c, "table"), c, b) ? a.execCommand("adaptbywindow") : (c = m(c).getPreviewCell(c), c && (e = a.selection.getRange(), e.selectNodeContents(c).setCursor(!0, !0)))), "h" == d && (f = m(c), g = f.table, h = hb(c, g, !0), h = Y(h, "left"), f.width = f.offsetWidth, j = [], k = [], utils.each(h, function(a) {
					j.push(a.offsetWidth)
				}), utils.each(h, function(a) {
					a.removeAttribute("width")
				}), window.setTimeout(function() {
					var b, a = !0;
					utils.each(h, function(b, c) {
						var d = b.offsetWidth;
						return d > j[c] ? (a = !1, !1) : (k.push(d), void 0)
					}), b = a ? k : j, utils.each(h, function(a, c) {
						a.width = b[c] - mb()
					})
				}, 0)))
			}

			function W(b) {
				if (p(domUtils.getElementsByTagName(a.body, "td th")), utils.each(a.document.getElementsByTagName("table"), function(a) {
						a.ueTable = null
					}), r = sb(a, b)) {
					var c = domUtils.findParentByTagName(r, "table", !0);
					ut = m(c), ut && ut.clearSelected(), u ? X(b) : (a.document.body.style.webkitUserSelect = "", z = !0, a.addListener("mouseover", bb))
				}
			}

			function X(a) {
				browser.ie && (a = $(a)), Z(), f = !0, c = setTimeout(function() {
					_(a)
				}, k)
			}

			function Y(a, b) {
				var e, f, c = [],
					d = null;
				for (e = 0, f = a.length; f > e; e++) d = a[e][b], d && c.push(d);
				return c
			}

			function Z() {
				c && clearTimeout(c), c = null
			}

			function $(a) {
				var e, f, d, b = ["pageX", "pageY", "clientX", "clientY", "srcElement", "target"],
					c = {};
				if (a)
					for (d = 0; e = b[d]; d++) f = a[e], f && (c[e] = f);
				return c
			}

			function _(b) {
				if (f = !1, r = b.target || b.srcElement) {
					var c = S(r, G(b));
					/\d/.test(c) && (c = c.replace(/\d/, ""), r = m(r).getPreviewCell(r, "v" == c)), ob(a), nb(a, a.document), a.fireEvent("saveScene"), pb(c, r), z = !0, t = c, y = r
				}
			}

			function ab(a, b) {
				var c, e, g, h, l, n, o, p, q;
				if (!fb()) {
					if (Z(), f = !1, u && (i = ++i % 3, j = {
							x: b.clientX,
							y: b.clientY
						}, d = setTimeout(function() {
							i > 0 && i--
						}, k), 2 === i)) return i = 0, V(b), void 0;
					if (2 != b.button) {
						if (c = this, e = c.selection.getRange(), g = domUtils.findParentByTagName(e.startContainer, "table", !0), h = domUtils.findParentByTagName(e.endContainer, "table", !0), (g || h) && (g === h ? (g = domUtils.findParentByTagName(e.startContainer, ["td", "th", "caption"], !0), h = domUtils.findParentByTagName(e.endContainer, ["td", "th", "caption"], !0), g !== h && c.selection.clearRange()) : c.selection.clearRange()), z = !1, c.document.body.style.webkitUserSelect = "", t && y && (c.selection.getNative()[browser.ie9below ? "empty" : "removeAllRanges"](), i = 0, x = c.document.getElementById("ue_tableDragLine"))) {
							switch (l = domUtils.getXY(y), n = domUtils.getXY(x), t) {
								case "h":
									eb(y, n.x - l.x);
									break;
								case "v":
									gb(y, n.y - l.y - y.offsetHeight)
							}
							return t = "", y = null, ob(c), c.fireEvent("saveScene"), void 0
						}
						if (r) p = m(r), q = p ? p.selectedTds[0] : null, q ? (e = new dom.Range(c.document), domUtils.isEmptyBlock(q) ? e.setStart(q, 0).setCursor(!1, !0) : e.selectNodeContents(q).shrinkBoundary().setCursor(!1, !0)) : (e = c.selection.getRange().shrinkBoundary(), e.collapsed || (g = domUtils.findParentByTagName(e.startContainer, ["td", "th"], !0), h = domUtils.findParentByTagName(e.endContainer, ["td", "th"], !0), (g && !h || !g && h || g && h && g !== h) && e.setCursor(!1, !0))), r = null, c.removeListener("mouseover", bb);
						else if (o = domUtils.findParentByTagName(b.target || b.srcElement, "td", !0), o || (o = domUtils.findParentByTagName(b.target || b.srcElement, "th", !0)), o && ("TD" == o.tagName || "TH" == o.tagName)) {
							if (c.fireEvent("excludetable", o) === !0) return;
							e = new dom.Range(c.document), e.setStart(o, 0).setCursor(!1, !0)
						}
						c._selectionChange(250, b)
					}
				}
			}

			function bb(a, b) {
				var c, d, e, f;
				fb() || (c = this, d = b.target || b.srcElement, s = domUtils.findParentByTagName(d, "td", !0) || domUtils.findParentByTagName(d, "th", !0), r && s && ("TD" == r.tagName && "TD" == s.tagName || "TH" == r.tagName && "TH" == s.tagName) && domUtils.findParentByTagName(r, "table") == domUtils.findParentByTagName(s, "table") && (e = m(s), r != s ? (c.document.body.style.webkitUserSelect = "none", c.selection.getNative()[browser.ie9below ? "empty" : "removeAllRanges"](), f = e.getCellsRange(r, s), e.setSelected(f)) : (c.document.body.style.webkitUserSelect = "", e.clearSelected())), b.preventDefault ? b.preventDefault() : b.returnValue = !1)
			}

			function cb(a, b, c) {
				var d = parseInt(domUtils.getComputedStyle(a, "line-height"), 10),
					e = c + b;
				b = d > e ? d : e, a.style.height && (a.style.height = ""), 1 == a.rowSpan ? a.setAttribute("height", b) : a.removeAttribute && a.removeAttribute("height")
			}

			function eb(a, b) {
				var d, e, c = m(a);
				c && (d = c.table, e = hb(a, d), d.style.width = "", d.removeAttribute("width"), b = jb(b, a, e), a.nextSibling ? utils.each(e, function(a) {
					a.left.width = +a.left.width + b, a.right && (a.right.width = +a.right.width - b)
				}) : utils.each(e, function(a) {
					a.left.width -= -b
				}))
			}

			function fb() {
				return "false" === a.body.contentEditable
			}

			function gb(a, b) {
				var c, d, e, g, f;
				if (!(Math.abs(b) < 10) && (c = m(a)))
					for (d = c.getSameEndPosCells(a, "y"), e = d[0] ? d[0].offsetHeight : 0, f = 0; g = d[f++];) cb(g, b, e)
			}

			function hb(a, b, c) {
				var e, f, g, h;
				if (b || (b = domUtils.findParentByTagName(a, "table")), !b) return null;
				for (domUtils.getNodeIndex(a), e = a, f = b.rows, g = 0; e;) 1 === e.nodeType && (g += e.colSpan || 1), e = e.previousSibling;
				return e = null, h = [], utils.each(f, function(a) {
					var b = a.cells,
						d = 0;
					utils.each(b, function(a) {
						return d += a.colSpan || 1, d === g ? (h.push({
							left: a,
							right: a.nextSibling || null
						}), !1) : d > g ? (c && h.push({
							left: a
						}), !1) : void 0
					})
				}), h
			}

			function jb(a, b, c) {
				if (a -= mb(), 0 > a) return 0;
				a -= kb(b);
				var d = 0 > a ? "left" : "right";
				return a = Math.abs(a), utils.each(c, function(b) {
					var c = b[d];
					c && (a = Math.min(a, kb(c) - e))
				}), a = 0 > a ? 0 : a, "left" === d ? -a : a
			}

			function kb(a) {
				var b = 0,
					b = a.offsetWidth - mb();
				a.nextSibling || (b -= lb(a)), b = 0 > b ? 0 : b;
				try {
					a.width = b
				} catch (d) {}
				return b
			}

			function lb(a) {
				if (tab = domUtils.findParentByTagName(a, "table", !1), void 0 === tab.offsetVal) {
					var b = a.previousSibling;
					tab.offsetVal = b ? a.offsetWidth - b.offsetWidth === l.borderWidth ? l.borderWidth : 0 : 0
				}
				return tab.offsetVal
			}

			function mb() {
				var c, d, e, f, g, h;
				return void 0 === l.tabcellSpace && (c = a.document.createElement("table"), d = a.document.createElement("tbody"), e = a.document.createElement("tr"), f = a.document.createElement("td"), g = null, f.style.cssText = "border: 0;", f.width = 1, e.appendChild(f), e.appendChild(g = f.cloneNode(!1)), d.appendChild(e), c.appendChild(d), c.style.cssText = "visibility: hidden;", a.body.appendChild(c), l.paddingSpace = f.offsetWidth - 1, h = c.offsetWidth, f.style.cssText = "", g.style.cssText = "", l.borderWidth = (c.offsetWidth - h) / 3, l.tabcellSpace = l.paddingSpace + l.borderWidth, a.body.removeChild(c)), mb = function() {
					return l.tabcellSpace
				}, l.tabcellSpace
			}

			function nb(a) {
				z || (x = a.document.createElement("div"), domUtils.setAttributes(x, {
					id: "ue_tableDragLine",
					unselectable: "on",
					contenteditable: !1,
					onresizestart: "return false",
					ondragstart: "return false",
					onselectstart: "return false",
					style: "background-color:blue;position:absolute;padding:0;margin:0;background-image:none;border:0px none;opacity:0;filter:alpha(opacity=0)"
				}), a.body.appendChild(x))
			}

			function ob(a) {
				if (!z)
					for (var b; b = a.document.getElementById("ue_tableDragLine");) domUtils.remove(b)
			}

			function pb(a, b) {
				if (b) {
					var i, c = domUtils.findParentByTagName(b, "table"),
						d = c.getElementsByTagName("caption"),
						e = c.offsetWidth,
						f = c.offsetHeight - (d.length > 0 ? d[0].offsetHeight : 0),
						g = domUtils.getXY(c),
						h = domUtils.getXY(b);
					switch (a) {
						case "h":
							i = "height:" + f + "px;top:" + (g.y + (d.length > 0 ? d[0].offsetHeight : 0)) + "px;left:" + (h.x + b.offsetWidth), x.style.cssText = i + "px;position: absolute;display:block;background-color:blue;width:1px;border:0; color:blue;opacity:.3;filter:alpha(opacity=30)";
							break;
						case "v":
							i = "width:" + e + "px;left:" + g.x + "px;top:" + (h.y + b.offsetHeight), x.style.cssText = i + "px;overflow:hidden;position: absolute;display:block;background-color:blue;height:1px;border:0;color:blue;opacity:.2;filter:alpha(opacity=20)"
					}
				}
			}

			function qb(a, b) {
				var d, f, e, g, c = domUtils.getElementsByTagName(a.body, "table");
				for (e = 0; f = c[e++];) g = domUtils.getElementsByTagName(f, "td"), g[0] && (b ? (d = g[0].style.borderColor.replace(/\s/g, ""), /(#ffffff)|(rgb\(255,255,255\))/gi.test(d) && domUtils.addClass(f, "noBorderTable")) : domUtils.removeClasses(f, "noBorderTable"))
			}

			function rb(a, b, c) {
				var d = a.body;
				return d.offsetWidth - (b ? 2 * parseInt(domUtils.getComputedStyle(d, "margin-left"), 10) : 0) - 2 * c.tableBorder - (a.options.offsetWidth || 0)
			}

			function sb(a, b) {
				var e, f, g, c = domUtils.findParentByTagName(b.target || b.srcElement, ["td", "th"], !0),
					d = null;
				return c ? (d = S(c, G(b)), c ? ("h1" === d && c.previousSibling ? (e = domUtils.getXY(c), f = c.offsetWidth, Math.abs(e.x + f - b.clientX) > f / 3 && (c = c.previousSibling)) : "v1" === d && c.parentNode.previousSibling && (e = domUtils.getXY(c), g = c.offsetHeight, Math.abs(e.y + g - b.clientY) > g / 3 && (c = c.parentNode.previousSibling.firstChild)), c && a.fireEvent("excludetable", c) !== !0 ? c : null) : null) : null
			}
			var r, s, t, u, v, w, x, y, z, A, B, I, a = this,
				c = null,
				d = null,
				e = 5,
				f = !1,
				g = 5,
				h = 10,
				i = 0,
				j = null,
				k = 360,
				l = UE.UETable,
				m = function(a) {
					return l.getUETable(a)
				},
				n = function(a) {
					return l.getUETableBySelected(a)
				},
				o = function(a, b) {
					return l.getDefaultValue(a, b)
				},
				p = function(a) {
					return l.removeSelectedClass(a)
				};
			a.ready(function() {
				var a = this,
					b = a.selection.getText;
				a.selection.getText = function() {
					var d, c = n(a);
					return c ? (d = "", utils.each(c.selectedTds, function(a) {
						d += a[browser.ie ? "innerText" : "textContent"]
					}), d) : b.call(a.selection)
				}
			}), r = null, s = null, t = "", u = !1, v = null, w = !1, x = null, y = null, z = !1, A = !0, a.setOpt({
				maxColNum: 20,
				maxRowNum: 100,
				defaultCols: 5,
				defaultRows: 5,
				tdvalign: "top",
				cursorpath: a.options.UEDITOR_HOME_URL + "themes/default/images/cursor_",
				tableDragable: !1,
				classList: ["ue-table-interlace-color-single", "ue-table-interlace-color-double"]
			}), a.getUETable = m, B = {
				deletetable: 1,
				inserttable: 1,
				cellvalign: 1,
				insertcaption: 1,
				deletecaption: 1,
				inserttitle: 1,
				deletetitle: 1,
				mergeright: 1,
				mergedown: 1,
				mergecells: 1,
				insertrow: 1,
				insertrownext: 1,
				deleterow: 1,
				insertcol: 1,
				insertcolnext: 1,
				deletecol: 1,
				splittocells: 1,
				splittorows: 1,
				splittocols: 1,
				adaptbytext: 1,
				adaptbywindow: 1,
				adaptbycustomer: 1,
				insertparagraph: 1,
				insertparagraphbeforetable: 1,
				averagedistributecol: 1,
				averagedistributerow: 1
			}, a.ready(function() {
				var b, c, d, e, f, g;
				utils.cssRule("table", ".selectTdClass{background-color:#edf5fa !important}table.noBorderTable td,table.noBorderTable th,table.noBorderTable caption{border:1px dashed #ddd !important}table{margin-bottom:10px;border-collapse:collapse;display:table;}td,th{padding: 5px 10px;border: 1px solid #DDD;}caption{border:1px dashed #DDD;border-bottom:0;padding:3px;text-align:center;}th{border-top:1px solid #BBB;background-color:#F7F7F7;}table tr.firstRow th{border-top-width:2px;}.ue-table-interlace-color-single{ background-color: #fcfcfc; } .ue-table-interlace-color-double{ background-color: #f7faff; }td p{margin:0;padding:0;}", a.document), a.addListener("keydown", function(a, e) {
					var h, i, j, k, m, l, o, p, q, r, s, t, f = this,
						g = e.keyCode || e.which;
					if (8 == g && (h = n(f), h && h.selectedTds.length && (h.isFullCol() ? f.execCommand("deletecol") : h.isFullRow() ? f.execCommand("deleterow") : f.fireEvent("delcells"), domUtils.preventDefault(e)), i = domUtils.findParentByTagName(f.selection.getStart(), "caption", !0), j = f.selection.getRange(), j.collapsed && i && F(i) && (f.fireEvent("saveScene"), k = i.parentNode, domUtils.remove(i), k && j.setStart(k.rows[0].cells[0], 0).setCursor(!1, !0), f.fireEvent("saveScene"))), 46 == g && (h = n(f))) {
						for (f.fireEvent("saveScene"), l = 0; m = h.selectedTds[l++];) domUtils.fillNode(f.document, m);
						f.fireEvent("saveScene"), domUtils.preventDefault(e)
					}
					if (13 == g) {
						if (o = f.selection.getRange(), i = domUtils.findParentByTagName(o.startContainer, "caption", !0)) return k = domUtils.findParentByTagName(i, "table"), o.collapsed ? i && o.setStart(k.rows[0].cells[0], 0).setCursor(!1, !0) : (o.deleteContents(), f.fireEvent("saveScene")), domUtils.preventDefault(e), void 0;
						o.collapsed && (k = domUtils.findParentByTagName(o.startContainer, "table"), k && (p = k.rows[0].cells[0], q = domUtils.findParentByTagName(f.selection.getStart(), ["td", "th"], !0), r = k.previousSibling, p === q && (!r || 1 == r.nodeType && "TABLE" == r.tagName) && domUtils.isStartInblock(o) && (s = domUtils.findParent(f.selection.getStart(), function(a) {
							return domUtils.isBlockElm(a)
						}, !0), s && (/t(h|d)/i.test(s.tagName) || s === q.firstChild) && (f.execCommand("insertparagraphbeforetable"), domUtils.preventDefault(e)))))
					}
					if ((e.ctrlKey || e.metaKey) && "67" == e.keyCode && (b = null, h = n(f)))
						for (t = h.selectedTds, c = h.isFullCol(), d = h.isFullRow(), b = [
								[h.cloneCell(t[0], null, !0)]
							], l = 1; m = t[l]; l++) m.parentNode !== t[l - 1].parentNode ? b.push([h.cloneCell(m, null, !0)]) : b[b.length - 1].push(h.cloneCell(m, null, !0))
				}), a.addListener("tablehasdeleted", function() {
					O(this, !1, "", null), v && domUtils.remove(v)
				}), a.addListener("beforepaste", function(a, e) {
					var h, i, k, p, j, q, r, t, s, u, w, v, x, y, z, B, D, E, G, f = this,
						g = f.selection.getRange();
					if (domUtils.findParentByTagName(g.startContainer, "caption", !0)) return h = f.document.createElement("div"), h.innerHTML = e.html, e.html = h[browser.ie9below ? "innerText" : "textContent"], void 0;
					if (i = n(f), b) {
						if (f.fireEvent("saveScene"), g = f.selection.getRange(), j = domUtils.findParentByTagName(g.startContainer, ["td", "th"], !0)) {
							if (q = m(j), d)
								for (r = q.getCellInfo(j).rowIndex, "TH" == j.tagName && r++, s = 0; t = b[s++];) {
									for (u = q.insertRow(r++, "td"), v = 0; w = t[v]; v++) x = u.cells[v], x || (x = u.insertCell(v)), x.innerHTML = w.innerHTML, w.getAttribute("width") && x.setAttribute("width", w.getAttribute("width")), w.getAttribute("vAlign") && x.setAttribute("vAlign", w.getAttribute("vAlign")), w.getAttribute("align") && x.setAttribute("align", w.getAttribute("align")), w.style.cssText && (x.style.cssText = w.style.cssText);
									for (v = 0;
										(w = u.cells[v]) && t[v]; v++) w.innerHTML = t[v].innerHTML, t[v].getAttribute("width") && w.setAttribute("width", t[v].getAttribute("width")), t[v].getAttribute("vAlign") && w.setAttribute("vAlign", t[v].getAttribute("vAlign")), t[v].getAttribute("align") && w.setAttribute("align", t[v].getAttribute("align")), t[v].style.cssText && (w.style.cssText = t[v].style.cssText)
								} else {
									if (c) {
										for (B = q.getCellInfo(j), y = 0, v = 0, t = b[0]; w = t[v++];) y += w.colSpan || 1;
										for (f.__hasEnterExecCommand = !0, s = 0; y > s; s++) f.execCommand("insertcol");
										f.__hasEnterExecCommand = !1, j = q.table.rows[0].cells[B.cellIndex], "TH" == j.tagName && (j = q.table.rows[1].cells[B.cellIndex])
									}
									for (s = 0; t = b[s++];) {
										for (k = j, v = 0; w = t[v++];) j ? (j.innerHTML = w.innerHTML, w.getAttribute("width") && j.setAttribute("width", w.getAttribute("width")), w.getAttribute("vAlign") && j.setAttribute("vAlign", w.getAttribute("vAlign")), w.getAttribute("align") && j.setAttribute("align", w.getAttribute("align")), w.style.cssText && (j.style.cssText = w.style.cssText), p = j, j = j.nextSibling) : (z = w.cloneNode(!0), domUtils.removeAttributes(z, ["class", "rowSpan", "colSpan"]), p.parentNode.appendChild(z));
										if (j = q.getNextCell(k, !0, !0), !b[s]) break;
										j || (B = q.getCellInfo(k), q.table.insertRow(q.table.rows.length), q.update(), j = q.getVSideCell(k, !0))
									}
								}
							q.update()
						} else {
							for (i = f.document.createElement("table"), s = 0; t = b[s++];) {
								for (u = i.insertRow(i.rows.length), v = 0; w = t[v++];) z = l.cloneCell(w, null, !0), domUtils.removeAttributes(z, ["class"]), u.appendChild(z);
								2 == v && z.rowSpan > 1 && (z.rowSpan = 1)
							}
							D = o(f), E = f.body.offsetWidth - (A ? 2 * parseInt(domUtils.getComputedStyle(f.body, "margin-left"), 10) : 0) - 2 * D.tableBorder - (f.options.offsetWidth || 0), f.execCommand("insertHTML", "<table  " + (c && d ? 'width="' + E + '"' : "") + ">" + i.innerHTML.replace(/>\s*</g, "><").replace(/\bth\b/gi, "td") + "</table>")
						}
						return f.fireEvent("contentchange"), f.fireEvent("saveScene"), e.html = "", !0
					}
					h = f.document.createElement("div"), h.innerHTML = e.html, G = h.getElementsByTagName("table"), domUtils.findParentByTagName(f.selection.getStart(), "table") ? (utils.each(G, function(a) {
						domUtils.remove(a)
					}), domUtils.findParentByTagName(f.selection.getStart(), "caption", !0) && (h.innerHTML = h[browser.ie ? "innerText" : "textContent"])) : utils.each(G, function(a) {
						C(a, !0), domUtils.removeAttributes(a, ["style", "border"]), utils.each(domUtils.getElementsByTagName(a, "td"), function(a) {
							F(a) && domUtils.fillNode(f.document, a), C(a, !0)
						})
					}), e.html = h.innerHTML
				}), a.addListener("afterpaste", function() {
					utils.each(domUtils.getElementsByTagName(a.body, "table"), function(b) {
						if (b.offsetWidth > a.body.offsetWidth) {
							var c = o(a, b);
							b.style.width = a.body.offsetWidth - (A ? 2 * parseInt(domUtils.getComputedStyle(a.body, "margin-left"), 10) : 0) - 2 * c.tableBorder - (a.options.offsetWidth || 0) + "px"
						}
					})
				}), a.addListener("blur", function() {
					b = null
				}), a.addListener("keydown", function() {
					clearTimeout(e), e = setTimeout(function() {
						var d, b = a.selection.getRange(),
							c = domUtils.findParentByTagName(b.startContainer, ["th", "td"], !0);
						c && (d = c.parentNode.parentNode.parentNode, d.offsetWidth > d.getAttribute("width") && (c.style.wordBreak = "break-all"))
					}, 100)
				}), a.addListener("selectionchange", function() {
					O(a, !1, "", null)
				}), a.addListener("contentchange", function() {
					var b, c, a = this;
					ob(a), n(a) || (b = a.selection.getRange(), c = b.startContainer, c = domUtils.findParentByTagName(c, ["td", "th"], !0), utils.each(domUtils.getElementsByTagName(a.document, "table"), function(b) {
						a.fireEvent("excludetable", b) !== !0 && (b.ueTable = new l(b), b.onmouseover = function() {
							a.fireEvent("tablemouseover", b)
						}, b.onmousemove = function() {
							a.fireEvent("tablemousemove", b), a.options.tableDragable && J(!0, this, a), utils.defer(function() {
								a.fireEvent("contentchange", 50)
							}, !0)
						}, b.onmouseout = function() {
							a.fireEvent("tablemouseout", b), O(a, !1, "", null), ob(a)
						}, b.onclick = function(b) {
							var c, g, d, e, f, h, i, j;
							return b = a.window.event || b, (c = E(b.target || b.srcElement)) ? (d = m(c), e = d.table, f = d.getCellInfo(c), h = a.selection.getRange(), L(e, c, b, !0) ? (i = d.getCell(d.indexTable[d.rowsNum - 1][f.colIndex].rowIndex, d.indexTable[d.rowsNum - 1][f.colIndex].cellIndex), b.shiftKey && d.selectedTds.length ? d.selectedTds[0] !== i ? (g = d.getCellsRange(d.selectedTds[0], i), d.setSelected(g)) : h && h.selectNodeContents(i).select() : c !== i ? (g = d.getCellsRange(c, i), d.setSelected(g)) : h && h.selectNodeContents(i).select(), void 0) : (L(e, c, b) && (j = d.getCell(d.indexTable[f.rowIndex][d.colsNum - 1].rowIndex, d.indexTable[f.rowIndex][d.colsNum - 1].cellIndex), b.shiftKey && d.selectedTds.length ? d.selectedTds[0] !== j ? (g = d.getCellsRange(d.selectedTds[0], j), d.setSelected(g)) : h && h.selectNodeContents(j).select() : c !== j ? (g = d.getCellsRange(c, j), d.setSelected(g)) : h && h.selectNodeContents(j).select()), void 0)) : void 0
						})
					}), qb(a, !0))
				}), domUtils.on(a.document, "mousemove", H), domUtils.on(a.document, "mouseout", function(b) {
					var c = b.target || b.srcElement;
					"TABLE" == c.tagName && O(a, !1, "", null)
				}), a.addListener("interlacetable", function(a, b, c) {
					var d, e, f, g, h;
					if (b)
						for (d = this, e = b.rows, f = e.length, g = function(a, b, c) {
								return a[b] ? a[b] : c ? a[b % a.length] : ""
							}, h = 0; f > h; h++) e[h].className = g(c || d.options.classList, h, !0)
				}), a.addListener("uninterlacetable", function(a, b) {
					var c, d, e, f, g;
					if (b)
						for (c = this, d = b.rows, e = c.options.classList, f = d.length, g = 0; f > g; g++) domUtils.removeClasses(d[g], e)
				}), a.addListener("mousedown", T), a.addListener("mouseup", ab), domUtils.on(a.body, "dragstart", function(b) {
					ab.call(a, "dragstart", b)
				}), a.addOutputRule(function(a) {
					utils.each(a.getNodesByTagName("div"), function(a) {
						"ue_tableDragLine" == a.getAttr("id") && a.parentNode.removeChild(a)
					})
				}), f = 0, a.addListener("mousedown", function() {
					f = 0
				}), a.addListener("tabkeydown", function() {
					var e, g, h, b = this.selection.getRange(),
						c = b.getCommonAncestor(!0, !0),
						d = domUtils.findParentByTagName(c, "table");
					return d ? (domUtils.findParentByTagName(c, "caption", !0) ? (e = domUtils.getElementsByTagName(d, "th td"), e && e.length && b.setStart(e[0], 0).setCursor(!1, !0)) : (e = domUtils.findParentByTagName(c, ["td", "th"], !0), g = m(e), f = e.rowSpan > 1 ? f : g.getCellInfo(e).rowIndex, h = g.getTabNextCell(e, f), h ? F(h) ? b.setStart(h, 0).setCursor(!1, !0) : b.selectNodeContents(h).select() : (a.fireEvent("saveScene"), a.__hasEnterExecCommand = !0, this.execCommand("insertrownext"), a.__hasEnterExecCommand = !1, b = this.selection.getRange(), b.setStart(d.rows[d.rows.length - 1].cells[0], 0).setCursor(), a.fireEvent("saveScene"))), !0) : void 0
				}), browser.ie && a.addListener("selectionchange", function() {
					O(this, !1, "", null)
				}), a.addListener("keydown", function(a, b) {
					var e, f, c = this,
						d = b.keyCode || b.which;
					8 != d && 46 != d && (e = !(b.ctrlKey || b.metaKey || b.shiftKey || b.altKey), e && p(domUtils.getElementsByTagName(c.body, "td")), f = n(c), f && e && f.clearSelected())
				}), a.addListener("beforegetcontent", function() {
					qb(this, !1), browser.ie && utils.each(this.document.getElementsByTagName("caption"), function(a) {
						domUtils.isEmptyNode(a) && (a.innerHTML = "&nbsp;")
					})
				}), a.addListener("aftergetcontent", function() {
					qb(this, !0)
				}), a.addListener("getAllHtml", function() {
					p(a.document.getElementsByTagName("td"))
				}), a.addListener("fullscreenchanged", function(b, c) {
					if (!c) {
						var d = this.body.offsetWidth / document.body.offsetWidth,
							e = domUtils.getElementsByTagName(this.body, "table");
						utils.each(e, function(b) {
							var c, e, g, f;
							if (b.offsetWidth < a.body.offsetWidth) return !1;
							for (c = domUtils.getElementsByTagName(b, "td"), e = [], utils.each(c, function(a) {
									e.push(a.offsetWidth)
								}), f = 0; g = c[f]; f++) g.setAttribute("width", Math.floor(e[f] * d));
							b.setAttribute("width", Math.floor(rb(a, A, o(a))))
						})
					}
				}), g = a.execCommand, a.execCommand = function(a) {
					var f, j, e, h, i, m, o, k, l, q, p, c = this;
					if (a = a.toLowerCase(), e = n(c), h = new dom.Range(c.document), i = c.commands[a] || UE.commands[a], i) {
						if (!e || B[a] || i.notNeedUndo || c.__hasEnterExecCommand) j = g.apply(c, arguments);
						else {
							for (c.__hasEnterExecCommand = !0, c.fireEvent("beforeexeccommand", a), f = e.selectedTds, k = -2, l = -2, p = 0; q = f[p]; p++) F(q) ? h.setStart(q, 0).setCursor(!1, !0) : h.selectNode(q).select(!0), o = c.queryCommandState(a), m = c.queryCommandValue(a), -1 != o && ((k !== o || l !== m) && (c._ignoreContentChange = !0, j = g.apply(c, arguments), c._ignoreContentChange = !1), k = c.queryCommandState(a), l = c.queryCommandValue(a), domUtils.isEmptyBlock(q) && domUtils.fillNode(c.document, q));
							h.setStart(f[0], 0).shrinkBoundary(!0).setCursor(!1, !0), c.fireEvent("contentchange"), c.fireEvent("afterexeccommand", a), c.__hasEnterExecCommand = !1, c._selectionChange()
						}
						return j
					}
				}
			})
		}, UE.UETable.prototype.sortTable = function(a, b) {
			var h, i, j, k, l, m, n, c = this.table,
				d = c.rows,
				e = [],
				f = "TH" === d[0].cells[0].tagName,
				g = 0;
			if (this.selectedTds.length) {
				for (h = this.cellsRange, i = h.endRowIndex + 1, j = h.beginRowIndex; i > j; j++) e[j] = d[j];
				e.splice(0, h.beginRowIndex), g = h.endRowIndex + 1 === this.rowsNum ? 0 : h.endRowIndex + 1
			} else
				for (j = 0, i = d.length; i > j; j++) e[j] = d[j];
			for (k = {
					reversecurrent: function() {
						return 1
					},
					orderbyasc: function(a, b) {
						var c = a.innerText || a.textContent,
							d = b.innerText || b.textContent;
						return c.localeCompare(d)
					},
					reversebyasc: function(a, b) {
						var c = a.innerHTML,
							d = b.innerHTML;
						return d.localeCompare(c)
					},
					orderbynum: function(a, b) {
						var c = a[browser.ie ? "innerText" : "textContent"].match(/\d+/),
							d = b[browser.ie ? "innerText" : "textContent"].match(/\d+/);
						return c && (c = +c[0]), d && (d = +d[0]), (c || 0) - (d || 0)
					},
					reversebynum: function(a, b) {
						var c = a[browser.ie ? "innerText" : "textContent"].match(/\d+/),
							d = b[browser.ie ? "innerText" : "textContent"].match(/\d+/);
						return c && (c = +c[0]), d && (d = +d[0]), (d || 0) - (c || 0)
					}
				}, c.setAttribute("data-sort-type", b && "string" == typeof b && k[b] ? b : ""), f && e.splice(0, 1), e = utils.sort(e, function(c, d) {
					var e;
					return e = b && "function" == typeof b ? b.call(this, c.cells[a], d.cells[a]) : b && "number" == typeof b ? 1 : b && "string" == typeof b && k[b] ? k[b].call(this, c.cells[a], d.cells[a]) : k["orderbyasc"].call(this, c.cells[a], d.cells[a])
				}), l = c.ownerDocument.createDocumentFragment(), m = 0, i = e.length; i > m; m++) l.appendChild(e[m]);
			n = c.getElementsByTagName("tbody")[0], g ? n.insertBefore(l, d[g - h.endRowIndex + h.beginRowIndex - 1]) : n.appendChild(l)
		}, UE.plugins["tablesort"] = function() {
			var a = this,
				b = UE.UETable,
				c = function(a) {
					return b.getUETable(a)
				},
				d = function(a) {
					return b.getTableItemsByRange(a)
				};
			a.ready(function() {
				utils.cssRule("tablesort", "table.sortEnabled tr.firstRow th,table.sortEnabled tr.firstRow td{padding-right:20px;background-repeat: no-repeat;background-position: center right;   background-image:url(" + a.options.themePath + a.options.theme + "/images/sortable.png);}", a.document), a.addListener("afterexeccommand", function(a, b) {
					("mergeright" == b || "mergedown" == b || "mergecells" == b) && this.execCommand("disablesort")
				})
			}), UE.commands["sorttable"] = {
				queryCommandState: function() {
					var c, e, g, f, a = this,
						b = d(a);
					if (!b.cell) return -1;
					for (c = b.table, e = c.getElementsByTagName("td"), f = 0; g = e[f++];)
						if (1 != g.rowSpan || 1 != g.colSpan) return -1;
					return 0
				},
				execCommand: function(a, b) {
					var e = this,
						f = e.selection.getRange(),
						g = f.createBookmark(!0),
						h = d(e),
						i = h.cell,
						j = c(h.table),
						k = j.getCellInfo(i);
					j.sortTable(k.cellIndex, b), f.moveToBookmark(g);
					try {
						f.select()
					} catch (l) {}
				}
			}, UE.commands["enablesort"] = UE.commands["disablesort"] = {
				queryCommandState: function(a) {
					var c, e, b = d(this).table;
					if (b && "enablesort" == a)
						for (c = domUtils.getElementsByTagName(b, "th td"), e = 0; e < c.length; e++)
							if (c[e].getAttribute("colspan") > 1 || c[e].getAttribute("rowspan") > 1) return -1;
					return b ? "enablesort" == a ^ "sortEnabled" != b.getAttribute("data-sort") ? -1 : 0 : -1
				},
				execCommand: function(a) {
					var b = d(this).table;
					b.setAttribute("data-sort", "enablesort" == a ? "sortEnabled" : "sortDisabled"), "enablesort" == a ? domUtils.addClass(b, "sortEnabled") : domUtils.removeClasses(b, "sortEnabled")
				}
			}
		}, UE.plugins["contextmenu"] = function() {
			var c, b, d, e, a = this;
			a.setOpt("enableContextMenu", !0), a.getOpt("enableContextMenu") !== !1 && (b = a.getLang("contextMenu"), d = a.options.contextMenu || [{
				label: b["selectall"],
				cmdName: "selectall"
			}, {
				label: b.cleardoc,
				cmdName: "cleardoc",
				exec: function() {
					confirm(b.confirmclear) && this.execCommand("cleardoc")
				}
			}, "-", {
				label: b.unlink,
				cmdName: "unlink"
			}, "-", {
				group: b.paragraph,
				icon: "justifyjustify",
				subMenu: [{
					label: b.justifyleft,
					cmdName: "justify",
					value: "left"
				}, {
					label: b.justifyright,
					cmdName: "justify",
					value: "right"
				}, {
					label: b.justifycenter,
					cmdName: "justify",
					value: "center"
				}, {
					label: b.justifyjustify,
					cmdName: "justify",
					value: "justify"
				}]
			}, "-", {
				group: b.table,
				icon: "table",
				subMenu: [{
					label: b.inserttable,
					cmdName: "inserttable"
				}, {
					label: b.deletetable,
					cmdName: "deletetable"
				}, "-", {
					label: b.deleterow,
					cmdName: "deleterow"
				}, {
					label: b.deletecol,
					cmdName: "deletecol"
				}, {
					label: b.insertcol,
					cmdName: "insertcol"
				}, {
					label: b.insertcolnext,
					cmdName: "insertcolnext"
				}, {
					label: b.insertrow,
					cmdName: "insertrow"
				}, {
					label: b.insertrownext,
					cmdName: "insertrownext"
				}, "-", {
					label: b.insertcaption,
					cmdName: "insertcaption"
				}, {
					label: b.deletecaption,
					cmdName: "deletecaption"
				}, {
					label: b.inserttitle,
					cmdName: "inserttitle"
				}, {
					label: b.deletetitle,
					cmdName: "deletetitle"
				}, {
					label: b.inserttitlecol,
					cmdName: "inserttitlecol"
				}, {
					label: b.deletetitlecol,
					cmdName: "deletetitlecol"
				}, "-", {
					label: b.mergecells,
					cmdName: "mergecells"
				}, {
					label: b.mergeright,
					cmdName: "mergeright"
				}, {
					label: b.mergedown,
					cmdName: "mergedown"
				}, "-", {
					label: b.splittorows,
					cmdName: "splittorows"
				}, {
					label: b.splittocols,
					cmdName: "splittocols"
				}, {
					label: b.splittocells,
					cmdName: "splittocells"
				}, "-", {
					label: b.averageDiseRow,
					cmdName: "averagedistributerow"
				}, {
					label: b.averageDisCol,
					cmdName: "averagedistributecol"
				}, "-", {
					label: b.edittd,
					cmdName: "edittd",
					exec: function() {
						UE.ui["edittd"] && new UE.ui["edittd"](this), this.getDialog("edittd").open()
					}
				}, {
					label: b.edittable,
					cmdName: "edittable",
					exec: function() {
						UE.ui["edittable"] && new UE.ui["edittable"](this), this.getDialog("edittable").open()
					}
				}, {
					label: b.setbordervisible,
					cmdName: "setbordervisible"
				}]
			}, {
				group: b.tablesort,
				icon: "tablesort",
				subMenu: [{
					label: b.enablesort,
					cmdName: "enablesort"
				}, {
					label: b.disablesort,
					cmdName: "disablesort"
				}, "-", {
					label: b.reversecurrent,
					cmdName: "sorttable",
					value: "reversecurrent"
				}, {
					label: b.orderbyasc,
					cmdName: "sorttable",
					value: "orderbyasc"
				}, {
					label: b.reversebyasc,
					cmdName: "sorttable",
					value: "reversebyasc"
				}, {
					label: b.orderbynum,
					cmdName: "sorttable",
					value: "orderbynum"
				}, {
					label: b.reversebynum,
					cmdName: "sorttable",
					value: "reversebynum"
				}]
			}, {
				group: b.borderbk,
				icon: "borderBack",
				subMenu: [{
					label: b.setcolor,
					cmdName: "interlacetable",
					exec: function() {
						this.execCommand("interlacetable")
					}
				}, {
					label: b.unsetcolor,
					cmdName: "uninterlacetable",
					exec: function() {
						this.execCommand("uninterlacetable")
					}
				}, {
					label: b.setbackground,
					cmdName: "settablebackground",
					exec: function() {
						this.execCommand("settablebackground", {
							repeat: !0,
							colorList: ["#bbb", "#ccc"]
						})
					}
				}, {
					label: b.unsetbackground,
					cmdName: "cleartablebackground",
					exec: function() {
						this.execCommand("cleartablebackground")
					}
				}, {
					label: b.redandblue,
					cmdName: "settablebackground",
					exec: function() {
						this.execCommand("settablebackground", {
							repeat: !0,
							colorList: ["red", "blue"]
						})
					}
				}, {
					label: b.threecolorgradient,
					cmdName: "settablebackground",
					exec: function() {
						this.execCommand("settablebackground", {
							repeat: !0,
							colorList: ["#aaa", "#bbb", "#ccc"]
						})
					}
				}]
			}, {
				group: b.aligntd,
				icon: "aligntd",
				subMenu: [{
					cmdName: "cellalignment",
					value: {
						align: "left",
						vAlign: "top"
					}
				}, {
					cmdName: "cellalignment",
					value: {
						align: "center",
						vAlign: "top"
					}
				}, {
					cmdName: "cellalignment",
					value: {
						align: "right",
						vAlign: "top"
					}
				}, {
					cmdName: "cellalignment",
					value: {
						align: "left",
						vAlign: "middle"
					}
				}, {
					cmdName: "cellalignment",
					value: {
						align: "center",
						vAlign: "middle"
					}
				}, {
					cmdName: "cellalignment",
					value: {
						align: "right",
						vAlign: "middle"
					}
				}, {
					cmdName: "cellalignment",
					value: {
						align: "left",
						vAlign: "bottom"
					}
				}, {
					cmdName: "cellalignment",
					value: {
						align: "center",
						vAlign: "bottom"
					}
				}, {
					cmdName: "cellalignment",
					value: {
						align: "right",
						vAlign: "bottom"
					}
				}]
			}, {
				group: b.aligntable,
				icon: "aligntable",
				subMenu: [{
					cmdName: "tablealignment",
					className: "left",
					label: b.tableleft,
					value: "left"
				}, {
					cmdName: "tablealignment",
					className: "center",
					label: b.tablecenter,
					value: "center"
				}, {
					cmdName: "tablealignment",
					className: "right",
					label: b.tableright,
					value: "right"
				}]
			}, "-", {
				label: b.insertparagraphbefore,
				cmdName: "insertparagraph",
				value: !0
			}, {
				label: b.insertparagraphafter,
				cmdName: "insertparagraph"
			}, {
				label: b["copy"],
				cmdName: "copy"
			}, {
				label: b["paste"],
				cmdName: "paste"
			}], d.length && (e = UE.ui.uiUtils, a.addListener("contextmenu", function(f, g) {
				var j, i, k, l, m, o, h = e.getViewportOffsetByEvent(g);
				for (a.fireEvent("beforeselectionchange"), c && c.destroy(), i = 0, k = []; j = d[i]; i++) ! function(c) {
					function g() {
						switch (c.icon) {
							case "table":
								return a.getLang("contextMenu.table");
							case "justifyjustify":
								return a.getLang("contextMenu.paragraph");
							case "aligntd":
								return a.getLang("contextMenu.aligntd");
							case "aligntable":
								return a.getLang("contextMenu.aligntable");
							case "tablesort":
								return b.tablesort;
							case "borderBack":
								return b.borderbk;
							default:
								return ""
						}
					}
					if ("-" == c)(l = k[k.length - 1]) && "-" !== l && k.push("-");
					else if (c.hasOwnProperty("group")) {
						for (var e, d = 0, f = []; e = c.subMenu[d]; d++) ! function(b) {
							"-" == b ? (l = f[f.length - 1]) && "-" !== l ? f.push("-") : f.splice(f.length - 1) : (a.commands[b.cmdName] || UE.commands[b.cmdName] || b.query) && (b.query ? b.query() : a.queryCommandState(b.cmdName)) > -1 && f.push({
								label: b.label || a.getLang("contextMenu." + b.cmdName + (b.value || "")) || "",
								className: "edui-for-" + b.cmdName + (b.className ? " edui-for-" + b.cmdName + "-" + b.className : ""),
								onclick: b.exec ? function() {
									b.exec.call(a)
								} : function() {
									a.execCommand(b.cmdName, b.value)
								}
							})
						}(e);
						f.length && k.push({
							label: g(),
							className: "edui-for-" + c.icon,
							subMenu: {
								items: f,
								editor: a
							}
						})
					} else(a.commands[c.cmdName] || UE.commands[c.cmdName] || c.query) && (c.query ? c.query.call(a) : a.queryCommandState(c.cmdName)) > -1 && k.push({
						label: c.label || a.getLang("contextMenu." + c.cmdName),
						className: "edui-for-" + (c.icon ? c.icon : c.cmdName + (c.value || "")),
						onclick: c.exec ? function() {
							c.exec.call(a)
						} : function() {
							a.execCommand(c.cmdName, c.value)
						}
					})
				}(j);
				if ("-" == k[k.length - 1] && k.pop(), c = new UE.ui.Menu({
						items: k,
						className: "edui-contextmenu",
						editor: a
					}), c.render(), c.showAt(h), a.fireEvent("aftershowcontextmenu", c), domUtils.preventDefault(g), browser.ie) {
					try {
						m = a.selection.getNative().createRange()
					} catch (n) {
						return
					}
					m.item && (o = new dom.Range(a.document), o.selectNode(m.item(0)).select(!0, !0))
				}
			}), a.addListener("aftershowcontextmenu", function(b, c) {
				var d, e;
				if (a.zeroclipboard) {
					d = c.items;
					for (e in d) "edui-for-copy" == d[e].className && a.zeroclipboard.clip(d[e].getDom())
				}
			})))
		}, UE.plugins["shortcutmenu"] = function() {
			var b, a = this,
				c = a.options.shortcutMenu || [];
			c.length && (a.addListener("contextmenu mouseup", function(a, d) {
				var g, h, e = this,
					f = {
						type: a,
						target: d.target || d.srcElement,
						screenX: d.screenX,
						screenY: d.screenY,
						clientX: d.clientX,
						clientY: d.clientY
					};
				if (setTimeout(function() {
						var d = e.selection.getRange();
						(d.collapsed === !1 || "contextmenu" == a) && (b || (b = new baidu.editor.ui.ShortCutMenu({
							editor: e,
							items: c,
							theme: e.options.theme,
							className: "edui-shortcutmenu"
						}), b.render(), e.fireEvent("afterrendershortcutmenu", b)), b.show(f, !!UE.plugins["contextmenu"]))
					}), "contextmenu" == a && (domUtils.preventDefault(d), browser.ie9below)) {
					try {
						g = e.selection.getNative().createRange()
					} catch (d) {
						return
					}
					g.item && (h = new dom.Range(e.document), h.selectNode(g.item(0)).select(!0, !0))
				}
			}), a.addListener("keydown", function(a) {
				"keydown" == a && b && !b.isHidden && b.hide()
			}))
		}, UE.plugins["basestyle"] = function() {
			var d, a = {
					bold: ["strong", "b"],
					italic: ["em", "i"],
					subscript: ["sub"],
					superscript: ["sup"]
				},
				b = function(a, b) {
					return domUtils.filterNodeList(a.selection.getStartElementPath(), b)
				},
				c = this;
			c.addshortcutkey({
				Bold: "ctrl+66",
				Italic: "ctrl+73",
				Underline: "ctrl+85"
			}), c.addInputRule(function(a) {
				utils.each(a.getNodesByTagName("b i"), function(a) {
					switch (a.tagName) {
						case "b":
							a.tagName = "strong";
							break;
						case "i":
							a.tagName = "em"
					}
				})
			});
			for (d in a) ! function(a, d) {
				c.commands[a] = {
					execCommand: function(a) {
						var g, h, e = c.selection.getRange(),
							f = b(this, d);
						e.collapsed ? (f ? (g = c.document.createTextNode(""), e.insertNode(g).removeInlineStyle(d), e.setStartBefore(g), domUtils.remove(g)) : (h = e.document.createElement(d[0]), ("superscript" == a || "subscript" == a) && (g = c.document.createTextNode(""), e.insertNode(g).removeInlineStyle(["sub", "sup"]).setStartBefore(g).collapse(!0)), e.insertNode(h).setStart(h, 0)), e.collapse(!0)) : (("superscript" == a || "subscript" == a) && (f && f.tagName.toLowerCase() == a || e.removeInlineStyle(["sub", "sup"])), f ? e.removeInlineStyle(d) : e.applyInlineStyle(d[0])), e.select()
					},
					queryCommandState: function() {
						return b(this, d) ? 1 : 0
					}
				}
			}(d, a[d])
		}, UE.plugins["elementpath"] = function() {
			var a, b, c = this;
			c.setOpt("elementPathEnabled", !0), c.options.elementPathEnabled && (c.commands["elementpath"] = {
				execCommand: function(d, e) {
					var f = b[e],
						g = c.selection.getRange();
					a = 1 * e, g.selectNode(f).select()
				},
				queryCommandValue: function() {
					var f, e, g, c = [].concat(this.selection.getStartElementPath()).reverse(),
						d = [];
					for (b = c, e = 0; f = c[e]; e++)
						if (3 != f.nodeType && (g = f.tagName.toLowerCase(), "img" == g && f.getAttribute("anchorname") && (g = "anchor"), d[e] = g, a == e)) {
							a = -1;
							break
						}
					return d
				}
			})
		}, UE.plugins["formatmatch"] = function() {
			function e(f, g) {
				function i(a) {
					return m && a.selectNode(m), a.applyInlineStyle(b[b.length - 1].tagName, null, b)
				}
				var h, j, k, l, m, n;
				browser.webkit && (h = "IMG" == g.target.tagName ? g.target : null), a.undoManger && a.undoManger.save(), j = a.selection.getRange(), k = h || j.getClosedNode(), c && k && "IMG" == k.tagName ? (k.style.cssText += ";float:" + (c.style.cssFloat || c.style.styleFloat || "none") + ";display:" + (c.style.display || "inline"), c = null) : c || (l = j.collapsed, l && (m = a.document.createTextNode("match"), j.insertNode(m).select()), a.__hasEnterExecCommand = !0, n = a.options.removeFormatAttributes, a.options.removeFormatAttributes = "", a.execCommand("removeformat"), a.options.removeFormatAttributes = n, a.__hasEnterExecCommand = !1, j = a.selection.getRange(), b.length && i(j), m && j.setStartBefore(m).collapse(!0), j.select(), m && domUtils.remove(m)), a.undoManger && a.undoManger.save(), a.removeListener("mouseup", e), d = 0
			}
			var c, a = this,
				b = [],
				d = 0;
			a.addListener("reset", function() {
				b = [], d = 0
			}), a.commands["formatmatch"] = {
				execCommand: function() {
					var g, h, j, i;
					if (d) return d = 0, b = [], a.removeListener("mouseup", e), void 0;
					if (g = a.selection.getRange(), c = g.getClosedNode(), !c || "IMG" != c.tagName)
						for (g.collapse(!0).shrinkBoundary(), h = g.startContainer, b = domUtils.findParents(h, !0, function(a) {
								return !domUtils.isBlockElm(a) && 1 == a.nodeType
							}), i = 0; j = b[i]; i++)
							if ("A" == j.tagName) {
								b.splice(i, 1);
								break
							}
					a.addListener("mouseup", e), d = 1
				},
				queryCommandState: function() {
					return d
				},
				notNeedUndo: 1
			}
		}, UE.plugin.register("searchreplace", function() {
			function c(a, b, c) {
				var f, e, d = b.searchStr;
				for (-1 == b.dir && (a = a.split("").reverse().join(""), d = d.split("").reverse().join(""), c = a.length - c), e = new RegExp(d, "g" + (b.casesensitive ? "" : "i")); f = e.exec(a);)
					if (f.index >= c) return -1 == b.dir ? a.length - f.index - b.searchStr.length : f.index;
				return -1
			}

			function d(a, d, e) {
				var f, g, i, h = e.all || 1 == e.dir ? "getNextDomNode" : "getPreDomNode";
				for (domUtils.isBody(a) && (a = a.firstChild), i = 1; a;) {
					if (f = 3 == a.nodeType ? a.nodeValue : a[browser.ie ? "innerText" : "textContent"], g = c(f, e, d), i = 0, -1 != g) return {
						node: a,
						index: g
					};
					for (a = domUtils[h](a); a && b[a.nodeName.toLowerCase()];) a = domUtils[h](a, !0);
					a && (d = -1 == e.dir ? (3 == a.nodeType ? a.nodeValue : a[browser.ie ? "innerText" : "textContent"]).length : 0)
				}
			}

			function e(a, b, c) {
				for (var h, d = 0, f = a.firstChild, g = 0; f;) {
					if (3 == f.nodeType) {
						if (g = f.nodeValue.replace(/(^[\t\r\n]+)|([\t\r\n]+$)/, "").length, d += g, d >= b) return {
							node: f,
							index: g - (d - b)
						}
					} else if (!dtd.$empty[f.tagName] && (g = f[browser.ie ? "innerText" : "textContent"].replace(/(^[\t\r\n]+)|([\t\r\n]+$)/, "").length, d += g, d >= b && (h = e(f, g - (d - b), c)))) return h;
					f = domUtils.getNextDomNode(f)
				}
			}

			function f(a, b) {
				var f, j, k, l, m, n, c = a.selection.getRange(),
					h = b.searchStr,
					i = a.document.createElement("span");
				if (i.innerHTML = "$$ueditor_searchreplace_key$$", c.shrinkBoundary(!0), !c.collapsed && (c.select(), j = a.selection.getText(), new RegExp("^" + b.searchStr + "$", b.casesensitive ? "" : "i").test(j))) {
					if (void 0 != b.replaceStr) return g(c, b.replaceStr), c.select(), !0;
					c.collapse(-1 == b.dir)
				}
				return c.insertNode(i), c.enlargeToBlockElm(!0), f = c.startContainer, k = f[browser.ie ? "innerText" : "textContent"].indexOf("$$ueditor_searchreplace_key$$"), c.setStartBefore(i), domUtils.remove(i), (l = d(f, k, b)) ? (m = e(l.node, l.index, h), n = e(l.node, l.index + h.length, h), c.setStart(m.node, m.index).setEnd(n.node, n.index), void 0 !== b.replaceStr && g(c, b.replaceStr), c.select(), !0) : (c.setCursor(), void 0)
			}

			function g(b, c) {
				c = a.document.createTextNode(c), b.deleteContents().insertNode(c)
			}
			var a = this,
				b = {
					table: 1,
					tbody: 1,
					tr: 1,
					ol: 1,
					ul: 1
				};
			return {
				commands: {
					searchreplace: {
						execCommand: function(b, c) {
							var d, e, g;
							if (utils.extend(c, {
									all: !1,
									casesensitive: !1,
									dir: 1
								}, !0), d = 0, c.all) {
								for (e = a.selection.getRange(), g = a.body.firstChild, g && 1 == g.nodeType ? (e.setStart(g, 0), e.shrinkBoundary(!0)) : 3 == g.nodeType && e.setStartBefore(g), e.collapse(!0).select(!0), void 0 !== c.replaceStr && a.fireEvent("saveScene"); f(this, c);) d++;
								d && a.fireEvent("saveScene")
							} else void 0 !== c.replaceStr && a.fireEvent("saveScene"), f(this, c) && d++, d && a.fireEvent("saveScene");
							return d
						},
						notNeedUndo: 1
					}
				}
			}
		}), UE.plugins["customstyle"] = function() {
			var a = this;
			a.setOpt({
				customstyle: [{
					tag: "h1",
					name: "tc",
					style: "font-size:32px;font-weight:bold;border-bottom:#ccc 2px solid;padding:0 4px 0 0;text-align:center;margin:0 0 20px 0;"
				}, {
					tag: "h1",
					name: "tl",
					style: "font-size:32px;font-weight:bold;border-bottom:#ccc 2px solid;padding:0 4px 0 0;text-align:left;margin:0 0 10px 0;"
				}, {
					tag: "span",
					name: "im",
					style: "font-size:16px;font-style:italic;font-weight:bold;line-height:18px;"
				}, {
					tag: "span",
					name: "hi",
					style: "font-size:16px;font-style:italic;font-weight:bold;color:rgb(51, 153, 204);line-height:18px;"
				}]
			}), a.commands["customstyle"] = {
				execCommand: function(a, b) {
					var f, g, i, j, k, l, n, m, o, p, q, c = this,
						d = b.tag,
						e = domUtils.findParent(c.selection.getStart(), function(a) {
							return a.getAttribute("label")
						}, !0),
						h = {};
					for (i in b) void 0 !== b[i] && (h[i] = b[i]);
					if (delete h.tag, e && e.getAttribute("label") == b.label) {
						if (f = this.selection.getRange(), g = f.createBookmark(), f.collapsed) dtd.$block[e.tagName] ? (j = c.document.createElement("p"), domUtils.moveChild(e, j), e.parentNode.insertBefore(j, e), domUtils.remove(e)) : domUtils.remove(e, !0);
						else {
							for (k = domUtils.getCommonAncestor(g.start, g.end), l = domUtils.getElementsByTagName(k, d), new RegExp(d, "i").test(k.tagName) && l.push(k), m = 0; n = l[m++];) n.getAttribute("label") == b.label && (o = domUtils.getPosition(n, g.start), p = domUtils.getPosition(n, g.end), (o & domUtils.POSITION_FOLLOWING || o & domUtils.POSITION_CONTAINS) && (p & domUtils.POSITION_PRECEDING || p & domUtils.POSITION_CONTAINS) && dtd.$block[d] && (j = c.document.createElement("p"), domUtils.moveChild(n, j), n.parentNode.insertBefore(j, n)), domUtils.remove(n, !0));
							e = domUtils.findParent(k, function(a) {
								return a.getAttribute("label") == b.label
							}, !0), e && domUtils.remove(e, !0)
						}
						f.moveToBookmark(g).select()
					} else if (dtd.$block[d]) this.execCommand("paragraph", d, h, "customstyle"), f = c.selection.getRange(), f.collapsed || (f.collapse(), e = domUtils.findParent(c.selection.getStart(), function(a) {
						return a.getAttribute("label") == b.label
					}, !0), q = c.document.createElement("p"), domUtils.insertAfter(e, q), domUtils.fillNode(c.document, q), f.setStart(q, 0).setCursor());
					else {
						if (f = c.selection.getRange(), f.collapsed) return e = c.document.createElement(d), domUtils.setAttributes(e, h), f.insertNode(e).setStart(e, 0).setCursor(), void 0;
						g = f.createBookmark(), f.applyInlineStyle(d, h).moveToBookmark(g).select()
					}
				},
				queryCommandValue: function() {
					var a = domUtils.filterNodeList(this.selection.getStartElementPath(), function(a) {
						return a.getAttribute("label")
					});
					return a ? a.getAttribute("label") : ""
				}
			}, a.addListener("keyup", function(b, c) {
				var e, f, g, d = c.keyCode || c.which;
				(32 == d || 13 == d) && (e = a.selection.getRange(), e.collapsed && (f = domUtils.findParent(a.selection.getStart(), function(a) {
					return a.getAttribute("label")
				}, !0), f && dtd.$block[f.tagName] && domUtils.isEmptyNode(f) && (g = a.document.createElement("p"), domUtils.insertAfter(f, g), domUtils.fillNode(a.document, g), domUtils.remove(f), e.setStart(g, 0).setCursor())))
			})
		}, UE.plugins["catchremoteimage"] = function() {
			var me = this,
				ajax = UE.ajax;
			me.options.catchRemoteImageEnable !== !1 && (me.setOpt({
				catchRemoteImageEnable: !1
			}), me.addListener("afterpaste", function() {
				me.fireEvent("catchRemoteImage")
			}), me.addListener("catchRemoteImage", function() {
				function catchremoteimage(a, b) {
					var c = utils.serializeParam(me.queryCommandValue("serverparam")) || "",
						d = utils.formatUrl(catcherActionUrl + (-1 == catcherActionUrl.indexOf("?") ? "?" : "&") + c),
						e = utils.isCrossDomainUrl(d),
						f = {
							method: "POST",
							dataType: e ? "jsonp" : "",
							timeout: 6e4,
							onsuccess: b["success"],
							onerror: b["error"]
						};
					f[catcherFieldName] = a, ajax.request(d, f)
				}
				var i, ci, src, catcherLocalDomain = me.getOpt("catcherLocalDomain"),
					catcherActionUrl = me.getActionUrl(me.getOpt("catcherActionName")),
					catcherUrlPrefix = me.getOpt("catcherUrlPrefix"),
					catcherFieldName = me.getOpt("catcherFieldName"),
					remoteImages = [],
					imgs = domUtils.getElementsByTagName(me.document, "img"),
					test = function(a, b) {
						if (-1 != a.indexOf(location.host) || /(^\.)|(^\/)/.test(a)) return !0;
						if (b)
							for (var d, c = 0; d = b[c++];)
								if (-1 !== a.indexOf(d)) return !0;
						return !1
					};
				for (i = 0; ci = imgs[i++];) ci.getAttribute("word_img") || (src = ci.getAttribute("_src") || ci.src || "", /^(https?|ftp):/i.test(src) && !test(src, catcherLocalDomain) && remoteImages.push(src));
				remoteImages.length && catchremoteimage(remoteImages, {
					success: function(r) {
						var info, i, j, ci, cj, oldSrc, newSrc, list;
						try {
							info = void 0 !== r.state ? r : eval("(" + r.responseText + ")")
						} catch (e) {
							return
						}
						for (list = info.list, i = 0; ci = imgs[i++];)
							for (oldSrc = ci.getAttribute("_src") || ci.src || "", j = 0; cj = list[j++];)
								if (oldSrc == cj.source && "SUCCESS" == cj.state) {
									newSrc = catcherUrlPrefix + cj.url, domUtils.setAttributes(ci, {
										src: newSrc,
										_src: newSrc
									});
									break
								}
						me.fireEvent("catchremotesuccess")
					},
					error: function() {
						me.fireEvent("catchremoteerror")
					}
				})
			}))
		}, UE.plugin.register("snapscreen", function() {
			function getLocation(a) {
				var b, c = document.createElement("a"),
					d = utils.serializeParam(me.queryCommandValue("serverparam")) || "";
				return c.href = a, browser.ie && (c.href = c.href), b = c.search, d && (b = b + (-1 == b.indexOf("?") ? "?" : "&") + d, b = b.replace(/[&]+/gi, "&")), {
					port: c.port,
					hostname: c.hostname,
					path: c.pathname + b || +c.hash
				}
			}
			var snapplugin, me = this;
			return {
				commands: {
					snapscreen: {
						execCommand: function(cmd) {
							function onSuccess(rs) {
								try {
									if (rs = eval("(" + rs + ")"), "SUCCESS" == rs.state) {
										var opt = me.options;
										me.execCommand("insertimage", {
											src: opt.snapscreenUrlPrefix + rs.url,
											_src: opt.snapscreenUrlPrefix + rs.url,
											alt: rs.title || "",
											floatStyle: opt.snapscreenImgAlign
										})
									} else alert(rs.state)
								} catch (e) {
									alert(lang.callBackErrorMsg)
								}
							}
							var url, local, res, container, doc, lang = me.getLang("snapScreen_plugin");
							if (!snapplugin) {
								container = me.container, doc = me.container.ownerDocument || me.container.document, snapplugin = doc.createElement("object");
								try {
									snapplugin.type = "application/x-pluginbaidusnap"
								} catch (e) {
									return
								}
								snapplugin.style.cssText = "position:absolute;left:-9999px;width:0;height:0;", snapplugin.setAttribute("width", "0"), snapplugin.setAttribute("height", "0"), container.appendChild(snapplugin)
							}
							url = me.getActionUrl(me.getOpt("snapscreenActionName")), local = getLocation(url), setTimeout(function() {
								try {
									res = snapplugin.saveSnapshot(local.hostname, local.path, local.port)
								} catch (a) {
									return me.ui._dialogs["snapscreenDialog"].open(), void 0
								}
								onSuccess(res)
							}, 50)
						},
						queryCommandState: function() {
							return -1 != navigator.userAgent.indexOf("Windows", 0) ? 0 : -1
						}
					}
				}
			}
		}), UE.commands["insertparagraph"] = {
			execCommand: function(a, b) {
				for (var f, g, c = this, d = c.selection.getRange(), e = d.startContainer; e && !domUtils.isBody(e);) f = e, e = e.parentNode;
				f && (g = c.document.createElement("p"), b ? f.parentNode.insertBefore(g, f) : f.parentNode.insertBefore(g, f.nextSibling), domUtils.fillNode(c.document, g), d.setStart(g, 0).setCursor(!1, !0))
			}
		}, UE.plugin.register("webapp", function() {
			function b(b, c) {
				return c ? '<iframe class="edui-faked-webapp" title="' + b.title + '" ' + (b.align && !b.cssfloat ? 'align="' + b.align + '"' : "") + (b.cssfloat ? 'style="float:' + b.cssfloat + '"' : "") + 'width="' + b.width + '" height="' + b.height + '"  scrolling="no" frameborder="0" src="' + b.url + '" logo_url = "' + b.logo + '"></iframe>' : '<img title="' + b.title + '" width="' + b.width + '" height="' + b.height + '"' + ' src="' + a.options.UEDITOR_HOME_URL + 'themes/default/images/spacer.gif" _logo_url="' + b.logo + '" style="background:url(' + b.logo + ') no-repeat center center; border:1px solid gray;" class="edui-faked-webapp" _url="' + b.url + '" ' + (b.align && !b.cssfloat ? 'align="' + b.align + '"' : "") + (b.cssfloat ? 'style="float:' + b.cssfloat + '"' : "") + "/>"
			}
			var a = this;
			return {
				outputRule: function(a) {
					utils.each(a.getNodesByTagName("img"), function(a) {
						var c, d;
						"edui-faked-webapp" == a.getAttr("class") && (c = b({
							title: a.getAttr("title"),
							width: a.getAttr("width"),
							height: a.getAttr("height"),
							align: a.getAttr("align"),
							cssfloat: a.getStyle("float"),
							url: a.getAttr("_url"),
							logo: a.getAttr("_logo_url")
						}, !0), d = UE.uNode.createElement(c), a.parentNode.replaceChild(d, a))
					})
				},
				inputRule: function(a) {
					utils.each(a.getNodesByTagName("iframe"), function(a) {
						if ("edui-faked-webapp" == a.getAttr("class")) {
							var c = UE.uNode.createElement(b({
								title: a.getAttr("title"),
								width: a.getAttr("width"),
								height: a.getAttr("height"),
								align: a.getAttr("align"),
								cssfloat: a.getStyle("float"),
								url: a.getAttr("src"),
								logo: a.getAttr("logo_url")
							}));
							a.parentNode.replaceChild(c, a)
						}
					})
				},
				commands: {
					webapp: {
						execCommand: function(a, c) {
							var d = this,
								e = b(utils.extend(c, {
									align: "none"
								}), !1);
							d.execCommand("inserthtml", e)
						},
						queryCommandState: function() {
							var a = this,
								b = a.selection.getRange().getClosedNode(),
								c = b && "edui-faked-webapp" == b.className;
							return c ? 1 : 0
						}
					}
				}
			}
		}), UE.plugins["template"] = function() {
			UE.commands["template"] = {
				execCommand: function(a, b) {
					b.html && this.execCommand("inserthtml", b.html)
				}
			}, this.addListener("click", function(a, b) {
				var c = b.target || b.srcElement,
					d = this.selection.getRange(),
					e = domUtils.findParent(c, function(a) {
						return a.className && domUtils.hasClass(a, "ue_t") ? a : void 0
					}, !0);
				e && d.selectNode(e).shrinkBoundary().select()
			}), this.addListener("keydown", function(a, b) {
				var d, c = this.selection.getRange();
				c.collapsed || b.ctrlKey || b.metaKey || b.shiftKey || b.altKey || (d = domUtils.findParent(c.startContainer, function(a) {
					return a.className && domUtils.hasClass(a, "ue_t") ? a : void 0
				}, !0), d && domUtils.removeClasses(d, ["ue_t"]))
			})
		}, UE.plugin.register("music", function() {
			function b(b, c, d, e, f, g) {
				return g ? '<embed type="application/x-shockwave-flash" class="edui-faked-music" pluginspage="http://www.macromedia.com/go/getflashplayer" src="' + b + '" width="' + c + '" height="' + d + '" ' + (e && !f ? 'align="' + e + '"' : "") + (f ? 'style="float:' + f + '"' : "") + ' wmode="transparent" play="true" loop="false" menu="false" allowscriptaccess="never" allowfullscreen="true" >' : "<img " + (e && !f ? 'align="' + e + '"' : "") + (f ? 'style="float:' + f + '"' : "") + ' width="' + c + '" height="' + d + '" _url="' + b + '" class="edui-faked-music"' + ' src="' + a.options.langPath + a.options.lang + '/images/music.png" />'
			}
			var a = this;
			return {
				outputRule: function(a) {
					utils.each(a.getNodesByTagName("img"), function(a) {
						var c, d, e, f;
						"edui-faked-music" == a.getAttr("class") && (d = a.getStyle("float"), e = a.getAttr("align"), c = b(a.getAttr("_url"), a.getAttr("width"), a.getAttr("height"), e, d, !0), f = UE.uNode.createElement(c), a.parentNode.replaceChild(f, a))
					})
				},
				inputRule: function(a) {
					utils.each(a.getNodesByTagName("embed"), function(a) {
						var c, d, e;
						"edui-faked-music" == a.getAttr("class") && (c = a.getStyle("float"), d = a.getAttr("align"), html = b(a.getAttr("src"), a.getAttr("width"), a.getAttr("height"), d, c, !1), e = UE.uNode.createElement(html), a.parentNode.replaceChild(e, a))
					})
				},
				commands: {
					music: {
						execCommand: function(a, c) {
							var d = this,
								e = b(c.url, c.width || 400, c.height || 95, "none", !1);
							d.execCommand("inserthtml", e)
						},
						queryCommandState: function() {
							var a = this,
								b = a.selection.getRange().getClosedNode(),
								c = b && "edui-faked-music" == b.className;
							return c ? 1 : 0
						}
					}
				}
			}
		}), UE.plugin.register("autoupload", function() {
			function a(a, b) {
				var i, k, n, o, p, q, r, c = b,
					l = /image\/\w+/i.test(a.type) ? "image" : "file",
					m = "loading_" + (+new Date).toString(36),
					d = c.getOpt(l + "FieldName"),
					e = c.getOpt(l + "UrlPrefix"),
					f = c.getOpt(l + "MaxSize"),
					g = c.getOpt(l + "AllowFiles"),
					h = c.getActionUrl(c.getOpt(l + "ActionName")),
					j = function(a) {
						var b = c.document.getElementById(m);
						b && domUtils.remove(b), c.fireEvent("showmessage", {
							id: m,
							content: a,
							type: "error",
							timeout: 4e3
						})
					};
				return "image" == l ? (i = '<img class="loadingclass" id="' + m + '" src="' + c.options.themePath + c.options.theme + '/images/spacer.gif" title="' + (c.getLang("autoupload.loading") || "") + '" >', k = function(a) {
					var b = e + a.url,
						d = c.document.getElementById(m);
					d && (d.setAttribute("src", b), d.setAttribute("_src", b), d.setAttribute("title", a.title || ""), d.setAttribute("alt", a.original || ""), d.removeAttribute("id"), domUtils.removeClasses(d, "loadingclass"))
				}) : (i = '<p><img class="loadingclass" id="' + m + '" src="' + c.options.themePath + c.options.theme + '/images/spacer.gif" title="' + (c.getLang("autoupload.loading") || "") + '" >' + "</p>", k = function(a) {
					var b = e + a.url,
						d = c.document.getElementById(m),
						f = c.selection.getRange(),
						g = f.createBookmark();
					f.selectNode(d).select(), c.execCommand("insertfile", {
						url: b
					}), f.moveToBookmark(g).select()
				}), c.execCommand("inserthtml", i), c.getOpt(l + "ActionName") ? a.size > f ? (j(c.getLang("autoupload.exceedSizeError")), void 0) : (n = a.name ? a.name.substr(a.name.lastIndexOf(".")) : "", n && "image" != l || g && -1 == (g.join("") + ".").indexOf(n.toLowerCase() + ".") ? (j(c.getLang("autoupload.exceedTypeError")), void 0) : (o = new XMLHttpRequest, p = new FormData, q = utils.serializeParam(c.queryCommandValue("serverparam")) || "", r = utils.formatUrl(h + (-1 == h.indexOf("?") ? "?" : "&") + q), p.append(d, a, a.name || "blob." + a.type.substr("image/".length)), p.append("type", "ajax"), o.open("post", r, !0), o.setRequestHeader("X-Requested-With", "XMLHttpRequest"), o.addEventListener("load", function(a) {
					try {
						var b = new Function("return " + utils.trim(a.target.response))();
						"SUCCESS" == b.state && b.url ? k(b) : j(b.state)
					} catch (d) {
						j(c.getLang("autoupload.loadError"))
					}
				}), o.send(p), void 0)) : (j(c.getLang("autoupload.errorLoadConfig")), void 0)
			}

			function b(a) {
				return a.clipboardData && a.clipboardData.items && 1 == a.clipboardData.items.length && /^image\//.test(a.clipboardData.items[0].type) ? a.clipboardData.items : null
			}

			function c(a) {
				return a.dataTransfer && a.dataTransfer.files ? a.dataTransfer.files : null
			}
			return {
				outputRule: function(a) {
					utils.each(a.getNodesByTagName("img"), function(a) {
						/\b(loaderrorclass)|(bloaderrorclass)\b/.test(a.getAttr("class")) && a.parentNode.removeChild(a)
					}), utils.each(a.getNodesByTagName("p"), function(a) {
						/\bloadpara\b/.test(a.getAttr("class")) && a.parentNode.removeChild(a)
					})
				},
				bindEvents: {
					ready: function() {
						var e = this;
						window.FormData && window.FileReader && (domUtils.on(e.body, "paste drop", function(d) {
							var i, h, f = !1,
								g = "paste" == d.type ? b(d) : c(d);
							if (g) {
								for (h = g.length; h--;) i = g[h], i.getAsFile && (i = i.getAsFile()), i && i.size > 0 && (a(i, e), f = !0);
								f && d.preventDefault()
							}
						}), domUtils.on(e.body, "dragover", function(a) {
							"Files" == a.dataTransfer.types[0] && a.preventDefault()
						}), utils.cssRule("loading", ".loadingclass{display:inline-block;cursor:default;background: url('" + this.options.themePath + this.options.theme + "/images/loading.gif') no-repeat center center transparent;border:1px solid #cccccc;margin-left:1px;height: 22px;width: 22px;}\n" + ".loaderrorclass{display:inline-block;cursor:default;background: url('" + this.options.themePath + this.options.theme + "/images/loaderror.png') no-repeat center center transparent;border:1px solid #cccccc;margin-right:1px;height: 22px;width: 22px;" + "}", this.document))
					}
				}
			}
		}), UE.plugin.register("autosave", function() {
			function e(e) {
				var f;
				if (!(new Date - b < c)) {
					if (!e.hasContents()) return d && a.removePreferences(d), void 0;
					b = new Date, e._saveFlag = null, f = a.body.innerHTML, e.fireEvent("beforeautosave", {
						content: f
					}) !== !1 && (a.setPreferences(d, f), e.fireEvent("afterautosave", {
						content: f
					}))
				}
			}
			var a = this,
				b = new Date,
				c = 20,
				d = null;
			return {
				defaultOptions: {
					saveInterval: 500
				},
				bindEvents: {
					ready: function() {
						var b = "-drafts-data",
							c = null;
						c = a.key ? a.key + b : (a.container.parentNode.id || "ue-common") + b, d = (location.protocol + location.host + location.pathname).replace(/[.:\/]/g, "_") + c
					},
					contentchange: function() {
						d && (a._saveFlag && window.clearTimeout(a._saveFlag), a.options.saveInterval > 0 ? a._saveFlag = window.setTimeout(function() {
							e(a)
						}, a.options.saveInterval) : e(a))
					}
				},
				commands: {
					clearlocaldata: {
						execCommand: function() {
							d && a.getPreferences(d) && a.removePreferences(d)
						},
						notNeedUndo: !0,
						ignoreContentChange: !0
					},
					getlocaldata: {
						execCommand: function() {
							return d ? a.getPreferences(d) || "" : ""
						},
						notNeedUndo: !0,
						ignoreContentChange: !0
					},
					drafts: {
						execCommand: function() {
							d && (a.body.innerHTML = a.getPreferences(d) || "<p>" + domUtils.fillHtml + "</p>", a.focus(!0))
						},
						queryCommandState: function() {
							return d ? null === a.getPreferences(d) ? -1 : 0 : -1
						},
						notNeedUndo: !0,
						ignoreContentChange: !0
					}
				}
			}
		}), UE.plugin.register("charts", function() {
			function b(a) {
				var e, d, f, g, h, b = null,
					c = 0;
				if (a.rows.length < 2) return !1;
				if (a.rows[0].cells.length < 2) return !1;
				for (b = a.rows[0].cells, c = b.length, d = 0; e = b[d]; d++)
					if ("th" !== e.tagName.toLowerCase()) return !1;
				for (d = 1; f = a.rows[d]; d++) {
					if (f.cells.length != c) return !1;
					if ("th" !== f.cells[0].tagName.toLowerCase()) return !1;
					for (g = 1; e = f.cells[g]; g++)
						if (h = utils.trim(e.innerText || e.textContent || ""), h = h.replace(new RegExp(UE.dom.domUtils.fillChar, "g"), "").replace(/^\s+|\s+$/g, ""), !/^\d*\.?\d+$/.test(h)) return !1
				}
				return !0
			}
			var a = this;
			return {
				bindEvents: {
					chartserror: function() {}
				},
				commands: {
					charts: {
						execCommand: function(c, d) {
							var h, e = domUtils.findParentByTagName(this.selection.getRange().startContainer, "table", !0),
								f = [],
								g = {};
							if (!e) return !1;
							if (!b(e)) return a.fireEvent("chartserror"), !1;
							g.title = d.title || "", g.subTitle = d.subTitle || "", g.xTitle = d.xTitle || "", g.yTitle = d.yTitle || "", g.suffix = d.suffix || "", g.tip = d.tip || "", g.dataFormat = d.tableDataFormat || "", g.chartType = d.chartType || 0;
							for (h in g) g.hasOwnProperty(h) && f.push(h + ":" + g[h]);
							e.setAttribute("data-chart", f.join(";")), domUtils.addClass(e, "edui-charts-table")
						},
						queryCommandState: function() {
							var d = domUtils.findParentByTagName(this.selection.getRange().startContainer, "table", !0);
							return d && b(d) ? 0 : -1
						}
					}
				},
				inputRule: function(a) {
					utils.each(a.getNodesByTagName("table"), function(a) {
						void 0 !== a.getAttr("data-chart") && a.setAttr("style")
					})
				},
				outputRule: function(a) {
					utils.each(a.getNodesByTagName("table"), function(a) {
						void 0 !== a.getAttr("data-chart") && a.setAttr("style", "display: none;")
					})
				}
			}
		}), UE.plugin.register("section", function() {
			function a() {
				this.tag = "", this.level = -1, this.dom = null, this.nextSection = null, this.previousSection = null, this.parentSection = null, this.startAddress = [], this.endAddress = [], this.children = []
			}

			function b(b) {
				var c = new a;
				return utils.extend(c, b)
			}

			function c(a, b) {
				var d, c = b;
				for (d = 0; d < a.length; d++) {
					if (!c.childNodes) return null;
					c = c.childNodes[a[d]]
				}
				return c
			}
			var d = this;
			return {
				bindMultiEvents: {
					type: "aftersetcontent afterscencerestore",
					handler: function() {
						d.fireEvent("updateSections")
					}
				},
				bindEvents: {
					ready: function() {
						d.fireEvent("updateSections"), domUtils.on(d.body, "drop paste", function() {
							d.fireEvent("updateSections")
						})
					},
					afterexeccommand: function(a, b) {
						"paragraph" == b && d.fireEvent("updateSections")
					},
					keyup: function(a, b) {
						var e, c = this,
							d = c.selection.getRange();
						1 != d.collapsed ? c.fireEvent("updateSections") : (e = b.keyCode || b.which, (13 == e || 8 == e || 46 == e) && c.fireEvent("updateSections"))
					}
				},
				commands: {
					getsections: {
						execCommand: function(a, c) {
							function f(a) {
								for (var b = 0; b < d.length; b++)
									if (d[b](a)) return b;
								return -1
							}

							function j(a, c) {
								var d, h, k, m, n, o, p, e = null,
									l = a.childNodes;
								for (m = 0, n = l.length; n > m; m++)
									if (k = l[m], d = f(k), d >= 0) {
										for (o = g.selection.getRange().selectNode(k).createAddress(!0).startAddress, p = b({
												tag: k.tagName,
												title: k.innerText || k.textContent || "",
												level: d,
												dom: k,
												startAddress: utils.clone(o, []),
												endAddress: utils.clone(o, []),
												children: []
											}), i.nextSection = p, p.previousSection = i, h = i; d <= h.level;) h = h.parentSection;
										p.parentSection = h, h.children.push(p), e = i = p
									} else 1 === k.nodeType && j(k, c), e && e.endAddress[e.endAddress.length - 1]++
							}
							var e, g, h, i, d = c || ["h1", "h2", "h3", "h4", "h5", "h6"];
							for (e = 0; e < d.length; e++) "string" == typeof d[e] ? d[e] = function(a) {
								return function(b) {
									return b.tagName == a.toUpperCase()
								}
							}(d[e]) : "function" != typeof d[e] && (d[e] = function() {
								return null
							});
							return g = this, h = b({
								level: -1,
								title: "root"
							}), i = h, j(g.body, h), h
						},
						notNeedUndo: !0
					},
					movesection: {
						execCommand: function(a, b, d, e) {
							function m(a, b, c) {
								var f, d = !1,
									e = !1;
								for (f = 0; f < a.length && !(f >= c.length); f++) {
									if (c[f] > a[f]) {
										d = !0;
										break
									}
									if (c[f] < a[f]) break
								}
								for (f = 0; f < b.length && !(f >= c.length); f++) {
									if (c[f] < a[f]) {
										e = !0;
										break
									}
									if (c[f] > a[f]) break
								}
								return d && e
							}
							var g, h, k, l, i, j, f = this;
							if (b && d && -1 != d.level && (g = e ? d.endAddress : d.startAddress, h = c(g, f.body), g && h && !m(b.startAddress, b.endAddress, g))) {
								if (i = c(b.startAddress, f.body), j = c(b.endAddress, f.body), e)
									for (k = j; k && !(domUtils.getPosition(i, k) & domUtils.POSITION_FOLLOWING) && (l = k.previousSibling, domUtils.insertAfter(h, k), k != i);) k = l;
								else
									for (k = i; k && !(domUtils.getPosition(k, j) & domUtils.POSITION_FOLLOWING) && (l = k.nextSibling, h.parentNode.insertBefore(k, h), k != j);) k = l;
								f.fireEvent("updateSections")
							}
						}
					},
					deletesection: {
						execCommand: function(a, b, c) {
							function e(a) {
								var c, b = d.body;
								for (c = 0; c < a.length; c++) {
									if (!b.childNodes) return null;
									b = b.childNodes[a[c]]
								}
								return b
							}
							var i, f, g, h, d = this;
							if (b) {
								if (f = e(b.startAddress), g = e(b.endAddress), h = f, c) domUtils.remove(h);
								else
									for (; h && domUtils.inDoc(g, d.document) && !(domUtils.getPosition(h, g) & domUtils.POSITION_FOLLOWING);) i = h.nextSibling, domUtils.remove(h), h = i;
								d.fireEvent("updateSections")
							}
						}
					},
					selectsection: {
						execCommand: function(a, b) {
							if (!b && !b.dom) return !1;
							var c = this,
								d = c.selection.getRange(),
								e = {
									startAddress: utils.clone(b.startAddress, []),
									endAddress: utils.clone(b.endAddress, [])
								};
							return e.endAddress[e.endAddress.length - 1]++, d.moveToAddress(e).select().scrollToView(), !0
						},
						notNeedUndo: !0
					},
					scrolltosection: {
						execCommand: function(a, b) {
							if (!b && !b.dom) return !1;
							var c = this,
								d = c.selection.getRange(),
								e = {
									startAddress: b.startAddress,
									endAddress: b.endAddress
								};
							return e.endAddress[e.endAddress.length - 1]++, d.moveToAddress(e).scrollToView(), !0
						},
						notNeedUndo: !0
					}
				}
			}
		}), UE.plugin.register("simpleupload", function() {
			function d() {
				var d = c.offsetWidth || 20,
					e = c.offsetHeight || 20,
					f = document.createElement("iframe"),
					g = "display:block;width:" + d + "px;height:" + e + "px;overflow:hidden;border:0;margin:0;padding:0;position:absolute;top:0;left:0;filter:alpha(opacity=0);-moz-opacity:0;-khtml-opacity: 0;opacity: 0;cursor:pointer;";
				domUtils.on(f, "load", function() {
					var k, l, m, n, c = (+new Date).toString(36),
						i = f.contentDocument || f.contentWindow.document,
						j = i.body,
						h = i.createElement("div");
					h.innerHTML = '<form id="edui_form_' + c + '" target="edui_iframe_' + c + '" method="POST" enctype="multipart/form-data" action="' + a.getOpt("serverUrl") + '" ' + 'style="' + g + '">' + '<input id="edui_input_' + c + '" type="file" accept="image/*" name="' + a.options.imageFieldName + '" ' + 'style="' + g + '">' + "</form>" + '<iframe id="edui_iframe_' + c + '" name="edui_iframe_' + c + '" style="display:none;width:0;height:0;border:0;margin:0;padding:0;position:absolute;"></iframe>', h.className = "edui-" + a.options.theme, h.id = a.ui.id + "_iframeupload", j.style.cssText = g, j.style.width = d + "px", j.style.height = e + "px", j.appendChild(h), j.parentNode && (j.parentNode.style.width = d + "px", j.parentNode.style.height = d + "px"), k = i.getElementById("edui_form_" + c), l = i.getElementById("edui_input_" + c), m = i.getElementById("edui_iframe_" + c), domUtils.on(l, "change", function() {
						function f() {
							try {
								var c, d, e, h = (m.contentDocument || m.contentWindow.document).body,
									i = h.innerText || h.textContent || "";
								d = new Function("return " + i)(), c = a.options.imageUrlPrefix + d.url, "SUCCESS" == d.state && d.url ? (e = a.document.getElementById(b), e.setAttribute("src", c), e.setAttribute("_src", c), e.setAttribute("title", d.title || ""), e.setAttribute("alt", d.original || ""), e.removeAttribute("id"), domUtils.removeClasses(e, "loadingclass")) : g && g(d.state)
							} catch (j) {
								g && g(a.getLang("simpleupload.loadError"))
							}
							k.reset(), domUtils.un(m, "load", f)
						}

						function g(c) {
							if (b) {
								var d = a.document.getElementById(b);
								d && domUtils.remove(d), a.fireEvent("showmessage", {
									id: b,
									content: c,
									type: "error",
									timeout: 4e3
								})
							}
						}
						var b, c, d, e, h, i;
						if (l.value) {
							if (b = "loading_" + (+new Date).toString(36), c = utils.serializeParam(a.queryCommandValue("serverparam")) || "", d = a.getActionUrl(a.getOpt("imageActionName")), e = a.getOpt("imageAllowFiles"), a.focus(), a.execCommand("inserthtml", '<img class="loadingclass" id="' + b + '" src="' + a.options.themePath + a.options.theme + '/images/spacer.gif" title="' + (a.getLang("simpleupload.loading") || "") + '" >'), !a.getOpt("imageActionName")) return errorHandler(a.getLang("autoupload.errorLoadConfig")), void 0;
							if (h = l.value, i = h ? h.substr(h.lastIndexOf(".")) : "", !i || e && -1 == (e.join("") + ".").indexOf(i.toLowerCase() + ".")) return g(a.getLang("simpleupload.exceedTypeError")), void 0;
							domUtils.on(m, "load", f), k.action = utils.formatUrl(d + (-1 == d.indexOf("?") ? "?" : "&") + c), k.submit()
						}
					}), a.addListener("selectionchange", function() {
						clearTimeout(n), n = setTimeout(function() {
							var b = a.queryCommandState("simpleupload");
							l.disabled = -1 == b ? "disabled" : !1
						}, 400)
					}), b = !0
				}), f.style.cssText = g, c.appendChild(f)
			}
			var c, a = this,
				b = !1;
			return {
				bindEvents: {
					ready: function() {
						utils.cssRule("loading", ".loadingclass{display:inline-block;cursor:default;background: url('" + this.options.themePath + this.options.theme + "/images/loading.gif') no-repeat center center transparent;border:1px solid #cccccc;margin-right:1px;height: 22px;width: 22px;}\n" + ".loaderrorclass{display:inline-block;cursor:default;background: url('" + this.options.themePath + this.options.theme + "/images/loaderror.png') no-repeat center center transparent;border:1px solid #cccccc;margin-right:1px;height: 22px;width: 22px;" + "}", this.document)
					},
					simpleuploadbtnready: function(b, e) {
						c = e, a.afterConfigReady(d)
					}
				},
				outputRule: function(a) {
					utils.each(a.getNodesByTagName("img"), function(a) {
						/\b(loaderrorclass)|(bloaderrorclass)\b/.test(a.getAttr("class")) && a.parentNode.removeChild(a)
					})
				},
				commands: {
					simpleupload: {
						queryCommandState: function() {
							return b ? 0 : -1
						}
					}
				}
			}
		}), UE.plugin.register("serverparam", function() {
			var b = {};
			return {
				commands: {
					serverparam: {
						execCommand: function(a, c, d) {
							void 0 === c || null === c ? b = {} : utils.isString(c) ? void 0 === d || null === d ? delete b[c] : b[c] = d : utils.isObject(c) ? utils.extend(b, c, !0) : utils.isFunction(c) && utils.extend(b, c(), !0)
						},
						queryCommandValue: function() {
							return b || {}
						}
					}
				}
			}
		}), UE.plugin.register("insertfile", function() {
			function b(a) {
				var b = a.substr(a.lastIndexOf(".") + 1).toLowerCase(),
					c = {
						rar: "icon_rar.gif",
						zip: "icon_rar.gif",
						tar: "icon_rar.gif",
						gz: "icon_rar.gif",
						bz2: "icon_rar.gif",
						doc: "icon_doc.gif",
						docx: "icon_doc.gif",
						pdf: "icon_pdf.gif",
						mp3: "icon_mp3.gif",
						xls: "icon_xls.gif",
						chm: "icon_chm.gif",
						ppt: "icon_ppt.gif",
						pptx: "icon_ppt.gif",
						avi: "icon_mv.gif",
						rmvb: "icon_mv.gif",
						wmv: "icon_mv.gif",
						flv: "icon_mv.gif",
						swf: "icon_mv.gif",
						rm: "icon_mv.gif",
						exe: "icon_exe.gif",
						psd: "icon_psd.gif",
						txt: "icon_txt.gif",
						jpg: "icon_jpg.gif",
						png: "icon_jpg.gif",
						jpeg: "icon_jpg.gif",
						gif: "icon_jpg.gif",
						ico: "icon_jpg.gif",
						bmp: "icon_jpg.gif"
					};
				return c[b] ? c[b] : c["txt"]
			}
			var a = this;
			return {
				commands: {
					insertfile: {
						execCommand: function(c, d) {
							d = utils.isArray(d) ? d : [d];
							var e, f, g, h, i = "",
								j = a.getOpt("UEDITOR_HOME_URL"),
								k = j + ("/" == j.substr(j.length - 1) ? "" : "/") + "dialogs/attachment/fileTypeImages/";
							for (e = 0; e < d.length; e++) f = d[e], g = k + b(f.url), h = f.title || f.url.substr(f.url.lastIndexOf("/") + 1), i += '<p style="line-height: 16px;"><img style="vertical-align: middle; margin-right: 2px;" src="' + g + '" _src="' + g + '" />' + '<a style="font-size:12px; color:#0066cc;" href="' + f.url + '" title="' + h + '">' + h + "</a>" + "</p>";
							a.execCommand("insertHtml", i)
						}
					}
				}
			}
		}), baidu = baidu || {}, baidu.editor = baidu.editor || {}, UE.ui = baidu.editor.ui = {},
		function() {
			function h() {
				var a = document.getElementById("edui_fixedlayer");
				g.setViewportOffset(a, {
					left: 0,
					top: 0
				})
			}

			function i() {
				b.on(window, "scroll", h), b.on(window, "resize", baidu.editor.utils.defer(h, 0, !0))
			}
			var a = baidu.editor.browser,
				b = baidu.editor.dom.domUtils,
				c = "$EDITORUI",
				d = window[c] = {},
				e = "ID" + c,
				f = 0,
				g = baidu.editor.ui.uiUtils = {
					uid: function(a) {
						return a ? a[e] || (a[e] = ++f) : ++f
					},
					hook: function(a, b) {
						var c;
						return a && a._callbacks ? c = a : (c = function() {
							var b, d, e, f;
							for (a && (b = a.apply(this, arguments)), d = c._callbacks, e = d.length; e--;) f = d[e].apply(this, arguments), void 0 === b && (b = f);
							return b
						}, c._callbacks = []), c._callbacks.push(b), c
					},
					createElementByHtml: function(a) {
						var b = document.createElement("div");
						return b.innerHTML = a, b = b.firstChild, b.parentNode.removeChild(b), b
					},
					getViewportElement: function() {
						return a.ie && a.quirks ? document.body : document.documentElement
					},
					getClientRect: function(a) {
						var c, e, f;
						try {
							c = a.getBoundingClientRect()
						} catch (d) {
							c = {
								left: 0,
								top: 0,
								height: 0,
								width: 0
							}
						}
						for (e = {
								left: Math.round(c.left),
								top: Math.round(c.top),
								height: Math.round(c.bottom - c.top),
								width: Math.round(c.right - c.left)
							};
							(f = a.ownerDocument) !== document && (a = b.getWindow(f).frameElement);) c = a.getBoundingClientRect(), e.left += c.left, e.top += c.top;
						return e.bottom = e.top + e.height, e.right = e.left + e.width, e
					},
					getViewportRect: function() {
						var a = g.getViewportElement(),
							b = 0 | (window.innerWidth || a.clientWidth),
							c = 0 | (window.innerHeight || a.clientHeight);
						return {
							left: 0,
							top: 0,
							height: c,
							width: b,
							bottom: c,
							right: b
						}
					},
					setViewportOffset: function(a, c) {
						var e = g.getFixedLayer();
						a.parentNode === e ? (a.style.left = c.left + "px", a.style.top = c.top + "px") : b.setViewportOffset(a, c)
					},
					getEventOffset: function(a) {
						var b = a.target || a.srcElement,
							c = g.getClientRect(b),
							d = g.getViewportOffsetByEvent(a);
						return {
							left: d.left - c.left,
							top: d.top - c.top
						}
					},
					getViewportOffsetByEvent: function(a) {
						var f, c = a.target || a.srcElement,
							d = b.getWindow(c).frameElement,
							e = {
								left: a.clientX,
								top: a.clientY
							};
						return d && c.ownerDocument !== document && (f = g.getClientRect(d), e.left += f.left, e.top += f.top), e
					},
					setGlobal: function(a, b) {
						return d[a] = b, c + '["' + a + '"]'
					},
					unsetGlobal: function(a) {
						delete d[a]
					},
					copyAttributes: function(c, d) {
						for (var g, e = d.attributes, f = e.length; f--;) g = e[f], "style" == g.nodeName || "class" == g.nodeName || a.ie && !g.specified || c.setAttribute(g.nodeName, g.nodeValue);
						d.className && b.addClass(c, d.className), d.style.cssText && (c.style.cssText += ";" + d.style.cssText)
					},
					removeStyle: function(a, b) {
						if (a.style.removeProperty) a.style.removeProperty(b);
						else {
							if (!a.style.removeAttribute) throw "";
							a.style.removeAttribute(b)
						}
					},
					contains: function(a, b) {
						return a && b && (a === b ? !1 : a.contains ? a.contains(b) : 16 & a.compareDocumentPosition(b))
					},
					startDrag: function(a, b, c) {
						function f(a) {
							var c = a.clientX - d,
								f = a.clientY - e;
							b.ondragmove(c, f, a), a.stopPropagation ? a.stopPropagation() : a.cancelBubble = !0
						}

						function g() {
							c.removeEventListener("mousemove", f, !0), c.removeEventListener("mouseup", g, !0), window.removeEventListener("mouseup", g, !0), b.ondragstop()
						}

						function i() {
							h.releaseCapture(), h.detachEvent("onmousemove", f), h.detachEvent("onmouseup", i), h.detachEvent("onlosecaptrue", i), b.ondragstop()
						}
						var d, e, h;
						c = c || document, d = a.clientX, e = a.clientY, c.addEventListener ? (c.addEventListener("mousemove", f, !0), c.addEventListener("mouseup", g, !0), window.addEventListener("mouseup", g, !0), a.preventDefault()) : (h = a.srcElement, h.setCapture(), h.attachEvent("onmousemove", f), h.attachEvent("onmouseup", i), h.attachEvent("onlosecaptrue", i), a.returnValue = !1), b.ondragstart()
					},
					getFixedLayer: function() {
						var b = document.getElementById("edui_fixedlayer");
						return null == b && (b = document.createElement("div"), b.id = "edui_fixedlayer", document.body.appendChild(b), a.ie && a.version <= 8 ? (b.style.position = "absolute", i(), setTimeout(h)) : b.style.position = "fixed", b.style.left = "0", b.style.top = "0", b.style.width = "0", b.style.height = "0"), b
					},
					makeUnselectable: function(b) {
						if (a.opera || a.ie && a.version < 9) {
							if (b.unselectable = "on", b.hasChildNodes())
								for (var c = 0; c < b.childNodes.length; c++) 1 == b.childNodes[c].nodeType && g.makeUnselectable(b.childNodes[c])
						} else void 0 !== b.style.MozUserSelect ? b.style.MozUserSelect = "none" : void 0 !== b.style.WebkitUserSelect ? b.style.WebkitUserSelect = "none" : void 0 !== b.style.KhtmlUserSelect && (b.style.KhtmlUserSelect = "none")
					}
				}
		}(),
		function() {
			var a = baidu.editor.utils,
				b = baidu.editor.ui.uiUtils,
				c = baidu.editor.EventBase,
				d = baidu.editor.ui.UIBase = function() {};
			d.prototype = {
				className: "",
				uiName: "",
				initOptions: function(a) {
					var d, c = this;
					for (d in a) c[d] = a[d];
					this.id = this.id || "edui" + b.uid()
				},
				initUIBase: function() {
					this._globalKey = a.unhtml(b.setGlobal(this.id, this))
				},
				render: function(a) {
					var i, h, j, c = this.renderHtml(),
						d = b.createElementByHtml(c),
						e = domUtils.getElementsByTagName(d, "*"),
						f = "edui-" + (this.theme || this.editor.options.theme),
						g = document.getElementById("edui_fixedlayer");
					for (h = 0; i = e[h++];) domUtils.addClass(i, f);
					domUtils.addClass(d, f), g && (g.className = "", domUtils.addClass(g, f)), j = this.getDom(), null != j ? (j.parentNode.replaceChild(d, j), b.copyAttributes(d, j)) : ("string" == typeof a && (a = document.getElementById(a)), a = a || b.getFixedLayer(), domUtils.addClass(a, f), a.appendChild(d)), this.postRender()
				},
				getDom: function(a) {
					return a ? document.getElementById(this.id + "_" + a) : document.getElementById(this.id)
				},
				postRender: function() {
					this.fireEvent("postrender")
				},
				getHtmlTpl: function() {
					return ""
				},
				formatHtml: function(a) {
					var b = "edui-" + this.uiName;
					return a.replace(/##/g, this.id).replace(/%%-/g, this.uiName ? b + "-" : "").replace(/%%/g, (this.uiName ? b : "") + " " + this.className).replace(/\$\$/g, this._globalKey)
				},
				renderHtml: function() {
					return this.formatHtml(this.getHtmlTpl())
				},
				dispose: function() {
					var a = this.getDom();
					a && baidu.editor.dom.domUtils.remove(a), b.unsetGlobal(this.id)
				}
			}, a.inherits(d, c)
		}(),
		function() {
			var a = baidu.editor.utils,
				b = baidu.editor.ui.UIBase,
				c = baidu.editor.ui.Separator = function(a) {
					this.initOptions(a), this.initSeparator()
				};
			c.prototype = {
				uiName: "separator",
				initSeparator: function() {
					this.initUIBase()
				},
				getHtmlTpl: function() {
					return '<div id="##" class="edui-box %%"></div>'
				}
			}, a.inherits(c, b)
		}(),
		function() {
			var a = baidu.editor.utils,
				b = baidu.editor.dom.domUtils,
				c = baidu.editor.ui.UIBase,
				d = baidu.editor.ui.uiUtils,
				e = baidu.editor.ui.Mask = function(a) {
					this.initOptions(a), this.initUIBase()
				};
			e.prototype = {
				getHtmlTpl: function() {
					return '<div id="##" class="edui-mask %%" onclick="return $$._onClick(event, this);" onmousedown="return $$._onMouseDown(event, this);"></div>'
				},
				postRender: function() {
					var a = this;
					b.on(window, "resize", function() {
						setTimeout(function() {
							a.isHidden() || a._fill()
						})
					})
				},
				show: function(a) {
					this._fill(), this.getDom().style.display = "", this.getDom().style.zIndex = a
				},
				hide: function() {
					this.getDom().style.display = "none", this.getDom().style.zIndex = ""
				},
				isHidden: function() {
					return "none" == this.getDom().style.display
				},
				_onMouseDown: function() {
					return !1
				},
				_onClick: function(a, b) {
					this.fireEvent("click", a, b)
				},
				_fill: function() {
					var a = this.getDom(),
						b = d.getViewportRect();
					a.style.width = b.width + "px", a.style.height = b.height + "px"
				}
			}, a.inherits(e, c)
		}(),
		function() {
			function g(a, b) {
				var c, d;
				for (c = 0; c < f.length; c++)
					if (d = f[c], !d.isHidden() && d.queryAutoHide(b) !== !1) {
						if (a && /scroll/gi.test(a.type) && "edui-wordpastepop" == d.className) return;
						d.hide()
					}
				f.length && d.editor.fireEvent("afterhidepop")
			}
			var h, a = baidu.editor.utils,
				b = baidu.editor.ui.uiUtils,
				c = baidu.editor.dom.domUtils,
				d = baidu.editor.ui.UIBase,
				e = baidu.editor.ui.Popup = function(a) {
					this.initOptions(a), this.initPopup()
				},
				f = [];
			e.postHide = g, h = ["edui-anchor-topleft", "edui-anchor-topright", "edui-anchor-bottomleft", "edui-anchor-bottomright"], e.prototype = {
				SHADOW_RADIUS: 5,
				content: null,
				_hidden: !1,
				autoRender: !0,
				canSideLeft: !0,
				canSideUp: !0,
				initPopup: function() {
					this.initUIBase(), f.push(this)
				},
				getHtmlTpl: function() {
					return '<div id="##" class="edui-popup %%" onmousedown="return false;"> <div id="##_body" class="edui-popup-body"> <iframe style="position:absolute;z-index:-1;left:0;top:0;background-color: transparent;" frameborder="0" width="100%" height="100%" src="about:blank"></iframe> <div class="edui-shadow"></div> <div id="##_content" class="edui-popup-content">' + this.getContentHtmlTpl() + "  </div>" + " </div>" + "</div>"
				},
				getContentHtmlTpl: function() {
					return this.content ? "string" == typeof this.content ? this.content : this.content.renderHtml() : ""
				},
				_UIBase_postRender: d.prototype.postRender,
				postRender: function() {
					if (this.content instanceof d && this.content.postRender(), this.captureWheel && !this.captured) {
						this.captured = !0;
						var a = (document.documentElement.clientHeight || document.body.clientHeight) - 80,
							e = this.getDom().offsetHeight,
							f = b.getClientRect(this.combox.getDom()).top,
							g = this.getDom("content"),
							h = this.getDom("body").getElementsByTagName("iframe"),
							i = this;
						for (h.length && (h = h[0]); f + e > a;) e -= 30;
						g.style.height = e + "px", h && (h.style.height = e + "px"), window.XMLHttpRequest ? c.on(g, "onmousewheel" in document.body ? "mousewheel" : "DOMMouseScroll", function(a) {
							a.preventDefault ? a.preventDefault() : a.returnValue = !1, g.scrollTop -= a.wheelDelta ? 60 * (a.wheelDelta / 120) : 60 * (a.detail / -3)
						}) : c.on(this.getDom(), "mousewheel", function(a) {
							a.returnValue = !1, i.getDom("content").scrollTop -= 60 * (a.wheelDelta / 120)
						})
					}
					this.fireEvent("postRenderAfter"), this.hide(!0), this._UIBase_postRender()
				},
				_doAutoRender: function() {
					!this.getDom() && this.autoRender && this.render()
				},
				mesureSize: function() {
					var a = this.getDom("content");
					return b.getClientRect(a)
				},
				fitSize: function() {
					var a, b, c;
					return this.captureWheel && this.sized ? this.__size : (this.sized = !0, a = this.getDom("body"), a.style.width = "", a.style.height = "", b = this.mesureSize(), this.captureWheel ? (a.style.width = -(-20 - b.width) + "px", c = parseInt(this.getDom("content").style.height, 10), !window.isNaN(c) && (b.height = c)) : a.style.width = b.width + "px", a.style.height = b.height + "px", this.__size = b, this.captureWheel && (this.getDom("content").style.overflow = "auto"), b)
				},
				showAnchor: function(a, c) {
					this.showAnchorRect(b.getClientRect(a), c)
				},
				showAnchorRect: function(a, d) {
					var f, g, i, j, k, l, m;
					this._doAutoRender(), f = b.getViewportRect(), this.getDom().style.visibility = "hidden", this._show(), g = this.fitSize(), d ? (i = this.canSideLeft && a.right + g.width > f.right && a.left > g.width, j = this.canSideUp && a.top + g.height > f.bottom && a.bottom > g.height, k = i ? a.left - g.width : a.right, l = j ? a.bottom - g.height : a.top) : (i = this.canSideLeft && a.right + g.width > f.right && a.left > g.width, j = this.canSideUp && a.top + g.height > f.bottom && a.bottom > g.height, k = i ? a.right - g.width : a.left, l = j ? a.top - g.height : a.bottom), m = this.getDom(), b.setViewportOffset(m, {
						left: k,
						top: l
					}), c.removeClasses(m, h), m.className += " " + h[2 * (j ? 1 : 0) + (i ? 1 : 0)], this.editor && (m.style.zIndex = 1 * this.editor.container.style.zIndex + 10, baidu.editor.ui.uiUtils.getFixedLayer().style.zIndex = m.style.zIndex - 1), this.getDom().style.visibility = "visible"
				},
				showAt: function(a) {
					var b = a.left,
						c = a.top,
						d = {
							left: b,
							top: c,
							right: b,
							bottom: c,
							height: 0,
							width: 0
						};
					this.showAnchorRect(d, !1, !0)
				},
				_show: function() {
					if (this._hidden) {
						var a = this.getDom();
						a.style.display = "", this._hidden = !1, this.fireEvent("show")
					}
				},
				isHidden: function() {
					return this._hidden
				},
				show: function() {
					this._doAutoRender(), this._show()
				},
				hide: function(a) {
					!this._hidden && this.getDom() && (this.getDom().style.display = "none", this._hidden = !0, a || this.fireEvent("hide"))
				},
				queryAutoHide: function(a) {
					return !a || !b.contains(this.getDom(), a)
				}
			}, a.inherits(e, d), c.on(document, "mousedown", function(a) {
				var b = a.target || a.srcElement;
				g(a, b)
			}), c.on(window, "scroll", function(a, b) {
				g(a, b)
			})
		}(),
		function() {
			function e(a, b) {
				var e, c = '<div id="##" class="edui-colorpicker %%"><div class="edui-colorpicker-topbar edui-clearfix"><div unselectable="on" id="##_preview" class="edui-colorpicker-preview"></div><div unselectable="on" class="edui-colorpicker-nocolor" onclick="$$._onPickNoColor(event, this);">' + a + "</div>" + "</div>" + '<table  class="edui-box" style="border-collapse: collapse;" onmouseover="$$._onTableOver(event, this);" onmouseout="$$._onTableOut(event, this);" onclick="return $$._onTableClick(event, this);" cellspacing="0" cellpadding="0">' + '<tr style="border-bottom: 1px solid #ddd;font-size: 13px;line-height: 25px;color:#39C;padding-top: 2px"><td colspan="10">' + b.getLang("themeColor") + "</td> </tr>" + '<tr class="edui-colorpicker-tablefirstrow" >';
				for (e = 0; e < d.length; e++) e && 0 === e % 10 && (c += "</tr>" + (60 == e ? '<tr style="border-bottom: 1px solid #ddd;font-size: 13px;line-height: 25px;color:#39C;"><td colspan="10">' + b.getLang("standardColor") + "</td></tr>" : "") + "<tr" + (60 == e ? ' class="edui-colorpicker-tablefirstrow"' : "") + ">"), c += 70 > e ? '<td style="padding: 0 2px;"><a hidefocus title="' + d[e] + '" onclick="return false;" href="javascript:" unselectable="on" class="edui-box edui-colorpicker-colorcell"' + ' data-color="#' + d[e] + '"' + ' style="background-color:#' + d[e] + ";border:solid #ccc;" + (10 > e || e >= 60 ? "border-width:1px;" : e >= 10 && 20 > e ? "border-width:1px 1px 0 1px;" : "border-width:0 1px 0 1px;") + '"' + "></a></td>" : "";
				return c += "</tr></table></div>"
			}
			var d, a = baidu.editor.utils,
				b = baidu.editor.ui.UIBase,
				c = baidu.editor.ui.ColorPicker = function(a) {
					this.initOptions(a), this.noColorText = this.noColorText || this.editor.getLang("clearColor"), this.initUIBase()
				};
			c.prototype = {
				getHtmlTpl: function() {
					return e(this.noColorText, this.editor)
				},
				_onTableClick: function(a) {
					var b = a.target || a.srcElement,
						c = b.getAttribute("data-color");
					c && this.fireEvent("pickcolor", c)
				},
				_onTableOver: function(a) {
					var b = a.target || a.srcElement,
						c = b.getAttribute("data-color");
					c && (this.getDom("preview").style.backgroundColor = c)
				},
				_onTableOut: function() {
					this.getDom("preview").style.backgroundColor = ""
				},
				_onPickNoColor: function() {
					this.fireEvent("picknocolor")
				}
			}, a.inherits(c, b), d = "ffffff,000000,eeece1,1f497d,4f81bd,c0504d,9bbb59,8064a2,4bacc6,f79646,f2f2f2,7f7f7f,ddd9c3,c6d9f0,dbe5f1,f2dcdb,ebf1dd,e5e0ec,dbeef3,fdeada,d8d8d8,595959,c4bd97,8db3e2,b8cce4,e5b9b7,d7e3bc,ccc1d9,b7dde8,fbd5b5,bfbfbf,3f3f3f,938953,548dd4,95b3d7,d99694,c3d69b,b2a2c7,92cddc,fac08f,a5a5a5,262626,494429,17365d,366092,953734,76923c,5f497a,31859b,e36c09,7f7f7f,0c0c0c,1d1b10,0f243e,244061,632423,4f6128,3f3151,205867,974806,c00000,ff0000,ffc000,ffff00,92d050,00b050,00b0f0,0070c0,002060,7030a0,".split(",")
		}(),
		function() {
			var a = baidu.editor.utils,
				b = baidu.editor.ui.uiUtils,
				c = baidu.editor.ui.UIBase,
				d = baidu.editor.ui.TablePicker = function(a) {
					this.initOptions(a), this.initTablePicker()
				};
			d.prototype = {
				defaultNumRows: 10,
				defaultNumCols: 10,
				maxNumRows: 20,
				maxNumCols: 20,
				numRows: 10,
				numCols: 10,
				lengthOfCellSide: 22,
				initTablePicker: function() {
					this.initUIBase()
				},
				getHtmlTpl: function() {
					return '<div id="##" class="edui-tablepicker %%"><div class="edui-tablepicker-body"><div class="edui-infoarea"><span id="##_label" class="edui-label"></span></div><div class="edui-pickarea" onmousemove="$$._onMouseMove(event, this);" onmouseover="$$._onMouseOver(event, this);" onmouseout="$$._onMouseOut(event, this);" onclick="$$._onClick(event, this);"><div id="##_overlay" class="edui-overlay"></div></div></div></div>'
				},
				_UIBase_render: c.prototype.render,
				render: function(a) {
					this._UIBase_render(a), this.getDom("label").innerHTML = "0" + this.editor.getLang("t_row") + " x 0" + this.editor.getLang("t_col")
				},
				_track: function(a, b) {
					var e, c = this.getDom("overlay").style,
						d = this.lengthOfCellSide;
					c.width = a * d + "px", c.height = b * d + "px", e = this.getDom("label"), e.innerHTML = a + this.editor.getLang("t_col") + " x " + b + this.editor.getLang("t_row"), this.numCols = a, this.numRows = b
				},
				_onMouseOver: function(a, c) {
					var d = a.relatedTarget || a.fromElement;
					b.contains(c, d) || c === d || (this.getDom("label").innerHTML = "0" + this.editor.getLang("t_col") + " x 0" + this.editor.getLang("t_row"), this.getDom("overlay").style.visibility = "")
				},
				_onMouseOut: function(a, c) {
					var d = a.relatedTarget || a.toElement;
					b.contains(c, d) || c === d || (this.getDom("label").innerHTML = "0" + this.editor.getLang("t_col") + " x 0" + this.editor.getLang("t_row"), this.getDom("overlay").style.visibility = "hidden")
				},
				_onMouseMove: function(a) {
					var e, f, g, h;
					this.getDom("overlay").style, e = b.getEventOffset(a), f = this.lengthOfCellSide, g = Math.ceil(e.left / f), h = Math.ceil(e.top / f), this._track(g, h)
				},
				_onClick: function() {
					this.fireEvent("picktable", this.numCols, this.numRows)
				}
			}, a.inherits(d, c)
		}(),
		function() {
			var a = baidu.editor.browser,
				b = baidu.editor.dom.domUtils,
				c = baidu.editor.ui.uiUtils,
				d = 'onmousedown="$$.Stateful_onMouseDown(event, this);" onmouseup="$$.Stateful_onMouseUp(event, this);"' + (a.ie ? ' onmouseenter="$$.Stateful_onMouseEnter(event, this);" onmouseleave="$$.Stateful_onMouseLeave(event, this);"' : ' onmouseover="$$.Stateful_onMouseOver(event, this);" onmouseout="$$.Stateful_onMouseOut(event, this);"');
			baidu.editor.ui.Stateful = {
				alwalysHoverable: !1,
				target: null,
				Stateful_init: function() {
					this._Stateful_dGetHtmlTpl = this.getHtmlTpl, this.getHtmlTpl = this.Stateful_getHtmlTpl
				},
				Stateful_getHtmlTpl: function() {
					var a = this._Stateful_dGetHtmlTpl();
					return a.replace(/stateful/g, function() {
						return d
					})
				},
				Stateful_onMouseEnter: function(a, b) {
					this.target = b, (!this.isDisabled() || this.alwalysHoverable) && (this.addState("hover"), this.fireEvent("over"))
				},
				Stateful_onMouseLeave: function() {
					(!this.isDisabled() || this.alwalysHoverable) && (this.removeState("hover"), this.removeState("active"), this.fireEvent("out"))
				},
				Stateful_onMouseOver: function(a, b) {
					var d = a.relatedTarget;
					c.contains(b, d) || b === d || this.Stateful_onMouseEnter(a, b)
				},
				Stateful_onMouseOut: function(a, b) {
					var d = a.relatedTarget;
					c.contains(b, d) || b === d || this.Stateful_onMouseLeave(a, b)
				},
				Stateful_onMouseDown: function() {
					this.isDisabled() || this.addState("active")
				},
				Stateful_onMouseUp: function() {
					this.isDisabled() || this.removeState("active")
				},
				Stateful_postRender: function() {
					this.disabled && !this.hasState("disabled") && this.addState("disabled")
				},
				hasState: function(a) {
					return b.hasClass(this.getStateDom(), "edui-state-" + a)
				},
				addState: function(a) {
					this.hasState(a) || (this.getStateDom().className += " edui-state-" + a)
				},
				removeState: function(a) {
					this.hasState(a) && b.removeClasses(this.getStateDom(), ["edui-state-" + a])
				},
				getStateDom: function() {
					return this.getDom("state")
				},
				isChecked: function() {
					return this.hasState("checked")
				},
				setChecked: function(a) {
					!this.isDisabled() && a ? this.addState("checked") : this.removeState("checked")
				},
				isDisabled: function() {
					return this.hasState("disabled")
				},
				setDisabled: function(a) {
					a ? (this.removeState("hover"), this.removeState("checked"), this.removeState("active"), this.addState("disabled")) : this.removeState("disabled")
				}
			}
		}(),
		function() {
			var a = baidu.editor.utils,
				b = baidu.editor.ui.UIBase,
				c = baidu.editor.ui.Stateful,
				d = baidu.editor.ui.Button = function(a) {
					var b, c;
					a.name && (b = a.name, c = a.cssRules, a.className || (a.className = "edui-for-" + b), a.cssRules = ".edui-default  .edui-for-" + b + " .edui-icon {" + c + "}"), this.initOptions(a), this.initButton()
				};
			d.prototype = {
				uiName: "button",
				label: "",
				title: "",
				showIcon: !0,
				showText: !0,
				cssRules: "",
				initButton: function() {
					this.initUIBase(), this.Stateful_init(), this.cssRules && a.cssRule("edui-customize-" + this.name + "-style", this.cssRules)
				},
				getHtmlTpl: function() {
					return '<div id="##" class="edui-box %%"><div id="##_state" stateful><div class="%%-wrap"><div id="##_body" unselectable="on" ' + (this.title ? 'title="' + this.title + '"' : "") + ' class="%%-body" onmousedown="return $$._onMouseDown(event, this);" onclick="return $$._onClick(event, this);">' + (this.showIcon ? '<div class="edui-box edui-icon"></div>' : "") + (this.showText ? '<div class="edui-box edui-label">' + this.label + "</div>" : "") + "</div>" + "</div>" + "</div></div>"
				},
				postRender: function() {
					this.Stateful_postRender(), this.setDisabled(this.disabled)
				},
				_onMouseDown: function(a) {
					var b = a.target || a.srcElement,
						c = b && b.tagName && b.tagName.toLowerCase();
					return "input" == c || "object" == c || "object" == c ? !1 : void 0
				},
				_onClick: function() {
					this.isDisabled() || this.fireEvent("click")
				},
				setTitle: function(a) {
					var b = this.getDom("label");
					b.innerHTML = a
				}
			}, a.inherits(d, b), a.extend(d.prototype, c)
		}(),
		function() {
			var a = baidu.editor.utils,
				b = baidu.editor.ui.uiUtils,
				d = (baidu.editor.dom.domUtils, baidu.editor.ui.UIBase),
				e = baidu.editor.ui.Stateful,
				f = baidu.editor.ui.SplitButton = function(a) {
					this.initOptions(a), this.initSplitButton()
				};
			f.prototype = {
				popup: null,
				uiName: "splitbutton",
				title: "",
				initSplitButton: function() {
					if (this.initUIBase(), this.Stateful_init(), null != this.popup) {
						var b = this.popup;
						this.popup = null, this.setPopup(b)
					}
				},
				_UIBase_postRender: d.prototype.postRender,
				postRender: function() {
					this.Stateful_postRender(), this._UIBase_postRender()
				},
				setPopup: function(c) {
					this.popup !== c && (null != this.popup && this.popup.dispose(), c.addListener("show", a.bind(this._onPopupShow, this)), c.addListener("hide", a.bind(this._onPopupHide, this)), c.addListener("postrender", a.bind(function() {
						c.getDom("body").appendChild(b.createElementByHtml('<div id="' + this.popup.id + '_bordereraser" class="edui-bordereraser edui-background" style="width:' + (b.getClientRect(this.getDom()).width + 20) + 'px"></div>')), c.getDom().className += " " + this.className
					}, this)), this.popup = c)
				},
				_onPopupShow: function() {
					this.addState("opened")
				},
				_onPopupHide: function() {
					this.removeState("opened")
				},
				getHtmlTpl: function() {
					return '<div id="##" class="edui-box %%"><div ' + (this.title ? 'title="' + this.title + '"' : "") + ' id="##_state" stateful><div class="%%-body">' + '<div id="##_button_body" class="edui-box edui-button-body" onclick="$$._onButtonClick(event, this);">' + '<div class="edui-box edui-icon"></div>' + "</div>" + '<div class="edui-box edui-splitborder"></div>' + '<div class="edui-box edui-arrow" onclick="$$._onArrowClick();"></div>' + "</div></div></div>"
				},
				showPopup: function() {
					var a = b.getClientRect(this.getDom());
					a.top -= this.popup.SHADOW_RADIUS, a.height += this.popup.SHADOW_RADIUS, this.popup.showAnchorRect(a)
				},
				_onArrowClick: function() {
					this.isDisabled() || this.showPopup()
				},
				_onButtonClick: function() {
					this.isDisabled() || this.fireEvent("buttonclick")
				}
			}, a.inherits(f, d), a.extend(f.prototype, e, !0)
		}(),
		function() {
			var a = baidu.editor.utils,
				b = baidu.editor.ui.uiUtils,
				c = baidu.editor.ui.ColorPicker,
				d = baidu.editor.ui.Popup,
				e = baidu.editor.ui.SplitButton,
				f = baidu.editor.ui.ColorButton = function(a) {
					this.initOptions(a), this.initColorButton()
				};
			f.prototype = {
				initColorButton: function() {
					var a = this;
					this.popup = new d({
						content: new c({
							noColorText: a.editor.getLang("clearColor"),
							editor: a.editor,
							onpickcolor: function(b, c) {
								a._onPickColor(c)
							},
							onpicknocolor: function(b, c) {
								a._onPickNoColor(c)
							}
						}),
						editor: a.editor
					}), this.initSplitButton()
				},
				_SplitButton_postRender: e.prototype.postRender,
				postRender: function() {
					this._SplitButton_postRender(), this.getDom("button_body").appendChild(b.createElementByHtml('<div id="' + this.id + '_colorlump" class="edui-colorlump"></div>')), this.getDom().className += " edui-colorbutton"
				},
				setColor: function(a) {
					this.getDom("colorlump").style.backgroundColor = a, this.color = a
				},
				_onPickColor: function(a) {
					this.fireEvent("pickcolor", a) !== !1 && (this.setColor(a), this.popup.hide())
				},
				_onPickNoColor: function() {
					this.fireEvent("picknocolor") !== !1 && this.popup.hide()
				}
			}, a.inherits(f, e)
		}(),
		function() {
			var a = baidu.editor.utils,
				b = baidu.editor.ui.Popup,
				c = baidu.editor.ui.TablePicker,
				d = baidu.editor.ui.SplitButton,
				e = baidu.editor.ui.TableButton = function(a) {
					this.initOptions(a), this.initTableButton()
				};
			e.prototype = {
				initTableButton: function() {
					var a = this;
					this.popup = new b({
						content: new c({
							editor: a.editor,
							onpicktable: function(b, c, d) {
								a._onPickTable(c, d)
							}
						}),
						editor: a.editor
					}), this.initSplitButton()
				},
				_onPickTable: function(a, b) {
					this.fireEvent("picktable", a, b) !== !1 && this.popup.hide()
				}
			}, a.inherits(e, d)
		}(),
		function() {
			var a = baidu.editor.utils,
				b = baidu.editor.ui.UIBase,
				c = baidu.editor.ui.AutoTypeSetPicker = function(a) {
					this.initOptions(a), this.initAutoTypeSetPicker()
				};
			c.prototype = {
				initAutoTypeSetPicker: function() {
					this.initUIBase()
				},
				getHtmlTpl: function() {
					var a = this.editor,
						b = a.options.autotypeset,
						c = a.getLang("autoTypeSet"),
						d = "textAlignValue" + a.uid,
						e = "imageBlockLineValue" + a.uid,
						f = "symbolConverValue" + a.uid;
					return '<div id="##" class="edui-autotypesetpicker %%"><div class="edui-autotypesetpicker-body"><table ><tr><td nowrap><input type="checkbox" name="mergeEmptyline" ' + (b["mergeEmptyline"] ? "checked" : "") + ">" + c.mergeLine + '</td><td colspan="2"><input type="checkbox" name="removeEmptyline" ' + (b["removeEmptyline"] ? "checked" : "") + ">" + c.delLine + "</td></tr>" + '<tr><td nowrap><input type="checkbox" name="removeClass" ' + (b["removeClass"] ? "checked" : "") + ">" + c.removeFormat + '</td><td colspan="2"><input type="checkbox" name="indent" ' + (b["indent"] ? "checked" : "") + ">" + c.indent + "</td></tr>" + "<tr>" + '<td nowrap><input type="checkbox" name="textAlign" ' + (b["textAlign"] ? "checked" : "") + ">" + c.alignment + "</td>" + '<td colspan="2" id="' + d + '">' + '<input type="radio" name="' + d + '" value="left" ' + (b["textAlign"] && "left" == b["textAlign"] ? "checked" : "") + ">" + a.getLang("justifyleft") + '<input type="radio" name="' + d + '" value="center" ' + (b["textAlign"] && "center" == b["textAlign"] ? "checked" : "") + ">" + a.getLang("justifycenter") + '<input type="radio" name="' + d + '" value="right" ' + (b["textAlign"] && "right" == b["textAlign"] ? "checked" : "") + ">" + a.getLang("justifyright") + "</td>" + "</tr>" + "<tr>" + '<td nowrap><input type="checkbox" name="imageBlockLine" ' + (b["imageBlockLine"] ? "checked" : "") + ">" + c.imageFloat + "</td>" + '<td nowrap id="' + e + '">' + '<input type="radio" name="' + e + '" value="none" ' + (b["imageBlockLine"] && "none" == b["imageBlockLine"] ? "checked" : "") + ">" + a.getLang("default") + '<input type="radio" name="' + e + '" value="left" ' + (b["imageBlockLine"] && "left" == b["imageBlockLine"] ? "checked" : "") + ">" + a.getLang("justifyleft") + '<input type="radio" name="' + e + '" value="center" ' + (b["imageBlockLine"] && "center" == b["imageBlockLine"] ? "checked" : "") + ">" + a.getLang("justifycenter") + '<input type="radio" name="' + e + '" value="right" ' + (b["imageBlockLine"] && "right" == b["imageBlockLine"] ? "checked" : "") + ">" + a.getLang("justifyright") + "</td>" + "</tr>" + '<tr><td nowrap><input type="checkbox" name="clearFontSize" ' + (b["clearFontSize"] ? "checked" : "") + ">" + c.removeFontsize + '</td><td colspan="2"><input type="checkbox" name="clearFontFamily" ' + (b["clearFontFamily"] ? "checked" : "") + ">" + c.removeFontFamily + "</td></tr>" + '<tr><td nowrap colspan="3"><input type="checkbox" name="removeEmptyNode" ' + (b["removeEmptyNode"] ? "checked" : "") + ">" + c.removeHtml + "</td></tr>" + '<tr><td nowrap colspan="3"><input type="checkbox" name="pasteFilter" ' + (b["pasteFilter"] ? "checked" : "") + ">" + c.pasteFilter + "</td></tr>" + "<tr>" + '<td nowrap><input type="checkbox" name="symbolConver" ' + (b["bdc2sb"] || b["tobdc"] ? "checked" : "") + ">" + c.symbol + "</td>" + '<td id="' + f + '">' + '<input type="radio" name="bdc" value="bdc2sb" ' + (b["bdc2sb"] ? "checked" : "") + ">" + c.bdc2sb + '<input type="radio" name="bdc" value="tobdc" ' + (b["tobdc"] ? "checked" : "") + ">" + c.tobdc + "</td>" + '<td nowrap align="right"><button >' + c.run + "</button></td>" + "</tr>" + "</table>" + "</div>" + "</div>"
				},
				_UIBase_render: b.prototype.render
			}, a.inherits(c, b)
		}(),
		function() {
			function f(b) {
				var j, i, k, l, n, m, o, p, q, c = {},
					d = b.getDom(),
					e = b.editor.uid,
					f = null,
					g = null,
					h = domUtils.getElementsByTagName(d, "input");
				for (i = h.length - 1; j = h[i--];)
					if (f = j.getAttribute("type"), "checkbox" == f)
						if (g = j.getAttribute("name"), c[g] && delete c[g], j.checked)
							if (k = document.getElementById(g + "Value" + e)) {
								if (/input/gi.test(k.tagName)) c[g] = k.value;
								else
									for (l = k.getElementsByTagName("input"), m = l.length - 1; n = l[m--];)
										if (n.checked) {
											c[g] = n.value;
											break
										}
							} else c[g] = !0;
				else c[g] = !1;
				else c[j.getAttribute("value")] = j.checked;
				for (o = domUtils.getElementsByTagName(d, "select"), i = 0; p = o[i++];) q = p.getAttribute("name"), c[q] = c[q] ? p.value : "";
				a.extend(b.editor.options.autotypeset, c), b.editor.setPreferences("autotypeset", c)
			}
			var a = baidu.editor.utils,
				b = baidu.editor.ui.Popup,
				c = baidu.editor.ui.AutoTypeSetPicker,
				d = baidu.editor.ui.SplitButton,
				e = baidu.editor.ui.AutoTypeSetButton = function(a) {
					this.initOptions(a), this.initAutoTypeSetButton()
				};
			e.prototype = {
				initAutoTypeSetButton: function() {
					var d, a = this;
					this.popup = new b({
						content: new c({
							editor: a.editor
						}),
						editor: a.editor,
						hide: function() {
							!this._hidden && this.getDom() && (f(this), this.getDom().style.display = "none", this._hidden = !0, this.fireEvent("hide"))
						}
					}), d = 0, this.popup.addListener("postRenderAfter", function() {
						var c, e, b = this;
						d || (c = this.getDom(), e = c.getElementsByTagName("button")[0], e.onclick = function() {
							f(b), a.editor.execCommand("autotypeset"), b.hide()
						}, domUtils.on(c, "click", function(c) {
							var g, h, i, j, k, l, d = c.target || c.srcElement,
								e = a.editor.uid;
							if (d && "INPUT" == d.tagName) {
								if ("imageBlockLine" == d.name || "textAlign" == d.name || "symbolConver" == d.name)
									for (g = d.checked, h = document.getElementById(d.name + "Value" + e), i = h.getElementsByTagName("input"), j = {
											imageBlockLine: "none",
											textAlign: "left",
											symbolConver: "tobdc"
										}, k = 0; k < i.length; k++) g ? i[k].value == j[d.name] && (i[k].checked = "checked") : i[k].checked = !1;
								(d.name == "imageBlockLineValue" + e || d.name == "textAlignValue" + e || "bdc" == d.name) && (l = d.parentNode.previousSibling.getElementsByTagName("input"), l && (l[0].checked = !0)), f(b)
							}
						}), d = 1)
					}), this.initSplitButton()
				}
			}, a.inherits(e, d)
		}(),
		function() {
			var a = baidu.editor.utils,
				b = baidu.editor.ui.Popup,
				c = baidu.editor.ui.Stateful,
				d = baidu.editor.ui.UIBase,
				e = baidu.editor.ui.CellAlignPicker = function(a) {
					this.initOptions(a), this.initSelected(), this.initCellAlignPicker()
				};
			e.prototype = {
				initSelected: function() {
					var a = {
						valign: {
							top: 0,
							middle: 1,
							bottom: 2
						},
						align: {
							left: 0,
							center: 1,
							right: 2
						},
						count: 3
					};
					this.selected && (this.selectedIndex = a.valign[this.selected.valign] * a.count + a.align[this.selected.align])
				},
				initCellAlignPicker: function() {
					this.initUIBase(), this.Stateful_init()
				},
				getHtmlTpl: function() {
					var f, a = ["left", "center", "right"],
						b = 9,
						c = null,
						d = -1,
						e = [];
					for (f = 0; b > f; f++) c = this.selectedIndex === f ? ' class="edui-cellalign-selected" ' : "", d = f % 3, 0 === d && e.push("<tr>"), e.push('<td index="' + f + '" ' + c + ' stateful><div class="edui-icon edui-' + a[d] + '"></div></td>'), 2 === d && e.push("</tr>");
					return '<div id="##" class="edui-cellalignpicker %%"><div class="edui-cellalignpicker-body"><table onclick="$$._onClick(event);">' + e.join("") + "</table>" + "</div>" + "</div>"
				},
				getStateDom: function() {
					return this.target
				},
				_onClick: function(a) {
					var c = a.target || a.srcElement;
					/icon/.test(c.className) && (this.items[c.parentNode.getAttribute("index")].onclick(), b.postHide(a))
				},
				_UIBase_render: d.prototype.render
			}, a.inherits(e, d), a.extend(e.prototype, c, !0)
		}(),
		function() {
			var a = baidu.editor.utils,
				b = baidu.editor.ui.Stateful,
				c = baidu.editor.ui.uiUtils,
				d = baidu.editor.ui.UIBase,
				e = baidu.editor.ui.PastePicker = function(a) {
					this.initOptions(a), this.initPastePicker()
				};
			e.prototype = {
				initPastePicker: function() {
					this.initUIBase(), this.Stateful_init()
				},
				getHtmlTpl: function() {
					return '<div class="edui-pasteicon" onclick="$$._onClick(this)"></div><div class="edui-pastecontainer"><div class="edui-title">' + this.editor.getLang("pasteOpt") + "</div>" + '<div class="edui-button">' + '<div title="' + this.editor.getLang("pasteSourceFormat") + '" onclick="$$.format(false)" stateful>' + '<div class="edui-richtxticon"></div></div>' + '<div title="' + this.editor.getLang("tagFormat") + '" onclick="$$.format(2)" stateful>' + '<div class="edui-tagicon"></div></div>' + '<div title="' + this.editor.getLang("pasteTextFormat") + '" onclick="$$.format(true)" stateful>' + '<div class="edui-plaintxticon"></div></div>' + "</div>" + "</div>" + "</div>"
				},
				getStateDom: function() {
					return this.target
				},
				format: function(a) {
					this.editor.ui._isTransfer = !0, this.editor.fireEvent("pasteTransfer", a)
				},
				_onClick: function(a) {
					var b = domUtils.getNextDomNode(a),
						d = c.getViewportRect().height,
						e = c.getClientRect(b);
					b.style.top = e.top + e.height > d ? -e.height - a.offsetHeight + "px" : "", /hidden/gi.test(domUtils.getComputedStyle(b, "visibility")) ? (b.style.visibility = "visible", domUtils.addClass(a, "edui-state-opened")) : (b.style.visibility = "hidden", domUtils.removeClasses(a, "edui-state-opened"))
				},
				_UIBase_render: d.prototype.render
			}, a.inherits(e, d), a.extend(e.prototype, b, !0)
		}(),
		function() {
			var a = baidu.editor.utils,
				b = baidu.editor.ui.uiUtils,
				c = baidu.editor.ui.UIBase,
				d = baidu.editor.ui.Toolbar = function(a) {
					this.initOptions(a), this.initToolbar()
				};
			d.prototype = {
				items: null,
				initToolbar: function() {
					this.items = this.items || [], this.initUIBase()
				},
				add: function(a, b) {
					void 0 === b ? this.items.push(a) : this.items.splice(b, 0, a)
				},
				getHtmlTpl: function() {
					var b, a = [];
					for (b = 0; b < this.items.length; b++) a[b] = this.items[b].renderHtml();
					return '<div id="##" class="edui-toolbar %%" onselectstart="return false;" onmousedown="return $$._onMouseDown(event, this);">' + a.join("") + "</div>"
				},
				postRender: function() {
					var c, a = this.getDom();
					for (c = 0; c < this.items.length; c++) this.items[c].postRender();
					b.makeUnselectable(a)
				},
				_onMouseDown: function(a) {
					var b = a.target || a.srcElement,
						c = b && b.tagName && b.tagName.toLowerCase();
					return "input" == c || "object" == c || "object" == c ? !1 : void 0
				}
			}, a.inherits(d, c)
		}(),
		function() {
			var j, a = baidu.editor.utils,
				b = baidu.editor.dom.domUtils,
				c = baidu.editor.ui.uiUtils,
				d = baidu.editor.ui.UIBase,
				e = baidu.editor.ui.Popup,
				f = baidu.editor.ui.Stateful,
				g = baidu.editor.ui.CellAlignPicker,
				h = baidu.editor.ui.Menu = function(a) {
					this.initOptions(a), this.initMenu()
				},
				i = {
					renderHtml: function() {
						return '<div class="edui-menuitem edui-menuseparator"><div class="edui-menuseparator-inner"></div></div>'
					},
					postRender: function() {},
					queryAutoHide: function() {
						return !0
					}
				};
			h.prototype = {
				items: null,
				uiName: "menu",
				initMenu: function() {
					this.items = this.items || [], this.initPopup(), this.initItems()
				},
				initItems: function() {
					var a, b;
					for (a = 0; a < this.items.length; a++) b = this.items[a], "-" == b ? this.items[a] = this.getSeparator() : b instanceof j || (b.editor = this.editor, b.theme = this.editor.options.theme, this.items[a] = this.createItem(b))
				},
				getSeparator: function() {
					return i
				},
				createItem: function(a) {
					return a.menu = this, new j(a)
				},
				_Popup_getContentHtmlTpl: e.prototype.getContentHtmlTpl,
				getContentHtmlTpl: function() {
					var a, b, c;
					if (0 == this.items.length) return this._Popup_getContentHtmlTpl();
					for (a = [], b = 0; b < this.items.length; b++) c = this.items[b], a[b] = c.renderHtml();
					return '<div class="%%-body">' + a.join("") + "</div>"
				},
				_Popup_postRender: e.prototype.postRender,
				postRender: function() {
					var d, e, a = this;
					for (d = 0; d < this.items.length; d++) e = this.items[d], e.ownerMenu = this, e.postRender();
					b.on(this.getDom(), "mouseover", function(b) {
						var d, e;
						b = b || event, d = b.relatedTarget || b.fromElement, e = a.getDom(), c.contains(e, d) || e === d || a.fireEvent("over")
					}), this._Popup_postRender()
				},
				queryAutoHide: function(a) {
					var b, d;
					if (a) {
						if (c.contains(this.getDom(), a)) return !1;
						for (b = 0; b < this.items.length; b++)
							if (d = this.items[b], d.queryAutoHide(a) === !1) return !1
					}
				},
				clearItems: function() {
					var a, b;
					for (a = 0; a < this.items.length; a++) b = this.items[a], clearTimeout(b._showingTimer), clearTimeout(b._closingTimer), b.subMenu && b.subMenu.destroy();
					this.items = []
				},
				destroy: function() {
					this.getDom() && b.remove(this.getDom()), this.clearItems()
				},
				dispose: function() {
					this.destroy()
				}
			}, a.inherits(h, e), j = baidu.editor.ui.MenuItem = function(a) {
				if (this.initOptions(a), this.initUIBase(), this.Stateful_init(), this.subMenu && !(this.subMenu instanceof h))
					if (a.className && -1 != a.className.indexOf("aligntd")) {
						var c = this;
						this.subMenu.selected = this.editor.queryCommandValue("cellalignment"), this.subMenu = new e({
							content: new g(this.subMenu),
							parentMenu: c,
							editor: c.editor,
							destroy: function() {
								this.getDom() && b.remove(this.getDom())
							}
						}), this.subMenu.addListener("postRenderAfter", function() {
							b.on(this.getDom(), "mouseover", function() {
								c.addState("opened")
							})
						})
					} else this.subMenu = new h(this.subMenu)
			}, j.prototype = {
				label: "",
				subMenu: null,
				ownerMenu: null,
				uiName: "menuitem",
				alwalysHoverable: !0,
				getHtmlTpl: function() {
					return '<div id="##" class="%%" stateful onclick="$$._onClick(event, this);"><div class="%%-body">' + this.renderLabelHtml() + "</div>" + "</div>"
				},
				postRender: function() {
					var a = this;
					this.addListener("over", function() {
						a.ownerMenu.fireEvent("submenuover", a), a.subMenu && a.delayShowSubMenu()
					}), this.subMenu && (this.getDom().className += " edui-hassubmenu", this.subMenu.render(), this.addListener("out", function() {
						a.delayHideSubMenu()
					}), this.subMenu.addListener("over", function() {
						clearTimeout(a._closingTimer), a._closingTimer = null, a.addState("opened")
					}), this.ownerMenu.addListener("hide", function() {
						a.hideSubMenu()
					}), this.ownerMenu.addListener("submenuover", function(b, c) {
						c !== a && a.delayHideSubMenu()
					}), this.subMenu._bakQueryAutoHide = this.subMenu.queryAutoHide, this.subMenu.queryAutoHide = function(b) {
						return b && c.contains(a.getDom(), b) ? !1 : this._bakQueryAutoHide(b)
					}), this.getDom().style.tabIndex = "-1", c.makeUnselectable(this.getDom()), this.Stateful_postRender()
				},
				delayShowSubMenu: function() {
					var a = this;
					a.isDisabled() || (a.addState("opened"), clearTimeout(a._showingTimer), clearTimeout(a._closingTimer), a._closingTimer = null, a._showingTimer = setTimeout(function() {
						a.showSubMenu()
					}, 250))
				},
				delayHideSubMenu: function() {
					var a = this;
					a.isDisabled() || (a.removeState("opened"), clearTimeout(a._showingTimer), a._closingTimer || (a._closingTimer = setTimeout(function() {
						a.hasState("opened") || a.hideSubMenu(), a._closingTimer = null
					}, 400)))
				},
				renderLabelHtml: function() {
					return '<div class="edui-arrow"></div><div class="edui-box edui-icon"></div><div class="edui-box edui-label %%-label">' + (this.label || "") + "</div>"
				},
				getStateDom: function() {
					return this.getDom()
				},
				queryAutoHide: function(a) {
					return this.subMenu && this.hasState("opened") ? this.subMenu.queryAutoHide(a) : void 0
				},
				_onClick: function(a, b) {
					this.hasState("disabled") || this.fireEvent("click", a, b) !== !1 && (this.subMenu ? this.showSubMenu() : e.postHide(a))
				},
				showSubMenu: function() {
					var a = c.getClientRect(this.getDom());
					a.right -= 5, a.left += 2, a.width -= 7, a.top -= 4, a.bottom += 4, a.height += 8, this.subMenu.showAnchorRect(a, !0, !0)
				},
				hideSubMenu: function() {
					this.subMenu.hide()
				}
			}, a.inherits(j, d), a.extend(j.prototype, f, !0)
		}(),
		function() {
			var a = baidu.editor.utils,
				b = baidu.editor.ui.uiUtils,
				c = baidu.editor.ui.Menu,
				d = baidu.editor.ui.SplitButton,
				e = baidu.editor.ui.Combox = function(a) {
					this.initOptions(a), this.initCombox()
				};
			e.prototype = {
				uiName: "combox",
				onbuttonclick: function() {
					this.showPopup()
				},
				initCombox: function() {
					var b, d, a = this;
					for (this.items = this.items || [], b = 0; b < this.items.length; b++) d = this.items[b], d.uiName = "listitem", d.index = b, d.onclick = function() {
						a.selectByIndex(this.index)
					};
					this.popup = new c({
						items: this.items,
						uiName: "list",
						editor: this.editor,
						captureWheel: !0,
						combox: this
					}), this.initSplitButton()
				},
				_SplitButton_postRender: d.prototype.postRender,
				postRender: function() {
					this._SplitButton_postRender(), this.setLabel(this.label || ""), this.setValue(this.initValue || "")
				},
				showPopup: function() {
					var a = b.getClientRect(this.getDom());
					a.top += 1, a.bottom -= 1, a.height -= 2, this.popup.showAnchorRect(a)
				},
				getValue: function() {
					return this.value
				},
				setValue: function(a) {
					var b = this.indexByValue(a); - 1 != b ? (this.selectedIndex = b, this.setLabel(this.items[b].label), this.value = this.items[b].value) : (this.selectedIndex = -1, this.setLabel(this.getLabelForUnknowValue(a)), this.value = a)
				},
				setLabel: function(a) {
					this.getDom("button_body").innerHTML = a, this.label = a
				},
				getLabelForUnknowValue: function(a) {
					return a
				},
				indexByValue: function(a) {
					for (var b = 0; b < this.items.length; b++)
						if (a == this.items[b].value) return b;
					return -1
				},
				getItem: function(a) {
					return this.items[a]
				},
				selectByIndex: function(a) {
					a < this.items.length && this.fireEvent("select", a) !== !1 && (this.selectedIndex = a, this.value = this.items[a].value, this.setLabel(this.items[a].label))
				}
			}, a.inherits(e, d)
		}(),
		function() {
			var h, i, j, a = baidu.editor.utils,
				b = baidu.editor.dom.domUtils,
				c = baidu.editor.ui.uiUtils,
				d = baidu.editor.ui.Mask,
				e = baidu.editor.ui.UIBase,
				f = baidu.editor.ui.Button,
				g = baidu.editor.ui.Dialog = function(b) {
					var c, d;
					b.name && (c = b.name, d = b.cssRules, b.className || (b.className = "edui-for-" + c), d && (b.cssRules = ".edui-default .edui-for-" + c + " .edui-dialog-content  {" + d + "}")), this.initOptions(a.extend({
						autoReset: !0,
						draggable: !0,
						onok: function() {},
						oncancel: function() {},
						onclose: function(a, b) {
							return b ? this.onok() : this.oncancel()
						},
						holdScroll: !1
					}, b)), this.initDialog()
				};
			g.prototype = {
				draggable: !1,
				uiName: "dialog",
				initDialog: function() {
					var e, b = this,
						c = this.editor.options.theme;
					if (this.cssRules && a.cssRule("edui-customize-" + this.name + "-style", this.cssRules), this.initUIBase(), this.modalMask = h || (h = new d({
							className: "edui-dialog-modalmask",
							theme: c,
							onclick: function() {
								j && j.close(!1)
							}
						})), this.dragMask = i || (i = new d({
							className: "edui-dialog-dragmask",
							theme: c
						})), this.closeButton = new f({
							className: "edui-dialog-closebutton",
							title: b.closeDialog,
							theme: c,
							onclick: function() {
								b.close(!1)
							}
						}), this.fullscreen && this.initResizeEvent(), this.buttons)
						for (e = 0; e < this.buttons.length; e++) this.buttons[e] instanceof f || (this.buttons[e] = new f(a.extend(this.buttons[e], {
							editor: this.editor
						}, !0)))
				},
				initResizeEvent: function() {
					var a = this;
					b.on(window, "resize", function() {
						a._hidden || void 0 === a._hidden || (a.__resizeTimer && window.clearTimeout(a.__resizeTimer), a.__resizeTimer = window.setTimeout(function() {
							a.__resizeTimer = null;
							var b = a.getDom(),
								d = a.getDom("content"),
								e = UE.ui.uiUtils.getClientRect(b),
								f = UE.ui.uiUtils.getClientRect(d),
								g = c.getViewportRect();
							d.style.width = g.width - e.width + f.width + "px", d.style.height = g.height - e.height + f.height + "px", b.style.width = g.width + "px", b.style.height = g.height + "px", a.fireEvent("resize")
						}, 100))
					})
				},
				fitSize: function() {
					var a = this.getDom("body"),
						b = this.mesureSize();
					return a.style.width = b.width + "px", a.style.height = b.height + "px", b
				},
				safeSetOffset: function(a) {
					var h, b = this,
						d = b.getDom(),
						e = c.getViewportRect(),
						f = c.getClientRect(d),
						g = a.left;
					g + f.width > e.right && (g = e.right - f.width), h = a.top, h + f.height > e.bottom && (h = e.bottom - f.height), d.style.left = Math.max(g, 0) + "px", d.style.top = Math.max(h, 0) + "px"
				},
				showAtCenter: function() {
					var d, e, f, g, h, i, j, k, l, a = c.getViewportRect();
					this.fullscreen ? (i = this.getDom(), j = this.getDom("content"), i.style.display = "block", k = UE.ui.uiUtils.getClientRect(i), l = UE.ui.uiUtils.getClientRect(j), i.style.left = "-100000px", j.style.width = a.width - k.width + l.width + "px", j.style.height = a.height - k.height + l.height + "px", i.style.width = a.width + "px", i.style.height = a.height + "px", i.style.left = 0, this._originalContext = {
						html: {
							overflowX: document.documentElement.style.overflowX,
							overflowY: document.documentElement.style.overflowY
						},
						body: {
							overflowX: document.body.style.overflowX,
							overflowY: document.body.style.overflowY
						}
					}, document.documentElement.style.overflowX = "hidden", document.documentElement.style.overflowY = "hidden", document.body.style.overflowX = "hidden", document.body.style.overflowY = "hidden") : (this.getDom().style.display = "", d = this.fitSize(), e = 0 | this.getDom("titlebar").offsetHeight, f = a.width / 2 - d.width / 2, g = a.height / 2 - (d.height - e) / 2 - e, h = this.getDom(), this.safeSetOffset({
						left: Math.max(0 | f, 0),
						top: Math.max(0 | g, 0)
					}), b.hasClass(h, "edui-state-centered") || (h.className += " edui-state-centered")), this._show()
				},
				getContentHtml: function() {
					var a = "";
					return "string" == typeof this.content ? a = this.content : this.iframeUrl && (a = '<span id="' + this.id + '_contmask" class="dialogcontmask"></span><iframe id="' + this.id + '_iframe" class="%%-iframe" height="100%" width="100%" frameborder="0" src="' + this.iframeUrl + '"></iframe>'), a
				},
				getHtmlTpl: function() {
					var b, c, a = "";
					if (this.buttons) {
						for (b = [], c = 0; c < this.buttons.length; c++) b[c] = this.buttons[c].renderHtml();
						a = '<div class="%%-foot"><div id="##_buttons" class="%%-buttons">' + b.join("") + "</div>" + "</div>"
					}
					return '<div id="##" class="%%"><div ' + (this.fullscreen ? 'class="%%-wrap edui-dialog-fullscreen-flag"' : 'class="%%"') + '><div id="##_body" class="%%-body">' + '<div class="%%-shadow"></div>' + '<div id="##_titlebar" class="%%-titlebar">' + '<div class="%%-draghandle" onmousedown="$$._onTitlebarMouseDown(event, this);">' + '<span class="%%-caption">' + (this.title || "") + "</span>" + "</div>" + this.closeButton.renderHtml() + "</div>" + '<div id="##_content" class="%%-content">' + (this.autoReset ? "" : this.getContentHtml()) + "</div>" + a + "</div></div></div>"
				},
				postRender: function() {
					var a, d;
					if (this.modalMask.getDom() || (this.modalMask.render(), this.modalMask.hide()), this.dragMask.getDom() || (this.dragMask.render(), this.dragMask.hide()), a = this, this.addListener("show", function() {
							a.modalMask.show(this.getDom().style.zIndex - 2)
						}), this.addListener("hide", function() {
							a.modalMask.hide()
						}), this.buttons)
						for (d = 0; d < this.buttons.length; d++) this.buttons[d].postRender();
					b.on(window, "resize", function() {
						setTimeout(function() {
							a.isHidden() || a.safeSetOffset(c.getClientRect(a.getDom()))
						})
					}), this._hide()
				},
				mesureSize: function() {
					var a = this.getDom("body"),
						b = c.getClientRect(this.getDom("content")).width,
						d = a.style;
					return d.width = b, c.getClientRect(a)
				},
				_onTitlebarMouseDown: function(a) {
					var e, g;
					this.draggable && (c.getViewportRect(), g = this, c.startDrag(a, {
						ondragstart: function() {
							e = c.getClientRect(g.getDom()), g.getDom("contmask").style.visibility = "visible", g.dragMask.show(g.getDom().style.zIndex - 1)
						},
						ondragmove: function(a, b) {
							var c = e.left + a,
								d = e.top + b;
							g.safeSetOffset({
								left: c,
								top: d
							})
						},
						ondragstop: function() {
							g.getDom("contmask").style.visibility = "hidden", b.removeClasses(g.getDom(), ["edui-state-centered"]), g.dragMask.hide()
						}
					}))
				},
				reset: function() {
					this.getDom("content").innerHTML = this.getContentHtml(), this.fireEvent("dialogafterreset")
				},
				_show: function() {
					this._hidden && (this.getDom().style.display = "", this.editor.container.style.zIndex && (this.getDom().style.zIndex = 1 * this.editor.container.style.zIndex + 10), this._hidden = !1, this.fireEvent("show"), baidu.editor.ui.uiUtils.getFixedLayer().style.zIndex = this.getDom().style.zIndex - 4)
				},
				isHidden: function() {
					return this._hidden
				},
				_hide: function() {
					if (!this._hidden) {
						var a = this.getDom();
						a.style.display = "none", a.style.zIndex = "", a.style.width = "", a.style.height = "", this._hidden = !0, this.fireEvent("hide")
					}
				},
				open: function() {
					if (this.autoReset) try {
						this.reset()
					} catch (a) {
						this.render(), this.open()
					}
					if (this.showAtCenter(), this.iframeUrl) try {
						this.getDom("iframe").focus()
					} catch (b) {}
					j = this
				},
				_onCloseButtonClick: function() {
					this.close(!1)
				},
				close: function(a) {
					var c, d, e;
					this.fireEvent("close", a) !== !1 && (this.fullscreen && (document.documentElement.style.overflowX = this._originalContext.html.overflowX, document.documentElement.style.overflowY = this._originalContext.html.overflowY, document.body.style.overflowX = this._originalContext.body.overflowX, document.body.style.overflowY = this._originalContext.body.overflowY, delete this._originalContext), this._hide(), c = this.getDom("content"), d = this.getDom("iframe"), c && d && (e = d.contentDocument || d.contentWindow.document, e && (e.body.innerHTML = ""), b.remove(c)))
				}
			}, a.inherits(g, e)
		}(),
		function() {
			var a = baidu.editor.utils,
				b = baidu.editor.ui.Menu,
				c = baidu.editor.ui.SplitButton,
				d = baidu.editor.ui.MenuButton = function(a) {
					this.initOptions(a), this.initMenuButton()
				};
			d.prototype = {
				initMenuButton: function() {
					var a = this;
					this.uiName = "menubutton", this.popup = new b({
						items: a.items,
						className: a.className,
						editor: a.editor
					}), this.popup.addListener("show", function() {
						var c, b = this;
						for (c = 0; c < b.items.length; c++) b.items[c].removeState("checked"), b.items[c].value == a._value && (b.items[c].addState("checked"), this.value = a._value)
					}), this.initSplitButton()
				},
				setValue: function(a) {
					this._value = a
				}
			}, a.inherits(d, c)
		}(),
		function() {
			var a = baidu.editor.utils,
				b = baidu.editor.ui.Popup,
				c = baidu.editor.ui.SplitButton,
				d = baidu.editor.ui.MultiMenuPop = function(a) {
					this.initOptions(a), this.initMultiMenu()
				};
			d.prototype = {
				initMultiMenu: function() {
					var a = this;
					this.popup = new b({
						content: "",
						editor: a.editor,
						iframe_rendered: !1,
						onshow: function() {
							this.iframe_rendered || (this.iframe_rendered = !0, this.getDom("content").innerHTML = '<iframe id="' + a.id + '_iframe" src="' + a.iframeUrl + '" frameborder="0"></iframe>', a.editor.container.style.zIndex && (this.getDom().style.zIndex = 1 * a.editor.container.style.zIndex + 1))
						}
					}), this.onbuttonclick = function() {
						this.showPopup()
					}, this.initSplitButton()
				}
			}, a.inherits(d, c)
		}(),
		function() {
			function j(a) {
				var g, d, b = a.target || a.srcElement,
					c = e.findParent(b, function(a) {
						return e.hasClass(a, "edui-shortcutmenu") || e.hasClass(a, "edui-popup")
					}, !0);
				if (!c)
					for (d = 0; g = f[d++];) g.hide()
			}
			var g, a = baidu.editor.ui,
				b = a.UIBase,
				c = a.uiUtils,
				d = baidu.editor.utils,
				e = baidu.editor.dom.domUtils,
				f = [],
				h = !1,
				i = a.ShortCutMenu = function(a) {
					this.initOptions(a), this.initShortCutMenu()
				};
			i.postHide = j, i.prototype = {
				isHidden: !0,
				SPACE: 5,
				initShortCutMenu: function() {
					this.items = this.items || [], this.initUIBase(), this.initItems(), this.initEvent(), f.push(this)
				},
				initEvent: function() {
					var a = this,
						b = a.editor.document;
					e.on(b, "mousemove", function(b) {
						if (a.isHidden === !1) {
							if (a.getSubMenuMark() || "contextmenu" == a.eventType) return;
							var c = !0,
								d = a.getDom(),
								e = d.offsetWidth,
								f = d.offsetHeight,
								h = e / 2 + a.SPACE,
								i = f / 2,
								j = Math.abs(b.screenX - a.left),
								k = Math.abs(b.screenY - a.top);
							clearTimeout(g), g = setTimeout(function() {
								k > 0 && i > k ? a.setOpacity(d, "1") : k > i && i + 70 > k ? (a.setOpacity(d, "0.5"), c = !1) : k > i + 70 && i + 140 > k && a.hide(), c && j > 0 && h > j ? a.setOpacity(d, "1") : j > h && h + 70 > j ? a.setOpacity(d, "0.5") : j > h + 70 && h + 140 > j && a.hide()
							})
						}
					}), browser.chrome && e.on(b, "mouseout", function(b) {
						var c = b.relatedTarget || b.toElement;
						(null == c || "HTML" == c.tagName) && a.hide()
					}), a.editor.addListener("afterhidepop", function() {
						a.isHidden || (h = !0)
					})
				},
				initItems: function() {
					var b, c, e;
					if (d.isArray(this.items))
						for (b = 0, c = this.items.length; c > b; b++) e = this.items[b].toLowerCase(), a[e] && (this.items[b] = new a[e](this.editor), this.items[b].className += " edui-shortcutsubmenu ")
				},
				setOpacity: function(a, b) {
					browser.ie && browser.version < 9 ? a.style.filter = "alpha(opacity = " + 100 * parseFloat(b) + ");" : a.style.opacity = b
				},
				getSubMenuMark: function() {
					var a, b, f, d;
					for (h = !1, a = c.getFixedLayer(), b = e.getElementsByTagName(a, "div", function(a) {
							return e.hasClass(a, "edui-shortcutsubmenu edui-popup")
						}), d = 0; f = b[d++];) "none" != f.style.display && (h = !0);
					return h
				},
				show: function(a, b) {
					function i(a) {
						a.left < 0 && (a.left = 0), a.top < 0 && (a.top = 0), g.style.cssText = "position:absolute;left:" + a.left + "px;top:" + a.top + "px;"
					}

					function j(a) {
						a.tagName || (a = a.getDom()), f.left = parseInt(a.style.left), f.top = parseInt(a.style.top), f.top -= g.offsetHeight + 15, i(f)
					}
					var k, d = this,
						f = {},
						g = this.getDom(),
						h = c.getFixedLayer();
					d.eventType = a.type, g.style.cssText = "display:block;left:-9999px", "contextmenu" == a.type && b ? (k = e.getElementsByTagName(h, "div", "edui-contextmenu")[0], k ? j(k) : d.editor.addListener("aftershowcontextmenu", function(a, b) {
						j(b)
					})) : (f = c.getViewportOffsetByEvent(a), f.top -= g.offsetHeight + d.SPACE, f.left += d.SPACE + 20, i(f), d.setOpacity(g, .2)), d.isHidden = !1, d.left = a.screenX + g.offsetWidth / 2 - d.SPACE, d.top = a.screenY - g.offsetHeight / 2 - d.SPACE, d.editor && (g.style.zIndex = 1 * d.editor.container.style.zIndex + 10, h.style.zIndex = g.style.zIndex - 1)
				},
				hide: function() {
					this.getDom() && (this.getDom().style.display = "none"), this.isHidden = !0
				},
				postRender: function() {
					if (d.isArray(this.items))
						for (var b, a = 0; b = this.items[a++];) b.postRender()
				},
				getHtmlTpl: function() {
					var a, b;
					if (d.isArray(this.items)) {
						for (a = [], b = 0; b < this.items.length; b++) a[b] = this.items[b].renderHtml();
						a = a.join("")
					} else a = this.items;
					return '<div id="##" class="%% edui-toolbar" data-src="shortcutmenu" onmousedown="return false;" onselectstart="return false;" >' + a + "</div>"
				}
			}, d.inherits(i, b), e.on(document, "mousedown", function(a) {
				j(a)
			}), e.on(window, "scroll", function(a) {
				j(a)
			})
		}(),
		function() {
			var a = baidu.editor.utils,
				b = baidu.editor.ui.UIBase,
				c = baidu.editor.ui.Breakline = function(a) {
					this.initOptions(a), this.initSeparator()
				};
			c.prototype = {
				uiName: "Breakline",
				initSeparator: function() {
					this.initUIBase()
				},
				getHtmlTpl: function() {
					return "<br/>"
				}
			}, a.inherits(c, b)
		}(),
		function() {
			var a = baidu.editor.utils,
				b = baidu.editor.dom.domUtils,
				c = baidu.editor.ui.UIBase,
				d = baidu.editor.ui.Message = function(a) {
					this.initOptions(a), this.initMessage()
				};
			d.prototype = {
				initMessage: function() {
					this.initUIBase()
				},
				getHtmlTpl: function() {
					return '<div id="##" class="edui-message %%"> <div id="##_closer" class="edui-message-closer">×</div> <div id="##_body" class="edui-message-body edui-message-type-info"> <iframe style="position:absolute;z-index:-1;left:0;top:0;background-color: transparent;" frameborder="0" width="100%" height="100%" src="about:blank"></iframe> <div class="edui-shadow"></div> <div id="##_content" class="edui-message-content">  </div> </div></div>'
				},
				reset: function(a) {
					var b = this;
					a.keepshow || (clearTimeout(this.timer), b.timer = setTimeout(function() {
						b.hide()
					}, a.timeout || 4e3)), void 0 !== a.content && b.setContent(a.content), void 0 !== a.type && b.setType(a.type), b.show()
				},
				postRender: function() {
					var a = this,
						c = this.getDom("closer");
					c && b.on(c, "click", function() {
						a.hide()
					})
				},
				setContent: function(a) {
					this.getDom("content").innerHTML = a
				},
				setType: function(a) {
					a = a || "info";
					var b = this.getDom("body");
					b.className = b.className.replace(/edui-message-type-[\w-]+/, "edui-message-type-" + a)
				},
				getContent: function() {
					return filterXSS(this.getDom("content").innerHTML)
				},
				getType: function() {
					var a = this.getDom("body").match(/edui-message-type-([\w-]+)/);
					return a ? a[1] : ""
				},
				show: function() {
					this.getDom().style.display = "block"
				},
				hide: function() {
					var a = this.getDom();
					a && (a.style.display = "none", a.parentNode && a.parentNode.removeChild(a))
				}
			}, a.inherits(d, c)
		}(),
		function() {
			var d, e, g, f, h, i, j, k, m, l, n, p, o, a = baidu.editor.utils,
				b = baidu.editor.ui,
				c = b.Dialog;
			for (b.buttons = {}, b.Dialog = function(a) {
					var b = new c(a);
					return b.addListener("hide", function() {
						var a, c, d;
						if (b.editor) {
							a = b.editor;
							try {
								browser.gecko ? (c = a.window.scrollY, d = a.window.scrollX, a.body.focus(), a.window.scrollTo(d, c)) : a.focus()
							} catch (e) {}
						}
					}), b
				}, d = {
					anchor: "~/dialogs/anchor/anchor.html",
					insertimage: "~/dialogs/image/image.html",
					link: "~/dialogs/link/link.html",
					spechars: "~/dialogs/spechars/spechars.html",
					searchreplace: "~/dialogs/searchreplace/searchreplace.html",
					map: "~/dialogs/map/map.html",
					gmap: "~/dialogs/gmap/gmap.html",
					insertvideo: "~/dialogs/video/video.html",
					help: "~/dialogs/help/help.html",
					preview: "~/dialogs/preview/preview.html",
					emotion: "~/dialogs/emotion/emotion.html",
					wordimage: "~/dialogs/wordimage/wordimage.html",
					attachment: "~/dialogs/attachment/attachment.html",
					insertframe: "~/dialogs/insertframe/insertframe.html",
					edittip: "~/dialogs/table/edittip.html",
					edittable: "~/dialogs/table/edittable.html",
					edittd: "~/dialogs/table/edittd.html",
					webapp: "~/dialogs/webapp/webapp.html",
					snapscreen: "~/dialogs/snapscreen/snapscreen.html",
					scrawl: "~/dialogs/scrawl/scrawl.html",
					music: "~/dialogs/music/music.html",
					template: "~/dialogs/template/template.html",
					background: "~/dialogs/background/background.html",
					charts: "~/dialogs/charts/charts.html"
				}, e = ["undo", "redo", "formatmatch", "bold", "italic", "underline", "fontborder", "touppercase", "tolowercase", "strikethrough", "subscript", "superscript", "source", "indent", "outdent", "blockquote", "pasteplain", "pagebreak", "selectall", "print", "horizontal", "removeformat", "time", "date", "unlink", "insertparagraphbeforetable", "insertrow", "insertcol", "mergeright", "mergedown", "deleterow", "deletecol", "splittorows", "splittocols", "splittocells", "mergecells", "deletetable", "drafts"], f = 0; g = e[f++];) g = g.toLowerCase(), b[g] = function(a) {
				return function(c) {
					var d = new b.Button({
						className: "edui-for-" + a,
						title: c.options.labelMap[a] || c.getLang("labelMap." + a) || "",
						onclick: function() {
							c.execCommand(a)
						},
						theme: c.options.theme,
						showText: !1
					});
					return b.buttons[a] = d, c.addListener("selectionchange", function(b, e, f) {
						var g = c.queryCommandState(a); - 1 == g ? (d.setDisabled(!0), d.setChecked(!1)) : f || (d.setDisabled(!1), d.setChecked(g))
					}), d
				}
			}(g);
			b.cleardoc = function(a) {
				var c = new b.Button({
					className: "edui-for-cleardoc",
					title: a.options.labelMap.cleardoc || a.getLang("labelMap.cleardoc") || "",
					theme: a.options.theme,
					onclick: function() {
						confirm(a.getLang("confirmClear")) && a.execCommand("cleardoc")
					}
				});
				return b.buttons["cleardoc"] = c, a.addListener("selectionchange", function() {
					c.setDisabled(-1 == a.queryCommandState("cleardoc"))
				}), c
			}, h = {
				justify: ["left", "right", "center", "justify"],
				imagefloat: ["none", "left", "center", "right"],
				directionality: ["ltr", "rtl"]
			};
			for (i in h) ! function(a, c) {
				for (var e, d = 0; e = c[d++];) ! function(c) {
					b[a.replace("float", "") + c] = function(d) {
						var e = new b.Button({
							className: "edui-for-" + a.replace("float", "") + c,
							title: d.options.labelMap[a.replace("float", "") + c] || d.getLang("labelMap." + a.replace("float", "") + c) || "",
							theme: d.options.theme,
							onclick: function() {
								d.execCommand(a, c)
							}
						});
						return b.buttons[a] = e, d.addListener("selectionchange", function(b, f, g) {
							e.setDisabled(-1 == d.queryCommandState(a)), e.setChecked(d.queryCommandValue(a) == c && !g)
						}), e
					}
				}(e)
			}(i, h[i]);
			for (f = 0; g = ["backcolor", "forecolor"][f++];) b[g] = function(a) {
				return function(c) {
					var d = new b.ColorButton({
						className: "edui-for-" + a,
						color: "default",
						title: c.options.labelMap[a] || c.getLang("labelMap." + a) || "",
						editor: c,
						onpickcolor: function(b, d) {
							c.execCommand(a, d)
						},
						onpicknocolor: function() {
							c.execCommand(a, "default"), this.setColor("transparent"), this.color = "default"
						},
						onbuttonclick: function() {
							c.execCommand(a, this.color)
						}
					});
					return b.buttons[a] = d, c.addListener("selectionchange", function() {
						d.setDisabled(-1 == c.queryCommandState(a))
					}), d
				}
			}(g);
			j = {
				noOk: ["searchreplace", "help", "spechars", "webapp", "preview"],
				ok: ["attachment", "anchor", "link", "insertimage", "map", "gmap", "insertframe", "wordimage", "insertvideo", "insertframe", "edittip", "edittable", "edittd", "scrawl", "template", "music", "background", "charts"]
			};
			for (i in j) ! function(c, e) {
				for (var g, f = 0; g = e[f++];) browser.opera && "searchreplace" === g || function(e) {
					b[e] = function(f, g, h) {
						var i, j;
						return g = g || (f.options.iframeUrlMap || {})[e] || d[e], h = f.options.labelMap[e] || f.getLang("labelMap." + e) || "", g && (i = new b.Dialog(a.extend({
							iframeUrl: f.ui.mapUrl(g),
							editor: f,
							className: "edui-for-" + e,
							title: h,
							holdScroll: "insertimage" === e,
							fullscreen: /charts|preview/.test(e),
							closeDialog: f.getLang("closeDialog")
						}, "ok" == c ? {
							buttons: [{
								className: "edui-okbutton",
								label: f.getLang("ok"),
								editor: f,
								onclick: function() {
									i.close(!0)
								}
							}, {
								className: "edui-cancelbutton",
								label: f.getLang("cancel"),
								editor: f,
								onclick: function() {
									i.close(!1)
								}
							}]
						} : {})), f.ui._dialogs[e + "Dialog"] = i), j = new b.Button({
							className: "edui-for-" + e,
							title: h,
							onclick: function() {
								if (i) switch (e) {
									case "wordimage":
										var a = f.execCommand("wordimage");
										a && a.length && (i.render(), i.open());
										break;
									case "scrawl":
										-1 != f.queryCommandState("scrawl") && (i.render(), i.open());
										break;
									default:
										i.render(), i.open()
								}
							},
							theme: f.options.theme,
							disabled: "scrawl" == e && -1 == f.queryCommandState("scrawl") || "charts" == e
						}), b.buttons[e] = j, f.addListener("selectionchange", function() {
							var b, a = {
								edittable: 1
							};
							e in a || (b = f.queryCommandState(e), j.getDom() && (j.setDisabled(-1 == b), j.setChecked(b)))
						}), j
					}
				}(g.toLowerCase())
			}(i, j[i]);
			for (b.snapscreen = function(a, c, e) {
					var f, g;
					return e = a.options.labelMap["snapscreen"] || a.getLang("labelMap.snapscreen") || "", f = new b.Button({
						className: "edui-for-snapscreen",
						title: e,
						onclick: function() {
							a.execCommand("snapscreen")
						},
						theme: a.options.theme
					}), b.buttons["snapscreen"] = f, c = c || (a.options.iframeUrlMap || {})["snapscreen"] || d["snapscreen"], c && (g = new b.Dialog({
						iframeUrl: a.ui.mapUrl(c),
						editor: a,
						className: "edui-for-snapscreen",
						title: e,
						buttons: [{
							className: "edui-okbutton",
							label: a.getLang("ok"),
							editor: a,
							onclick: function() {
								g.close(!0)
							}
						}, {
							className: "edui-cancelbutton",
							label: a.getLang("cancel"),
							editor: a,
							onclick: function() {
								g.close(!1)
							}
						}]
					}), g.render(), a.ui._dialogs["snapscreenDialog"] = g), a.addListener("selectionchange", function() {
						f.setDisabled(-1 == a.queryCommandState("snapscreen"))
					}), f
				}, b.insertcode = function(c, d, e) {
					var f, g;
					return d = c.options["insertcode"] || [], e = c.options.labelMap["insertcode"] || c.getLang("labelMap.insertcode") || "", f = [], a.each(d, function(a, b) {
						f.push({
							label: a,
							value: b,
							theme: c.options.theme,
							renderLabelHtml: function() {
								return '<div class="edui-label %%-label" >' + (this.label || "") + "</div>"
							}
						})
					}), g = new b.Combox({
						editor: c,
						items: f,
						onselect: function(a, b) {
							c.execCommand("insertcode", this.items[b].value)
						},
						onbuttonclick: function() {
							this.showPopup()
						},
						title: e,
						initValue: e,
						className: "edui-for-insertcode",
						indexByValue: function(a) {
							if (a)
								for (var c, b = 0; c = this.items[b]; b++)
									if (-1 != c.value.indexOf(a)) return b;
							return -1
						}
					}), b.buttons["insertcode"] = g, c.addListener("selectionchange", function(a, b, d) {
						var f, h;
						if (!d)
							if (f = c.queryCommandState("insertcode"), -1 == f) g.setDisabled(!0);
							else {
								if (g.setDisabled(!1), h = c.queryCommandValue("insertcode"), !h) return g.setValue(e), void 0;
								h && (h = h.replace(/['"]/g, "").split(",")[0]), g.setValue(h)
							}
					}), g
				}, b.fontfamily = function(c, d, e) {
					var g, f, h, i, j;
					if (d = c.options["fontfamily"] || [], e = c.options.labelMap["fontfamily"] || c.getLang("labelMap.fontfamily") || "", d.length) {
						for (f = 0, h = []; g = d[f]; f++) i = c.getLang("fontfamily")[g.name] || "",
							function(b, d) {
								h.push({
									label: b,
									value: d,
									theme: c.options.theme,
									renderLabelHtml: function() {
										return '<div class="edui-label %%-label" style="font-family:' + a.unhtml(this.value) + '">' + (this.label || "") + "</div>"
									}
								})
							}(g.label || i, g.val);
						return j = new b.Combox({
							editor: c,
							items: h,
							onselect: function(a, b) {
								c.execCommand("FontFamily", this.items[b].value)
							},
							onbuttonclick: function() {
								this.showPopup()
							},
							title: e,
							initValue: e,
							className: "edui-for-fontfamily",
							indexByValue: function(a) {
								if (a)
									for (var c, b = 0; c = this.items[b]; b++)
										if (-1 != c.value.indexOf(a)) return b;
								return -1
							}
						}), b.buttons["fontfamily"] = j, c.addListener("selectionchange", function(a, b, d) {
							var e, f;
							d || (e = c.queryCommandState("FontFamily"), -1 == e ? j.setDisabled(!0) : (j.setDisabled(!1), f = c.queryCommandValue("FontFamily"), f && (f = f.replace(/['"]/g, "").split(",")[0]), j.setValue(f)))
						}), j
					}
				}, b.fontsize = function(a, c, d) {
					var e, f, g, h;
					if (d = a.options.labelMap["fontsize"] || a.getLang("labelMap.fontsize") || "", c = c || a.options["fontsize"] || [], c.length) {
						for (e = [], f = 0; f < c.length; f++) g = c[f] + "px", e.push({
							label: g,
							value: g,
							theme: a.options.theme,
							renderLabelHtml: function() {
								return '<div class="edui-label %%-label" style="line-height:1;font-size:' + this.value + '">' + (this.label || "") + "</div>"
							}
						});
						return h = new b.Combox({
							editor: a,
							items: e,
							title: d,
							initValue: d,
							onselect: function(b, c) {
								a.execCommand("FontSize", this.items[c].value)
							},
							onbuttonclick: function() {
								this.showPopup()
							},
							className: "edui-for-fontsize"
						}), b.buttons["fontsize"] = h, a.addListener("selectionchange", function(b, c, d) {
							if (!d) {
								var e = a.queryCommandState("FontSize"); - 1 == e ? h.setDisabled(!0) : (h.setDisabled(!1), h.setValue(a.queryCommandValue("FontSize")))
							}
						}), h
					}
				}, b.paragraph = function(c, d, e) {
					var f, g, h;
					if (e = c.options.labelMap["paragraph"] || c.getLang("labelMap.paragraph") || "", d = c.options["paragraph"] || [], !a.isEmptyObject(d)) {
						f = [];
						for (g in d) f.push({
							value: g,
							label: d[g] || c.getLang("paragraph")[g],
							theme: c.options.theme,
							renderLabelHtml: function() {
								return '<div class="edui-label %%-label"><span class="edui-for-' + this.value + '">' + (this.label || "") + "</span></div>"
							}
						});
						return h = new b.Combox({
							editor: c,
							items: f,
							title: e,
							initValue: e,
							className: "edui-for-paragraph",
							onselect: function(a, b) {
								c.execCommand("Paragraph", this.items[b].value)
							},
							onbuttonclick: function() {
								this.showPopup()
							}
						}), b.buttons["paragraph"] = h, c.addListener("selectionchange", function(a, b, d) {
							var e, f, g;
							d || (e = c.queryCommandState("Paragraph"), -1 == e ? h.setDisabled(!0) : (h.setDisabled(!1), f = c.queryCommandValue("Paragraph"), g = h.indexByValue(f), -1 != g ? h.setValue(f) : h.setValue(h.initValue)))
						}), h
					}
				}, b.customstyle = function(a) {
					var e, h, f, g, i, c = a.options["customstyle"] || [],
						d = a.options.labelMap["customstyle"] || a.getLang("labelMap.customstyle") || "";
					if (c.length) {
						for (e = a.getLang("customstyle"), f = 0, g = []; h = c[f++];) ! function(b) {
							var c = {};
							c.label = b.label ? b.label : e[b.name], c.style = b.style, c.className = b.className, c.tag = b.tag, g.push({
								label: c.label,
								value: c,
								theme: a.options.theme,
								renderLabelHtml: function() {
									return '<div class="edui-label %%-label"><' + c.tag + " " + (c.className ? ' class="' + c.className + '"' : "") + (c.style ? ' style="' + c.style + '"' : "") + ">" + c.label + "</" + c.tag + ">" + "</div>"
								}
							})
						}(h);
						return i = new b.Combox({
							editor: a,
							items: g,
							title: d,
							initValue: d,
							className: "edui-for-customstyle",
							onselect: function(b, c) {
								a.execCommand("customstyle", this.items[c].value)
							},
							onbuttonclick: function() {
								this.showPopup()
							},
							indexByValue: function(a) {
								for (var c, b = 0; c = this.items[b++];)
									if (c.label == a) return b - 1;
								return -1
							}
						}), b.buttons["customstyle"] = i, a.addListener("selectionchange", function(b, c, d) {
							var e, f, g;
							d || (e = a.queryCommandState("customstyle"), -1 == e ? i.setDisabled(!0) : (i.setDisabled(!1), f = a.queryCommandValue("customstyle"), g = i.indexByValue(f), -1 != g ? i.setValue(f) : i.setValue(i.initValue)))
						}), i
					}
				}, b.inserttable = function(a, c, d) {
					d = a.options.labelMap["inserttable"] || a.getLang("labelMap.inserttable") || "";
					var e = new b.TableButton({
						editor: a,
						title: d,
						className: "edui-for-inserttable",
						onpicktable: function(b, c, d) {
							a.execCommand("InsertTable", {
								numRows: d,
								numCols: c,
								border: 1
							})
						},
						onbuttonclick: function() {
							this.showPopup()
						}
					});
					return b.buttons["inserttable"] = e, a.addListener("selectionchange", function() {
						e.setDisabled(-1 == a.queryCommandState("inserttable"))
					}), e
				}, b.lineheight = function(a) {
					var e, d, f, g, c = a.options.lineheight || [];
					if (c.length) {
						for (d = 0, f = []; e = c[d++];) f.push({
							label: e,
							value: e,
							theme: a.options.theme,
							onclick: function() {
								a.execCommand("lineheight", this.value)
							}
						});
						return g = new b.MenuButton({
							editor: a,
							className: "edui-for-lineheight",
							title: a.options.labelMap["lineheight"] || a.getLang("labelMap.lineheight") || "",
							items: f,
							onbuttonclick: function() {
								var b = a.queryCommandValue("LineHeight") || this.value;
								a.execCommand("LineHeight", b)
							}
						}), b.buttons["lineheight"] = g, a.addListener("selectionchange", function() {
							var c, b = a.queryCommandState("LineHeight"); - 1 == b ? g.setDisabled(!0) : (g.setDisabled(!1), c = a.queryCommandValue("LineHeight"), c && g.setValue((c + "").replace(/cm/, "")), g.setChecked(b))
						}), g
					}
				}, k = ["top", "bottom"], l = 0; m = k[l++];) ! function(a) {
				b["rowspacing" + a] = function(c) {
					var f, e, g, h, d = c.options["rowspacing" + a] || [];
					if (!d.length) return null;
					for (e = 0, g = []; f = d[e++];) g.push({
						label: f,
						value: f,
						theme: c.options.theme,
						onclick: function() {
							c.execCommand("rowspacing", this.value, a)
						}
					});
					return h = new b.MenuButton({
						editor: c,
						className: "edui-for-rowspacing" + a,
						title: c.options.labelMap["rowspacing" + a] || c.getLang("labelMap.rowspacing" + a) || "",
						items: g,
						onbuttonclick: function() {
							var b = c.queryCommandValue("rowspacing", a) || this.value;
							c.execCommand("rowspacing", b, a)
						}
					}), b.buttons[a] = h, c.addListener("selectionchange", function() {
						var d, b = c.queryCommandState("rowspacing", a); - 1 == b ? h.setDisabled(!0) : (h.setDisabled(!1), d = c.queryCommandValue("rowspacing", a), d && h.setValue((d + "").replace(/%/, "")), h.setChecked(b))
					}), h
				}
			}(m);
			for (n = ["insertorderedlist", "insertunorderedlist"], o = 0; p = n[o++];) ! function(a) {
				b[a] = function(c) {
					var g, h, d = c.options[a],
						e = function() {
							c.execCommand(a, this.value)
						},
						f = [];
					for (g in d) f.push({
						label: d[g] || c.getLang()[a][g] || "",
						value: g,
						theme: c.options.theme,
						onclick: e
					});
					return h = new b.MenuButton({
						editor: c,
						className: "edui-for-" + a,
						title: c.getLang("labelMap." + a) || "",
						items: f,
						onbuttonclick: function() {
							var b = c.queryCommandValue(a) || this.value;
							c.execCommand(a, b)
						}
					}), b.buttons[a] = h, c.addListener("selectionchange", function() {
						var d, b = c.queryCommandState(a); - 1 == b ? h.setDisabled(!0) : (h.setDisabled(!1), d = c.queryCommandValue(a), h.setValue(d), h.setChecked(b))
					}), h
				}
			}(p);
			b.fullscreen = function(a, c) {
				c = a.options.labelMap["fullscreen"] || a.getLang("labelMap.fullscreen") || "";
				var d = new b.Button({
					className: "edui-for-fullscreen",
					title: c,
					theme: a.options.theme,
					onclick: function() {
						a.ui && a.ui.setFullScreen(!a.ui.isFullScreen()), this.setChecked(a.ui.isFullScreen())
					}
				});
				return b.buttons["fullscreen"] = d, a.addListener("selectionchange", function() {
					var b = a.queryCommandState("fullscreen");
					d.setDisabled(-1 == b), d.setChecked(a.ui.isFullScreen())
				}), d
			}, b["emotion"] = function(a, c) {
				var e = "emotion",
					f = new b.MultiMenuPop({
						title: a.options.labelMap[e] || a.getLang("labelMap." + e) || "",
						editor: a,
						className: "edui-for-" + e,
						iframeUrl: a.ui.mapUrl(c || (a.options.iframeUrlMap || {})[e] || d[e])
					});
				return b.buttons[e] = f, a.addListener("selectionchange", function() {
					f.setDisabled(-1 == a.queryCommandState(e))
				}), f
			}, b.autotypeset = function(a) {
				var c = new b.AutoTypeSetButton({
					editor: a,
					title: a.options.labelMap["autotypeset"] || a.getLang("labelMap.autotypeset") || "",
					className: "edui-for-autotypeset",
					onbuttonclick: function() {
						a.execCommand("autotypeset")
					}
				});
				return b.buttons["autotypeset"] = c, a.addListener("selectionchange", function() {
					c.setDisabled(-1 == a.queryCommandState("autotypeset"))
				}), c
			}, b["simpleupload"] = function(a) {
				var c = "simpleupload",
					d = new b.Button({
						className: "edui-for-" + c,
						title: a.options.labelMap[c] || a.getLang("labelMap." + c) || "",
						onclick: function() {},
						theme: a.options.theme,
						showText: !1
					});
				return b.buttons[c] = d, a.addListener("ready", function() {
					var b = d.getDom("body"),
						c = b.children[0];
					a.fireEvent("simpleuploadbtnready", c)
				}), a.addListener("selectionchange", function(b, e, f) {
					var g = a.queryCommandState(c); - 1 == g ? (d.setDisabled(!0), d.setChecked(!1)) : f || (d.setDisabled(!1), d.setChecked(g))
				}), d
			}
		}(),
		function() {
			function f(a) {
				this.initOptions(a), this.initEditorUI()
			}
			var g, a = baidu.editor.utils,
				b = baidu.editor.ui.uiUtils,
				c = baidu.editor.ui.UIBase,
				d = baidu.editor.dom.domUtils,
				e = [];
			f.prototype = {
				uiName: "editor",
				initEditorUI: function() {
					function g(a, b) {
						var c, d, e, f, g, h;
						a.setOpt({
							wordCount: !0,
							maximumWords: 1e4,
							wordCountMsg: a.options.wordCountMsg || a.getLang("wordCountMsg"),
							wordOverFlowMsg: a.options.wordOverFlowMsg || a.getLang("wordOverFlowMsg")
						}), c = a.options, d = c.maximumWords, e = c.wordCountMsg, f = c.wordOverFlowMsg, g = b.getDom("wordcount"), c.wordCount && (h = a.getContentLength(!0), h > d ? (g.innerHTML = f, a.fireEvent("wordcountoverflow")) : g.innerHTML = e.replace("{#leave}", d - h).replace("{#count}", h))
						if (h > d){
							$('.btnSubmit').css('backgroundColor','#ddd');
							$('.btnSubmit').css('borderColor','#ddd');
							$('.btnSubmit').css('pointerEvents','none');
						} else {
							$('.btnSubmit').css('backgroundColor','#49f');
							$('.btnSubmit').css('borderColor','#49f');
							$('.btnSubmit').css('pointerEvents','auto');
						}
					}
					var a, b, c, f, e, h;
					this.editor.ui = this, this._dialogs = {}, this.initUIBase(), this._initToolbars(), a = this.editor, b = this, a.addListener("ready", function() {
						function c() {
							g(a, b), d.un(a.document, "click", arguments.callee)
						}
						a.getDialog = function(b) {
							return a.ui._dialogs[b + "Dialog"]
						}, d.on(a.window, "scroll", function(a) {
							baidu.editor.ui.Popup.postHide(a)
						}), a.ui._actualFrameWidth = a.options.initialFrameWidth, UE.browser.ie && 6 === UE.browser.version && a.container.ownerDocument.execCommand("BackgroundImageCache", !1, !0), a.options.elementPathEnabled && (a.ui.getDom("elementpath").innerHTML = '<div class="edui-editor-breadcrumb">' + a.getLang("elementPathTip") + ":</div>"), a.options.wordCount && (d.on(a.document, "click", c), a.ui.getDom("wordcount").innerHTML = a.getLang("wordCountTip")), a.ui._scale(), a.options.scaleEnabled ? (a.autoHeightEnabled && a.disableAutoHeight(), b.enableScale()) : b.disableScale(), a.options.elementPathEnabled || a.options.wordCount || a.options.scaleEnabled || (a.ui.getDom("elementpath").style.display = "none", a.ui.getDom("wordcount").style.display = "none", a.ui.getDom("scale").style.display = "none"), a.selection.isFocus() && a.fireEvent("selectionchange", !1, !0)
					}), a.addListener("mousedown", function(a, b) {
						var c = b.target || b.srcElement;
						baidu.editor.ui.Popup.postHide(b, c), baidu.editor.ui.ShortCutMenu.postHide(b)
					}), a.addListener("delcells", function() {
						UE.ui["edittip"] && new UE.ui["edittip"](a), a.getDialog("edittip").open()
					}), e = !1, a.addListener("afterpaste", function() {
						a.queryCommandState("pasteplain") || (baidu.editor.ui.PastePicker && (c = new baidu.editor.ui.Popup({
							content: new baidu.editor.ui.PastePicker({
								editor: a
							}),
							editor: a,
							className: "edui-wordpastepop"
						}), c.render()), e = !0)
					}), a.addListener("afterinserthtml", function() {
						clearTimeout(f), f = setTimeout(function() {
							var b, f, g;
							c && (e || a.ui._isTransfer) && (c.isHidden() ? (b = d.createElement(a.document, "span", {
								style: "line-height:0px;",
								innerHTML: "﻿"
							}), f = a.selection.getRange(), f.insertNode(b), g = getDomNode(b, "firstChild", "previousSibling"), g && c.showAnchor(3 == g.nodeType ? g.parentNode : g), d.remove(b)) : c.show(), delete a.ui._isTransfer, e = !1)
						}, 200)
					}), a.addListener("contextmenu", function(a, b) {
						baidu.editor.ui.Popup.postHide(b)
					}), a.addListener("keydown", function(a, b) {
						c && c.dispose(b);
						var d = b.keyCode || b.which;
						b.altKey && 90 == d && UE.ui.buttons["fullscreen"].onclick()
					}), a.addListener("wordcount", function() {
						g(this, b)
					}), a.addListener("selectionchange", function() {
						a.options.elementPathEnabled && b[(-1 == a.queryCommandState("elementpath") ? "dis" : "en") + "ableElementPath"](), a.options.scaleEnabled && b[(-1 == a.queryCommandState("scale") ? "dis" : "en") + "ableScale"]()
					}), h = new baidu.editor.ui.Popup({
						editor: a,
						content: "",
						className: "edui-bubble",
						_onEditButtonClick: function() {
							this.hide(), a.ui._dialogs.linkDialog.open()
						},
						_onImgEditButtonClick: function(b) {
							this.hide(), a.ui._dialogs[b] && a.ui._dialogs[b].open()
						},
						_onImgSetFloat: function(b) {
							this.hide(), a.execCommand("imagefloat", b)
						},
						_setIframeAlign: function(a) {
							var b = h.anchorEl,
								c = b.cloneNode(!0);
							switch (a) {
								case -2:
									c.setAttribute("align", "");
									break;
								case -1:
									c.setAttribute("align", "left");
									break;
								case 1:
									c.setAttribute("align", "right")
							}
							b.parentNode.insertBefore(c, b), d.remove(b), h.anchorEl = c, h.showAnchor(h.anchorEl)
						},
						_updateIframe: function() {
							var b = a._iframe = h.anchorEl;
							d.hasClass(b, "ueditor_baidumap") ? (a.selection.getRange().selectNode(b).select(), a.ui._dialogs.mapDialog.open(), h.hide()) : (a.ui._dialogs.insertframeDialog.open(), h.hide())
						},
						_onRemoveButtonClick: function(b) {
							a.execCommand(b), this.hide()
						},
						queryAutoHide: function(b) {
							return b && b.ownerDocument == a.document && ("img" == b.tagName.toLowerCase() || d.findParentByTagName(b, "a", !0)) ? b !== h.anchorEl : baidu.editor.ui.Popup.prototype.queryAutoHide.call(this, b)
						}
					}), h.render(), a.options.imagePopup && (a.addListener("mouseover", function(b, c) {
						var d, e;
						c = c || window.event, d = c.target || c.srcElement, a.ui._dialogs.insertframeDialog && /iframe/gi.test(d.tagName) && (e = h.formatHtml("<nobr>" + a.getLang("property") + ': <span onclick=$$._setIframeAlign(-2) class="edui-clickable">' + a.getLang("default") + '</span>&nbsp;&nbsp;<span onclick=$$._setIframeAlign(-1) class="edui-clickable">' + a.getLang("justifyleft") + '</span>&nbsp;&nbsp;<span onclick=$$._setIframeAlign(1) class="edui-clickable">' + a.getLang("justifyright") + "</span>&nbsp;&nbsp;" + ' <span onclick="$$._updateIframe( this);" class="edui-clickable">' + a.getLang("modify") + "</span></nobr>"), e ? (h.getDom("content").innerHTML = e, h.anchorEl = d, h.showAnchor(h.anchorEl)) : h.hide())
					}), a.addListener("selectionchange", function(b, c) {
						var e, f, g, i, j, k, l, m;
						if (c) {
							if (e = "", f = "", g = a.selection.getRange().getClosedNode(), i = a.ui._dialogs, g && "IMG" == g.tagName) {
								if (j = "insertimageDialog", (-1 != g.className.indexOf("edui-faked-video") || -1 != g.className.indexOf("edui-upload-video")) && (j = "insertvideoDialog"), -1 != g.className.indexOf("edui-faked-webapp") && (j = "webappDialog"), -1 != g.src.indexOf("http://api.map.baidu.com") && (j = "mapDialog"), -1 != g.className.indexOf("edui-faked-music") && (j = "musicDialog"), -1 != g.src.indexOf("http://maps.google.com/maps/api/staticmap") && (j = "gmapDialog"), g.getAttribute("anchorname") && (j = "anchorDialog", e = h.formatHtml("<nobr>" + a.getLang("property") + ': <span onclick=$$._onImgEditButtonClick("anchorDialog") class="edui-clickable">' + a.getLang("modify") + "</span>&nbsp;&nbsp;" + "<span onclick=$$._onRemoveButtonClick('anchor') class=\"edui-clickable\">" + a.getLang("delete") + "</span></nobr>")), g.getAttribute("word_img") && (a.word_img = [g.getAttribute("word_img")], j = "wordimageDialog"), (d.hasClass(g, "loadingclass") || d.hasClass(g, "loaderrorclass")) && (j = ""), !i[j]) return;
								f = "<nobr>" + a.getLang("property") + ": " + '<span onclick=$$._onImgSetFloat("none") class="edui-clickable">' + a.getLang("default") + "</span>&nbsp;&nbsp;" + '<span onclick=$$._onImgSetFloat("left") class="edui-clickable">' + a.getLang("justifyleft") + "</span>&nbsp;&nbsp;" + '<span onclick=$$._onImgSetFloat("right") class="edui-clickable">' + a.getLang("justifyright") + "</span>&nbsp;&nbsp;" + '<span onclick=$$._onImgSetFloat("center") class="edui-clickable">' + a.getLang("justifycenter") + "</span>&nbsp;&nbsp;" + "<span onclick=\"$$._onImgEditButtonClick('" + j + '\');" class="edui-clickable">' + a.getLang("modify") + "</span></nobr>", !e && (e = h.formatHtml(f))
							}
							a.ui._dialogs.linkDialog && (k = a.queryCommandValue("link"), k && (l = k.getAttribute("_href") || k.getAttribute("href", 2)) && (m = l, l.length > 30 && (m = l.substring(0, 20) + "..."), e && (e += '<div style="height:5px;"></div>'), e += h.formatHtml("<nobr>" + a.getLang("anthorMsg") + ': <a target="_blank" href="' + l + '" title="' + l + '" >' + m + "</a>" + ' <span class="edui-clickable" onclick="$$._onEditButtonClick();">' + a.getLang("modify") + "</span>" + ' <span class="edui-clickable" onclick="$$._onRemoveButtonClick(\'unlink\');"> ' + a.getLang("clear") + "</span></nobr>"), h.showAnchor(k))), e ? (h.getDom("content").innerHTML = e, h.anchorEl = g || k, h.showAnchor(h.anchorEl)) : h.hide()
						}
					}))
				},
				_initToolbars: function() {
					var e, f, g, h, i, j, b = this.editor,
						c = this.toolbars || [],
						d = [];
					for (e = 0; e < c.length; e++) {
						for (f = c[e], g = new baidu.editor.ui.Toolbar({
								theme: b.options.theme
							}), h = 0; h < f.length; h++) {
							if (i = f[h], j = null, "string" == typeof i) {
								if (i = i.toLowerCase(), "|" == i && (i = "Separator"), "||" == i && (i = "Breakline"), baidu.editor.ui[i] && (j = new baidu.editor.ui[i](b)), "fullscreen" == i) {
									d && d[0] ? d[0].items.splice(0, 0, j) : j && g.items.splice(0, 0, j);
									continue
								}
							} else j = i;
							j && j.id && g.add(j)
						}
						d[e] = g
					}
					a.each(UE._customizeUI, function(a, c) {
						var d, e;
						return a.id && a.id != b.key ? !1 : (d = a.execFn.call(b, b, c), d && (e = a.index, void 0 === e && (e = g.items.length), g.add(d, e)), void 0)
					}), this.toolbars = d
				},
				getHtmlTpl: function() {
					return '<div id="##" class="%%"><div id="##_toolbarbox" class="%%-toolbarbox">' + (this.toolbars.length ? '<div id="##_toolbarboxouter" class="%%-toolbarboxouter"><div class="%%-toolbarboxinner">' + this.renderToolbarBoxHtml() + "</div></div>" : "") + '<div id="##_toolbarmsg" class="%%-toolbarmsg" style="display:none;">' + '<div id = "##_upload_dialog" class="%%-toolbarmsg-upload" onclick="$$.showWordImageDialog();">' + this.editor.getLang("clickToUpload") + "</div>" + '<div class="%%-toolbarmsg-close" onclick="$$.hideToolbarMsg();">x</div>' + '<div id="##_toolbarmsg_label" class="%%-toolbarmsg-label"></div>' + '<div style="height:0;overflow:hidden;clear:both;"></div>' + "</div>" + '<div id="##_message_holder" class="%%-messageholder"></div>' + "</div>" + '<div id="##_iframeholder" class="%%-iframeholder">' + "</div>" + '<div id="##_bottombar" class="%%-bottomContainer"><table><tr>' + '<td id="##_elementpath" class="%%-bottombar"></td>' + '<td id="##_wordcount" class="%%-wordcount"></td>' + '<td id="##_scale" class="%%-scale"><div class="%%-icon"></div></td>' + "</tr></table></div>" + '<div id="##_scalelayer"></div>' + "</div>"
				},
				showWordImageDialog: function() {
					this._dialogs["wordimageDialog"].open()
				},
				renderToolbarBoxHtml: function() {
					var b, a = [];
					for (b = 0; b < this.toolbars.length; b++) a.push(this.toolbars[b].renderHtml());
					return a.join("")
				},
				setFullScreen: function(a) {
					var d, f, g, b = this.editor,
						c = b.container.parentNode.parentNode;
					if (this._fullscreen != a) {
						if (this._fullscreen = a, this.editor.fireEvent("beforefullscreenchange", a), baidu.editor.browser.gecko && (d = b.selection.getRange().createBookmark()), a) {
							for (;
								"BODY" != c.tagName;) f = baidu.editor.dom.domUtils.getComputedStyle(c, "position"), e.push(f), c.style.position = "static", c = c.parentNode;
							this._bakHtmlOverflow = document.documentElement.style.overflow, this._bakBodyOverflow = document.body.style.overflow, this._bakAutoHeight = this.editor.autoHeightEnabled, this._bakScrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop), this._bakEditorContaninerWidth = b.iframe.parentNode.offsetWidth, this._bakAutoHeight && (b.autoHeightEnabled = !1, this.editor.disableAutoHeight()), document.documentElement.style.overflow = "hidden", window.scrollTo(0, window.scrollY), this._bakCssText = this.getDom().style.cssText, this._bakCssText1 = this.getDom("iframeholder").style.cssText, b.iframe.parentNode.style.width = "", this._updateFullScreen()
						} else {
							for (;
								"BODY" != c.tagName;) c.style.position = e.shift(), c = c.parentNode;
							this.getDom().style.cssText = this._bakCssText, this.getDom("iframeholder").style.cssText = this._bakCssText1, this._bakAutoHeight && (b.autoHeightEnabled = !0, this.editor.enableAutoHeight()), document.documentElement.style.overflow = this._bakHtmlOverflow, document.body.style.overflow = this._bakBodyOverflow, b.iframe.parentNode.style.width = this._bakEditorContaninerWidth + "px", window.scrollTo(0, this._bakScrollTop)
						}
						browser.gecko && "true" === b.body.contentEditable && (g = document.createElement("input"), document.body.appendChild(g), b.body.contentEditable = !1, setTimeout(function() {
							g.focus(), setTimeout(function() {
								b.body.contentEditable = !0, b.fireEvent("fullscreenchanged", a), b.selection.getRange().moveToBookmark(d).select(!0), baidu.editor.dom.domUtils.remove(g), a && window.scroll(0, 0)
							}, 0)
						}, 0)), "true" === b.body.contentEditable && (this.editor.fireEvent("fullscreenchanged", a), this.triggerLayout())
					}
				},
				_updateFullScreen: function() {
					if (this._fullscreen) {
						var a = b.getViewportRect();
						if (this.getDom().style.cssText = "border:0;position:absolute;left:0;top:" + (this.editor.options.topOffset || 0) + "px;width:" + a.width + "px;height:" + a.height + "px;z-index:" + (1 * this.getDom().style.zIndex + 100), b.setViewportOffset(this.getDom(), {
								left: 0,
								top: this.editor.options.topOffset || 0
							}), this.editor.setHeight(a.height - this.getDom("toolbarbox").offsetHeight - this.getDom("bottombar").offsetHeight - (this.editor.options.topOffset || 0), !0), browser.gecko) try {
							window.onresize()
						} catch (c) {}
					}
				},
				_updateElementPath: function() {
					var b, c, e, d, a = this.getDom("elementpath");
					if (this.elementPathEnabled && (b = this.editor.queryCommandValue("elementpath"))) {
						for (c = [], d = 0; e = b[d]; d++) c[d] = this.formatHtml('<span unselectable="on" onclick="$$.editor.execCommand(&quot;elementpath&quot;, &quot;' + d + '&quot;);">' + e + "</span>");
						a.innerHTML = '<div class="edui-editor-breadcrumb" onmousedown="return false;">' + this.editor.getLang("elementPathTip") + ": " + c.join(" &gt; ") + "</div>"
					} else a.style.display = "none"
				},
				disableElementPath: function() {
					var a = this.getDom("elementpath");
					a.innerHTML = "", a.style.display = "none", this.elementPathEnabled = !1
				},
				enableElementPath: function() {
					var a = this.getDom("elementpath");
					a.style.display = "", this.elementPathEnabled = !0, this._updateElementPath()
				},
				_scale: function() {
					function r() {
						k = d.getXY(c), l || (l = b.options.minFrameHeight + f.offsetHeight + g.offsetHeight), i.style.cssText = "position:absolute;left:0;display:;top:0;background-color:#41ABFF;opacity:0.4;filter: Alpha(opacity=40);width:" + c.offsetWidth + "px;height:" + c.offsetHeight + "px;z-index:" + (b.options.zIndex + 1), d.on(a, "mousemove", t), d.on(e, "mouseup", u), d.on(a, "mouseup", u)
					}

					function t(b) {
						v();
						var c = b || window.event;
						n = c.pageX || a.documentElement.scrollLeft + c.clientX, o = c.pageY || a.documentElement.scrollTop + c.clientY, p = n - k.x, q = o - k.y, p >= m && (j = !0, i.style.width = p + "px"), q >= l && (j = !0, i.style.height = q + "px")
					}

					function u() {
						j && (j = !1, b.ui._actualFrameWidth = i.offsetWidth - 2, c.style.width = b.ui._actualFrameWidth + "px", b.setHeight(i.offsetHeight - g.offsetHeight - f.offsetHeight - 2, !0)), i && (i.style.display = "none"), v(), d.un(a, "mousemove", t), d.un(e, "mouseup", u), d.un(a, "mouseup", u)
					}

					function v() {
						browser.ie ? a.selection.clear() : window.getSelection().removeAllRanges()
					}
					var a = document,
						b = this.editor,
						c = b.container,
						e = b.document,
						f = this.getDom("toolbarbox"),
						g = this.getDom("bottombar"),
						h = this.getDom("scale"),
						i = this.getDom("scalelayer"),
						j = !1,
						k = null,
						l = 0,
						m = b.options.minFrameWidth,
						n = 0,
						o = 0,
						p = 0,
						q = 0,
						s = this;
					this.editor.addListener("fullscreenchanged", function(a, b) {
						if (b) s.disableScale();
						else if (s.editor.options.scaleEnabled) {
							s.enableScale();
							var c = s.editor.document.createElement("span");
							s.editor.body.appendChild(c), s.editor.body.style.height = Math.max(d.getXY(c).y, s.editor.iframe.offsetHeight - 20) + "px", d.remove(c)
						}
					}), this.enableScale = function() {
						1 != b.queryCommandState("source") && (h.style.display = "", this.scaleEnabled = !0, d.on(h, "mousedown", r))
					}, this.disableScale = function() {
						h.style.display = "none", this.scaleEnabled = !1, d.un(h, "mousedown", r)
					}
				},
				isFullScreen: function() {
					return this._fullscreen
				},
				postRender: function() {
					var a, b, d, e, f;
					for (c.prototype.postRender.call(this), a = 0; a < this.toolbars.length; a++) this.toolbars[a].postRender();
					b = this, e = baidu.editor.dom.domUtils, f = function() {
						clearTimeout(d), d = setTimeout(function() {
							b._updateFullScreen()
						})
					}, e.on(window, "resize", f), b.addListener("destroy", function() {
						e.un(window, "resize", f), clearTimeout(d)
					})
				},
				showToolbarMsg: function(a, b) {
					if (this.getDom("toolbarmsg_label").innerHTML = a, this.getDom("toolbarmsg").style.display = "", !b) {
						var c = this.getDom("upload_dialog");
						c.style.display = "none"
					}
				},
				hideToolbarMsg: function() {
					this.getDom("toolbarmsg").style.display = "none"
				},
				mapUrl: function(a) {
					return a ? a.replace("~/", this.editor.options.UEDITOR_HOME_URL || "") : ""
				},
				triggerLayout: function() {
					var a = this.getDom();
					a.style.zoom = "1" == a.style.zoom ? "100%" : "1"
				}
			}, a.inherits(f, baidu.editor.ui.UIBase), g = {}, UE.ui.Editor = function(b) {
				var e, c = new UE.Editor(b);
				return c.options.editor = c, a.loadFile(document, {
					href: c.options.themePath + c.options.theme + "/css/ueditor.css",
					tag: "link",
					type: "text/css",
					rel: "stylesheet"
				}), e = c.render, c.render = function(b) {
					b.constructor === String && (c.key = b, g[b] = c), a.domReady(function() {
						function a() {
							var a, g, h, i, j, l, k, m;
							for (c.setOpt({
									labelMap: c.options.labelMap || c.getLang("labelMap")
								}), new f(c.options), b && (b.constructor === String && (b = document.getElementById(b)), b && b.getAttribute("name") && (c.options.textarea = b.getAttribute("name")), b && /script|textarea/gi.test(b.tagName) && (a = document.createElement("div"), b.parentNode.insertBefore(a, b), g = b.value || b.innerHTML, c.options.initialContent = /^[\t\r\n ]*$/.test(g) ? c.options.initialContent : g.replace(/>[\n\r\t]+([ ]{4})+/g, ">").replace(/[\n\r\t]+([ ]{4})+</g, "<").replace(/>[\n\r\t]+</g, "><"), b.className && (a.className = b.className), b.style.cssText && (a.style.cssText = b.style.cssText), /textarea/i.test(b.tagName) ? (c.textarea = b, c.textarea.style.display = "none") : b.parentNode.removeChild(b), b.id && (a.id = b.id, d.removeAttributes(b, "id")), b = a, b.innerHTML = "")), d.addClass(b, "edui-" + c.options.theme), c.ui.render(b), h = c.options, c.container = c.ui.getDom(), i = d.findParents(b, !0), j = [], k = 0; l = i[k]; k++) j[k] = l.style.display, l.style.display = "block";
							for (h.initialFrameWidth ? h.minFrameWidth = h.initialFrameWidth : (h.minFrameWidth = h.initialFrameWidth = b.offsetWidth, m = b.style.width, /%$/.test(m) && (h.initialFrameWidth = m)), h.initialFrameHeight ? h.minFrameHeight = h.initialFrameHeight : h.initialFrameHeight = h.minFrameHeight = b.offsetHeight, k = 0; l = i[k]; k++) l.style.display = j[k];
							b.style.height && (b.style.height = ""), c.container.style.width = h.initialFrameWidth + (/%$/.test(h.initialFrameWidth) ? "" : "px"), c.container.style.zIndex = h.zIndex, e.call(c, c.ui.getDom("iframeholder")), c.fireEvent("afteruiready")
						}
						c.langIsReady ? a() : c.addListener("langReady", a)
					})
				}, c
			}, UE.getEditor = function(a, b) {
				var c = g[a];
				return c || (c = g[a] = new UE.ui.Editor(b), c.render(a)), c
			}, UE.delEditor = function(a) {
				var b;
				(b = g[a]) && (b.key && b.destroy(), delete g[a])
			}, UE.registerUI = function(b, c, d, e) {
				a.each(b.split(/\s+/), function(a) {
					UE._customizeUI[a] = {
						id: e,
						execFn: c,
						index: d
					}
				})
			}
		}(), UE.registerUI("message", function(a) {
			function g() {
				var a = f.ui.getDom("toolbarbox");
				a && (d.style.top = a.offsetHeight + 3 + "px"), d.style.zIndex = Math.max(f.options.zIndex, f.iframe.style.zIndex) + 1
			}
			var d, b = baidu.editor.ui,
				c = b.Message,
				e = [],
				f = a;
			f.addListener("ready", function() {
				d = document.getElementById(f.ui.id + "_message_holder"), g(), setTimeout(function() {
					g()
				}, 500)
			}), f.addListener("showmessage", function(a, b) {
				b = utils.isString(b) ? {
					content: b
				} : b;
				var h = new c({
						timeout: b.timeout,
						type: b.type,
						content: b.content,
						keepshow: b.keepshow,
						editor: f
					}),
					i = b.id || "msg_" + (+new Date).toString(36);
				return h.render(d), e[i] = h, h.reset(b), g(), i
			}), f.addListener("updatemessage", function(a, b, c) {
				c = utils.isString(c) ? {
					content: c
				} : c;
				var f = e[b];
				f.render(d), f && f.reset(c)
			}), f.addListener("hidemessage", function(a, b) {
				var c = e[b];
				c && c.hide()
			})
		}), UE.registerUI("autosave", function(a) {
			var b = null,
				c = null;
			a.on("afterautosave", function() {
				clearTimeout(b), b = setTimeout(function() {
					c && a.trigger("hidemessage", c), c = a.trigger("showmessage", {
						content: a.getLang("autosave.success"),
						timeout: 2e3
					})
				}, 2e3)
			})
		})
}();