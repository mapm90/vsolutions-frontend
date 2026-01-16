import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI!;
let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!process.env.MONGODB_URI) {
  throw new Error("Debes definir MONGODB_URI en tu .env.local");
}

declare global {
  // Extiende el tipo global para incluir _mongoClientPromise
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (process.env.NODE_ENV === "development") {
  // En desarrollo reutilizamos la conexión
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // En producción
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export default clientPromise;
