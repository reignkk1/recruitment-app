import axios from "axios";
import * as cheerio from "cheerio";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const DOMAIN = "https://www.jobkorea.co.kr";

    const { data: html } = await axios(
      `${DOMAIN}/Search/?stext=프론트엔드&careerType=1&tabType=recruit&Page_No=1&Ord=RegDtDesc`
    );

    const $ = cheerio.load(html);

    const result = [] as object[];

    $(".list-default .list-post").each((_, item) => {
      const id = $(item).attr("data-gino");
      const title = $(item).find(".title").text().trim();
      const link = DOMAIN + $(item).find(".title").attr("href");
      const companyName = $(item).find(".name").text().trim();
      const companyLink = DOMAIN + $(item).find(".name").attr("href");
      const workPlace = $(item).find(".long").text();
      const career = $(item).find(".exp").text();
      const education = $(item).find(".edu").text();
      const deadLines = $(item).find(".date").text();
      const etc = $(item).find(".etc").text();

      result.push({
        id,
        title,
        link,
        company: { name: companyName, link: companyLink },
        workPlace,
        career,
        education,
        etc,
        deadLines,
      });
    });

    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
};
