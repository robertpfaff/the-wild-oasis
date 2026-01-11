# The Wild Oasis

An e-commerce system for cabin rentals built with React and Redux.

## Features

- Browse available cabins with detailed information
- Filter cabins by price and capacity
- Add cabins to cart with booking dates and guest count
- Complete checkout process with customer information
- View booking history
- Responsive design with modern UI

## Tech Stack

- **React 19** - UI library
- **Redux Toolkit** - State management
- **React Router** - Client-side routing
- **Vite** - Build tool and development server

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The application will be available at `http://localhost:5173/`

### Build

```bash
npm run build
```

### Lint

```bash
npm run lint
```

## Project Structure

```
src/
├── components/       # Reusable UI components
├── features/         # Redux slices for different features
│   ├── cabins/      # Cabin management
│   ├── cart/        # Shopping cart
│   └── bookings/    # Booking management
├── pages/           # Page components
├── store/           # Redux store configuration
└── data/            # Sample data
```