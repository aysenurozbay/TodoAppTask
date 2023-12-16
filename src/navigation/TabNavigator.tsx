import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import TodoListScreen from '../screens/TodoListScreen';

import {StyleSheet, View} from 'react-native';
import AllTodoListScreen from '../screens/AllTodoListScreen';

const TabNavigator = () => {
  const Tab = createMaterialTopTabNavigator();

  const categoryTabs = ['Waiting', 'Pending', 'Done'];

  return (
    <View style={styles.container}>
      {categoryTabs && (
        <Tab.Navigator screenOptions={{lazy: true}}>
          <Tab.Screen
            name="AllToons"
            component={AllTodoListScreen}
            options={{
              title: 'All',
            }}
          />
          {categoryTabs.map(item => {
            return (
              <Tab.Screen
                key={'toons-genre-screen' + '-' + item}
                name={item}
                component={TodoListScreen}
                options={{title: item}}
                initialParams={{status: item}}
              />
            );
          })}
        </Tab.Navigator>
      )}
    </View>
  );
};

export default TabNavigator;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  columnWrapperStyle: {
    padding: 10,
  },
  skeletonContainer: {
    width: '100%',
    padding: 8,
  },
  cardStyle: {
    marginVertical: 4,
  },
});
