import { useState } from 'react';

const SendMessage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/send-message', {
        method: 'POST',
      });

      const data = await response.json();

      if (data.success) {
        alert('Mensaje enviado con éxito');
      } else {
        setError(data.error || 'Error desconocido');
      }
    } catch (err) {
      // Manejo seguro del error
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Error desconocido');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={sendMessage} disabled={loading}>
        {loading ? 'Enviando...' : 'Enviar "Hola Mundo"'}
      </button>
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default SendMessage;
