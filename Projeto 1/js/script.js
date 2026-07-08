const searchInput = document.querySelector('#search-input');
const searchButton = document.querySelector('#search-button');
const searchResult = document.querySelector('#search-result');

if (searchInput && searchButton && searchResult) {
  const showSearchResult = () => {
    const searchTerm = searchInput.value.trim();

    if (!searchTerm) {
      searchResult.textContent = '';
      return;
    }

    searchResult.textContent = `Voc\u00ea buscou por: '${searchTerm}'`;
  };

  searchButton.addEventListener('click', showSearchResult);

  searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      showSearchResult();
    }
  });
}


const isMobileViewport = () => window.matchMedia('(max-width: 767px)').matches;

const syncProductPagination = (swiper, section) => {
  const bullets = Array.from(section.querySelectorAll('.swiper-pagination-bullet'));

  if (!bullets.length) {
    return;
  }

  if (!isMobileViewport()) {
    bullets.forEach((bullet) => {
      bullet.style.display = '';
      bullet.removeAttribute('aria-hidden');
    });
    return;
  }

  const activeIndex = ((swiper.realIndex % 3) + 3) % 3;

  bullets.forEach((bullet, index) => {
    const isVisible = index < 3;
    const isActive = isVisible && index === activeIndex;

    bullet.style.display = isVisible ? '' : 'none';
    bullet.classList.toggle('swiper-pagination-bullet-active', isActive);
    bullet.setAttribute('aria-current', String(isActive));
    bullet.setAttribute('aria-hidden', String(!isVisible));
  });
};

const syncProductPaginationAfterSwiper = (swiper, section) => {
  requestAnimationFrame(() => {
    syncProductPagination(swiper, section);
  });
};

document.querySelectorAll('.products').forEach((section) => {
  const swiperElement = section.querySelector('.products-swiper');

  if (!swiperElement) {
    return;
  }

  const productSwiper = new Swiper(swiperElement, {
    slidesPerView: 'auto',
    slidesPerGroup: 1,
    spaceBetween: 9.38,
    loop: true,
    breakpoints: {
      768: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 17,
      },
      1024: {
        slidesPerView: 5,
        slidesPerGroup: 5,
        spaceBetween: 17,
      },
    },

    navigation: {
      nextEl: section.querySelector('.swiper-button-next'),
      prevEl: section.querySelector('.swiper-button-prev'),
    },

    pagination: {
      el: section.querySelector('.swiper-pagination'),
      clickable: true,
    },
  });

  const syncCurrentProductPagination = () => {
    syncProductPaginationAfterSwiper(productSwiper, section);
  };

  syncCurrentProductPagination();
  productSwiper.on('init', syncCurrentProductPagination);
  productSwiper.on('slideChange', syncCurrentProductPagination);
  productSwiper.on('realIndexChange', syncCurrentProductPagination);
  productSwiper.on('transitionEnd', syncCurrentProductPagination);
  productSwiper.on('paginationUpdate', syncCurrentProductPagination);
  window.addEventListener('resize', syncCurrentProductPagination);
});
const heroTrack = document.querySelector('.hero-track');
const heroDots = document.querySelectorAll('.hero-dots span');

if (heroTrack && heroDots.length) {
  const updateHeroDots = () => {
    const activeIndex = Math.round(heroTrack.scrollLeft / heroTrack.clientWidth);

    heroDots.forEach((dot, index) => {
      dot.classList.toggle('hero-dots--active', index === activeIndex);
    });
  };

  heroTrack.addEventListener('scroll', updateHeroDots, { passive: true });

  heroDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      heroTrack.scrollTo({
        left: heroTrack.clientWidth * index,
        behavior: 'smooth',
      });
    });
  });
}
const syncMobileProductArrows = () => {
  const isMobile = window.matchMedia('(max-width: 767px)').matches;

  document.querySelectorAll('.swiper-button-prev, .swiper-button-next').forEach((button) => {
    button.hidden = isMobile;
    button.setAttribute('aria-hidden', String(isMobile));
  });
};

syncMobileProductArrows();
window.addEventListener('resize', syncMobileProductArrows);
const footerColumns = Array.from(document.querySelectorAll('.footer--column'));

if (footerColumns.length) {
  const setFooterColumnState = (column, isOpen) => {
    const trigger = column.querySelector('h5');

    column.classList.toggle('footer--column--open', isOpen);

    if (trigger) {
      trigger.setAttribute('aria-expanded', String(isOpen));
    }
  };

  const closeFooterColumns = () => {
    footerColumns.forEach((column) => setFooterColumnState(column, false));
  };

  const syncFooterAccordion = () => {
    if (!isMobileViewport()) {
      closeFooterColumns();
    }
  };

  footerColumns.forEach((column) => {
    const trigger = column.querySelector('h5');

    if (!trigger) {
      return;
    }

    const toggleColumn = () => {
      if (!isMobileViewport()) {
        return;
      }

      const shouldOpen = !column.classList.contains('footer--column--open');
      closeFooterColumns();
      setFooterColumnState(column, shouldOpen);
    };

    trigger.addEventListener('click', toggleColumn);
    trigger.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        toggleColumn();
      }
    });
  });

  syncFooterAccordion();
  window.addEventListener('resize', syncFooterAccordion);
}