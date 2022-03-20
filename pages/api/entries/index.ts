import type { NextApiRequest, NextApiResponse } from 'next';

import { db } from '../../../db';
import { Entry, IEntry } from '../../../models';

type Data = {
  ok: boolean;
  message: string;
  entries?: IEntry[];
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case 'GET':
      return getEntries(res);

    default:
      return res.status(400).json({
        ok: false,
        message: 'El método solicitado no existe.',
      });
  }
}

const getEntries = async (res: NextApiResponse<Data>) => {
  await db.connect();
  const entries = await Entry.find().sort({ createdAt: 'ascending' });
  await db.disconnet();

  res.json({
    ok: true,
    message: 'Listado de todas las entradas.',
    entries,
  });
};
