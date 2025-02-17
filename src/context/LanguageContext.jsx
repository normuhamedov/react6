import { createContext, useContext, useState } from 'react'
import { toast } from 'react-toastify'

const LanguageContext = createContext()

export const useLanguage = () => useContext(LanguageContext)

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('uz')

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'uz' ? 'ru' : 'uz')
    if (language === 'uz') {
        toast('язык изменен', { style: { marginTop: '50px' } , autoClose: 2000 });
    }else{
        toast('til o`zgartirildi', { style: { marginTop: '50px' } , autoClose: 2000 });
    }
  }

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}