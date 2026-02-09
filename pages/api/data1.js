// API Getter 1 - Example stub for fetching initiative data
export default function handler(req, res) {
  // This is a stub API endpoint
  // In a real application, this would fetch data from a database or external API
  
  if (req.method === 'GET') {
    const mockData = {
      success: true,
      message: 'Data from API endpoint 1',
      data: {
        initiatives: [
          { id: 1, title: 'Initiative 1', votes: 1500 },
          { id: 2, title: 'Initiative 2', votes: 2300 },
          { id: 3, title: 'Initiative 3', votes: 890 }
        ],
        total: 3
      }
    };
    
    res.status(200).json(mockData);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
