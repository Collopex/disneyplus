import axios from 'axios';
import useSWR from 'swr';

const useProfiles = () => {
  const fetchProfiles = async () => {
    try {
      const response = await axios.get('/api/profiles');
      return response.data;
    } catch (error) {
      throw new Error('Error loading profiles');
    }
  };

  const { data, error, mutate, isLoading } = useSWR(
    '/api/profiles',
    fetchProfiles,
    {
      revalidateOnFocus: false,
    }
  );

  const updateProfile = async (profileId: string, newData: any) => {
    try {
      const response = await axios.put(`/api/profiles/${profileId}`, newData);
      return response.data;
    } catch (error) {
      throw new Error('Error updating profile');
    }
  };

  const deleteProfile = async (profileId: string) => {
    try {
      const response = await axios.delete(`/api/profiles/${profileId}`);
      return response.data;
    } catch (error) {
      throw new Error('Error deleting profile');
    }
  };

  const selectedProfile = async (data: any) => {
    try {
      const response = await axios.put('/api/profiles/selected', data);
      mutate();
      return response.data;
    } catch (error) {
      throw new Error('Error while updating selected profile');
    }
  };

  return {
    data,
    error,
    mutate,
    updateProfile,
    deleteProfile,
    selectedProfile,
    isLoading,
  };
};

export default useProfiles;
