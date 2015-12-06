// 'use strict'

export default class search {
	constructor() {
		const input = document.getElementsByClassName('form-search-input');

		for (var i = 0; i < input.length; i++) {
			input[i].addEventListener('keypress', this.searchInput.bind(this), false);
		}
	}

	searchInput(e) {
		var target = e.target;
		if (e.which == 13 && target.value > 3) {
			console.log(target.value);
		}
	}
}
