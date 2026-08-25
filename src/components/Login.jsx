import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Mail, Lock, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import { login } from '../api/authApi';

export default function Login({ setView }) {
  const [role, setRole] = useState('teacher'); // teacher, student, institution
  const [email, setEmail] = useState('teacher@eduflow.ai');
  const [password, setPassword] = useState('teacher123');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const roles = [
    { id: 'teacher', label: 'Teacher', desc: 'Manage classrooms & generate resources' },
    { id: 'student', label: 'Student', desc: 'Access personalized learning & assessments' },
    { id: 'institution', label: 'Institution', desc: 'Track department-wide performance' }
  ];

  const handleValidation = () => {
    const tempErrors = {};
    if (!email) {
      tempErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      tempErrors.email = 'Please enter a valid email address';
    }
    if (!password) {
      tempErrors.password = 'Password is required';
    } else if (password.length < 6) {
      tempErrors.password = 'Password must be at least 6 characters';
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!handleValidation()) return;

    setIsLoading(true);
    setErrors({});
    
    try {
      // Connects to actual Node Express Backend login endpoint
      await login(email, password);
      setIsSuccess(true);
      setTimeout(() => {
        setView('dashboard'); // Redirects to teacher dashboard on successful session init
      }, 1200);
    } catch (error) {
      const errorMsg = error.response && error.response.data && error.response.data.message
        ? error.response.data.message
        : 'Connection failed. Check your internet connection.';
      setErrors({ form: errorMsg });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Dynamic Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-100/50 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-sky-100/50 blur-[120px]" />
        <div className="absolute top-[30%] right-[20%] w-[300px] h-[300px] rounded-full bg-blue-500/5 blur-[80px]" />
      </div>

      {/* Floating Back to Home button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => setView('landing')}
        className="absolute top-6 left-6 z-10 flex items-center space-x-2 text-slate-500 hover:text-slate-900 transition-colors duration-200 group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm font-medium">Back to Home</span>
      </motion.button>

      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch z-10 relative">
        {/* Left Side: Elegant Branding and Info Panel */}
        <div className="lg:col-span-5 hidden lg:flex flex-col justify-center text-left space-y-5 pr-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center space-x-2"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-extrabold text-xl shadow-lg shadow-blue-600/20">
              E
            </div>
            <span className="font-bold text-2xl tracking-tight text-slate-900">EduFlow AI</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-3"
          >
            <h1 className="text-3xl font-extrabold tracking-tight leading-tight text-slate-900">
              Simplify Your <br />
              Teaching Workflow.
            </h1>
            <p className="text-slate-600 text-xs leading-relaxed">
              Log in to access your customized dashboard, manage interactive assignments, track student skill gaps, and generate curriculum assets instantly.
            </p>
          </motion.div>

          {/* Quick Stats or Bullet list */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-2.5 pt-3.5 border-t border-slate-200"
          >
            <div className="flex items-center space-x-3 text-xs text-slate-700">
              <div className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600">
                ✓
              </div>
              <span>Automated Lesson Planning & Quizzes</span>
            </div>
            <div className="flex items-center space-x-3 text-xs text-slate-700">
              <div className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600">
                ✓
              </div>
              <span>Real-time Skill Gap Analysis</span>
            </div>
            <div className="flex items-center space-x-3 text-xs text-slate-700">
              <div className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600">
                ✓
              </div>
              <span>Bloom's Taxonomy Compliant Assessments</span>
            </div>
          </motion.div>

          {/* Mock Accounts & Database Cardinality Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-2 pt-3.5 border-t border-slate-200 text-xs"
          >
            <span className="font-bold text-[10px] text-slate-400 uppercase tracking-wider block">Mock Credentials & Entity Cardinalities</span>
            
            <div className="bg-white/80 border border-slate-200/80 rounded-xl p-3 space-y-2.5 shadow-xs">
              <div className="cursor-pointer hover:bg-slate-50 p-1 rounded-lg transition-colors" onClick={() => {
                setRole('teacher');
                setEmail('teacher@eduflow.ai');
                setPassword('teacher123');
                setErrors({});
              }}>
                <div className="flex justify-between font-bold text-slate-900">
                  <span>Teacher Account</span>
                  <span className="text-[9px] text-blue-600 font-semibold bg-blue-50 px-1.5 py-0.5 rounded">1 : N (Classrooms)</span>
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">
                  <span className="font-medium">Email:</span> teacher@eduflow.ai | <span className="font-medium">Pass:</span> teacher123
                </div>
              </div>
              
              <div className="border-t border-slate-100 pt-2 cursor-pointer hover:bg-slate-50 p-1 rounded-lg transition-colors" onClick={() => {
                setRole('student');
                setEmail('student@eduflow.ai');
                setPassword('student123');
                setErrors({});
              }}>
                <div className="flex justify-between font-bold text-slate-900">
                  <span>Student Account</span>
                  <span className="text-[9px] text-indigo-600 font-semibold bg-indigo-50 px-1.5 py-0.5 rounded">1 : N (Assessments)</span>
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">
                  <span className="font-medium">Email:</span> student@eduflow.ai | <span className="font-medium">Pass:</span> student123
                </div>
              </div>

              <div className="border-t border-slate-100 pt-2 cursor-pointer hover:bg-slate-50 p-1 rounded-lg transition-colors" onClick={() => {
                setRole('institution');
                setEmail('admin@eduflow.ai');
                setPassword('admin123');
                setErrors({});
              }}>
                <div className="flex justify-between font-bold text-slate-900">
                  <span>Institution Admin</span>
                  <span className="text-[9px] text-violet-600 font-semibold bg-violet-50 px-1.5 py-0.5 rounded">1 : N (Departments)</span>
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">
                  <span className="font-medium">Email:</span> admin@eduflow.ai | <span className="font-medium">Pass:</span> admin123
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Animated Interactive Login Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 120 }}
          className="lg:col-span-7 bg-white border border-slate-100 rounded-2xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.05)] flex flex-col justify-center"
        >
          <AnimatePresence mode="wait">
            {!isSuccess ? (
              <motion.div
                key="login-form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div className="text-center sm:text-left">
                  <h2 className="text-2xl font-bold text-slate-900 flex items-center justify-center sm:justify-start gap-2">
                    Welcome Back <Sparkles className="w-5 h-5 text-blue-500 animate-pulse" />
                  </h2>
                  <p className="text-sm text-slate-500 mt-1">Please select your role and sign in.</p>
                </div>

                {/* Role Tabs Selection */}
                <div className="grid grid-cols-3 gap-2 bg-slate-50 p-1.5 rounded-xl border border-slate-200/60">
                  {roles.map((r) => {
                    const isActive = role === r.id;
                    return (
                      <button
                        key={r.id}
                        type="button"
                        onClick={() => {
                          setRole(r.id);
                          // Auto fill credentials matching the tab
                          if (r.id === 'teacher') {
                            setEmail('teacher@eduflow.ai');
                            setPassword('teacher123');
                          } else if (r.id === 'student') {
                            setEmail('student@eduflow.ai');
                            setPassword('student123');
                          } else {
                            setEmail('admin@eduflow.ai');
                            setPassword('admin123');
                          }
                          setErrors({});
                        }}
                        className="relative py-2 px-1 text-xs font-semibold rounded-lg transition-all duration-200 focus:outline-none"
                      >
                        {isActive && (
                          <motion.div
                            layoutId="activeRoleTab"
                            className="absolute inset-0 bg-blue-600 rounded-lg shadow-md"
                            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                          />
                        )}
                        <span className={`relative z-10 transition-colors duration-200 ${isActive ? 'text-white' : 'text-slate-500 hover:text-slate-800'}`}>
                          {r.label}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Context Description for Selected Role */}
                <motion.p
                  key={role}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs text-blue-700 bg-blue-50/50 border border-blue-100 rounded-lg p-2.5 text-center"
                >
                  {roles.find((r) => r.id === role)?.desc}
                </motion.p>

                {/* Form Elements */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Email Input */}
                  <div className="space-y-1.5 text-left">
                    <label className="text-xs font-semibold text-slate-700">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (errors.email) setErrors({ ...errors, email: '' });
                          if (errors.form) setErrors({ ...errors, form: '' });
                        }}
                        placeholder="you@domain.com"
                        className={`w-full bg-white border ${
                          errors.email ? 'border-rose-500 focus:border-rose-500' : 'border-slate-200 focus:border-blue-500'
                        } rounded-xl py-3 pl-10 pr-4 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500/20 transition-all duration-150`}
                      />
                    </div>
                    {errors.email && (
                      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-rose-500">
                        {errors.email}
                      </motion.p>
                    )}
                  </div>

                  {/* Password Input */}
                  <div className="space-y-1.5 text-left">
                    <div className="flex justify-between items-center">
                      <label className="text-xs font-semibold text-slate-700">Password</label>
                      <a href="#" className="text-xs text-blue-600 hover:text-blue-700 hover:underline">Forgot?</a>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                          if (errors.password) setErrors({ ...errors, password: '' });
                          if (errors.form) setErrors({ ...errors, form: '' });
                        }}
                        placeholder="••••••••"
                        className={`w-full bg-white border ${
                          errors.password ? 'border-rose-500 focus:border-rose-500' : 'border-slate-200 focus:border-blue-500'
                        } rounded-xl py-3 pl-10 pr-4 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500/20 transition-all duration-150`}
                      />
                    </div>
                    {errors.password && (
                      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-rose-500">
                        {errors.password}
                      </motion.p>
                    )}
                  </div>

                  {/* General Submit Error Form message */}
                  {errors.form && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-rose-50 border border-rose-100 rounded-xl p-3 text-xs text-rose-600 text-left font-medium"
                    >
                      {errors.form}
                    </motion.div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full relative overflow-hidden bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold rounded-xl py-3 text-sm shadow-md hover:shadow-blue-600/10 active:scale-[0.99] transition-all duration-150 flex items-center justify-center space-x-2 mt-6 cursor-pointer"
                  >
                    {isLoading ? (
                      <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                    ) : (
                      <>
                        <span>Sign In as {role.charAt(0).toUpperCase() + role.slice(1)}</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>

                {/* Divider */}
                <div className="relative flex py-2 items-center">
                  <div className="flex-grow border-t border-slate-200"></div>
                  <span className="flex-shrink mx-4 text-slate-400 text-xs font-medium uppercase tracking-wider">or continue with</span>
                  <div className="flex-grow border-t border-slate-200"></div>
                </div>

                {/* Social Logins */}
                <div className="grid grid-cols-3 gap-3">
                  <button className="flex items-center justify-center py-2.5 border border-slate-200 rounded-xl bg-slate-50/50 hover:bg-slate-100 hover:border-slate-300 transition-colors focus:outline-none cursor-pointer">
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="#EA4335" d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.2-5.136 4.2A5.73 5.73 0 0 1 8.24 12.8a5.73 5.73 0 0 1 5.75-5.8c1.55 0 2.96.61 4.02 1.6l3.07-3.07C19.18 3.68 16.32 2.4 13.99 2.4a9.6 9.6 0 0 0-9.6 9.6a9.6 9.6 0 0 0 9.6 9.6c5.06 0 9.59-3.66 9.59-9.57a8.7 8.7 0 0 0-.15-1.74H12.24z"/>
                    </svg>
                  </button>
                  <button className="flex items-center justify-center py-2.5 border border-slate-200 rounded-xl bg-slate-50/50 hover:bg-slate-100 hover:border-slate-300 transition-colors focus:outline-none cursor-pointer">
                    <svg className="w-5 h-5" viewBox="0 0 23 23">
                      <path fill="#F25022" d="M0 0h11v11H0z"/>
                      <path fill="#7FBA00" d="M12 0h11v11H12z"/>
                      <path fill="#00A4EF" d="M0 12h11v11H0z"/>
                      <path fill="#FFB900" d="M12 12h11v11H12z"/>
                    </svg>
                  </button>
                  <button className="flex items-center justify-center py-2.5 border border-slate-200 rounded-xl bg-slate-50/50 hover:bg-slate-100 hover:border-slate-300 transition-colors focus:outline-none cursor-pointer text-slate-700">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z"/>
                    </svg>
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="success-card"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 flex flex-col items-center justify-center text-center space-y-4"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600"
                >
                  <CheckCircle2 className="w-10 h-10" />
                </motion.div>
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-slate-900">Sign In Successful</h3>
                  <p className="text-sm text-slate-500">Welcome to your dashboard. Redirecting...</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
