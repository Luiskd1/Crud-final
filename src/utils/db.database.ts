import { connect, connection } from "mongoose";

const conn = {
    isConnected: false
};

export async function connectDB() {
    if (conn.isConnected) return;

    const db = await connect('mongodb+srv://Santanadev:*Santana123@userdb.yd9iubr.mongodb.net/UserDB?retryWrites=true&w=majority&appName=UserDB');
    console.log(db.connection.db.databaseName);
    conn.isConnected = db.connections[0].readyState === 1; // Convertir el estado de conexión a un booleano
}

connection.on('connected', () => {
    console.log('Mongoose is connected');
});

connection.on('error', (err) => {
    console.log('Mongoose connection error', err);
});
