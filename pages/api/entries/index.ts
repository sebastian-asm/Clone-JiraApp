import type { NextApiRequest, NextApiResponse } from 'next';

import { db } from '../../../db';
import { Entry, IEntry } from '../../../models';

type Data = { message: string } | IEntry[] | IEntry;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case 'GET':
      return getEntries(res);
    case 'POST':
      return addEntry(req, res);

    default:
      return res.status(400).json({
        message: 'El método solicitado no existe.',
      });
  }
}

const getEntries = async (res: NextApiResponse<Data>) => {
  await db.connect();
  const entries = await Entry.find().sort({ createdAt: 'ascending' });
  await db.disconnet();

  res.json(entries);
};

const addEntry = async (req: NextApiRequest, res: NextApiResponse) => {
  const { description = '' } = req.body;
  const newEntry = new Entry({
    description,
    createdAt: Date.now(),
  });

  try {
    await db.connect();
    await newEntry.save();

    res.status(201).json(newEntry);
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  } finally {
    await db.disconnet();
  }
};
