import React, { useState, useEffect } from 'react';
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
import TeacherHomeDashboard from './components/TeacherHomeDashboard';
import { getMe } from './api/authApi';

function App() {
  const [view, setView] = useState('landing');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUserSession = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          await getMe();
          setView('dashboard');
        } catch (error) {
          localStorage.removeItem('token');
          setView('landing');
        }
      }
      setLoading(false);
    };

    checkUserSession();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center text-slate-700">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4" />
        <span className="text-sm font-semibold">Loading EduFlow...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {view === 'landing' ? (
        <>
          <Navbar setView={setView} />
          <main>
            <Hero setView={setView} />
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
            <FinalCTA setView={setView} />
          </main>
          <Footer />
        </>
      ) : view === 'login' ? (
        <Login setView={setView} />
      ) : (
        <TeacherHomeDashboard setView={setView} />
      )}
    </div>
  );
}

export default App;
