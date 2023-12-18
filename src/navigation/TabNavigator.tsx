import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import {colors} from '../helpers/colors';
import TodoListScreen from '../screens/TodoListScreen';
import {AppParams} from '../Types';

const TabNavigator = () => {
  const Tab = createMaterialTopTabNavigator<AppParams>();

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
      <Tab.Screen
        name={'Waiting'}
        options={{
          title: 'Waiting',
        }}
        component={TodoListScreen}
        key={'AllCategoriesScreen'}
        initialParams={{statusType: 'Waiting'}}
      />
      <Tab.Screen
        name={'Done'}
        options={{
          title: 'Done',
        }}
        component={TodoListScreen}
        key={'AllCategoriesScreen'}
        initialParams={{statusType: 'Done'}}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
