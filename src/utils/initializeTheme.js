export function getThemeInitScript(config) {
  return `
    (function() {
      try {
        const root = document.documentElement;
        const defaultTheme = 'system';
        
        // Set defaults from config
        const config = ${JSON.stringify(config)};
        
        // Apply default values
        Object.entries(config).forEach(([key, value]) => {
          root.setAttribute('data-' + key, value);
        });
        
        // Resolve theme
        const resolveTheme = (themeValue) => {
          if (!themeValue || themeValue === 'system') {
            return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
          }
          return themeValue;
        };
        
        // Apply saved theme
        const savedTheme = localStorage.getItem('data-theme');
        const resolvedTheme = resolveTheme(savedTheme);
        root.setAttribute('data-theme', resolvedTheme);
        
        // Apply any saved style overrides
        const styleKeys = Object.keys(config);
        styleKeys.forEach(key => {
          const value = localStorage.getItem('data-' + key);
          if (value) {
            root.setAttribute('data-' + key, value);
          }
        });
      } catch (e) {
        console.error('Failed to initialize theme:', e);
        document.documentElement.setAttribute('data-theme', 'dark');
      }
    })();
  `;
}
