import './App.css';
import Header from './components/header';
import GeneralForm from './components/generalForm';
import EducationForm from './components/educationForm';

function App() {

  return (
    <>
      <Header></Header>
      <main>
        <GeneralForm></GeneralForm>
        <EducationForm></EducationForm>
      </main>
    </>
  )
}

export default App
