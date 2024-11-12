<template>
    <header class="page-header page-header-compact page-header-light border-bottom bg-white mb-4">
        <div class="container-xl px-4">
            <div class="page-header-content">
                <div class="row align-items-center justify-content-between pt-3">
                    <div class="col-auto mb-3">
                        <h1 class="page-header-title">
                            <div class="page-header-icon"><i data-feather="user-plus"></i></div>
                            Add User
                        </h1>
                    </div>
                    <div class="col-12 col-xl-auto mb-3">
                        <button class="btn btn-sm btn-light text-primary" @click="navigateToAllUsers">
            
                            Back to Users List
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </header>
    <!-- Main page content-->
    <div class="container-xl px-4 mt-4">
        <div class="row">
            <div class="col-xl-8">
                <!-- Account details card-->
                <div class="card mb-4">
                    <div class="card-header">Account Details</div>
                    <div class="card-body">
                        <form @submit.prevent="addUser">
                            <div class="row gx-3 mb-3">
                                <!-- First name input-->
                                <div class="col-md-6">
                                    <label class="small mb-1" for="inputFirstName">First name</label>
                                    <input class="form-control" v-model="user.firstName" id="inputFirstName" type="text"
                                        placeholder="Enter your first name" />
                                </div>
                                <!-- Last name input-->
                                <div class="col-md-6">
                                    <label class="small mb-1" for="inputLastName">Last name</label>
                                    <input class="form-control" v-model="user.lastName" id="inputLastName" type="text"
                                        placeholder="Enter your last name" />
                                </div>
                            </div>
                            <!-- Contact Number input-->
                            <div class="mb-3">
                                <label class="small mb-1" for="inputMobileNumber">Contact Number</label>
                                <input class="form-control" v-model="user.contactNumber" id="inputMobileNumber"
                                    type="text" placeholder="Enter your mobile number" />
                            </div>
                            <!-- Role selection-->
                            <div class="mb-3">
                                <label class="small mb-1">Role</label>
                                <select class="form-select" v-model="selectedRole">
                                    <option selected disabled>Select a role:</option>
                                    <option value="administrator">Administrator</option>
                                    <option value="leader">Leader</option>
                                    <option value="apprentice">Apprentice</option>
                                    <option value="guest">Guest</option>
                                </select>
                            </div>

                            <div v-if="selectedRole === 'leader'" class="mb-3">
                                <label class="small mb-1">Leader</label>
                                <select class="form-select" v-model="user.leaderId">
                                    <option v-for="leader in leaders" :key="leader.id" :value="leader.id">
                                        {{ leader.name }}
                                    </option>
                                </select>
                            </div>

                            <!-- Submit button with loading spinner-->
                            <button class="btn btn-primary" type="submit" :disabled="loading">
                                <span v-if="loading" class="spinner-border spinner-border-sm" role="status"
                                    aria-hidden="true"></span>
                                <span v-if="loading">Adding...</span>
                                <span v-else>Add user</span>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { db } from '@/firebaseConfig'; // Make sure the path to firebase.js is correct
import { collection, doc, setDoc } from 'firebase/firestore';

export default {
    name: 'AddUser',
    data() {
        return {
            user: {
                firstName: '',
                lastName: '',
                contactNumber: '',
                email: '',
                password: 'secretPassword',  
                displayName: '', 
            },
            selectedRole: null,
            leaders: [
                { id: 1, name: 'Leader 1' },
                { id: 2, name: 'Leader 2' },
                { id: 3, name: 'Leader 3' }
            ],
            loading: false // Track loading state
        };
    },
    methods: {
        navigateToAllUsers() {
            this.$router.push({ name: 'Members' });
        },
        generateUsername() {
            const randomNumber = Math.floor(100000 + Math.random() * 900000);
            return `TNM${randomNumber}`;
        },
        generatePassword() {
            const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            let password = "";
            for (let i = 0; i < 10; i++) {
                const randomIndex = Math.floor(Math.random() * chars.length);
                password += chars[randomIndex];
            }
            return password;
        },
        async addUser() {
            // Start loading
            this.loading = true;

            // Prepare the data to send
            const data = {
                username: this.generateUsername() + '@thinkersrulers.com',
                password: this.generatePassword(),
                displayName: `${this.user.firstName} ${this.user.lastName}`
            };

            try {
                const response = await axios.post('http://localhost:3000/create-user', data);

                if (response.status === 201) {
                    alert('User created successfully!' + response.data);

                    const userData = {
                        firstName: this.user.firstName,
                        lastName: this.user.lastName,
                        contactNumber: this.user.contactNumber,
                        password: data.password,
                        username: data.username,
                        role: this.selectedRole, // Assuming you want to store the role too
                    };
               
                    const uid = response.data.message; // Assuming the API returns the uid of the user
                    const userRef = doc(db, 'members', uid); // Firestore document reference
                    await setDoc(userRef, userData);

                    // Clear the form
                    this.user = {
                        firstName: '',
                        lastName: '',
                        contactNumber: '',
                        email: '',
                        password: '',
                        displayName: ''
                    };
                    this.selectedRole = null;

                    // Redirect to members component
                    this.$router.push('/members');
                } else {
                    alert('Error: ' + response.data.message);
                }
            } catch (error) {
                console.error("There was an error creating the user:", error);
                alert('Failed to create user. Please try again.');
            } finally {
                // Stop loading
                this.loading = false;
            }
        }
    }
};
</script>
