<template>
  <!-- Container principal com imagem de fundo -->
  <div
    style="background-image: url('/Unemat.jpeg'); background-size: cover; background-position: center; min-height: 100vh;">

    <!-- Estrutura flexível centralizada -->
    <div class="d-flex flex-column align-center justify-start" style="min-height: 80vh; padding-top: 4vh;">

      <!-- Seção de botões superiores: Reservas, Carro, Sair -->
      <v-container class="mt-2" style="max-width: 1000px;">
        <v-row justify="space-between" align="center">
          <!-- Botão para visualizar reservas -->
          <v-col cols="auto">
            <v-btn color="green" @click="router.push('/reservas')" elevation="4">
              <v-icon start>mdi-calendar-check</v-icon>
              Ver Minhas Reservas
            </v-btn>
          </v-col>

          <!-- Botão para reservar vaga de carro -->
          <v-col cols="auto">
            <v-btn color="blue" @click="router.push('/selecionar')" elevation="4">
              <v-icon start>mdi-parking</v-icon>
              Reservar Vaga (Carro)
            </v-btn>
          </v-col>

          <!-- Botão de logout -->
          <v-col cols="auto">
            <v-btn color="red" @click="logout" elevation="4">
              <v-icon start>mdi-logout</v-icon>
              Sair
            </v-btn>
          </v-col>
        </v-row>
      </v-container>

      <!-- Título central da aplicação -->
      <v-container class="text-center mt-8">
        <h1 class="text-h5 font-weight-bold px-6 py-3" style="
            background-color: rgba(255, 255, 255, 0.92);
            border-radius: 12px;
            color: #000;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
            display: inline-block;">
          Sistema de Reservas de Vagas da UNEMAT
        </h1>
      </v-container>

      <!-- Lista de vagas para MOTO (exemplo de uma vaga lateral) -->
      <v-container class="mt-6" style="max-width: 1000px;">
        <v-row justify="center" align="start" dense>
          <v-col cols="12" sm="6" md="4" lg="3">
            <!-- Componente personalizado de vaga -->
            <VagaItem numero="Lateral" bloco="Bloco M" botaoTexto="Reservar Vaga (Moto)" botaoCor="red"
              :onClick="() => router.push('/selecionar-moto')" />
          </v-col>
        </v-row>
      </v-container>
    </div>

    <!-- Componente do Assistente Virtual posicionado no canto inferior direito -->
    <AssistenteVirtual />
  </div>
</template>

<script setup>
// Importa o roteador e componentes da página
import { useRouter } from 'vue-router'
import VagaItem from '@/components/VagaItem.vue'
import AssistenteVirtual from '@/components/AssistenteVirtual.vue'

// Instância do roteador
const router = useRouter()

// Função para logout e limpar usuário logado
function logout() {
  localStorage.removeItem('usuario')
  router.push('/')
}
</script>
