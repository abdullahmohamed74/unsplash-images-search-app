function useInitialDarkMode() {
  const prefersDarkMode = window.matchMedia(
    '(prefers-color-scheme: dark)'
  ).matches;

  // value from localStorage (got as boolean)
  const storedDarkMode = JSON.parse(localStorage.getItem('dark-theme'));

  return storedDarkMode || prefersDarkMode;
}
export default useInitialDarkMode;
