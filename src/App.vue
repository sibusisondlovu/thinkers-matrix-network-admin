<template>
  <div id="app">
    <nav
      class="topnav navbar navbar-expand shadow justify-content-between justify-content-sm-start navbar-light bg-white"
      id="sidenavAccordion">
      <!-- Sidenav Toggle Button-->
      <button class="btn btn-icon btn-transparent-dark order-1 order-lg-0 me-2 ms-lg-2 me-lg-0" id="sidebarToggle"><i
          data-feather="menu"></i></button>
      <a class="navbar-brand pe-3 ps-4 ps-lg-2" href="index.html">Thinkers Matrix Network</a>

      <!-- Navbar Items-->
      <ul class="navbar-nav align-items-center ms-auto">
        <li class="nav-item dropdown no-caret dropdown-user me-3 me-lg-4">
          <a class="btn btn-icon btn-transparent-dark dropdown-toggle" id="navbarDropdownUserImage"
            href="javascript:void(0);" role="button" data-bs-toggle="dropdown" aria-haspopup="true"
            aria-expanded="false"><img class="img-fluid" src="" alt="Photo" /></a>
          <div class="dropdown-menu dropdown-menu-end border-0 shadow animated--fade-in-up"
            aria-labelledby="navbarDropdownUserImage">
            <h6 class="dropdown-header d-flex align-items-center">
              <img class="dropdown-user-img" src="" />
              <div class="dropdown-user-details">
                <div class="dropdown-user-details-name">Vusi Mahlangu</div>
                <div class="dropdown-user-details-email">vmahlangu@thinkersnetwork.co.za</div>
              </div>
            </h6>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="#!">
              <div class="dropdown-item-icon"><i data-feather="settings"></i></div>
              Account
            </a>
            <a class="dropdown-item" href="#!">
              <div class="dropdown-item-icon"><i data-feather="log-out"></i></div>
              Logout
            </a>
          </div>
        </li>
      </ul>
    </nav>
    <div id="layoutSidenav">
      <div id="layoutSidenav_nav">
        <nav class="sidenav shadow-right sidenav-light">
          <div class="sidenav-menu">
            <div class="nav accordion" id="accordionSidenav">

              <div class="sidenav-menu-heading">MENU</div>

              <a class="nav-link" href="charts.html">
                <div class="nav-link-icon"><i data-feather="bar-chart"></i></div>
                Workspace
              </a>
              <a class="nav-link" href="tables.html">
                <div class="nav-link-icon"><i data-feather="filter"></i></div>
                Members
              </a>
              <a class="nav-link" href="tables.html">
                <div class="nav-link-icon"><i data-feather="filter"></i></div>
                Tasks
              </a>
            </div>
          </div>
          <!-- Sidenav Footer-->
          <div class="sidenav-footer">
            <div class="sidenav-footer-content">
              <div class="sidenav-footer-subtitle">Logged in as:</div>
              <div class="sidenav-footer-title">Vusi Mahlangu</div>
            </div>
          </div>
        </nav>
      </div>
      <div id="layoutSidenav_content">
        <main>
          <router-view></router-view>
        </main>
        <footer class="footer-admin mt-auto footer-light">
          <div class="container-xl px-4">
            <div class="row">
              <div class="col-md-6 small">Copyright &copy; Your Website 2021</div>
              <div class="col-md-6 text-md-end small">
                <a href="#!">Privacy Policy</a>
                &middot;
                <a href="#!">Terms &amp; Conditions</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  </div>
</template>