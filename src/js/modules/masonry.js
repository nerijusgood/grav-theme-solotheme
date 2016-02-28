import Bricks from 'bricks.js';

export default class masonry {
  constructor () {
    // define your grid at different breakpoints, mobile first (smallest to largest)
    const sizes = [
      { columns: 1, gutter: 20 },
      { mq: '480px', columns: 1, gutter: 20 },
      { mq: '568px', columns: 2, gutter: 15 },
      { mq: '660px', columns: 2, gutter: 20 },
      { mq: '768px', columns: 2, gutter: 20 },
      { mq: '1280px', columns: 3, gutter: 20 }
    ];

    // create an instance
    const instance = Bricks({
      container: '.js-masonry',
      packed: 'data-packed',        // if not prefixed with 'data-', it will be added
      sizes: sizes
    });

    // bind callbacks
    instance
      .on('pack', () => console.log('ALL grid items packed.'))
      .on('update', () => console.log('NEW grid items packed.'))
      .on('resize', (size) => console.log('The grid has be re-packed to accommodate a new BREAKPOINT.'));

    // start it up, when the DOM is ready
    // note that if images are in the grid, you may need to wait for document.readyState === 'complete'

    document.addEventListener('DOMContentLoaded', (event) => {
      instance
        .resize()     // bind resize handler
        .pack();       // pack initial items
    });
  }
}
