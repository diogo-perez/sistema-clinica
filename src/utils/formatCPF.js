export function formatCPF(cpf) {
    cpf = cpf.replace(/\D/g, '');

    if (cpf.length <= 11) {
        cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{1})/, '$1.$2.$3-$4');
    }

    return cpf;
}
