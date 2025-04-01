<template>
  <!-- Container do assistente fixado no canto inferior direito -->
  <div class="assistente-container">
    <!-- Balão de fala com conteúdo dinâmico -->
    <div class="mensagem">
      <strong>🤖 UNEMATBot:</strong>
      <p>Olá {{ usuario }}, seja bem-vindo(a) ao sistema de reserva de vagas da UNEMAT! 🎓</p>

      <!-- Mensagem especial para a tela de reservas -->
      <template v-if="rotaAtual === 'reservas'">
        <p>Você está na <strong>tela de reservas</strong>. Aqui você pode:</p>
        <ul style="padding-left: 16px; margin-top: 4px;">
          <li>📋 Ver suas reservas ativas;</li>
          <li>❌ Cancelar reservas já feitas;</li>
          <li>📁 Exportar os dados em CSV.</li>
        </ul>
        <p>Deseja ir para outra tela?</p>
      </template>

      <!-- Mensagem padrão para outras telas -->
      <template v-else>
        <p>Você está na <strong>{{ nomePaginaAtual }}</strong>.</p>
        <p>Para onde deseja ir?</p>
      </template>

      <!-- Botões de navegação (exclui a tela atual) -->
      <v-btn v-if="rotaAtual !== 'home'" size="small" color="deep-purple" variant="tonal" class="mb-1"
        @click="irPara('/home')">
        🏠 Tela Inicial
      </v-btn>

      <v-btn v-if="rotaAtual !== 'selecionar'" size="small" color="blue" variant="tonal" class="mb-1"
        @click="irPara('/selecionar')">
        🚗 Reservar vaga (Carro)
      </v-btn>

      <v-btn v-if="rotaAtual !== 'selecionar-moto'" size="small" color="indigo" variant="tonal" class="mb-1"
        @click="irPara('/selecionar-moto')">
        🏍️ Reservar vaga (Moto)
      </v-btn>

      <v-btn v-if="rotaAtual !== 'reservas'" size="small" color="green" variant="tonal" @click="irPara('/reservas')">
        📋 Ver minhas reservas
      </v-btn>
    </div>

    <!-- Ícone do robô -->
    <v-avatar size="50" class="assistente-icone">
      <v-icon size="38" color="light-blue-darken-3">mdi-robot</v-icon>
    </v-avatar>
  </div>
</template>

<script setup>
// Importações básicas do Vue Router
import { useRouter, useRoute } from 'vue-router'
import { ref, computed } from 'vue'

// Navegação e rota atual
const router = useRouter()
const route = useRoute()

// Nome do usuário conectado
const usuario = ref(localStorage.getItem('usuario') || 'acadêmico(a)')

// Nome da rota atual (ex: home, reservas, etc)
const rotaAtual = computed(() => route.name?.toLowerCase() || '')

// Nome descritivo da tela atual para exibição amigável
const nomePaginaAtual = computed(() => {
  switch (rotaAtual.value) {
    case 'home':
      return 'tela inicial'
    case 'selecionar-vaga':
      return 'tela de reserva de vagas para carro'
    case 'selecionar-moto':
      return 'tela de reserva de vagas para moto'
    case 'reservas':
      return 'tela de reservas'
    case 'cadastro':
      return 'tela de cadastro'
    default:
      return 'tela desconhecida'
  }
})

// Redireciona para a tela clicada
function irPara(destino) {
  router.push(destino)
}
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
  animation: slide-up 0.6s ease;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.assistente-icone {
  background-color: #e3f2fd;
  border: 2px solid #0288d1;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  animation: pulse 2s infinite;
}

@keyframes slide-up {
  from {
    transform: translateY(20px);
    opacity: 0;
  }

  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes pulse {

  0%,
  100% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.05);
  }
}
</style>
