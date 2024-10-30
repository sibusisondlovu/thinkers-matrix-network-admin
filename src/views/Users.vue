<!-- src/views/Users.vue -->
<template>
    <div class="users">
        <h1>Users</h1>
        <button @click="addUser">Add User</button>
        <ul>
            <li v-for="user in users" :key="user.id">
                {{ user.name }}
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'Users',
    data() {
        return {
            users: [
                { id: 1, name: 'User 1' },
                { id: 2, name: 'User 2' },
            ],
        };
    },
    methods: {
        addUser() {
            console.log('Add user button clicked');
            // Placeholder for adding a new user
        },
    },
};
</script>

<style scoped>
.users {
    padding: 20px;
}
</style>