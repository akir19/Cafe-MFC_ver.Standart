document.addEventListener('DOMContentLoaded', () => {

    
    // Переводы для контента
    window.translations = {
        ge: {
            nav_about: "ჩვენს შესახებ",
            nav_popular: "პოპულარული", // 🌟 НОВЫЙ КЛЮЧ
            nav_menu: "მენიუ",
            nav_contacts: "კონტაქტები",
            hero_title: "ქართული სამზარეულო თბილისის ცენტრში",
            
            // КЛЮЧИ ДЛЯ НАЗВАНИЙ СЕКЦИЙ В МЕНЮ
            menu_shawarma: "შაურმა",
            menu_breakfast: "საუზმე",
            menu_salads: "სალათები",
            menu_fastfood: "ფასტფუდი",
            popular_menu_title: "პოპულარული", // Перенесен сюда для порядка
            // 🔴 НОВЫЙ КЛЮЧ ДЛЯ ГАЛЕРЕИ
            menu_show_all: "ყველა კერძის ჩვენება",
            // ------------------------------------
            
            about_title: "ჩვენს შესახებ",
            about_text: "MFC CAFFE<br>• საუკეთესო გემო ქალაქში. ყოველი სიყვარულით მომზადებული კერძი ჩვენი ისტორიაა. უგემრიელესი შაურმა, კარტოფილი ფრი, სალათები და განსაკუთრებული ატმოსფერო.<br>• მობრძანდით და შეიგრძენით ნამდვილი გემო MFC-ში.",
            
            contacts_title: "კონტაქტები",
            contacts_address: "თბილისი, ნოე ხომერიკის ქ. 21", 
            // 🟢 НОВЫЕ КЛЮЧИ ДЛЯ ОПИСАНИЙ КОНТАКТОВ (GEORGIAN)
            contacts_phone_label: "ტელეფონი:", 
            contacts_whatsapp_label: "WhatsApp წინასწარი შეკვეთებისთვის:", 
            contacts_facebook_label: "ჩვენი გვერდი Facebook-ზე:",
            // ----------------------------------------------------
            contacts_phone_link: "+995 574 74 24 07", 
            contacts_whatsapp_link: "WhatsApp", 
            contacts_facebook_link: "Facebook", 
            contacts_instagram_link: "Instagram", 
            // ---------------------------------
            
            // 🟢 НОВЫЕ КЛЮЧИ MEMO / WhatsApp
            memo_label: "შეტყობინება",
            memo_placeholder: "დაწერეთ აქ...",
            memo_send: "გაგზავნა",
            memo_cancel: "გაუქმება",
            memo_redirect_whatsapp: "თქვენ გადამისამართდებით WhatsApp-ზე შეტყობინების გასაგზავნად.",
            memo_cancel_alert: "შეტყობინება გაუქმებულია.",
            memo_placeholder_alert: "გთხოვთ, შეიყვანოთ შეტყობინება.", // НОВЫЙ
            whatsapp_prefix: "შეტყობინება საიტიდან:", // НОВЫЙ ДЛЯ main.js

            back_to_top: "↑ უკან",
            theme_light: "ნათელი თემა",
            theme_dark: "ბნელი თემა",

            // 🔴 НОВЫЙ КЛЮЧ ДЛЯ КНОПКИ ЗАКРЫТИЯ ГАЛЕРЕИ
            gallery_close: "მენიუში დაბრუნება",
            
            // ПЕРЕВОДЫ ДЛЯ ШАУРМЫ
            shawarma_title: "შაურმა",
            dish_shawarma_small: "შაურმა მცირე",
            desc_shawarma_small: "შედგება: ქათამი, ხახვი, აისბერგი, პომიდორი, ცხარე წიწაკა, მაიონეზი, კეტჩუპი.",
            price_shawarma_small: "11 GEL",
            dish_shawarma_medium: "შაურმა საშუალო",
            desc_shawarma_medium: "შედგება: ქათამი, ხახვი, აისბერგი, პომიდორი, ცხარე წიწაკა, მაიონეზი, კეტჩუპი.",
            price_shawarma_medium: "13 GEL",
            dish_shawarma_large: "შაურმა დიდი",
            desc_shawarma_large: "შედგება: ქათამი, ხახვი, აისბერგი, პომიდორი, ცხარე წიწაკა, მაიონეზი, კეტჩუპი.",
            price_shawarma_large: "15 GEL",

            // ПЕРЕВОДЫ ДЛЯ ЗАВТРАКА
            breakfast_title: "საუზმე",
            dish_omelet: "ომლეტი სალათით",
            desc_omelet: "2 კვერცხი, კიტრი, პომიდორი, წითელი ხახვი.",
            price_omelet: "7 GEL",
            
            dish_scramble: "სქრემბლი სალსათი",
            desc_scramble: "ტოსტერის პური, 2 კვერცხი, სალსა.",
            price_scramble: "7 GEL",
            
            dish_pasta_alfredo: "პასტა ალფრედო",
            desc_pasta_alfredo: "ფეტუჩინის პასტა, ნაღები, ქათმის ფილე, იტალიური სანელებლები.",
            price_pasta_alfredo: "13 GEL",

            dish_pasta_bolognese: "პასტა ბოლონეზე",
            desc_pasta_bolognese: "სპაგეტი, სოუსი, შერეული ფარში (ძროხა და ქათამი), იტალიური სანელებლები, ახალი პომიდორი.",
            price_pasta_bolognese: "15 GEL",
            
            dish_chicken_cutlet: "ქათმის კატლეტა",
            desc_chicken_cutlet: "ქათმის ფილე, ქინძი, ნიორი, ხახვი, პანირებული ფქვილი, სანელებლები.",
            price_chicken_cutlet: "3 GEL",

            dish_homemade_cutlet: "საშინაო კატლეტა (ძროხა + ფილე)",
            desc_homemade_cutlet: "ძროხა, ქათამი, ნიორი, ხახვი, სანელებლები, ქინძი.",
            price_homemade_cutlet: "3.90 GEL",

            dish_lula_kebab: "ლულა-კაბაბი (ძროხა + ქათმის ფილე)",
            desc_lula_kebab: "ძროხა, ქათამი, ნიორი, ხახვი, სანელებლები, ქინძი.",
            price_lula_kebab: "7.50 GEL",

            dish_puree: "პიურე — 150g",
            desc_puree: "რძე, კარაქი, კარტოფილი.",
            price_puree: "3 GEL",

            dish_buckwheat: "წიწიბურა — 150g",
            desc_buckwheat: "მცენარეული ზეთი, წიწიბურა.",
            price_buckwheat: "5 GEL",

            dish_rice: "ბრინჯი - 150g",
            desc_rice: "სიმინდი, ბულგარული წიწაკა, ბრინჯი.",
            price_rice: "5.50 GEL",

            dish_penovani_khachapuri: "პენოვანი ხაჭაპური",
            desc_penovani_khachapuri: "ცომი, იმერული ყველი.",
            price_penovani_khachapuri: "5 GEL",

            dish_penovani_lobiani: "პენოვანი ლობიანი",
            desc_penovani_lobiani: "ლობიო, ცომი.",
            price_penovani_lobiani: "3.80 GEL",
            
            dish_penovani_kubdari: "პენოვანი კუბდარი",
            desc_penovani_kubdari: "ძროხის და ქათმის ხორცი, ხახვი, ნიორი, ქინძი, სანელებლები.",
            price_penovani_kubdari: "7 GEL",

            // ПЕРЕВОДЫ ДЛЯ САЛАТОВ
            dish_olivier: "ოლივიე -250g",
            desc_olivier: "ქათმის ფილე, ბარდა, კვერცხი, მაიონეზი, შავი პილპილი, მწნილი კიტრი, სტაფილო, კარტოფილი.",
            price_olivier: "5 GEL",
            
            dish_chicken_salad: "ქათმის სალათი — 250g",
            desc_chicken_salad: "ქათმის ფილე, შავი პილპილი, წითელი ბულგარული წიწაკა, კიტრი, მაიონეზი.",
            price_chicken_salad: "9.50 GEL",

            dish_eggplant_salad: "ბადრიჯნის სალათი -250g",
            desc_eggplant_salad: "ბადრიჯანი, ახალი პომიდორი, წითელი ხახვი, ქინძი, ნიგოზი.",
            price_eggplant_salad: "9.00 GEL",

            dish_caesar: "ცეზარი — 350g",
            desc_caesar: "სალათის ფოთოლი, ქათმის ფილე, მაიონეზის სოუსი, პომიდორი, კვერცხი, პარმეზანის ყველი.",
            price_caesar: "12 GEL",

            // ПЕРЕВОДЫ ДЛЯ ФАСТФУДА
            fastfood_title: "ფასტფუდი",
            dish_pizza_pepperoni: "პიცა პეპერონი", 
            desc_pizza_pepperoni: "დიდი პიცა პეპერონის სოსისით. ფასი ადგილზე: 15 GEL.", 
            price_pizza_pepperoni: "23 GEL (მიტანა)", 
            dish_pizza_margarita: "პიცა მარგარიტა", 
            desc_pizza_margarita: "კლასიკური პიცა პომიდვრითა და მოცარელათი. ფასი ადგილზე: 13 GEL.", 
            price_pizza_margarita: "21 GEL (მიტანა)", 
            dish_french_fries: "კარტოფილი ფრაი — 150g",
            desc_french_fries: "კარტოფილი",
            price_french_fries: "5 GEL",
            
            dish_nuggets: "ქათმის ნაგეტსები — 150g",
            desc_nuggets: "ქათმის ფილე, ციტრუსი, სანელებლები, პანირებული ფქვილი.",
            price_nuggets: "4.50 GEL",
            
            dish_sandwich: "სენდვიჩი",
            desc_sandwich: "ქათმის კატლეტა, სალათის ფურცელი, პომიდორი, ჩედარის ყველი, მარინადირებული კიტრი, ბარბექიუს სოუსი, ტოსტერის პური",
            price_sandwich: "8 GEL",
            
            dish_mexican_fries: "მექსიკური კარტოფილი — 200g",
            desc_mexican_fries: "კარტოფილი კანისთან ერთად, შავი პილპილი, პაპრიკა, ნიორი, ორეგანო.",
            price_mexican_fries: "5 GEL"
        },
        ru: {
            nav_about: "О нас",
            nav_popular: "Популярное", // 🌟 НОВЫЙ КЛЮЧ
            nav_menu: "Меню",
            nav_contacts: "Контакты",
            hero_title: "Грузинская кухня в центре Тбилиси",
            
            // КЛЮЧИ ДЛЯ НАЗВАНИЙ СЕКЦИЙ В МЕНЮ
            menu_shawarma: "Шаурма",
            menu_breakfast: "Завтрак",
            menu_salads: "Салаты",
            menu_fastfood: "Фастфуд",
            popular_menu_title: "Популярное", // Перенесен сюда для порядка
            // 🔴 НОВЫЙ КЛЮЧ ДЛЯ ГАЛЕРЕИ
            menu_show_all: "Показать все блюда",
            // ------------------------------------
            
            about_title: "О нас",
            about_text: "MFC CAFFE<br>• Лучший вкус в городе. Каждое блюдо, приготовленное с любовью, — это наша история. Вкусная шаурма, картофель фри, салаты и особая атмосфера.<br>• Приходите и почувствуйте настоящий вкус в MFC.",
            
            contacts_title: "Контакты",
            contacts_address: "Тбилиси, ул. Ноя Хомерикис 21", 
            // 🟢 НОВЫЕ КЛЮЧИ ДЛЯ ОПИСАНИЙ КОНТАКТОВ (RUSSIAN)
            contacts_phone_label: "Телефон:", 
            contacts_whatsapp_label: "WhatsApp для предварительных заказов:", 
            contacts_facebook_label: "Наша страница в Facebook:",
            // ----------------------------------------------------
            contacts_phone_link: "+995 574 74 24 07", 
            contacts_whatsapp_link: "Ватсап", // ИСПРАВЛЕНО
            contacts_facebook_link: "Фейсбук", // ИСПРАВЛЕНО
            contacts_instagram_link: "Инстаграм", // ИСПРАВЛЕНО
            // ---------------------------------
            
            // 🟢 НОВЫЕ КЛЮЧИ MEMO / WhatsApp
            memo_label: "Ваше сообщение",
            memo_placeholder: "Напишите здесь...",
            memo_send: "Отправить",
            memo_cancel: "Отменить",
            memo_redirect_whatsapp: "Вы будете перенаправлены в WhatsApp для отправки сообщения.",
            memo_cancel_alert: "Сообщение отменено.",
            memo_placeholder_alert: "Пожалуйста, введите сообщение.", // НОВЫЙ
            whatsapp_prefix: "Сообщение с сайта:", // НОВЫЙ ДЛЯ main.js

            back_to_top: "↑ Назад",
            theme_light: "Светлая тема",
            theme_dark: "Темная тема",

            // 🔴 НОВЫЙ КЛЮЧ ДЛЯ КНОПКИ ЗАКРЫТИЯ ГАЛЕРЕИ
            gallery_close: "Вернуться в меню",
            
            // ПЕРЕВОДЫ ДЛЯ ШАУРМЫ
            shawarma_title: "Шаурма",
            dish_shawarma_small: "Шаурма малая",
            desc_shawarma_small: "Состав: курица, лук, айсберг, помидор, острый перец, майонез, кетчуп.",
            price_shawarma_small: "11 GEL",
            dish_shawarma_medium: "Шаурма средняя",
            desc_shawarma_medium: "Состав: курица, лук, айсберг, помидор, острый перец, майонез, кетчуп.",
            price_shawarma_medium: "13 GEL",
            dish_shawarma_large: "Шаурма большая",
            desc_shawarma_large: "Состав: курица, лук, айсберг, помидор, острый перец, майонез, кетчуп.",
            price_shawarma_large: "15 GEL",

            // ПЕРЕВОДЫ ДЛЯ ЗАВТРАКА
            breakfast_title: "Завтрак",
            dish_omelet: "Омлет с салатом",
            desc_omelet: "2 яйца, огурец, помидор, красный лук.",
            price_omelet: "7 GEL",
            
            dish_scramble: "Скрэмбл с сальсой",
            desc_scramble: "Тостовый хлеб, 2 яйца, сальса.",
            price_scramble: "7 GEL",
            
            dish_pasta_alfredo: "Паста Альфредо",
            desc_pasta_alfredo: "Паста феттучини, сливки, куриное филе, итальянские специи.",
            price_pasta_alfredo: "13 GEL",

            dish_pasta_bolognese: "Паста Болоньезе",
            desc_pasta_bolognese: "Спагетти, соус, смешанный фарш (говядина и курица), итальянские специи, свежий помидор.",
            price_pasta_bolognese: "15 GEL",
            
            dish_chicken_cutlet: "Куриная котлета",
            desc_chicken_cutlet: "Куриное филе, кинза, чеснок, лук, панировочная мука, специи.",
            price_chicken_cutlet: "3 GEL",

            dish_homemade_cutlet: "Домашняя котлета (говядина + филе)",
            desc_homemade_cutlet: "Говядина, курица, чеснок, лук, специи, кинза.",
            price_homemade_cutlet: "3.90 GEL",

            dish_lula_kebab: "Люля-кебаб (говядина + куриное филе)",
            desc_lula_kebab: "Говядина, курица, чеснок, лук, специи, кинза.",
            price_lula_kebab: "7.50 GEL",

            dish_puree: "Пюре — 150g",
            desc_puree: "Молоко, сливочное масло, картофель.",
            price_puree: "3 GEL",

            dish_buckwheat: "Гречка — 150g",
            desc_buckwheat: "Растительное масло, гречка.",
            price_buckwheat: "5 GEL",

            dish_rice: "Рис — 150g",
            desc_rice: "Кукуруза, болгарский перец, рис.",
            price_rice: "5.50 GEL",

            dish_penovani_khachapuri: "Пеновани Хачапури",
            desc_penovani_khachapuri: "Слоеное тесто, имеретинский сыр.",
            price_penovani_khachapuri: "5 GEL",

            dish_penovani_lobiani: "Пеновани Лобиани",
            desc_penovani_lobiani: "Фасоль, слоеное тесто.",
            price_penovani_lobiani: "3.80 GEL",
            
            dish_penovani_kubdari: "Пеновани Кубдари",
            desc_penovani_kubdari: "Говядина и куриное мясо, лук, чеснок, кинза, специи.",
            price_penovani_kubdari: "7 GEL",
            
            // ПЕРЕВОДЫ ДЛЯ САЛАТОВ
            dish_olivier: "Салат Оливье — 250g",
            desc_olivier: "Куриное филе, горошек, яйцо, майонез, черный перец, маринованный огурец, морковь, картофель.",
            price_olivier: "5 GEL",
            
            dish_chicken_salad: "Куриный салат — 250g",
            desc_chicken_salad: "Куриное филе, черный перец, красный болгарский перец, огурец, майонез.",
            price_chicken_salad: "9.50 GEL",

            dish_eggplant_salad: "Салат из баклажанов — 250g",
            desc_eggplant_salad: "Баклажан, свежий помидор, красный лук, кинза, грецкий орех.",
            price_eggplant_salad: "9.00 GEL",

            dish_caesar: "Салат Цезарь — 350g",
            desc_caesar: "Листья салата, куриное филе, майонезный соус, помидор, яйцо, сыр Пармезан.",
            price_caesar: "12 GEL",

            // ПЕРЕВОДЫ ДЛЯ ФАСТФУДА
            fastfood_title: "Фастфуд",
            dish_pizza_pepperoni: "Пицца Пеперони", 
            desc_pizza_pepperoni: "Большая пицца с колбасками Пеперони. Цена в заведении: 15 GEL.", 
            price_pizza_pepperoni: "23 GEL (доставка)", 
            dish_pizza_margarita: "Пицца Маргарита", 
            desc_pizza_margarita: "Классическая пицца с томатами и моцареллой. Цена в заведении: 13 GEL.", 
            price_pizza_margarita: "21 GEL (доставка)", 
            dish_french_fries: "Картофель фри — 150g",
            desc_french_fries: "Картофель",
            price_french_fries: "5 GEL",
            
            dish_nuggets: "Куриные наггетсы — 150g",
            desc_nuggets: "Куриное филе, цитрус, специи, панировочная мука.",
            price_nuggets: "4.50 GEL",
            
            dish_sandwich: "Сэндвич",
            desc_sandwich: "Куриная котлета, лист салата, помидор, сыр Чеддер, маринованный огурец, соус Барбекю, тостерный хлеб.",
            price_sandwich: "8 GEL",
            
            dish_mexican_fries: "Мексиканский картофель — 200g",
            desc_mexican_fries: "Картофель с кожурой, черный перец, паприка, чеснок, орегано.",
            price_mexican_fries: "5 GEL"
        },
        en: {
            nav_about: "About Us",
            nav_popular: "Popular", // 🌟 НОВЫЙ КЛЮЧ
            nav_menu: "Menu",
            nav_contacts: "Contacts",
            hero_title: "Georgian Cuisine in the Heart of Tbilisi",
            
            // КЛЮЧИ ДЛЯ НАЗВАНИЙ СЕКЦИЙ В МЕНЮ
            menu_shawarma: "Shawarma",
            menu_breakfast: "Breakfast",
            menu_salads: "Salads",
            menu_fastfood: "Fast Food",
            popular_menu_title: "Popular", // Перенесен сюда для порядка
            // 🔴 НОВЫЙ КЛЮЧ ДЛЯ ГАЛЕРЕИ
            menu_show_all: "Show All Dishes",
            // ------------------------------------
            
            about_title: "About Us",
            about_text: "MFC CAFFE<br>• The best taste in the city. Every dish prepared with love is our story. Delicious shawarma, french fries, salads, and a special atmosphere.<br>• Come and experience the true taste at MFC.",

            contacts_title: "Contacts",
            contacts_address: "Tbilisi, Noe Khomerikis Str. 21", 
            // 🟢 НОВЫЕ КЛЮЧИ ДЛЯ ОПИСАНИЙ КОНТАКТОВ (ENGLISH)
            contacts_phone_label: "Phone:", 
            contacts_whatsapp_label: "WhatsApp for pre-orders:", 
            contacts_facebook_label: "Our Facebook page:", 
            // ----------------------------------------------------
            contacts_phone_link: "+995 574 74 24 07", 
            contacts_whatsapp_link: "WhatsApp", 
            contacts_facebook_link: "Facebook", 
            contacts_instagram_link: "Instagram", 
            // ---------------------------------
            
            // 🟢 НОВЫЕ КЛЮЧИ MEMO / WhatsApp
            memo_label: "Your Message",
            memo_placeholder: "Write here...",
            memo_send: "Send",
            memo_cancel: "Cancel",
            memo_redirect_whatsapp: "You will be redirected to WhatsApp to send the message.",
            memo_cancel_alert: "Message cancelled.",
            memo_placeholder_alert: "Please enter a message.", // НОВЫЙ
            whatsapp_prefix: "Message from website:", // НОВЫЙ ДЛЯ main.js

            back_to_top: "↑ Back",
            theme_light: "Light Theme",
            theme_dark: "Dark Theme",

            // 🔴 НОВЫЙ КЛЮЧ ДЛЯ КНОПКИ ЗАКРЫТИЯ ГАЛЕРЕИ
            gallery_close: "Back to Menu",

            // ПЕРЕВОДЫ ДЛЯ ШАУРМЫ
            shawarma_title: "Shawarma",
            dish_shawarma_small: "Shawarma Small",
            desc_shawarma_small: "Ingredients: chicken, onion, iceberg, tomato, hot pepper, mayonnaise, ketchup.",
            price_shawarma_small: "11 GEL",
            dish_shawarma_medium: "Shawarma Medium",
            desc_shawarma_medium: "Ingredients: chicken, onion, iceberg, tomato, hot pepper, mayonnaise, ketchup.",
            price_shawarma_medium: "13 GEL",
            dish_shawarma_large: "Shawarma Large",
            desc_shawarma_large: "Ingredients: chicken, onion, iceberg, tomato, hot pepper, mayonnaise, ketchup.",
            price_shawarma_large: "15 GEL",

            // ПЕРЕВОДЫ ДЛЯ ЗАВТРАКА
            breakfast_title: "Breakfast",
            dish_omelet: "Omelet with salad",
            desc_omelet: "2 eggs, cucumber, tomato, red onion.",
            price_omelet: "7 GEL",
            
            dish_scramble: "Scramble with salsa",
            desc_scramble: "Toast bread, 2 eggs, salsa.",
            price_scramble: "7 GEL",
            
            dish_pasta_alfredo: "Pasta Alfredo",
            desc_pasta_alfredo: "Fettuccine pasta, cream, chicken fillet, Italian spices.",
            price_pasta_alfredo: "13 GEL",

            dish_pasta_bolognese: "Pasta Bolognese",
            desc_pasta_bolognese: "Spaghetti, sauce, mixed mince (beef and chicken), Italian spices, fresh tomato.",
            price_pasta_bolognese: "15 GEL",
            
            dish_chicken_cutlet: "Chicken Cutlet",
            desc_chicken_cutlet: "Chicken fillet, cilantro, garlic, onion, breaded flour, spices.",
            price_chicken_cutlet: "3 GEL",

            dish_homemade_cutlet: "Homemade Cutlet (Beef + Fillet)",
            desc_homemade_cutlet: "Beef, chicken, garlic, onion, spices, cilantro.",
            price_homemade_cutlet: "3.90 GEL",

            dish_lula_kebab: "Lula Kebab (Beef + Chicken Fillet)",
            desc_lula_kebab: "Beef, chicken, garlic, onion, spices, cilantro.",
            price_lula_kebab: "7.50 GEL",

            dish_puree: "Puree — 150g",
            desc_puree: "Milk, butter, potato.",
            price_puree: "3 GEL",

            dish_buckwheat: "Buckwheat — 150g",
            desc_buckwheat: "Vegetable oil, buckwheat.",
            price_buckwheat: "5 GEL",

            dish_rice: "Rice — 150g",
            desc_rice: "Corn, bell pepper, rice.",
            price_rice: "5.50 GEL",

            dish_penovani_khachapuri: "Penovani Khachapuri",
            desc_penovani_khachapuri: "Puff pastry, Imeretian cheese.",
            price_penovani_khachapuri: "5 GEL",

            dish_penovani_lobiani: "Penovani Lobiani",
            desc_penovani_lobiani: "Beans, puff pastry.",
            price_penovani_lobiani: "3.80 GEL",
            
            dish_penovani_kubdari: "Penovani Kubdari",
            desc_penovani_kubdari: "Beef and chicken meat, onion, garlic, cilantro, spices.",
            price_penovani_kubdari: "7 GEL",

            // ПЕРЕВОДЫ ДЛЯ САЛАТОВ
            dish_olivier: "Olivier Salad — 250g",
            desc_olivier: "Chicken fillet, peas, egg, mayonnaise, black pepper, pickled cucumber, carrot, potato.",
            price_olivier: "5 GEL",
            
            dish_chicken_salad: "Chicken Salad — 250g",
            desc_chicken_salad: "Chicken fillet, black pepper, red bell pepper, cucumber, mayonnaise.",
            price_chicken_salad: "9.50 GEL",

            dish_eggplant_salad: "Eggplant Salad — 250g",
            desc_eggplant_salad: "Eggplant, fresh tomato, red onion, cilantro, walnut.",
            price_eggplant_salad: "9.00 GEL",

            dish_caesar: "Caesar Salad — 350g",
            desc_caesar: "Lettuce, chicken fillet, mayonnaise sauce, tomato, egg, Parmesan cheese.",
            price_caesar: "12 GEL",

            // ПЕРЕВОДЫ ДЛЯ ФАСТФУДА
            fastfood_title: "Fast Food",
            dish_pizza_pepperoni: "Pizza Pepperoni", 
            desc_pizza_pepperoni: "Large pizza with Pepperoni sausages. Price in-house: 15 GEL.", 
            price_pizza_pepperoni: "23 GEL (delivery)", 
            dish_pizza_margarita: "Pizza Margarita", 
            desc_pizza_margarita: "Classic pizza with tomatoes and mozzarella. Price in-house: 13 GEL.", 
            price_pizza_margarita: "21 GEL (delivery)", 
            dish_french_fries: "French Fries — 150g",
            desc_french_fries: "Potato",
            price_french_fries: "5 GEL",
            
            dish_nuggets: "Chicken Nuggets — 150g",
            desc_nuggets: "Chicken fillet, citrus, spices, breaded flour.",
            price_nuggets: "4.50 GEL",
            
            dish_sandwich: "Sandwich",
            desc_sandwich: "Chicken cutlet, lettuce, tomato, Cheddar cheese, pickled cucumber, BBQ sauce, toast bread.",
            price_sandwich: "8 GEL",
            
            dish_mexican_fries: "Mexican Fries — 200g",
            desc_mexican_fries: "Potato with skin, black pepper, paprika, garlic, oregano.",
            price_mexican_fries: "5 GEL"
        }
    };
    
    // 🔴 ФУНКЦИЯ-ГЕТТЕР для main.js (обязательно выносим в window)
    window.getTranslation = (key, defaultValue) => {
        const currentLang = window.currentLang || 'ge';
        if (window.translations && window.translations[currentLang] && window.translations[currentLang][key]) {
            return window.translations[currentLang][key];
        }
        return defaultValue;
    };


    // 🔴 ПОЛНЫЕ НАЗВАНИЯ ЯЗЫКОВ
    const translatedLangNames = {
        ge: { // Если текущий язык - Грузинский, используем грузинские названия
            ge: "ქართული",
            ru: "რუსული",
            en: "ინგლისური"
        },
        ru: { // Если текущий язык - Русский, используем русские названия
            ge: "Грузинский",
            ru: "Русский",
            en: "Английский"
        },
        en: { // Если текущий язык - Английский, используем английские названия
            ge: "Georgian",
            ru: "Russian",
            en: "English"
        }
    };

    const availableLangs = Object.keys(window.translations);
    const langBtn = document.getElementById('langBtn'); // Кнопка в хедере (RU/GE/EN)
    const langToggle = document.getElementById('langToggle'); // Кнопка в оверлее (🌍 Полное название)

    // 🔴 ГЛОБАЛЬНАЯ ФУНКЦИЯ ПЕРЕВОДА ВСЕХ ЭЛЕМЕНТОВ (для динамического контента)
    // 
    // ЭТО КЛЮЧЕВОЕ ИЗМЕНЕНИЕ: В main.js есть вызов window.updateTranslations
    // 
    window.updateTranslations = (lang) => {
        const elements = document.querySelectorAll('[data-i18n]');
        const currentLang = window.translations[lang];

        if (!currentLang) return;

        elements.forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (currentLang[key]) {
                // ПРОВЕРКА: Если ключ - 'about_text', используем innerHTML для поддержки тега <br>
                if (key === 'about_text') {
                    el.innerHTML = currentLang[key];
                } else {
                    el.textContent = currentLang[key];
                }
            }
        });
        
        // Перевод плейсхолдера
        const placeholderElements = document.querySelectorAll('[data-i18n-placeholder]');
        placeholderElements.forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (currentLang[key]) {
                el.setAttribute('placeholder', currentLang[key]);
            }
        });
        
        // 🚀 НОВОЕ ИЗМЕНЕНИЕ: Если карусель инициализирована в main.js, обновляем ее
        if (typeof window.g_initializePopularCarousel === 'function') {
            window.g_initializePopularCarousel();
        }
    };

    // ФУНКЦИЯ УСТАНОВКИ ЯЗЫКА
    const setLanguage = (lang) => {
        if (!availableLangs.includes(lang)) {
            lang = 'ge';
        }

        window.currentLang = lang;
        localStorage.setItem('lang', lang);
        document.documentElement.setAttribute('lang', lang);
        
        // 🔴 Вызываем глобальную функцию перевода
        window.updateTranslations(lang);
        
        // 1. Обновление текста кнопки в хедере (RU/GE/EN)
        if (langBtn) {
            langBtn.textContent = lang.toUpperCase();
        }
        
        // 2. Обновление текста кнопки в оверлее (🌍 Полное название на текущем языке)
        const currentLangName = translatedLangNames[window.currentLang][window.currentLang];
        
        // 🔴 ИСПРАВЛЕНИЕ ЛОГИКИ: Кнопка оверлея должна показывать полное название ТЕКУЩЕГО языка
        if (langToggle && currentLangName) {
            langToggle.innerHTML = `🌍 ${currentLangName}`;
        }


        // Обновляем текст кнопки темы
        if (typeof window.updateThemeButtonText === 'function') {
            // ФИКС: Обеспечиваем, что updateThemeButtonText использует новый lang
            window.updateThemeButtonText();
        }
    };

    // НАЧАЛЬНАЯ ЗАГРУЗКА ЯЗЫКА
    let initialLang = localStorage.getItem('lang') || 'ge';
    setLanguage(initialLang);

    // ПЕРЕКЛЮЧЕНИЕ ЯЗЫКА
    const switchLanguage = () => {
        const currentLangIndex = availableLangs.indexOf(window.currentLang);
        const nextLangIndex = (currentLangIndex + 1) % availableLangs.length;
        const nextLang = availableLangs[nextLangIndex];
        setLanguage(nextLang);
    };

    if (langBtn) {
        langBtn.addEventListener('click', switchLanguage);
    }
    if (langToggle) {
        langToggle.addEventListener('click', switchLanguage);
    }
});