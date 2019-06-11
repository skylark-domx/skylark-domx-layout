/**
 * skylark-domx-layout - The dom layout features enhancement for skylark utils.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.1
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx/langx","skylark-utils-dom/query","./layouts"],function(i,t,e){return e.rows=function(e,s){s=i.mixin({items:".item"},s);t(e).children(s.items).css({left:"0px",top:"0px",position:"relative",display:"list-item"})}});
//# sourceMappingURL=sourcemaps/rows.js.map
