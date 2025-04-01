// Importa as funções do Vue Router necessárias para criar e controlar as rotas
import { createRouter, createWebHistory } from 'vue-router'

// Importa as views que serão associadas às rotas
import Home from '../views/Home.vue'
import VagaDetalhe from '../views/VagaDetalhe.vue'
import Login from '../views/Login.vue'
import Cadastro from '../views/Cadastro.vue'
import Reservas from '../views/Reservas.vue'
import SelecionarVaga from '../views/SelecionarVaga.vue'
import SelecionarMoto from '../views/SelecionarMoto.vue'

// Define a lista de rotas e os componentes que cada uma deve renderizar
const routes = [
  // Rota principal (Login)
  { path: '/', component: Login, name: 'login' },

  // Página inicial após login
  { path: '/home', component: Home, name: 'home' },

  // Página de detalhes da vaga (com parâmetro dinâmico :id)
  { path: '/vaga/:id', component: VagaDetalhe, name: 'vaga-detalhe' },

  // Página de cadastro de usuário
  { path: '/cadastro', component: Cadastro, name: 'cadastro' },

  // Página que lista todas as reservas do usuário
  { path: '/reservas', component: Reservas, name: 'reservas' },

  // Página para selecionar vagas de carro
  { path: '/selecionar', component: SelecionarVaga, name: 'selecionar-vaga' },

  // Página para selecionar vagas de moto
  { path: '/selecionar-moto', component: SelecionarMoto, name: 'selecionar-moto' },
]

// Cria a instância do roteador com histórico baseado em URL (sem hash #)
const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Exporta o roteador para ser usado na aplicação
export default router
