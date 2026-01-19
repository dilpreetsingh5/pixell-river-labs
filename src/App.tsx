import './App.css';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import Department from './Components/Department/Department';
import { departments } from './data/departments';

// Main App component
function App() {
    return (
        <>
            <Header />
            <main>
                {departments.map((department, index) => (
                    <Department key={index} department={department} />
                ))}
            </main>
            <Footer />
        </>
    );
}

export default App;
