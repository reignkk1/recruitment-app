import axios from "axios";
import * as cheerio from "cheerio";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const DOMAIN = "https://www.saramin.co.kr";

    const { data: html } = await axios(
      `${DOMAIN}/zf_user/jobs/list/job-category?cat_kewd=92&exp_cd=1&panel_type=&search_optional_item=y&search_done=y&panel_count=y&preview=y&page=1&sort=RD`
    );

    const $ = cheerio.load(html);

    const result = [] as object[];

    $(".box_item").each((_, item) => {
      const title = $(item).find(".notification_info .str_tit span").text();
      const link =
        DOMAIN + $(item).find(".notification_info .str_tit").attr("href");
      const companyName = $(item).find(".company_nm .str_tit").text().trim();
      const companyLink =
        DOMAIN + $(item).find(".company_nm .str_tit").attr("href");
      const workPlace = $(item).find(".work_place").text();
      const career = $(item).find(".career").text();
      const education = $(item).find(".education").text();
      const deadLines = $(item).find(".deadlines").text();

      result.push({
        title,
        link,
        company: { name: companyName, link: companyLink },
        workPlace,
        career,
        education,
        deadLines,
      });
    });

    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
};
