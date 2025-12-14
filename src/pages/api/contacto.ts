// pages/api/contacto.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@/lib/mongodb';

type ResponseData = {
  message: string;
  id?: string;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  // === CORS ===
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    if (req.method === 'POST') {
      const { nombre, telefono, correo, asunto, mensaje } = req.body;

      console.log('REQ.BODY:', req.body); // log de depuración

      if (!nombre || !correo || !asunto || !mensaje) {
        return res.status(400).json({ message: 'Faltan datos requeridos' });
      }

      const client = await clientPromise;
      const db = client.db('vtec');

      const nuevoContacto = {
        nombre,
        telefono: telefono || '',
        correo,
        asunto,
        mensaje,
        fecha: new Date(),
      };

      const result = await db.collection('contacto').insertOne(nuevoContacto);
      console.log('Contacto insertado con ID:', result.insertedId.toString());

      return res.status(201).json({ message: 'Mensaje enviado', id: result.insertedId.toString() });
    } else {
      return res.status(405).json({ message: 'Método no permitido' });
    }
  } catch (error: any) {
    console.error('Error en /api/contacto:', error);
    return res.status(500).json({ message: 'Error al enviar el mensaje', error: error.message });
  }
}
