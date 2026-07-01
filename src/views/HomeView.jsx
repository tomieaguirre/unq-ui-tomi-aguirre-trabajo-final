import React from 'react';

export const HomeView = ({ onStartGame }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', padding: '20px', textAlign: 'center' }}>
      <h1>ENCADENA2</h1>
      <p>¡Forma la cadena de palabras más larga antes de que se agote el tiempo!</p>
      <button onClick={onStartGame} style={{ marginTop: '20px', padding: '12px 24px', fontSize: '18px', cursor: 'pointer' }}>
        Jugar
      </button>
    </div>
  );
};