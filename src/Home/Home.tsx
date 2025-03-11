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
import bg4 from '../assets/bg-4.jpg'
import bg11 from '../assets/bg-12.jpg'




function App() {
  const [isVisible, setIsVisible] = useState({});
  const sectionRefs = useRef([]);



  useEffect(() => {
    const revealElements = document.querySelectorAll(".reveal");
    
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(index % 2 === 0 ? "animate-slide-in-left" : "animate-slide-in-right");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );
    
    revealElements.forEach((el) => observer.observe(el));
  }, []);

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
          backgroundImage: `url(${bg11})`,
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
                className={`hover-3d shine stat-card p-10 rounded-2xl transform transition-all duration-500 reveal opacity-0 ${index % 2 === 0 ? "animate-slide-in-left" : "animate-slide-in-right"}`}
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
      <section className="relative min-h-screen py-24 bg-gray-900 text-white bg-parallax">
        <div className="container mx-auto px-6 sm:px-8 relative z-10">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-12 sm:mb-16 md:mb-20 text-center text-[#85d5c8] reveal">
            RPA in Smart Factories
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
            {topics.map((topic, index) => (
              <div 
                key={index} 
                className="hover-3d shine p-6 sm:p-8 md:p-10 rounded-lg bg-gray-800 shadow-xl transform transition-all duration-500 reveal"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="flex items-center space-x-3 sm:space-x-4 mb-4 sm:mb-6">
                  <topic.icon className="text-[#85d5c8] w-10 h-10 sm:w-12 sm:h-12" />
                  <h3 className="text-xl sm:text-2xl font-semibold">{topic.title}</h3>
                </div>
                <p className="text-gray-300 text-base sm:text-lg">{topic.description}</p>
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
          className="relative min-h-[90vh] py-24 flex flex-col justify-center items-center overflow-hidden"
          style={{
            backgroundImage: `url(${bgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
          }}
        >
          <div className="absolute inset-0 bg-black/90 backdrop-blur-sm"></div>

          {/* Marquee Section */}
          <div className="absolute top-5 sm:top-10 w-full overflow-hidden">
            <div
              className="marquee flex whitespace-nowrap text-[#85d5c8] text-3xl sm:text-4xl md:text-5xl font-extrabold"
              ref={marqueeRef}
            >
              {[...Array(2)].map((_, i) => (
                <p key={i} className="px-8 sm:px-12 md:px-16 uppercase tracking-widest">
                  AI-Powered Optimization | Hyper-Automation | Smart Analytics | IoT-Integrated Systems | Seamless Workflow Automation | Data-Driven Decision Making |
                </p>
              ))}
            </div>
          </div>

          <div className="container mx-auto px-4 sm:px-6 text-center relative z-10">
          <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#85d5c8] animate-fade-in mb-4 sm:mb-6">
            Next-Gen Process Optimization
          </h2>

            <p className="text-lg sm:text-xl md:text-2xl text-gray-300 animate-slide-up max-w-2xl sm:max-w-3xl mx-auto">
              Leverage AI and automation to drive efficiency, reduce costs, and revolutionize industrial operations.
            </p>

            {/* Small Boxes Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mt-8 sm:mt-12 opacity-0 animate-appear">
              {["Smart Automation", "Data Insights", "IoT Integration"].map((title, index) => (
                <div
                  key={index}
                  className="bg-[#222] p-4 sm:p-6 rounded-xl shadow-xl transform hover:scale-105 transition duration-300"
                >
                  <h3 className="text-xl sm:text-2xl font-semibold text-[#85d5c8]">{title}</h3>
                  <p className="text-gray-300 mt-1 sm:mt-2 text-sm sm:text-base">
                    Revolutionizing industrial operations with AI-driven solutions.
                  </p>
                </div>
              ))}
            </div>
          </div>

          <style jsx>{`
            @keyframes marquee {
              from { transform: translateX(0); }
              to { transform: translateX(-50%); }
            }
            .marquee {
              display: flex;
              animation: marquee 12s linear infinite;
            }
            @keyframes fade-in {
              from { opacity: 0; transform: scale(0.95); }
              to { opacity: 1; transform: scale(1); }
            }
            .animate-fade-in {
              animation: fade-in 1.5s ease-out;
            }
            @keyframes slide-up {
              from { opacity: 0; transform: translateY(20px); }
              to { opacity: 1; transform: translateY(0); }
            }
            .animate-slide-up {
              animation: slide-up 1.2s ease-out;
            }
            @keyframes appear {
              from { opacity: 0; transform: translateY(30px); }
              to { opacity: 1; transform: translateY(0); }
            }
            .animate-appear {
              animation: appear 1.5s ease-out 0.5s forwards;
            }
          `}</style>
        </section>




      {/* Predictive Maintenance Section */}
      <section 
  ref={el => sectionRefs.current[4] = el}
  id="maintenance"
  className="relative min-h-screen py-24 md:py-32 parallax"
  style={{ 
    backgroundImage: `url(${bg4})`,
    backgroundAttachment: 'fixed'
  }}>
  <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-black/50"></div>
  <motion.div 
    className="container mx-auto px-6 md:px-8 relative z-10 flex flex-col items-center"
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 1 }}
    viewport={{ once: true }}
  >
    <motion.h2 
      className="text-4xl md:text-6xl lg:text-8xl font-extrabold mb-12 md:mb-20 text-center text-[#85d5c8]"
      initial={{ opacity: 0, y: -50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      Intelligent RPA in Factory
    </motion.h2>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12 w-full">
      <motion.div 
        className="bg-black/80 p-6 md:p-12 rounded-2xl md:rounded-3xl text-white shadow-xl flex flex-col justify-center mr-20"
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="text-3xl md:text-5xl lg:text-6xl font-semibold text-[#85d5c8] ">
          Smart Automation<br/>
          Effortless Efficiency
        </div>
        <button className="mt-6 md:mt-8 bg-[#85d5c8] hover:bg-[#64b3a5] text-black text-lg md:text-2xl py-3 md:py-4 px-6 md:px-8 rounded-full shadow-lg transition-all duration-300">
          Learn More
        </button>
      </motion.div>
      <motion.div 
        className="text-center lg:text-right text-3xl md:text-5xl lg:text-6xl font-semibold text-white"
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <span className="typing-effect">Enhancing Automation.<br/> Maximizing Productivity.</span>
      </motion.div>
    </div>
  </motion.div>
  <style>
    {`
      @media (max-width: 468px) {
        .grid {
          grid-template-columns: 1fr;
          text-align: center;
        }
      }
      .typing-effect::after {
        content: '|';
        animation: blink 0.7s infinite;
      }
      @keyframes blink {
        50% { opacity: 0; }
      }
    `}
  </style>
</section>


    </div>
  );
}

export default App;