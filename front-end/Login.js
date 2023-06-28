import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const Login = () => {
  const navigation = useNavigation();
  const [CPF, setCPF] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setError(''); 

    try {
      const response = await axios.post('http://192.168.15.9:3000/auth/login', { CPF, senha });
      const { token } = response.data;
      navigation.navigate('Profile');
    } catch (error) {
      if (error.response) {
        setError(error.response.data.mensagem);
      } else {
        setError('Erro ao realizar o login');
      }
    }
  };

  const handleRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fazer Login</Text>
      <TextInput
        style={styles.input}
        placeholder="CPF"
        placeholderTextColor="#273043"
        value={CPF}
        onChangeText={text => setCPF(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#273043"
        secureTextEntry={true}
        value={senha}
        onChangeText={text => setSenha(text)}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#1E4156' }]}
        onPress={handleLogin}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <Button
        title="Cadastrar"
        onPress={handleRegister}
        color="#273043"
        style={styles.button}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C3E0DC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#273043',
  },
  input: {
    width: '80%',
    height: 40,
    backgroundColor: '#FFFFFF',
    marginBottom: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  button: {
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginTop: 12,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  error: {
    color: 'red',
    marginBottom: 12,
    textAlign: 'center',
  },
});

export default Login;