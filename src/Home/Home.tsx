import { useEffect, useRef, useState } from 'react';
import { 
  Activity, AlertTriangle, ArrowUpRight, Battery, Box, Cloud, Cpu, 
  Database, Gauge, LineChart, Moon, Power, Radio, Settings, 
  Sun, Terminal, Timer, Wind, Wifi, Zap
} from 'lucide-react';
import './Home.css'
import Navbar from '../Navbar/Navbar';
import { CheckCircle, ClipboardCheck, RefreshCw } from "lucide-react";
import { motion } from 'framer-motion';
import bgImage from '../assets/bg-2.jpg';




function App() {
  const [isVisible, setIsVisible] = useState({});
  const sectionRefs = useRef([]);

  const sectionReff = useRef(null);
  const marqueeRef = useRef(null);


  useEffect(() => {
    const handleScroll = () => {
      if (sectionReff.current) {
        const scrollY = window.scrollY;
        sectionReff.current.style.backgroundPositionY = `-${scrollY * 0.1}px`;
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);



  

  
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    let counter = 0;
    const interval = setInterval(() => {
      if (counter < 100) {
        counter += 1;
        setPercentage(counter);
      } else {
        clearInterval(interval);
      }
    }, 50); // Controls speed of percentage increase

    return () => clearInterval(interval);
  }, []);




  const topics = [
    {
      title: "Automation & Efficiency",
      icon: CheckCircle,
      description: "RPA streamlines operations by automating repetitive tasks like inventory management and order processing, reducing human errors and improving efficiency."
    },
    {
      title: "Technology Stack",
      icon: ClipboardCheck,
      description: "Utilizes UiPath for automation, Firebase or MySQL for data storage, and React.js with Node.js for a seamless web interface."
    },
    {
      title: "Quality Control",
      icon: Database,
      description: "Ensures high-quality manufacturing processes by automating inspections and anomaly detection through AI-powered bots."
    },
    {
      title: "Advanced Integration",
      icon: Zap,
      description: "Incorporates OCR for invoice processing and AI-driven chatbots for real-time inventory queries, paving the way for smarter automation."
    },
    {
      title: "Operational Monitoring",
      icon: RefreshCw,
      description: "Real-time data monitoring with dashboards showcasing machine status, performance analytics, and predictive maintenance insights."
    }
  ];




  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '-50px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          setIsVisible(prev => ({
            ...prev,
            [entry.target.id]: true
          }));
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('.reveal');
    elements.forEach(el => observer.observe(el));

    sectionRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white overflow-x-hidden">
      {/* Hero Section */}
      <Navbar/>
      <section 
        ref={el => sectionRefs.current[0] = el}
        id="hero"
        className="relative min-h-screen flex items-center justify-center parallax"
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=100&w=3840")',
          backgroundAttachment: 'fixed'
        }}>
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-black/40"></div>
        <div className="container mx-auto px-8 z-10">
          <div className="text-center max-w-6xl mx-auto">
            <h1 className="text-6.2xl font-bold mb-7 text-[#85d5c8] animate-type">
              Smart Automation AI
            </h1>
            <p className="text-3xl mb-16 opacity-90 animate-fade-up" style={{ animationDelay: '0.5s' }}>
              Next-Generation Industrial Automation & Analytics
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-16">
              {[
                { title: 'Active Orders', icon: Box, value: 247, suffix: '', desc: 'Real-time tracking' },
                { title: 'Daily Output', icon: Activity, value: 1893, suffix: '', desc: 'Units produced' },
                { title: 'Efficiency', icon: Zap, value: 98.7, suffix: '%', desc: 'Overall performance' }
              ].map((stat, index) => (
                <div 
                  key={index}
                  className="hover-3d shine stat-card p-10 rounded-2xl transform transition-all duration-500 reveal"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-2xl font-semibold">{stat.title}</h3>
                    <stat.icon className="text-[#85d5c8] w-12 h-12" />
                  </div>
                  <p className="text-7xl font-bold text-[#85d5c8] mb-4">
                    {stat.value}{stat.suffix}
                  </p>
                  <p className="text-xl text-gray-400">{stat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Machine Status Section */}
      <section className="relative min-h-screen py-32 bg-gray-900 text-white bg-parallax" >
      <div className="container mx-auto px-8 relative z-10">
        <h2 className="text-6xl font-bold mb-20 text-center text-[#85d5c8] reveal">
          RPA in Smart Factories
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {topics.map((topic, index) => (
            <div 
              key={index} 
              className="hover-3d shine p-10 rounded-lg bg-gray-800 shadow-xl transform transition-all duration-500 reveal"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="flex items-center space-x-4 mb-6">
                <topic.icon className="text-[#85d5c8] w-12 h-12" />
                <h3 className="text-2xl font-semibold">{topic.title}</h3>
              </div>
              <p className="text-gray-300 text-lg">{topic.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

      {/* Performance Analytics Section */}
      <section className="per-section">
      {/* Background Image */}
      <div className="per-bg"></div>

      {/* Dark Overlay */}
      <div className="per-overlay"></div>

      {/* Content Container */}
      <div className="per-container">
        {/* Left Side - Large Text Box */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="per-text-box"
        >
          <h2 className="per-heading">PERFORMANCE ANALYTICS</h2>
          <p className="per-subheading">Monitor your efficiency with real-time data insights.</p>
        </motion.div>

        {/* Right Side - Animated Percentage */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="per-percentage-box"
        >
          {percentage}%
        </motion.div>
      </div>
    </section>




      {/* Process Optimization Section */}
      <section 
      ref={sectionReff}
      id="optimization"
      className="relative min-h-[60vh] py-16 parallax overflow-hidden"
      style={{ 
        backgroundImage: `url(${bgImage})`,
        backgroundAttachment: 'fixed',
        backgroundPosition: 'top'
      }}>
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-black/50"></div>
      
      {/* Marquee Section */}
      <div className="absolute top-10 w-full overflow-hidden">
        <div className="marquee flex whitespace-nowrap" ref={marqueeRef}>
          {[...Array(2)].map((_, i) => (
            <p key={i} className="text-6xl font-bold text-[#85d5c8] px-10 uppercase">
              Intelligent Automation | RPA in Smart Factories | UiPath for Workflow Automation | AI-Driven Process Control | Enhancing Manufacturing Efficiency | Reducing Operational Costs | Seamless Integration with IoT |
            </p>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-8 relative z-10">
        <h2 className="text-7xl font-bold mb-10 text-center text-[#85d5c8] reveal">
          Process Optimization
        </h2>
        <h3 className="text-3xl font-medium text-left text-gray-300">
          Driving Efficiency with Smart Automation
        </h3>
      </div>

      <style jsx>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .marquee {
          display: flex;
          animation: marquee 10s linear infinite;
        }
      `}</style>
    </section>



      {/* Predictive Maintenance Section */}
      <section 
        ref={el => sectionRefs.current[4] = el}
        id="maintenance"
        className="relative min-h-screen py-32 parallax"
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1581092162384-8987c1d64926?auto=format&fit=crop&q=100&w=3840")',
          backgroundAttachment: 'fixed'
        }}>
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-black/50"></div>
        <div className="container mx-auto px-8 relative z-10">
          <h2 className="text-7xl font-bold mb-20 text-center text-[#85d5c8] reveal">
            Predictive Maintenance
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {[
              {
                title: 'Equipment Health Score',
                icon: Gauge,
                value: 92.3,
                status: 'Optimal',
                nextMaintenance: '15 days',
                metrics: [
                  { label: 'Vibration Levels', value: 'Normal', health: 95 },
                  { label: 'Temperature', value: '72°C', health: 88 },
                  { label: 'Oil Analysis', value: 'Good', health: 94 }
                ]
              },
              {
                title: 'Maintenance Schedule',
                icon: Timer,
                value: 87.5,
                status: 'Scheduled',
                nextMaintenance: '3 days',
                metrics: [
                  { label: 'Belt Tension', value: 'Warning', health: 82 },
                  { label: 'Bearing Health', value: 'Good', health: 90 },
                  { label: 'Alignment', value: 'Normal', health: 91 }
                ]
              },
              {
                title: 'Component Lifecycle',
                icon: Settings,
                value: 95.8,
                status: 'Monitored',
                nextMaintenance: '30 days',
                metrics: [
                  { label: 'Gear System', value: 'Optimal', health: 96 },
                  { label: 'Hydraulics', value: 'Good', health: 93 },
                  { label: 'Electronics', value: 'Normal', health: 98 }
                ]
              },
              {
                title: 'System Diagnostics',
                icon: Terminal,
                value: 89.4,
                status: 'Active',
                nextMaintenance: '7 days',
                metrics: [
                  { label: 'Control System', value: 'Normal', health: 92 },
                  { label: 'Sensors', value: 'Warning', health: 85 },
                  { label: 'Network', value: 'Good', health: 91 }
                ]
              }
            ].map((system, index) => (
              <div 
                key={index}
                className="hover-3d shine stat-card p-12 rounded-2xl transform transition-all duration-500 reveal"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-3xl font-semibold mb-3">{system.title}</h3>
                    <div className="flex items-center space-x-4">
                      <span className={`px-4 py-2 rounded-full text-lg ${
                        system.status === 'Optimal' ? 'bg-green-500/20 text-green-400' :
                        system.status === 'Warning' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-[#85d5c8]/20 text-[#85d5c8]'
                      }`}>{system.status}</span>
                      <span className="text-gray-400">Next: {system.nextMaintenance}</span>
                    </div>
                  </div>
                  <system.icon className="text-[#85d5c8] w-16 h-16" />
                </div>
                <div className="text-6xl font-bold text-[#85d5c8] mb-10">
                  {system.value}%
                </div>
                <div className="space-y-6">
                  {system.metrics.map((metric, idx) => (
                    <div key={idx} className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-xl">{metric.label}</span>
                        <div className="flex items-center space-x-4">
                          <span className={`text-lg ${
                            metric.value === 'Warning' ? 'text-yellow-400' :
                            metric.value === 'Optimal' ? 'text-green-400' :
                            'text-[#85d5c8]'
                          }`}>{metric.value}</span>
                          <span className="text-xl font-semibold text-[#85d5c8]">{metric.health}%</span>
                        </div>
                      </div>
                      <div className="w-full bg-gray-700/50 rounded-full h-3">
                        <div 
                          className="bg-[#85d5c8] h-3 rounded-full transition-all duration-1000"
                          style={{ width: `${metric.health}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;