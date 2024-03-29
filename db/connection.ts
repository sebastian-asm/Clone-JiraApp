import mongoose from 'mongoose';

/*
mongoose maneja estos estados:
0 = disconnected
1 = connected
2 = connecting
3 = disconnecting
*/

const mongoConnection = { isConnected: 0 };

export const connect = async () => {
  // si ya existe una conexion
  if (mongoConnection.isConnected) {
    console.log('Ya existe una conexión anterior');
    return;
  }

  // utilizar la conexion ya establecida
  if (mongoose.connections.length > 0) {
    mongoConnection.isConnected = mongoose.connections[0].readyState;
    if (mongoConnection.isConnected === 1) {
      console.log('Usando conexión anterior');
      return;
    }
    await disconnet();
  }

  await mongoose.connect(process.env.MONGO_URI || '');
  mongoConnection.isConnected = 1;
  console.log('Conexión exitosa a MongoDB', process.env.MONGO_URI);
};

export const disconnet = async () => {
  if (process.env.NODE_ENV === 'development') return; // evitar desconectarse en modo dev
  if (mongoConnection.isConnected === 0) return;

  await mongoose.disconnect();
  mongoConnection.isConnected = 0;
  console.log('Desconectado de MongoDB');
};
