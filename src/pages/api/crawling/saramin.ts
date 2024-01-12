import axios from "axios";
import * as cheerio from "cheerio";
import { NextApiRequest, NextApiResponse } from "next";

export default async function saramin(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const {
      query: { page, job, career },
    } = req;

    const jobCodeConvert = () => {
      switch (job) {
        case "frontend":
          return 92;
        case "backend":
          return 84;
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

    const DOMAIN = "https://www.saramin.co.kr";
    const CAREER = careerCodeConvert();
    const JOB = jobCodeConvert();

    const { data: html } = await axios(
      `${DOMAIN}/zf_user/jobs/list/job-category?cat_kewd=${JOB}&exp_cd=${CAREER}&panel_type=&search_optional_item=y&search_done=y&panel_count=y&preview=y&page=${page}&sort=RD&page_count=20`,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        },
      }
    );

    const { data: totalHtml } = await axios(
      `${DOMAIN}/zf_user/jobs/list/job-category?cat_kewd=${JOB}&exp_cd=${CAREER}&panel_type=&search_optional_item=y&search_done=y&panel_count=y&preview=y&page=1&sort=RD&page_count=20`,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        },
      }
    );
    // page = 1 일 때만 total을 가져올수 있음
    const $total = cheerio.load(totalHtml);
    const $ = cheerio.load(html);

    const result = [] as object[];

    const total = $total(".total_count em").text().split(",").join("");

    $(".list_item").each((_, item) => {
      const id = $(item).attr("id");
      const title = $(item)
        .find(".notification_info .str_tit span")
        .text()
        .trim();
      const link =
        DOMAIN + $(item).find(".notification_info .str_tit").attr("href");
      const companyName = $(item).find(".company_nm .str_tit").text().trim();
      const companyLink =
        DOMAIN + $(item).find(".company_nm .str_tit").attr("href");
      const workPlace = $(item).find(".work_place").text();
      const career = $(item).find(".career").text();
      const education = $(item).find(".education").text();
      const deadLines = $(item).find(".deadlines").text();

      const etcArr = [] as string[];
      $(item)
        .find(".job_sector span")
        .each((_, item) => {
          etcArr.push($(item).text());
        });
      const etc = etcArr.join(", ");

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

    return res
      .setHeader("Access-Control-Allow-Origin", "*")
      .status(200)
      .json({ result, total });
  } catch (error) {
    return res.status(500).json(error);
  }
}
