import * as React from 'react';
import { Text, View } from 'react-native';
import { getFirstName } from '../databaseActions';

export default function HeyUser() {
  const [firstName, setFirstName] = React.useState(getFirstName());
    return (
      <View>
          <Text>Hey, {firstName}</Text>
      </View>
    );
    }