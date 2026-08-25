import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Metrics from './components/Metrics';
import ProblemSection from './components/ProblemSection';
import CoreWorkflow from './components/CoreWorkflow';
import TeachingAssistant from './components/TeachingAssistant';
import LessonPlan from './components/LessonPlan';
import AssessmentGenerator from './components/AssessmentGenerator';
import BloomTaxonomy from './components/BloomTaxonomy';
import ResourceGenerator from './components/ResourceGenerator';
import Multilingual from './components/Multilingual';
import StudentAssessment from './components/StudentAssessment';
import PerformanceAnalytics from './components/PerformanceAnalytics';
import PersonalizedLearning from './components/PersonalizedLearning';
import TeacherDashboard from './components/TeacherDashboard';
import StudentDashboard from './components/StudentDashboard';
import InstitutionSection from './components/InstitutionSection';
import FeatureGrid from './components/FeatureGrid';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import Login from './components/Login';

function App() {
  const [view, setView] = useState('landing');

  return (
    <div className="min-h-screen bg-white">
      {view === 'landing' ? (
        <>
          <Navbar setView={setView} />
          <main>
            <Hero />
            <Metrics />
            <ProblemSection />
            <CoreWorkflow />
            <TeachingAssistant />
            <LessonPlan />
            <AssessmentGenerator />
            <BloomTaxonomy />
            <ResourceGenerator />
            <Multilingual />
            <StudentAssessment />
            <PerformanceAnalytics />
            <PersonalizedLearning />
            <TeacherDashboard />
            <StudentDashboard />
            <InstitutionSection />
            <FeatureGrid />
            <FinalCTA />
          </main>
          <Footer />
        </>
      ) : (
        <Login setView={setView} />
      )}
    </div>
  );
}

export default App;
