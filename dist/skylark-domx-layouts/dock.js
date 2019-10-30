/**
 * skylark-domx-layouts - The dom layout features enhancement for skylark utils.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.1
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx/langx","skylark-domx-data","skylark-domx-finder","skylark-domx-geom","./layouts","./DockStyle"],function(t,i,e,o,n,o,r){return n.dock=function(n,r){r=t.mixin({items:"[data-region]"},r);var l=o.clientSize(n),a={l:0,t:0,w:l.width,h:l.height},h=e.children(n,r.items);(h=h.filter(function(t){return"client"!=i.data(t,"region")}).concat(h.filter(function(t){return"client"==i.data(t,"region")}))).forEach(function(t){var e=i.data(t,"region"),n=o.size(t);if(!e)throw new Error("No dock setting for "+t.id);styler.css(elm,{position:"absolute"});var r={left:a.l,top:a.t};"top"==e||"bottom"==e?(r.width=a.w,a.h-=n.height,r.top=a.t+a.h):"left"==e||"right"==e?(r.height=a.h,a.w-=n.width,"left"==pos?a.l+=n.width:r.left=a.l+a.w):"client"==e&&(r.width=a.w,r.height=a.h),o.relativeRect(t,r)})}});
//# sourceMappingURL=sourcemaps/dock.js.map
