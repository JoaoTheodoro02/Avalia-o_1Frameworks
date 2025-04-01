<template>
  <!-- Container principal com padding vertical -->
  <v-container class="py-10">
    <v-row justify="center">
      <v-col cols="12" md="6">
        <!-- Logo da UNEMAT exibida acima do card -->
        <v-img src="/logo-unemat.png" aspect-ratio="1.5" contain class="mb-6" />

        <!-- Cartão com as informações da vaga e formulário de reserva -->
        <v-card elevation="10" class="pa-6">
          <!-- Título do cartão -->
          <v-card-title class="text-h6 font-weight-bold">
            Detalhes da Vaga
          </v-card-title>

          <v-divider class="mb-4"></v-divider>

          <v-card-text>
            <!-- Número da vaga (ex: A1, B2, etc.) -->
            <div class="mb-3">
              <v-icon color="red" class="mr-2">mdi-car</v-icon>
              <strong>Vaga:</strong> {{ vaga.numero }}
            </div>

            <!-- Local onde a vaga está (ex: Bloco A) -->
            <div class="mb-4">
              <v-icon color="red" class="mr-2">mdi-map-marker</v-icon>
              <strong>Local:</strong> {{ vaga.local }}
            </div>

            <!-- Campo de entrada para nome do usuário -->
            <v-text-field v-model="nome" label="Seu nome" prepend-inner-icon="mdi-account" outlined class="mb-3"
              required />

            <!-- Campo de seleção de data da reserva -->
            <v-text-field v-model="data" label="Data da Reserva" prepend-inner-icon="mdi-calendar" type="date" outlined
              required />
          </v-card-text>

          <!-- Ações disponíveis ao usuário -->
          <v-card-actions class="d-flex flex-column">
            <!-- Botão que confirma a reserva -->
            <v-btn color="red" class="mb-2" block @click="confirmarReserva">
              Confirmar Reserva
            </v-btn>

            <!-- Botão que redireciona para a tela inicial -->
            <v-btn variant="text" @click="router.push('/home')">
              ← Voltar para Home
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
// Importa refs reativos e rotas
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

// Instâncias de roteamento
const route = useRoute()
const router = useRouter()

// Dados da vaga selecionada
const vaga = ref({})

// Dados preenchidos pelo usuário
const nome = ref('')
const data = ref('')

// Ao montar o componente, busca a vaga pelo ID recebido na rota
onMounted(() => {
  const id = parseInt(route.params.id)


  // Atribui ao ref a vaga correspondente ao ID
  vaga.value = vagas.find(v => v.id === id)
})

// Função que salva a reserva no localStorage
function confirmarReserva() {
  // Valida se nome e data foram preenchidos
  if (!nome.value || !data.value) {
    alert('Preencha o nome e a data da reserva.')
    return
  }

  // Recupera reservas existentes
  const reservas = JSON.parse(localStorage.getItem('reservas') || '[]')

  // Cria novo objeto de reserva
  const novaReserva = {
    id: Date.now(),
    usuario: nome.value,
    bloco: vaga.value.local.split(' ')[1], // extrai apenas a letra do bloco
    vaga: vaga.value.numero,
    data: data.value,
  }

  // Adiciona nova reserva e salva no localStorage
  reservas.push(novaReserva)
  localStorage.setItem('reservas', JSON.stringify(reservas))

  // Redireciona para a tela de reservas
  router.push('/reservas')
}
</script>
