import type { NextApiRequest, NextApiResponse } from 'next';

import { db } from '../../db';

type Data = {
  ok: boolean;
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (process.env.NODE_ENV === 'production') {
    return res
      .status(401)
      .json({
        ok: false,
        message: 'Esta API no esta disponible en producción.',
      });
  }

  await db.connect();
  await db.disconnet();

  res.json({
    ok: true,
    message: 'Conexión exitosa a la base de datos.',
  });
}
