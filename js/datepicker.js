//
// DATEPICKER OVERLAY PROTOTYPE
// ============================
//
// Datepickers suck. This is my attempt to make something better.
//
// This demo the result of a weekend of experimentation. The concept is fun
// but some user testing is needed to see whether this could be a viable,
// useful datepicker component.
//
// Todo List
// ---------
//  - Responsive styling (currently fixed to 1200px wide)
//  - Validation should check if dates are possible - Feb 31st
//  - add buttons for 'today', 'tomorrow' etc
//  - add day of the week (thurs etc)
//  - maybe add an 'on this day' easter egg
//  - make overlay work (finish JS loading work before reveal)
//
function datepicker(){function n(n,u){u=r(n,u);u=u.toString();u=i(n,u);e[n].value=u;s(n,u);o(n,u);var a=new Date(e.month.value+"/"+e.day.value+"/"+e.year.value);if(!isNaN(a)){a=t[a.getDay()];$(".datepicker-weekday").text(""+a+"")}}function r(t,n){var r=e[t].min,i=e[t].max;n=parseInt(n,10)||n==="0"||n==="00"?parseInt(n,10):n;typeof n!="number"&&(n=e[t].value);if(n>=r&&n<=i)return n;if(n<r)return r;if(n>i)return i}function i(t,n){var r=e[t].length;return n.length<r?i(t,"0"+n):n}function s(t){var n=e[t].value;$(".datepicker-form-"+t).attr("value",n)}function o(t){var n=$(".datepicker-unit-list[data-unit="+t+"]"),r=e[t].value;n.find(".active").removeClass("active");n.find('[data-value="'+r+'"]').addClass("active")}function u(e){var t=e&&e!==""?new Date(e):new Date;n("day",t.getDate());n("month",t.getMonth()+1);n("year",t.getFullYear());n("hour",t.getHours());n("minute",t.getMinutes());$(".datepicker-form-day").select()}function a(){var t="Your chosen date is ";t+=e.day.value+"/";t+=e.month.value+"/";t+=e.year.value+" - ";t+=e.hour.value+":";t+=e.minute.value;return t}var e={day:{value:"",min:1,max:31,length:2},month:{value:"",min:1,max:12,length:2},year:{value:"",min:1900,max:2100,length:4},hour:{value:"",min:0,max:23,length:2},minute:{value:"",min:0,max:59,length:2}},t=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];u();$(".datepicker-row li a").on("click",function(e){e.preventDefault();var t=$(this).closest("ul").data("unit"),r=$(this).data("value");n(t,r)});$('.datepicker-form-row input[class*="datepicker-form-"]').on("blur",function(){var e=$(this).data("unit"),t=$(this).attr("value");n(e,t)});$(".datepicker-presets a").on("click",function(){function n(e){var t=new Date,n=new Date(t.getFullYear(),t.getMonth(),t.getDate()+e,t.getHours(),t.getMinutes());return n}var e=$(this).data("preset-date"),t=new Date(e);if(t.getFullYear()>0)u(e);else{e.toLowerCase()==="today"&&u();if(e.match(/(.* days)/i)){e=parseInt(e,10);u(n(e))}}});$('input[type="button"]').on("click",function(){if((e.month.value==="04"||e.month.value==="06"||e.month.value==="09"||e.month.value==="11")&&e.day.value==="31"){alert("Your chosen month doesn't have 31 days!");return!1}console.log(e.month.value);if(e.month.value==="02"){var t=e.year.value%4===0&&(e.year.value%100!==0||e.year.value%400===0);if(e.day.value>"29"||e.day.value==="29"&&!t){alert("February "+e.year.value+" doesn't have "+e.day.value+" days!");return!1}}alert(a())})}(function(){datepicker()})();