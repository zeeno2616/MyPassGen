import React, { useState, useCallback, useRef } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View,} from 'react-native';

export default function App() {
  const [password, setPassword] = useState('');
  const [passwordLength, setPasswordLength] = useState(12);
  const lengthInputRef = useRef(null);

  const generatePassword = useCallback(() => {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+{}[]|:;<>,.?/";
    let newPassword = '';
    for (let i = 0; i < passwordLength; i++) {
      let randomIndex = Math.floor(Math.random() * charset.length);
      newPassword += charset[randomIndex];
    }
    setPassword(newPassword);
  }, [passwordLength]);

  const handleLengthChange = (text: string) => {
    const parsedLength = parseInt(text) || 0;
    setPasswordLength(parsedLength);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Password Generator</Text>
      <View style={styles.inputContainer}>
        <Text>Length:</Text>
        <TextInput
          style={styles.input}
          value={String(passwordLength)}
          onChangeText={handleLengthChange}
          keyboardType="numeric"
          ref={lengthInputRef}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={generatePassword}>
        <Text style={styles.buttonText}>Generate Password</Text>
      </TouchableOpacity>
      <Text style={styles.generatedPassword}>{password}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    paddingVertical: 5,
    width: 50,
    marginLeft: 10,
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  generatedPassword: {
    fontSize: 18,
    marginTop: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});
