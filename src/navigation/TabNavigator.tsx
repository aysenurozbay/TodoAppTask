import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import TodoListScreen from '../screens/TodoListScreen';

import {colors} from '../colors';

const TabNavigator = () => {
  const Tab = createMaterialTopTabNavigator();

  const categoryTabs = ['Waiting', 'Pending', 'Done'];

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: {fontSize: 12},
        tabBarItemStyle: {},
        tabBarActiveTintColor: colors.orange,
        tabBarInactiveTintColor: colors.gray,
        tabBarIndicatorStyle: {
          backgroundColor: colors.orange,
          height: 1,
        },
      }}>
      {categoryTabs.map(item => (
        <Tab.Screen
          name={`${item} Category Screen`}
          options={{
            title: item,
          }}
          component={TodoListScreen}
          initialParams={{category: item}}
        />
      ))}
    </Tab.Navigator>
  );
};

export default TabNavigator;
