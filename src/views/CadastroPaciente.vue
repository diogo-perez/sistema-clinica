<template>
    <transition name="fade" @before-enter="beforeEnter" @enter="enter" @leave="leave">
        <div class="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg">
            <h2 class="text-3xl font-semibold text-gray-800 mb-8">Cadastro de Paciente</h2>

            <form @submit.prevent="cadastrarPaciente">
                <div class="space-y-6">
                    <!-- Nome -->
                    <div>
                        <label for="nome" class="block text-sm font-medium text-gray-700">Nome</label>
                        <input v-model="paciente.nome" type="text" id="nome" placeholder="Nome do paciente"
                            class="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required />
                    </div>

                    <!-- CPF com máscara -->
                    <div>
                        <label for="cpf" class="block text-sm font-medium text-gray-700">CPF</label>
                        <input v-model="paciente.cpf" @input="mascararCPF" type="text" id="cpf"
                            placeholder="CPF do paciente"
                            class="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            maxlength="14" required />
                    </div>

                    <!-- Telefone com máscara -->
                    <div>
                        <label for="telefone" class="block text-sm font-medium text-gray-700">Telefone</label>
                        <input v-model="paciente.telefone" @input="mascararTelefone" type="text" id="telefone"
                            placeholder="(XX) 9 9176-2618"
                            class="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            maxlength="15" required />
                    </div>

                    <!-- Data de Nascimento -->
                    <div>
                        <label for="dataNascimento" class="block text-sm font-medium text-gray-700">Data de
                            Nascimento</label>
                        <input v-model="paciente.dataNascimento" type="date" id="dataNascimento"
                            class="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required />
                    </div>
                </div>

                <div class="flex justify-end mt-8">
                    <ButtonComponent type="submit">
                        Cadastrar Paciente
                    </ButtonComponent>
                </div>
            </form>
        </div>
    </transition>
</template>

<script>
import api from '@/services/api';
import { formatCPF } from '@/utils/formatCPF';
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
            paciente: {
                nome: '',
                cpf: '',
                telefone: '',
                dataNascimento: '',
            },
        };
    },
    methods: {
        mascararCPF(event) {
            let valor = event.target.value.replace(/\D/g, '').slice(0, 11);
            this.paciente.cpf = formatCPF(valor);
        },

        mascararTelefone(event) {
            let valor = event.target.value.replace(/\D/g, '').slice(0, 11);
            if (valor.length > 10) {
                valor = valor.replace(/(\d{2})(\d{1})(\d{4})(\d{4})/, '($1) $2 $3-$4');
            } else if (valor.length > 5) {
                valor = valor.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
            } else if (valor.length > 2) {
                valor = valor.replace(/(\d{2})(\d{1})/, '($1) $2');
            }
            this.paciente.telefone = valor;
        },

        async cadastrarPaciente() {
            try {
                await api.post('/pacientes', this.paciente);
                notyf.success('Paciente cadastrado com sucesso!');
                this.paciente = {
                    nome: '',
                    cpf: '',
                    telefone: '',
                    dataNascimento: '',
                };
            } catch (error) {
                notyf.error('Erro ao cadastrar paciente');
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
