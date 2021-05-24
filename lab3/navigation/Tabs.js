import React, { Component } from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import DrawingView from '../views/DrawingView';
import MainView from '../views/MainView';
import BooksView from '../views/BooksView';

const Tab = createBottomTabNavigator();

export default function Tabs() {
  return (
    <Tab.Navigator tabBarOptions={{ labelStyle: { paddingBottom: 5 } }}>
      <Tab.Screen
        name="Main"
        component={MainView}
        options={{
          tabBarLabel: 'Main',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="Drawing"
        component={DrawingView}
        options={{
          tabBarLabel: 'Drawing',

          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="pencil" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="Books"
        component={BooksView}
        options={{
          tabBarLabel: 'Books',

          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="book" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
