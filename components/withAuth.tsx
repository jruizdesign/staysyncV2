'use client';

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const withAuth = (WrappedComponent: React.ComponentType, allowedRoles: string[]) => {
  const AuthComponent = (props: any) => {
    const [user, loading] = useAuthState(auth);
    const [userRole, setUserRole] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
      const checkAuth = async () => {
        if (!loading) {
          if (!user) {
            router.push('/login');
            return;
          }

          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            const role = userData.role;
            setUserRole(role);

            if (!allowedRoles.includes(role)) {
              router.push('/staff-login');
            }
          } else {
            router.push('/login');
          }
        }
      };

      checkAuth();
    }, [user, loading, router]);

    if (loading || !userRole || !allowedRoles.includes(userRole)) {
      return <div>Loading...</div>; // Or a proper loading spinner
    }

    return <WrappedComponent {...props} />;
  };

  AuthComponent.displayName = `WithAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return AuthComponent;
};

export default withAuth;
