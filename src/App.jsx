import './App.css';
import Header from './components/header';
import GeneralForm from './components/generalForm';
import EducationForm from './components/educationForm';
import JobForm from './components/jobForm';


function App() {

  return (
    <>
      <Header></Header>
      <main>
        <GeneralForm></GeneralForm>
        <EducationForm></EducationForm>
        <JobForm></JobForm>
      </main>
    </>
  )
}

export default App
