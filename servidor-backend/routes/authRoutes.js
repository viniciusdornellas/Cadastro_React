const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Cadastro
router.post('/signup', (req, res) => {
  const { CPF, senha, email} = req.body;

  if (!CPF || !senha || !email) {
    return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios' });
  }

  User.findOne({ CPF })
    .then(existingUser => {
      if (existingUser) {
        return res.status(400).json({ mensagem: 'CPF ja está em uso' });
      }

      const newUser = new User({
        CPF,
        senha,
        email,
      });

      newUser.save()
        .then(() => {
          res.status(201).json({ mensagem: 'Usuário criado com sucesso' });
          console.log('Novo usuário cadastrado!')
        })
        .catch(err => {
          res.status(500).json({ erro: 'Erro ao criar o usuário' });
        });
    })
    .catch(err => {
      res.status(500).json({ erro: 'Erro ao verificar o código de acesso' });
    });
});

// login
router.post('/login', (req, res) => {
  const { CPF, senha } = req.body;

  if (!CPF || !senha) {
    return res.status(400).json({ mensagem: 'CPF e senha são obrigatórios' });
  }

  User.findOne({ CPF })
    .then(user => {
      if (!user) {
        return res.status(401).json({ mensagem: 'CPF ou senha inválidos' });
      }

      if (user.senha !== senha) {
        return res.status(401).json({ mensagem: 'CPF ou senha inválidos' });
      }

      const token = jwt.sign({ userId: user._id }, 'chave-secreta-do-token', { expiresIn: '1h' });

      res.status(200).json({ mensagem: 'Login bem-sucedido', token });
    })
    .catch(err => {
      res.status(500).json({ erro: 'Erro ao realizar o login.' });
    });
});

router.put('/att', (req, res) => {
  const { cpf, email, senha } = req.body;

  User.findOne({ CPF: cpf })
    .then(user => {
      if (!user) {
        return res.status(404).json({ mensagem: 'Usuário não encontrado' });
      }

      user.email = email;
      user.senha = senha;

      user.save()
        .then(updatedUser => {
          res.status(200).json({ mensagem: 'Usuário atualizado com sucesso', user: updatedUser });
        })
        .catch(err => {
          res.status(500).json({ erro: 'Erro ao atualizar o usuário' });
        });
    })
    .catch(err => {
      res.status(500).json({ erro: 'Erro ao buscar o usuário' });
    });
});

router.delete('/del', (req, res) => {
  const { cpf, email } = req.body;

  User.findOne({ CPF: cpf, email: email })
    .then(user => {
      if (!user) {
        return res.status(400).json({ mensagem: 'CPF ou email incorretos' });
      }

      User.findOneAndDelete({ CPF: cpf, email: email })
        .then(deletedUser => {
          if (!deletedUser) {
            return res.status(404).json({ mensagem: 'Usuário não encontrado' });
          }

          res.status(200).json({ mensagem: 'Usuário deletado com sucesso' });
        })
        .catch(err => {
          res.status(500).json({ erro: 'Erro ao deletar o usuário' });
        });
    })
    .catch(err => {
      res.status(500).json({ erro: 'Erro ao buscar o usuário' });
    });
});

module.exports = router;