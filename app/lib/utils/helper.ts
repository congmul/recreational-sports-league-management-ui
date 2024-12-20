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
  if (typeof document === 'undefined') {
    return null; // Return null during SSR
  }
    const cookieArr =  document.cookie.split(';');
    for (const cookie of cookieArr) {
      const [key, value] = cookie.trim().split('=');
      if (key === name) {
        return value;
      }
    }
    return null;
}

export function hslToHex(h:number, s:number, l:number) {
  s /= 100;
  l /= 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs((h / 60) % 2 - 1));
  const m = l - c / 2;

  let r = 0, g = 0, b = 0;

  if (h >= 0 && h < 60) {
    r = c; g = x; b = 0;
  } else if (h >= 60 && h < 120) {
    r = x; g = c; b = 0;
  } else if (h >= 120 && h < 180) {
    r = 0; g = c; b = x;
  } else if (h >= 180 && h < 240) {
    r = 0; g = x; b = c;
  } else if (h >= 240 && h < 300) {
    r = x; g = 0; b = c;
  } else if (h >= 300 && h < 360) {
    r = c; g = 0; b = x;
  }

  // Convert to 0-255 and add m
  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  // Convert to HEX
  const toHex = (value: number) => value.toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

export function hexToHsl(hex: string) {
  // Remove "#" if present
  hex = hex.replace("#", "");

  // Convert HEX to RGB
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;

  // Find max, min, and delta
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;

  // Calculate lightness
  let h = 0;
  const l = (max + min) / 2;

  // Calculate saturation
  const s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

  // Calculate hue
  if (delta !== 0) {
    if (max === r) {
      h = ((g - b) / delta + (g < b ? 6 : 0)) * 60;
    } else if (max === g) {
      h = ((b - r) / delta + 2) * 60;
    } else if (max === b) {
      h = ((r - g) / delta + 4) * 60;
    }
  }

  h = Math.round(h);
  const sPercent = Math.round(s * 100);
  const lPercent = Math.round(l * 100);

  return `hsl(${h}, ${sPercent}%, ${lPercent}%)`;
}


export function fileToDataUrl(file: File) {
	return new Promise<string>((resolve, reject) => {
		const reader = new FileReader()
		reader.onload = () => resolve(reader.result as string)
		reader.onerror = reject
		reader.readAsDataURL(file)
	})
}