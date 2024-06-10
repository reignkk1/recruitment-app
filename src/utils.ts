// 영어를 한글로 한글을 영어로 바꾸는 유틸스

export const convertJobString = (job: string | string[]) => {
  if (job === "frontend") {
    return "프론트엔드";
  } else if (job === "프론트엔드") {
    return "frontend";
  } else if (job === "backend") {
    return "백엔드";
  } else if (job === "백엔드") {
    return "backend";
  } else {
    return "알수없음";
  }
};

export const convertSiteString = (site: string | string[]) => {
  if (site === "saramin") {
    return "사람인";
  } else if (site === "사람인") {
    return "saramin";
  } else if (site === "jobkorea") {
    return "잡코리아";
  } else if (site === "잡코리아") {
    return "jobkorea";
  } else {
    return "알수없음";
  }
};

export const convertCareerString = (career: string | string[]) => {
  if (career === "junior") {
    return "주니어";
  } else if (career === "주니어") {
    return "junior";
  } else if (career === "시니어") {
    return "senior";
  } else if (career === "senior") {
    return "시니어";
  } else {
    return "알수없음";
  }
};

export function getKeyRelevantValue(
  object: object,
  value: string | boolean | number
) {
  const valueIndex = Object.values(object).findIndex((v) => v === value);
  const key = Object.keys(object)[valueIndex];

  return key;
}
