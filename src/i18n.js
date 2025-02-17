import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    uz: {
      translation: {
        "title": "Biz haqimizda",
        "about_us": "Biz haqimizda",
        "about_description": "Biz mijozlarga eng yaxshi xizmatni taqdim etish maqsadida ishlaymiz.",
        "our_mission": "Bizning maqsadimiz",
        "mission_text": "Dunyo bo‘ylab eng sifatli mahsulotlarni taqdim etish.",
        "our_team": "Bizning jamoamiz",
        "team_text": "Bizning jamoa a'zolarimiz turli sohalarda mutaxassisdir.",
        
        "careers": "Karyera",
        "blog": "Blog",
        "customer_service": "Mijozlarga xizmat",
        "contact_us": "Biz bilan bog'laning",
        "faq": "FAQ",
        "shipping_info": "Yetkazib berish haqida",
        "my_account": "Mening hisobim",
        "my_profile": "Mening profilim",
        "orders": "Buyurtmalar",
        "wishlist": "Saralanganlar",
        "connect_with_us": "Biz bilan bog‘laning",
        "all_rights_reserved": "Barcha huquqlar himoyalangan."
      }
    },
    ru: {
      translation: {
        "title": "О нас",
        "about_us": "О нас",
        "about_description": "Мы работаем для того, чтобы предоставить нашим клиентам лучший сервис.",
        "our_mission": "Наша миссия",
        "mission_text": "Предоставлять самые качественные продукты по всему миру.",
        "our_team": "Наша команда",
        "team_text": "Члены нашей команды являются экспертами в различных областях.",

        "careers": "Карьера",
        "blog": "Блог",
        "customer_service": "Обслуживание клиентов",
        "contact_us": "Свяжитесь с нами",
        "faq": "Частые вопросы",
        "shipping_info": "Информация о доставке",
        "my_account": "Мой аккаунт",
        "my_profile": "Мой профиль",
        "orders": "Заказы",
        "wishlist": "Избранное",
        "connect_with_us": "Свяжитесь с нами",
        "all_rights_reserved": "Все права защищены."
      }
    }
  },
  lng: "uz", // Boshlang'ich til
  fallbackLng: "uz",
  interpolation: {
    escapeValue: false
  }
});

export default i18n;
