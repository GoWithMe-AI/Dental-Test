// Dashboard Application
class DashboardApp {
    constructor() {
        this.data = this.loadData();
        this.init();
    }

    init() {
        this.updateSummaryCards();
        this.renderCharts();
        this.renderTables();
    }

    // Load data from localStorage or use sample data
    loadData() {
        // Try to load from localStorage (from communication records)
        const communicationRecords = JSON.parse(localStorage.getItem('communicationRecords') || '[]');
        const calendarEvents = JSON.parse(localStorage.getItem('calendarEvents') || '[]');

        // For demo purposes, we'll use sample data
        // In a real application, this would come from a backend API
        return {
            summary: {
                activeStudents: 11,
                activeSchools: 18
            },
            oralHealth: {
                historyOfCaries: { yes: 8, no: 92 },
                sealantPresent: { yes: 50, no: 45 },
                untreatedCaries: { yes: 0, no: 100 }
            },
            services: {
                prophy: { yes: 95, no: 5 },
                varnish: { yes: 95, no: 5 },
                sealants: { yes: 53, no: 47 }
            },
            schools: [
                {
                    name: "ANGELO ELEMENTARY SCHOOL",
                    studentsServed: 2,
                    receivingSealant: 2,
                    receivingFlouride: 1,
                    receivingProphy: 2,
                    studentsIn3rdGrade: 0
                },
                {
                    name: "GILMORE ELEMENTARY SCHOOL",
                    studentsServed: 4,
                    receivingSealant: 2,
                    receivingFlouride: 7,
                    receivingProphy: 3,
                    studentsIn3rdGrade: 0
                }
            ],
            facilities: []
        };
    }

    // Update summary cards
    updateSummaryCards() {
        document.getElementById('activeStudents').textContent = this.data.summary.activeStudents;
        document.getElementById('activeSchools').textContent = this.data.summary.activeSchools;
    }

    // Render charts
    renderCharts() {
        this.renderOralHealthChart();
        this.renderServicesChart();
    }

    // Render Oral Health Status Chart
    renderOralHealthChart() {
        const ctx = document.getElementById('oralHealthChart').getContext('2d');
        
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['History of Caries', 'Sealant Present', 'Untreated Caries'],
                datasets: [
                    {
                        label: 'Yes',
                        data: [
                            this.data.oralHealth.historyOfCaries.yes,
                            this.data.oralHealth.sealantPresent.yes,
                            this.data.oralHealth.untreatedCaries.yes
                        ],
                        backgroundColor: '#3b82f6',
                        borderColor: '#2563eb',
                        borderWidth: 1
                    },
                    {
                        label: 'No',
                        data: [
                            this.data.oralHealth.historyOfCaries.no,
                            this.data.oralHealth.sealantPresent.no,
                            this.data.oralHealth.untreatedCaries.no
                        ],
                        backgroundColor: '#10b981',
                        borderColor: '#059669',
                        borderWidth: 1
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top',
                        labels: {
                            usePointStyle: true,
                            padding: 15,
                            font: {
                                size: 12
                            }
                        }
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        callbacks: {
                            label: function(context) {
                                return context.dataset.label + ': ' + context.parsed.y + '%';
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            },
                            font: {
                                size: 11
                            }
                        },
                        grid: {
                            color: '#f0f0f0'
                        }
                    },
                    x: {
                        ticks: {
                            font: {
                                size: 11
                            }
                        },
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }

    // Render Services Chart
    renderServicesChart() {
        const ctx = document.getElementById('servicesChart').getContext('2d');
        
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Prophy', 'Varnish', 'Sealants'],
                datasets: [
                    {
                        label: 'Yes',
                        data: [
                            this.data.services.prophy.yes,
                            this.data.services.varnish.yes,
                            this.data.services.sealants.yes
                        ],
                        backgroundColor: '#3b82f6',
                        borderColor: '#2563eb',
                        borderWidth: 1
                    },
                    {
                        label: 'No',
                        data: [
                            this.data.services.prophy.no,
                            this.data.services.varnish.no,
                            this.data.services.sealants.no
                        ],
                        backgroundColor: '#10b981',
                        borderColor: '#059669',
                        borderWidth: 1
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top',
                        labels: {
                            usePointStyle: true,
                            padding: 15,
                            font: {
                                size: 12
                            }
                        }
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        callbacks: {
                            label: function(context) {
                                return context.dataset.label + ': ' + context.parsed.y + '%';
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            },
                            font: {
                                size: 11
                            }
                        },
                        grid: {
                            color: '#f0f0f0'
                        }
                    },
                    x: {
                        ticks: {
                            font: {
                                size: 11
                            }
                        },
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }

    // Render data tables
    renderTables() {
        this.renderSchoolsTable();
        this.renderFacilitiesTable();
    }

    // Render Schools Table
    renderSchoolsTable() {
        const tbody = document.getElementById('schoolsTableBody');
        
        if (this.data.schools.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="6" class="empty-table-message">No data available in table</td>
                </tr>
            `;
            return;
        }

        tbody.innerHTML = this.data.schools.map(school => `
            <tr>
                <td><strong>${this.escapeHtml(school.name)}</strong></td>
                <td>${school.studentsServed}</td>
                <td>${school.receivingSealant}</td>
                <td>${school.receivingFlouride}</td>
                <td>${school.receivingProphy}</td>
                <td>${school.studentsIn3rdGrade}</td>
            </tr>
        `).join('');
    }

    // Render Facilities Table
    renderFacilitiesTable() {
        const tbody = document.getElementById('facilitiesTableBody');
        
        if (this.data.facilities.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="4" class="empty-table-message">No data available in table</td>
                </tr>
            `;
            return;
        }

        tbody.innerHTML = this.data.facilities.map(facility => `
            <tr>
                <td><strong>${this.escapeHtml(facility.name)}</strong></td>
                <td>${facility.peopleServed}</td>
                <td>${facility.receivingFlouride}</td>
                <td>${facility.receivingProphy}</td>
            </tr>
        `).join('');
    }

    // Escape HTML to prevent XSS
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Method to update data (can be called when data changes)
    updateData(newData) {
        this.data = { ...this.data, ...newData };
        this.updateSummaryCards();
        this.renderCharts();
        this.renderTables();
    }
}

// Initialize the dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new DashboardApp();
});

