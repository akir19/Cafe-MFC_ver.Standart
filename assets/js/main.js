document.addEventListener('DOMContentLoaded', () => {

    // ГЛОБАЛЬНАЯ ЗАГЛУШКА: Определяем getTranslation, если lang.js еще не загружен.
    // Это обеспечивает работу main.js, пока lang.js не переопределит эту функцию.
    const getTranslation = (key, defaultValue) => {
        if (typeof window.getTranslation === 'function') {
            return window.getTranslation(key, defaultValue);
        }
        return defaultValue;
    };


    // ====================================
    // 1. Управление OVERLAY MENU
    // ====================================
    const overlayMenu = document.getElementById('overlayMenu');
    const burgerBtn = document.getElementById('burgerBtn');
    const backBtn = document.getElementById('backBtn');

    // Функция сброса подменю, чтобы избежать конфликта фокуса при старте
    const resetSubmenus = () => {
        document.querySelectorAll('.has-submenu.active').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelectorAll('.submenu-list').forEach(list => {
            // Убеждаемся, что высота обнулена
            list.style.height = '0';
        });
    };

    const closeOverlay = () => {
        if (overlayMenu) {
            overlayMenu.classList.remove('show');
            // КРИТИЧЕСКИЙ ШАГ: Устанавливаем aria-hidden=true при закрытии
            overlayMenu.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = 'auto';
            resetSubmenus(); // Сбрасываем подменю, если оно было открыто
        }
    };

    // Принудительно закрываем оверлей и ставим aria-hidden="true" при загрузке
    if (overlayMenu) {
        overlayMenu.classList.remove('show');
        overlayMenu.setAttribute('aria-hidden', 'true');
        resetSubmenus(); // Сбрасываем подменю, если оно было открыто
    }


    if (burgerBtn && overlayMenu) {
        burgerBtn.addEventListener('click', () => {
            overlayMenu.classList.add('show');
            // КРИТИЧЕСКИЙ ШАГ: Удаляем aria-hidden при открытии
            overlayMenu.removeAttribute('aria-hidden');
            document.body.style.overflow = 'hidden';
        });
    }

    if (backBtn) {
        backBtn.addEventListener('click', closeOverlay);
    }


    // ====================================
    // 2. Скроллинг к секциям (включая кнопки из Бургера и Back to Top)
    // ====================================
    // data-scroll для всех элементов, которые должны скроллить
    const scrollElements = document.querySelectorAll('[data-scroll]');
    
    // 🚀 НОВАЯ ПЕРЕМЕННАЯ: Кнопка "Показать все блюда" в секции популярного
    const showAllBtn = document.getElementById('showAllBtn');

    const scrollToSection = (e) => {
        // Если это кнопка с подменю, не скроллим
        if (e.currentTarget.classList.contains('has-submenu')) {
            return;
        }

        const targetId = e.currentTarget.getAttribute('data-scroll') || e.currentTarget.getAttribute('data-section');
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            // ФИКС: Закрываем оверлей, если клик произошел внутри него
            const isInsideOverlay = e.currentTarget.closest('.overlay');

            if (isInsideOverlay && overlayMenu && overlayMenu.classList.contains('show')) {
                closeOverlay();
                // Задержка для плавного закрытия (300мс = длительность CSS-перехода)
                setTimeout(() => {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }, 300);
            } else {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    // Объединяем обработчики для всех элементов скролла (включая Back to Top)
    scrollElements.forEach(element => {
        element.addEventListener('click', scrollToSection);
    });
    
    // 🚀 НОВОЕ ИЗМЕНЕНИЕ: Обработчик для кнопки "Показать все блюда"
    if (showAllBtn) {
        showAllBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const targetElement = document.getElementById('gallery');
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }


    // ====================================
    // 3. LOGIC FOR SUBMENU (Логика подменю)
    // ====================================
    const menuContainers = document.querySelectorAll('.hero-submenu-wrapper, .overlay-submenu-wrapper');

    menuContainers.forEach(container => {
        const toggleButton = container.querySelector('.has-submenu');
        const submenuList = container.querySelector('.submenu-list');

        if (toggleButton && submenuList) {
            toggleButton.addEventListener('click', (e) => {
                e.preventDefault();
                
                const currentlyActive = toggleButton.classList.contains('active');
                
                // Сбрасываем ВСЕ другие активные подменю
                menuContainers.forEach(otherContainer => {
                    const otherBtn = otherContainer.querySelector('.has-submenu');
                    const otherList = otherContainer.querySelector('.submenu-list');
                    if (otherBtn && otherList && otherBtn !== toggleButton) {
                        otherBtn.classList.remove('active');
                        otherList.style.height = '0';
                    }
                });
                
                // Открываем/закрываем текущее подменю
                if (!currentlyActive) {
                    toggleButton.classList.add('active');
                    // Используем requestAnimationFrame для гарантии получения scrollHeight
                    requestAnimationFrame(() => {
                        submenuList.style.height = submenuList.scrollHeight + 'px';
                    });
                } else {
                    toggleButton.classList.remove('active');
                    submenuList.style.height = '0';
                }
            });
        }
    });


    // ====================================
    // 4. MEMO (Отправка сообщения через WhatsApp)
    // ====================================
    const memoField = document.getElementById('memoField');
    const memoSend = document.getElementById('memoSend');
    const memoCancel = document.getElementById('memoCancel');

    // Номер WhatsApp для отправки (Грузия)
    const whatsappNumber = "+995558725917";

    if (memoSend && memoField) {
        memoSend.addEventListener('click', () => {
            const message = memoField.value.trim();
            if (message) {
                // Получаем перевод для начального текста сообщения в WhatsApp
                const whatsappPrefix = getTranslation('whatsapp_prefix', 'Message from website:');
                
                // Создаем URL для WhatsApp
                const encodedMessage = encodeURIComponent(`${whatsappPrefix}\n${message}`);
                const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
                
                // Открываем WhatsApp в новом окне/вкладке
                window.open(whatsappUrl, '_blank');
                
                // Очищаем поле после отправки (или предполагаемой отправки)
                memoField.value = '';
                
                // Уведомление, что пользователь перенаправлен
                alert(getTranslation('memo_redirect_whatsapp', 'You will be redirected to WhatsApp to send the message.'));

            } else {
                // Используем ключ memo_placeholder для сообщения о необходимости ввода текста
                alert(getTranslation('memo_placeholder_alert', 'Please enter a message.'));
            }
        });
    }

    if (memoCancel && memoField) {
        memoCancel.addEventListener('click', () => {
            memoField.value = '';
            alert(getTranslation('memo_cancel_alert', 'Message cancelled.'));
        });
    }

    // ===========================================
    // 5. УПРАВЛЕНИЕ РЕЖИМОМ ОТОБРАЖЕНИЯ ГАЛЕРЕИ 🖼️
    // ===========================================
    const gallerySection = document.getElementById('gallery');
    const viewToggleButtons = document.querySelectorAll('.view-toggle-btn');
    const galleryStorageKey = 'galleryViewMode';

    // Функция для установки режима отображения
    const setGalleryViewMode = (mode) => {
        // Удаляем все классы режимов
        gallerySection.classList.remove('grid-3', 'grid-2', 'list-1');

        // Добавляем класс текущего режима
        if (mode && mode !== 'grid-3') {
            gallerySection.classList.add(mode);
        }

        // Обновляем состояние активной кнопки в хедере
        viewToggleButtons.forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-view') === mode);
        });

        // Сохраняем в localStorage
        localStorage.setItem(galleryStorageKey, mode);
    };

    // 5.1. Инициализация: Загрузка режима из localStorage (по умолчанию 'grid-3')
    let savedViewMode = localStorage.getItem(galleryStorageKey) || 'grid-3';
    // Добавляем класс .gallery-section для работы CSS
    gallerySection.classList.add('gallery-section'); 
    setGalleryViewMode(savedViewMode);

    // 5.2. Обработчики кликов по кнопкам переключения
    viewToggleButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const newMode = btn.getAttribute('data-view');
            setGalleryViewMode(newMode);
        });
    });

    // ====================================
    // 5. Управление Темой (Dark/Light Mode)
    // ====================================
    const themeToggle = document.getElementById('themeToggle'); // Кнопка переключения темы в оверлее

    /**
     * Обновляет класс 'theme' на <html> и сохраняет выбор в localStorage.
     * @param {string} theme - 'light' или 'dark'.
     */
    const setTheme = (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
        // Также используем класс для CSS-селекторов
        document.documentElement.className = theme === 'dark' ? 'dark-theme' : 'light-theme';
        localStorage.setItem('theme', theme);
        window.currentTheme = theme;
        // Обновляем текст кнопки
        // 🚀 КОРРЕКЦИЯ ДЛЯ ПЕРЕВОДА: Вызываем функцию обновления текста кнопки темы
        window.updateThemeButtonText();
    };

    /**
     * Обновляет текст на кнопке переключения темы в зависимости от текущей темы.
     * Доступна глобально для вызова из lang.js.
     */
    window.updateThemeButtonText = () => {
        if (!themeToggle) return;
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        
        // Получаем перевод для следующей темы
        const nextThemeKey = isDark ? 'theme_light' : 'theme_dark';
        const nextThemeDefault = isDark ? 'Light Theme' : 'Dark Theme';
        const newText = getTranslation(nextThemeKey, nextThemeDefault);

        themeToggle.innerHTML = `${newText}`;
    };

    /**
     * Переключает тему (Dark <-> Light).
     */
    const switchTheme = () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    };

    // НАЧАЛЬНАЯ ЗАГРУЗКА ТЕМЫ
    let initialTheme = localStorage.getItem('theme');
    
    // 🔴 КЛЮЧЕВОЕ ИЗМЕНЕНИЕ: Устанавливаем 'dark' по умолчанию
    if (!initialTheme) {
        initialTheme = 'dark'; // <-- Теперь Dark Mode по умолчанию
    }

    setTheme(initialTheme);
    

    if (themeToggle) {
        themeToggle.addEventListener('click', switchTheme);
    }
    
    
    // =================================================================
    // 6. CAROUSEL / СЛАЙДЕР (Popular Section) 🚀
    // =================================================================
    
    // 📝 ИЗМЕНЕНИЕ: Новый массив с 5-ю позициями для Карусели (Шаурма + Пицца)
    const popularDishes = [
        // 3 позиции из секции "Шаурма"
        {
            img: 'assets/img/2-3-4.jpg', // Предполагаемое изображение для шаурмы
            dish: 'dish_shawarma_large',
            desc: 'desc_shawarma_large',
            price: 'price_shawarma_large'
        },
        {
            img: 'assets/img/2-3-4.jpg', 
            dish: 'dish_shawarma_medium',
            desc: 'desc_shawarma_medium',
            price: 'price_shawarma_medium'
        },
        {
            img: 'assets/img/2-3-4.jpg',
            dish: 'dish_shawarma_small',
            desc: 'desc_shawarma_small',
            price: 'price_shawarma_small'
        },
        // 2 позиции из секции "Фастфуд" (Пицца)
        {
            img: 'assets/img/peperoni_.jpg',
            dish: 'dish_pizza_pepperoni',
            desc: 'desc_pizza_pepperoni',
            price: 'price_pizza_pepperoni'
        },
        {
            img: 'assets/img/margarita_.jpg',
            dish: 'dish_pizza_margarita',
            desc: 'desc_pizza_margarita',
            price: 'price_pizza_margarita'
        }
    ];

    const track = document.getElementById('popularCarouselTrack');
    // Используем классы из CSS для кнопок, чтобы было чище. 
    // В HTML они будут иметь ID, но здесь их можно получить по ID
    const prevBtn = document.getElementById('prevPopularBtn'); 
    const nextBtn = document.getElementById('nextPopularBtn');
    const indicatorsContainer = document.getElementById('popularIndicators');
    
    if (track) {
        let currentIndex = 0;
        const totalSlides = popularDishes.length;
        const cardWidth = 100; // Ширина одного слайда в %
        let startX = 0;
        let isSwiping = false;
        // 🚀 НОВАЯ ПЕРЕМЕННАЯ: Начальное горизонтальное смещение в момент touchstart (в %)
        let initialOffsetPercent = 0; 


        // Создает HTML для одной карточки блюда
        const createSlide = (dish) => {
            const card = document.createElement('div');
            card.className = 'carousel-slide';
            
            // 🚀 ИЗМЕНЕНИЕ: Для корректного перевода динамически созданного контента 
            // используем data-i18n. Текст-заглушка getTranslation() используется только 
            // для начальной отрисовки, но будет заменен функцией window.updateTranslations.
            card.innerHTML = `
                <div class="menu-card">
                    <img src="${dish.img}" alt="${getTranslation(dish.dish, 'Популярное блюдо')}">
                    <h3 data-i18n="${dish.dish}">${getTranslation(dish.dish, 'Название блюда')}</h3>
                    <p class="desc" data-i18n="${dish.desc}">${getTranslation(dish.desc, 'Описание')}</p>
                    <p class="price" data-i18n="${dish.price}">${getTranslation(dish.price, 'Цена')}</p>
                </div>
            `;
            return card;
        };
        
        // Создает HTML для всех слайдов и индикаторов
        const initializeCarousel = () => {
             // 📝 ФИКС: Очистка старого содержимого перед генерацией
            track.innerHTML = '';
            indicatorsContainer.innerHTML = '';
            
            // 1. Создание слайдов
            popularDishes.forEach((dish, index) => {
                const slide = createSlide(dish);
                // Добавляем класс 'active' к первому слайду
                if (index === 0) {
                    slide.classList.add('active');
                }
                track.appendChild(slide);

                // 2. Создание индикаторов (точек)
                const indicator = document.createElement('div');
                indicator.className = 'indicator-dot';
                indicator.dataset.index = index;
                if (index === 0) {
                    indicator.classList.add('active');
                }
                indicator.addEventListener('click', () => moveToSlide(index));
                indicatorsContainer.appendChild(indicator);
            });
            
            // 🚫 УДАЛЕНО: Удалил этот блок, так как функция обновления переводов 
            // будет вызываться глобально после инициализации карусели и при смене языка.
            /* if (typeof window.updateTranslations === 'function' && window.currentLang) {
                window.updateTranslations(window.currentLang);
            }
            */
        };

        // Обновляет позицию карусели
        const updateCarouselPosition = () => {
            const offset = -currentIndex * cardWidth;
            track.style.transform = `translateX(${offset}%)`;
            updateIndicators();
        };

        // Обновляет активный индикатор
        const updateIndicators = () => {
            const dots = indicatorsContainer.querySelectorAll('.indicator-dot');
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });

            // Обновляем состояние кнопок (отключаем на первом/последнем слайде)
            if (prevBtn) prevBtn.disabled = currentIndex === 0;
            if (nextBtn) nextBtn.disabled = currentIndex === totalSlides - 1;
        };

        // Перемещает к конкретному слайду
        const moveToSlide = (index) => {
            if (index >= 0 && index < totalSlides) {
                currentIndex = index;
                // 🚀 ИСХОДНОЕ ИЗМЕНЕНИЕ: Убеждаемся, что плавность включена для кнопок
                track.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)'; 
                updateCarouselPosition();
            }
        };

        // Обработчики кликов по кнопкам
        if (prevBtn) {
            prevBtn.addEventListener('click', () => moveToSlide(currentIndex - 1));
        }
        if (nextBtn) {
            nextBtn.addEventListener('click', () => moveToSlide(currentIndex + 1));
        }

        // --- Логика свайпа (для мобильных) ---

        // Начинаем свайп
        const handleTouchStart = (e) => {
            // Игнорируем мультитач
            if (e.touches.length > 1) return;
            
            startX = e.touches[0].clientX;
            isSwiping = true;
            track.style.transition = 'none'; // Отключаем плавность для мгновенного сдвига
            
            // 🚀 ИЗМЕНЕНИЕ: Получаем текущее смещение в процентах, чтобы продолжить движение
            const currentTransform = track.style.transform;
            if (currentTransform && currentTransform.startsWith('translateX(')) {
                // Извлекаем числовое значение в процентах
                initialOffsetPercent = parseFloat(currentTransform.match(/translateX\(([-]?[\d\.]+)\%\)/)?.[1]) || 0;
            } else {
                initialOffsetPercent = -currentIndex * cardWidth;
            }
        };

        // Отслеживаем движение
        const handleTouchMove = (e) => {
            if (!isSwiping) return;
            
            // Проверяем, что движение в основном горизонтальное, иначе разрешаем вертикальный скролл
            const currentX = e.touches[0].clientX;
            const diffX = currentX - startX;
            
            // Небольшая разница, чтобы разрешить скролл страницы
            if (Math.abs(diffX) > 5) {
                e.preventDefault(); // Предотвращаем вертикальный скролл при горизонтальном свайпе
            } else {
                return; // Если движение вертикальное или слишком маленькое
            }
            
            
            // Разница в пикселях
            // Ширина трека в пикселях: track.offsetWidth
            // Процентное смещение = (разница в пикселях / общая ширина трека) * 100
            const diffPercent = (diffX / track.offsetWidth) * 100;
            
            // Новое смещение - это начальное смещение + сдвиг в процентах
            let newOffset = initialOffsetPercent + diffPercent;
            
            // 🚀 ФИКС (Ограничение свайпа на границах)
            // Добавляем "резиновый" эффект, уменьшая сдвиг при достижении границы
            const maxOffset = 0; // На первом слайде
            const minOffset = -(totalSlides - 1) * cardWidth; // На последнем слайде
            const elasticityFactor = 4; // Степень "резиновости"

            if (newOffset > maxOffset) {
                newOffset = maxOffset + (newOffset - maxOffset) / elasticityFactor;
            } else if (newOffset < minOffset) {
                newOffset = minOffset + (newOffset - minOffset) / elasticityFactor;
            }
            
            track.style.transform = `translateX(${newOffset}%)`;
        };
        
        // Завершаем свайп
        const handleTouchEnd = (e) => {
            if (!isSwiping) return;
            isSwiping = false;
            
            // 🚀 КРИТИЧЕСКОЕ ИЗМЕНЕНИЕ (для центрирования): Восстанавливаем плавность ПЕРЕД сдвигом
            track.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)'; 

            const endX = e.changedTouches[0].clientX;
            const diffX = startX - endX; // Положительное значение - свайп влево (к следующему)
            const threshold = track.offsetWidth / 5; // Порог в 20% ширины контейнера
            
            if (diffX > threshold && currentIndex < totalSlides - 1) {
                // Свайп влево -> следующий слайд
                moveToSlide(currentIndex + 1); 
            } else if (diffX < -threshold && currentIndex > 0) {
                // Свайп вправо -> предыдущий слайд
                moveToSlide(currentIndex - 1); 
            } else {
                // 🔴 КРИТИЧЕСКОЕ ИЗМЕНЕНИЕ: Если свайп был слишком слабым, 
                // принудительно возвращаемся к *точному* центру текущего слайда.
                updateCarouselPosition();
            }
        };

        // Добавляем обработчики тач-событий к контейнеру карусели
        track.addEventListener('touchstart', handleTouchStart);
        track.addEventListener('touchmove', handleTouchMove);
        track.addEventListener('touchend', handleTouchEnd);
        
        // Добавляем обработчик изменения размера окна, чтобы центрировать слайд при ресайзе
        window.addEventListener('resize', updateCarouselPosition);

        
        // Инициализация
        initializeCarousel();
        updateCarouselPosition();
        
        // Делаем функцию инициализации публичной, чтобы lang.js мог ее вызвать и перерисовать карточки
        window.g_initializePopularCarousel = () => {
            initializeCarousel();
            updateCarouselPosition();
        };
    } 

    
    // =================================================================
    // 7. ГЛОБАЛЬНАЯ КОРРЕКЦИЯ ДЛЯ ПЕРЕВОДА 🚀
    // =================================================================
    // Вызов функции перевода для всего документа после загрузки, чтобы применить
    // тексты к статическим элементам и динамически созданным элементам карусели.
    if (typeof window.updateTranslations === 'function' && window.currentLang) {
        window.updateTranslations(window.currentLang);
    }
    // Также гарантируем, что текст кнопки темы будет корректно установлен
    window.updateThemeButtonText();


    // =================================================================
    // 8. НАБЛЮДЕНИЕ ЗА ГАЛЕРЕЕЙ ДЛЯ ПОКАЗА КНОПОК ВИДА (Intersection Observer) 🕵️
    // =================================================================
    const viewToggles = document.querySelector('.view-toggles');
    
    // 🔥 НОВАЯ ЛОГИКА: Наблюдение за секцией #gallery
    if (gallerySection && viewToggles) {
        // 1. Создаем наблюдатель
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                // Если секция #gallery (entry.target) сейчас в области видимости (isIntersecting: true)
                if (entry.isIntersecting) {
                    // Показываем кнопки, добавляя класс 'show-flex'
                    viewToggles.classList.add('show-flex'); 
                } else {
                    // Скрываем кнопки
                    viewToggles.classList.remove('show-flex');
                }
            });
        }, {
            // threshold: 0.1 означает, что событие сработает, когда 10% секции станет видимым
            threshold: 0.1 
        });

        // 2. Запускаем наблюдение
        observer.observe(gallerySection);
    }
    

    // =========================================================
    // 9. ЗАПОЛНЕНИЕ ГАЛЕРЕИ ВСЕХ БЛЮД (СЕКЦИЯ #gallery) 🖼️
    // =========================================================

    /**
     * Собирает все блюда из меню, группирует их по секциям
     * и отображает в упрощенном формате (3 колонки: фото, название, цена)
     * в секции #gallery.
     */
    const fillGalleryOptimized = () => {
        const galleryContainer = document.querySelector('#gallery');
        const galleryGrid = galleryContainer ? galleryContainer.querySelector('.menu-grid') : null;
        
        if (!galleryGrid) return;

        // Очищаем существующее содержимое
        galleryGrid.innerHTML = ''; 

        // Определяем все секции меню и их ключи для перевода
        // Ключи должны совпадать с заголовками в index.html и lang.js
        const menuStructure = [
            { id: '#menu-shawarma', titleKey: 'shawarma_title' },
            { id: '#menu-breakfast', titleKey: 'breakfast_title' },
            { id: '#menu-salads', titleKey: 'menu_salads' },
            { id: '#menu-fastfood', titleKey: 'menu_fastfood' }
        ];

        // 1. Обходим каждую секцию
        menuStructure.forEach(section => {
            const originalSection = document.querySelector(section.id);
            
            if (originalSection) {
                const cards = originalSection.querySelectorAll('.menu-card');
                
                if (cards.length > 0) {
                    // 2. Добавляем заголовок секции (посередине)
                    const sectionHeader = document.createElement('h3');
                    sectionHeader.classList.add('gallery-section-title');
                    sectionHeader.setAttribute('data-i18n', section.titleKey);
                    // Устанавливаем русский текст как заглушку до перевода
                    sectionHeader.textContent = originalSection.querySelector('h2').textContent; 
                    galleryGrid.appendChild(sectionHeader);

                    // 3. Создаем контейнер для 3-х колонок для данной секции
                    const sectionGrid = document.createElement('div');
                    sectionGrid.classList.add('gallery-items-grid');
                    
                    cards.forEach(card => {
                        // 4. Генерируем упрощенную карточку
                        
                        const img = card.querySelector('img');
                        const title = card.querySelector('h3');
                        const price = card.querySelector('.price');

                        // Проверяем, что все элементы найдены
                        if (!img || !title || !price) return;

                        const simplifiedCard = document.createElement('div');
                        simplifiedCard.classList.add('gallery-item');
                        
                        // Собираем HTML для упрощенной карточки
                        // Используем атрибуты data-i18n для перевода 
                        simplifiedCard.innerHTML = `
                            <img src="${img.getAttribute('src')}" alt="${img.getAttribute('alt')}" class="gallery-img">
                            <div class="text-container"> 
                                <h4 class="gallery-title" data-i18n="${title.getAttribute('data-i18n')}">${title.textContent}</h4>
                                <p class="gallery-price" data-i18n="${price.getAttribute('data-i18n')}">${price.textContent}</p>
                            </div>
                        `;
                        
                        sectionGrid.appendChild(simplifiedCard);
                    });
                    
                    galleryGrid.appendChild(sectionGrid);
                }
            }
        });
        
        // После заполнения галереи вызываем функцию перевода, чтобы перевести новые элементы (h3, h4, p)
        // Этот вызов должен быть в конце, чтобы обработать ВСЕ динамически созданные элементы
        if (window.updateTranslations && window.currentLang) {
            window.updateTranslations(window.currentLang);
        }
    }

    // Вызываем функцию для заполнения галереи при загрузке страницы
    fillGalleryOptimized();

});