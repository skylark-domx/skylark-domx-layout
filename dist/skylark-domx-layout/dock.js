/**
 * skylark-domx-layout - The dom layout features enhancement for skylark utils.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.1
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx/langx","skylark-utils-dom/datax","skylark-utils-dom/finder","skylark-utils-dom/geom","./layouts","./DockStyle"],function(t,i,e,o,n,o,l){return n.dock=function(n,l){l=t.mixin({items:"[data-region]"},l);var r=o.clientSize(n),a={l:0,t:0,w:r.width,h:r.height},h=e.children(n,l.items);(h=h.filter(function(t){return"client"!=i.data(t,"region")}).concat(h.filter(function(t){return"client"==i.data(t,"region")}))).forEach(function(t){var e=i.data(t,"region"),n=o.size(t);if(!e)throw new Error("No dock setting for "+t.id);styler.css(elm,{position:"absolute"});var l={left:a.l,top:a.t};"top"==e||"bottom"==e?(l.width=a.w,a.h-=n.height,l.top=a.t+a.h):"left"==e||"right"==e?(l.height=a.h,a.w-=n.width,"left"==pos?a.l+=n.width:l.left=a.l+a.w):"client"==e&&(l.width=a.w,l.height=a.h),o.relativeRect(t,l)})}});
//# sourceMappingURL=sourcemaps/dock.js.map
