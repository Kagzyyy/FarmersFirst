import React, { useState } from 'react';
import { AuthPage } from '../types';
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import CoverScreen from '../screens/CoverScreen';

const AuthNavigator: React.FC = () => {
  const [page, setPage] = useState<AuthPage>(AuthPage.Welcome);
  const [showCover, setShowCover] = useState(true);

  const goToLogin = () => setPage(AuthPage.Login);
  const goToRegister = () => setPage(AuthPage.Register);
  const goToWelcome = () => setPage(AuthPage.Welcome);

  if (showCover) {
    return <CoverScreen onFinish={() => setShowCover(false)} />;
  }

  switch (page) {
    case AuthPage.Login:
      return <LoginScreen onGoToRegister={goToRegister} onBack={goToWelcome} />;
    case AuthPage.Register:
      return <RegisterScreen onGoToLogin={goToLogin} onBack={goToWelcome} />;
    case AuthPage.Welcome:
    default:
      return <WelcomeScreen onGoToLogin={goToLogin} onGoToRegister={goToRegister} />;
  }
};

export default AuthNavigator;