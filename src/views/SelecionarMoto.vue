<template>
  <!-- Container principal com padding e fundo gradiente -->
  <v-container class="pa-6" style="min-height: 100vh; background: linear-gradient(to right, #43cea2, #185a9d);">

    <!-- Cartão de seleção de vagas de moto -->
    <v-card class="mx-auto" max-width="800" elevation="12">
      <v-card-title class="text-h5 font-weight-bold justify-center">
        Selecione uma Vaga de Moto
      </v-card-title>

      <v-card-text>
        <!-- Botões de vagas disponíveis -->
        <transition-group name="fade-zoom" tag="div" class="vaga-grid">
          <v-btn v-for="vaga in vagas" :key="vaga.id"
            :color="vaga.id === vagaSelecionada ? 'indigo' : vagaOcupada(vaga.numero) ? 'grey' : 'grey-lighten-2'"
            :disabled="vagaOcupada(vaga.numero)" class="vaga-btn" @click="vagaSelecionada = vaga.id"
            :aria-label="'Selecionar vaga ' + vaga.numero">
            {{ vaga.numero }}
          </v-btn>
        </transition-group>

        <!-- Campos de nome e data -->
        <v-divider class="my-4"></v-divider>
        <v-text-field v-model="nome" label="Seu nome" prepend-inner-icon="mdi-account" disabled />
        <v-text-field v-model="data" label="Data da Reserva" type="date" prepend-inner-icon="mdi-calendar" required />
      </v-card-text>

      <!-- Botão de confirmação -->
      <v-card-actions class="justify-center">
        <v-btn color="green" @click="confirmarReserva" :disabled="!podeConfirmar" elevation="2">
          Confirmar Reserva
        </v-btn>
      </v-card-actions>

      <!-- Botão para voltar à home -->
      <v-card-actions class="justify-center">
        <v-btn variant="text" @click="router.push('/home')">
          <v-icon start>mdi-arrow-left</v-icon>
          Voltar para Home
        </v-btn>
      </v-card-actions>
    </v-card>

    <!-- Alerta de confirmação -->
    <v-snackbar v-model="snackbar" color="green" timeout="3000">
      Reserva de moto realizada com sucesso! 🏍️
    </v-snackbar>

    <!-- Componente do robô assistente -->
    <AssistenteVirtual />
  </v-container>
</template>

<script setup>
// Importa funcionalidades do Vue e do roteador
import { ref, onMounted, computed, watch } from 'vue'
import { useRouter } from 'vue-router'

// Importa o assistente virtual personalizado
import AssistenteVirtual from '@/components/AssistenteVirtual.vue'

// Instância do roteador para redirecionamento
const router = useRouter()

// Variáveis reativas
const vagas = ref([]) // Vagas de moto disponíveis
const vagaSelecionada = ref(null) // Vaga selecionada
const nome = ref(localStorage.getItem('usuario') || '') // Nome do usuário
const data = ref('') // Data da reserva
const reservasExistentes = ref([]) // Lista de reservas atuais
const snackbar = ref(false) // Controle do alerta de sucesso

// Ao carregar a tela, define as vagas e reservas existentes
onMounted(() => {
  vagas.value = [
    { id: 101, numero: 'M1' }, { id: 102, numero: 'M2' }, { id: 103, numero: 'M3' },
    { id: 104, numero: 'M4' }, { id: 105, numero: 'M5' }, { id: 106, numero: 'M6' },
    { id: 107, numero: 'M7' }, { id: 108, numero: 'M8' }, { id: 109, numero: 'M9' },
    { id: 110, numero: 'M10' }, { id: 111, numero: 'M11' }, { id: 112, numero: 'M12' },
    { id: 113, numero: 'M13' }, { id: 114, numero: 'M14' }, { id: 115, numero: 'M15' },
    { id: 116, numero: 'M16' }, { id: 117, numero: 'M17' }, { id: 118, numero: 'M18' }
  ]
  reservasExistentes.value = JSON.parse(localStorage.getItem('reservas')) || []
})

// Validação para habilitar o botão de confirmar
const podeConfirmar = computed(() => {
  return vagaSelecionada.value && nome.value && data.value
})

// Verifica se uma vaga está ocupada para a data selecionada
function vagaOcupada(numeroVaga) {
  return reservasExistentes.value.some(
    reserva => reserva.vaga === numeroVaga && reserva.data === data.value
  )
}

// Confirma e salva a reserva no localStorage
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
    tipo: 'moto'
  })

  localStorage.setItem('reservas', JSON.stringify(todas))
  snackbar.value = true

  setTimeout(() => {
    router.push('/reservas')
  }, 1000)
}

// Sempre que a data mudar, recarrega as reservas
watch(data, () => {
  reservasExistentes.value = JSON.parse(localStorage.getItem('reservas')) || []
})
</script>

<style scoped>
/* Grade de botões das vagas */
.vaga-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(70px, 1fr));
  gap: 12px;
  justify-items: center;
  margin-bottom: 20px;
}

/* Estilização dos botões de vaga */
.vaga-btn {
  width: 60px;
  height: 60px;
  font-weight: bold;
  border-radius: 50%;
  transition: 0.3s;
}

/* Animações da transição dos botões */
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
