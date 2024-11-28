<template>
    <div class="container mt-4">
      <!-- Greeting Message -->
      <div class="mb-4">
        <h2 class="fw-bold">Welcome, {{ username }}!</h2>
        <p class="text-muted">Here’s an overview of your stats:</p>
      </div>
  
      <!-- Stats Cards -->
      <div class="row g-3">
        <!-- Total Members -->
        <div class="col-12 col-md-4">
          <div class="card shadow-sm text-center">
            <div class="card-body">
              <i class="bi bi-people-fill fs-1 text-primary mb-3"></i>
              <h5 class="card-title">Total Members</h5>
              <p class="card-text fs-4 fw-bold">{{ stats.totalMembers }}</p>
            </div>
          </div>
        </div>
  
        <!-- Total Tasks -->
        <div class="col-12 col-md-4">
          <div class="card shadow-sm text-center">
            <div class="card-body">
              <i class="bi bi-list-task fs-1 text-success mb-3"></i>
              <h5 class="card-title">Total Tasks</h5>
              <p class="card-text fs-4 fw-bold">{{ stats.totalTasks }}</p>
            </div>
          </div>
        </div>
  
        <!-- Total Points -->
        <div class="col-12 col-md-4">
          <div class="card shadow-sm text-center">
            <div class="card-body">
              <i class="bi bi-trophy-fill fs-1 text-warning mb-3"></i>
              <h5 class="card-title">Total Points</h5>
              <p class="card-text fs-4 fw-bold">{{ stats.totalPoints }}</p>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Placeholder for Future Content -->
      <div class="mt-5">
        <p class="text-muted">More features coming soon: graphs, inbox, and more!</p>
      </div>
    </div>
  </template>
<script>
export default {
  name: "Workspace",
  data() {
    return {
      username: "John Doe", // Replace with dynamic data if needed
      stats: {
        totalMembers: 50,  // Fetch from Firestore or API
        totalTasks: 120,   // Fetch from Firestore or API
        totalPoints: 890,  // Fetch from Firestore or API
      },
    };
  },
};
</script>
<style scoped>
.card {
  border-radius: 10px;
}
.card .card-body i {
  display: block;
}
</style>
  