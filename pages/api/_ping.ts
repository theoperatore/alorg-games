import { NextApiRequest, NextApiResponse } from 'next';

export default function HealthCheck(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).end();
}
