<!-- src/views/Workspace.vue -->
<template>
    <header class="page-header page-header-dark bg-gradient-primary-to-secondary pb-10">
        <div class="container-xl px-4">
            <div class="page-header-content pt-4">
                <div class="row align-items-center justify-content-between">
                    <div class="col-auto mt-4">
                        <h1 class="page-header-title">Workspace
                        </h1>

                    </div>
                </div>
            </div>
        </div>
    </header>
    <!-- Main page content-->
    <div class="container-xl px-4 mt-n10">
        <div class="row">
            <div class="col-xl-4 mb-4">
                <!-- Dashboard example card 1-->
                <a class="card lift h-100" href="#!">
                    <div class="card-body d-flex justify-content-center flex-column">
                        <div class="d-flex align-items-center justify-content-between">
                            <div class="me-3">
                                <i class="feather-xl text-primary mb-3" data-feather="package"></i>
                                <h5>Leaders</h5>
                                <div class="text-muted small">0</div>
                            </div>

                        </div>
                    </div>
                </a>
            </div>
            <div class="col-xl-4 mb-4">
                <!-- Dashboard example card 2-->
                <a class="card lift h-100" href="#!">
                    <div class="card-body d-flex justify-content-center flex-column">
                        <div class="d-flex align-items-center justify-content-between">
                            <div class="me-3">
                                <i class="feather-xl text-secondary mb-3" data-feather="book"></i>
                                <h5>Apprentices</h5>
                                <div class="text-muted small">0</div>
                            </div>

                        </div>
                    </div>
                </a>
            </div>
            <div class="col-xl-4 mb-4">
                <!-- Dashboard example card 3-->
                <a class="card lift h-100" href="#!">
                    <div class="card-body d-flex justify-content-center flex-column">
                        <div class="d-flex align-items-center justify-content-between">
                            <div class="me-3">
                                <i class="feather-xl text-green mb-3" data-feather="layout"></i>
                                <h5>Points</h5>
                                <div class="text-muted small">0</div>
                            </div>

                        </div>
                    </div>
                </a>
            </div>
        </div>
        <div class="row">
            <div class="col-xxl-8">
                <div class="card mb-4">
                    <div class="card-header border-bottom">
                        <!-- Dashboard card navigation-->
                        <ul class="nav nav-tabs card-header-tabs" id="dashboardNav" role="tablist">
                            <li class="nav-item me-1"><a class="nav-link active" id="overview-pill" href="#overview"
                                    data-bs-toggle="tab" role="tab" aria-controls="overview"
                                    aria-selected="true">Overview</a>
                            </li>
                            <li class="nav-item"><a class="nav-link" id="activities-pill" href="#activities"
                                    data-bs-toggle="tab" role="tab" aria-controls="activities"
                                    aria-selected="false">Activities</a></li>
                        </ul>
                    </div>
                    <div class="card-body">
                        <div class="tab-content" id="dashboardNavContent">
                            <!-- Dashboard Tab Pane 1-->
                            <div class="tab-pane fade show active" id="overview" role="tabpanel"
                                aria-labelledby="overview-pill">
                                <div class="chart-area mb-4 mb-lg-0" style="height: 20rem"><canvas id="myAreaChart"
                                        width="100%" height="30"></canvas></div>
                            </div>
                            <!-- Dashboard Tab Pane 2-->
                            <div class="tab-pane fade" id="activities" role="tabpanel"
                                aria-labelledby="activities-pill">
                                <table id="datatablesSimple">
                                    <thead>
                                        <tr>
                                            <th>Date</th>
                                            <th>Event</th>
                                            <th>Time</th>
                                        </tr>
                                    </thead>
                                    <tfoot>
                                        <tr>
                                            <th>Date</th>
                                            <th>Event</th>
                                            <th>Time</th>
                                        </tr>
                                    </tfoot>
                                    <tbody>
                                        <tr>
                                            <td>01/13/20</td>
                                            <td>
                                                <i class="me-2 text-green" data-feather="zap"></i>
                                                Server online
                                            </td>
                                            <td>1:21 AM</td>
                                        </tr>
                                        <tr>
                                            <td>01/13/20</td>
                                            <td>
                                                <i class="me-2 text-red" data-feather="zap-off"></i>
                                                Server restarted
                                            </td>
                                            <td>1:00 AM</td>
                                        </tr>
                                        <tr>
                                            <td>01/12/20</td>
                                            <td>
                                                <i class="me-2 text-purple" data-feather="shopping-cart"></i>
                                                New order placed! Order #
                                                <a href="#!">1126550</a>
                                            </td>
                                            <td>5:45 AM</td>
                                        </tr>
                                        <tr>
                                            <td>01/12/20</td>
                                            <td>
                                                <i class="me-2 text-blue" data-feather="user"></i>
                                                Valerie Luna submitted
                                                <a href="#!">quarter four report</a>
                                            </td>
                                            <td>4:23 PM</td>
                                        </tr>
                                        <tr>
                                            <td>01/12/20</td>
                                            <td>
                                                <i class="me-2 text-yellow" data-feather="database"></i>
                                                Database backup created
                                            </td>
                                            <td>3:51 AM</td>
                                        </tr>
                                        <tr>
                                            <td>01/12/20</td>
                                            <td>
                                                <i class="me-2 text-purple" data-feather="shopping-cart"></i>
                                                New order placed! Order #
                                                <a href="#!">1126549</a>
                                            </td>
                                            <td>1:22 AM</td>
                                        </tr>
                                        <tr>
                                            <td>01/11/20</td>
                                            <td>
                                                <i class="me-2 text-blue" data-feather="user-plus"></i>
                                                New user created:
                                                <a href="#!">Sam Malone</a>
                                            </td>
                                            <td>4:18 PM</td>
                                        </tr>
                                        <tr>
                                            <td>01/11/20</td>
                                            <td>
                                                <i class="me-2 text-purple" data-feather="shopping-cart"></i>
                                                New order placed! Order #
                                                <a href="#!">1126548</a>
                                            </td>
                                            <td>4:02 PM</td>
                                        </tr>
                                        <tr>
                                            <td>01/11/20</td>
                                            <td>
                                                <i class="me-2 text-purple" data-feather="shopping-cart"></i>
                                                New order placed! Order #
                                                <a href="#!">1126547</a>
                                            </td>
                                            <td>3:47 PM</td>
                                        </tr>
                                        <tr>
                                            <td>01/11/20</td>
                                            <td>
                                                <i class="me-2 text-green" data-feather="zap"></i>
                                                Server online
                                            </td>
                                            <td>1:19 AM</td>
                                        </tr>
                                        <tr>
                                            <td>01/11/20</td>
                                            <td>
                                                <i class="me-2 text-red" data-feather="zap-off"></i>
                                                Server restarted
                                            </td>
                                            <td>1:00 AM</td>
                                        </tr>
                                        <tr>
                                            <td>01/10/20</td>
                                            <td>
                                                <i class="me-2 text-purple" data-feather="shopping-cart"></i>
                                                New order placed! Order #
                                                <a href="#!">1126547</a>
                                            </td>
                                            <td>5:31 PM</td>
                                        </tr>
                                        <tr>
                                            <td>01/10/20</td>
                                            <td>
                                                <i class="me-2 text-purple" data-feather="shopping-cart"></i>
                                                New order placed! Order #
                                                <a href="#!">1126546</a>
                                            </td>
                                            <td>12:13 PM</td>
                                        </tr>
                                        <tr>
                                            <td>01/10/20</td>
                                            <td>
                                                <i class="me-2 text-blue" data-feather="user"></i>
                                                Diane Chambers submitted
                                                <a href="#!">quarter four report</a>
                                            </td>
                                            <td>10:56 AM</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
export default {
    name: 'Workspace',
    data() {
        return {
            stats: {
                leads: 0,
                apprentices: 0,
                totalPoints: 0,
            },
        };
    },
    mounted() {
        this.fetchStats();
    },
    methods: {
        fetchStats() {
            console.log('Fetching workspace stats');
            // Placeholder for fetching stats data
        },
    },
};
</script>
