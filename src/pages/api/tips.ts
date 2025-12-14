import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@/lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const client = await clientPromise;
    const db = client.db('vtec');
    const tips = await db.collection('tips').find({}).sort({ date: -1 }).toArray();
    res.status(200).json({ data: tips }); // nota: envuelvo en { data: tips }
  } catch (error) {
    console.error('Error en /api/tips:', error);
    res.status(500).json({ message: 'Error al cargar los tips' });
  }
}
