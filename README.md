# Retail Planning Application

## Overview

This application provides a user-friendly interface for managing retail planning, including store and SKU (Stock Keeping Unit) management. It features an AG-Grid-based planning screen that enables users to analyze and update sales performance data dynamically.

## Features

### 1. Navigation

- **Top Navigation Bar**
  - Displays the company logo on the left.
  - Includes Firebase Authentication with sign-in/sign-out functionality on the right.
- **Left Navigation Menu**
  - Includes icons and labels for easy access to different screens.

### 2. Authentication

- Firebase Authentication is integrated to manage user login and logout.
- Users can sign in using their credentials, and authentication status is reflected in the navigation bar.

### 3. Store Management (Store Dimension Screen)

- Allows users to **add, remove, and update** store details.
- Supports reordering of stores for better organization.

### 4. SKU Management (SKU Dimension Screen)

- Users can **add, remove, and update** SKUs.
- Enables editing of **Price** and **Cost** values for each SKU.

### 5. Planning Screen

- Displays an **AG-Grid** with a cross-join of Stores and SKUs along the rows, and a **Calendar** along the columns.
- The Calendar groups **Weeks by Months**.
- Each Week contains the following data columns:

  #### Columns:

  - **Sales Units**: Editable integer values representing the number of units sold.
  - **Sales Dollars**: Non-editable, formatted as currency, calculated as:
    ```
    Sales Dollars = Sales Units * Price
    ```
  - **GM Dollars (Gross Margin Dollars)**: Non-editable, formatted as currency, calculated as:
    ```
    GM Dollars = Sales Dollars - (Sales Units * Cost)
    ```
  - **GM % (Gross Margin Percentage)**: Non-editable, formatted as percentage, calculated as:
    ```
    GM % = (GM Dollars / Sales Dollars) * 100
    ```

  #### Conditional Formatting for GM %:

  - **Green**: `>= 40%`
  - **Yellow**: `>= 10% and < 40%`
  - **Orange**: `> 5% and < 10%`
  - **Red**: `<= 5%`

## Technologies Used

- **React.js** for front-end development
- **AG-Grid** for data visualization
- **Material-UI** for UI components
- **Redux** for state management (if applicable)
- **Firebase Authentication** for user login and authentication

## Installation & Setup

1. Clone the repository:
   ```sh
   git clone https://github.com/AkashP1302/GS001111_akash_patil
   cd GS001111_akash_patil
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up Firebase Authentication:
   - Go to the Firebase Console and create a new project.
   - Enable Authentication and configure the preferred sign-in methods.
   - Obtain the Firebase configuration and add it to your project.
4. Start the application:
   ```sh
   npm start
   ```
