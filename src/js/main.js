// 'use strict'
import Search from './modules/search';
import Prism from './modules/highlight';

(function() {
	const search = new Search(document.getElementsByClassName('form-search'));
	const prism = new Prism();
}());
