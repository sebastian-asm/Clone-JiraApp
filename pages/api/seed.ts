import type { NextApiRequest, NextApiResponse } from 'next';

import { db, seedData } from '../../db';
import { Entry } from '../../models';

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (process.env.NODE_ENV === 'production') {
    return res.status(401).json({
      message: 'Esta API no esta disponible en producción.',
    });
  }

  await db.connect();
  // en este punto es donde se interactua con la db
  await Entry.deleteMany();
  await Entry.insertMany(seedData.entries);
  await db.disconnet();

  res.status(201).json({
    message: 'Se insertaron los datos de prueba exitosamente.',
  });
}
