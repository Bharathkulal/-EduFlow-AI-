import React, { useState } from 'react';
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

  // Toast Notifications State
  const [toasts, setToasts] = useState([]);

  // Mock Notification Data
  const [notifications, setNotifications] = useState([
    { id: 1, text: "AI generated a new Worksheet for Physics", time: "5 mins ago", read: false },
    { id: 2, text: "Evaluation complete for Chemistry assignment", time: "1 hour ago", read: false }
  ]);

  // Mock Materials Data (State-managed to allow deletion and uploads)
  const [materials, setMaterials] = useState([
    { id: 1, subject: 'Mathematics', chapter: 'Trigonometry', type: 'Question Paper', date: 'Created 2 hours ago', icon: FileText, color: 'text-blue-600 bg-blue-50', size: '240 KB' },
    { id: 2, subject: 'Physics', chapter: 'Motion Mechanics', type: 'Lesson Plan', date: 'Created yesterday', icon: BookOpen, color: 'text-indigo-600 bg-indigo-50', size: '1.2 MB' },
    { id: 3, subject: 'Chemistry', chapter: 'Acids & Bases', type: 'Quiz', date: 'Created 2 days ago', icon: HelpCircle, color: 'text-violet-600 bg-violet-50', size: '110 KB' },
    { id: 4, subject: 'Biology', chapter: 'Cell Structures', type: 'Worksheet', date: 'Created 3 days ago', icon: ClipboardList, color: 'text-sky-600 bg-sky-50', size: '850 KB' }
  ]);

  // Mock Classes Details
  const bcaClasses = [
    { className: 'I BCA A', students: 32, avgPerformance: 82, activeAssignments: 2, coverage: 45 },
    { className: 'I BCA B', students: 30, avgPerformance: 76, activeAssignments: 1, coverage: 40 },
    { className: 'I BCA C', students: 31, avgPerformance: 79, activeAssignments: 2, coverage: 42 },
    { className: 'II BCA A', students: 28, avgPerformance: 84, activeAssignments: 3, coverage: 65 },
    { className: 'II BCA B', students: 29, avgPerformance: 72, activeAssignments: 1, coverage: 60 },
    { className: 'II BCA C', students: 28, avgPerformance: 75, activeAssignments: 2, coverage: 58 },
    { className: 'III BCA A', students: 33, avgPerformance: 88, activeAssignments: 4, coverage: 85 },
    { className: 'III BCA B', students: 31, avgPerformance: 81, activeAssignments: 2, coverage: 80 },
    { className: 'III BCA C', students: 32, avgPerformance: 85, activeAssignments: 3, coverage: 82 }
  ];

  // Upcoming Activities
  const upcomingActivities = [
    { title: 'Mathematics – Chapter 5 Exam', date: 'Tomorrow, 09:00 AM', status: 'Question Paper Ready', type: 'quiz' },
    { title: 'Physics – Motion Review', date: 'Thu, 11:30 AM', status: 'Lesson Plan Generated', type: 'lecture' },
    { title: 'Chemistry – Grade Acids Assignment', date: 'Fri, 04:00 PM', status: 'Evaluation Pending', type: 'evaluation' }
  ];

  // Recent Sessions
  const [recentSessions, setRecentSessions] = useState([
    { name: 'Motion Mechanics Exam', type: 'Question Paper', details: 'Created yesterday', icon: FileText },
    { name: 'Acids & Bases Worksheet', type: 'Worksheet', details: 'Edited 2 days ago', icon: ClipboardList }
  ]);

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

  const handleUploadSubmit = (e) => {
    e.preventDefault();
    if (!uploadedFile) return;

    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      setUploadModalOpen(false);
      
      const chapterName = uploadedFile.name.replace(/\.[^/.]+$/, "");
      // Add new material to list
      const newMaterial = {
        id: Date.now(),
        subject: selectedSubject,
        chapter: chapterName,
        type: 'Lesson Plan',
        date: 'Created just now',
        icon: BookOpen,
        color: 'text-blue-600 bg-blue-50',
        size: '1.4 MB'
      };
      
      setMaterials((prev) => [newMaterial, ...prev]);
      
      // Update recent sessions
      const newSession = {
        name: `${selectedSubject} – ${chapterName}`,
        type: 'Lesson Plan',
        details: 'Edited just now',
        icon: BookOpen
      };
      setRecentSessions((prev) => [newSession, ...prev]);

      // Add a notification dynamically
      const newNotification = {
        id: Date.now(),
        text: `AI successfully generated Lesson Plan for ${chapterName}`,
        time: "Just now",
        read: false
      };
      setNotifications((prev) => [newNotification, ...prev]);

      setUploadedFile(null);
      showToast(`Chapter "${chapterName}" successfully uploaded and analyzed by AI!`);
    }, 2000);
  };

  const handleToolGenerateSubmit = (e) => {
    e.preventDefault();
    if (!toolChapter.trim()) {
      showToast("Please enter a chapter topic", "error");
      return;
    }

    setIsGeneratingToolAsset(true);
    setTimeout(() => {
      setIsGeneratingToolAsset(false);
      
      // Map icons based on active AI tool
      let icon = BookOpen;
      let color = 'text-blue-600 bg-blue-50';
      if (activeAiTool === 'Question Paper') {
        icon = FileText;
        color = 'text-indigo-600 bg-indigo-50';
      } else if (activeAiTool === 'Quiz') {
        icon = HelpCircle;
        color = 'text-violet-600 bg-violet-50';
      } else if (activeAiTool === 'Worksheet') {
        icon = ClipboardList;
        color = 'text-sky-600 bg-sky-50';
      } else if (activeAiTool === 'PPT') {
        icon = Presentation;
        color = 'text-teal-600 bg-teal-50';
      } else if (activeAiTool === 'Evaluation') {
        icon = CheckSquare;
        color = 'text-emerald-600 bg-emerald-50';
      }

      const newMaterial = {
        id: Date.now(),
        subject: toolSubject,
        chapter: toolChapter,
        type: activeAiTool,
        date: 'Created just now',
        icon: icon,
        color: color,
        size: '340 KB'
      };

      setMaterials((prev) => [newMaterial, ...prev]);
      
      // Update recent sessions
      setRecentSessions((prev) => [
        { name: `${toolSubject} – ${toolChapter}`, type: activeAiTool, details: 'Created just now', icon: icon },
        ...prev
      ]);

      showToast(`AI successfully generated ${activeAiTool} for "${toolChapter}"!`);
      setActiveAiTool(null);
      setToolChapter('');
    }, 2500);
  };

  const deleteMaterial = (id, name) => {
    setMaterials(materials.filter((m) => m.id !== id));
    showToast(`Removed "${name}" from materials database.`);
  };

  const markAllNotificationsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
    showToast("All notifications marked as read");
  };

  // Filtered Materials calculations
  const filteredMaterials = materials.filter((m) => {
    const matchesSearch = m.chapter.toLowerCase().includes(materialsSearch.toLowerCase()) || 
                          m.subject.toLowerCase().includes(materialsSearch.toLowerCase());
    const matchesFilter = materialsFilter === 'All' || m.type === materialsFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-800 font-sans relative pb-12 text-left">
      {/* Toast Notification Container */}
      <div className="fixed top-6 right-6 z-50 flex flex-col gap-2 pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              className="bg-white border border-slate-100 shadow-xl shadow-slate-200/50 rounded-xl p-4 flex items-center gap-3 min-w-[300px] pointer-events-auto"
            >
              <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold text-slate-700">{toast.message}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-100 py-3 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-12">
            {/* Left side brand logo */}
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setView('landing')}>
                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-sm shadow-blue-600/10">
                  E
                </div>
                <span className="font-bold text-xl tracking-tight text-slate-900">EduFlow</span>
              </div>

              {/* Desktop Nav Items */}
              <div className="hidden lg:flex space-x-1 items-center">
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
                      className={`px-3 py-2 text-xs font-semibold rounded-lg transition-all duration-200 cursor-pointer ${
                        isActive ? 'text-blue-600 bg-blue-50/50' : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      {tab}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right items */}
            <div className="flex items-center space-x-4">
              {/* Notification icon with dropdown */}
              <div className="relative">
                <button
                  onClick={() => {
                    setNotificationsOpen(!notificationsOpen);
                    setProfileDropdownOpen(false);
                  }}
                  className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-full transition-all relative cursor-pointer"
                >
                  <Bell className="w-5 h-5" />
                  {notifications.some((n) => !n.read) && (
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white animate-pulse" />
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
                      <div className="p-3.5 border-b border-slate-100 flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-900">Notifications</span>
                        {notifications.length > 0 && (
                          <button
                            onClick={markAllNotificationsRead}
                            className="text-[10px] text-blue-600 hover:text-blue-700 hover:underline font-semibold cursor-pointer"
                          >
                            Mark all as read
                          </button>
                        )}
                      </div>
                      <div className="divide-y divide-slate-50 max-h-60 overflow-y-auto">
                        {notifications.length === 0 ? (
                          <div className="p-4 text-center text-xs text-slate-400 font-medium">
                            No notifications
                          </div>
                        ) : (
                          notifications.map((n) => (
                            <div
                              key={n.id}
                              className={`p-3 text-xs transition-colors duration-150 ${n.read ? 'bg-white' : 'bg-blue-50/20'}`}
                            >
                              <p className="text-slate-700 font-medium">{n.text}</p>
                              <span className="text-[10px] text-slate-400 block mt-1">{n.time}</span>
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
                  className="flex items-center space-x-2 p-1.5 hover:bg-slate-100 rounded-lg transition-all cursor-pointer"
                >
                  <img
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150"
                    alt="Teacher Profile"
                    className="w-7 h-7 rounded-full object-cover ring-2 ring-blue-100"
                  />
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                <AnimatePresence>
                  {profileDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-3 w-48 bg-white border border-slate-100 rounded-xl shadow-xl shadow-slate-200/50 overflow-hidden z-50 text-left"
                    >
                      <div className="p-3 border-b border-slate-100">
                        <span className="text-xs font-bold text-slate-900 block">Mrs. Sarah Jenkins</span>
                        <span className="text-[10px] text-slate-400">sarah.jenkins@eduflow.edu</span>
                      </div>
                      <div className="p-1">
                        <button
                          onClick={() => {
                            setProfileDropdownOpen(false);
                            showToast("Settings screen mockup triggered");
                          }}
                          className="w-full text-left px-3 py-2 text-xs text-slate-600 hover:bg-slate-50 rounded-lg font-medium flex items-center gap-2 cursor-pointer"
                        >
                          <Settings className="w-4 h-4 text-slate-400" /> Settings
                        </button>
                        <button
                          onClick={() => {
                            setView('landing');
                            showToast("Logged out successfully");
                          }}
                          className="w-full text-left px-3 py-2 text-xs text-rose-600 hover:bg-rose-50 rounded-lg font-medium flex items-center gap-2 cursor-pointer"
                        >
                          <LogOut className="w-4 h-4" /> Sign Out
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
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
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
                    className={`block w-full text-left px-3 py-2 text-xs font-semibold rounded-lg ${
                      activeTab === tab ? 'text-blue-600 bg-blue-50/50' : 'text-slate-500 hover:text-slate-800'
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
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-8">
        
        {/* ==================== TAB 1: DASHBOARD VIEW ==================== */}
        {activeTab === 'Dashboard' && (
          <>
            {/* Welcome Header */}
            <div className="bg-white border border-slate-100 rounded-2xl p-6 sm:p-8 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6 text-left relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[30%] h-full bg-[radial-gradient(ellipse_at_top_right,rgba(59,130,246,0.06),rgba(255,255,255,0))] -z-10" />
              
              <div className="space-y-1">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                  Good Morning, Teacher 👋
                </h1>
                <p className="text-slate-500 text-sm font-medium">
                  Create, teach, evaluate and manage everything in one place.
                </p>
              </div>

              <div className="flex flex-row items-center gap-3">
                <button
                  onClick={() => setUploadModalOpen(true)}
                  className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md hover:shadow-lg transition-all duration-150 flex items-center gap-2 cursor-pointer"
                >
                  <Upload className="w-4 h-4" />
                  <span>Upload Chapter</span>
                </button>
                <button
                  onClick={() => {
                    setActiveTab('AI Tools');
                    showToast("Navigated to AI tools gallery page");
                  }}
                  className="px-4 py-2.5 bg-white border border-slate-200 hover:border-slate-300 text-slate-700 text-xs font-bold rounded-xl shadow-xs transition-all duration-150 cursor-pointer"
                >
                  Explore AI Tools
                </button>
              </div>
            </div>

            {/* Quick AI Actions Grid */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-left">
                <Sparkles className="w-4.5 h-4.5 text-blue-600 animate-pulse" />
                <h2 className="text-sm font-bold text-slate-950 uppercase tracking-widest">Quick AI Actions</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
                      className="bg-white border border-slate-100 rounded-2xl p-5 shadow-xs hover:shadow-md hover:border-blue-100 cursor-pointer text-left transition-all duration-200 flex items-start gap-4"
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${action.color} border`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600">Generate {action.title}</h3>
                        <p className="text-xs text-slate-500 font-medium leading-relaxed">{action.desc}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Overview Stats Section */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'Total Classes', value: '09', trend: 'Active BCA courses', icon: Users, color: 'text-blue-600' },
                { label: 'Total Students', value: '274', trend: 'Registered students', icon: Users, color: 'text-indigo-600' },
                { label: 'Lessons Created', value: materials.filter(m => m.type === 'Lesson Plan').length, trend: 'Generated syllabus', icon: BookOpen, color: 'text-violet-600' },
                { label: 'Question Papers', value: materials.filter(m => m.type === 'Question Paper').length, trend: 'Assessment sheets', icon: FileText, color: 'text-sky-600' }
              ].map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <div key={idx} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-xs text-left relative overflow-hidden flex flex-col justify-between h-28">
                    <div className="flex justify-between items-start">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</span>
                      <Icon className={`w-4 h-4 ${stat.color}`} />
                    </div>
                    <div>
                      <span className="text-2xl font-extrabold text-slate-900 block leading-none mb-1">{stat.value}</span>
                      <span className="text-[10px] text-slate-400 font-semibold flex items-center gap-1">
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
              <div className="lg:col-span-7 bg-white border border-slate-100 rounded-2xl p-6 shadow-xs flex flex-col justify-between text-left">
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-50 pb-3">
                    <h3 className="text-sm font-bold text-slate-950 uppercase tracking-widest">Recent Materials</h3>
                    {materials.length > 0 && (
                      <button
                        onClick={() => setActiveTab('Materials')}
                        className="text-xs text-blue-600 hover:text-blue-700 hover:underline font-bold cursor-pointer"
                      >
                        View All
                      </button>
                    )}
                  </div>

                  <div className="divide-y divide-slate-50">
                    {materials.length === 0 ? (
                      <div className="py-12 text-center text-slate-400 text-xs font-medium space-y-1">
                        <p>No materials generated yet.</p>
                        <p className="text-[10px] text-slate-400 font-normal">Upload a chapter resource to let AI generate study plans.</p>
                      </div>
                    ) : (
                      materials.slice(0, 4).map((m) => {
                        const Icon = m.icon;
                        return (
                          <div key={m.id} className="py-3 flex items-center justify-between group hover:bg-slate-50/50 rounded-xl px-2 transition-colors duration-150">
                            <div className="flex items-center space-x-3.5">
                              <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${m.color}`}>
                                <Icon className="w-4.5 h-4.5" />
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="text-xs font-bold text-slate-900">{m.subject} – {m.chapter}</span>
                                  <span className="text-[9px] font-bold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded-md">
                                    {m.type}
                                  </span>
                                </div>
                                <span className="text-[10px] text-slate-400 block mt-0.5">{m.date}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <button
                                onClick={() => showToast(`Opening preview for ${m.chapter} (${m.type})`)}
                                className="px-2.5 py-1 text-[10px] font-bold text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors cursor-pointer"
                              >
                                Open
                              </button>
                              <button
                                onClick={() => deleteMaterial(m.id, m.chapter)}
                                className="p-1 hover:bg-rose-50 rounded-md text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                              >
                                <Trash2 className="w-4 h-4" />
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
              <div className="lg:col-span-5 bg-white border border-slate-100 rounded-2xl p-6 shadow-xs flex flex-col justify-between text-left">
                <div className="space-y-4">
                  <div className="border-b border-slate-50 pb-3">
                    <h3 className="text-sm font-bold text-slate-950 uppercase tracking-widest">Student Performance</h3>
                  </div>

                  {/* Progress bars showing real data */}
                  <div className="space-y-3.5">
                    {[
                      { className: 'I BCA A', score: 82, color: 'bg-blue-600' },
                      { className: 'I BCA B', score: 76, color: 'bg-indigo-600' },
                      { className: 'I BCA C', score: 79, color: 'bg-violet-600' },
                      { className: 'II BCA A', score: 84, color: 'bg-sky-600' }
                    ].map((c, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="flex justify-between text-xs font-semibold text-slate-700">
                          <span>{c.className}</span>
                          <span className="font-bold text-slate-900">{c.score}%</span>
                        </div>
                        <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${c.score}%` }}
                            transition={{ duration: 0.8, delay: idx * 0.1 }}
                            className={`h-full rounded-full ${c.color}`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Performance Statistics footer grid */}
                  <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-100">
                    <div className="bg-slate-50 p-2.5 rounded-xl text-xs text-left">
                      <span className="text-[10px] text-slate-400 font-semibold block uppercase">Avg Score</span>
                      <span className="font-bold text-slate-900 text-sm">80.2%</span>
                    </div>
                    <div className="bg-slate-50 p-2.5 rounded-xl text-xs text-left">
                      <span className="text-[10px] text-slate-400 font-semibold block uppercase">Assignments</span>
                      <span className="font-bold text-slate-900 text-sm">94.8% Complete</span>
                    </div>
                    <div className="bg-slate-50 p-2.5 rounded-xl text-xs text-left">
                      <span className="text-[10px] text-slate-400 font-semibold block uppercase">Quiz Performance</span>
                      <span className="font-bold text-slate-900 text-sm">78.5% Avg</span>
                    </div>
                    <div className="bg-slate-50 p-2.5 rounded-xl text-xs text-left">
                      <span className="text-[10px] text-slate-400 font-semibold block uppercase">Needs Attention</span>
                      <span className="font-bold text-slate-900 text-sm">4 Students</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Secondary Grid: Upcoming activities & AI Insight Card */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Side: Upcoming Activities (6 columns) */}
              <div className="lg:col-span-6 bg-white border border-slate-100 rounded-2xl p-6 shadow-xs flex flex-col justify-between text-left">
                <div className="space-y-4">
                  <div className="border-b border-slate-50 pb-3 flex items-center justify-between">
                    <h3 className="text-sm font-bold text-slate-950 uppercase tracking-widest">Upcoming Activities</h3>
                    <Calendar className="w-4 h-4 text-slate-400" />
                  </div>

                  <div className="space-y-3">
                    {upcomingActivities.map((act, idx) => (
                      <div key={idx} className="flex justify-between items-center p-3 hover:bg-slate-50 rounded-xl transition-colors border border-transparent hover:border-slate-100">
                        <div className="space-y-1">
                          <h4 className="text-xs font-bold text-slate-900">{act.title}</h4>
                          <div className="flex items-center space-x-2 text-[10px] text-slate-400 font-medium">
                            <Clock className="w-3.5 h-3.5" />
                            <span>{act.date}</span>
                          </div>
                        </div>
                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                          act.status.includes('Pending') ? 'text-amber-700 bg-amber-50' : 'text-emerald-700 bg-emerald-50'
                        }`}>
                          {act.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Side: AI Insight Card (6 columns) */}
              <div className="lg:col-span-6 bg-blue-600 text-white rounded-2xl p-6 shadow-md flex flex-col justify-between text-left relative overflow-hidden">
                {/* Background design elements */}
                <div className="absolute top-[-10%] right-[-10%] w-[120px] h-[120px] rounded-full bg-white/10 blur-xl" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[120px] h-[120px] rounded-full bg-indigo-500/30 blur-2xl" />

                <div className="space-y-4 relative z-10">
                  <div className="flex items-center space-x-2 border-b border-white/10 pb-3">
                    <span className="text-lg">💡</span>
                    <h3 className="text-sm font-bold uppercase tracking-widest text-white/90">AI Teaching Insight</h3>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-bold text-white leading-relaxed">
                      Students in Class I BCA B are struggling with Trigonometry.
                    </p>
                    <p className="text-xs text-blue-100 font-medium leading-relaxed">
                      Analyzing past quiz submissions showed that 64% of cohort errors occurred on trigonometry identities. Consider creating an additional practice worksheet or lesson review.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-6 relative z-10">
                  <button
                    onClick={() => {
                      setActiveTab('AI Tools');
                      setActiveAiTool('Worksheet');
                      setToolChapter('Trigonometric Identities Practice');
                      showToast("Generating worksheet parameters...");
                    }}
                    className="px-4 py-2 bg-white text-blue-600 text-xs font-bold rounded-lg hover:bg-blue-50 transition-colors shadow-sm cursor-pointer"
                  >
                    Generate Worksheet
                  </button>
                  <button
                    onClick={() => setActiveTab('Analytics')}
                    className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold rounded-lg transition-colors border border-blue-500/50 cursor-pointer"
                  >
                    View Analytics
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Productivity Section */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-left">
                <h2 className="text-sm font-bold text-slate-950 uppercase tracking-widest">Continue where you left off</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {recentSessions.length === 0 ? (
                  <div className="col-span-full bg-white border border-slate-100 p-8 rounded-xl text-center text-slate-400 text-xs font-medium">
                    No recent sessions found. Upload a chapter to get started!
                  </div>
                ) : (
                  recentSessions.map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={idx}
                        onClick={() => showToast(`Resuming session: "${item.name}"`)}
                        className="bg-white border border-slate-100 hover:border-blue-100 hover:shadow-xs p-4 rounded-xl cursor-pointer text-left transition-all duration-150"
                      >
                        <div className="flex items-center space-x-2 mb-2">
                          <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                            <Icon className="w-4 h-4" />
                          </div>
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.type}</span>
                        </div>
                        <h4 className="text-xs font-bold text-slate-800 block truncate">{item.name}</h4>
                        <span className="text-[9px] text-slate-400 block mt-1 font-semibold">{item.details}</span>
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
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Active Classrooms</h2>
              <p className="text-xs text-slate-500 mt-1">Manage student metrics, active curriculum assignments, and syllabus coverages.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bcaClasses.map((cls, idx) => (
                <div key={idx} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-xs space-y-4 hover:shadow-md hover:border-blue-100 transition-all duration-200">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-bold text-slate-900">{cls.className}</h3>
                    <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                      {cls.students} Students
                    </span>
                  </div>

                  <div className="space-y-3">
                    {/* Coverage slider */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px] font-semibold text-slate-500">
                        <span>Syllabus Coverage</span>
                        <span className="text-slate-800 font-bold">{cls.coverage}%</span>
                      </div>
                      <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-blue-600 h-full rounded-full" style={{ width: `${cls.coverage}%` }} />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-2 text-xs">
                      <div className="bg-slate-50 p-2 rounded-xl">
                        <span className="text-[9px] text-slate-400 uppercase block font-semibold">Average Grade</span>
                        <span className="font-bold text-slate-800">{cls.avgPerformance}%</span>
                      </div>
                      <div className="bg-slate-50 p-2 rounded-xl">
                        <span className="text-[9px] text-slate-400 uppercase block font-semibold">Active Tasks</span>
                        <span className="font-bold text-slate-800">{cls.activeAssignments} Deployment</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={() => showToast(`Opening class list for ${cls.className}...`)}
                      className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-[10px] font-bold transition-colors cursor-pointer"
                    >
                      View Students
                    </button>
                    <button
                      onClick={() => showToast(`Assignments manager for ${cls.className} opened.`)}
                      className="w-full py-2 bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 rounded-lg text-[10px] font-bold transition-colors cursor-pointer"
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
          <div className="space-y-6">
            {!activeAiTool ? (
              <>
                <div>
                  <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">AI Curriculum Suite</h2>
                  <p className="text-xs text-slate-500 mt-1">Select an automated generator tool below to build academic materials in seconds.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                        className="bg-white border border-slate-100 rounded-2xl p-6 shadow-xs hover:shadow-md hover:border-blue-100 transition-all duration-200 flex flex-col justify-between items-start gap-4"
                      >
                        <div className="space-y-3">
                          <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${tool.color} border`}>
                            <Icon className="w-5.5 h-5.5" />
                          </div>
                          <div>
                            <h3 className="text-sm font-bold text-slate-900">AI {tool.title} Generator</h3>
                            <p className="text-xs text-slate-500 font-medium leading-relaxed mt-1.5">{tool.desc}</p>
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            setActiveAiTool(tool.title);
                            showToast(`Launched ${tool.title} generator form.`);
                          }}
                          className="w-full mt-2 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <span>Open Tool</span>
                          <ArrowRight className="w-3.5 h-3.5" />
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
                    <span className="text-lg">⚙️</span>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">AI {activeAiTool} Generator</h3>
                      <p className="text-[10px] text-slate-400 font-medium">Configure parameters and hit generate</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveAiTool(null)}
                    className="text-xs text-slate-500 hover:text-slate-900 border border-slate-200 px-2.5 py-1 rounded-lg hover:bg-slate-50 transition-all cursor-pointer"
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
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-blue-500"
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
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-blue-500"
                      >
                        <option>I BCA A</option>
                        <option>I BCA B</option>
                        <option>I BCA C</option>
                        <option>II BCA A</option>
                        <option>II BCA B</option>
                        <option>II BCA C</option>
                        <option>III BCA A</option>
                        <option>III BCA B</option>
                        <option>III BCA C</option>
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
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Generated Materials</h2>
                <p className="text-xs text-slate-500 mt-1">Search, organize, and download generated curriculum assets.</p>
              </div>
              <button
                onClick={() => setUploadModalOpen(true)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-2"
              >
                <Upload className="w-4 h-4" /> Upload Chapter
              </button>
            </div>

            {/* Filter Toolbar */}
            <div className="bg-white border border-slate-100 rounded-xl p-4 shadow-xs flex flex-col md:flex-row md:items-center gap-3">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by topic or subject..."
                  value={materialsSearch}
                  onChange={(e) => setMaterialsSearch(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 pl-9 pr-4 text-xs text-slate-950 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20"
                />
              </div>

              <div className="flex gap-2 items-center flex-wrap">
                {['All', 'Lesson Plan', 'Question Paper', 'Quiz', 'Worksheet'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setMaterialsFilter(type)}
                    className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
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
              <div className="bg-white border border-slate-100 p-12 rounded-2xl text-center text-slate-400 text-xs font-medium">
                No materials found matching your filters.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredMaterials.map((m) => {
                  const Icon = m.icon;
                  return (
                    <div key={m.id} className="bg-white border border-slate-100 rounded-2xl p-5 hover:border-blue-100 hover:shadow-xs transition-all duration-150 flex flex-col justify-between items-start gap-4">
                      <div className="w-full space-y-3">
                        <div className="flex justify-between items-start">
                          <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${m.color}`}>
                            <Icon className="w-4.5 h-4.5" />
                          </div>
                          <span className="text-[10px] font-bold text-slate-400">{m.size}</span>
                        </div>

                        <div className="text-left space-y-1">
                          <h4 className="text-sm font-bold text-slate-900 block truncate">{m.subject} – {m.chapter}</h4>
                          <div className="flex items-center gap-1.5">
                            <span className="text-[9px] font-bold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded-md">
                              {m.type}
                            </span>
                            <span className="text-[10px] text-slate-400 font-semibold">{m.date}</span>
                          </div>
                        </div>
                      </div>

                      <div className="w-full flex items-center gap-2 pt-2 border-t border-slate-50">
                        <button
                          onClick={() => showToast(`Opening preview for ${m.chapter}...`)}
                          className="w-full py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-[10px] font-bold transition-all flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <FileText className="w-3.5 h-3.5" /> Preview
                        </button>
                        <button
                          onClick={() => showToast(`Starting download for ${m.chapter}...`)}
                          className="p-1.5 bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 rounded-lg transition-colors cursor-pointer"
                        >
                          <Download className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => deleteMaterial(m.id, m.chapter)}
                          className="p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-100 rounded-lg transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
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
        {activeTab === 'Analytics' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Performance Analytics</h2>
              <p className="text-xs text-slate-500 mt-1">Cross-classroom progress reports, grading analytics, and curriculum coverage.</p>
            </div>

            {/* Top overview statistics line */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-xs text-left">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Average Quiz Score</span>
                <span className="text-3xl font-extrabold text-slate-950 block mt-1.5">78.5%</span>
                <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3.5 h-3.5" /> +2.4% this week
                </span>
              </div>
              <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-xs text-left">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Syllabus Completion</span>
                <span className="text-3xl font-extrabold text-slate-950 block mt-1.5">58.5%</span>
                <span className="text-[10px] text-slate-400 font-semibold flex items-center gap-1 mt-1">
                  Average across all BCA sections
                </span>
              </div>
              <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-xs text-left">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Evaluations Completed</span>
                <span className="text-3xl font-extrabold text-slate-950 block mt-1.5">142</span>
                <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3.5 h-3.5" /> +14 graded today
                </span>
              </div>
            </div>

            {/* Split layout: analytics insights & needy student alerts */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Side: Topic breakdown averages (7 columns) */}
              <div className="lg:col-span-7 bg-white border border-slate-100 rounded-2xl p-6 shadow-xs text-left">
                <h3 className="text-sm font-bold text-slate-950 uppercase tracking-widest border-b border-slate-50 pb-3 mb-4">Topic Retention Breakdown</h3>
                
                <div className="space-y-4">
                  {[
                    { topic: 'Trigonometric Identities', average: 54, status: 'Critically Low', color: 'bg-rose-500 text-rose-700 bg-rose-50 border-rose-100' },
                    { topic: 'Database Schema Normalization', average: 74, status: 'Satisfactory', color: 'bg-amber-500 text-amber-700 bg-amber-50 border-amber-100' },
                    { topic: 'Atomic Structure Basics', average: 88, status: 'High Retention', color: 'bg-emerald-500 text-emerald-700 bg-emerald-50 border-emerald-100' },
                    { topic: 'Newtonian Motion Formulas', average: 82, status: 'Stable', color: 'bg-blue-600 text-blue-700 bg-blue-50 border-blue-100' }
                  ].map((t, idx) => (
                    <div key={idx} className="flex justify-between items-center text-xs">
                      <div className="space-y-1 flex-grow pr-4">
                        <span className="font-semibold text-slate-700">{t.topic}</span>
                        <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${t.color.split(' ')[0]}`} style={{ width: `${t.average}%` }} />
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 flex-shrink-0">
                        <span className={`text-[9px] font-bold border px-1.5 py-0.5 rounded-full ${t.color.split(' ').slice(1).join(' ')}`}>
                          {t.status}
                        </span>
                        <span className="font-bold text-slate-900">{t.average}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Side: Needy Students List (5 columns) */}
              <div className="lg:col-span-5 bg-white border border-slate-100 rounded-2xl p-6 shadow-xs text-left">
                <h3 className="text-sm font-bold text-slate-950 uppercase tracking-widest border-b border-slate-50 pb-3 mb-4">Students Needing Attention</h3>
                
                <div className="space-y-3.5">
                  {[
                    { name: 'Aditya Sharma', class: 'I BCA B', score: '48% Avg', weakTopic: 'Trig Identities' },
                    { name: 'Deepika Sen', class: 'II BCA B', score: '52% Avg', weakTopic: '3NF Normalization' },
                    { name: 'Kunal Verma', class: 'I BCA B', score: '55% Avg', weakTopic: 'Trig Identities' },
                    { name: 'Sneha Roy', class: 'I BCA C', score: '58% Avg', weakTopic: 'Schema Closures' }
                  ].map((std, idx) => (
                    <div key={idx} className="flex justify-between items-center text-xs p-2 bg-slate-50/50 hover:bg-slate-50 rounded-xl transition-all duration-150">
                      <div>
                        <span className="font-bold text-slate-800 block">{std.name}</span>
                        <span className="text-[10px] text-slate-400 font-semibold">{std.class} | Weak topic: {std.weakTopic}</span>
                      </div>
                      <span className="font-bold text-rose-600 text-xs bg-rose-50 border border-rose-100/50 px-2 py-0.5 rounded-lg">
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
                className="absolute top-4 right-4 p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Upload Chapter Resource</h3>
                  <p className="text-xs text-slate-500 mt-1">Upload a curriculum PDF, chapter text, or lecture source code to let AI generate your entire teaching workflow.</p>
                </div>

                <form onSubmit={handleUploadSubmit} className="space-y-4">
                  {/* Subject and Target Grade inputs */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700">Subject</label>
                      <select
                        value={selectedSubject}
                        onChange={(e) => setSelectedSubject(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-blue-500"
                      >
                        <option>Mathematics</option>
                        <option>Physics</option>
                        <option>Chemistry</option>
                        <option>Biology</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700">Target Cohort/Grade</label>
                      <select
                        value={selectedGrade}
                        onChange={(e) => setSelectedGrade(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-blue-500"
                      >
                        <option>I BCA A</option>
                        <option>I BCA B</option>
                        <option>I BCA C</option>
                        <option>II BCA A</option>
                        <option>II BCA B</option>
                        <option>II BCA C</option>
                        <option>III BCA A</option>
                        <option>III BCA B</option>
                        <option>III BCA C</option>
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
                    <Upload className="w-10 h-10 text-slate-400 mb-3" />
                    <p className="text-xs font-semibold text-slate-700">
                      Drag & Drop your chapter file here
                    </p>
                    <span className="text-[10px] text-slate-400 mt-1 block">PDF, DOCX, TXT or Markdown files up to 25MB</span>
                    
                    <div className="relative mt-4">
                      <input
                        type="file"
                        onChange={handleFileChange}
                        className="hidden"
                        id="modal-file-upload-input"
                      />
                      <label
                        htmlFor="modal-file-upload-input"
                        className="px-4 py-1.5 bg-white border border-slate-200 hover:border-slate-300 shadow-xs text-[11px] font-bold rounded-lg cursor-pointer text-slate-700 transition-all inline-block"
                      >
                        Browse Files
                      </label>
                    </div>

                    {uploadedFile && (
                      <div className="mt-4 p-2 bg-emerald-50 border border-emerald-100 rounded-lg flex items-center gap-2">
                        <File className="w-4 h-4 text-emerald-600" />
                        <span className="text-[11px] font-bold text-emerald-800 truncate max-w-[200px]">
                          {uploadedFile.name}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => setUploadModalOpen(false)}
                      className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-bold rounded-xl transition-all cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isUploading || !uploadedFile}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-xs font-bold rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer"
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
