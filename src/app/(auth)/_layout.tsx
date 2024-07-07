import { Redirect, Slot, Stack } from 'expo-router';
import { useAuth } from '../../provider/AuthProvider';

export default function AuthLayout() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Redirect href="/profile" />;
  }

  return <Slot />;
}