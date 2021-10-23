'use strict';
// подключение слайдера
const swiper = new Swiper('.swiper', {  
  autoplay: {
    delay: 2000,
  },
  loop:true, 
  breakpoints: {
    1110: {
      slidesPerView: 5,       
    },  
    640: {
      slidesPerView: 4,    
    },
    320: {
      slidesPerView: 3,    
    }
  }
});

// кнопка меню
const toggleMenu = () => {
  const menuBtn = document.querySelector('.menu-btn'),
    navList = document.querySelector('.nav__list');
  const openMenu = () => {  
    menuBtn.addEventListener('click', () => {
      navList.classList.add('nav__list-mobile');
    });
    };
  openMenu();
  const closeMenu = () => {
    document.addEventListener('click', e => {
      const target = e.target;
      if (!target.closest('.menu-btn') && !target.closest('.nav__list')) {
        navList.classList.remove('nav__list-mobile');
      } else return
    })
  }
  closeMenu();
};
toggleMenu();

// плавный скролл страницы при клике по якорям
const smoothScroll = () => {
  const anchors = document.querySelectorAll('.nav__link'),
    heroBtn = document.querySelectorAll('.hero__btn'),
    navList = document.querySelector('.nav__list');  

  const scrollEvent = (item) => {
    item.addEventListener('click', event => {
      event.preventDefault();
        const blockID = item.getAttribute('href').substr(1);
        document.getElementById(blockID).scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });        
      navList.classList.remove('nav__list-mobile');
    })
  };
  
  anchors.forEach(item => scrollEvent(item));
  heroBtn.forEach(item => scrollEvent(item));
  
};
smoothScroll();

// табы
const catalogTab = () => {
  const tabItem = document.querySelectorAll('.tab__item'),
    tabHeader = document.querySelector('.tab'),
    tabContent = document.querySelectorAll('.tab-content__item'),
    heroBtn = document.querySelectorAll('.hero__btn'); 
  const toggleTabContent = index => {
			for (let i = 0; i < tabContent.length; i++) {
				if (index === i) {
					tabItem[i].classList.add('tab__item--active');
					tabContent[i].classList.remove('d-none');
				} else {
					tabItem[i].classList.remove('tab__item--active');
					tabContent[i].classList.add('d-none');
				}
			}
		};

		// клики по табам
		tabHeader.addEventListener('click', event => {
			let target = event.target;
			target = target.closest('.tab__item');
			if (target) {
				tabItem.forEach((item, i) => {
					if (item === target) toggleTabContent(i);
				});
			}
		});
    
    // клики по кнопках в hero блоке 
    heroBtn.forEach((item,i) => {
      item.addEventListener('click', () => {
        toggleTabContent(i)
      }) ;
    })  
};
catalogTab();

// попап
const togglePopup = () => {
  const catalog = document.getElementById('catalog'),
    popup = document.querySelector('.popup');

  const openPopup = (src, title) => {
    const popupImg = popup.querySelector('img'),
      popupTitle = popup.querySelector('h3');
    popupTitle.textContent = title;
    popupImg.setAttribute('src', src);
    popup.classList.add('popup--active');
  };

  const closePopup = () => {
    const closeBtn = popup.querySelector('.form__close');
    closeBtn.addEventListener('click',(e)=> {
      e.preventDefault();
      popup.classList.remove('popup--active');
    })
  }
  closePopup();

  catalog.addEventListener('click', (e) => {
    let target = e.target;
    target = target.closest('.card__button');
    if(target) {
      const card = target.closest('.card'),
        imgSrc = card.querySelector('img').getAttribute('src'),
        title = card.querySelector('h3').textContent;
        openPopup(imgSrc, title);
    }
    
  })
};
togglePopup()