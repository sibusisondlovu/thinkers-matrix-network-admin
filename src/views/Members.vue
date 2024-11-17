<template>
    <header class="page-header page-header-compact page-header-light border-bottom bg-white mb-4">
        <div class="container-fluid px-4">
            <div class="page-header-content">
                <div class="row align-items-center justify-content-between pt-3">
                    <div class="col-auto mb-3">
                        <h1 class="page-header-title">
                            <div class="page-header-icon"><i data-feather="user"></i></div>
                            All Members
                        </h1>
                    </div>
                    <div class="col-12 col-xl-auto mb-3">
                        <button class="btn btn-primary btn-sm" @click="openModal">
                            Add Member
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
                <table id="members" class="custom-table">
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th class="hide-mobile">Username</th>
                            <th class="hide-mobile">Role</th>
                            <th class="hide-mobile">Leader</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- <tr v-for="member in members" :key="member.id">
                            <td>
                                <div class="d-flex align-items-center">
                                    {{ member.firstName }}
                                </div>
                            </td>
                            <td>{{ member.lastName }}</td>
                            <td class="hide-mobile">{{ member.username }}</td>
                            <td class="hide-mobile">
                                {{ member.type }}
                            </td>
                            <td class="hide-mobile">{{ member.leaderId }}</td>
                            <td>
                                <a class="btn btn-primary btn-sm" @click="viewApprentices(member.leaderId)">View
                                    Apprentices</a>
                            </td>
                        </tr> -->
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="addMemberModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Add Member</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <!-- Add Member Form -->
                    <form @submit.prevent="addMember">
                        <div class="row mb-3">
                            <!-- Full Name -->
                            <div class="col-md-6">
                                <label for="fullName" class="form-label">Full Name</label>
                                <input v-model="member.fullName" type="text" class="form-control" id="fullName"
                                    placeholder="Enter full name" required />
                            </div>

                            <!-- Mobile Number -->
                            <div class="col-md-6">
                                <label for="mobileNumber" class="form-label">Mobile Number</label>
                                <input v-model="member.mobileNumber" type="text" class="form-control" id="mobileNumber"
                                    placeholder="Enter mobile number" required />
                            </div>
                        </div>

                        <div class="mb-3">
                            <!-- Role -->
                            <label for="role" class="form-label">Role</label>
                            <select v-model="member.role" id="role" class="form-select" required>
                                <option value="leader">Leader</option>
                                <option value="apprentice">Apprentice</option>
                            </select>
                        </div>

                        <div v-if="member.role === 'apprentice'" class="mb-3">
                            <!-- Select Leader -->
                            <label for="leader" class="form-label">Select Leader</label>
                            <select v-model="member.leaderId" id="leader" class="form-select">
                                <option v-for="leader in leaders" :key="leader.id" :value="leader.id">
                                    {{ leader.fullName }}
                                </option>
                            </select>
                        </div>

                        <!-- Spinner -->
                        <div v-if="loading" class="text-center my-3">
                            <div class="spinner-border" role="status"></div>
                        </div>

                        <!-- Submit Button -->
                        <button type="submit" class="btn btn-primary" :disabled="loading">
                            Add Member
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { db } from '@/firebaseConfig';
import { collection, doc, setDoc } from 'firebase/firestore';

export default {
    name: 'AddMemberModal',
    data() {
        return {
            loading: false,
            member: {
                fullName: '',
                mobileNumber: '',
                role: 'leader',
                leaderId: null,
                points: 0,
            },
            leaders: [],
        };
    },
    methods: {
        async fetchLeaders() {
            // Fetch leaders from Firestore
            const querySnapshot = await getDocs(
                query(collection(db, 'members'), where('role', '==', 'leader'))
            );
            this.leaders = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        },
        openModal() {
            const modal = new bootstrap.Modal(document.getElementById('addMemberModal'));
            modal.show();
        },
        async addMember() {
            this.loading = true;

            try {
                const docRef = doc(collection(db, 'members'), this.member.fullName); // Unique ID (or generate UUID)
                await setDoc(docRef, {
                    ...this.member,
                    createdAt: new Date().toISOString(),
                });

                this.$toasty.success('Member added successfully!');
                this.resetForm();
            } catch (error) {
                console.error('Error adding member:', error);
                this.$toasty.error('Failed to add member. Please try again.');
            } finally {
                this.loading = false;
                const modal = bootstrap.Modal.getInstance(document.getElementById('addMemberModal'));
                modal.hide();
            }
        },
        resetForm() {
            this.member = {
                fullName: '',
                mobileNumber: '',
                role: 'leader',
                leaderId: null,
                points: 0,
            };
        },
    },
    mounted() {
        this.fetchLeaders();
    },
};
</script>


<style>
.custom-table {
    width: 100%;
    border-collapse: collapse;
    margin: 1rem 0;
}

.custom-table th,
.custom-table td {
    padding: 0.5rem;
    border: 1px solid #dee2e6;
}

.custom-table tbody tr:hover {
    background-color: rgba(0, 0, 0, .075);
}

/* Hide specific columns on mobile */
@media screen and (max-width: 768px) {
    .custom-table .hide-mobile {
        display: none;
    }
}
</style>