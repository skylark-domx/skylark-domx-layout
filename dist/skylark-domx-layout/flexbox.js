/**
 * skylark-domx-layout - The dom layout features enhancement for skylark utils.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.1
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx/langx","skylark-utils-dom/styler","./layouts"],function(i,n,e){return e.flexbox=function(e,l){l=i.mixin({items:".item",direction:"row",wrap:"wrap",inline:!1},l);n.css(e,{display:l.inline?"inline-flex":"flex","flex-direction":l.direction,"flex-wrap":option.wrap})}});
//# sourceMappingURL=sourcemaps/flexbox.js.map
