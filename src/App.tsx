import React, { useState, useEffect } from 'react';
import { GraduationCap, Briefcase, Home, Globe, ChevronRight, Menu, X, Phone, Mail, MapPin, CheckCircle, Users, Award, TrendingUp, ChevronDown, Calculator, Clock, BookOpen, Star, ArrowRight, ChevronLeft, Play, Pause } from 'lucide-react';
import emailjs from "@emailjs/browser";

export default function JapanBridgeLanding() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [activeTab, setActiveTab] = useState('bachelor');
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'team', 'why-japan', 'study', 'work', 'citizenship', 'gallery', 'video', 'requirements', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update page title based on active section
  useEffect(() => {
    const titles = {
      'home': 'Japan Bridge - Study & Work in Japan',
      'about': 'About Japan Bridge',
      'team': 'Our Team - Japan Bridge',
      'study': 'Study in Japan',
      'work': 'Work in Japan',
      'gallery': 'Gallery - Japan Bridge',
      'video': 'Videos - Japan Bridge',
      'contact': 'Contact Japan Bridge'
    };
    document.title = titles[activeSection as keyof typeof titles] || 'Japan Bridge';
  }, [activeSection]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 bg-blue-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm shadow-md z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-700 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">JB</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">JAPAN BRIDGE</h1>
                <p className="text-xs text-gray-600">Japanese Language & Consulting</p>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-6">
              {['Home', 'About', 'Team', 'Why Japan', 'Study', 'Work', 'Gallery', 'Videos', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase().replace(' ', '-').replace('videos', 'video'))}
                  className="text-gray-700 hover:text-red-600 transition-colors font-medium"
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 space-y-2">
              {['Home', 'About', 'Team', 'Why Japan', 'Study', 'Work', 'Gallery', 'Videos', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase().replace(' ', '-').replace('videos', 'video'))}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fadeIn">
              <div className="inline-block px-4 py-2 bg-red-100 text-red-700 rounded-full text-sm font-semibold">
                স্বপ্ন পূরণের সেতু
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                Study, Job & Residency in <span className="text-red-600">JAPAN</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                জাপানে উচ্চশিক্ষা, চাকরি এবং স্থায়ীভাবে বসবাস করুন। সহযোগিতা এবং আন্তরিক সেবা প্রদানে আমরা আছি আপনার পাশে।
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => scrollToSection('contact')}
                  className="px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200 flex items-center gap-2"
                >
                  Apply Now <ChevronRight size={20} />
                </button>
                <button
                  onClick={() => scrollToSection('about')}
                  className="px-8 py-4 bg-white text-gray-900 rounded-lg font-semibold border-2 border-gray-200 hover:border-red-600 hover:text-red-600 transition-all duration-200"
                >
                  Learn More
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-red-400 to-blue-600 rounded-3xl transform rotate-3 opacity-20"></div>
              <div className="relative bg-white rounded-3xl shadow-2xl p-8 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <AnimatedStatCard
                    icon={<GraduationCap className="mx-auto mb-3 text-red-600" size={40} />}
                    value={750}
                    suffix="+"
                    label="Universities"
                    bgColor="from-red-50 to-red-100"
                    delay={0}
                  />
                  <AnimatedStatCard
                    icon={<Briefcase className="mx-auto mb-3 text-blue-600" size={40} />}
                    value={120}
                    suffix="hrs"
                    label="Work/Month"
                    bgColor="from-blue-50 to-blue-100"
                    delay={200}
                  />
                  <AnimatedStatCard
                    icon={<Home className="mx-auto mb-3 text-green-600" size={40} />}
                    value={98}
                    suffix="%"
                    label="Job Oppurtunity"
                    bgColor="from-green-50 to-green-100"
                    delay={400}
                  />
                  <AnimatedStatCard
                    icon={<Globe className="mx-auto mb-3 text-purple-600" size={40} />}
                    value={140}
                    suffix="+"
                    label="Visa-Free Countries"
                    bgColor="from-purple-50 to-purple-100"
                    delay={600}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">About Japan Bridge</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We are your trusted partner for pursuing higher education, employment, and permanent residency in Japan.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mb-6">
                <Award className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Expert Guidance</h3>
              <p className="text-gray-700">
                Comprehensive Japanese language training and consultation services to prepare you for success in Japan.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-6">
                <Users className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Personalized Support</h3>
              <p className="text-gray-700">
                From application to visa processing, we provide end-to-end support tailored to your needs.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mb-6">
                <TrendingUp className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Proven Success</h3>
              <p className="text-gray-700">
                Years of experience helping Bangladeshi students achieve their dreams of studying and working in Japan.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Leadership</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our experienced team is dedicated to helping you achieve your dreams of studying and working in Japan
            </p>
          </div>

          <TeamMembersGrid />
        </div>
      </section>

      {/* Why Japan Section */}
      <section id="why-japan" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">জাপানে যাবেন কেন?</h2>
            <p className="text-xl text-gray-600">Why choose Japan for your future</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'তৃতীয় বৃহত্তম অর্থনীতি', desc: 'World\'s 3rd largest economy with excellent opportunities' },
              { title: 'নিরাপদ দেশ', desc: 'One of the safest countries in the world' },
              { title: 'কাজের সুযোগ', desc: 'High demand for workers due to declining population' },
              { title: 'পার্ট-টাইম জব', desc: 'Easy to get part-time jobs during studies' },
              { title: '১২০ ঘন্টা কাজ', desc: '120 hours/month work allowed (vs 80 hrs in Europe)' },
              { title: 'স্থায়ী বসবাস', desc: 'Opportunities for permanent residency and citizenship' }
            ].map((item, idx) => (
              <div key={idx} className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-red-600">
                <div className="flex items-start gap-4">
                  <CheckCircle className="text-green-500 flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Study in Japan Section */}
      <section id="study" className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">জাপানে পড়াশুনা করবেন কেন?</h2>
            <p className="text-xl text-gray-600">Study opportunities in Japan</p>
          </div>

          {/* Interactive Study Program Tabs */}
          <div className="mb-16">
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {['diploma', 'bachelor', 'master', 'phd'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 ${
                    activeTab === tab
                      ? 'bg-red-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  {tab === 'phd' ? ' / PhD' : '\'s'}
                </button>
              ))}
            </div>
            <StudyProgramTab activeTab={activeTab} />
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Educational Institutions</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-red-600 flex-shrink-0 mt-1" size={20} />
                    <span className="text-gray-700"><strong>750</strong> Universities</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-red-600 flex-shrink-0 mt-1" size={20} />
                    <span className="text-gray-700"><strong>450</strong> Technical Institutes</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-red-600 flex-shrink-0 mt-1" size={20} />
                    <span className="text-gray-700"><strong>1200+</strong> Subjects (Engineering, Business, Arts, Diploma)</span>
                  </li>
                </ul>
              </div>

              {/* Interactive Cost Calculator Button */}
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold text-gray-900">Cost Calculator</h3>
                  <button
                    onClick={() => setIsCalculatorOpen(!isCalculatorOpen)}
                    className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                  >
                    <Calculator size={24} />
                  </button>
                </div>
                {isCalculatorOpen && <CostCalculator />}
                {!isCalculatorOpen && (
                  <p className="text-gray-700">Calculate your study costs and potential savings in Japan</p>
                )}
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Intake Semesters</h3>
                <div className="grid grid-cols-2 gap-4">
                  {['January', 'April (Main)', 'July', 'October'].map((month, index) => (
                    <div 
                      key={month} 
                      className="bg-white rounded-lg p-4 text-center shadow-md border-2 border-green-200 hover:border-green-400 transition-all duration-300 transform hover:scale-105 cursor-pointer"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <p className="font-bold text-green-700">{month}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Financial Benefits</h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  জাপানে যাওয়ার পর টিউশন ফি এবং থাকা-খাওয়ার জন্য দেশ থেকে টাকা নিতে হবে না। Part-time work covers all expenses!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Work in Japan Section */}
      <section id="work" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">জাপানে চাকুরী করবেন কেন?</h2>
            <p className="text-xl text-gray-600">Work opportunities while studying</p>
          </div>

          <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-3xl shadow-2xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-6">Part-Time Work Benefits</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg">
                    <CheckCircle className="text-blue-600 flex-shrink-0 mt-1" size={24} />
                    <div>
                      <p className="font-semibold text-gray-900">During Study Period</p>
                      <p className="text-gray-600">120 hours/month approved by government</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-green-50 rounded-lg">
                    <CheckCircle className="text-green-600 flex-shrink-0 mt-1" size={24} />
                    <div>
                      <p className="font-semibold text-gray-900">Summer & Winter Vacation</p>
                      <p className="text-gray-600">Full-time work - 240 hours/month for 3 months</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Monthly Income & Expenses</h3>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-700 font-semibold">Hourly Rate</span>
                      <span className="text-2xl font-bold text-green-600">৳900-৳1,000</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{width: '100%'}}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-700 font-semibold">Monthly Income Approx</span>
                      <span className="text-2xl font-bold text-blue-600">৳1,50,000 </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{width: '100%'}}></div>
                    </div>
                  </div>
                   <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-700 font-semibold">Insurance</span>
                      <span className="text-2xl font-bold text-orange-600">2400-3000</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{width: '50%'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Citizenship Section */}
      <section id="citizenship" className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">জাপানে নাগরিকত্ব নিবেন কেন?</h2>
            <p className="text-xl text-gray-600">Benefits of Japanese citizenship</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-6 text-center hover:shadow-xl transition-all duration-300">
              <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="text-white" size={40} />
              </div>
              <h3 className="text-4xl font-bold text-gray-900 mb-2">140+</h3>
              <p className="text-gray-700">Countries visa-free travel</p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 text-center hover:shadow-xl transition-all duration-300">
              <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="text-white" size={40} />
              </div>
              <h3 className="text-4xl font-bold text-gray-900 mb-2">2-3%</h3>
              <p className="text-gray-700">Citizenship approval rate (2016)</p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 text-center hover:shadow-xl transition-all duration-300">
              <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Home className="text-white" size={40} />
              </div>
              <h3 className="text-4xl font-bold text-gray-900 mb-2">1%</h3>
              <p className="text-gray-700">Interest rate for housing/business loans</p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 text-center hover:shadow-xl transition-all duration-300">
              <div className="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="text-white" size={40} />
              </div>
              <h3 className="text-4xl font-bold text-gray-900 mb-2">Safe</h3>
              <p className="text-gray-700">One of world's safest countries</p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery/Carousel Section */}
      <section id="gallery" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Gallery</h2>
            <p className="text-xl text-gray-600">See our students' journey to Japan</p>
          </div>

          <PhotoCarousel currentSlide={currentSlide} setCurrentSlide={setCurrentSlide} />
        </div>
      </section>

      {/* Video Section */}
      <section id="video" className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Watch Our Videos</h2>
            <p className="text-xl text-gray-600">Learn more about studying and working in Japan</p>
          </div>

          <VideoSection />
        </div>
      </section>

      {/* Requirements Section */}
      <section id="requirements" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Application Requirements</h2>
            <p className="text-xl text-gray-600">What you need to apply</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Education Requirements */}
            <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl shadow-xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <GraduationCap className="text-red-600" size={32} />
                Educational Qualifications
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-green-500 flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-700">HSC/Diploma or equivalent</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-green-500 flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-700">Bachelor's, Master's degree holders</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-green-500 flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-700">1st, 2nd, 3rd year university students</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-green-500 flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-700">Minimum GPA: 2.5</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-green-500 flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-700">Study gap: Maximum 5 years acceptable</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-green-500 flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-700">No IELTS/TOEFL required</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-green-500 flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-700">NAT TEST/JLPT N5 & 160 hours Japanese course</span>
                </li>
              </ul>
            </div>

            {/* Documents Required */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl shadow-xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Student Documents</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <ChevronRight className="text-red-600 flex-shrink-0 mt-1" size={20} />
                    <span className="text-gray-700">Original certificates & transcripts</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <ChevronRight className="text-red-600 flex-shrink-0 mt-1" size={20} />
                    <span className="text-gray-700">10 copies of photographs</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <ChevronRight className="text-red-600 flex-shrink-0 mt-1" size={20} />
                    <span className="text-gray-700">Birth certificate</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <ChevronRight className="text-red-600 flex-shrink-0 mt-1" size={20} />
                    <span className="text-gray-700">Passport</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <ChevronRight className="text-red-600 flex-shrink-0 mt-1" size={20} />
                    <span className="text-gray-700">National ID / Passport copy</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <ChevronRight className="text-red-600 flex-shrink-0 mt-1" size={20} />
                    <span className="text-gray-700">Bank statement (last 6 months)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <ChevronRight className="text-red-600 flex-shrink-0 mt-1" size={20} />
                    <span className="text-gray-700">Medical certificate</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <ChevronRight className="text-red-600 flex-shrink-0 mt-1" size={20} />
                    <span className="text-gray-700">Signed application forms</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl shadow-xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Work Documents</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <ChevronRight className="text-red-600 flex-shrink-0 mt-1" size={20} />
                    <span className="text-gray-700">Employment contract / offer letter</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <ChevronRight className="text-red-600 flex-shrink-0 mt-1" size={20} />
                    <span className="text-gray-700">CV / resume (Japan-formatted)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <ChevronRight className="text-red-600 flex-shrink-0 mt-1" size={20} />
                    <span className="text-gray-700">Police clearance / character certificate</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">Get answers to common questions about studying in Japan</p>
          </div>
          <FAQSection expandedFAQ={expandedFAQ} setExpandedFAQ={setExpandedFAQ} />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Contact & Apply</h2>
            <p className="text-xl text-gray-600">Fill our quick form and we will contact you within 24 hours.</p>
          </div>

          <ContactForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gradient-to-r from-gray-100 to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-700 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">JB</span>
            </div>
            <div>
              <p className="text-gray-700">© {new Date().getFullYear()} Japan Bridge. All rights reserved.</p>
            </div>
          </div>
          <div className="flex items-center gap-6 text-gray-600">
            <div className="flex items-center gap-2">
              <Phone size={18} />
              <span>+880 1760-746482</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail size={18} />
              <span>japanbridge001@gmail.com</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={18} />
              <span>Tokyo, Japan</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Animated Stat Card Component
function AnimatedStatCard({ icon, value, suffix, label, bgColor, delay }: {
  icon: React.ReactNode;
  value: number;
  suffix: string;
  label: string;
  bgColor: string;
  delay: number;
}) {
  const [displayValue, setDisplayValue] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (isVisible) {
      const duration = 2000;
      const increment = value / (duration / 16);
      let current = 0;
      
      const counter = setInterval(() => {
        current += increment;
        if (current >= value) {
          setDisplayValue(value);
          clearInterval(counter);
        } else {
          setDisplayValue(Math.floor(current));
        }
      }, 16);

      return () => clearInterval(counter);
    }
  }, [isVisible, value]);

  return (
    <div className={`bg-gradient-to-br ${bgColor} rounded-xl p-6 text-center transform transition-all duration-500 hover:scale-105 hover:shadow-lg ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      {icon}
      <h3 className="text-2xl font-bold text-gray-900">
        {displayValue}{suffix}
      </h3>
      <p className="text-sm text-gray-600">{label}</p>
    </div>
  );
}

// Study Program Tab Component
function StudyProgramTab({ activeTab }: { activeTab: string }) {
  const programs = {
    diploma: {
      duration: '2 years',
      cost: '৳4-8 lakh/year',
      requirements: 'HSC/A-levels completed',
      opportunities: 'Technical skills, Quick job placement'
    },
    bachelor: {
      duration: '4 years',
      cost: '৳6-12 lakh/year',
      requirements: 'HSC/A-levels with good grades',
      opportunities: 'Broad education, Research opportunities'
    },
    master: {
      duration: '2 years',
      cost: '৳8-15 lakh/year',
      requirements: 'Bachelor degree completed',
      opportunities: 'Specialization, Higher salary'
    },
    phd: {
      duration: '3-5 years',
      cost: 'Often funded',
      requirements: 'Master degree with research',
      opportunities: 'Research career, University teaching'
    }
  };

  const program = programs[activeTab as keyof typeof programs];

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 transform transition-all duration-500">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="text-center p-4 bg-blue-50 rounded-lg">
          <Clock className="mx-auto mb-2 text-blue-600" size={32} />
          <h4 className="font-semibold text-gray-900">Duration</h4>
          <p className="text-blue-600">{program.duration}</p>
        </div>
        <div className="text-center p-4 bg-green-50 rounded-lg">
          <Calculator className="mx-auto mb-2 text-green-600" size={32} />
          <h4 className="font-semibold text-gray-900">Cost</h4>
          <p className="text-green-600">{program.cost}</p>
        </div>
        <div className="text-center p-4 bg-orange-50 rounded-lg">
          <BookOpen className="mx-auto mb-2 text-orange-600" size={32} />
          <h4 className="font-semibold text-gray-900">Requirements</h4>
          <p className="text-orange-600">{program.requirements}</p>
        </div>
        <div className="text-center p-4 bg-purple-50 rounded-lg">
          <Star className="mx-auto mb-2 text-purple-600" size={32} />
          <h4 className="font-semibold text-gray-900">Opportunities</h4>
          <p className="text-purple-600">{program.opportunities}</p>
        </div>
      </div>
    </div>
  );
}

// Cost Calculator Component
function CostCalculator() {
  const [studyLevel, setStudyLevel] = useState('bachelor');
  const [workHours, setWorkHours] = useState(80);

  const costs = {
    diploma: { tuition: 500000, living: 600000 },
    bachelor: { tuition: 800000, living: 600000 },
    master: { tuition: 1000000, living: 600000 },
    phd: { tuition: 200000, living: 600000 }
  };

  const income = workHours * 1000 * 12; // ৳1000/hour * hours * 12 months
  const totalCost = costs[studyLevel as keyof typeof costs].tuition + costs[studyLevel as keyof typeof costs].living;
  const savings = income - totalCost;

  return (
    <div className="space-y-4 mt-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Study Level</label>
          <select
            value={studyLevel}
            onChange={(e) => setStudyLevel(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          >
            <option value="diploma">Diploma</option>
            <option value="bachelor">Bachelor's</option>
            <option value="master">Master's</option>
            <option value="phd">PhD</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Work Hours/Month</label>
          <input
            type="range"
            min="40"
            max="120"
            value={workHours}
            onChange={(e) => setWorkHours(Number(e.target.value))}
            className="w-full"
          />
          <div className="text-center text-sm text-gray-600">{workHours} hours</div>
        </div>
      </div>
      
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-sm text-gray-600">Annual Income</p>
            <p className="text-lg font-bold text-green-600">৳{income.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Annual Costs</p>
            <p className="text-lg font-bold text-orange-600">৳{totalCost.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Net Savings</p>
            <p className={`text-lg font-bold ${savings >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              ৳{savings.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Photo Carousel Component
function PhotoCarousel({
  currentSlide,
  setCurrentSlide,
}: {
  currentSlide: number;
  setCurrentSlide: React.Dispatch<React.SetStateAction<number>>;
}) {
  // Sample images - Replace these URLs with your actual images
  const images = [
    {
      url: 'https://i.ibb.co.com/mCC4V3tB/jp-bridge.jpg?w=800',
      title: 'Class Room',
      description: ''
    },
    {
      url: 'https://i.ibb.co.com/gbXz96Dm/jp-bridge2.jpg?w=800',
      title: 'Office',
      description: 'Grab you oppurtunity to study in Japan'
    },
    {
      url: 'https://i.ibb.co.com/VcwL3sKG/jp-bridge3.jpg?w=800',
      title: '',
      description: ''
    },
    
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [images.length, setCurrentSlide]);

  const nextSlide = () => {
    setCurrentSlide((currentSlide + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((currentSlide - 1 + images.length) % images.length);
  };

  return (
    <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden">
      {/* Main Image */}
      <div className="relative h-96 md:h-[600px] overflow-hidden">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-700 ease-in-out ${
              index === currentSlide ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
            }`}
          >
            <img
              src={image.url}
              alt={image.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <h3 className="text-3xl font-bold mb-2">{image.title}</h3>
              <p className="text-lg">{image.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
      >
        <ChevronLeft className="text-gray-900" size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
      >
        <ChevronRight className="text-gray-900" size={24} />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-white w-8' : 'bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>

      {/* Thumbnail Strip */}
      <div className="flex gap-2 p-4 bg-gray-50 overflow-x-auto">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
              index === currentSlide ? 'border-red-600 scale-110' : 'border-transparent opacity-60 hover:opacity-100'
            }`}
          >
            <img
              src={image.url}
              alt={image.title}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

// Video Section Component
function VideoSection() {
  const [playingVideo, setPlayingVideo] = useState<number | null>(null);

  // Sample videos - Replace these with your actual video URLs
  const videos = [
    {
      id: 1,
      thumbnail: 'https://i.ibb.co.com/VcwL3sKG/jp-bridge3.jpg?w=400',
      title: 'Study in Japan: Complete Guide',
      description: 'Everything you need to know about studying in Japan',
      videoUrl: 'https://www.youtube.com/embed/RTwEr423CJ4', 
      // duration: '12:45'
    },
   
  ];

  return (
    <div className="grid md:grid-cols-1 gap-8">
      {videos.map((video) => (
        <div
          key={video.id}
          className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
        >
          {playingVideo === video.id ? (
            <div className="relative pb-[56.25%] h-0">
              <iframe
                src={video.videoUrl}
                title={video.title}
                className="absolute top-0 left-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          ) : (
            <div className="relative group cursor-pointer" onClick={() => setPlayingVideo(video.id)}>
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-all duration-300 flex items-center justify-center">
                <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Play className="text-white ml-1" size={40} fill="white" />
                </div>
              </div>
              
            </div>
          )}
          <div className="p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-2">{video.title}</h3>
            <p className="text-gray-600">{video.description}</p>
            {playingVideo === video.id && (
              <button
                onClick={() => setPlayingVideo(null)}
                className="mt-4 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg font-semibold transition-colors duration-200 flex items-center gap-2"
              >
                <Pause size={18} />
                Close Video
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

// FAQ Section Component
function FAQSection({ expandedFAQ, setExpandedFAQ }: {
  expandedFAQ: number | null;
  setExpandedFAQ: (index: number | null) => void;
}) {
  const faqs = [
    {
      question: "Do I need to know Japanese before applying?",
      answer: "Basic Japanese knowledge is required. You need either NAT TEST/JLPT N5 level or completion of 160 hours of Japanese language course. We provide comprehensive Japanese language training."
    },
    {
      question: "How much money do I need to bring to Japan?",
      answer: "Initially, you need around ৳3-5 lakh for the first few months. After that, part-time work income will cover all your expenses including tuition fees and living costs."
    },
    {
      question: "Can I work while studying in Japan?",
      answer: "Yes! Students can work up to 120 hours per month during studies and full-time (240 hours/month) during summer and winter vacations with proper work permit."
    },
    {
      question: "What is the visa success rate?",
      answer: "Our visa success rate is over 98%. We provide comprehensive support throughout the entire visa application process to ensure the highest chance of approval."
    },
    {
      question: "How long does the application process take?",
      answer: "The complete process typically takes 6-8 months from application submission to visa approval. We recommend starting the process at least 1 year before your intended departure."
    }
  ];

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <div
          key={index}
          className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg"
        >
          <button
            onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
            className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <span className="font-semibold text-gray-900">{faq.question}</span>
            <ChevronDown
              className={`text-red-600 transition-transform duration-300 ${
                expandedFAQ === index ? 'rotate-180' : ''
              }`}
              size={24}
            />
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ${
              expandedFAQ === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="px-6 pb-4">
              <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}



// Team Members Grid Component
function TeamMembersGrid() {
  // EDIT THIS ARRAY - Add your team members' information here
 const teamMembers = [
  {
    name: 'yoshida minoru(吉田実)',
    role: ' CEO & Owner',
    image: 'https://i.ibb.co.com/b5HgQdDP/youshida.png',
    description:
      'As the Founder and CEO, Youshida leads the vision and strategy of the organization, bringing over 15 years of experience in international education and student guidance for studying in Japan.',
    email: '',
    color: 'red',
    icon: Users
  },
  {
    name: 'UTTAM BHOWAL',
    role: 'Manager',
    image: 'https://i.ibb.co.com/qL5pXX3M/manager.png',
    description:
      'Jane oversees daily operations and student coordination, ensuring smooth management, effective communication, and high-quality support for students throughout their academic journey.',
    email: '',
    color: 'blue',
    icon: GraduationCap
  },
  {
    name: 'Avijit Kar',
    role: 'CO-Founder/Consultant',
    image: 'https://i.ibb.co.com/NGTk9M8/avhijit.jpg',
    description:
      'Avijit is a co-founder and consultant who works closely with students, providing academic guidance, career advice, and expert support on study plans and immigration processes for Japan.',
    email: '',
    color: 'green',
    icon: Globe
  },
  {
    name: 'Md.Jakir Hossain',
    role: 'MD/Businessman',
    image: 'https://i.ibb.co.com/601hL4dR/jakir.png',
    description:
      'Avijit works closely with students as a teacher and consultant, providing academic guidance, career advice, and expert support on study plans and immigration processes for Japan.',
    email: '',
    color: 'green',
    icon: Globe
  }
];



  return (
    <>
      {/* Main Team Members */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {teamMembers.map((member, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className={`relative h-80 overflow-hidden bg-gradient-to-br from-${member.color}-100 to-${member.color}-200`}>
              {member.image ? (
                // Show actual image if provided
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-110 object-cover"
                />
              ) : (
                // Show icon placeholder if no image
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className={`w-48 h-48 bg-gradient-to-br from-${member.color}-600 to-${member.color}-700 rounded-full flex items-center justify-center`}>
                    <member.icon className="text-white" size={80} />
                  </div>
                </div>
              )}
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{member.name}</h3>
              <p className={`text-${member.color}-600 font-semibold mb-3`}>{member.role}</p>
              <p className="text-gray-600 mb-4">{member.description}</p>
              <div className="flex items-center gap-3 text-sm text-gray-500">
                <Mail size={16} />
                <span>{member.email}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

     
    </>
  );
}

function ContactForm() {
  type FormState = {
    name: string;
    email: string;
    phone: string;
    message: string;
  };

  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [submitting, setSubmitting] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await emailjs.send(
        "service_6yz0yba",
        "template_7uqsnen",
        {
          name: form.name,
          email: form.email,
          phone: form.phone,
          message: form.message,
        },
        "7rPWtSJs207cRZiB8"
      );

      alert("✅ Message sent successfully! We'll contact you within 24 hours.");
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      console.error(error);
      alert("❌ Failed to send message. Please try again or contact us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white shadow-2xl rounded-3xl overflow-hidden">
      <div className="grid md:grid-cols-2">
        {/* Left Side - Contact Info */}
        <div className="bg-gradient-to-br from-red-600 to-red-700 p-8 md:p-12 text-white">
          <h3 className="text-3xl font-bold mb-6">Get in Touch</h3>
          <p className="text-red-100 mb-8 text-lg">
            Fill out the form and our team will get back to you within 24 hours.
          </p>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Phone className="text-white" size={24} />
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-1">Phone</h4>
                <p className="text-red-100">+880 1331-320275</p>
                <p className="text-red-100">+880 1760-746482</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Mail className="text-white" size={24} />
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-1">Email</h4>
                <p className="text-red-100">japanbridge001@gmail.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <MapPin className="text-white" size={24} />
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-1">Office Address</h4>
                <p className="text-red-100 leading-relaxed">
                  কুমিল্লা মেডিসিন টাওয়ার (৪র্থ তলা)
                </p>
                <p className="text-red-100 leading-relaxed">
                  আলেখারচর বিশ্বরোড, কুমিল্লা
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Clock className="text-white" size={24} />
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-1">Office Hours</h4>
                <p className="text-red-100">Saturday - Thursday: 9:00 AM - 7:00 PM</p>
                <p className="text-red-100">Friday: Closed</p>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="mt-10 pt-8 border-t border-white/20">
            <h4 className="font-semibold text-lg mb-4">Connect With Us</h4>
            <div className="flex gap-4">
              <a href="tel:+8801331320275" className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-all duration-300" title="Call Us">
                <Phone size={20} />
              </a>
              <a href="mailto:japanbridge001@gmail.com" className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-all duration-300" title="Email Us">
                <Mail size={20} />
              </a>
              <a href="https://www.google.com/maps/search/কুমিল্লা+মেডিসিন+টাওয়ার" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-all duration-300" title="Find Us">
                <MapPin size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="p-8 md:p-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={onChange}
                required
                placeholder="Enter your full name"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-red-600 focus:outline-none transition-colors duration-300"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address <span className="text-red-600">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={onChange}
                required
                placeholder="your@email.com"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-red-600 focus:outline-none transition-colors duration-300"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={onChange}
                placeholder="+880 1XXX-XXXXXX"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-red-600 focus:outline-none transition-colors duration-300"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Message
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={onChange}
                rows={4}
                placeholder="Tell us about your study plans, questions, or requirements..."
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-red-600 focus:outline-none transition-colors duration-300 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-4 rounded-lg font-semibold text-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
            >
              {submitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Sending...
                </>
              ) : (
                <>
                  Send Message
                  <ArrowRight size={20} />
                </>
              )}
            </button>

            <p className="text-sm text-gray-500 text-center">
              We'll respond within 24 hours during business days
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}