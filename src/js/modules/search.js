// 'use strict'
import dominus from 'dominus';

export default class search {
	constructor() {
		const input = document.getElementsByClassName('form-search-input');

		for (var i = 0; i < input.length; i++) {
			input[i].addEventListener('keypress', this.searchInput.bind(this), false);
		}
	}

	// @TODO not working target selector for input! :(
	searchInput(e) {
		var target = e.target;
		if (e.which == 13 && target.value > 3) {
			e.preventDefault;
			window.location.href = target.data('search-input') + '{{ config.system.param_sep }}' + target.value;
		}
	}
}
