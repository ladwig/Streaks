import React from 'react';
import { View, Image } from 'react-native';

export default function Logo() { 
        return (
            <Image
            style={{ width: 128, height: 128, marginBottom: 100 }}
            source={require('../assets/logo.png')}
          />
        );
}