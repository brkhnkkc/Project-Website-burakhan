import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Home } from "./Pages/Home"
import { NotFound } from "./Pages/NotFound"
import { ProjectsPage } from "./Pages/ProjectsPage"
import { PersonalPage } from "./Pages/PersonalPage"

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />}/>
         <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/personal" element={<PersonalPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
