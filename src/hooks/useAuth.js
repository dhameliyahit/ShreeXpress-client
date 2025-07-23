const useAuth = () => {
  const token = localStorage.getItem("Authorization");
  const user = JSON.parse(localStorage.getItem("user"));
  return { token, user };
};

export default useAuth;