(() => {
      // Автоопределение города
  const CITY_API_TOKEN = "2f643bee1f4657";
  const CITY_API_URL = `https://ipinfo.io/json?token=${CITY_API_TOKEN}`;

  function setCity(cityName) {
    const cityArea = document.querySelector(".city-area");
    const modalCity = document.querySelector(".modal-city");

    if (cityArea) {
      cityArea.innerHTML = `Ваш город: <strong>${cityName}</strong>`;
    }
    if (modalCity) {
      modalCity.innerHTML = `Ваш город: <strong>${cityName}</strong>`;
    }

    window.__USER_CITY__ = cityName;
  }

  async function detectCity() {
    try {
      const res = await fetch(CITY_API_URL);
      const data = await res.json();
      const city = data?.city || 'не определён';

      const translated = await fetch(`https://nominatim.openstreetmap.org/search?city=${encodeURIComponent(city)}&format=json&accept-language=ru`);
      const results = await translated.json();

      let translatedCity = city;
      if (Array.isArray(results) && results.length > 0) {
        const displayName = results[0].display_name;
        if (displayName) {
          translatedCity = displayName.split(',')[0];
        }
      }

      setCity(translatedCity);
    } catch (err) {
      console.error("Ошибка при определении города:", err);
      setCity("не определён");
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    if (!window.__USER_CITY__) {
      detectCity();
    } else {
      setCity(window.__USER_CITY__);
    }

    // При открытии модалки обновляем
    document.addEventListener("click", (e) => {
      if (e.target.closest("#openCatalogModal")) {
        setTimeout(() => {
          setCity(window.__USER_CITY__ || "не определён");
        }, 300);
      }
    });

    // === CSRF токен ===
    if (window.jQuery) {
      $.ajaxSetup({
        headers: {
          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
      });

      // === Инициализация слайдера ===
      $(".slider-range").each(function () {
        const $slider = $(this);
        const minRange = $($slider.data("minrange"));
        const maxRange = $($slider.data("maxrange"));

        $slider.slider({
          range: true,
          min: 0,
          max: 500,
          values: [75, 300],
          slide: (event, ui) => {
            maxRange.val(ui.values[1]);
            minRange.val(ui.values[0]);
          },
          create: function () {
            maxRange.on('change', function () {
              $slider.slider('values', 1, $(this).val());
            }).val(300);

            minRange.on('change', function () {
              $slider.slider('values', 0, $(this).val());
            }).val(75);
          }
        });
      });

      // === Пагинация ===
      $(document).on('click', '.nextPager', function (e) {
        e.preventDefault();
        loadNext($(this), $(this).data('rel'));
      });

      // === Автоподгрузка ===
      $(window).on('scroll resize', function () {
        if (typeof isLoading !== 'undefined' && isLoading) return;
        const scrollTop = 3200;
        const startLoad = $(document).height() - $(window).scrollTop();

        if ($('.nextPager').length && scrollTop > startLoad) {
          loadNext($('.nextPager'), $('.nextPager').data('rel'));
        }
      });
    }

    // === Поиск ===
    document.addEventListener("DOMContentLoaded", () => {
      const form = document.getElementById("search-form");
      const input = document.getElementById("search-input");
    
      if (form && input) {
        form.addEventListener("submit", (e) => {
          const query = input.value.trim();
          if (!query) {
            e.preventDefault(); 
            input.focus();
          } else {
            input.value = query; 
          }
        });
    
        input.addEventListener("keydown", (e) => {
          if (e.key === "Enter") {
            form.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }));
          }
        });
      }
    });
    
  });
  
})();
