# Wihote Shop

## Introduction

### Project Overview
This project is an e-commerce platform named "Wihote Shop" built with React and Redux. It allows users to browse products, add items to the cart, and manage their shopping experience.

### Scope
The project includes frontend development using ReactJS and basic styling with CSS & Tailwind.

### Goals
- Provide a user-friendly interface for browsing and purchasing products.
- Ensure smooth navigation and interaction throughout the application.

## Requirements

### Functional Requirements
- User can view a list of products.
- User can filter products by category.
- User can add products to the cart.
- User can increase or decrease product quantities in the cart.
- User can remove products from the cart.

### Non-Functional Requirements
- Performance: The application should load quickly and respond promptly to user interactions.
- Security: Ensure the application is secure from common vulnerabilities.
- Usability: The interface should be intuitive and easy to navigate.

### Technical Requirements
- React for frontend development.
- Tailwind , CSS for styling.
- Node.js for the development environment.

## Architecture

### System Architecture
The application follows a component-based architecture using ReactJS ad styled uing the CSS & Tailwind.

### Design Patterns
- **Logical Design:** Containers handle the logic and state. It consists of a visual presentation through the system including how users interact with the website.
- **Physical Design:** To achieve the performance of the application

### Data Models
- **Product Model:**
  - `id`: string
  - `name`: string
  - `category`: string
  - `price`: number
  - `image`: string
  - `quantity`: number (for cart items)

## Setup and Installation

### Environment Setup
1. Ensure you have Node.js and npm installed.
2. Start the development server, "npm start"

## User Guide
- Browse products on the homepage.
- Filter products by category using the filter.
- Add products to the cart by clicking "Add to Cart" on a product card.
- Manage cart items by increasing, decreasing, or removing items from the cart.
