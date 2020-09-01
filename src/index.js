import './styles/main.scss';

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
      el.innerHTML = +el.innerHTML + (el.classList.contains('active') ? 1 : -1);
      unactive(el.nextSibling);
    }
  },
  {
    selector: '[id^=dislike-]',
    callback: el => {
      el.innerHTML = +el.innerHTML + (el.classList.contains('active') ? 1 : -1);
      unactive(el.previousSibling);
    }
  },
  {
    selector: '[id^=close-]',
    class: 'deleted',
    callback(el) {
      el.closest('.card').classList.add(this.class);
    }
  },
  {
    selector: '#menu_mobile',
    callback: () => {
      document.body.classList.toggle("fixed-position");
    }
  }
];

function unactive(elem) {
  if (elem.classList.contains('active')) {
    elem.innerHTML = +elem.innerHTML - 1;
    elem.classList.remove('active');
  }
}

onClickItems.forEach(function(item) {
  document.querySelectorAll(item.selector).forEach(el => {
    el.addEventListener('click', function(e) {
      e.preventDefault();

      this.classList.toggle(item.class || 'active');
      if (item.callback) item.callback(this);
    })
  })
});