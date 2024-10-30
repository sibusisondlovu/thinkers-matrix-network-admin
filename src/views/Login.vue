<!-- src/views/Login.vue -->
<template>
    <div class="login">
        <h1>Login</h1>
        <form @submit.prevent="login">
            <label for="email">Email:</label>
            <input v-model="email" type="email" id="email" required />

            <label for="password">Password:</label>
            <input v-model="password" type="password" id="password" required />

            <button type="submit">Log In</button>
        </form>
    </div>
</template>

<script>
export default {
    name: 'Login',
    data() {
        return {
            email: '',
            password: '',
        };
    },
    methods: {
        login() {
            console.log('Logging in:', this.email);
            // Placeholder for actual login logic
        },
    },
};
</script>

<style scoped>
.login {
    max-width: 400px;
    margin: auto;
}
</style>