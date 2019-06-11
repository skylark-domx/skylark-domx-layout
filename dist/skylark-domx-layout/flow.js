/**
 * skylark-domx-layout - The dom layout features enhancement for skylark utils.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.1
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx/langx","skylark-utils-dom/query","./layouts"],function(i,l,n){return n.flow=function(n,e){e=i.mixin({items:".item"},e);l(n).children(e.items).css({left:"0px",top:"0px",position:"relative",display:"inline-block"})}});
//# sourceMappingURL=sourcemaps/flow.js.map
