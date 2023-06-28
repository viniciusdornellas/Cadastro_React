import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Confirmation = () => {
  const navigation = useNavigation();
  const [cpf, setCPF] = useState('');
  const [email, setEmail] = useState('');

  const handleDeleteAccount = () => {
    fetch('http://192.168.15.9:3000/auth/del', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cpf, email }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.mensagem === 'Usuário deletado com sucesso') {
          Alert.alert(data.mensagem);
          navigation.navigate('Login');
        } else {
          Alert.alert('CPF ou email incorretos');
        }
      })
      .catch(error => {
        console.error(error);
        Alert.alert('Erro ao excluir a conta');
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Confirmação</Text>
      <Text style={styles.text}>Digite seu CPF e seu email para confirmar a exclusão:</Text>
      <TextInput
        style={styles.input}
        placeholder="CPF"
        onChangeText={text => setCPF(text)}
        value={cpf}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={text => setEmail(text)}
        value={email}
      />
      <TouchableOpacity style={styles.button} onPress={handleDeleteAccount}>
        <Text style={styles.buttonText}>Excluir Conta</Text>
      </TouchableOpacity>
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
  text: {
    fontSize: 16,
    marginBottom: 24,
    color: '#273043',
    textAlign: 'center',
  },
  input: {
    width: '80%',
    height: 40,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  button: {
    backgroundColor: '#FF0000',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Confirmation;
