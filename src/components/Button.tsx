import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, TouchableOpacityProps, StyleProp, ViewStyle, TextStyle } from 'react-native';


interface buttonNormalProps extends TouchableOpacityProps {
    title: string;
    buttonStyle?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
}

type ButtonProps = TouchableOpacityProps & {
  jc?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
  mT?: number;
  clr?: string;
  wdth?: number;
  hght?: number;
  bc?: string;
  pd?: number;
  br?: number;
};

const buttonNormal: React.FC<buttonNormalProps> = ({ onPress, title, buttonStyle, textStyle}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, buttonStyle]}>
      <Text style={[styles.buttonText, textStyle!]}>{title}</Text>
    </TouchableOpacity>
  );
};

export const ButtonAdmin = (props: ButtonProps) => {
  const { jc, mT, bc, wdth, hght, pd, br, ...otherProps } = props;

  const buttonStyle: ViewStyle = {
    justifyContent: jc || 'flex-start',
    marginTop: mT,
    backgroundColor: bc,
    width: wdth,
    height: hght,
    padding: pd,
    borderRadius: br,
  };

  return (
    <View>
      <TouchableOpacity style={buttonStyle} {...otherProps} />
    </View>
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



