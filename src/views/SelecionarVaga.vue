<template>
  <!-- Container com padding e fundo em gradiente -->
  <v-container class="pa-6" style="min-height: 100vh; background: linear-gradient(to right, #43cea2, #185a9d);">

    <!-- Cartão principal centralizado com borda elevada -->
    <v-card class="mx-auto" max-width="800" elevation="12">
      <!-- Título da página -->
      <v-card-title class="text-h5 font-weight-bold justify-center">
        Selecione uma Vaga
      </v-card-title>

      <v-card-text>
        <!-- Grade de botões representando vagas disponíveis -->
        <transition-group name="fade-zoom" tag="div" class="vaga-grid">
          <v-btn v-for="vaga in vagas" :key="vaga.id"
            :color="vaga.id === vagaSelecionada ? 'red' : vagaOcupada(vaga.numero) ? 'grey' : 'grey-lighten-2'"
            :disabled="vagaOcupada(vaga.numero)" class="vaga-btn" @click="vagaSelecionada = vaga.id">
            {{ vaga.numero }}
          </v-btn>
        </transition-group>

        <!-- Campos de nome e data -->
        <v-divider class="my-4"></v-divider>

        <!-- Nome do usuário (desabilitado pois já vem do login) -->
        <v-text-field v-model="nome" label="Seu nome" prepend-inner-icon="mdi-account" disabled />
        <!-- Campo de seleção da data -->
        <v-text-field v-model="data" label="Data da Reserva" type="date" prepend-inner-icon="mdi-calendar" required />
      </v-card-text>

      <!-- Botão para confirmar a reserva -->
      <v-card-actions class="justify-center">
        <v-btn color="green" @click="confirmarReserva" :disabled="!podeConfirmar" elevation="2">
          Confirmar Reserva
        </v-btn>
      </v-card-actions>

      <!-- Botão para voltar para a tela principal -->
      <v-card-actions class="justify-center">
        <v-btn variant="text" @click="router.push('/home')">
          <v-icon start>mdi-arrow-left</v-icon>
          Voltar para Home
        </v-btn>
      </v-card-actions>
    </v-card>

    <!-- Alerta de sucesso após reservar -->
    <v-snackbar v-model="snackbar" color="green" timeout="3000">
      Reserva feita com sucesso! 🎉
    </v-snackbar>
  </v-container>

  <!-- Componente do robô assistente (UNEMATBot) -->
  <AssistenteVirtual />
</template>

<script setup>
// Importações do Vue e Roteamento
import { ref, onMounted, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import AssistenteVirtual from '@/components/AssistenteVirtual.vue' // Importa o bot

// Roteador para redirecionar entre páginas
const router = useRouter()

// Estados reativos
const vagas = ref([]) // Vagas disponíveis
const vagaSelecionada = ref(null) // ID da vaga escolhida
const nome = ref(localStorage.getItem('usuario') || '') // Nome do usuário
const data = ref('') // Data da reserva
const reservasExistentes = ref([]) // Reservas existentes
const snackbar = ref(false) // Controle do alerta de sucesso

// Ao montar o componente, carrega as vagas e reservas
onMounted(() => {
  vagas.value = [
    { id: 1, numero: 'A1' }, { id: 2, numero: 'A2' }, { id: 3, numero: 'A3' },
    { id: 4, numero: 'A4' }, { id: 5, numero: 'A5' }, { id: 6, numero: 'B1' },
    { id: 7, numero: 'B2' }, { id: 8, numero: 'B3' }, { id: 9, numero: 'B4' }, { id: 10, numero: 'B5' },
    { id: 11, numero: 'C1' }, { id: 12, numero: 'C2' }, { id: 13, numero: 'C3' }, { id: 14, numero: 'C4' }, { id: 15, numero: 'C5' },
    { id: 16, numero: 'D1' }, { id: 17, numero: 'D2' }, { id: 18, numero: 'D3' }, { id: 19, numero: 'D4' }, { id: 20, numero: 'D5' },
    { id: 21, numero: 'E1' }, { id: 22, numero: 'E2' }, { id: 23, numero: 'E3' }, { id: 24, numero: 'E4' }, { id: 25, numero: 'E5' },
    { id: 26, numero: 'F1' }, { id: 27, numero: 'F2' }, { id: 28, numero: 'F3' }, { id: 29, numero: 'F4' }, { id: 30, numero: 'F5' },
    { id: 31, numero: 'G1' }, { id: 32, numero: 'G2' }, { id: 33, numero: 'G3' }, { id: 34, numero: 'G4' }, { id: 35, numero: 'G5' },
    { id: 36, numero: 'H1' }, { id: 37, numero: 'H2' }, { id: 38, numero: 'H3' }, { id: 39, numero: 'H4' }, { id: 40, numero: 'H5' },
    { id: 41, numero: 'I1' }, { id: 42, numero: 'I2' }, { id: 43, numero: 'I3' }, { id: 44, numero: 'I4' }, { id: 45, numero: 'I5' },
    { id: 46, numero: 'J1' }, { id: 47, numero: 'J2' }, { id: 48, numero: 'J3' }, { id: 49, numero: 'J4' }, { id: 50, numero: 'J5' }
  ]

  reservasExistentes.value = JSON.parse(localStorage.getItem('reservas')) || []
})

// Computado para ativar botão de confirmação apenas se tudo estiver preenchido
const podeConfirmar = computed(() => {
  return vagaSelecionada.value && nome.value && data.value
})

// Verifica se uma vaga já foi reservada para a data
function vagaOcupada(numeroVaga) {
  return reservasExistentes.value.some(
    reserva => reserva.vaga === numeroVaga && reserva.data === data.value
  )
}

// Confirma a reserva e salva no localStorage
function confirmarReserva() {
  const todas = JSON.parse(localStorage.getItem('reservas')) || []
  const vaga = vagas.value.find(v => v.id === vagaSelecionada.value)

  todas.push({
    id: Date.now(),
    usuario: nome.value,
    bloco: vaga.numero.charAt(0),
    vaga: vaga.numero,
    data: data.value,
    hora: new Date().toLocaleTimeString('pt-BR'),
    tipo: 'carro'
  })

  localStorage.setItem('reservas', JSON.stringify(todas))
  snackbar.value = true

  setTimeout(() => {
    router.push('/reservas')
  }, 1000)
}

// Sempre que a data for alterada, recarrega as reservas
watch(data, () => {
  reservasExistentes.value = JSON.parse(localStorage.getItem('reservas')) || []
})
</script>

<style scoped>
/* Grade de vagas com espaçamento e layout responsivo */
.vaga-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(70px, 1fr));
  gap: 12px;
  justify-items: center;
  margin-bottom: 20px;
}

/* Botões circulares representando cada vaga */
.vaga-btn {
  width: 60px;
  height: 60px;
  font-weight: bold;
  border-radius: 50%;
  transition: 0.3s;
}

/* Animação de entrada suave nas vagas */
.fade-zoom-enter-active,
.fade-zoom-leave-active {
  transition: all 0.4s ease;
}

.fade-zoom-enter-from {
  opacity: 0;
  transform: scale(0.7);
}

.fade-zoom-leave-to {
  opacity: 0;
  transform: scale(0.7);
}
</style>
