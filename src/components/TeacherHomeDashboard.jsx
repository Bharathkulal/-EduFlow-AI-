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
  CheckCircle
} from 'lucide-react';

export default function TeacherHomeDashboard({ setView }) {
  // Navigation & Dropdown State
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  
  // Interactive Modal State
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState('Mathematics');
  const [selectedGrade, setSelectedGrade] = useState('I BCA A');
  const [isUploading, setIsUploading] = useState(false);

  // Toast Notifications State
  const [toasts, setToasts] = useState([]);

  // Mock Notification Data - CLEARED
  const [notifications, setNotifications] = useState([]);

  // Mock Materials Data - CLEARED (Populated dynamically on upload)
  const [materials, setMaterials] = useState([]);

  // Upcoming Activities - CLEARED
  const [upcomingActivities, setUpcomingActivities] = useState([]);

  // Recent Sessions - CLEARED
  const [recentSessions, setRecentSessions] = useState([]);

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
        color: 'text-blue-600 bg-blue-50'
      };
      
      setMaterials((prev) => [newMaterial, ...prev]);
      
      // Update stats and recent sessions dynamically
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

  const markAllNotificationsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
    showToast("All notifications marked as read");
  };

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-800 font-sans relative pb-12">
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
                        showToast(`Switched view to ${tab}`);
                      }}
                      className={`px-3 py-2 text-xs font-semibold rounded-lg transition-all duration-200 ${
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
              { title: 'Generate Lesson Plan', desc: 'AI creates a structured lesson plan from a chapter', icon: BookOpen, color: 'text-indigo-600 bg-indigo-50 border-indigo-100/50' },
              { title: 'Generate Question Paper', desc: 'Create question papers based on subject, marks and difficulty', icon: FileText, color: 'text-blue-600 bg-blue-50 border-blue-100/50' },
              { title: 'Create Quiz', desc: 'Generate MCQs and interactive classroom quizzes', icon: HelpCircle, color: 'text-violet-600 bg-violet-50 border-violet-100/50' },
              { title: 'Create Worksheet', desc: 'Generate practice worksheets and assignments', icon: ClipboardList, color: 'text-sky-600 bg-sky-50 border-sky-100/50' },
              { title: 'Create PPT', desc: 'Generate presentation slides from chapter content', icon: Presentation, color: 'text-teal-600 bg-teal-50 border-teal-100/50' },
              { title: 'Grade Answers', desc: 'AI evaluates subjective student answer scripts', icon: CheckSquare, color: 'text-emerald-600 bg-emerald-50 border-emerald-100/50' }
            ].map((action, idx) => {
              const Icon = action.icon;
              return (
                <motion.div
                  key={idx}
                  whileHover={{ y: -3, scale: 1.01 }}
                  onClick={() => showToast(`Starting generation workflow: "${action.title}"`)}
                  className="bg-white border border-slate-100 rounded-2xl p-5 shadow-xs hover:shadow-md hover:border-blue-100 cursor-pointer text-left transition-all duration-200 flex items-start gap-4"
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${action.color} border`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600">{action.title}</h3>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed">{action.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Overview Stats Section - CLEARED MOCK DATA */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Total Classes', value: '0', trend: 'No classes active', icon: Users, color: 'text-blue-600' },
            { label: 'Total Students', value: '0', trend: 'No students enrolled', icon: Users, color: 'text-indigo-600' },
            { label: 'Lessons Created', value: '0', trend: 'No generated materials', icon: BookOpen, color: 'text-violet-600' },
            { label: 'Question Papers', value: '0', trend: 'No assessment sheets', icon: FileText, color: 'text-sky-600' }
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
                    onClick={() => {
                      setActiveTab('Materials');
                      showToast("Switched to Materials manager view");
                    }}
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
                  materials.map((m) => {
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
                            onClick={() => showToast(`Edit options opened for ${m.chapter}`)}
                            className="p-1 hover:bg-slate-100 rounded-md text-slate-400 hover:text-slate-600 cursor-pointer"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>

          {/* Right panel: Student Performance Chart (5 columns) - INITIALIZED TO 0 */}
          <div className="lg:col-span-5 bg-white border border-slate-100 rounded-2xl p-6 shadow-xs flex flex-col justify-between text-left">
            <div className="space-y-4">
              <div className="border-b border-slate-50 pb-3">
                <h3 className="text-sm font-bold text-slate-950 uppercase tracking-widest">Student Performance</h3>
              </div>

              {/* Progress bars set to 0% as initial state */}
              <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                {[
                  { className: 'I BCA A', score: 0, color: 'bg-blue-600' },
                  { className: 'I BCA B', score: 0, color: 'bg-indigo-600' },
                  { className: 'I BCA C', score: 0, color: 'bg-violet-600' },
                  { className: 'II BCA A', score: 0, color: 'bg-sky-600' },
                  { className: 'II BCA B', score: 0, color: 'bg-emerald-600' },
                  { className: 'II BCA C', score: 0, color: 'bg-teal-600' },
                  { className: 'III BCA A', score: 0, color: 'bg-cyan-600' },
                  { className: 'III BCA B', score: 0, color: 'bg-purple-600' },
                  { className: 'III BCA C', score: 0, color: 'bg-pink-600' }
                ].map((c, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold text-slate-400">
                      <span>{c.className}</span>
                      <span className="font-bold text-slate-400">{c.score}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${c.score}%` }}
                        transition={{ duration: 0.8, delay: idx * 0.05 }}
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
                  <span className="font-bold text-slate-400 text-sm">-</span>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-xl text-xs text-left">
                  <span className="text-[10px] text-slate-400 font-semibold block uppercase">Assignments</span>
                  <span className="font-bold text-slate-400 text-sm">0% Complete</span>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-xl text-xs text-left">
                  <span className="text-[10px] text-slate-400 font-semibold block uppercase">Quiz Performance</span>
                  <span className="font-bold text-slate-400 text-sm">-</span>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-xl text-xs text-left">
                  <span className="text-[10px] text-slate-400 font-semibold block uppercase">Needs Attention</span>
                  <span className="font-bold text-slate-400 text-sm">0 Students</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Secondary Grid: Upcoming activities & AI Insight Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Side: Upcoming Activities (6 columns) - CLEARED */}
          <div className="lg:col-span-6 bg-white border border-slate-100 rounded-2xl p-6 shadow-xs flex flex-col justify-between text-left">
            <div className="space-y-4">
              <div className="border-b border-slate-50 pb-3 flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-950 uppercase tracking-widest">Upcoming Activities</h3>
                <Calendar className="w-4 h-4 text-slate-400" />
              </div>

              <div className="space-y-3">
                {upcomingActivities.length === 0 ? (
                  <div className="py-12 text-center text-slate-400 text-xs font-medium">
                    No upcoming activities scheduled.
                  </div>
                ) : (
                  upcomingActivities.map((act, idx) => (
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
                  ))
                )}
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
                  No active classroom metrics found.
                </p>
                <p className="text-xs text-blue-100 font-medium leading-relaxed">
                  Upload a chapter or lesson file to evaluate student knowledge gaps and view personalized AI recommendations.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-6 relative z-10">
              <button
                onClick={() => setUploadModalOpen(true)}
                className="px-4 py-2 bg-white text-blue-600 text-xs font-bold rounded-lg hover:bg-blue-50 transition-colors shadow-sm cursor-pointer"
              >
                Upload Resource
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Productivity Section - CLEARED */}
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
