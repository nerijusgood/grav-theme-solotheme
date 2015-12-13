// 'use strict'
import $ from 'dominus';

export default class search {
	constructor() {
		const input = $('.form-search-input');
		const submit = $('.form-search-submit');

		for (var i = 0; i < input.length; i++) {
			input[i].addEventListener('keypress', this.searchInput.bind(this), false);
		}
	}

	// @TODO not working target selector for input! :(
	searchInput(e) {
		var target = e.target;
		if (e.which == 13 && target.value.length > 1) {
			var query = $(target).value();
			e.preventDefault;
			window.location.href = $(target).attr('data-search-input') + ':' + query;
		}
	}
}
