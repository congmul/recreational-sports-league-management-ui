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