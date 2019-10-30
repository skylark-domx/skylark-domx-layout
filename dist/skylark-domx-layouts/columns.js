/**
 * skylark-domx-layouts - The dom layout features enhancement for skylark utils.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.1
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx/langx","skylark-domx-query","./layouts"],function(e,i,l){return l.columns=function(l,n){n=e.mixin({items:".item"},n);i(l).children(n.items).css({left:"0px",top:"0px",position:"relative",display:"table-cell"})}});
//# sourceMappingURL=sourcemaps/columns.js.map
