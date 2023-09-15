import axios from "axios";
import * as cheerio from "cheerio";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const DOMAIN = "https://www.saramin.co.kr";

    const html = await axios(
      `${DOMAIN}/zf_user/jobs/list/job-category?cat_kewd=92&exp_cd=1&panel_type=&search_optional_item=y&search_done=y&panel_count=y&preview=y&page=1&sort=RD`
    );

    const $ = cheerio.load(html.data);

    const result = [] as object[];
    const titles = [] as string[];
    const hrefs = [] as string[];

    $(".job_tit .str_tit").each((_, item) => {
      titles.push(item.attribs.title);
      hrefs.push(item.attribs.href);
    });

    if (titles.length === hrefs.length) {
      for (let i = 0; i < titles.length; i++) {
        result.push({
          title: titles[i],
          href: `${DOMAIN}${hrefs[i]}`,
        });
      }
    }

    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
};
