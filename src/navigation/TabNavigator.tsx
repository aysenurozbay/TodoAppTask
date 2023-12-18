import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import {colors} from '../helpers/colors';
import TodoListScreen from '../screens/TodoListScreen';
import {AppParams} from '../Types';
import {Statuses} from '../helpers/consts';

import texts from '../helpers/Texts.json';

const TabNavigator = () => {
  const Tab = createMaterialTopTabNavigator<AppParams>();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: {fontSize: 12},
        tabBarActiveTintColor: colors.orange,
        tabBarInactiveTintColor: colors.gray,
        tabBarIndicatorStyle: {
          backgroundColor: colors.orange,
          height: 1.5,
        },
      }}>
      <Tab.Screen
        name="Waiting"
        options={{
          title: texts.status.waiting,
        }}
        component={TodoListScreen}
        initialParams={{statusType: Statuses.waiting}}
      />
      <Tab.Screen
        name="Done"
        options={{
          title: texts.status.done,
        }}
        component={TodoListScreen}
        initialParams={{statusType: Statuses.done}}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
