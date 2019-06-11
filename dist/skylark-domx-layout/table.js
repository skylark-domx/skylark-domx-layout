/**
 * skylark-domx-layout - The dom layout features enhancement for skylark utils.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.1
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx/langx","skylark-utils-dom/query","./layouts"],function(i,l,e){return e.table=function(e,t){t=i.mixin({items:".item"},t);var n=l(e).children(t.items);n.css({width:"100%",display:"table-row"}),n.each(function(){l(this).children().css({display:"table-cell"})})}});
//# sourceMappingURL=sourcemaps/table.js.map
