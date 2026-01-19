import './App.css';
import Header from './Components/Header/Header.tsx';
import Footer from './Components/Footer/Footer.tsx';
import Department from './Components/Department/Department.tsx';
import { departments } from './data/departments.ts';

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
