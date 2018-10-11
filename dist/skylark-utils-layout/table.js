/**
 * skylark-utils-layout - The dom layout features enhancement for skylark utils.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.1
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx/langx","skylark-utils/query","./layouts"],function(i,l,e){var t=e.table=function(e,t){var t=i.mixin({items:".item"},t),a=l(e).children(t.items);a.css({width:"100%",display:"table-row"}),a.each(function(){l(this).children().css({display:"table-cell"})})};return t});
//# sourceMappingURL=sourcemaps/table.js.map
