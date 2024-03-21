
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AuthContext } from './AuthContext'
import SignInScreen from './screens/SignIn';
import RegisterScreen from './screens/Register';
import HomeScreen from './screens/Home';
import OtherScreen from './screens/Other';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const authContext = React.useMemo(() => ({
    signIn: () => setIsAuthenticated(true),
    signOut: () => setIsAuthenticated(false),
  }), []);

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {isAuthenticated ? (
          <AppTabs />
        ) : (
          <AuthStack />
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

const AuthStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false
    }}
  >
    <Stack.Screen name="SignIn" component={SignInScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
  </Stack.Navigator>
);

const AppTabs = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false
    }}
  >
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Other" component={OtherScreen} />
  </Tab.Navigator>
);

export default App;
