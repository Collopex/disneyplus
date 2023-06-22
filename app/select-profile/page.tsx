import { redirect } from 'next/navigation';
import getCurrentUser from '../actions/getCurrentUser';
import SelectProfileClient from './SelectProfileClient';

const SelectProfilePage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) redirect('/login');

  return <SelectProfileClient />;
};

export default SelectProfilePage;
