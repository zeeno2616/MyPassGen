import React, { useState, useCallback, useRef } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, ToastAndroid } from 'react-native';
import * as Clipboard from 'expo-clipboard';

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

  const handleCopyPassword = () => {
    Clipboard.setStringAsync(password);
    ToastAndroid.show('Password copied to clipboard', ToastAndroid.SHORT);
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
      {password ? (
        <>
          <Text style={styles.generatedPassword}>{password}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.copyButton} onPress={handleCopyPassword}>
              <Text style={styles.copyButtonText}>Copy Password</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.regenerateButton} onPress={generatePassword}>
              <Text style={styles.regenerateButtonText}>Regenerate Password</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : null}
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
  copyButton: {
    backgroundColor: '#5cb85c',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
    marginRight: 10,
  },
  copyButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  regenerateButton: {
    backgroundColor: '#f0ad4e',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
    marginLeft: 10,
  },
  regenerateButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
