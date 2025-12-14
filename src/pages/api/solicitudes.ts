// src/pages/api/solicitudes.ts
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

  // Responde a preflight requests
  if (req.method === 'OPTIONS') {
    console.log('[SOLICITUDES] Preflight OPTIONS');
    return res.status(200).end();
  }

  console.log(`[SOLICITUDES] Método recibido: ${req.method}`);
  console.log('[SOLICITUDES] Body recibido:', req.body);

  try {
    const client = await clientPromise;
    const db = client.db('vtec');

    if (req.method === 'POST') {
      const { nombre, telefono, correo, descripcion, servicio } = req.body;

      // Validación
      if (!nombre || !telefono || !correo || !descripcion || !servicio) {
        console.warn('[SOLICITUDES] Datos faltantes:', req.body);
        return res.status(400).json({ message: 'Faltan datos requeridos' });
      }

      const nuevaSolicitud = {
        nombre,
        telefono,
        correo,
        descripcion,
        servicio,
        fecha: new Date(),
      };

      // Inserción en MongoDB
      const result = await db.collection('solicitudes').insertOne(nuevaSolicitud);
      console.log('[SOLICITUDES] Inserción exitosa, ID:', result.insertedId.toString());

      return res.status(201).json({ message: 'Solicitud enviada', id: result.insertedId.toString() });
    } else {
      console.error('[SOLICITUDES] Método no permitido:', req.method);
      return res.status(405).json({ message: 'Método no permitido' });
    }
  } catch (error: any) {
    console.error('[SOLICITUDES] Error al procesar la solicitud:', error);
    return res.status(500).json({ message: 'Error al enviar la solicitud', error: error.message });
  }
}
