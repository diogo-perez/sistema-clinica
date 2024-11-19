<template>
    <transition name="fade" @before-enter="beforeEnter" @enter="enter" @leave="leave">
        <div class="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg">
            <h2 class="text-3xl font-semibold text-gray-800 mb-8">Cadastro de Médico</h2>

            <form @submit.prevent="cadastrarMedico">
                <div class="space-y-6">
                    <div>
                        <label for="nome" class="block text-sm font-medium text-gray-700">Nome</label>
                        <input v-model="medico.nome" type="text" id="nome" placeholder="Nome do médico"
                            class="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required />
                    </div>

                    <div>
                        <label for="conselho" class="block text-sm font-medium text-gray-700">Conselho</label>
                        <input v-model="medico.conselho" type="text" id="conselho" placeholder="Número do conselho"
                            class="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required />
                    </div>

                    <!-- Transformando o input em um select com todas as UFs -->
                    <div>
                        <label for="estado" class="block text-sm font-medium text-gray-700">Estado</label>
                        <select v-model="medico.estado" id="estado"
                            class="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required>
                            <option value="" disabled selected>Selecione o Estado</option>
                            <!-- Loop para as opções de UFs -->
                            <option v-for="uf in ufs" :key="uf" :value="uf">{{ uf }}</option>
                        </select>
                    </div>
                </div>

                <div class="flex justify-end mt-8">
                    <ButtonComponent type="submit">
                        Cadastrar Médico
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
        ButtonComponent,
    },
    data() {
        return {
            medico: {
                nome: '',
                conselho: '',
                estado: '',
            },
            ufs: [
                'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
                'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
                'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
            ],
        };
    },
    methods: {
        async cadastrarMedico() {
            try {
                const response = await api.post('/medicos', this.medico);
                if (response.status == 201) {
                    notyf.success('Médico cadastrado com sucesso!');
                    this.medico = {
                        nome: '',
                        conselho: '',
                        estado: '',
                    };
                }
            } catch (error) {
                notyf.error('Erro ao cadastrar médico');
            }
        },

        // Métodos de transição (optional para controle)
        beforeEnter(el) {
            el.style.opacity = 0;
        },
        enter(el, done) {
            el.offsetHeight; // trigger reflow
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

/* Transição personalizada */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease-in-out;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>
