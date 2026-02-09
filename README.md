# Kansalaisaloitteet - Next.js Template

A modern single-page application template built with Next.js and React, featuring a clean white and teal (#087480) color scheme.

## Features

- 🎨 **Modern UI**: Clean design with white background and #087480 accent color
- 🚀 **Next.js Framework**: Built on Next.js 14 for optimal performance
- ⚛️ **React Frontend**: Interactive single-page application
- 📊 **Diagram Component**: Stub implementation for data visualization
- 🔌 **API Endpoints**: Two stub API getters for data fetching
- 📱 **Responsive Design**: Mobile-friendly layout

## Project Structure

```
kansalaisaloitteet/
├── components/
│   └── DiagramStub.js        # Stub diagram component for data visualization
├── pages/
│   ├── api/
│   │   ├── data1.js          # API getter stub 1 - Initiative data
│   │   └── data2.js          # API getter stub 2 - Statistics data
│   ├── _app.js               # Next.js app wrapper
│   └── index.js              # Main application page
├── public/                   # Static assets
├── styles/
│   ├── globals.css           # Global styles
│   ├── Home.module.css       # Homepage styles
│   └── DiagramStub.module.css # Diagram component styles
├── .gitignore
├── next.config.js
├── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/hojott/kansalaisaloitteet.git
cd kansalaisaloitteet
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## API Endpoints

### GET /api/data1
Returns mock initiative data including a list of initiatives with their vote counts.

**Response Example:**
```json
{
  "success": true,
  "message": "Data from API endpoint 1",
  "data": {
    "initiatives": [
      { "id": 1, "title": "Initiative 1", "votes": 1500 },
      { "id": 2, "title": "Initiative 2", "votes": 2300 },
      { "id": 3, "title": "Initiative 3", "votes": 890 }
    ],
    "total": 3
  }
}
```

### GET /api/data2
Returns mock statistics data about initiatives and votes.

**Response Example:**
```json
{
  "success": true,
  "message": "Data from API endpoint 2",
  "data": {
    "statistics": {
      "totalInitiatives": 45,
      "activeInitiatives": 12,
      "completedInitiatives": 33,
      "totalVotes": 125000
    },
    "timestamp": "2024-01-01T00:00:00.000Z"
  }
}
```

## Components

### DiagramStub
A placeholder component for data visualization. This stub uses simple CSS bar charts but can be replaced with libraries like:
- [Chart.js](https://www.chartjs.org/)
- [Recharts](https://recharts.org/)
- [Victory](https://formidable.com/open-source/victory/)
- [D3.js](https://d3js.org/)

## Customization

### Colors
The application uses the following color scheme:
- **Primary Color**: #087480 (Teal)
- **Background**: White
- **Text**: #333 and #666

To change colors, edit the CSS files in the `styles/` directory.

### Adding Real Data
Replace the stub API endpoints in `pages/api/` with real database queries or external API calls.

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Technologies

- [Next.js 14](https://nextjs.org/)
- [React 18](https://reactjs.org/)
- CSS Modules for styling

## License

This project is open source and available under the MIT License.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.