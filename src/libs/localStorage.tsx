const AUTH_TOKEN = "AUTH_TOKEN";

export class LocalStorage {
  static set(name: string, value: any) {
    window.localStorage.setItem(name, JSON.stringify(value));
  }
  static get(name: string): string {
    const value = window.localStorage.getItem(name);

    return value ? JSON.parse(value) : "";
  }

  static token(): string {
    return this.get(AUTH_TOKEN);
  }
  static set_token(value: string) {
    this.set(AUTH_TOKEN, value);
  }
}