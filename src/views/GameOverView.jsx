import React from 'react';

export const GameOverView = ({ score, onRestart }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', padding: '20px', textAlign: 'center' }}>
      <h2>¡Fin de la partida!</h2>
      <h3>Puntaje Final: {score} pts</h3>
      <button onClick={onRestart} style={{ marginTop: '20px', padding: '12px 24px', fontSize: '18px', cursor: 'pointer' }}>
        Volver a intentar
      </button>
    </div>
  );
};