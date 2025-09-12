function r(e,n=500){var t=null;return function(){clearTimeout(t);var u=arguments,a=this;t=setTimeout(function(){e.apply(a,u)},n)}}export{r as d};
