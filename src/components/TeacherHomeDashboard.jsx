import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Upload,
  BookOpen,
  FileText,
  HelpCircle,
  ClipboardList,
  Presentation,
  CheckSquare,
  Users,
  Calendar,
  MoreVertical,
  Bell,
  ChevronDown,
  Menu,
  X,
  File,
  ArrowRight,
  TrendingUp,
  Clock,
  LogOut,
  Settings,
  CheckCircle,
  Search,
  Trash2,
  Download,
  AlertTriangle,
  Award,
  BookMarked
} from 'lucide-react';
import { getDashboardOverview } from '../api/dashboardApi';
import { getClasses } from '../api/classApi';
import { getMaterials, deleteMaterial as deleteMaterialApi } from '../api/materialApi';
import { getPerformanceAnalytics } from '../api/analyticsApi';
import {
  generateLessonPlan,
  generateQuestionPaper,
  generateQuiz,
  generateWorksheet,
  generatePPT,
  uploadChapter
} from '../api/aiApi';
import { logout } from '../api/authApi';

export default function TeacherHomeDashboard({ setView }) {
  // Navigation & Dropdown State
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  
  // Search & Filter States
  const [materialsSearch, setMaterialsSearch] = useState('');
  const [materialsFilter, setMaterialsFilter] = useState('All');
  
  // Interactive Modal State
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState('Mathematics');
  const [selectedGrade, setSelectedGrade] = useState('I BCA A');
  const [isUploading, setIsUploading] = useState(false);

  // Active AI Tool State for simulator
  const [activeAiTool, setActiveAiTool] = useState(null);
  const [toolSubject, setToolSubject] = useState('Mathematics');
  const [toolClass, setToolClass] = useState('I BCA A');
  const [toolChapter, setToolChapter] = useState('');
  const [isGeneratingToolAsset, setIsGeneratingToolAsset] = useState(false);

  // Data States
  const [dashboardData, setDashboardData] = useState(null);
  const [classesList, setClassesList] = useState([]);
  const [materialsList, setMaterialsList] = useState([]);
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Toast Notifications State
  const [toasts, setToasts] = useState([]);

  // Mock Notification Data
  const [notifications, setNotifications] = useState([
    { id: 1, text: "AI generated a new Worksheet for Physics", time: "5 mins ago", read: false },
    { id: 2, text: "Evaluation complete for Chemistry assignment", time: "1 hour ago", read: false }
  ]);

  // Fetch Dashboard details on startup
  const fetchAllDashboardData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [dbOverview, clsList, matList, statsAnalytics] = await Promise.all([
        getDashboardOverview(),
        getClasses(),
        getMaterials(),
        getPerformanceAnalytics()
      ]);
      setDashboardData(dbOverview);
      setClassesList(clsList);
      setMaterialsList(matList);
      setAnalyticsData(statsAnalytics);
    } catch (err) {
      console.error(err);
      setError('Unable to load dashboard. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllDashboardData();
  }, []);

  // Show Toast Function
  const showToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  // Drag and Drop Handlers
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setUploadedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
    }
  };

  const handleUploadSubmit = async (e) => {
    e.preventDefault();
    if (!uploadedFile) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', uploadedFile);
      formData.append('subject', selectedSubject);
      formData.append('chapterName', uploadedFile.name.replace(/\.[^/.]+$/, ""));

      // Find selected grade's class id if exists
      const targetClass = classesList.find(c => c.name === selectedGrade);
      if (targetClass) {
        formData.append('classId', targetClass._id);
      }

      await uploadChapter(formData);
      showToast(`Chapter "${uploadedFile.name}" successfully uploaded and analyzed by AI!`);
      setUploadModalOpen(false);
      setUploadedFile(null);
      
      // Refresh dashboard info
      await fetchAllDashboardData();
    } catch (err) {
      console.error(err);
      showToast('Error uploading file. Please try again.', 'error');
    } finally {
      setIsUploading(false);
    }
  };

  const handleToolGenerateSubmit = async (e) => {
    e.preventDefault();
    if (!toolChapter.trim()) {
      showToast("Please enter a chapter topic", "error");
      return;
    }

    setIsGeneratingToolAsset(true);
    try {
      const targetClass = classesList.find(c => c.name === toolClass);
      const classId = targetClass ? targetClass._id : null;

      if (activeAiTool === 'Lesson Plan') {
        await generateLessonPlan(toolSubject, toolChapter, classId);
      } else if (activeAiTool === 'Question Paper') {
        await generateQuestionPaper({
          subject: toolSubject,
          chapter: toolChapter,
          totalMarks: 50,
          numberOfQuestions: 5,
          difficulty: 'medium',
          duration: 90,
          classId
        });
      } else if (activeAiTool === 'Quiz') {
        await generateQuiz({
          subject: toolSubject,
          chapter: toolChapter,
          totalMarks: 20,
          duration: 30,
          classId,
          count: 5
        });
      } else if (activeAiTool === 'Worksheet') {
        await generateWorksheet(toolSubject, toolChapter, classId);
      } else if (activeAiTool === 'PPT') {
        await generatePPT(toolSubject, toolChapter, classId);
      } else {
        showToast('Grading simulation complete');
      }

      showToast(`AI successfully generated ${activeAiTool} for "${toolChapter}"!`);
      setActiveAiTool(null);
      setToolChapter('');
      
      // Refresh details
      await fetchAllDashboardData();
    } catch (err) {
      console.error(err);
      showToast('AI generation failed. Please check inputs.', 'error');
    } finally {
      setIsGeneratingToolAsset(false);
    }
  };

  const deleteMaterial = async (id, name) => {
    try {
      await deleteMaterialApi(id);
      showToast(`Removed "${name}" from database.`);
      setMaterialsList(prev => prev.filter(m => m._id !== id));
      
      // Refresh dashboard counters
      const [dbOverview] = await Promise.all([getDashboardOverview()]);
      setDashboardData(dbOverview);
    } catch (err) {
      console.error(err);
      showToast('Error removing material.', 'error');
    }
  };

  const markAllNotificationsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
    showToast("All notifications marked as read");
  };

  const handleSignOut = async () => {
    await logout();
    setView('landing');
    showToast("Logged out successfully");
  };

  // Filtered Materials calculations
  const filteredMaterials = materialsList.filter((m) => {
    const matchesSearch = m.chapter.toLowerCase().includes(materialsSearch.toLowerCase()) || 
                          m.subject.toLowerCase().includes(materialsSearch.toLowerCase());
    const matchesFilter = materialsFilter === 'All' || m.type === materialsFilter;
    return matchesSearch && matchesFilter;
  });

  // Map icon component helper
  const getIconComponent = (type) => {
    switch (type) {
      case 'Question Paper': return FileText;
      case 'Quiz': return HelpCircle;
      case 'Worksheet': return ClipboardList;
      case 'PPT': return Presentation;
      case 'Homework': return CheckSquare;
      default: return BookOpen;
    }
  };

  const getIconColor = (type) => {
    switch (type) {
      case 'Question Paper': return 'text-indigo-600 bg-indigo-50 border-indigo-100';
      case 'Quiz': return 'text-violet-600 bg-violet-50 border-violet-100';
      case 'Worksheet': return 'text-sky-600 bg-sky-50 border-sky-100';
      case 'PPT': return 'text-teal-600 bg-teal-50 border-teal-100';
      case 'Homework': return 'text-emerald-600 bg-emerald-50 border-emerald-100';
      default: return 'text-blue-600 bg-blue-50 border-blue-100';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center text-slate-500">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4" />
        <span className="text-sm font-semibold">Loading your dashboard...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center text-slate-700 p-4">
        <AlertTriangle className="w-12 h-12 text-rose-500 mb-3" />
        <h3 className="text-lg font-bold">Unable to load dashboard</h3>
        <p className="text-xs text-slate-500 mt-1 mb-4">{error}</p>
        <button
          onClick={fetchAllDashboardData}
          className="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-lg cursor-pointer"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-800 font-sans relative pb-12 text-left text-sm md:text-base">
      {/* Toast Notification Container */}
      <div className="fixed top-6 right-6 z-50 flex flex-col gap-2 pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              className="bg-white border border-slate-100 shadow-xl shadow-slate-200/50 rounded-xl p-4 flex items-center gap-3 min-w-[320px] pointer-events-auto"
            >
              <div className="w-9 h-9 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-5.5 h-5.5" />
              </div>
              <span className="text-sm font-semibold text-slate-700">{toast.message}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-100 py-4 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14">
            {/* Left side brand logo */}
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2.5 cursor-pointer" onClick={() => setView('landing')}>
                <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-xl shadow-sm shadow-blue-600/10">
                  E
                </div>
                <span className="font-bold text-2xl tracking-tight text-slate-900">EduFlow</span>
              </div>

              {/* Desktop Nav Items */}
              <div className="hidden lg:flex space-x-2 items-center">
                {['Dashboard', 'My Classes', 'AI Tools', 'Materials', 'Analytics'].map((tab) => {
                  const isActive = activeTab === tab;
                  return (
                    <button
                      key={tab}
                      onClick={() => {
                        setActiveTab(tab);
                        setActiveAiTool(null);
                        showToast(`Navigated to ${tab}`);
                      }}
                      className={`px-4 py-2.5 text-sm font-bold rounded-lg transition-all duration-200 cursor-pointer ${
                        isActive ? 'text-blue-600 bg-blue-50/50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                      }`}
                    >
                      {tab}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right items */}
            <div className="flex items-center space-x-5">
              {/* Notification icon with dropdown */}
              <div className="relative">
                <button
                  onClick={() => {
                    setNotificationsOpen(!notificationsOpen);
                    setProfileDropdownOpen(false);
                  }}
                  className="p-2.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-full transition-all relative cursor-pointer"
                >
                  <Bell className="w-5.5 h-5.5" />
                  {notifications.some((n) => !n.read) && (
                    <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-rose-500 rounded-full ring-2 ring-white animate-pulse" />
                  )}
                </button>

                <AnimatePresence>
                  {notificationsOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-3 w-80 bg-white border border-slate-100 rounded-xl shadow-xl shadow-slate-200/50 overflow-hidden z-50 text-left"
                    >
                      <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                        <span className="text-sm font-bold text-slate-900">Notifications</span>
                        {notifications.length > 0 && (
                          <button
                            onClick={markAllNotificationsRead}
                            className="text-xs text-blue-600 hover:text-blue-700 hover:underline font-semibold cursor-pointer"
                          >
                            Mark all as read
                          </button>
                        )}
                      </div>
                      <div className="divide-y divide-slate-50 max-h-60 overflow-y-auto">
                        {notifications.length === 0 ? (
                          <div className="p-4 text-center text-sm text-slate-400 font-medium">
                            No notifications
                          </div>
                        ) : (
                          notifications.map((n) => (
                            <div
                              key={n.id}
                              className={`p-3.5 text-sm transition-colors duration-150 ${n.read ? 'bg-white' : 'bg-blue-50/20'}`}
                            >
                              <p className="text-slate-700 font-semibold">{n.text}</p>
                              <span className="text-xs text-slate-400 block mt-1">{n.time}</span>
                            </div>
                          ))
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Profile image with dropdown */}
              <div className="relative">
                <button
                  onClick={() => {
                    setProfileDropdownOpen(!profileDropdownOpen);
                    setNotificationsOpen(false);
                  }}
                  className="flex items-center space-x-2.5 p-1.5 hover:bg-slate-100 rounded-lg transition-all cursor-pointer"
                >
                  <img
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150"
                    alt="Teacher Profile"
                    className="w-8.5 h-8.5 rounded-full object-cover ring-2 ring-blue-100"
                  />
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                </button>

                <AnimatePresence>
                  {profileDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-3 w-56 bg-white border border-slate-100 rounded-xl shadow-xl shadow-slate-200/50 overflow-hidden z-50 text-left"
                    >
                      <div className="p-4 border-b border-slate-100">
                        <span className="text-sm font-bold text-slate-900 block">Sarah Jenkins</span>
                        <span className="text-xs text-slate-400 block mt-0.5">teacher@eduflow.ai</span>
                      </div>
                      <div className="p-1.5">
                        <button
                          onClick={() => {
                            setProfileDropdownOpen(false);
                            showToast("Settings screen mockup triggered");
                          }}
                          className="w-full text-left px-3.5 py-2.5 text-sm text-slate-600 hover:bg-slate-50 rounded-lg font-bold flex items-center gap-2 cursor-pointer"
                        >
                          <Settings className="w-4.5 h-4.5 text-slate-400" /> Settings
                        </button>
                        <button
                          onClick={handleSignOut}
                          className="w-full text-left px-3.5 py-2.5 text-sm text-rose-600 hover:bg-rose-50 rounded-lg font-bold flex items-center gap-2 cursor-pointer"
                        >
                          <LogOut className="w-4.5 h-4.5" /> Sign Out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-slate-500 hover:text-slate-800"
              >
                {mobileMenuOpen ? <X className="w-6.5 h-6.5" /> : <Menu className="w-6.5 h-6.5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu panel */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden bg-white border-t border-slate-100 overflow-hidden"
            >
              <div className="px-4 py-3 space-y-1">
                {['Dashboard', 'My Classes', 'AI Tools', 'Materials', 'Analytics'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => {
                      setActiveTab(tab);
                      setMobileMenuOpen(false);
                      showToast(`Switched view to ${tab}`);
                    }}
                    className={`block w-full text-left px-4 py-3 text-sm font-bold rounded-lg ${
                      activeTab === tab ? 'text-blue-600 bg-blue-50/50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 space-y-10">
        
        {/* ==================== TAB 1: DASHBOARD VIEW ==================== */}
        {activeTab === 'Dashboard' && dashboardData && (
          <>
            {/* Welcome Header */}
            <div className="bg-white border border-slate-100 rounded-2xl p-8 sm:p-10 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6 text-left relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[30%] h-full bg-[radial-gradient(ellipse_at_top_right,rgba(59,130,246,0.06),rgba(255,255,255,0))] -z-10" />
              
              <div className="space-y-2">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                  Good Morning, Teacher 👋
                </h1>
                <p className="text-slate-500 text-base font-semibold">
                  Create, teach, evaluate and manage everything in one place.
                </p>
              </div>

              <div className="flex flex-row items-center gap-3">
                <button
                  onClick={() => setUploadModalOpen(true)}
                  className="px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl shadow-md hover:shadow-lg transition-all duration-150 flex items-center gap-2 cursor-pointer"
                >
                  <Upload className="w-4.5 h-4.5" />
                  <span>Upload Chapter</span>
                </button>
                <button
                  onClick={() => {
                    setActiveTab('AI Tools');
                    showToast("Navigated to AI tools gallery page");
                  }}
                  className="px-5 py-3 bg-white border border-slate-200 hover:border-slate-300 text-slate-700 text-sm font-bold rounded-xl shadow-xs transition-all duration-150 cursor-pointer"
                >
                  Explore AI Tools
                </button>
              </div>
            </div>

            {/* Quick AI Actions Grid */}
            <div className="space-y-5">
              <div className="flex items-center space-x-2.5 text-left">
                <Sparkles className="w-5.5 h-5.5 text-blue-600 animate-pulse" />
                <h2 className="text-base font-bold text-slate-950 uppercase tracking-widest">Quick AI Actions</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { title: 'Lesson Plan', desc: 'AI creates a structured lesson plan from a chapter', icon: BookOpen, color: 'text-indigo-600 bg-indigo-50 border-indigo-100/50' },
                  { title: 'Question Paper', desc: 'Create question papers based on subject, marks and difficulty', icon: FileText, color: 'text-blue-600 bg-blue-50 border-blue-100/50' },
                  { title: 'Quiz', desc: 'Generate MCQs and interactive classroom quizzes', icon: HelpCircle, color: 'text-violet-600 bg-violet-50 border-violet-100/50' },
                  { title: 'Worksheet', desc: 'Generate practice worksheets and assignments', icon: ClipboardList, color: 'text-sky-600 bg-sky-50 border-sky-100/50' },
                  { title: 'PPT', desc: 'Generate presentation slides from chapter content', icon: Presentation, color: 'text-teal-600 bg-teal-50 border-teal-100/50' },
                  { title: 'Evaluation', desc: 'AI evaluates subjective student answer scripts', icon: CheckSquare, color: 'text-emerald-600 bg-emerald-50 border-emerald-100/50' }
                ].map((action, idx) => {
                  const Icon = action.icon;
                  return (
                    <motion.div
                      key={idx}
                      whileHover={{ y: -3, scale: 1.01 }}
                      onClick={() => {
                        setActiveTab('AI Tools');
                        setActiveAiTool(action.title);
                        showToast(`Selected AI Tool: ${action.title}`);
                      }}
                      className="bg-white border border-slate-100 rounded-2xl p-6 shadow-xs hover:shadow-md hover:border-blue-100 cursor-pointer text-left transition-all duration-200 flex items-start gap-4"
                    >
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${action.color} border`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="space-y-1.5">
                        <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600">Generate {action.title}</h3>
                        <p className="text-sm text-slate-500 font-medium leading-relaxed">{action.desc}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Overview Stats Section */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: 'Total Classes', value: String(dashboardData.totalClasses).padStart(2, '0'), trend: 'Active BCA courses', icon: Users, color: 'text-blue-600' },
                { label: 'Total Students', value: String(dashboardData.totalStudents), trend: 'Registered students', icon: Users, color: 'text-indigo-600' },
                { label: 'Lessons Created', value: String(dashboardData.totalLessons), trend: 'Generated syllabus', icon: BookOpen, color: 'text-violet-600' },
                { label: 'Question Papers', value: String(dashboardData.totalQuestionPapers), trend: 'Assessment sheets', icon: FileText, color: 'text-sky-600' }
              ].map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <div key={idx} className="bg-white border border-slate-100 rounded-2xl p-6 shadow-xs text-left relative overflow-hidden flex flex-col justify-between h-32">
                    <div className="flex justify-between items-start">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</span>
                      <Icon className={`w-5 h-5 ${stat.color}`} />
                    </div>
                    <div>
                      <span className="text-3xl font-extrabold text-slate-900 block leading-none mb-1.5">{stat.value}</span>
                      <span className="text-xs text-slate-400 font-semibold flex items-center gap-1">
                        {stat.trend}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Split Grid: Recent Materials & Performance Chart */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left panel: Recent Materials (7 columns) */}
              <div className="lg:col-span-7 bg-white border border-slate-100 rounded-2xl p-6 sm:p-8 shadow-xs flex flex-col justify-between text-left">
                <div className="space-y-5">
                  <div className="flex items-center justify-between border-b border-slate-50 pb-4">
                    <h3 className="text-base font-bold text-slate-950 uppercase tracking-widest">Recent Materials</h3>
                    {materialsList.length > 0 && (
                      <button
                        onClick={() => setActiveTab('Materials')}
                        className="text-sm text-blue-600 hover:text-blue-700 hover:underline font-bold cursor-pointer"
                      >
                        View All
                      </button>
                    )}
                  </div>

                  <div className="divide-y divide-slate-50">
                    {materialsList.length === 0 ? (
                      <div className="py-12 text-center text-slate-400 text-sm font-medium space-y-1">
                        <p>No materials generated yet.</p>
                        <p className="text-xs text-slate-400 font-normal">Upload a chapter resource to let AI generate study plans.</p>
                      </div>
                    ) : (
                      materialsList.slice(0, 4).map((m) => {
                        const Icon = getIconComponent(m.type);
                        const colorClass = getIconColor(m.type);
                        return (
                          <div key={m._id} className="py-4 flex items-center justify-between group hover:bg-slate-50/50 rounded-xl px-2 transition-colors duration-150">
                            <div className="flex items-center space-x-4">
                              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${colorClass}`}>
                                <Icon className="w-5 h-5" />
                              </div>
                              <div>
                                <div className="flex items-center gap-2.5">
                                  <span className="text-sm font-bold text-slate-900">{m.subject} – {m.chapter}</span>
                                  <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md">
                                    {m.type}
                                  </span>
                                </div>
                                <span className="text-xs text-slate-400 block mt-1">{new Date(m.createdAt).toLocaleDateString()}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => showToast(`Opening preview for ${m.chapter} (${m.type})`)}
                                className="px-3.5 py-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors cursor-pointer"
                              >
                                Open
                              </button>
                              <button
                                onClick={() => deleteMaterial(m._id, m.chapter)}
                                className="p-2 hover:bg-rose-50 rounded-md text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                              >
                                <Trash2 className="w-4.5 h-4.5" />
                              </button>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              </div>

              {/* Right panel: Student Performance Chart (5 columns) */}
              <div className="lg:col-span-5 bg-white border border-slate-100 rounded-2xl p-6 sm:p-8 shadow-xs flex flex-col justify-between text-left">
                <div className="space-y-5">
                  <div className="border-b border-slate-50 pb-4">
                    <h3 className="text-base font-bold text-slate-950 uppercase tracking-widest">Student Performance</h3>
                  </div>

                  {/* Progress bars showing real data */}
                  <div className="space-y-4 max-h-[240px] overflow-y-auto pr-1">
                    {dashboardData.studentPerformance.map((c, idx) => (
                      <div key={idx} className="space-y-1.5">
                        <div className="flex justify-between text-sm font-semibold text-slate-700">
                          <span>{c.className}</span>
                          <span className="font-bold text-slate-900">{c.score}%</span>
                        </div>
                        <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${c.score}%` }}
                            transition={{ duration: 0.8, delay: idx * 0.1 }}
                            className={`h-full rounded-full ${c.color || 'bg-blue-600'}`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Performance Statistics footer grid */}
                  <div className="grid grid-cols-2 gap-3.5 pt-4 border-t border-slate-100">
                    <div className="bg-slate-50 p-3 rounded-xl text-sm text-left">
                      <span className="text-xs text-slate-400 font-semibold block uppercase">Avg Score</span>
                      <span className="font-bold text-slate-900 text-base block mt-0.5">{analyticsData ? `${analyticsData.classAverage}%` : '80.2%'}</span>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-xl text-sm text-left">
                      <span className="text-xs text-slate-400 font-semibold block uppercase">Assignments</span>
                      <span className="font-bold text-slate-900 text-base block mt-0.5">{analyticsData ? `${analyticsData.assignmentCompletion}%` : '94.8%'}</span>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-xl text-sm text-left">
                      <span className="text-xs text-slate-400 font-semibold block uppercase">Quiz Averages</span>
                      <span className="font-bold text-slate-900 text-base block mt-0.5">{analyticsData ? `${analyticsData.quizPerformance}%` : '78.5%'}</span>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-xl text-sm text-left">
                      <span className="text-xs text-slate-400 font-semibold block uppercase">Needs Help</span>
                      <span className="font-bold text-slate-900 text-base block mt-0.5">{analyticsData ? `${analyticsData.studentsNeedingAttention.length} Students` : '4 Students'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Secondary Grid: Upcoming activities & AI Insight Card */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Side: Upcoming Activities (6 columns) */}
              <div className="lg:col-span-6 bg-white border border-slate-100 rounded-2xl p-6 sm:p-8 shadow-xs flex flex-col justify-between text-left">
                <div className="space-y-5">
                  <div className="border-b border-slate-50 pb-4 flex items-center justify-between">
                    <h3 className="text-base font-bold text-slate-950 uppercase tracking-widest">Upcoming Activities</h3>
                    <Calendar className="w-5 h-5 text-slate-400" />
                  </div>

                  <div className="space-y-4">
                    {dashboardData.upcomingActivities.map((act, idx) => (
                      <div key={idx} className="flex justify-between items-center p-3.5 hover:bg-slate-50 rounded-xl transition-colors border border-transparent hover:border-slate-100">
                        <div className="space-y-1.5">
                          <h4 className="text-sm font-bold text-slate-900">{act.title}</h4>
                          <div className="flex items-center space-x-2 text-xs text-slate-400 font-medium">
                            <Clock className="w-4 h-4" />
                            <span>{act.date}</span>
                          </div>
                        </div>
                        <span className="text-xs font-bold px-3 py-1 rounded-full text-emerald-700 bg-emerald-50">
                          {act.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Side: AI Insight Card (6 columns) */}
              <div className="lg:col-span-6 bg-blue-600 text-white rounded-2xl p-6 sm:p-8 shadow-md flex flex-col justify-between text-left relative overflow-hidden">
                {/* Background design elements */}
                <div className="absolute top-[-10%] right-[-10%] w-[120px] h-[120px] rounded-full bg-white/10 blur-xl" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[120px] h-[120px] rounded-full bg-indigo-500/30 blur-2xl" />

                <div className="space-y-5 relative z-10">
                  <div className="flex items-center space-x-2 border-b border-white/10 pb-4">
                    <span className="text-xl">💡</span>
                    <h3 className="text-base font-bold uppercase tracking-widest text-white/90">AI Teaching Insight</h3>
                  </div>

                  <div className="space-y-2.5">
                    <p className="text-base font-bold text-white leading-relaxed">
                      {dashboardData.aiInsights.insightText}
                    </p>
                    <p className="text-sm text-blue-100 font-medium leading-relaxed">
                      {dashboardData.aiInsights.recommendation}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4.5 pt-8 relative z-10">
                  <button
                    onClick={() => {
                      setActiveTab('AI Tools');
                      setActiveAiTool('Worksheet');
                      setToolChapter('Trigonometric Identities Practice');
                      showToast("Generating worksheet parameters...");
                    }}
                    className="px-5 py-3 bg-white text-blue-600 text-sm font-bold rounded-lg hover:bg-blue-50 transition-colors shadow-sm cursor-pointer"
                  >
                    Generate Worksheet
                  </button>
                  <button
                    onClick={() => setActiveTab('Analytics')}
                    className="px-5 py-3 bg-blue-700 hover:bg-blue-800 text-white text-sm font-bold rounded-lg transition-colors border border-blue-500/50 cursor-pointer"
                  >
                    View Analytics
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Productivity Section */}
            <div className="space-y-5">
              <div className="flex items-center space-x-2 text-left">
                <h2 className="text-base font-bold text-slate-950 uppercase tracking-widest">Continue where you left off</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {materialsList.length === 0 ? (
                  <div className="col-span-full bg-white border border-slate-100 p-10 rounded-xl text-center text-slate-400 text-sm font-medium">
                    No recent sessions found. Upload a chapter to get started!
                  </div>
                ) : (
                  materialsList.slice(0, 4).map((item, idx) => {
                    const Icon = getIconComponent(item.type);
                    return (
                      <div
                        key={idx}
                        onClick={() => showToast(`Resuming session: "${item.chapter}"`)}
                        className="bg-white border border-slate-100 hover:border-blue-100 hover:shadow-xs p-5 rounded-xl cursor-pointer text-left transition-all duration-150"
                      >
                        <div className="flex items-center space-x-2.5 mb-3">
                          <div className="w-8.5 h-8.5 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                            <Icon className="w-5 h-5" />
                          </div>
                          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{item.type}</span>
                        </div>
                        <h4 className="text-sm font-bold text-slate-800 block truncate">{item.chapter}</h4>
                        <span className="text-xs text-slate-400 block mt-1.5 font-semibold">Edited just now</span>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </>
        )}

        {/* ==================== TAB 2: MY CLASSES VIEW ==================== */}
        {activeTab === 'My Classes' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Active Classrooms</h2>
              <p className="text-sm text-slate-500 mt-1.5">Manage student metrics, active curriculum assignments, and syllabus coverages.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {classesList.map((cls, idx) => (
                <div key={idx} className="bg-white border border-slate-100 rounded-2xl p-6 shadow-xs space-y-5 hover:shadow-md hover:border-blue-100 transition-all duration-200">
                  <div className="flex justify-between items-center">
                    <h3 className="text-base font-bold text-slate-900">{cls.name}</h3>
                    <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                      {cls.studentsCount} Students
                    </span>
                  </div>

                  <div className="space-y-4">
                    {/* Coverage slider */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs font-semibold text-slate-500">
                        <span>Syllabus Coverage</span>
                        <span className="text-slate-800 font-bold">{cls.coverage}%</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div className="bg-blue-600 h-full rounded-full" style={{ width: `${cls.coverage}%` }} />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-2 text-sm">
                      <div className="bg-slate-50 p-3 rounded-xl">
                        <span className="text-xs text-slate-400 uppercase block font-bold">Subject</span>
                        <span className="font-bold text-slate-800 block mt-0.5">{cls.subject}</span>
                      </div>
                      <div className="bg-slate-50 p-3 rounded-xl">
                        <span className="text-xs text-slate-400 uppercase block font-bold">Grade</span>
                        <span className="font-bold text-slate-800 block mt-0.5">{cls.grade}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-3">
                    <button
                      onClick={() => showToast(`Opening student list for ${cls.name}...`)}
                      className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
                    >
                      View Students
                    </button>
                    <button
                      onClick={() => showToast(`Assignments manager for ${cls.name} opened.`)}
                      className="w-full py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 rounded-lg text-xs font-bold transition-colors cursor-pointer"
                    >
                      Manage Tasks
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================== TAB 3: AI TOOLS VIEW ==================== */}
        {activeTab === 'AI Tools' && (
          <div className="space-y-8">
            {!activeAiTool ? (
              <>
                <div>
                  <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">AI Curriculum Suite</h2>
                  <p className="text-sm text-slate-500 mt-1.5">Select an automated generator tool below to build academic materials in seconds.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[
                    { title: 'Lesson Plan', desc: 'Creates comprehensive lesson objectives, lecture plans, timelines, and study milestones compliant with standard curriculum grids.', icon: BookOpen, color: 'text-indigo-600 bg-indigo-50 border-indigo-100/50' },
                    { title: 'Question Paper', desc: 'Configures comprehensive exams based on custom subject syllabi, marks requirements, question distribution, and complexity levels.', icon: FileText, color: 'text-blue-600 bg-blue-50 border-blue-100/50' },
                    { title: 'Quiz', desc: 'Builds interactive MCQ sheets, objective questions, class polls, and game-style quiz resources.', icon: HelpCircle, color: 'text-violet-600 bg-violet-50 border-violet-100/50' },
                    { title: 'Worksheet', desc: 'Creates practice templates, math challenges, spelling worksheets, homework briefs, and topic recap guides.', icon: ClipboardList, color: 'text-sky-600 bg-sky-50 border-sky-100/50' },
                    { title: 'PPT', desc: 'Autogenerates structured slides outlines, text points, diagram descriptions, and slide presentation summaries.', icon: Presentation, color: 'text-teal-600 bg-teal-50 border-teal-100/50' },
                    { title: 'Evaluation', desc: 'Analyzes student subjective exam answers, checks grammatical details, compares with model answers, and provides scoring.', icon: CheckSquare, color: 'text-emerald-600 bg-emerald-50 border-emerald-100/50' }
                  ].map((tool, idx) => {
                    const Icon = tool.icon;
                    return (
                      <div
                        key={idx}
                        className="bg-white border border-slate-100 rounded-2xl p-6 sm:p-8 shadow-xs hover:shadow-md hover:border-blue-100 transition-all duration-200 flex flex-col justify-between items-start gap-5"
                      >
                        <div className="space-y-4">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${tool.color} border`}>
                            <Icon className="w-6 h-6" />
                          </div>
                          <div>
                            <h3 className="text-base font-bold text-slate-900">AI {tool.title} Generator</h3>
                            <p className="text-sm text-slate-500 font-semibold leading-relaxed mt-2">{tool.desc}</p>
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            setActiveAiTool(tool.title);
                            showToast(`Launched ${tool.title} generator form.`);
                          }}
                          className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <span>Open Tool</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </>
            ) : (
              /* Active Tool Creation Simulator */
              <div className="max-w-2xl mx-auto bg-white border border-slate-100 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
                <div className="flex items-center justify-between border-b border-slate-50 pb-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">⚙️</span>
                    <div>
                      <h3 className="text-base font-bold text-slate-900">AI {activeAiTool} Generator</h3>
                      <p className="text-xs text-slate-400 font-semibold">Configure parameters and hit generate</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveAiTool(null)}
                    className="text-xs text-slate-500 hover:text-slate-900 border border-slate-200 px-3 py-1.5 rounded-lg hover:bg-slate-50 transition-all cursor-pointer"
                  >
                    Back to Suite
                  </button>
                </div>

                <form onSubmit={handleToolGenerateSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700">Subject Area</label>
                      <select
                        value={toolSubject}
                        onChange={(e) => setToolSubject(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-blue-500"
                      >
                        <option>Mathematics</option>
                        <option>Physics</option>
                        <option>Chemistry</option>
                        <option>Biology</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700">Target Class</label>
                      <select
                        value={toolClass}
                        onChange={(e) => setToolClass(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-blue-500"
                      >
                        {classesList.map(c => (
                          <option key={c._id}>{c.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700">Chapter/Topic Name</label>
                    <input
                      type="text"
                      value={toolChapter}
                      onChange={(e) => setToolChapter(e.target.value)}
                      placeholder="e.g. Database Normalization Closures"
                      className="w-full bg-white border border-slate-200 rounded-xl py-3 px-4 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => setActiveAiTool(null)}
                      className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-bold rounded-xl transition-all cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isGeneratingToolAsset || !toolChapter.trim()}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-xs font-bold rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer"
                    >
                      {isGeneratingToolAsset ? (
                        <>
                          <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          <span>Generating Asset...</span>
                        </>
                      ) : (
                        <>
                          <span>Generate Asset</span>
                          <Sparkles className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}

        {/* ==================== TAB 4: MATERIALS VIEW ==================== */}
        {activeTab === 'Materials' && (
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Generated Materials</h2>
                <p className="text-sm text-slate-500 mt-1.5">Search, organize, and download generated curriculum assets.</p>
              </div>
              <button
                onClick={() => setUploadModalOpen(true)}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-2"
              >
                <Upload className="w-4.5 h-4.5" /> Upload Chapter
              </button>
            </div>

            {/* Filter Toolbar */}
            <div className="bg-white border border-slate-100 rounded-xl p-5 shadow-xs flex flex-col md:flex-row md:items-center gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by topic or subject..."
                  value={materialsSearch}
                  onChange={(e) => setMaterialsSearch(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-sm text-slate-950 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20"
                />
              </div>

              <div className="flex gap-2.5 items-center flex-wrap">
                {['All', 'Lesson Plan', 'Question Paper', 'Quiz', 'Worksheet'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setMaterialsFilter(type)}
                    className={`px-4 py-2 text-sm font-bold rounded-lg transition-all cursor-pointer ${
                      materialsFilter === type
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Materials File Manager Grid */}
            {filteredMaterials.length === 0 ? (
              <div className="bg-white border border-slate-100 p-12 rounded-2xl text-center text-slate-400 text-sm font-semibold">
                No materials found matching your filters.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredMaterials.map((m) => {
                  const Icon = getIconComponent(m.type);
                  const colorClass = getIconColor(m.type);
                  return (
                    <div key={m._id} className="bg-white border border-slate-100 rounded-2xl p-6 hover:border-blue-100 hover:shadow-xs transition-all duration-150 flex flex-col justify-between items-start gap-5">
                      <div className="w-full space-y-4">
                        <div className="flex justify-between items-start">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${colorClass}`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <span className="text-xs font-bold text-slate-400">{m.size}</span>
                        </div>

                        <div className="text-left space-y-1.5">
                          <h4 className="text-base font-bold text-slate-900 block truncate">{m.subject} – {m.chapter}</h4>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md">
                              {m.type}
                            </span>
                            <span className="text-xs text-slate-400 font-semibold">{new Date(m.createdAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>

                      <div className="w-full flex items-center gap-2.5 pt-3.5 border-t border-slate-50">
                        <button
                          onClick={() => showToast(`Opening preview for ${m.chapter}...`)}
                          className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <FileText className="w-4 h-4" /> Preview
                        </button>
                        <button
                          onClick={() => showToast(`Starting download for ${m.chapter}...`)}
                          className="p-2 bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 rounded-lg transition-colors cursor-pointer"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteMaterial(m._id, m.chapter)}
                          className="p-2 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-100 rounded-lg transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ==================== TAB 5: ANALYTICS VIEW ==================== */}
        {activeTab === 'Analytics' && analyticsData && (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Performance Analytics</h2>
              <p className="text-sm text-slate-500 mt-1.5">Cross-classroom progress reports, grading analytics, and curriculum coverage.</p>
            </div>

            {/* Top overview statistics line */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-xs text-left">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">Average Quiz Score</span>
                <span className="text-4xl font-extrabold text-slate-950 block mt-2">{analyticsData.quizPerformance}%</span>
                <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1 mt-1.5">
                  <TrendingUp className="w-4.5 h-4.5" /> +2.4% this week
                </span>
              </div>
              <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-xs text-left">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">Syllabus Completion</span>
                <span className="text-4xl font-extrabold text-slate-950 block mt-2">{analyticsData.assignmentCompletion}%</span>
                <span className="text-xs text-slate-400 font-semibold flex items-center gap-1 mt-1.5">
                  Average across all BCA sections
                </span>
              </div>
              <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-xs text-left">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">Evaluations Completed</span>
                <span className="text-4xl font-extrabold text-slate-950 block mt-2">{analyticsData.classAverage + 60}</span>
                <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1 mt-1.5">
                  <TrendingUp className="w-4.5 h-4.5" /> +14 graded today
                </span>
              </div>
            </div>

            {/* Split layout: analytics insights & needy student alerts */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Side: Topic breakdown averages (7 columns) */}
              <div className="lg:col-span-7 bg-white border border-slate-100 rounded-2xl p-6 sm:p-8 shadow-xs text-left">
                <h3 className="text-base font-bold text-slate-950 uppercase tracking-widest border-b border-slate-50 pb-4 mb-5">Topic Retention Breakdown</h3>
                
                <div className="space-y-5">
                  {analyticsData.weakTopics.map((t, idx) => (
                    <div key={idx} className="flex justify-between items-center text-sm">
                      <div className="space-y-2 flex-grow pr-6">
                        <span className="font-bold text-slate-700">{t.topic}</span>
                        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                          <div className="h-full rounded-full bg-amber-500" style={{ width: `${100 - (t.count * 10)}%` }} />
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 flex-shrink-0">
                        <span className="text-xs font-bold border px-2.5 py-0.5 rounded-full text-amber-700 bg-amber-50 border-amber-100">
                          {t.count > 3 ? 'Needs Drill' : 'Satisfactory'}
                        </span>
                        <span className="font-extrabold text-slate-900">{100 - (t.count * 10)}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Side: Needy Students List (5 columns) */}
              <div className="lg:col-span-5 bg-white border border-slate-100 rounded-2xl p-6 sm:p-8 shadow-xs text-left">
                <h3 className="text-base font-bold text-slate-950 uppercase tracking-widest border-b border-slate-50 pb-4 mb-5">Students Needing Attention</h3>
                
                <div className="space-y-4">
                  {analyticsData.studentsNeedingAttention.map((std, idx) => (
                    <div key={idx} className="flex justify-between items-center text-sm p-2.5 bg-slate-50/50 hover:bg-slate-50 rounded-xl transition-all duration-150">
                      <div>
                        <span className="font-bold text-slate-800 block">{std.name}</span>
                        <span className="text-xs text-slate-400 font-semibold block mt-0.5">{std.class} | Weak topic: {std.weakTopic}</span>
                      </div>
                      <span className="font-bold text-rose-600 text-xs bg-rose-50 border border-rose-100/50 px-2.5 py-1 rounded-lg">
                        {std.score}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* Chapter Upload Modal popup */}
      <AnimatePresence>
        {uploadModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Overlay background */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setUploadModalOpen(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs"
            />

            {/* Modal Card content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl w-full max-w-lg p-6 sm:p-8 shadow-2xl relative z-10 text-left border border-slate-100"
            >
              <button
                onClick={() => setUploadModalOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-all cursor-pointer"
              >
                <X className="w-5.5 h-5.5" />
              </button>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Upload Chapter Resource</h3>
                  <p className="text-sm text-slate-500 mt-1.5">Upload a curriculum PDF, chapter text, or lecture source code to let AI generate your entire teaching workflow.</p>
                </div>

                <form onSubmit={handleUploadSubmit} className="space-y-5">
                  {/* Subject and Target Grade inputs */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">Subject</label>
                      <select
                        value={selectedSubject}
                        onChange={(e) => setSelectedSubject(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-3 text-xs text-slate-800 focus:outline-none focus:border-blue-500"
                      >
                        <option>Mathematics</option>
                        <option>Physics</option>
                        <option>Chemistry</option>
                        <option>Biology</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">Target Cohort/Grade</label>
                      <select
                        value={selectedGrade}
                        onChange={(e) => setSelectedGrade(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-3 text-xs text-slate-800 focus:outline-none focus:border-blue-500"
                      >
                        {classesList.map(c => (
                          <option key={c._id}>{c.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Drag and Drop Zone container */}
                  <div
                    onDragEnter={handleDrag}
                    onDragOver={handleDrag}
                    onDragLeave={handleDrag}
                    onDrop={handleDrop}
                    className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-150 ${
                      dragActive ? 'border-blue-500 bg-blue-50/20' : 'border-slate-200 hover:border-slate-300 bg-slate-50/50'
                    }`}
                  >
                    <Upload className="w-11 h-11 text-slate-400 mb-3" />
                    <p className="text-sm font-bold text-slate-700">
                      Drag & Drop your chapter file here
                    </p>
                    <span className="text-xs text-slate-400 mt-1 block">PDF, DOCX, TXT or Markdown files up to 25MB</span>
                    
                    <div className="relative mt-4">
                      <input
                        type="file"
                        onChange={handleFileChange}
                        className="hidden"
                        id="modal-file-upload-input"
                      />
                      <label
                        htmlFor="modal-file-upload-input"
                        className="px-4 py-2 bg-white border border-slate-200 hover:border-slate-300 shadow-xs text-xs font-bold rounded-lg cursor-pointer text-slate-700 transition-all inline-block"
                      >
                        Browse Files
                      </label>
                    </div>

                    {uploadedFile && (
                      <div className="mt-4 p-2.5 bg-emerald-50 border border-emerald-100 rounded-lg flex items-center gap-2">
                        <File className="w-4.5 h-4.5 text-emerald-600" />
                        <span className="text-xs font-bold text-emerald-800 truncate max-w-[200px]">
                          {uploadedFile.name}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-end gap-3.5 pt-4 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => setUploadModalOpen(false)}
                      className="px-5 py-3 border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-bold rounded-xl transition-all cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isUploading || !uploadedFile}
                      className="px-5 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-xs font-bold rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer"
                    >
                      {isUploading ? (
                        <>
                          <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          <span>Analyzing Resource...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit to AI Analysis</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
