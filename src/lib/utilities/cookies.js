const cookieTimeLife = 60 * 60 * 24;

    export function setToken(token) {
    document.cookie = `token=${token}; max-age=${cookieTimeLife}; path=/; secure; samesite=strict`;
  }
  
  export function deleteToken() {
    document.cookie = `token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; secure; samesite=strict`;
  }

  export function getToken() {
    const token = document.cookie.match('(^|;)\\s*token\\s*=\\s*([^;]+)');
    return token ? token[2] : null;
  }

  export function setRole(role) {
    document.cookie = `role=${role}; max-age=${cookieTimeLife}; path=/; secure; samesite=strict`;
  }

  export function getRole() {
    const role = document.cookie.match('(^|;)\\s*role\\s*=\\s*([^;]+)');
    return role ? role[2] : null;
  }
