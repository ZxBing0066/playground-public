import { NextApiRequest, NextApiResponse } from 'next';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    await sleep(2000 - req.body.index * 300);
    res.status(200).json({ index: req.body.index });
}

export default handler;