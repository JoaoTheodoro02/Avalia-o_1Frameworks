<template>
  <!-- Transição visual para suavizar a exibição do card -->
  <transition name="fade-zoom">
    <!-- Cartão que representa visualmente a vaga -->
    <v-card class="pa-4 d-flex flex-column align-center" elevation="6" :class="customClass">

      <!-- Ícone fixo representando vaga de moto (pode ser dinâmico no futuro) -->
      <v-icon color="indigo" size="30" class="mb-2">mdi-motorbike</v-icon>

      <!-- Título do card exibindo o número da vaga (ex: Vaga Lateral) -->
      <div class="text-h6 font-weight-bold">
        Vaga {{ numero }}
      </div>

      <!-- Exibição do bloco ao qual a vaga pertence -->
      <div>
        <strong>Bloco:</strong> {{ bloco }}
      </div>

      <!-- Botão com ação configurável (ex: Reservar) -->
      <v-btn v-if="botaoTexto" :color="botaoCor" class="mt-4" @click="onClick">
        {{ botaoTexto }}
      </v-btn>
    </v-card>
  </transition>
</template>

<script setup>
// Define todas as propriedades esperadas pelo componente
defineProps({
  // Identificador da vaga (ex: A1, M3, Lateral)
  numero: String,

  // Bloco relacionado à vaga (ex: Bloco M)
  bloco: String,

  // Texto exibido no botão (ex: "Reservar Vaga (MOTO)")
  botaoTexto: String,

  // Cor do botão (ex: 'red', 'blue') — padrão: 'primary'
  botaoCor: {
    type: String,
    default: 'primary'
  },

  // Função a ser executada ao clicar no botão
  onClick: Function,

  // Classe extra opcional para estilização personalizada do card
  customClass: String
})
</script>

<style scoped>
/* Transição de entrada e saída do card */
.fade-zoom-enter-active,
.fade-zoom-leave-active {
  transition: all 0.3s ease;
}

.fade-zoom-enter-from,
.fade-zoom-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
</style>
