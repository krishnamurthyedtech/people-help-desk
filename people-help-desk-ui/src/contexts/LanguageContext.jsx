import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [selectedLanguage, setSelectedLanguage] = useState('english');

  const translations = {
    english: {
      // Common
      required: 'Required',
      optional: 'Optional',
      submit: 'Submit',
      cancel: 'Cancel',
      close: 'Close',
      
      // Signup Form
      signupTitle: 'Sign Up',
      name: 'Name',
      email: 'Email',
      password: 'Password',
      phone: 'Phone No',
      signupButton: 'Sign Up',
      signingUp: 'Signing Up...',
      signupSuccess: 'Signup successful! Your account has been created. Please login with your credentials.',
      fillAllFields: 'Please fill in all required fields.',
      validEmail: 'Please enter a valid email address.',
      passwordMinLength: 'Password must be at least 6 characters.',
      validPhone: 'Please enter a valid 10-digit phone number.',
      
      // Login Form
      loginTitle: 'Login',
      loginButton: 'Login',
      loggingIn: 'Logging in...',
      loginSuccess: 'Login successful!',
      loginFailed: 'Login failed. Please check your credentials.',
      
      // Help Form
      helpTitle: 'Help / Support',
      phoneNumber: 'Phone Number',
      subject: 'Subject',
      inquiryType: 'Inquiry Type',
      description: 'Description',
      phonePlaceholder: 'Enter your phone number',
      subjectPlaceholder: 'Enter your subject',
      inquiryTypePlaceholder: 'Select inquiry type',
      descriptionPlaceholder: 'Describe your inquiry in detail...',
      helpSuccess: 'Help request submitted successfully. We will contact you soon!',
      fillRequiredFields: 'Please fill in all required fields',
      
      // Language Dropdown
      language: 'Language',
      selectLanguage: 'Select Language'
    },
    telugu: {
      // Common
      required: 'తపాలసి',
      optional: 'ఐచ్చిసి',
      submit: 'సమర్చు',
      cancel: 'రద్చు',
      close: 'మూసు',
      
      // Signup Form
      signupTitle: 'సైన్ అప్',
      name: 'పేరు',
      email: 'ఇమెయిల్',
      password: 'పాస్వర్డ్',
      phone: 'ఫోన్ నంబర్',
      signupButton: 'సైన్ అప్',
      signingUp: 'సైన్ అప్ చేస్తోంది...',
      signupSuccess: 'సైన్ అప్ విజయవంతంగా పూర్తయింది! మీ ఖాతా సృష్టించబడింది. దయచేసి మీ ఆధారాలతో లాగిన్ అవ్వండి.',
      fillAllFields: 'దయచేసి అన్ని తపాలసిన ఫీల్డ్లను నింపండి.',
      validEmail: 'దయచేసి చెల్లుబాటు అయిన ఇమెయిల్ చిరునామాను నమోదు చేయండి.',
      passwordMinLength: 'పాస్వర్డ్ కనీసం 6 అక్షరాలు ఉండాలి.',
      validPhone: 'దయచేసి చెల్లుబాటు అయిన 10-అంకెల ఫోన్ నంబర్ను నమోదు చేయండి.',
      
      // Login Form
      loginTitle: 'లాగిన్',
      loginButton: 'లాగిన్',
      loggingIn: 'లాగిన్ చేస్తోంది...',
      loginSuccess: 'లాగిన్ విజయవంతంగా పూర్తయింది!',
      loginFailed: 'లాగిన్ విఫలమైంది. దయచేసి మీ ఆధారాలను తనిఖీ చేయండి.',
      
      // Help Form
      helpTitle: 'సహాయం / మద్దతు',
      phoneNumber: 'ఫోన్ నంబర్',
      subject: 'విషయం',
      inquiryType: 'అడగిం రకం',
      description: 'వివరణణ',
      phonePlaceholder: 'మీ ఫోన్ నంబర్ నపెట్ను',
      subjectPlaceholder: 'మీ విషయం నపెట్ను',
      inquiryTypePlaceholder: 'అడగిం రకం ఎంచుకోండండు',
      descriptionPlaceholder: 'మీ అడగిం గురం వివరణణ వివరణణండు...',
      helpSuccess: 'సహాయ అభ్యర్థన విజయవంతంగా సమర్పించబడింది. మేము త్వరలో మీకు సంప్రదిస్తాము!',
      fillRequiredFields: 'దయచేసి అన్ని తపాలసిన ఫీల్డ్లను నింపండి',
      
      // Language Dropdown
      language: 'భాష',
      selectLanguage: 'భాషను ఎంచుకోండి'
    },
    tamil: {
      // Common
      required: 'கட்டாய',
      optional: 'விருப்பது',
      submit: 'சமர்ப்பு',
      cancel: 'ரத்து',
      close: 'மூடு',
      
      // Signup Form
      signupTitle: 'பதிவு',
      name: 'பெயர்',
      email: 'மின்னஞ்சல்',
      password: 'கடவுச்சொல்',
      phone: 'தொலைப்பர் எண்',
      signupButton: 'பதிவு',
      signingUp: 'பதிவு செய்கிறது...',
      signupSuccess: 'பதிவு வெற்றிகரமாக முடிந்தது! உங்கள் கணக்கு உருவாக்கப்பட்டது. தயவுசெய்து உங்கள் சான்றுகளுடன் உள்நுழையவும்.',
      fillAllFields: 'தயவுசெய்து அனைத்து கட்டாய புலங்களையும் நிரப்பவும்.',
      validEmail: 'தயவுசெய்து செல்லுபடியான மின்னஞ்சல் முகவரியை உள்ளிடவும்.',
      passwordMinLength: 'கடவுச்சொல் குறைந்தது 6 எழுத்துக்கள் இருக்க வேண்டும்.',
      validPhone: 'தயவுசெய்து செல்லுபடியான 10-இலக்க தொலைப்பர் எண்ணை உள்ளிடவும்.',
      
      // Login Form
      loginTitle: 'உள்நுழை',
      loginButton: 'உள்நுழை',
      loggingIn: 'உள்நுழைகிறது...',
      loginSuccess: 'உள்நுழைவு வெற்றிகரமாக முடிந்தது!',
      loginFailed: 'உள்நுழைவு தோல்வியடைந்தது. தயவுசெய்து உங்கள் சான்றுகளைச் சரிபார்க்கவும்.',
      
      // Help Form
      helpTitle: 'உதவி / ஆதரவு',
      phoneNumber: 'தொலைப்பர் எண்',
      subject: 'பொருள்',
      inquiryType: 'விசாரம் வகை',
      description: 'விளக்கை',
      phonePlaceholder: 'உங்கள் தொலைப்பர் எண்ணை நுளு',
      subjectPlaceholder: 'உங்கள் பொருள் நுளு',
      inquiryTypePlaceholder: 'விசாரம் வகையை தேர்ந்து',
      descriptionPlaceholder: 'உங்கள் விசாரம் விளக்கையை விவரிப்பு...',
      helpSuccess: 'உதவி கோரிக்கை வெற்றிகரமாக சமர்ப்பிக்கப்பட்டது. நாங்கள் விரைவில் உங்களைத் தொடர்பு கொள்வோம்!',
      fillRequiredFields: 'தயவுசெய்து அனைத்து கட்டாய புலங்களையும் நிரப்பவும்',
      
      // Language Dropdown
      language: 'மொழி',
      selectLanguage: 'மொழியைத் தேர்வுசெய்யவும்'
    },
    kannada: {
      // Common
      required: 'ಅಗತ್ಯ',
      optional: 'ಐಚ್ಚಿಸಿ',
      submit: 'ಸಲ್ಮಿಸು',
      cancel: 'ರದ್ಸು',
      close: 'ಮುಚ್ಚು',
      
      // Signup Form
      signupTitle: 'ಸೈನ್ ಅಪ್',
      name: 'ಹೆಸರು',
      email: 'ಇಮೇಲ್',
      password: 'ಪಾಸ್ವರ್ಡ್',
      phone: 'ದೂರಭನ ಸಂಖ್ಯೆ',
      signupButton: 'ಸೈನ್ ಅಪ್',
      signingUp: 'ಸೈನ್ ಅಪ್ ಮಾಡುತ್ತಿದೆ...',
      signupSuccess: 'ಸೈನ್ ಅಪ್ ಯಶಸ್ವಿಯಾಗಿ ಪೂರ್ಣಗೊಂಡಿದೆ! ನಿಮ್ಮ ಖಾತೆ ರಚಿಸಲಾಗಿದೆ. ದಯವಿಟ್ಟು ನಿಮ್ಮ ಆಧಾರಗಳೊಂದಿಗೆ ಲಾಗಿನ್ ಆಗಿ.',
      fillAllFields: 'ದಯವಿಟ್ಟು ಎಲ್ಲಾ ಅಗತ್ಯ ಕ್ಷೇತ್ರಗಳನ್ನು ತುಂಬಿ.',
      validEmail: 'ದಯವಿಟ್ಟು ಮಾನ್ಯ ಇಮೇಲ್ ವಿಳಾಸವನ್ನು ನಮೂದಿಸಿ.',
      passwordMinLength: 'ಪಾಸ್ವರ್ಡ್ ಕನಿಷ್ಠ 6 ಅಕ್ಷರಗಳನ್ನು ಹೊಂದಿರಬೇಕು.',
      validPhone: 'ದಯವಿಟ್ಟು ಮಾನ್ಯ 10-ಅಂಕಿ ದೂರಭನ ಸಂಖ್ಯೆಯನ್ನು ನಮೂದಿಸಿ.',
      
      // Login Form
      loginTitle: 'ಲಾಗಿನ್',
      loginButton: 'ಲಾಗಿನ್',
      loggingIn: 'ಲಾಗಿನ್ ಮಾಡುತ್ತಿದೆ...',
      loginSuccess: 'ಲಾಗಿನ್ ಯಶಸ್ವಿಯಾಗಿ ಪೂರ್ಣಗೊಂಡಿದೆ!',
      loginFailed: 'ಲಾಗಿನ್ ವಿಫಲವಾಯಿತು. ದಯವಿಟ್ಟು ನಿಮ್ಮ ಆಧಾರಗಳನ್ನು ಪರಿಶೀಲಿಸಿ.',
      
      // Help Form
      helpTitle: 'ಸಹಾಯ / ಬೆಂಬಲ',
      phoneNumber: 'ದೂರಭನ ಸಂಖ್ಯೆ',
      subject: 'ವಿಷಯ',
      inquiryType: 'ಪ್ರಶ್ನ ಪ್ರಕೆ',
      description: 'ವಿವರಣಣೆ',
      phonePlaceholder: 'ನಿಮ್ಮ ದೂರಭನ ಸಂಖ್ಯೆ ನಮುವೆಸಿ',
      subjectPlaceholder: 'ನಿಮ್ಮ ವಿಷಯ ನಮುವೆಸಿ',
      inquiryTypePlaceholder: 'ಪ್ರಶ್ನ ಪ್ರಕೆ ಆಯ್ರಿಸು',
      descriptionPlaceholder: 'ನಿಮ್ಮ ಪ್ರಶ್ನ ಪ್ರಕೆ ಗುರಂ ವಿವರಣಣೆ ವಿವರಣಣಂಡು...',
      helpSuccess: 'ಸಹಾಯ ವಿನಂತಿ ಯಶಸ್ವಿಯಾಗಿ ಸಲ್ಲಿಸಲಾಗಿದೆ. ನಾವು ತ್ವರಲಿ ನಿಮಗೆ ಸಂಪರ್ಕಿಸುತ್ತೇವೆ!',
      fillRequiredFields: 'ದಯವಿಟ್ಟು ಎಲ್ಲಾ ಅಗತ್ಯ ಕ್ಷೇತ್ರಗಳನ್ನು ತುಂಬಿ',
      
      // Language Dropdown
      language: 'ಭಾಷೆ',
      selectLanguage: 'ಭಾಷೆಯನ್ನು ಆಯ್ರಿಸಿ'
    },
    malayalam: {
      // Common
      required: 'നിർരുകൽ',
      optional: 'ഓപ്ഷനാൽ',
      submit: 'സമർപ്പുക',
      cancel: 'റദ്ദുക',
      close: 'അടയ്ക്കുക',
      
      // Signup Form
      signupTitle: 'സൈൻ അപ്പ്',
      name: 'പേര്',
      email: 'ഇമെയിൽ',
      password: 'പാസ്വേഡ്',
      phone: 'ഫോൺൻൻ നമ്പർ',
      signupButton: 'സൈൻ അപ്പ്',
      signingUp: 'സൈൻ അപ്പ് ചെയ്യുന്നു...',
      signupSuccess: 'സൈൻ അപ്പ് വിജയകരമായി പൂർത്തിയായി! നിങ്കൾൾ അക്കൗണ്ട് സൃഷ്ടിച്ചു. ദയവ് ചെയ്ത് നിങ്കൾൾ ആധാരങ്ങളോടെ ലോഗിൻ ആകു.',
      fillAllFields: 'ദയവ് ചെയ്ത് എല്ലാ ആവശ്യമായ ഫീൽഡുകളും നിറയ്ക്കുക.',
      validEmail: 'ദയവ് ചെയ്ത് സാധുവായ ഇമെയിൽ വിലാസം നമ്പെട്ടുക.',
      passwordMinLength: 'പാസ്വേഡ് കുറഞ്ഞത് 6 അക്ഷരങ്ങൾ ഉണ്ടാകണം.',
      validPhone: 'ദയവ് ചെയ്ത് സാധുവായ 10-അക്ക ഫോൺൻൻ നമ്പർ നമ്പെട്ടുക.',
      
      // Login Form
      loginTitle: 'ലോഗിൻ',
      loginButton: 'ലോഗിൻ',
      loggingIn: 'ലോഗിൻ ചെയ്യുന്നു...',
      loginSuccess: 'ലോഗിൻ വിജയകരമായി പൂർത്തിയായി!',
      loginFailed: 'ലോഗിൻ പരാജയപ്പെട്ടു. ദയവ് ചെയ്ത് നിങ്കൾൾ ആധാരങ്ങൾ പരിശോധിക്കുക.',
      
      // Help Form
      helpTitle: 'സഹായം / പിന്തുണ',
      phoneNumber: 'ഫോൺൻൻ നമ്പർ',
      subject: 'വിഷയ',
      inquiryType: 'അന്വേരം തരം',
      description: 'വിവരണണ',
      phonePlaceholder: 'നിങ്കൾൾ ഫോൺൻൻ നമ്പർ നമ്പെട്ടുക',
      subjectPlaceholder: 'നിങ്കൾൾ വിഷയ നമ്പെട്ടുക',
      inquiryTypePlaceholder: 'അന്വേരം തരം തിരഞ്ഞുക',
      descriptionPlaceholder: 'നിങ്കൾൾ അന്വേരം വിവരണണ വിവരണണംഡു...',
      helpSuccess: 'സഹായ അഭ്യര്ഥന വിജയകരമായി സമർപ്പിച്ചു. ഞാൻ ത്വരലി നിങ്കൾൾ സമ്പർകിക്കും!',
      fillRequiredFields: 'ദയവ് ചെയ്ത് എല്ലാ ആവശ്യമായ ഫീൽഡുകളും നിറയ്ക്കുക',
      
      // Language Dropdown
      language: 'ഭാഷ',
      selectLanguage: 'ഭാഷ തിരഞ്ഞെടുക്കുക'
    },
    hindi: {
      // Common
      required: 'आवश्यक',
      optional: 'वैकल्पिक',
      submit: 'जमा करें',
      cancel: 'रद्द करें',
      close: 'बंद करें',
      
      // Signup Form
      signupTitle: 'साइन अप',
      name: 'नाम',
      email: 'ईमेल',
      password: 'पासवर्ड',
      phone: 'फोन नंबर',
      signupButton: 'साइन अप',
      signingUp: 'साइन अप हो रहा है...',
      signupSuccess: 'साइन अप सफलतापूर्वक पूरा हो गया! आपका खाता बनाया गया है। कृपया अपने क्रेडेंशियल्स से लॉग इन करें।',
      fillAllFields: 'कृपया सभी आवश्यक फ़ील्ड भरें।',
      validEmail: 'कृपया एक मान्य ईमेल पता दर्ज करें।',
      passwordMinLength: 'पासवर्ड कम से कम 6 अक्षरों का होना चाहिए।',
      validPhone: 'कृपया एक मान्य 10-अंकीय फोन नंबर दर्ज करें।',
      
      // Login Form
      loginTitle: 'लॉग इन',
      loginButton: 'लॉग इन',
      loggingIn: 'लॉग इन हो रहा है...',
      loginSuccess: 'लॉग इन सफलतापूर्वक पूरा हो गया!',
      loginFailed: 'लॉग इन विफल हो गया। कृपया अपने क्रेडेंशियल्स की जांच करें।',
      
      // Help Form
      helpTitle: 'सहायता / समर्थन',
      phoneNumber: 'फोन नंबर',
      subject: 'विषय',
      inquiryType: 'प्रश्नार प्रकार',
      description: 'विवरण',
      phonePlaceholder: 'अपना फोन नंबर दर्ज करें',
      subjectPlaceholder: 'अपना विषय दर्ज करें',
      inquiryTypePlaceholder: 'प्रश्नार प्रकार चुनें',
      descriptionPlaceholder: 'अपनी पूछति विस्तारित रूप से बताएं...',
      helpSuccess: 'सहायता अनुरोध सफलतापूर्वक जमा किया गया। हम जल्द ही आपसे संपर्क करेंगे!',
      fillRequiredFields: 'कृपया सभी आवश्यक फ़ील्ड भरें',
      
      // Language Dropdown
      language: 'भाषा',
      selectLanguage: 'भाषा चुनें'
    }
  };

  const t = (key) => {
    return translations[selectedLanguage][key] || translations.english[key] || key;
  };

  const changeLanguage = (language) => {
    setSelectedLanguage(language);
  };

  return (
    <LanguageContext.Provider value={{ selectedLanguage, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageContext;
