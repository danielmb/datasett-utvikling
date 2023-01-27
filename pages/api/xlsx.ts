import type { NextApiRequest, NextApiResponse } from 'next';
import { xlsxToSurveys } from '../../lib/xlsx-to-survey';

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  // Next.js API route support: https://nextjs.org/docs/api-routes/introduction
  let xlsxRes = xlsxToSurveys('Evaluering.xlsx');
  res.status(200).json(xlsxRes);
}
