<template>
    <header class="page-header page-header-compact page-header-light border-bottom bg-white mb-4">
        <div class="container-fluid px-4">
            <div class="page-header-content">
                <div class="row align-items-center justify-content-between pt-3">
                    <div class="col-auto mb-3">
                        <h1 class="page-header-title">
                            <div class="page-header-icon"><i data-feather="user"></i></div>
                            Users List
                        </h1>
                    </div>
                    <div class="col-12 col-xl-auto mb-3">
                        <a class="btn btn-sm btn-light text-primary" href="user-management-groups-list.html">
                            <i class="me-1" data-feather="users"></i>
                            Manage Groups
                        </a>
                        <a class="btn btn-sm btn-light text-primary" href="user-management-add-user.html">
                            <i class="me-1" data-feather="user-plus"></i>
                            Add New User
                        </a>
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
                            <th>User</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Groups</th>
                            <th>Joined Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="member in members" :key="member.id">
                            <td>
                                <div class="d-flex align-items-center">
                                    {{ member.name }}
                                </div>
                            </td>
                            <td>{{ member.email }}</td>
                            <td>{{ member.role }}</td>
                            <td>
                                <span v-for="group in member.groups" :key="group" :class="groupBadgeClass(group)">
                                    {{ group }}
                                </span>
                            </td>
                            <td>{{ formatDate(member.joinedDate) }}</td>
                            <td>
                                <a class="btn btn-datatable btn-icon btn-transparent-dark me-2" href="user-management-edit-user.html">
                                    <i data-feather="edit"></i>
                                </a>
                                <a class="btn btn-datatable btn-icon btn-transparent-dark" href="#!" @click="deleteMember(member.id)">
                                    <i data-feather="trash-2"></i>
                                </a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import { db } from '@/firebaseConfig'; // Adjust the import path based on your project structure
import { collection, getDocs } from 'firebase/firestore';

export default {
    name: 'Members',
    data() {
        return {
            members: []
        };
    },
    methods: {
        async fetchMembers() {
            try {
                const querySnapshot = await getDocs(collection(db, 'members'));
                this.members = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                console.log(this.members);
            } catch (error) {
                console.error("Error fetching members:", error);
            }
        },
        groupBadgeClass(group) {
            const colors = {
                Sales: "badge bg-green-soft text-green",
                Developers: "badge bg-blue-soft text-blue",
                Marketing: "badge bg-red-soft text-red",
                Managers: "badge bg-purple-soft text-purple",
                Customer: "badge bg-yellow-soft text-yellow"
            };
            return colors[group] || "badge bg-secondary";
        },
        formatDate(timestamp) {
            if (!timestamp) return "";
            const date = timestamp.toDate();
            return date.toLocaleDateString("en-GB", { year: "numeric", month: "short", day: "numeric" });
        },
        async deleteMember(memberId) {
            // Logic to delete a member (implement Firestore delete operation here)
            alert(`Delete member ${memberId} - add Firestore delete operation here.`);
        }
    },
    mounted() {
        this.fetchMembers();
    }
};
</script>
