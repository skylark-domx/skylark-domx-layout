/**
 * skylark-domx-layouts - The dom layout features enhancement for skylark utils.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.1
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx/langx","skylark-domx-query","./layouts"],function(i,t,e){return e.rows=function(e,n){n=i.mixin({items:".item"},n);t(e).children(n.items).css({left:"0px",top:"0px",position:"relative",display:"list-item"})}});
//# sourceMappingURL=sourcemaps/rows.js.map
