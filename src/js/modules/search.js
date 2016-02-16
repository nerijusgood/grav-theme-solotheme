import { forEach } from '../utils';

export default class search {
  constructor () {
    const input = document.querySelectorAll('.Form-search-input');
    const submit = document.querySelectorAll('.Form-search-submit');

    // Watch every letter type
    if (input.length) {
      forEach(input, (i, el) => {
        el.addEventListener('keypress', this.handleInput.bind(this), false);
      });
    }

    // Submit button click event
    if (submit.length) {
      forEach(submit, (i, el) => {
        el.addEventListener('click', this.handleSubmit.bind(this), false);
      });
    }
  }

  handleInput (e) {
    const target = e.target;
    if (e.which === 13 && target.value.length > 1) {
      const query = target.value;
      e.preventDefault;
      window.location.href = target.getAttribute('data-search-input') + ':' + query;
    }
  }

  // TODO: Submit search finish
  handleSubmit (e) {
    const target = e.target;
    console.log(target);
  }
}
