export function getEnumValues(enumType: any) {
  var keys = Object.keys(enumType).filter(k => typeof enumType[k] === "number");
  var values = keys.map(k => enumType[k as any]);

  return values;
}
