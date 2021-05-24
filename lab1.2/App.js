import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { AppTabs } from './Tabs';
import Contents from './contents/contents';

export default function App() {
  return (
    <NavigationContainer>
      <AppTabs />
    </NavigationContainer>
  );
}
