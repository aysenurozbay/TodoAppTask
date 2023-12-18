import React from 'react';
import {Provider} from 'react-redux';
import {SheetProvider} from 'react-native-actions-sheet';
import {NavigationContainer} from '@react-navigation/native';

import {store} from './store';
import './sheets/sheets';
import TabNavigator from './navigation/TabNavigator';

import TitleComponent from './components/TitleComponent';

export default function App() {
  return (
    <Provider store={store}>
      <SheetProvider>
        <NavigationContainer>
          <TitleComponent />
          <TabNavigator />
        </NavigationContainer>
      </SheetProvider>
    </Provider>
  );
}
