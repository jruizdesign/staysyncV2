# StaySync Blueprint

## Overview

StaySync is an internal hotel management application designed to streamline hotel operations for staff and managers. It provides a centralized platform for managing staff, rooms, and bookings, aiming to improve efficiency and communication within the hotel.

## Features

*   **Staff Authentication:** Secure login portal for hotel staff and managers.
*   **Role-Based Access Control:** Differentiated access and functionality for `manager` and `staff` roles.
*   **Staff Management (Admin):** Managers can create, view, and manage staff accounts.
*   **Dashboard (Admin & Staff):** A central hub for staff and managers to view relevant information and perform key tasks.
*   **Room Status Management:** Staff can view and update the status of hotel rooms (e.g., clean, dirty, under maintenance).
*   **Booking Management:** Staff can view and manage guest bookings.

## Style and Design

*   **Aesthetics:** A modern, vibrant, and image-less design. The UI is built to be visually engaging and professional without relying on photography.
*   **Color Palette:**
    *   **Backgrounds:** Use of `linear-gradient` from a deep purple (`#6a11cb`) to a vibrant blue (`#2575fc`) creates a dynamic and energetic backdrop.
    *   **Buttons:** Action buttons feature a warm `linear-gradient` from a reddish-pink (`#ff6f61`) to an orange (`#ff9966`).
    *   **Text:** Primary text color is white or a light gray (`#ddd`) for high contrast and readability against the dark backgrounds.
*   **UI Components:**
    *   **Glassmorphism:** Forms and interactive containers utilize a "glassmorphism" effect, with semi-transparent white backgrounds (`rgba(255, 255, 255, 0.1)`), a `backdrop-filter` blur, and a subtle border. This creates a sense of depth and modernity.
*   **Typography:** Clean and modern sans-serif fonts are used throughout the application for clarity and readability. Font weights and sizes are used to create a clear visual hierarchy.
*   **Layout:** Clean, centered layouts with ample spacing to ensure focus on the content and a comfortable user experience.
*   **Implementation:** All styling is currently implemented using inline styles directly within the `.tsx` components.

## Development Plan

### Phase 1: Authentication & Core UI (Completed)
*   [x] Set up initial Next.js project.
*   [x] Re-purposed the main page as a dedicated staff login portal.
*   [x] Implemented a registration page for creating new staff accounts.
*   [x] Established the modern, "glassmorphism" design language across authentication pages.

### Phase 2: Role-Based Dashboards (Completed)
*   [x] Implement role-based redirection after login:
    *   [x] Managers (`manager` role) redirect to `/admin/dashboard`.
    *   [x] Staff (`staff` role) redirect to `/staff/dashboard`.
*   [x] Create placeholder page for the Admin Dashboard.
*   [x] Create placeholder page for the Staff Dashboard.

### Phase 3: Admin (Manager) Features (Completed)
*   [x] Build the UI for the Admin Dashboard.
*   [x] Implement functionality for managers to create and view staff accounts.
*   [x] Implement functionality for managers to edit and delete staff accounts.
*   [ ] Implement functionality to assign properties or specific roles to staff members.

### Phase 4: Staff Features (Completed)
*   [x] Build the UI for the Staff Dashboard.
*   [x] Implement functionality for staff to view their assigned tasks or daily schedule.
*   [x] Implement functionality for staff to update the cleaning status of rooms.

### Phase 5: Booking & Room Management (Completed)
*   [x] Implement UI for staff to view and manage current and upcoming bookings.
*   [x] Add functionality to check guests in and out.
*   [x] (Admin) Implement UI for adding, editing, or removing hotel rooms from the system.
