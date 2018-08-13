/**
 * skylark-utils-layout - The dom layout features enhancement for skylark utils.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0-beta
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx/langx","skylark-utils/query","./layouts"],function(i,l,e){var t=e.columns=function(e,t){var t=i.mixin({items:".item"},t),n=l(e).children(t.items);n.css({left:"0px",top:"0px",position:"relative",display:"table-cell"})};return t});
//# sourceMappingURL=sourcemaps/columns.js.map
