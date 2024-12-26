<template>
  <div class="container mt-4">
    <div class="mb-4">
      <h2 class="fw-bold">Welcome, {{ username }}!</h2>
      <p class="text-muted">Here’s an overview of your stats:</p>
    </div>

    <div class="row g-3">
      <div class="col-12 col-md-4">
        <router-link to="/members" class="card-link">
          <div class="card shadow-sm text-center clickable-card">
            <div class="card-body">
              <i class="bi bi-people-fill fs-1 text-primary mb-3"></i>
              <h5 class="card-title">Total Members</h5>
              <p class="card-text fs-4 fw-bold">{{ stats.totalMembers }}</p>
              <p class="card-text small">View/Manage Members</p>
            </div>
          </div>
        </router-link>
      </div>

      <div class="col-12 col-md-4">
        <router-link to="/tasks" class="card-link">
          <div class="card shadow-sm text-center clickable-card">
            <div class="card-body">
              <i class="bi bi-list-task fs-1 text-success mb-3"></i>
              <h5 class="card-title">Total Tasks</h5>
              <p class="card-text fs-4 fw-bold">{{ stats.totalTasks }}</p>
              <p class="card-text small">View/Manage Tasks</p>
            </div>
          </div>
        </router-link>
      </div>

      <div class="col-12 col-md-4">
        <router-link to="/points" class="card-link">
          <div class="card shadow-sm text-center clickable-card">
            <div class="card-body">
              <i class="bi bi-trophy-fill fs-1 text-warning mb-3"></i>
              <h5 class="card-title">Total Points</h5>
              <p class="card-text fs-4 fw-bold">{{ stats.totalPoints }}</p>
              <p class="card-text small">View Points</p>
            </div>
          </div>
        </router-link>
      </div>
    </div>

    <div class="mt-5">
      <p class="text-muted">More features coming soon: graphs, inbox, and more!</p>
    </div>
  </div>
</template>

<script>
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { ref, onMounted, computed } from "vue";
import { useRoute } from 'vue-router'
import { getAuth } from "firebase/auth";
import { db } from '@/firebaseConfig'

export default {
  name: "Workspace",
  setup() {
    const stats = ref({
      totalMembers: 0,
      totalTasks: 0,
      totalPoints: 0,
    });

    const route = useRoute()
    const auth = getAuth()
    const username = computed(()=>{
      return auth.currentUser?.email.split('@')[0]
    })

    const fetchStats = async () => {
      try {
        const usersSnapshot = await getDocs(collection(db, "users"));
        stats.value.totalMembers = usersSnapshot.size;

        const tasksSnapshot = await getDocs(collection(db, "tasks"));
        stats.value.totalTasks = tasksSnapshot.size;

        const pointsSnapshot = await getDocs(collection(db, "points"));
        let totalPoints = 0;
        pointsSnapshot.forEach((doc) => {
          totalPoints += doc.data().points || 0; // Assuming 'points' field exists
        });
        stats.value.totalPoints = totalPoints;
      } catch (error) {
        console.error("Error fetching stats:", error);
        // Handle error (e.g., display error message to user)
      }
    };

    onMounted(() => {
      fetchStats();
    });

    return { stats, username };
  },
};
</script>

<style scoped>
.card {
  border-radius: 10px;
  transition: transform 0.2s; /* Add smooth transition */
}

.card:hover {
  transform: scale(1.05); /* Scale up on hover */
}

.card .card-body i {
  display: block;
}

.card-link {
  text-decoration: none; /* Remove underline from links */
  color: inherit; /* Inherit card text color */
  cursor: pointer;
  display: block;
  height: 100%;

}

.clickable-card {
  cursor: pointer;
}
</style>