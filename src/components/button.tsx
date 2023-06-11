  import { useNavigation } from '@react-navigation/native';
  import React from 'react';
  import { View, TouchableOpacity, Text, StyleSheet, TouchableOpacityProps, StyleProp, ViewStyle, TextStyle } from 'react-native';



  interface buttonNormalProps extends TouchableOpacityProps {
      title: string;
      buttonStyle?: StyleProp<ViewStyle>;
      textStyle?: StyleProp<TextStyle>;
  }

  type ButtonProps = TouchableOpacityProps & {
    jc?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
    AlIt?: 'stretch' | 'flex-start' | 'flex-end' | 'center' | 'baseline';
    mT?: number;
    clr?: string;
    wdth?: number;
    hght?: number;
    bc?: string;
    pd?: number;
    br?: number;
    gotoPage: () => void;
  };

  const buttonNormal: React.FC<buttonNormalProps> = ({ onPress, title, buttonStyle, textStyle}) => {
    return (
      <TouchableOpacity onPress={onPress} style={[styles.button, buttonStyle]}>
        <Text style={[styles.buttonText, textStyle!]}>{title}</Text>
      </TouchableOpacity>
    );
  };

  export const ButtonAdmin = (props: ButtonProps) => {
    const { jc, AlIt, mT, bc, wdth, hght, pd, br, children, gotoPage, ...otherProps } = props;
    const buttonStyle: ViewStyle = {
      justifyContent: jc,
      alignItems: AlIt,
      marginTop: mT,
      backgroundColor: bc,
      width: wdth,
      height: hght,
      padding: pd,
      borderRadius: br,
    };

    const textStyle: TextStyle = {
      textAlign: 'center',
      fontSize: 18,
      color: 'white',
    };
    
    const navigation = useNavigation();
    const handlebuttonAdmin = () => {
      gotoPage();
    }
    return (
      <View>
        <TouchableOpacity style={buttonStyle} onPress={handlebuttonAdmin} {...otherProps}>
          <Text style={textStyle}>{children}</Text>
        </TouchableOpacity>
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



