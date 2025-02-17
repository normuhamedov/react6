import { useTranslation } from 'react-i18next';
import { useLanguage } from '../context/LanguageContext'; 
import { Link } from 'react-router';
import { useEffect } from 'react';

const Footer = () => {
  const { t, i18n } = useTranslation();
  const { language } = useLanguage(); 

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]); 

  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">{t("about_us")}</h3>
            <ul className="space-y-2">
              <li><Link to="/about">{t("title")}</Link></li>
              <li><Link to="/careers">{t("careers")}</Link></li>
              <li><Link to="/blog">{t("blog")}</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">{t("customer_service")}</h3>
            <ul className="space-y-2">
              <li><Link to="/contact">{t("contact_us")}</Link></li>
              <li><Link to="/faq">{t("faq")}</Link></li>
              <li><Link to="/shipping">{t("shipping_info")}</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">{t("my_account")}</h3>
            <ul className="space-y-2">
              <li><Link to="/profile">{t("my_profile")}</Link></li>
              <li><Link to="/orders">{t("orders")}</Link></li>
              <li><Link to="/wishlist">{t("wishlist")}</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">{t("connect_with_us")}</h3>
            <ul className="space-y-2">
              <li><a href="#">Facebook</a></li>
              <li><a href="#">Instagram</a></li>
              <li><a href="#">Telegram</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <p>&copy; {new Date().getFullYear()} Asaxiy. {t("all_rights_reserved")}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
