// To prevent the path that have no or invalid locale and redirect to default locale.

import { redirect } from 'next/navigation';

const NotFoundRoot = () => {
  redirect('/');
};

export default NotFoundRoot;
