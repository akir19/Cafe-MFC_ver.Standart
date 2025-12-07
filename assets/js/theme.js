document.addEventListener('DOMContentLoaded', () => {

    const html = document.documentElement;



    // Функция для обновления текста кнопки темы (гарантированно работает через window.translations)

    // Эта функция будет вызываться из lang.js после загрузки языка

    window.updateThemeButtonText = function() {

        if (!window.translations || !window.currentLang) return;



        const currentThemeIsDark = html.classList.contains('dark-theme');

        // Если текущая темная, кнопка должна показывать "Светлая тема" (ключ theme_light)

        const key = currentThemeIsDark ? 'theme_light' : 'theme_dark';

       

        const lang = window.translations[window.currentLang];



        document.querySelectorAll('#themeToggle, .overlay-theme-toggle').forEach(btn => {

            btn.setAttribute('data-i18n', key);

            if (lang && lang[key]) {

                btn.textContent = lang[key];

            }

        });

    };

   

    // Функция для установки темы

    const setTheme = (theme) => {

        if (theme === 'dark') {

            html.classList.remove('light-theme');

            html.classList.add('dark-theme');

            localStorage.setItem('theme', 'dark');

        } else {

            html.classList.remove('dark-theme');

            html.classList.add('light-theme');

            localStorage.setItem('theme', 'light');

        }

       

        // Вызываем функцию обновления текста кнопки

        if (typeof window.updateThemeButtonText === 'function') {

            window.updateThemeButtonText();

        }

    };



    // Загрузка сохраненной темы (по умолчанию - темная)

    let savedTheme = localStorage.getItem('theme');

   

    // ФИКС 1: Убеждаемся, что HTML тег имеет правильный класс при старте, если localStorage пуст

    if (!savedTheme) {

        savedTheme = 'dark';

    }



    setTheme(savedTheme);



    // Переключение темы по клику

    document.querySelectorAll('#themeToggle, .overlay-theme-toggle').forEach(btn => {

        btn.addEventListener('click', () => {

            const currentTheme = html.classList.contains('dark-theme') ? 'dark' : 'light';

            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

            setTheme(newTheme);

        });

    });

});