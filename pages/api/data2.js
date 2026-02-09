// API Getter 2 - Example stub for fetching statistics data
export default function handler(req, res) {
  // This is a stub API endpoint
  // In a real application, this would fetch statistics from a database or external API
  
  if (req.method === 'GET') {
    const mockData = {
      success: true,
      message: 'Data from API endpoint 2',
      data: {
        statistics: {
          totalInitiatives: 45,
          activeInitiatives: 12,
          completedInitiatives: 33,
          totalVotes: 125000
        },
        timestamp: new Date().toISOString()
      }
    };
    
    res.status(200).json(mockData);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
