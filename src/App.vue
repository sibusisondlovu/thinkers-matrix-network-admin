<template>
  <div id="app">
    <!-- Navigation Bar -->
    <nav v-if="$route.name !== 'login'" class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <!-- Navbar brand -->
        <a class="navbar-brand" href="#">Thinkers Network Matrix</a>

        <!-- Centered menu items -->
        <div class="collapse navbar-collapse justify-content-center">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link class="nav-link d-flex align-items-center" to="/dashboard">
                <i class="fas fa-file-alt me-2"></i> Members
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link d-flex align-items-center" to="/calls-log">
                <i class="fas fa-file-alt me-2"></i> Tasks
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link d-flex align-items-center" to="/paramedics">
                <i class="fas fa-user-md me-2"></i> Reports
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Login/Logout Button -->
        <div class="d-flex">
          <button class="btn btn-outline-light" @click="toggleAuth">{{ authText }}</button>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="container py-5">
      <!-- Vue Router Outlet -->
      <router-view />
    </main>

    <!-- Footer -->
    <footer class="bg-light text-center py-3">
      <p class="mb-0">
        &copy; 2024 Humble Departure Funerals (Pty) Ltd | Powered by Jaspa Digital
      </p>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isAuthenticated: false, // Track login state
    };
  },
  computed: {
    authText() {
      return this.isAuthenticated ? "Logout" : "Login";
    },
  },
  methods: {
    toggleAuth() {
      if (this.isAuthenticated) {
        // Perform logout logic
        this.isAuthenticated = false;
      } else {
        // Redirect to login page if not logged in
        this.$router.push("/login");
      }
    },
  },
  watch: {
    $route(to, from) {
      // If route changes to 'login', hide navbar
      this.isAuthenticated = false;
      if (to.name === "login") {
        this.isAuthenticated = false;
      }
    },
  },
};
</script>

<style>
/* Center the menu items in the navbar */
.navbar-nav {
  flex-direction: row;
  gap: 20px;
}

/* Font styles */
.navbar-nav .nav-link {
  font-family: "Poppins", sans-serif;
  font-size: 14px;
}

/* Footer styles */
footer {
  font-family: "Poppins", sans-serif;
  font-size: 14px;
}
</style>
