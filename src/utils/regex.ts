export const REGEX_USER = /^[a-zA-Z0-9\s]*$/gm;
export const REGEX_PASSWORD = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[_\W]).{6,}$/gm;
export const REGEX_NAME = /^[a-zA-ZÀ-ÿ\u00f1\u00d1 ]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1 ]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1 ]+$/gm;
export const REGEX_EMAIL = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;
export const REGEX_NAMES_GENERAL = /^[\w\d\s()\-_"#%&!¿?|°áéíóúÁÉÍÓÚüÜñÑ.,]+$/gm;
export const REGEX_NAMES_QUESTION = /^[\w\d\s()\-_"#%&!¿?|°áéíóúÁÉÍÓÚüÜñÑ.,:;<>«»]+$/gm;