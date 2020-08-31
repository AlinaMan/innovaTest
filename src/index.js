import './styles/main.scss';

import * as $ from 'jquery';

const onClickItems = [
  {
    selector: '.left-menu span',
    class: 'open'
  },
  {
    selector: '[id^=favorites-]',
  },
  {
    selector: '[id^=like-]',
    callback: el => {
      el.text(+el.text() + (el.hasClass('active') ? 1 : -1));
      unactive(el.next());
    }
  },
  {
    selector: '[id^=dislike-]',
    callback: el => {
      el.text(+el.text() + (el.hasClass('active') ? 1 : -1));
      unactive(el.prev());
    }
  },
  {
    selector: '[id^=close-]',
    class: 'deleted',
    callback(el) {
      el.parents('a.card').addClass(this.class);
    }
  },
  {
    selector: '#menu_mobile',
    callback: () => {
      $('body').toggleClass("fixed-position");
    }
  }
];

function unactive(elem) {
  if (elem.hasClass('active')) {
    elem.text(+elem.text() - 1);
    elem.removeClass('active');
  }
}

onClickItems.forEach(function(item) {
  $(item.selector).on('click', function(e) {
    e.preventDefault();

    const el = $(this);
    el.toggleClass(item.class || 'active');
    if (item.callback) item.callback(el);
  });
});