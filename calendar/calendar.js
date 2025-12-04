// Calendar Application
class CalendarApp {
    constructor() {
        this.currentDate = new Date();
        this.events = this.loadEvents();
        this.editingEventId = null;
        this.init();
    }

    init() {
        this.renderCalendar();
        this.attachEventListeners();
    }

    // Load events from localStorage
    loadEvents() {
        const stored = localStorage.getItem('calendarEvents');
        return stored ? JSON.parse(stored) : [];
    }

    // Save events to localStorage
    saveEvents() {
        localStorage.setItem('calendarEvents', JSON.stringify(this.events));
    }

    // Render the calendar
    renderCalendar() {
        const year = this.currentDate.getFullYear();
        const month = this.currentDate.getMonth();
        
        // Update month/year display
        const monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        document.getElementById('currentMonthYear').textContent = 
            `${monthNames[month]} ${year}`;

        // Get first day of month and number of days
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();

        // Clear calendar
        const calendarDays = document.getElementById('calendarDays');
        calendarDays.innerHTML = '';

        // Add empty cells for days before month starts
        for (let i = 0; i < startingDayOfWeek; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.className = 'calendar-day other-month';
            calendarDays.appendChild(emptyDay);
        }

        // Add days of the month
        const today = new Date();
        for (let day = 1; day <= daysInMonth; day++) {
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day';
            
            const date = new Date(year, month, day);
            if (this.isToday(date)) {
                dayElement.classList.add('today');
            }

            // Day number
            const dayNumber = document.createElement('div');
            dayNumber.className = 'day-number';
            if (this.isToday(date)) {
                dayNumber.classList.add('today');
            }
            dayNumber.textContent = day;
            dayElement.appendChild(dayNumber);

            // Events for this day
            const dayEvents = this.getEventsForDate(date);
            const eventsList = document.createElement('div');
            eventsList.className = 'events-list';

            // Show up to 3 events, then "more" indicator
            const maxVisible = 3;
            dayEvents.slice(0, maxVisible).forEach(event => {
                const eventItem = document.createElement('div');
                eventItem.className = 'event-item';
                eventItem.style.backgroundColor = event.color;
                eventItem.textContent = event.time ? `${event.time} ${event.title}` : event.title;
                eventItem.title = event.description || event.title;
                eventItem.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.editEvent(event.id);
                });
                eventsList.appendChild(eventItem);
            });

            if (dayEvents.length > maxVisible) {
                const moreItem = document.createElement('div');
                moreItem.className = 'event-item more-events';
                moreItem.textContent = `+${dayEvents.length - maxVisible} more`;
                moreItem.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.showAllEvents(date, dayEvents);
                });
                eventsList.appendChild(moreItem);
            }

            dayElement.appendChild(eventsList);

            // Click to create event on this day
            dayElement.addEventListener('click', () => {
                this.openEventModal(date);
            });

            calendarDays.appendChild(dayElement);
        }
    }

    // Get events for a specific date
    getEventsForDate(date) {
        const dateStr = this.formatDate(date);
        return this.events.filter(event => event.date === dateStr)
            .sort((a, b) => {
                if (a.time && b.time) {
                    return a.time.localeCompare(b.time);
                }
                return 0;
            });
    }

    // Check if date is today
    isToday(date) {
        const today = new Date();
        return date.getDate() === today.getDate() &&
               date.getMonth() === today.getMonth() &&
               date.getFullYear() === today.getFullYear();
    }

    // Format date as YYYY-MM-DD
    formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    // Navigate to previous month
    previousMonth() {
        this.currentDate.setMonth(this.currentDate.getMonth() - 1);
        this.renderCalendar();
    }

    // Navigate to next month
    nextMonth() {
        this.currentDate.setMonth(this.currentDate.getMonth() + 1);
        this.renderCalendar();
    }

    // Go to today
    goToToday() {
        this.currentDate = new Date();
        this.renderCalendar();
    }

    // Open event modal
    openEventModal(date = null) {
        const modal = document.getElementById('eventModal');
        const form = document.getElementById('eventForm');
        const modalTitle = document.getElementById('modalTitle');
        const deleteBtn = document.getElementById('deleteBtn');

        // Reset form
        form.reset();
        this.editingEventId = null;
        deleteBtn.style.display = 'none';
        modalTitle.textContent = 'Create New Event';

        // Set date if provided
        if (date) {
            document.getElementById('eventDate').value = this.formatDate(date);
        } else {
            document.getElementById('eventDate').value = this.formatDate(new Date());
        }

        // Set default color
        document.getElementById('eventColor').value = '#4285f4';
        this.updateColorPresets('#4285f4');

        modal.classList.add('show');
    }

    // Edit event
    editEvent(eventId) {
        const event = this.events.find(e => e.id === eventId);
        if (!event) return;

        this.editingEventId = eventId;
        const modal = document.getElementById('eventModal');
        const form = document.getElementById('eventForm');
        const modalTitle = document.getElementById('modalTitle');
        const deleteBtn = document.getElementById('deleteBtn');

        modalTitle.textContent = 'Edit Event';
        deleteBtn.style.display = 'inline-block';

        // Populate form
        document.getElementById('eventTitle').value = event.title;
        document.getElementById('eventDate').value = event.date;
        document.getElementById('eventTime').value = event.time || '';
        document.getElementById('eventDescription').value = event.description || '';
        document.getElementById('eventColor').value = event.color;
        this.updateColorPresets(event.color);

        modal.classList.add('show');
    }

    // Update color preset active state
    updateColorPresets(selectedColor) {
        document.querySelectorAll('.color-preset').forEach(preset => {
            if (preset.dataset.color === selectedColor) {
                preset.classList.add('active');
            } else {
                preset.classList.remove('active');
            }
        });
    }

    // Save event
    saveEvent(eventData) {
        if (this.editingEventId) {
            // Update existing event
            const index = this.events.findIndex(e => e.id === this.editingEventId);
            if (index !== -1) {
                this.events[index] = { ...this.events[index], ...eventData };
            }
        } else {
            // Create new event
            const newEvent = {
                id: Date.now().toString(),
                ...eventData
            };
            this.events.push(newEvent);
        }

        this.saveEvents();
        this.renderCalendar();
        this.closeModal();
    }

    // Delete event
    deleteEvent() {
        if (this.editingEventId) {
            this.events = this.events.filter(e => e.id !== this.editingEventId);
            this.saveEvents();
            this.renderCalendar();
            this.closeModal();
        }
    }

    // Close modal
    closeModal() {
        const modal = document.getElementById('eventModal');
        modal.classList.remove('show');
        this.editingEventId = null;
    }

    // Show all events for a date
    showAllEvents(date, events) {
        // For simplicity, just open the modal with the first event
        // In a full implementation, you might show a popover or separate view
        if (events.length > 0) {
            this.editEvent(events[0].id);
        } else {
            this.openEventModal(date);
        }
    }

    // Attach event listeners
    attachEventListeners() {
        // Navigation buttons
        document.getElementById('prevMonth').addEventListener('click', () => {
            this.previousMonth();
        });

        document.getElementById('nextMonth').addEventListener('click', () => {
            this.nextMonth();
        });

        document.getElementById('todayBtn').addEventListener('click', () => {
            this.goToToday();
        });

        // Create event button
        document.getElementById('createEventBtn').addEventListener('click', () => {
            this.openEventModal();
        });

        // Modal controls
        document.getElementById('closeModal').addEventListener('click', () => {
            this.closeModal();
        });

        document.getElementById('cancelBtn').addEventListener('click', () => {
            this.closeModal();
        });

        document.getElementById('deleteBtn').addEventListener('click', () => {
            if (confirm('Are you sure you want to delete this event?')) {
                this.deleteEvent();
            }
        });

        // Close modal on background click
        document.getElementById('eventModal').addEventListener('click', (e) => {
            if (e.target.id === 'eventModal') {
                this.closeModal();
            }
        });

        // Form submission
        document.getElementById('eventForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = {
                title: document.getElementById('eventTitle').value,
                date: document.getElementById('eventDate').value,
                time: document.getElementById('eventTime').value,
                description: document.getElementById('eventDescription').value,
                color: document.getElementById('eventColor').value
            };
            this.saveEvent(formData);
        });

        // Color presets
        document.querySelectorAll('.color-preset').forEach(preset => {
            preset.addEventListener('click', (e) => {
                e.preventDefault();
                const color = preset.dataset.color;
                document.getElementById('eventColor').value = color;
                this.updateColorPresets(color);
            });
        });

        // Update color presets when color input changes
        document.getElementById('eventColor').addEventListener('input', (e) => {
            this.updateColorPresets(e.target.value);
        });
    }
}

// Initialize the calendar when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new CalendarApp();
});

