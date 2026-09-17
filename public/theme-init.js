(function () {
  try {
    // 1. Check if the user has a saved preference in localStorage
    var stored = window.localStorage.getItem('theme');
    var mode = (stored === 'light' || stored === 'dark' || stored === 'auto') ? stored : 'auto';
    
    // 2. Check the operating system's default preference
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // 3. Determine the final theme to display
    var resolved = mode === 'auto' ? (prefersDark ? 'dark' : 'light') : mode;
    
    // 4. Apply the theme to the <html> tag
    var root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(resolved);
    
    // 5. Update data-theme attribute (often used by CSS frameworks)
    if (mode === 'auto') {
      root.removeAttribute('data-theme');
    } else {
      root.setAttribute('data-theme', mode);
    }
    
    // 6. Tell the browser's native UI (scrollbars, etc.) which theme to use
    root.style.colorScheme = resolved;
  } catch (e) {
    // Fail silently if localStorage is blocked (e.g., in incognito mode)
  }
})();