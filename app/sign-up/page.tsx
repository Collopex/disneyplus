import getCurrentUser from '../actions/getCurrentUser';
import SignupClient from './SignupClient';
import { redirect } from 'next/navigation';

const SignupPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <SignupClient />;
  } else {
    return redirect('/select-profile');
  }
};

export default SignupPage;
