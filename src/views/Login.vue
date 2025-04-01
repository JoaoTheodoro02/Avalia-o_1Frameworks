<template>
  <!-- Container centralizado ocupando 100% da tela com fundo em gradiente -->
  <div class="d-flex justify-center align-center"
    style="min-height: 100vh; width: 100vw; background: linear-gradient(to right, #43cea2, #185a9d);">
    <!-- Cartão centralizado que contém o formulário -->
    <v-card class="pa-8" max-width="500" elevation="10">

      <!-- Título do card -->
      <v-card-title class="justify-center text-h5 font-weight-bold">
        Acesso ao Sistema
      </v-card-title>

      <!-- Formulário de login -->
      <v-form @submit.prevent="login">
        <!-- Campo de e-mail -->
        <v-text-field v-model="email" label="E-mail" prepend-inner-icon="mdi-email" type="email" variant="outlined"
          class="mb-4" density="comfortable" required />

        <!-- Campo de senha -->
        <v-text-field v-model="senha" label="Senha" prepend-inner-icon="mdi-lock" type="password" variant="outlined"
          density="comfortable" required />

        <!-- Botão de envio -->
        <v-btn type="submit" color="green" block class="mt-6">
          Entrar
        </v-btn>
      </v-form>

      <!-- Alerta de erro caso as credenciais estejam incorretas -->
      <v-alert v-if="erro" type="error" class="mt-4">
        {{ erro }}
      </v-alert>

      <!-- Link para criar uma nova conta -->
      <div class="text-center mt-4">
        <v-btn variant="text" @click="router.push('/cadastro')">
          Criar uma conta
        </v-btn>
      </div>
    </v-card>
  </div>
</template>

<script setup>
// Importações reativas e roteamento
import { ref } from 'vue'
import { useRouter } from 'vue-router'

// Definição dos campos controlados pelo formulário
const email = ref('')
const senha = ref('')
const erro = ref('')
const router = useRouter()

// Função de login chamada ao submeter o formulário
function login() {
  // Recupera os usuários cadastrados no localStorage
  const usuarios = JSON.parse(localStorage.getItem('usuarios')) || []

  // Verifica se existe um usuário com o e-mail e senha informados
  const usuarioEncontrado = usuarios.find(
    (user) => user.email === email.value && user.senha === senha.value
  )

  // Se encontrado, salva o nome do usuário no localStorage e redireciona
  if (usuarioEncontrado) {
    localStorage.setItem('usuario', usuarioEncontrado.nome)
    router.push('/home')
  } else {
    // Exibe mensagem de erro se o login falhar
    erro.value = 'E-mail ou senha inválidos'
  }
}
</script>
