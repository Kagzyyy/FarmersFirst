
import React, { useContext } from 'react';
import { AuthContext } from './contexts/AuthContext';
import AuthNavigator from './navigators/AuthNavigator';
import MainScreen from './screens/MainScreen';

const App: React.FC = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    return <div>Loading...</div>;
  }

  const { user } = authContext;
  
  return (
    <div className="font-sans antialiased">
      {user ? <MainScreen /> : <AuthNavigator />}
    </div>
  );
};

export default App;
