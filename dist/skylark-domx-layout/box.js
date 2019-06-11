/**
 * skylark-domx-layout - The dom layout features enhancement for skylark utils.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.1
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx/langx","skylark-utils-dom/query","./layouts","./Orientation"],function(i,n,t,a){return t.box=function(t,e){e=i.mixin({items:".item",wspacing:100,hspacing:100,orientation:a.vert},e);var s=n(t).clientSize(),c=s.width,o=s.height,l=0,r=0;n(t).children(e.items).each(function(i){n(this).css({left:l,top:r,position:"absolute",display:"inline-block"}),e.orientation==a.vert?(r+=e.hspacing)>=o-e.hspacing&&(r=0,l+=e.wspacing):(l+=e.wspacing)>=c-e.wspacing&&(l=0,r+=e.hspacing)})}});
//# sourceMappingURL=sourcemaps/box.js.map
