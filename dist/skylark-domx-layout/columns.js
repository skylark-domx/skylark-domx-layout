/**
 * skylark-domx-layout - The dom layout features enhancement for skylark utils.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.1
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx/langx","skylark-utils-dom/query","./layouts"],function(i,l,e){return e.columns=function(e,t){t=i.mixin({items:".item"},t);l(e).children(t.items).css({left:"0px",top:"0px",position:"relative",display:"table-cell"})}});
//# sourceMappingURL=sourcemaps/columns.js.map
