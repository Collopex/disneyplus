import { redirect } from 'next/navigation';
import getCurrentUser from './actions/getCurrentUser';

const Home = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return redirect('/auth');
  } else {
    return redirect('/home');
  }
};

export default Home;
