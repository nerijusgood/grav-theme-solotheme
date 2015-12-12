// 'use strict'
import Pjax from 'pjax';

export default class pjax {
	constructor() {
		console.log(Pjax.isSupported());

		Pjax({
			elements: ".main"
		});
	}
}
