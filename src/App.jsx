import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { HomeView } from './views/HomeView';
import { GameView } from './views/GameView';
import { GameOverView } from './views/GameOverView';

function App() {
  // States: 'HOME', 'GAME', 'GAMEOVER'
  const [currentView, setCurrentView] = useState('HOME');
  const [finalScore, setFinalScore] = useState(0);

  const startGame = () => setCurrentView('GAME');
  
  const endGame = (score = 12) => { // número mock temporal para testear
    setFinalScore(score);
    setCurrentView('GAMEOVER');
  };

  const goToHome = () => {
    setFinalScore(0);
    setCurrentView('HOME');
  };

  return (
    <Layout>
      {currentView === 'HOME' && (
        <HomeView onStartGame={startGame} />
      )}
      
      {currentView === 'GAME' && (
        <GameView onGameOver={() => endGame(25)} />
      )}
      
      {currentView === 'GAMEOVER' && (
        <GameOverView score={finalScore} onRestart={goToHome} />
      )}
    </Layout>
  );
}

export default App;