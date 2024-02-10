export function changeTheme(selectedTheme) {
    localStorage.setItem('theme', selectedTheme);
    document.body.className = '';
    document.documentElement.setAttribute('data-bs-theme', selectedTheme);
  }