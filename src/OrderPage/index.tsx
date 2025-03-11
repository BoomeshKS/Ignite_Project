import React, { useState, useEffect, useRef } from 'react';
import { Upload, Brain, TrendingUp, Clock, AlertTriangle, CheckCircle2, ChevronDown, Notebook as Robot, Zap, LineChart } from 'lucide-react';
import * as XLSX from 'xlsx';
import './index.css';
import Navbar from '../Navbar/Navbar';
import { div } from 'framer-motion/client';

interface AnalysisData {
  totalOrders: number;
  categoryAnalysis: Array<{
    category: string;
    percentage: string;
  }>;
  timeAnalysis: {
    peakHours: string[];
    avgProcessingTime: string;
  };
  anomalyDetection: {
    anomalies: number;
    confidence: number;
  };
  predictiveInsights: {
    nextDayVolume: number;
    trend: 'up' | 'down' | 'stable';
    confidence: number;
  };
  processOptimization: {
    bottlenecks: string[];
    recommendations: string[];
    potentialSavings: string;
  };
}

function App() {
  const [excelData, setExcelData] = useState<any[]>([]);
  const [analysis, setAnalysis] = useState<AnalysisData | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showContent, setShowContent] = useState(false);
  const dataRef = useRef<HTMLDivElement>(null);
  const analysisRef = useRef<HTMLDivElement>(null);
  const uploadRef = useRef<HTMLDivElement>(null);

  const itemsPerPage = 6;
  const totalPages = Math.ceil((excelData?.length || 0) / itemsPerPage);
  const currentData = excelData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 100) {
        setShowContent(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (excelData.length > 0 && dataRef.current) {
      dataRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [excelData]);

  const scrollToUpload = () => {
    uploadRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = e.target?.result;
      const workbook = XLSX.read(data, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(sheet);
      setExcelData(parsedData);
      analyzeData(parsedData);
      setCurrentPage(1);
    };
    reader.readAsBinaryString(file);
  };

  const analyzeData = (data: any[]) => {
    const totalOrders = data.length;
    const categories = data.reduce((acc: any, curr: any) => {
      acc[curr.category] = (acc[curr.category] || 0) + 1;
      return acc;
    }, {});

    const categoryPercentages = Object.entries(categories).map(([category, count]) => ({
      category,
      percentage: ((Number(count) / totalOrders) * 100).toFixed(2)
    }));

    const mockAnalysis: AnalysisData = {
      totalOrders,
      categoryAnalysis: categoryPercentages,
      timeAnalysis: {
        peakHours: ['14:00', '15:00', '16:00'],
        avgProcessingTime: '1.5 hours'
      },
      anomalyDetection: {
        anomalies: 3,
        confidence: 95.5
      },
      predictiveInsights: {
        nextDayVolume: Math.floor(totalOrders * 1.1),
        trend: 'up',
        confidence: 87.3
      },
      processOptimization: {
        bottlenecks: [
          'Order Validation',
          'Payment Processing'
        ],
        recommendations: [
          'Implement automated validation checks',
          'Optimize payment gateway integration',
          'Add parallel processing for high-volume periods'
        ],
        potentialSavings: '23.5%'
      }
    };

    setAnalysis(mockAnalysis);
  };

  return (
    <div>
      <Navbar/>
    <div className="app">
      <section className="welcome-section">
        <div className="welcome-content">
          <div className="welcome-left">
            <h1>RPA Order Analysis</h1>
            <p className="welcome-description">
              Transform your order processing with intelligent automation and real-time analytics
            </p>
            <button className="start-button" onClick={scrollToUpload}>
              Get Started
              <ChevronDown size={20} />
            </button>
          </div>
          <div className="welcome-right">
            <div className="benefit-card">
              <Robot size={32} className="benefit-icon" />
              <h3>Automated Processing</h3>
              <p>Streamline order management with intelligent RPA solutions</p>
            </div>
            <div className="benefit-card">
              <Zap size={32} className="benefit-icon" />
              <h3>Real-time Analysis</h3>
              <p>Get instant insights into your order processing workflow</p>
            </div>
            <div className="benefit-card">
              <LineChart size={32} className="benefit-icon" />
              <h3>Predictive Analytics</h3>
              <p>Make data-driven decisions with AI-powered predictions</p>
            </div>
          </div>
        </div>
      </section>

      <section className={`upload-section ${showContent ? 'fade-in' : ''}`} ref={uploadRef}>
        <div className="content-container">
          <h2>Upload Your Data</h2>
          <div 
            className="upload-box"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <Upload size={64} color="#00c3ff" />
            <h2>Upload Excel File</h2>
            <p>Drag & drop your file here or</p>
            <input
              type="file"
              accept=".xlsx, .xls"
              onChange={handleFileUpload}
              id="file-upload"
            />
            <label htmlFor="file-upload" className="upload-button">
              Choose File
            </label>
          </div>
        </div>
      </section>

      {excelData.length > 0 && (
        <section className="data-section" ref={dataRef}>
          <div className="content-container slide-in-right">
            <h2>Order Data Analysis</h2>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    {Object.keys(excelData[0]).map((key) => (
                      <th key={key}>{key}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {currentData.map((row, index) => (
                    <tr key={index}>
                      {Object.values(row).map((value: any, i) => (
                        <td key={i}>{value}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {totalPages > 1 && (
              <div className="pagination">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </section>
      )}

      {analysis && (
        <section className="analysis-section" ref={analysisRef}>
          <div className="content-container slide-in-left">
            <h2><Brain size={32} className="inline-icon" /> Intelligent Analysis</h2>
            <div className="analysis-grid">
              <div className="analysis-card total-orders">
                <h3>Total Orders Processed</h3>
                <p className="analysis-number">{analysis.totalOrders}</p>
              </div>

              <div className="analysis-card time-analysis">
                <h3><Clock size={24} className="inline-icon" /> Time Analysis</h3>
                <div className="analysis-content">
                  <p><strong>Peak Hours:</strong> {analysis.timeAnalysis.peakHours.join(', ')}</p>
                  <p><strong>Avg. Processing Time:</strong> {analysis.timeAnalysis.avgProcessingTime}</p>
                </div>
              </div>

              <div className="analysis-card anomaly-detection">
                <h3><AlertTriangle size={24} className="inline-icon" /> Anomaly Detection</h3>
                <div className="analysis-content">
                  <p><strong>Anomalies Found:</strong> {analysis.anomalyDetection.anomalies}</p>
                  <p><strong>Confidence:</strong> {analysis.anomalyDetection.confidence}%</p>
                </div>
              </div>

              <div className="analysis-card predictive-insights">
                <h3><TrendingUp size={24} className="inline-icon" /> Predictive Insights</h3>
                <div className="analysis-content">
                  <p><strong>Next Day Volume:</strong> {analysis.predictiveInsights.nextDayVolume}</p>
                  <p><strong>Trend:</strong> {analysis.predictiveInsights.trend}</p>
                  <p><strong>Confidence:</strong> {analysis.predictiveInsights.confidence}%</p>
                </div>
              </div>

              <div className="analysis-card process-optimization">
                <h3><CheckCircle2 size={24} className="inline-icon" /> Process Optimization</h3>
                <div className="analysis-content">
                  <div className="optimization-section">
                    <h4>Identified Bottlenecks:</h4>
                    <ul>
                      {analysis.processOptimization.bottlenecks.map((bottleneck, index) => (
                        <li key={index}>{bottleneck}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="optimization-section">
                    <h4>Recommendations:</h4>
                    <ul>
                      {analysis.processOptimization.recommendations.map((rec, index) => (
                        <li key={index}>{rec}</li>
                      ))}
                    </ul>
                  </div>
                  <p className="savings">
                    <strong>Potential Time Savings:</strong> {analysis.processOptimization.potentialSavings}
                  </p>
                </div>
              </div>

              <div className="analysis-card category-distribution">
                <h3>Category Distribution</h3>
                <div className="category-chart">
                  {analysis.categoryAnalysis.map((item, index) => (
                    <div key={index} className="category-item">
                      <div className="category-label">
                        <span>{item.category}</span>
                        <span>{item.percentage}%</span>
                      </div>
                      <div className="progress-bar">
                        <div 
                          className="progress" 
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
    </div>
  );
}

export default App;