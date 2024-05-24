import { register, init, getLocaleFromNavigator, locale } from 'svelte-i18n';

register('en', () => import('./lang/en.json'));
register('en-US', () => import('./lang/en.json'));
register('es', () => import('./lang/es.json'));
register('es-ES', () => import('./lang/es.json'));



init({
	fallbackLocale: 'es',
	initialLocale: getLocaleFromNavigator()
});



