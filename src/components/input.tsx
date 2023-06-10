import react from 'react';
import {View, TextInput, StyleSheet} from 'react-native';

const styles  = StyleSheet.create({
    inputContainer: {
        borderWidth: 1,
        borderColor: 'black',
        padding: 10,
        marginBotton: 10,
        borderRadius: 5,
    },
});

const textInNormal = ({ placeholder, value, onChangeText, secureTextEntry }) => {
    return (
        <View>
            <TextInput
                style={styles.inputContainer}
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={secureTextEntry}
            />
        </View>
    );
}

export default textInNormal;