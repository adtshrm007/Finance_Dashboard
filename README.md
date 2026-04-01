# 🚀 Finance Pro - Modern Finance Dashboard

A premium, interactive, and responsive **Finance Dashboard** built with React, Tailwind CSS, and Recharts. Designed for clarity, usability, and a professional fintech-level experience.

---

## ✨ Features

*   **📊 Dynamic Dashboard**: Summary cards for Total Balance, Income, and Expenses with real-time updates.
*   **📈 Interactive Analytics**:
    *   **Balance Trend**: Area chart showing financial progress over time.
    *   **Expense Distribution**: Pie chart showing breakdown by categories (Food, Travel, Bills, etc.).
*   **💳 Transaction Management**:
    *   **Search**: Find transactions by description or category.
    *   **Filter**: Quick toggle between all, income, and expense views.
    *   **Sort**: Organize by date or transaction amount.
*   **👥 Role-Based UI (Simulation)**:
    *   **Viewer**: Read-only access to insights and data.
    *   **Admin**: Full capability to add, edit, or delete transactions.
*   **💡 Smart Insights**: Automated calculations for savings rates, top spending categories, and monthly summaries.
*   **🌗 Dark Mode**: Integrated, high-contrast dark theme with premium glassmorphism.
*   **💾 LocalStorage Persistence**: All your data and preferences stay with you across sessions.

---

## 🛠️ Tech Stack

*   **React** (Vite-powered)
*   **Tailwind CSS** (Custom glassmorphism & themes)
*   **Recharts** (Advanced data visualization)
*   **React Context API** (`useReducer` for robust state)
*   **Lucide React** (Modern icons)
*   **Framer Motion** (Smooth animations & micro-interactions)

---

## 🚀 Setup Instructions

1.  **Clone the project** to your local machine.
2.  **Install dependencies**:
    ```bash
    npm install
    ```
3.  **Run the development server**:
    ```bash
    npm run dev
    ```
4.  **Open your browser** at `http://localhost:5173`.

---

## 🧠 State Management Architecture

The application uses a centralized **FinanceContext** for efficient data handling:

*   **useReducer**: Handles complex state logic for transactions (add, update, delete) and UI settings (role, theme, filters).
*   **LocalStorage Sync**: Middleware-like behavior within the reducer ensures data is persisted instantly.
*   **Mock Initialization**: Bootstraps with 15+ realistic transactions if no data is found!

---

## 🧹 Project Structure

```
src/
├── components/
│   ├── Dashboard/      # SummaryCards, ChartSection
│   ├── Insights/       # Smart metrics & analysis
│   ├── Navigation/     # Sidebar & Navbar
│   └── Transactions/   # Table & Form Modal
├── context/
│   └── FinanceContext.jsx # useReducer + Context API
├── data/
│   └── mockData.js    # Categories & initial data
└── App.jsx            # Layout assembly & routing
```

---

*This project was built with Antigravity AI for a premium developer experience.*
