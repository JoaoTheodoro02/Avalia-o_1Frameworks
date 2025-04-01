<template>
  <!-- Container principal com fundo em gradiente -->
  <v-container fluid class="pa-8"
    style="background: linear-gradient(to right, #0f2027, #203a43, #2c5364); min-height: 100vh; color: white;">

    <!-- Cartão principal com conteúdo de reservas -->
    <v-card class="mx-auto" elevation="12" max-width="1000">
      <!-- Título do card + botão de exportar CSV -->
      <v-card-title class="text-h5 font-weight-bold justify-space-between">
        Minhas Reservas
        <v-btn icon @click="exportarCSV">
          <v-icon color="primary">mdi-download</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text>
        <!-- Filtros por bloco e data -->
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field v-model="filtroBloco" label="Filtrar por Bloco" clearable></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field v-model="filtroData" label="Filtrar por Data" type="date" clearable></v-text-field>
          </v-col>
        </v-row>

        <!-- Tabela de reservas de carro -->
        <h3 class="reserva-titulo">🚗 Reservas de Carro</h3>
        <v-data-table :headers="headers" :items="reservasCarro" :items-per-page="5" class="elevation-1 mt-2 mb-8">
          <template #item.acao="{ item }">
            <v-icon small class="mr-2" color="red" @click="cancelarReserva(item)">mdi-delete</v-icon>
          </template>
        </v-data-table>

        <!-- Tabela de reservas de moto -->
        <h3 class="reserva-titulo">🏍️ Reservas de Moto</h3>
        <v-data-table :headers="headers" :items="reservasMoto" :items-per-page="5" class="elevation-1 mt-2 mb-4">
          <template #item.acao="{ item }">
            <v-icon small class="mr-2" color="red" @click="cancelarReserva(item)">mdi-delete</v-icon>
          </template>
        </v-data-table>

        <!-- Botão de retorno à home -->
        <v-btn color="primary" variant="text" class="mt-4" @click="router.push('/home')">
          <v-icon start>mdi-arrow-left</v-icon>
          Voltar para Home
        </v-btn>
      </v-card-text>
    </v-card>

    <!-- Robô assistente na tela -->
    <AssistenteVirtual />
  </v-container>
</template>

<script setup>
// Importações do Vue e roteador
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

// Importa o componente do UNEMATBot
import AssistenteVirtual from '@/components/AssistenteVirtual.vue'

// Instância do roteador
const router = useRouter()

// Filtros de pesquisa por bloco e data
const filtroBloco = ref('')
const filtroData = ref('')

// Lista de reservas armazenadas
const reservas = ref([])

// Cabeçalhos da tabela
const headers = [
  { title: 'Data/Hora', key: 'dataHora' },
  { title: 'Vaga/Bloco', key: 'vaga' },
  { title: 'Tipo', key: 'tipo' },
  { title: 'Ações', key: 'acao', sortable: false }
]

// Ao montar o componente, carrega as reservas do localStorage
onMounted(() => {
  const dados = JSON.parse(localStorage.getItem('reservas') || '[]')
  reservas.value = dados
})

// Formata a data no padrão dd/mm/yyyy + hora
function formatarDataHora(dataISO, hora) {
  const [ano, mes, dia] = dataISO.split('-')
  return `${dia}/${mes}/${ano}${hora ? ' ' + hora : ''}`
}

// Computed com reservas formatadas para exibição
const reservasFormatadas = computed(() => {
  return reservas.value.map(r => ({
    ...r,
    dataHora: formatarDataHora(r.data, r.hora)
  }))
})

// Filtra somente reservas de carro com os critérios
const reservasCarro = computed(() =>
  reservasFormatadas.value.filter(r =>
    r.tipo === 'carro' &&
    r.bloco.toLowerCase().includes(filtroBloco.value.toLowerCase()) &&
    (!filtroData.value || r.data === filtroData.value)
  )
)

// Filtra somente reservas de moto com os critérios
const reservasMoto = computed(() =>
  reservasFormatadas.value.filter(r =>
    r.tipo === 'moto' &&
    r.bloco.toLowerCase().includes(filtroBloco.value.toLowerCase()) &&
    (!filtroData.value || r.data === filtroData.value)
  )
)

// Remove reserva com base no ID
function cancelarReserva(item) {
  reservas.value = reservas.value.filter(r => r.id !== item.id)
  localStorage.setItem('reservas', JSON.stringify(reservas.value))
}

// Exporta todas as reservas como CSV
function exportarCSV() {
  const dados = reservas.value
  const csv = ['Data,Hora,Bloco,Tipo']
  dados.forEach(r => {
    csv.push(`${formatarDataHora(r.data)},${r.hora || ''},${r.bloco},${r.tipo}`)
  })

  const blob = new Blob([csv.join('\n')], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.setAttribute('download', 'reservas.csv')
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
</script>

<style scoped>
/* Estilo para o título das seções de reservas */
.reserva-titulo {
  font-size: 1.25rem;
  font-weight: bold;
  background-color: #f5f5f5;
  color: #333;
  padding: 12px 16px;
  border-left: 6px solid #1976D2;
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-top: 30px;
}
</style>
