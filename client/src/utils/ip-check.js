const url = 'https://api.ipify.org?format=jsonp&callback=?';
const defaultIP = '0.0.0.0';
export async function fetchIP() {
  try {
    const response = await fetch(url);
    const body = await response.text();
    const ip = body.match(/(?<ip>\d+\.\d+\.\d+\.\d+)/);
    return ip.groups?.ip ?? defaultIP;
  } catch {
    return defaultIP;
  }
}
