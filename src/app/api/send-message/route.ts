import axios from 'axios';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const token = "6534034932:AAFEv6OtU5QT050GJMv7X1VZnQg53sIgY7E"; // Usa variables de entorno
  const text = 'Hola Mundo';
  const urlSendMessage = `https://api.telegram.org/bot${token}/sendMessage`;
  const urlGetUpdates = `https://api.telegram.org/bot${token}/getUpdates`;

  try {

    const chatId = 5157315645;

    const response = await axios.post(urlSendMessage, {
      chat_id: chatId,
      text: text,
    });

    return NextResponse.json({ success: true, data: response.data });
  } catch (error) {
    let errorMessage = 'Unknown error occurred';
    if (axios.isAxiosError(error)) {
      // Verifica si el error es de Axios
      errorMessage = error.message;
    } else if (error instanceof Error) {
      // Verifica si el error es una instancia de Error
      errorMessage = error.message;
    }
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}
