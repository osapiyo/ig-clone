import React from 'react'
import AuthNavigation from './AuthNavigation'
import { LogBox } from 'react-native'
LogBox.ignoreLogs([
  'Setting a timer',
  'AsyncStorage has been extracted from react-native core and will be removed in a future release.',
])

export default function App() {
  return <AuthNavigation />
}
