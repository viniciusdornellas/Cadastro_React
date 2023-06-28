import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const Signup = () => {
  const navigation = useNavigation();
  const [CPF, setCPF] = useState('');
  const [senha, setSenha] = useState('');
  const [email, setEmail] = useState('');

  const handleRegister = () => {
    if (!CPF || !senha || !email) {
      return alert('Todos os campos são obrigatórios');
    }

    axios
      .post('http://192.168.15.9:3000/auth/signup', { CPF, senha, email })
      .then(response => {
        alert('Usuário criado com sucesso');
        navigation.navigate('Login'); 
      })
      .catch(error => {
        if (error.response) {
          const { data } = error.response;
          if (data.mensagem) {
            alert(data.mensagem);
          }
        } else {
          alert('Erro ao cadastrar o usuário');
        }
      });
  };

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastrar</Text>
      <TextInput
        style={styles.input}
        placeholder="CPF"
        placeholderTextColor="#273043"
        value={CPF}
        onChangeText={setCPF}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#273043"
        secureTextEntry={true}
        value={senha}
        onChangeText={setSenha}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#273043"
        value={email}
        onChangeText={setEmail}
      />
      <Button title="Enviar" onPress={handleRegister} />
      <Button title="Fazer Login" onPress={handleLogin} />
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
});

export default Signup;