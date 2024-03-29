import React from 'react'; 
import Header from './UI/Header'; 
import Footer from './UI/Footer'; 
import Counter from './Page/Counter'; 

function App() {
  return (
    <div>
      <Header />
      <main>
        <Counter />
      </main>
      <Footer />
    </div>
  );
}

export default App;
