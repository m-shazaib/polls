import { Redirect, Slot } from 'expo-router';
import { useAuth } from '../../provider/AuthProvider';

export default function ProtectedLayout() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Redirect href="/login" />;
  }

  return <Slot />;
}
