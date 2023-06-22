import { redirect } from 'next/navigation';
import getCurrentUser from '../actions/getCurrentUser';
import HomeClient from './HomeClient';

const HomePage = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return redirect('/auth');
  }
  return <HomeClient />;
};

export default HomePage;
