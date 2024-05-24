export function fixTranslate(i18nString) {
    const textFixed = i18nString?.match(/'([^']*)'/) ;
    return textFixed ? textFixed[1] : i18nString;
  }
  export function objectArrayCompare(array1,array2) 
  {
    return JSON.stringify(array1) === JSON.stringify(array2);  
  }