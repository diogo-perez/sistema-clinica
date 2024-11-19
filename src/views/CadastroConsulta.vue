<template>
    <transition name="fade" @before-enter="beforeEnter" @enter="enter" @leave="leave">
        <div class="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg">
            <h2 class="text-3xl font-semibold text-gray-800 mb-8">Cadastro de Consulta</h2>
            <form @submit.prevent="cadastrarConsulta">
                <div class="space-y-6">
                    <div>
                        <label for="medico" class="block text-sm font-medium text-gray-700">Médico</label>
                        <select v-model="consulta.medicoId" id="medico"
                            class="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            @change="filtrarAgendas" required>
                            <option value="" disabled selected>Selecione o Médico</option>
                            <option v-for="medico in medicos" :key="medico.id" :value="medico.id">
                                {{ medico.nome }}
                            </option>
                        </select>
                    </div>

                    <div>
                        <label for="agenda" class="block text-sm font-medium text-gray-700">Agenda</label>
                        <select v-model="consulta.agendaId" id="agenda"
                            class="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required>
                            <option v-for="agenda in agendasFiltradas" :key="agenda.id" :value="agenda.id">
                                {{ agenda.diasSemana }} - {{ agenda.horarios }}
                            </option>
                        </select>
                    </div>

                    <div>
                        <label for="paciente" class="block text-sm font-medium text-gray-700">Paciente</label>
                        <select v-model="consulta.pacienteId" id="paciente"
                            class="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required>
                            <option v-for="paciente in pacientes" :key="paciente.id" :value="paciente.id">
                                {{ paciente.nome }}
                            </option>
                        </select>
                    </div>

                    <div>
                        <label for="dataHora" class="block text-sm font-medium text-gray-700">Data e Hora</label>
                        <input v-model="consulta.dataHora" type="datetime-local" id="dataHora"
                            class="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required />
                    </div>
                </div>

                <div class="flex justify-end mt-8">
                    <ButtonComponent type="submit">
                        Cadastrar Consulta
                    </ButtonComponent>
                </div>
            </form>
        </div>
    </transition>
</template>

<script>
import api from '@/services/api';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import ButtonComponent from '@/components/Botao.vue';
const notyf = new Notyf();

export default {
    components: {
        ButtonComponent
    },
    data() {
        return {
            consulta: {
                medicoId: '',
                agendaId: '',
                pacienteId: '',
                dataHora: '',
            },
            medicos: [],
            agendas: [],
            agendasFiltradas: [],
            pacientes: [],
        };
    },
    async mounted() {
        await this.carregarMedicos();
        await this.carregarAgendas();
        await this.carregarPacientes();
    },
    methods: {
        async carregarMedicos() {
            try {
                const response = await api.get('/medicos');
                this.medicos = response.data;
            } catch (error) {
                notyf.error('Erro ao carregar médicos');
            }
        },

        async carregarPacientes() {
            try {
                const response = await api.get('/pacientes');
                this.pacientes = response.data;
            } catch (error) {
                notyf.error('Erro ao carregar pacientes');
            }
        },

        async carregarAgendas() {
            try {
                const response = await api.get('/agendas');
                this.agendas = response.data;
                this.filtrarAgendas();
            } catch (error) {
                notyf.error('Erro ao carregar agendas');
            }
        },

        filtrarAgendas() {
            if (this.consulta.medicoId) {
                this.agendasFiltradas = this.agendas.filter(agenda => agenda.medico.id === this.consulta.medicoId);
            } else {
                this.agendasFiltradas = this.agendas;
            }
        },

        async cadastrarConsulta() {
            try {
                const consultaPayload = {
                    agenda: {
                        id: this.consulta.agendaId,
                    },
                    paciente: {
                        id: this.consulta.pacienteId,
                    },
                    dataHora: this.consulta.dataHora,
                };

                await api.post('/consultas', consultaPayload);
                notyf.success('Consulta cadastrada com sucesso!');
                this.consulta = {
                    medicoId: '',
                    agendaId: '',
                    pacienteId: '',
                    dataHora: '',
                };
                this.agendasFiltradas = [];
                this.pacientes = [];
            } catch (error) {
                notyf.error('Erro ao cadastrar consulta');
            }
        },

        beforeEnter(el) {
            el.style.opacity = 0;
        },
        enter(el, done) {
            el.offsetHeight;
            el.style.transition = 'opacity 0.5s ease-in-out';
            el.style.opacity = 1;
            done();
        },
        leave(el, done) {
            el.style.transition = 'opacity 0.5s ease-in-out';
            el.style.opacity = 0;
            done();
        }
    },
};
</script>

<style scoped>
input:focus,
select:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease-in-out;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>
