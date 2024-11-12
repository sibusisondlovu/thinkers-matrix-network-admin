<template>
    <header class="page-header page-header-compact page-header-light border-bottom bg-white mb-4">
        <div class="container-fluid px-4">
            <div class="page-header-content">
                <div class="row align-items-center justify-content-between pt-3">
                    <div class="col-auto mb-3">
                        <h1 class="page-header-title">
                            <div class="page-header-icon"><i data-feather="user"></i></div>
                            {{ leaderName }}'s Apprentices
                        </h1>
                    </div>
                    <div class="col-12 col-xl-auto mb-3">
                        <button class="btn btn-sm btn-primary" @click="goBackAndClose">
                            Back To Leaders
                        </button>
                        <button class="btn btn-sm btn-light text-primary" @click="navigateToAddApprentice">

                            Add Apprentice
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </header>
    <!-- Main page content-->
    <div class="container-fluid px-4">
        <div class="card">
            <div class="card-body">
                <table id="members" class="table table-sm table-hover">
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Points</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="apprentice in apprentices" :key="apprentice.id">
                            <td>{{ apprentice.firstName }}</td>
                            <td>{{ apprentice.lastName }}</td>

                            <td>{{ apprentice.points }}</td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import { db } from '@/firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';

export default {
    name: 'LeaderApprentices',
    props: {
        leaderId: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            apprentices: [],
            leaderName: ''
        };
    },
    methods: {
        goBackAndClose() {
            this.$router.go(-1);  
            setTimeout(() => {
                window.close(); 
            }, 500); 
        },
        navigateToAddApprentice() {
            this.$router.push({ name: 'AddApprentice' });
        },

        async fetchApprentices() {
            try {
                // Query sub_leaders based on leaderId prop
                const apprenticesQuery = query(
                    collection(db, 'members', this.leaderId, 'sub_leaders'),
                    //where("leaderId", "==", "this.leaderId")
                );
                const querySnapshot = await getDocs(apprenticesQuery);
                this.apprentices = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            } catch (error) {
                console.error("Error fetching apprentices:", error);
            }
        },
    },
    async mounted() {
        await this.fetchApprentices();
    }
};
</script>
