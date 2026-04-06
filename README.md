# ቴራQ (terraQ) Frontend

A modern, responsive, and performance-oriented web application for managing and tracking queues in real-time. Built with **Next.js 16+** and **Tailwind CSS 4**.

## 🌟 Overview

**ቴራQ** (terraQ) provides a streamlined user experience for both business owners and customers. Business owners can create and manage queues, while customers can join and track their live position in real-time, all in a beautiful, accessible interface.

## 🛠️ Technology Stack

*   **Framework**: [Next.js 16+](https://nextjs.org/) (App Router)
*   **Aesthetics**: [Tailwind CSS 4](https://tailwindcss.com/)
*   **Animations**: [Framer Motion](https://www.framer.com/motion/)
*   **Icons**: [Lucide React](https://lucide.dev/)
*   **Real-time Interaction**: Server-Sent Events (SSE) via the browser's [EventSource API](https://developer.mozilla.org/en-US/docs/Web/API/EventSource)
*   **Utility**: [qrcode.react](https://github.com/zpao/qrcode.react) for easy mobile queue joining.

## 🚦 Getting Started

### Prerequisites

*   [Node.js](https://nodejs.org/) (v20+ recommended)
*   [pnpm](https://pnpm.io/) or [npm](https://docs.npmjs.com/)

### Local Development

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/Keba777/teraq-frontend.git
    cd frontend
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Configure `.env`**:
    Create a `.env` file in the root directory and point it to your backend API:
    ```bash
    NEXT_PUBLIC_API_URL=http://localhost:7000
    ```

4.  **Run the application**:
    ```bash
    npm run dev
    ```

The application will be running at [http://localhost:3000](http://localhost:3000).

## ✨ Core Features

### 📅 Live Queue Tracking
- Real-time updates of current ticket being served.
- Live "ahead-count" for customers to know their exact position in line.
- Automatic page state updates via SSE from the backend.

### 🏢 Business Management
- Dashboard to create and manage multiple businesses.
- Real-time queue session controls (start/next/skip/served).
- Automatic QR code generation for every queue.

### 📱 Responsive & Premium Design
- **Mobile First**: Optimized for handheld devices, perfect for customers "on-the-move".
- **Dark Mode**: Support for light and dark themes via `next-themes`.
- **Micro-animations**: Smooth transitions and hover effects for a premium feel.

## 🏗️ Folder Structure

*   **/app**: Next.js App Router pages and layouts.
*   **/components**: Reusable UI components (buttons, cards, etc.).
*   **/features**: Feature-specific logic (Auth, Businesses, Queues, Tickets).
*   **/hooks**: Custom React hooks for data fetching and real-time events.
*   **/lib**: Shared utilities and API client configuration.
*   **/styles**: Global styles and Tailwind configuration.

## 🛡️ Best Practices

- **Atomic Design**: Reusable components structured for maximum flexibility.
- **Type Safety**: Fully typed with TypeScript for reliable development.
- **SEO Ready**: Proper metadata handling and semantic HTML5 for search engine visibility.

---
Built with ❤️ by the terraQ Team.
