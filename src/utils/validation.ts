export function isInvalidObject(data: object): boolean {
  return Object.entries(data).some(([_key, value]) => (typeof value === "string" ? value === "" : false));
}
