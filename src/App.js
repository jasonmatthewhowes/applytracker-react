import React from "react";
import "./styles.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavBar } from "./components/nav/NavBar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// PAGES
import Home from "./pages/Home";
import Products from "./pages/Products";
import {Reports} from "./pages/Reports";
import { JobList } from "./pages/JobsList";
import { Login } from "./components/auth/Login";
import { JobEdit } from "./pages/JobsEdit";
import { JobCreate } from "./pages/JobsCreate";
import { ResumeList } from "./pages/ResumeList";
import { ResumeEdit } from "./pages/ResumeEdit";
import { ResumeCreate } from "./pages/ResumeCreate";
import { CoverLetterList } from "./pages/CoverLettersList";
import { CoverLetterEdit } from "./pages/CoverLettersEdit";
import { CoverLetterCreate } from "./pages/CoverLettersCreate";
import { InterviewList } from "./pages/InterviewsList";
import { InterviewEdit } from "./pages/InterviewsEdit";
import { InterviewCreate } from "./pages/InterviewsCreate";
import { ContactList } from "./pages/ContactsList";
import { ContactEdit } from "./pages/ContactsEdit";
import { ContactCreate } from "./pages/ContactsCreate";

export default function App() {
  return (
    
        <>
        <NavBar />
        <Routes>
          <Route path="/" exact element={< Reports />} />
          <Route path="/products" element={< Reports />} />
          <Route path="/jobs" element={< JobList />} />
          <Route path="/contacts" element={< ContactList />} />
          <Route path="/resumes" element={< ResumeList />} />
          <Route path="/interviews" element={< InterviewList/>} />
          <Route path="/createjob" element={< JobCreate />} />
          <Route path="/createcoverletter" element={< CoverLetterCreate />} />
          <Route path="/createresume" element={< ResumeCreate />} />
          <Route path="/createcontact" element={< ContactCreate />} />
          <Route path="/createinterview" element={< InterviewCreate />} />
          <Route path="/coverletters" element={< CoverLetterList />} />
          <Route path="/login" element={< Login />} />
          <Route path="/jobs/edit/:jobId" element={< JobEdit />} />
          <Route path="/interviews/edit/:interviewId" element={< InterviewEdit />} />
          <Route path="/contacts/edit/:contactId" element={< ContactEdit />} />
          <Route path="/resumes/edit/:resumeId" element={< ResumeEdit />} />
          <Route path="/coverletters/edit/:coverLetterId" element={< CoverLetterEdit />} />
        </Routes>
        </>
    
  );
}
