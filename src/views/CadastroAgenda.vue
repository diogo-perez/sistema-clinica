<template>
    <div class="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg">
        <h2 class="text-3xl font-semibold text-gray-800 mb-8">Cadastro de Agenda</h2>

        <form @submit.prevent="cadastrarAgenda">
            <div class="space-y-6">
                <div>
                    <label for="dias" class="block text-sm font-medium text-gray-700">Dias da Semana</label>
                    <select v-model="agenda.dias" multiple id="dias" class="mt-2 w-full custom-select" required>
                        <option v-for="dia in diasDaSemana" :key="dia.value" :value="dia.value">
                            {{ dia.label }}
                        </option>
                    </select>
                </div>
                <div>
                    <label for="horarios" class="block text-sm font-medium text-gray-700">Horários</label>
                    <select v-model="agenda.horarios" multiple id="horarios" class="mt-2 w-full custom-select" required>
                        <option v-for="horario in horasDisponiveis" :key="horario.value" :value="horario.value">
                            {{ horario.label }}
                        </option>
                    </select>
                </div>
                <div>
                    <label for="medicoId" class="block text-sm font-medium text-gray-700">Médico</label>
                    <select v-model="agenda.medicoId" id="medicoId"
                        class="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 custom-select"
                        required>
                        <option value="" disabled selected>Selecione o Médico</option>
                        <option v-for="medico in medicos" :key="medico.id" :value="medico.id">{{ medico.nome }}</option>
                    </select>
                </div>
            </div>

            <div class="flex justify-end mt-8">
                <ButtonComponent type="submit">
                    Cadastrar Agenda
                </ButtonComponent>
            </div>
        </form>
    </div>
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
            agenda: {
                dias: [],
                horarios: [],
                medicoId: '',
            },
            medicos: [],
            diasDaSemana: [
                { label: 'Segunda', value: 'SEGUNDA' },
                { label: 'Terça', value: 'TERCA' },
                { label: 'Quarta', value: 'QUARTA' },
                { label: 'Quinta', value: 'QUINTA' },
                { label: 'Sexta', value: 'SEXTA' },
                { label: 'Sábado', value: 'SABADO' },
                { label: 'Domingo', value: 'DOMINGO' }
            ],
            horasDisponiveis: this.generateHorarios(),
        };
    },
    methods: {
        async cadastrarAgenda() {
            try {
                const diasSemana = this.agenda.dias;
                const horarios = this.agenda.horarios;

                const body = {
                    medico: {
                        id: this.agenda.medicoId
                    },
                    diasSemana: diasSemana,
                    horarios: horarios,
                };

                const response = await api.post('/agendas', body);

                if (response.status === 201) {
                    notyf.success('Agenda cadastrada com sucesso!');
                    this.agenda = {
                        dias: [],
                        horarios: [],
                        medicoId: '',
                    };
                } else {
                    notyf.error('Erro ao cadastrar agenda');
                }
            } catch (error) {
                notyf.error('Erro ao cadastrar agenda');
            }
        },
        async buscarMedicos() {
            try {
                const response = await api.get('/medicos');
                this.medicos = response.data;
            } catch (error) {
                notyf.error('Erro ao buscar médicos:', error);
            }
        },
        generateHorarios() {
            const horarios = [];
            for (let i = 6; i < 24; i++) {
                const startHour = i < 10 ? `0${i}` : i;
                const startTime = `${startHour}:00`;
                const endHour = i < 10 ? `0${i}` : i;
                const endTime = `${endHour}:50`;
                horarios.push({
                    label: `${startTime} - ${endTime}`,
                    value: `${startTime}-${endTime}`
                });
            }
            return horarios;
        },
    },
    created() {
        this.buscarMedicos();
    },
};
</script>


<style scoped>
input:focus,
select:focus {
    border-color: #00bcd4;
    box-shadow: 0 0 0 2px rgba(0, 188, 212, 0.5);
}

.custom-select {
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    border: 1px solid #ddd;
    background-color: white;
    color: #333;
    font-size: 1rem;
    width: 100%;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.custom-select:focus {
    border-color: #00bcd4;
    box-shadow: 0 0 0 2px rgba(0, 188, 212, 0.5);
}

.custom-select option {
    padding: 0.5rem;
}

.custom-select option:checked {
    background-color: #00bcd4;
    color: white;
}

.custom-select option:focus {
    background-color: #00bcd4;
    color: white;
}
</style>
