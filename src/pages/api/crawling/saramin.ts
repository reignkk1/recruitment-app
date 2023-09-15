import axios from "axios";
import * as cheerio from "cheerio";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { html } = await axios(
    "https://www.saramin.co.kr/zf_user/jobs/list/job-category?cat_kewd=92&exp_cd=1&panel_type=&search_optional_item=y&search_done=y&panel_count=y&preview=y&page=1&sort=RD"
  );

  const $ = cheerio.load(html);

  const data = [] as any;

  $(".str_tit").each((_, item) => {
    data.titles.push(item.attribs.title);
    data.href.push(item.attribs.href);
  });

  return res.status(200).json([{ title, href }]);
};

// 데이터 다듬기
