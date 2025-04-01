<template>
  <!-- Container centralizado com fundo em gradiente -->
  <div class="d-flex justify-center align-center"
    style="min-height: 100vh; width: 100vw; background: linear-gradient(to right, #185a9d, #43cea2);">

    <!-- Cartão contendo o formulário de cadastro -->
    <v-card class="pa-8" max-width="500" elevation="10">
      <!-- Título da tela -->
      <v-card-title class="justify-center text-h5 font-weight-bold">
        Criar Conta
      </v-card-title>

      <!-- Formulário de cadastro -->
      <v-form @submit.prevent="cadastrar">
        <!-- Campo de nome -->
        <v-text-field v-model="nome" label="Nome completo" prepend-inner-icon="mdi-account" variant="outlined"
          class="mb-4" required />

        <!-- Campo de e-mail -->
        <v-text-field v-model="email" label="E-mail" prepend-inner-icon="mdi-email" type="email" variant="outlined"
          class="mb-4" required />

        <!-- Campo de senha -->
        <v-text-field v-model="senha" label="Senha" prepend-inner-icon="mdi-lock" type="password" variant="outlined"
          required />

        <!-- Botão para enviar o formulário -->
        <v-btn type="submit" color="blue" block class="mt-6">
          Cadastrar
        </v-btn>
      </v-form>

      <!-- Alerta exibido em caso de erro -->
      <v-alert v-if="erro" type="error" class="mt-4">
        {{ erro }}
      </v-alert>

      <!-- Link para voltar ao login -->
      <div class="text-center mt-4">
        <v-btn variant="text" @click="router.push('/')">
          Já tenho uma conta
        </v-btn>
      </div>
    </v-card>
  </div>
</template>

<script setup>
// Importa funcionalidades reativas e de navegação
import { ref } from 'vue'
import { useRouter } from 'vue-router'

// Campos do formulário
const nome = ref('')
const email = ref('')
const senha = ref('')
const erro = ref('')

// Instância do roteador
const router = useRouter()

// Função chamada ao submeter o formulário
function cadastrar() {
  // Validação básica dos campos
  if (!nome.value || !email.value || !senha.value) {
    erro.value = 'Preencha todos os campos'
    return
  }

  // Busca os usuários salvos (ou inicia vazio)
  const usuarios = JSON.parse(localStorage.getItem('usuarios')) || []

  // Verifica se já existe usuário com o mesmo e-mail
  const jaExiste = usuarios.some(user => user.email === email.value)

  if (jaExiste) {
    erro.value = 'Este e-mail já está cadastrado.'
    return
  }

  // Adiciona o novo usuário à lista
  usuarios.push({
    nome: nome.value,
    email: email.value,
    senha: senha.value
  })

  // Salva a lista de usuários atualizada no localStorage
  localStorage.setItem('usuarios', JSON.stringify(usuarios))

  // Salva o nome do usuário logado
  localStorage.setItem('usuario', nome.value)

  // Redireciona para a Home após cadastro
  router.push('/home')
}
</script>
