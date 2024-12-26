<template>
    <div class="container mt-4">
        <!-- Header Section -->
        <div class="d-flex justify-content-between align-items-center mb-3">
            <h2 class="fw-bold">Thinkers Network Members</h2>
            <button class="btn btn-sm btn-primary" @click="showAddMemberModal">
                <i class="bi bi-person-plus me-1"></i> Add Member
            </button>
        </div>

        <!-- Cards Section -->
        <div class="row g-3">
            <div class="col-12 col-md-4 col-lg-3" v-for="member in members" :key="member.id">
                <div class="card shadow-sm text-center h-100">
                    <img :src="member.avatar" alt="Avatar" class="card-img-top"
                        style="height: 150px; object-fit: cover;" />
                    <div class="card-body">
                        <h5 class="card-title fw-bold">{{ member.name }} {{ member.surname }}</h5>
                        <p class="card-text text-muted">
                            {{ member.homecell }} - {{ member.role }}
                        </p>
                        <div>
                            <button class="btn btn-outline-primary btn-sm me-2" v-if="member.role !== 'Apprentice'">
                                <i class="bi bi-diagram-3"></i> Matrix
                            </button>
                            <button class="btn btn-outline-secondary btn-sm">
                                <i class="bi bi-person-circle"></i> Profile
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Add Member Modal -->
        <div class="modal fade" id="addMemberModal" tabindex="-1" aria-labelledby="addMemberModalLabel"
            aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="addMemberModalLabel">Add New Member</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <!-- Modal Body: Adjusted Form Layout with Small Text Boxes -->
                    <div class="modal-body">
                        <form @submit.prevent="addMember">
                            <!-- Name and Surname on the Same Line -->
                            <div class="row mb-2">
                                <div class="col-md-6">
                                    <label class="form-label">Name</label>
                                    <input type="text" class="form-control form-control-sm" v-model="newMember.name"
                                        required />
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label">Surname</label>
                                    <input type="text" class="form-control form-control-sm" v-model="newMember.surname"
                                        required />
                                </div>
                            </div>

                            <!-- Homecell and Role on the Same Line -->
                            <div class="row mb-2">
                                <div class="col-md-6">
                                    <label class="form-label">Homecell</label>
                                    <select class="form-select form-select-sm" v-model="newMember.homecell" required>
                                        <option disabled value="">Select Homecell</option>
                                        <option>Homecell 1</option>
                                        <option>Homecell 2</option>
                                        <option>Homecell 3</option>
                                    </select>
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label">Role</label>
                                    <select class="form-select form-select-sm" v-model="newMember.role" required>
                                        <option disabled value="">Select Role</option>
                                        <option>Leader</option>
                                        <option>Apprentice</option>
                                    </select>
                                </div>
                            </div>

                            <!-- Contact Number and Email on the Same Line -->
                            <div class="row mb-2">
                                <div class="col-md-6">
                                    <label class="form-label">Contact Number</label>
                                    <input type="text" class="form-control form-control-sm"
                                        v-model="newMember.contactNumber" required />
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label">Email Address</label>
                                    <input type="email" class="form-control form-control-sm"
                                        v-model="newMember.emailAddress" required />
                                </div>
                            </div>

                            <!-- Submit Button -->
                            <button type="submit" class="btn btn-primary btn-sm w-100">
                                <span v-if="isSubmitting" class="spinner-border spinner-border-sm" role="status"
                                    aria-hidden="true"></span>
                                <span v-else>Add Member</span>
                            </button>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "@/firebaseConfig";


export default {
    name: "Members",
    async mounted() {
        try {
            const membersSnapshot = await getDocs(collection(db, "members"));
            this.members = membersSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        } catch (error) {
            console.error("Error fetching members:", error);
            // Handle error (e.g., display error message to user using toast or another method)
        }
    },
    data() {
        return {
            members: [], // Members list
            newMember: {
                name: "",
                surname: "",
                homecell: "",
                contactNumber: "",
                emailAddress: "",
                role: "",
                avatar: "https://via.placeholder.com/150",
                points: 0,
                username: "",
            },
            isSubmitting: false, // Show progress spinner
        };
    },
    methods: {
        showAddMemberModal() {
            const modal = new bootstrap.Modal(document.getElementById("addMemberModal"));
            modal.show();
        },
        generateUsername(surname) {
            const prefix = surname.substring(0, 4).toUpperCase();
            const randomNum = Math.floor(100 + Math.random() * 900); // Random 3-digit number
            return `${prefix}${randomNum}`;
        },
        async addMember() {
            try {
                this.isSubmitting = true;

                // Generate the username
                this.newMember.username = this.generateUsername(this.newMember.surname);

                // Save the member to Firestore
                const docRef = await addDoc(collection(db, "members"), this.newMember);

                // Add to local list
                this.members.push({ ...this.newMember, id: docRef.id });

                // Show success message
                this.$toasty.success("Member added successfully!");

                // Close modal and reset form
                const modal = bootstrap.Modal.getInstance(document.getElementById("addMemberModal"));
                modal.hide();
                this.resetForm();
            } catch (error) {
                console.error("Error adding member: ", error);
                this.$toasty.error("Failed to add member. Please try again.");
            } finally {
                this.isSubmitting = false;
            }
        },
        resetForm() {
            this.newMember = {
                name: "",
                surname: "",
                homecell: "",
                contactNumber: "",
                emailAddress: "",
                role: "",
                avatar: "https://via.placeholder.com/150", // Reset Avatar URL
                points: 0,
                username: "",
            };
        },
    },
    created() {
        // this.fetchMembers();
    },
};
</script>
