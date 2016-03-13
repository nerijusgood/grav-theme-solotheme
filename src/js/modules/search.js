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

  // on 'enter' and if value more than > 1 search
  handleInput (e) {
    const target = e.target;
    const query = target.value;
    if (e.which === 13 && query.length > 1) {
      e.preventDefault;
      window.location.href = target.getAttribute('data-search-input') + ':' + query;
    }
  }

  // butotn click value more than > 1 search
  handleSubmit (e) {
    const target = e.target;
    const query = target.previousElementSibling.value;
    if (query.length > 1) {
      window.location.href = target.previousElementSibling.getAttribute('data-search-input') + ':' + query;
    }
  }
}
