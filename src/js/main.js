'use strict';
import Search from './modules/search';
import Prism from './modules/highlight';
import Pjax from 'pjax';
// import Pjax from './modules/pjax';

(function() {
	new Search(document.getElementsByClassName('form-search'));
	new Prism();
}());


// Pjax
// (function (document, window) {
//     // Define globals.
//     var initialized = false;
//     var wrapperEl;
//     var loaderEl;
//
//     var onDOMReady = function () {
//     // Cache elements.
//         wrapperEl = document.getElementById('js-wrapper');
//         loaderEl = document.getElementById('js-loader');
//     };
//
//     var onPageSend = function () {
//        loaderEl.classList.remove('is-loaded');
//        wrapperEl.classList.add('is-loading');
//     };
//
//     var onPageReady = function () {
//
//         if (loaderEl) {
//             loaderEl.classList.add('is-loaded');
//         }
//         if (wrapperEl) {
//             wrapperEl.classList.add('is-loaded');
//         }
//         setTimeout(function () {
//             wrapperEl.className = '';
//         }, 500);
//     };
//
//     var init = function () {
//         if (initialized) {
//           return;
//         }
//
//         onDOMReady();
//
//         // Init pjax.
//         new Pjax({
//           selectors: ['.main']
//         });
//
//         document.addEventListener('pjax:send', onPageSend, false);
//         document.addEventListener('pjax:success', onPageReady, false);
//
//         onPageReady();
//
//         initialized = true;
//     };
//
//     var checkState = function () {
//         var state = document.readyState;
//         if (state === 'interactive' || state === 'complete' || state === 'loaded') {
//             init();
//         }
//     };
//
//     document.onreadystatechange = checkState;
//     checkState();
//
// })(document, window);
