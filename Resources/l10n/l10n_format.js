/*

Titanium L10N framework - Formatting functions

Copyright Igor Afanasyev <afan@mail.ru>

Version 1.0 - 2010-03-05

*/

//------------------------------------------------------------------------------
function plural(n, lang) {
//------------------------------------------------------------------------------

   // List of plural equations was taken from Pootle:
   // http://translate.sourceforge.net/wiki/pootle/index

  switch (lang) {
    case 'bo': // Tibetan
    case 'dz': // Dzongkha
    case 'fa': // Persian
    case 'id': // Indonesian
    case 'ja': // Japanese
    case 'ka': // Georgian
    case 'km': // Khmer
    case 'ko': // Korean
    case 'ms': // Malay
    case 'tr': // Turkish
    case 'vi': // Vietnamese
    case 'zh': // Chinese
      return 0;

    case 'af': // Afrikaans
    case 'az': // Azerbaijani
    case 'bg': // Bulgarian
    case 'bn': // Bengali
    case 'ca': // Catalan
    case 'da': // Danish
    case 'de': // German
    case 'el': // Greek
    case 'en': // English
    case 'eo': // Esperanto
    case 'et': // Estonian
    case 'eu': // Basque
    case 'fi': // Finnish
    case 'fo': // Faroese
    case 'fur': // Friulian
    case 'fy': // Frisian
    case 'gl': // Galician
    case 'gu': // Gujarati
    case 'he': // Hebrew
    case 'hi': // Hindi
    case 'hu': // Hungarian
    case 'is': // Icelandic
    case 'it': // Italian
    case 'ku': // Kurdish
    case 'lb': // Letzeburgesch
    case 'lg': // Ganda
    case 'ml': // Malayalam
    case 'mn': // Mongolian
    case 'mr': // Marathi
    case 'nah': // Nahuatl
    case 'nb': // Norwegian Bokmal
    case 'ne': // Nepali
    case 'nl': // Dutch
    case 'nn': // Norwegian Nynorsk
    case 'or': // Oriya
    case 'pa': // Punjabi
    case 'pap': // Papiamento
    case 'pt': // Portuguese
    case 'sq': // Albanian
    case 'st': // Sotho
    case 'sv': // Swedish
    case 'ta': // Tamil
    case 'tk': // Turkmen
    case 've': // Venda
    case 'wo': // Wolof
      return 0 + (n != 1);

    case 'fr': // French
    case 'mg': // Malagasy
    case 'nso': // Northern Sotho
    case 'pt-br': // Brazilian Portuguese
    case 'wa': // Walloon
      return 0 + (n > 1);
	  
    case 'cy': // Welsh
      return (n==2) ? 1 : 0;
      
    case 'ga': // Irish
      return n==1 ? 0 : n==2 ? 1 : 2;

    case 'cs': // Czech
      return (n==1) ? 0 : (n>=2 && n<=4) ? 1 : 2;
       
    case 'lt': // Lithuanian
      return (n%10==1 && n%100!=11 ? 0 : n%10>=2 && (n%100<10 || n%100>=20) ? 1 : 2);
      
    case 'lv': // Latvian
      return (n%10==1 && n%100!=11 ? 0 : n != 0 ? 1 : 2);
      
    case 'mt': // Maltese
      return (n==1 ? 0 : n==0 || ( n%100>1 && n%100<11) ? 1 : (n%100>10 && n%100<20 ) ? 2 : 3);
      
    case 'pl': // Polish
      return (n==1 ? 0 : n%10>=2 && n%10<=4 && (n%100<10 || n%100>=20) ? 1 : 2);
      
    case 'ro': // Romanian
      return (n==1 ? 0 : (n==0 || (n%100 > 0 && n%100 < 20)) ? 1 : 2);
      
    case 'sk': // Slovak
      return (n==1) ? 0 : (n>=2 && n<=4) ? 1 : 2;
      
    case 'sl': // Slovenian
      return (n%100==1 ? 0 : n%100==2 ? 1 : n%100==3 || n%100==4 ? 2 : 3);
	   
    case 'be': // Belarusian
    case 'bs': // Bosnian
    case 'hr': // Croatian
    case 'ru': // Russian
    case 'sr': // Serbian
    case 'uk': // Ukrainian
      return (n%10==1 && n%100!=11 ? 0 : n%10>=2 && n%10<=4 && (n%100<10 || n%100>=20) ? 1 : 2);

    default:
      return -1;
  } // switch
}

//------------------------------------------------------------------------------
function format(str, params, lang) {
//------------------------------------------------------------------------------
  if (!lang && (typeof(L10N) == "object")) {
    lang = L10N.LoadedLanguage;
  }

  return str.replace(/\{\$(\w[\w\d]*(:.+?)?)\}/g, function (s0, s1) {
    var arr = s1.split(/[:|]/);
    var value = params[arr[0]];
    if (arr.length == 1) {
      // simple case: just return the value

      return value;
    } else {
      // return appropriate string based on numeric value and locale-specific plural equation

      // getting plural from full language name
      var x = plural(value, lang);

      // getting plural from generic language name
      if ((x < 0) && lang) { x = plural(value, lang.split('-').shift()); }

      // by default, use the first plural form
      if (x < 0) { x = 0; }

      return arr[x + 1];
    }
  });
}