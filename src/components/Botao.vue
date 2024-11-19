<template>
    <button :class="[
        'px-6 py-3 rounded-md shadow-lg transition duration-200 ease-in-out focus:outline-none',
        'bg-cyan-500 hover:bg-cyan-600 focus:ring-2 focus:ring-cyan-400'
    ]" :type="type" @click="onClick">
        <slot></slot>
    </button>
</template>
<script>
export default {
    name: 'ButtonComponent',
    props: {
        type: {
            type: String,
            default: 'button',
        },
        onClick: {
            type: Function,
            default: () => { },
        },
    },
};
</script>

<style scoped>
button:focus {
    box-shadow: 0 0 0 2px rgba(0, 139, 139, 0.5);
}
</style>