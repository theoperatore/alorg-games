import * as React from 'react';

type User = {
  isLoggedIn: boolean;
  isLoading: boolean;
};

export function useUser() {
  const [user, setUser] = React.useState<User>({
    isLoggedIn: false,
    isLoading: true,
  });
  React.useEffect(() => {
    setUser(u => ({ ...u, isLoading: true }));
    fetch('/api/user').then(response => {
      if (response.status === 200) {
        setUser({ isLoggedIn: true, isLoading: false });
      } else {
        setUser({ isLoggedIn: false, isLoading: false });
      }
    });
  }, []);

  return user;
}
