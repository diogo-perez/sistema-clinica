import { createRouter, createWebHistory } from 'vue-router';
import CadastroMedicos from '@/views/CadastroMedico.vue';
import CadastroAgendas from '@/views/CadastroAgenda.vue';
import CadastroPacientes from '@/views/CadastroPaciente.vue';
import CadastroConsultas from '@/views/CadastroConsulta.vue';
import HomePage from '@/views/Home.vue';

const routes = [
    { path: '/', component: HomePage },
    { path: '/cadastro-medicos', component: CadastroMedicos },
    { path: '/cadastro-agendas', component: CadastroAgendas },
    { path: '/cadastro-pacientes', component: CadastroPacientes },
    { path: '/cadastro-consultas', component: CadastroConsultas },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
