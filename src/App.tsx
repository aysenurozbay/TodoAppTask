import {SafeAreaView, StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {Provider} from 'react-redux';
import {store} from './store';
import {SheetManager, SheetProvider} from 'react-native-actions-sheet';
import './sheets/sheets';
import TabNavigator from './navigation/TabNavigator';
import {NavigationContainer} from '@react-navigation/native';
import {colors} from './colors';
import PlusIcon from './icons/PlusSignIcon';

const TitleComponent = () => {
  return (
    <SafeAreaView style={styles.headerContainer}>
      <Text style={styles.title}> TODO LİST</Text>
      <TouchableOpacity
        onPress={() => SheetManager.show('addTodo-sheet')}
        style={styles.addButton}>
        <PlusIcon fill={colors.orange} size={30} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

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
const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  title: {
    color: colors.blue,
    fontSize: 20,
    fontWeight: '600',
  },
  addButton: {
    padding: 5,
    backgroundColor: colors.blue,
    borderRadius: 50,
  },
});
