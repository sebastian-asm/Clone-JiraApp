import type { NextApiRequest, NextApiResponse } from 'next';

import mongoose from 'mongoose';

import { db } from '../../../db';
import { Entry, IEntry } from '../../../models';

type Data = { menssage: string } | IEntry;

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {
  const { id } = req.query;

  try {
    if (!mongoose.isValidObjectId(id))
      throw new Error('El id de la entrada no es válido.');

    switch (req.method) {
      case 'PUT':
        return updatEntry(req, res);
      case 'GET':
        return getEntry(req, res);

      default:
        throw new Error('El método solicitado no existe.');
    }
  } catch (error) {
    // metodo 1 para capturar el error
    if (error instanceof Error) {
      res.status(400).json({
        menssage: error.message,
      });
    }
  }
}

const updatEntry = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  try {
    await db.connect();

    const updateEntry = await Entry.findById(id);
    if (!updateEntry) throw new Error('Error al realizar la actualización.');

    const {
      description = updateEntry.description,
      status = updateEntry.status,
    } = req.body;

    // runValidators verificara el enum especificado en el modelo
    const updateSuccess = await Entry.findByIdAndUpdate(
      id,
      { description, status },
      { runValidators: true, new: true }
    );

    res.json(updateSuccess);
  } catch (error) {
    // metodo 2
    res.status(400).json({
      message: (error as Error).message,
    });
  } finally {
    await db.disconnet();
  }
};

const getEntry = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  try {
    await db.connect();

    const entry = await Entry.findById(id);
    if (!entry) throw new Error('La entrada no existe.');

    res.json(entry);
  } catch (error) {
    res.status(400).json({
      message: (error as Error).message,
    });
  } finally {
    await db.disconnet();
  }
};
