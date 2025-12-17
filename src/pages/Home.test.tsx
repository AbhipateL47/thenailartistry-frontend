// Temporary test file to debug blank page issue
export default function HomeTest() {
  return (
    <div style={{ padding: '20px', backgroundColor: '#f0f0f0', minHeight: '100vh' }}>
      <h1 style={{ color: '#333', fontSize: '32px', marginBottom: '20px' }}>
        The Nailartistry Store - Test Page
      </h1>
      <p style={{ color: '#666', fontSize: '18px' }}>
        If you can see this, the basic React setup is working!
      </p>foot
      <div style={{ marginTop: '20px', padding: '20px', backgroundColor: 'white', borderRadius: '8px' }}>
        <h2 style={{ color: '#ec4899', marginBottom: '10px' }}>Debugging Steps:</h2>
        <ol style={{ color: '#333', lineHeight: '1.8' }}>
          <li>Check browser console (F12) for errors</li>
          <li>Verify all dependencies are installed: <code>npm install</code></li>
          <li>Check if dev server is running: <code>npm run dev</code></li>
          <li>Clear browser cache and hard refresh</li>
        </ol>
      </div>
    </div>
  );
}

