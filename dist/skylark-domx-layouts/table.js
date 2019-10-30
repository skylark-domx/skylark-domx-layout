/**
 * skylark-domx-layouts - The dom layout features enhancement for skylark utils.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.1
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx/langx","skylark-domx-query","./layouts"],function(i,e,l){return l.table=function(l,n){n=i.mixin({items:".item"},n);var t=e(l).children(n.items);t.css({width:"100%",display:"table-row"}),t.each(function(){e(this).children().css({display:"table-cell"})})}});
//# sourceMappingURL=sourcemaps/table.js.map
