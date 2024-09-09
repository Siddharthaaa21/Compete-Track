import FooterComponents from './FooterComponents'; // Adjust the path as needed

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        {/* Your other components go here */}
      </main>
      <footer className="footer bg-gray-800 text-white p-4"> 
        <FooterComponents />
      </footer>
    </div>
  );
}

export default App;
