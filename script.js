document.addEventListener('DOMContentLoaded', () => {
    AOS.init(); // Initialize AOS

    // Function to switch to the tracker page
    function goToTracker() {
        document.getElementById('homePage').style.display = 'none';
        document.getElementById('trackerPage').style.display = 'flex';
    }

    // Function to switch back to the home page
    function goToHome() {
        document.getElementById('trackerPage').style.display = 'none';
        document.getElementById('homePage').style.display = 'flex';
    }

    // Add event listener to the form submit button
    document.getElementById('trackerForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const travel = parseFloat(document.getElementById('travel').value);
        const energy = parseFloat(document.getElementById('energy').value);
        const food = parseFloat(document.getElementById('food').value);

        const travelEmission = travel * 0.21;
        const energyEmission = energy * 0.5;
        const foodEmission = food * 2.5;
        const totalEmission = travelEmission + energyEmission + foodEmission;

        const carbonResult = document.getElementById('carbonResult');
        carbonResult.textContent = `${totalEmission.toFixed(2)} kg CO2`;

        const carbonRemark = document.getElementById('carbonRemark');
        if (totalEmission < 5) {
            carbonResult.className = 'carbon-result green';
            carbonRemark.textContent = 'Excellent! You have a very low carbon footprint.';
        } else if (totalEmission < 15) {
            carbonResult.className = 'carbon-result yellow';
            carbonRemark.textContent = 'Moderate footprint. You are doing well, but there\'s room for improvement!';
        } else {
            carbonResult.className = 'carbon-result red';
            carbonRemark.textContent = 'High footprint! Consider reducing your energy and travel usage.';
        }

        document.body.classList.remove('bg-green', 'bg-yellow', 'bg-red');
        if (energy < 5) {
            document.body.classList.add('bg-green');
        } else if (energy < 15) {
            document.body.classList.add('bg-yellow');
        } else {
            document.body.classList.add('bg-red');
        }

        updateChart([travelEmission, energyEmission, foodEmission]);
    });

    function updateChart(data) {
        const ctx = document.getElementById('carbonChart').getContext('2d');
        if (window.myChart) {
            window.myChart.destroy();
        }
        window.myChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Travel', 'Energy', 'Food'],
                datasets: [{
                    data: data,
                    backgroundColor: ['#3498db', '#e74c3c', '#2ecc71'],
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: true,
                        position: 'bottom'
                    }
                }
            }
        });
    }

    updateChart([0, 0, 0]); // Initialize the chart with zero values

    // Attach functions to window object so they can be accessed from HTML
    window.goToTracker = goToTracker;
    window.goToHome = goToHome;
});
