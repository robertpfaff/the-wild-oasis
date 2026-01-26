import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login as loginApi } from '../../services/apiAuth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isPending } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      queryClient.setQueryData(['user'], user.user);
      console.log('LOGIN SUCCESS', user);
      navigate('/dashboard', { replace: true });
    },
    onError: (err) => {
      console.log('LOGINERROR', err);
      toast.error('Please try again. Email or password are incorrect');
    },
  });

  return { login, isPending };
}

export default useLogin;