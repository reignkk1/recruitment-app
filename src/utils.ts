// 객체에서 인자로 들어온 value 값을 찾아서 key를 리턴해줌
export function getKeyRelevantValue(
  object: object,
  value: string | boolean | number
) {
  const valueIndex = Object.values(object).findIndex((v) => v === value);
  const key = Object.keys(object)[valueIndex];

  return key;
}

export function getActiveSection(path: string) {
  if (path === "/") {
    return "home";
  } else if (path.startsWith("/saramin")) {
    return "saramin";
  } else if (path.startsWith("/jobkorea")) {
    return "jobkorea";
  } else {
    return "unknown";
  }
}
