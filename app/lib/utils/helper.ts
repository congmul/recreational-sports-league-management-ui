export function darkenColor(hex: string, percent: number): string {
    const num = parseInt(hex.slice(1), 16);
    let r = (num >> 16) - Math.round((num >> 16) * percent / 100);
    let g = ((num >> 8) & 0x00FF) - Math.round(((num >> 8) & 0x00FF) * percent / 100);
    let b = (num & 0x0000FF) - Math.round((num & 0x0000FF) * percent / 100);
  
    r = Math.max(0, r);
    g = Math.max(0, g);
    b = Math.max(0, b);
  
    return `#${(r << 16 | g << 8 | b).toString(16).padStart(6, '0')}`;
}

export function capitalizeFirstLetter(text: string): string {
    if (!text) return '';
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

// To store data in Cookie for Client Side
export function setCookie(name: string, value: string, days: number) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000); // Days to milliseconds
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value}; ${expires}; path=/`;
}

export function getCookie(name: string) {
    const cookieArr = document.cookie.split(';');
    for (let cookie of cookieArr) {
      const [key, value] = cookie.trim().split('=');
      if (key === name) {
        return value;
      }
    }
    return null;
}