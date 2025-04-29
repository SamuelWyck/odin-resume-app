import './App.css';
import Header from './components/header';
import GeneralForm from './components/generalForm';
import EducationForm from './components/educationForm';
import JobForm from './components/jobForm';
import Footer from './components/footer';


function App() {

  return (
    <>
      <Header></Header>
      <main>
        <GeneralForm></GeneralForm>
        <EducationForm></EducationForm>
        <JobForm></JobForm>
      </main>
      <Footer>&copy; Resume Builder</Footer>
    </>
  )
}

export default App
