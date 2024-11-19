<template>
    <div class="font-montserrat bg-gray-50 min-h-1">
        <!-- Navbar -->
        <nav class="bg-cyan-pool p-4 shadow-md">
            <div class="max-w-7xl mx-auto flex justify-between items-center">
                <!-- Título com link -->
                <router-link to="/" class="text-white text-xl font-bold">
                    Sistema Clínica
                </router-link>

                <!-- Navegação -->
                <ul class="flex space-x-6">
                    <li>
                        <router-link to="/cadastro-medicos"
                            class="flex items-center text-white hover:text-gray-300 transition relative">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M6 8v13M18 8v13M9 21h6M9 8V5a3 3 0 016 0v3" />
                            </svg>
                            Cadastro de Médicos
                            <span
                                class="absolute bottom-[-8px] left-0 w-full h-0.5 bg-yellow-400 scale-x-0 transition-transform duration-300"></span>
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/cadastro-agendas"
                            class="flex items-center text-white hover:text-gray-300 transition relative">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M8 7h8M8 11h8M8 15h4M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z" />
                            </svg>
                            Cadastro de Agendas
                            <span
                                class="absolute bottom-[-8px] left-0 w-full h-0.5 bg-yellow-400 scale-x-0 transition-transform duration-300"></span>
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/cadastro-pacientes"
                            class="flex items-center text-white hover:text-gray-300 transition relative">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M14 10h4a2 2 0 012 2v6a2 2 0 01-2 2h-4m-4 0H6a2 2 0 01-2-2v-6a2 2 0 012-2h4m-1-4h6m-6 0a3 3 0 100-6 3 3 0 000 6z" />
                            </svg>
                            Cadastro de Pacientes
                            <span
                                class="absolute bottom-[-8px] left-0 w-full h-0.5 bg-yellow-400 scale-x-0 transition-transform duration-300"></span>
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/cadastro-consultas"
                            class="flex items-center text-white hover:text-gray-300 transition relative">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M8 11h8m-8 4h8M9 5h6M4 5h16a2 2 0 012 2v14a2 2 0 01-2 2H4a2 2 0 01-2-2V7a2 2 0 012-2z" />
                            </svg>
                            Cadastro de Consultas
                            <span
                                class="absolute bottom-[-8px] left-0 w-full h-0.5 bg-yellow-400 scale-x-0 transition-transform duration-300"></span>
                        </router-link>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
</template>

<script>
export default {
    name: 'ClinicHeader',
}
</script>

<style scoped>
/* Efeito de borda amarela nos links ativos */
.router-link-active span {
    transform: scaleX(1);
    /* Mostra a borda quando a rota estiver ativa */
}

.router-link-active {
    font-weight: bold;
    /* Deixa o texto em negrito */
}
</style>