# Hotel Management System Blueprint

## Overview

A modular and extensible hotel management system built with Next.js and Firebase. This application will provide a comprehensive solution for managing hotel operations, including bookings, rooms, guests, and settings.

## Project Structure

- **/app**: Main application folder (App Router)
  - **/bookings**: Booking management page
  - **/rooms**: Room management page
  - **/guests**: Guest management page
  - **/settings**: Application settings page
  - **layout.tsx**: Root layout
  - **page.tsx**: Dashboard/main page
  - **globals.css**: Global styles
- **/components**: Reusable UI components
  - **Sidebar.tsx**: Navigation sidebar
- **tailwind.config.js**: Tailwind CSS configuration
- **postcss.config.js**: PostCSS configuration
- **next.config.mjs**: Next.js configuration
- **package.json**: Project dependencies

## Features

- **Dashboard**: Centralized view of hotel operations.
- **Booking Management**: Create, view, update, and delete bookings.
- **Room Management**: Manage room inventory, types, and availability.
- **Guest Management**: Maintain guest profiles and booking history.
- **Settings**: Configure application settings.

## Design

- **Styling**: Tailwind CSS for a modern, utility-first approach.
- **Layout**: A responsive sidebar navigation with a main content area.
- **Color Palette**:
  - **Primary**: Indigo
  - **Secondary**: Green
  - **Accent**: Yellow
  - **Neutral**: Grays for text and backgrounds
- **Components**: The application uses styled tables, forms, and cards to display information.

## Page Details

- **Dashboard**: The main page displays a high-level overview of the hotel's status, including total bookings, occupancy rate, available rooms, and total guests.
- **Bookings**: Displays a table of all bookings, including the guest name, room number, date, and status.
- **Rooms**: Displays a table of all rooms, including the room number, type, price, and status.
- **Guests**: Displays a table of all guests, including their name, email, and phone number.
- **Settings**: Provides a form to manage general hotel settings and notification preferences.

## Current Plan

- **DONE**: Restructure the project to use the App Router.
- **DONE**: Set up Tailwind CSS for styling.
- **DONE**: Create the basic layout and pages.
- **IN PROGRESS**: Build out the functionality for each management section.
- **TODO**: Implement Firebase authentication.
