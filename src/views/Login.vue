<template>
    <div id="layoutAuthentication">
      <div id="layoutAuthentication_content">
        <main>
          <div class="container-xl px-4">
            <div class="row justify-content-center">
              <div class="col-lg-5">
                <div class="card shadow-lg border-0 rounded-lg mt-5">
                  <div class="card-header justify-content-center">
                    <h3 class="fw-light my-4">Login</h3>
                  </div>
                  <div class="card-body">
                    <form @submit.prevent="handleLogin">
                      <div class="mb-3">
                        <label class="small mb-1" for="inputEmailAddress">Email</label>
                        <input
                          class="form-control"
                          id="inputEmailAddress"
                          type="email"
                          placeholder="Enter email address"
                          v-model="email"
                          required
                        />
                      </div>
                      <div class="mb-3">
                        <label class="small mb-1" for="inputPassword">Password</label>
                        <input
                          class="form-control"
                          id="inputPassword"
                          type="password"
                          placeholder="Enter password"
                          v-model="password"
                          required
                        />
                      </div>
  
                      <div class="d-flex align-items-center justify-content-between mt-4 mb-0">
                        <div v-if="isLoading" class="spinner-border" role="status">
                          <span class="visually-hidden">Loading...</span>
                        </div>
  
                        <button
                          class="btn btn-primary w-100 my-3"
                          :disabled="isLoading"
                          type="submit"
                        >
                          Login
                        </button>
                      </div>
  
                      <div v-if="errorMessage" class="alert alert-danger" role="alert">
                        {{ errorMessage }}
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  </template>
  
  <script>
  import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
  import { useRouter } from 'vue-router'; // Import for routing
  
  export default {
    name: 'Login',
    data() {
      return {
        email: '',
        password: '',
        isLoading: false,
        errorMessage: '',
      };
    },
    methods: {
      async handleLogin() {
        this.isLoading = true; // Set loading state to true
        this.errorMessage = ''; // Clear any previous error message
  
        try {
          const auth = getAuth(); // Get Firebase auth instance
          await signInWithEmailAndPassword(auth, this.email, this.password);
          this.$router.push('/workspace'); // Redirect to workspace on success
          this.$bvToast.toast('Successfully logged in!', { // Display success toast
            title: 'Login Success',
            variant: 'success',
          });
        } catch (error) {
          console.error('Login error:', error);
          this.errorMessage = 'Login failed: ' + error.message; // Set error message
        } finally {
          this.isLoading = false; // Reset loading state regardless of success or failure
        }
      },
    },
    mounted() {
      // Check for existing user authentication (optional)
      // const auth = getAuth();
      // auth.onAuthStateChanged((user) => {
      //   if (user) {
      //     this.$router.push('/workspace'); // Redirect to workspace if already logged in
      //   }
      // });
    },
  };
  </script>
  
  <style scoped>
  .login {
    max-width: 400px;
    margin: auto;
  }
  </style>