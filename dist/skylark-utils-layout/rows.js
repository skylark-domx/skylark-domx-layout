/**
 * skylark-utils-layout - The dom layout features enhancement for skylark utils.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0-beta
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx/langx","skylark-utils/query","./layouts"],function(i,t,e){var s=e.rows=function(e,s){var s=i.mixin({items:".item"},s),l=t(e).children(s.items);l.css({left:"0px",top:"0px",position:"relative",display:"list-item"})};return s});
//# sourceMappingURL=sourcemaps/rows.js.map
