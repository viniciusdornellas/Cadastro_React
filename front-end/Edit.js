import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Edit = () => {
  const navigation = useNavigation();
  const [cpf, setCPF] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleSaveChanges = () => {
    fetch('http://192.168.15.9:3000/auth/att', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cpf, email, senha }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.mensagem === 'Usuário atualizado com sucesso') {
          Alert.alert(data.mensagem);
          navigation.navigate('Profile');
        } else {
          Alert.alert('Erro ao atualizar o usuário');
        }
      })
      .catch(error => {
        console.error(error);
        Alert.alert('Erro ao atualizar o usuário');
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar</Text>
      <TextInput
        style={[styles.input, styles.cpfInput]}
        placeholder="Confirme seu CPF"
        placeholderTextColor="#273043"
        value={cpf}
        onChangeText={setCPF}
      />
      <TextInput
        style={styles.input}
        placeholder="Novo email"
        placeholderTextColor="#273043"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Nova senha"
        placeholderTextColor="#273043"
        secureTextEntry={true}
        value={senha}
        onChangeText={setSenha}
      />
      <TouchableOpacity style={styles.button} onPress={handleSaveChanges}>
        <Text style={styles.buttonText}>Concluir Edição</Text>
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
  input: {
    width: '80%',
    height: 40,
    backgroundColor: '#FFFFFF',
    marginBottom: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  cpfInput: {
    marginTop: 40,
  },
  button: {
    backgroundColor: '#1E4156',
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
});

export default Edit;
