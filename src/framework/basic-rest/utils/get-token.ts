
export const getToken = () => {
  if (typeof window === undefined) {
    return null;
  }
  if (typeof window !== 'undefined') return window.localStorage.getItem('auth_token')
  
};
