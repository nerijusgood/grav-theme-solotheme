// 'use strict'
import Search from './modules/search';
import Prism from './modules/highlight';
import Pjax from 'pjax';
// import Pjax from './modules/pjax';

console.log(Pjax.isSupported());
new Pjax({
    selectors: ".main",
    debig
});
Pjax.prototype.log (function());

(function() {
	new Search(document.getElementsByClassName('form-search'));
	new Prism();
}());
