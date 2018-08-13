/**
 * skylark-utils-layout - The dom layout features enhancement for skylark utils.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0-beta
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx/langx","skylark-utils/datax","skylark-utils/finder","skylark-utils/geom","./layouts","./DockStyle"],function(t,i,e,n,r,n,l){var o=r.dock=function(r,l){var l=t.mixin({items:"[data-region]"},l),o=n.clientSize(r),a={l:0,t:0,w:o.width,h:o.height},h=e.children(r,l.items);h=h.filter(function(t){return"client"!=i.data(t,"region")}).concat(h.filter(function(t){return"client"==i.data(t,"region")})),h.forEach(function(t){var e=i.data(t,"region"),r=n.size(t);if(!e)throw new Error("No dock setting for "+t.id);styler.css(elm,{position:"absolute"});var l={left:a.l,top:a.t};"top"==e||"bottom"==e?(l.width=a.w,a.h-=r.height,l.top=a.t+a.h):"left"==e||"right"==e?(l.height=a.h,a.w-=r.width,"left"==pos?a.l+=r.width:l.left=a.l+a.w):"client"==e&&(l.width=a.w,l.height=a.h),n.relativeRect(t,l)})};return o});
//# sourceMappingURL=sourcemaps/dock.js.map
