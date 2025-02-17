import { useTranslation } from 'react-i18next';
import { useLanguage } from '../context/LanguageContext';
import { useEffect } from 'react';

const AboutPage = () => {
  const { t, i18n } = useTranslation();
  const { language } = useLanguage();

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{t("about_us")}</h1>
      <p className="text-lg mb-4">{t("about_description")}</p>
      
      <h2 className="text-2xl font-semibold mt-6">{t("our_mission")}</h2>
      <p className="text-lg">{t("mission_text")}</p>

      <h2 className="text-2xl font-semibold mt-6">{t("our_team")}</h2>
      <p className="text-lg">{t("team_text")}</p>
    </div>
  );
};

export default AboutPage;
