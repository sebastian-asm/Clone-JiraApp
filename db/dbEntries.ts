import { isValidObjectId } from 'mongoose';

import { db } from '.';
import { Entry, IEntry } from '../models';

export const getEntryById = async (id: string): Promise<IEntry | null> => {
  if (!isValidObjectId(id)) return null;

  await db.connect();
  // la opcion lean es para trabajar con menos opciones para no "saturar" la variable con mucha data
  const entry = await Entry.findById(id).lean();
  await db.disconnet();

  // retornar entrada de esta forma para no tener problemas con la serializacion de mongoose
  return JSON.parse(JSON.stringify(entry));
};
