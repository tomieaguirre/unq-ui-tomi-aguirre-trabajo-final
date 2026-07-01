import React from 'react';

export const GameView = ({ onGameOver }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', padding: '20px' }}>
      <div>
        <h3>Puntaje: 0 | Tiempo: 15s</h3>
      </div>
      <div style={{ textAlign: 'center' }}>
        <p>Aquí irá la lista de palabras...</p>
      </div>
      <div>
        <button onClick={onGameOver} style={{ width: '100%', padding: '12px', cursor: 'pointer' }}>
          Forzar Fin de Juego (Test)
        </button>
      </div>
    </div>
  );
};