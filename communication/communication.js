// Communication Tab Application
class CommunicationApp {
    constructor() {
        this.records = this.loadRecords();
        this.editingRecordId = null;
        this.init();
    }

    init() {
        this.renderRecords();
        this.attachEventListeners();
        this.setDefaultDate();
    }

    // Set today's date as default
    setDefaultDate() {
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('date').value = today;
    }

    // Load records from localStorage
    loadRecords() {
        const stored = localStorage.getItem('communicationRecords');
        return stored ? JSON.parse(stored) : [];
    }

    // Save records to localStorage
    saveRecords() {
        localStorage.setItem('communicationRecords', JSON.stringify(this.records));
    }

    // Format date for display
    formatDate(dateString) {
        if (!dateString) return 'Not set';
        
        // Extract YYYY-MM-DD from string (handles both "2025-12-04" and "2025-12-04T00:00:00.000Z")
        let dateStr = dateString;
        if (typeof dateString === 'string' && dateString.includes('-')) {
            dateStr = dateString.split('T')[0]; // Get just the date part
        }
        
        // Handle YYYY-MM-DD format directly to avoid timezone issues
        if (dateStr.match(/^\d{4}-\d{2}-\d{2}$/)) {
            const [year, month, day] = dateStr.split('-');
            const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                              'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            // Format directly from components to avoid any timezone conversion
            return `${monthNames[parseInt(month) - 1]} ${parseInt(day)}, ${year}`;
        }
        
        // Fallback: try to parse as Date object (for legacy data)
        try {
            const date = new Date(dateString);
            if (!isNaN(date.getTime())) {
                return date.toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'short', 
                    day: 'numeric' 
                });
            }
        } catch (e) {
            // Ignore parsing errors
        }
        
        return 'Invalid date';
    }

    // Handle form submission
    handleSubmit(e) {
        e.preventDefault();
        
        // Store editing state BEFORE any operations that might clear it
        const isEditing = !!this.editingRecordId;
        const editingId = this.editingRecordId;
        
        const formData = {
            date: document.getElementById('date').value,
            patientName: document.getElementById('patientName').value.trim(),
            schoolYear: document.getElementById('schoolYear').value.trim(),
            currentDentist: document.getElementById('currentDentist').value.trim(),
            language: document.getElementById('language').value,
            dateCalled: document.getElementById('dateCalled').value,
            dateEmailed: document.getElementById('dateEmailed').value,
            referralType: document.getElementById('referralType').value,
            notes: document.getElementById('notes').value.trim(),
            createdBy: document.getElementById('createdBy').value.trim()
        };

        // Use the stored editingId to ensure we have the correct ID even if this.editingRecordId gets cleared
        if (editingId) {
            // Update existing record
            const index = this.records.findIndex(r => r.id === editingId);
            if (index !== -1) {
                // Preserve the original id and createdAt
                this.records[index] = { 
                    ...this.records[index], 
                    ...formData 
                };
            } else {
                console.error('Record not found for update:', editingId);
            }
        } else {
            // Create new record
            const newRecord = {
                id: Date.now().toString(),
                ...formData,
                createdAt: new Date().toISOString()
            };
            this.records.unshift(newRecord); // Add to beginning
        }

        this.saveRecords();
        this.renderRecords();
        this.clearForm();
        this.showSuccessMessage(isEditing);
    }

    // Clear form
    clearForm() {
        document.getElementById('communicationForm').reset();
        this.setDefaultDate();
        this.editingRecordId = null;
        
        // Reset button text to "Save Communication"
        const submitBtn = document.getElementById('submitBtn');
        if (submitBtn) {
            submitBtn.textContent = 'Save Communication';
        }
    }

    // Show success message
    showSuccessMessage(isEditing = false) {
        const formSection = document.querySelector('.form-section');
        const existingMessage = formSection.querySelector('.success-message');
        
        if (existingMessage) {
            existingMessage.remove();
        }

        const message = document.createElement('div');
        message.className = 'success-message';
        message.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            <span>Communication record ${isEditing ? 'updated' : 'saved'} successfully!</span>
        `;
        
        formSection.insertBefore(message, formSection.firstChild);
        
        setTimeout(() => {
            message.remove();
        }, 3000);
    }

    // Render records list
    renderRecords(filteredRecords = null) {
        const recordsList = document.getElementById('recordsList');
        const recordsToDisplay = filteredRecords || this.records;
        const recordCount = document.getElementById('recordCount');

        recordCount.textContent = `${recordsToDisplay.length} record${recordsToDisplay.length !== 1 ? 's' : ''}`;

        if (recordsToDisplay.length === 0) {
            recordsList.innerHTML = `
                <div class="empty-state">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                    <p>No communication records found</p>
                    <p class="empty-subtitle">${this.records.length === 0 ? 'Start by creating a new communication entry' : 'Try adjusting your search'}</p>
                </div>
            `;
            return;
        }

        recordsList.innerHTML = recordsToDisplay.map(record => {
            const badges = [];
            if (record.referralType) {
                badges.push(`<span class="badge referral">${record.referralType}</span>`);
            }
            if (record.language) {
                badges.push(`<span class="badge language">${record.language}</span>`);
            }

            return `
                <div class="record-card" data-id="${record.id}">
                    <div class="record-header">
                        <div>
                            <div class="record-patient">${this.escapeHtml(record.patientName)}</div>
                            <div class="record-date">${this.formatDate(record.date)}</div>
                        </div>
                    </div>
                    ${badges.length > 0 ? `<div class="record-badges">${badges.join('')}</div>` : ''}
                    ${record.notes ? `<div class="record-preview">${this.escapeHtml(record.notes)}</div>` : ''}
                    <div class="record-meta" style="margin-top: 0.5rem; font-size: 0.75rem; color: #999;">
                        Created by ${this.escapeHtml(record.createdBy)}
                    </div>
                </div>
            `;
        }).join('');

        // Attach click listeners to record cards
        recordsList.querySelectorAll('.record-card').forEach(card => {
            card.addEventListener('click', () => {
                const recordId = card.dataset.id;
                this.viewRecord(recordId);
            });
        });
    }

    // View record details
    viewRecord(recordId) {
        const record = this.records.find(r => r.id === recordId);
        if (!record) return;

        this.editingRecordId = recordId;
        const modal = document.getElementById('viewModal');
        const modalBody = document.getElementById('viewModalBody');

        modalBody.innerHTML = `
            <div class="detail-row">
                <div class="detail-label">Date:</div>
                <div class="detail-value">${this.formatDate(record.date)}</div>
            </div>
            <div class="detail-row">
                <div class="detail-label">Patient's Name:</div>
                <div class="detail-value">${this.escapeHtml(record.patientName)}</div>
            </div>
            <div class="detail-row">
                <div class="detail-label">School Year:</div>
                <div class="detail-value ${!record.schoolYear ? 'empty' : ''}">${this.escapeHtml(record.schoolYear) || 'Not provided'}</div>
            </div>
            <div class="detail-row">
                <div class="detail-label">Current Dentist:</div>
                <div class="detail-value ${!record.currentDentist ? 'empty' : ''}">${this.escapeHtml(record.currentDentist) || 'Not provided'}</div>
            </div>
            <div class="detail-row">
                <div class="detail-label">Language:</div>
                <div class="detail-value ${!record.language ? 'empty' : ''}">${this.escapeHtml(record.language) || 'Not provided'}</div>
            </div>
            <div class="detail-row">
                <div class="detail-label">Date Called:</div>
                <div class="detail-value ${!record.dateCalled ? 'empty' : ''}">${this.formatDate(record.dateCalled)}</div>
            </div>
            <div class="detail-row">
                <div class="detail-label">Date Emailed:</div>
                <div class="detail-value ${!record.dateEmailed ? 'empty' : ''}">${this.formatDate(record.dateEmailed)}</div>
            </div>
            <div class="detail-row">
                <div class="detail-label">Referral Type:</div>
                <div class="detail-value ${!record.referralType ? 'empty' : ''}">${this.escapeHtml(record.referralType) || 'Not provided'}</div>
            </div>
            <div class="detail-row">
                <div class="detail-label">Notes:</div>
                <div class="detail-value ${!record.notes ? 'empty' : ''}">${this.escapeHtml(record.notes) || 'No notes'}</div>
            </div>
            <div class="detail-row">
                <div class="detail-label">Created By:</div>
                <div class="detail-value">${this.escapeHtml(record.createdBy)}</div>
            </div>
        `;

        modal.classList.add('show');
    }

    // Edit record (populate form)
    editRecord() {
        const record = this.records.find(r => r.id === this.editingRecordId);
        if (!record) return;

        // Populate form with record data
        document.getElementById('date').value = record.date || '';
        document.getElementById('patientName').value = record.patientName || '';
        document.getElementById('schoolYear').value = record.schoolYear || '';
        document.getElementById('currentDentist').value = record.currentDentist || '';
        document.getElementById('language').value = record.language || '';
        document.getElementById('dateCalled').value = record.dateCalled || '';
        document.getElementById('dateEmailed').value = record.dateEmailed || '';
        document.getElementById('referralType').value = record.referralType || '';
        document.getElementById('notes').value = record.notes || '';
        document.getElementById('createdBy').value = record.createdBy || '';

        // Change button text to "Update Communication"
        const submitBtn = document.getElementById('submitBtn');
        if (submitBtn) {
            submitBtn.textContent = 'Update Communication';
        }

        // Close modal (editingRecordId is preserved for form submission)
        this.closeViewModal();
        
        // Scroll to form
        document.querySelector('.form-section').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // Delete record
    deleteRecord() {
        if (confirm('Are you sure you want to delete this communication record?')) {
            this.records = this.records.filter(r => r.id !== this.editingRecordId);
            this.saveRecords();
            this.renderRecords();
            this.closeViewModal();
            this.editingRecordId = null;
        }
    }

    // Close view modal
    closeViewModal() {
        const modal = document.getElementById('viewModal');
        modal.classList.remove('show');
        // Don't clear editingRecordId here - it should only be cleared when:
        // 1. Form is successfully submitted (in handleSubmit)
        // 2. Form is cleared (in clearForm)
        // 3. User explicitly closes without editing
    }

    // Search functionality
    handleSearch() {
        const searchTerm = document.getElementById('searchInput').value.toLowerCase().trim();
        
        if (!searchTerm) {
            this.renderRecords();
            return;
        }

        const filtered = this.records.filter(record => {
            return record.patientName.toLowerCase().includes(searchTerm) ||
                   (record.notes && record.notes.toLowerCase().includes(searchTerm)) ||
                   (record.currentDentist && record.currentDentist.toLowerCase().includes(searchTerm)) ||
                   (record.createdBy && record.createdBy.toLowerCase().includes(searchTerm));
        });

        this.renderRecords(filtered);
    }

    // Escape HTML to prevent XSS
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Attach event listeners
    attachEventListeners() {
        // Form submission
        document.getElementById('communicationForm').addEventListener('submit', (e) => {
            this.handleSubmit(e);
        });

        // Clear form button
        document.getElementById('clearBtn').addEventListener('click', () => {
            this.clearForm();
        });

        // Search input
        document.getElementById('searchInput').addEventListener('input', () => {
            this.handleSearch();
        });

        // Clear search button
        document.getElementById('clearSearch').addEventListener('click', () => {
            document.getElementById('searchInput').value = '';
            this.renderRecords();
        });

        // Modal controls
        document.getElementById('closeViewModal').addEventListener('click', () => {
            this.closeViewModal();
            this.editingRecordId = null; // Clear when closing via X button
        });

        document.getElementById('closeViewBtn').addEventListener('click', () => {
            this.closeViewModal();
            this.editingRecordId = null; // Clear when closing via Close button
        });

        document.getElementById('editBtn').addEventListener('click', () => {
            this.editRecord();
        });

        document.getElementById('deleteRecordBtn').addEventListener('click', () => {
            this.deleteRecord();
        });

        // Close modal on background click
        document.getElementById('viewModal').addEventListener('click', (e) => {
            if (e.target.id === 'viewModal') {
                this.closeViewModal();
            }
        });
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new CommunicationApp();
});

