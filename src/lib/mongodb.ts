import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI!;
let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!process.env.MONGODB_URI) {
  throw new Error('Debes definir MONGODB_URI en tu .env.local');
}

if (process.env.NODE_ENV === 'development') {
  // En desarrollo reutilizamos la conexión
  if (!(global as any)._mongoClientPromise) {
    client = new MongoClient(uri);
    (global as any)._mongoClientPromise = client.connect();
  }
  clientPromise = (global as any)._mongoClientPromise;
} else {
  // En producción
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export default clientPromise;

