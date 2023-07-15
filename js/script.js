const cityOpen = document.querySelector('.js-city-open');
const city = document.querySelector('.city');

cityOpen.addEventListener('click', () => {
  city.classList.add('city_open')
});

city.addEventListener('click', (e) => {
  e.preventDefault();
  const target = e.target.closest('.city__choice');
  if (target) {
    cityOpen.textContent = target.textContent;
    city.classList.remove('city_open');
  }
});


$('.header__burger').on('click', function () {
  $('.navigation').animate({
    left: 0,
  }, 500, function () {
    $('.navigation__close').animate({
      opacity: 1,
    }, 300);
  });
});


$('.navigation__close').on('click', function () {
  $('.navigation__close').animate({
    opacity: 0,
  }, 300, function () {
    $('.navigation').animate({
      left: '-400px',
    }, 500);
  });
});


$('.present__btn').on('click', function () {
  $('.modal-order').show(300);
})

$('.modal-order__close').on('click', function () {
  $('.modal-order').hide(300);
})


$('.header__sign, .header__sign2').click(() => {
  $('.alert').attr("role", "alert");

  $('.alert').addClass('visible');
  setTimeout(() => {
    $('.alert').removeClass('visible');

    $('.alert').removeAttr("role", "alert");

  }, 3000)
})


const characteristicsListElem = document.querySelector('.characteristics__list');
const characteristicsItemElems = document.querySelectorAll('.characteristics__item');

characteristicsItemElems.forEach(elem => {
  if (elem.children[1].classList.contains('active')) {
    elem.children[1].style.height = `${elem.children[1].scrollHeight}px`;
  }
})

const open = (button, dropDown) => {
  closeAllDrops(button, dropDown);
  button.ariaExpanded = true;

  dropDown.style.height = `${dropDown.scrollHeight}px`;
  button.classList.add('active');
  dropDown.classList.add('active');
};

const close = (button, dropDown) => {
  button.ariaExpanded = false;
  button.classList.remove('active');
  dropDown.classList.remove('active');
  dropDown.style.height = '';
};

const closeAllDrops = (button, dropDown) => {
  characteristicsItemElems.forEach((elem) => {
    if (elem.children[0] !== button && elem.children[1] !== dropDown) {

      close(elem.children[0], elem.children[1]);
    }
  })
}

characteristicsListElem.addEventListener('click', (event) => {
  const target = event.target;
  if (target.classList.contains('characteristics__title')) {
    const parent = target.closest('.characteristics__item');
    const description = parent.querySelector('.characteristics__description');
    if (description.classList.contains('active')) {
      close(target, description);
    } else {
      open(target, description);
    }
  }
});
// Cookies
const cookieAlert = document.querySelector('.alert-cookie'); 
const cookieButton = document.querySelector('.alert-cookie__button');
cookieButton.addEventListener('click', () => {
  cookieAlert.classList.remove('alert-cookie_no-ready');
  Cookies.set('dom-ready-cookie', 'true', { expires: 30 });
});
if (!Cookies.get('dom-ready-cookie')) {
  setTimeout(() => {
    cookieAlert.classList.add('alert-cookie_no-ready');
  }, 2000);
};

const modalOrderTitle = document.querySelector('.modal-order__title');
const inputTel = document.querySelector('.modal-order__input_tel');
const telMask = new Inputmask('+7 (999) 999-99-99'); //static mask
telMask.mask(inputTel);
const justValidate = new JustValidate('.modal-order__form'); //validation
justValidate
.addField('.modal-order__input_name', [
  {
    rule: 'required',
    errorMessage: 'Укажите ваше имя',
  },
  {
    rule: 'minLength',
    value: 3,
    errorMessage: 'Имя должно быть больше 3 символов',
  },
  {
    rule: 'maxLength',  
    value: 30,
    errorMessage: 'Имя должно быть меньше 30 символов',
  },
])
.addField('.modal-order__input_email', [
  {
    rule: 'required',
    errorMessage: 'Укажите ваш email',
  },
  {
    rule: 'email',
    errorMessage: 'email не корректный',
  }
])
.addField('.modal-order__input_tel', [
  {
    rule: 'required',
    errorMessage: 'Укажите ваш номер телефона',
  },
  {
    validator(value) {
      const phone = inputTel.inputmask.unmaskedvalue();
      // console.log(phone);
      return !!(Number(phone) && phone.length === 10); //=> boolean
    },
    errorMessage: 'Телефон некорректный',
  }
])
.onSuccess((event) => {
  const target = event.target;
  axios.post('https://jsonplaceholder.typicode.com/posts', {
  name: target.name.value,
  tel: inputTel.inputmask.unmaskedvalue(),
  email: target.email.value,
})
.then(response => {
  target.reset();
  console.log(response);
  modalOrderTitle.textContent = `Спасибо ваша заявка принята ${response.data.id}`;
  })
  .catch(error => {
    console.log(error);
    modalOrderTitle.textContent = `Что-то пошло не так ${error.response.data.id}`;
  });
});

// slider swiper
new Swiper('.swiper', {
  slidesPerView: 4,
  spaceBetween: 30,
  loop: true,
  autoplay: {
    delay: 3000,
  },

  pagination: {
    el: '.swiper-pagination',
  },

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
 mousewheel: true,
 keyboard: true,
});
// 
// jQuery UI Accordion
$('.acc__list').accordion(
  {
    active: true,
    collapsible: true,
    heightStyle: 'content',
    icons: {
      header: 'acc__accord',
      activeHeader: 'acc__accord acc__accord-active',
    }
  }
);
// Yandex map
// Leaflet map
