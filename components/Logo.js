import React from 'react';
import { View, Image } from 'react-native';

export default function Logo() { 
        return (
            <Image
            style={{ width: 132, height: 66, marginBottom: 100 }}
            source={require('../assets/logo.png')}
          />
        );
}