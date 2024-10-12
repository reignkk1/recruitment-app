import axios from "axios";
import * as cheerio from "cheerio";
import { NextApiRequest, NextApiResponse } from "next";

export default async function jobkorea(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const {
      query: { page, job, career },
    } = req;
    const DOMAIN = "https://www.jobkorea.co.kr";

    const jobCodeConvert = () => {
      switch (job) {
        case "frontend":
          return "프론트엔드";
        case "backend":
          return "백엔드";
      }
    };
    const careerCodeConvert = () => {
      switch (career) {
        case "junior":
          return 1;
        case "senior":
          return 2;
      }
    };

    const CAREER = careerCodeConvert();
    const JOB = jobCodeConvert();

    const { data: html } = await axios(
      `${DOMAIN}/Search/?stext=${JOB}&careerType=${CAREER}&tabType=recruit&Page_No=${page}&ord=RegDtDesc`
    );

    const $ = cheerio.load(html);

    const result = [] as object[];
    const total = Number($(".util-total-count").attr("total-count"));

    $(".content-recruit .list .list-item").each((i, item) => {
      const id = $(item).attr("data-gino");
      const title = $(item).find(".information-title-link").text().trim();
      const link =
        DOMAIN + $(item).find(".information-title-link").attr("href");
      const companyName = $(item).find(".corp-name-link").text().trim();
      const companyLink = DOMAIN + $(item).find(".corp-name-link").attr("href");

      const career = $(item)
        .find(".chip-information-group > li:nth-child(1)")
        .text();
      const education = $(item)
        .find(".chip-information-group > li:nth-child(2)")
        .text();
      const workPlace = $(item)
        .find(`.chip-information-group > li:nth-child(4)`)
        .text();
      const deadLines = $(item)
        .find(".chip-information-group > li:nth-child(5)")
        .text();
      const etc = $(item).find(".chip-benefit-item").text();

      console.log(title);

      result.push({
        id,
        title,
        link,
        company: { name: companyName, link: companyLink },
        workPlace,
        education,
        etc,
        deadLines,
        career,
      });
    });

    return res
      .setHeader("Access-Control-Allow-Origin", "*")
      .status(200)
      .json({ result, total });
  } catch (error) {
    return res.status(500).json(error);
  }
}
