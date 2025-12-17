import {getRequestConfig} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {headers} from 'next/headers';

const locales = ['en', 'ku', 'ar'];

export default getRequestConfig(async ({locale}) => {
  // If locale is not provided, try to get it from headers
  let actualLocale = locale;

  if (!actualLocale) {
    const headersList = await headers();
    const pathname = headersList.get('x-pathname') || '';
    const urlLocale = pathname.split('/')[1];

    if (urlLocale && locales.includes(urlLocale)) {
      actualLocale = urlLocale;
    } else {
      actualLocale = 'en'; // default
    }
  }

  if (!locales.includes(actualLocale as any)) {
    notFound();
  }

  return {
    locale: actualLocale,
    messages: (await import(`../../messages/${actualLocale}.json`)).default
  };
});
