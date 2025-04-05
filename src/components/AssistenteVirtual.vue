<template>
  <div class="assistente-container">
    <!-- Balão de conversa -->
    <div class="mensagem" :class="{ mostrar: assistenteVisivel }">
      <strong>🤖 UNEMATBot:</strong>
      <p>Olá {{ usuario }}, seja bem-vindo(a) ao sistema de reserva de vagas da UNEMAT! 🎓</p>

      <template v-if="rotaAtual === 'reservas'">
        <p>Você está na <strong>tela de reservas</strong>. Aqui você pode:</p>
        <ul>
          <li>📋 Ver suas reservas ativas;</li>
          <li>❌ Cancelar reservas já feitas;</li>
          <li>📁 Exportar os dados em CSV.</li>
        </ul>
        <p>Deseja ir para outra tela?</p>
      </template>

      <template v-else>
        <p>
          Você está na <strong>{{ nomePaginaAtual }}</strong
          >.
        </p>
        <p>Para onde deseja ir?</p>
      </template>

      <v-btn
        v-if="rotaAtual !== 'home'"
        size="small"
        color="deep-purple"
        variant="tonal"
        class="mb-1"
        @click="irPara('/home')"
      >
        🏠 Tela Inicial
      </v-btn>

      <v-btn
        v-if="rotaAtual !== 'selecionar'"
        size="small"
        color="blue"
        variant="tonal"
        class="mb-1"
        @click="irPara('/selecionar')"
      >
        🚗 Reservar vaga (Carro)
      </v-btn>

      <v-btn
        v-if="rotaAtual !== 'selecionar-moto'"
        size="small"
        color="indigo"
        variant="tonal"
        class="mb-1"
        @click="irPara('/selecionar-moto')"
      >
        🏍️ Reservar vaga (Moto)
      </v-btn>

      <v-btn
        v-if="rotaAtual !== 'reservas'"
        size="small"
        color="green"
        variant="tonal"
        @click="irPara('/reservas')"
      >
        📋 Ver minhas reservas
      </v-btn>
    </div>

    <!-- Ícone do robô -->
    <v-avatar size="50" class="assistente-icone" @click="toggleAssistente">
      <v-icon size="38" color="light-blue-darken-3">mdi-robot</v-icon>
    </v-avatar>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const router = useRouter()
const route = useRoute()
const usuario = ref(localStorage.getItem('usuario') || 'acadêmico(a)')
const isMobile = ref(false)
const assistenteVisivel = ref(false)

const checkScreenSize = () => {
  isMobile.value = window.innerWidth <= 768
  if (!isMobile.value) assistenteVisivel.value = true
}

const toggleAssistente = () => {
  assistenteVisivel.value = !assistenteVisivel.value
  setTimeout(() => {}, 10) // Força atualização do Vue
}

const irPara = (destino) => {
  router.push(destino)
  if (isMobile.value) assistenteVisivel.value = false
}

const rotaAtual = computed(() => route.name?.toLowerCase() || '')

const nomePaginaAtual = computed(() => {
  switch (rotaAtual.value) {
    case 'home':
      return 'tela inicial'
    case 'selecionar':
      return 'tela de reserva para carro'
    case 'selecionar-moto':
      return 'tela de reserva para moto'
    case 'reservas':
      return 'tela de reservas'
    case 'cadastro':
      return 'tela de cadastro'
    default:
      return 'tela atual'
  }
})

onMounted(() => {
  checkScreenSize()
  window.addEventListener('resize', checkScreenSize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkScreenSize)
})
</script>

<style scoped>
.assistente-container {
  position: fixed;
  bottom: 20px;
  right: 20px;
  display: flex;
  align-items: flex-end;
  z-index: 9999;
}

.mensagem {
  background-color: rgba(255, 255, 255, 0.95);
  color: #1a237e;
  padding: 12px 16px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  max-width: 280px;
  font-size: 14px;
  margin-right: 12px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  opacity: 0;
  visibility: hidden;
  transition:
    opacity 0.3s ease,
    visibility 0.3s ease;
}

.mensagem.mostrar {
  opacity: 1;
  visibility: visible;
}

.assistente-icone {
  background-color: #e3f2fd;
  border: 2px solid #0288d1;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  cursor: pointer;
}
</style>
