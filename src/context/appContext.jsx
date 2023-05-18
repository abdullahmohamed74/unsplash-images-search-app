import { createContext, useEffect, useState } from 'react';
import useInitialDarkMode from '../hooks/useInitialDarkMode';

const AppContext = createContext();

function Provider({ children }) {
  const [isDarkTheme, setIsDarkTheme] = useState(useInitialDarkMode());
  const [searchTerm, setSearchTerm] = useState('cat');

  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme;
    setIsDarkTheme(newDarkTheme);
    // store the current value in the localStorage
    localStorage.setItem('dark-theme', JSON.stringify(newDarkTheme));

    // toggling dark mode class in body element
    // document.body.classList.toggle('dark-theme', newDarkTheme);
  };

  // apply dark mode in the initial render if the browser mode is dark
  // also toggle "dark-theme" with each click on the butto that change "isDarkTheme" state
  useEffect(() => {
    document.body.classList.toggle('dark-theme', isDarkTheme);
  }, [isDarkTheme]);

  return (
    <AppContext.Provider
      value={{ isDarkTheme, toggleDarkTheme, searchTerm, setSearchTerm }}
    >
      {children}
    </AppContext.Provider>
  );
}

export { Provider };
export default AppContext;
