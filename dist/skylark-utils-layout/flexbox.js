/**
 * skylark-utils-layout - The dom layout features enhancement for skylark utils.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.1
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx/langx","skylark-utils/styler","./layouts"],function(i,n,e){var l=e.flexbox=function(e,l){var l=i.mixin({items:".item",direction:"row",wrap:"wrap",inline:!1},l);n.css(e,{display:l.inline?"inline-flex":"flex","flex-direction":l.direction,"flex-wrap":option.wrap})};return l});
//# sourceMappingURL=sourcemaps/flexbox.js.map
