import React from 'react';
import { TouchableOpacity, Text, StyleSheet, TouchableOpacityProps, StyleProp, ViewStyle, TextStyle } from 'react-native';

interface buttonNormalProps extends TouchableOpacityProps {
    title: string;
    buttonStyle?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
}

const buttonNormal: React.FC<buttonNormalProps> = ({ onPress, title, buttonStyle, textStyle}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, buttonStyle]}>
      <Text style={[styles.buttonText, textStyle!]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default buttonNormal;
