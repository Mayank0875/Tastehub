// pages/ProblemPage.jsx
import React, { useState, useEffect } from 'react';
import { useRouter } from '../components/Router';
import { Link } from '../components/Router';
import { useApp } from '../contexts/AppContext';
import { useAuth } from '../contexts/AuthContext';
import CodeEditor from '../components/CodeEditor';
import axios from 'axios';

const ProblemPage = () => {
  const { navigate, currentPath } = useRouter();
  const { addSubmission } = useApp();
  const { isAuthenticated } = useAuth();
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('cpp');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const problemId = currentPath.split('/')[2];

  useEffect(() => {
    if (problemId) {
      fetchProblem();
    }
  }, [problemId]);

  const fetchProblem = async () => {
    console.log(`Fetching problem details for ID: ${problemId}`);
    try {
      const response = await fetch(`http://localhost:3030/problem/${problemId}`);
      const result = await response.json();
      if (result.success && result.data) {
        setProblem(result.data);
      } else {
        console.error("API response was not successful:", result);
        setProblem(null);
      }
    } catch (error) {
      console.error("Failed to fetch problem details:", error);
      setProblem(null);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  /**
   * Handle code editor changes
   * @param {string} newCode - New code content
   * @param {string} newLanguage - Programming language
   */
  const handleCodeChange = (newCode, newLanguage) => {
    setCode(newCode);
    if (newLanguage) {
      setLanguage(newLanguage);
    }
  };

  /**
   * Handle code submission via editor
   */
  const handleSubmitCode = async () => {
    if (!isAuthenticated) {
      alert('Please login to submit code');
      return;
    }

    if (!code.trim()) {
      alert('Please enter some code');
      return;
    }

    setIsSubmitting(true);

    try {
      // Create a blob from the code
      const blob = new Blob([code], { type: 'text/plain' });
      const file = new File([blob], `solution.${language === 'cpp' ? 'cpp' : language === 'python' ? 'py' : 'js'}`, {
        type: 'text/plain'
      });

      const formData = new FormData();
      formData.append("codeFile", file);

      const submissionId = Math.random().toString(36).substr(2, 9);
      const initialSubmission = {
        id: submissionId,
        when: new Date().toISOString(),
        who: "current_user",
        problem: problem.title,
        problemId: problem.id,
        lang: language.toUpperCase(),
        verdict: "Waiting",
        time: "...",
        memory: "...",
      };
      addSubmission(initialSubmission);

      const ext = language === 'cpp' ? 'cpp' : language === 'python' ? 'py' : 'js';
      const response = await axios.post(
        `http://localhost:3030/submit/${problemId}/${ext}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.data.success) {
        const updatedSubmission = {
          ...initialSubmission,
          verdict: response.data.data.verdict || "N/A",
          time: response.data.data.time || 100,
          memory: response.data.data.memory || 100,
        };
        addSubmission(updatedSubmission);
      } else {
        console.error("Submission failed:", response.data.error);
        const failedSubmission = {
          ...initialSubmission,
          verdict: response.data.data?.verdict || "Failed",
          time: response.data.data?.time || "N/A",
          memory: response.data.data?.memory || "N/A",
        };
        addSubmission(failedSubmission);
      }

      navigate(`/submissions`);
    } catch (error) {
      console.error("Failed to submit code:", error);
      const failedSubmission = {
        id: Math.random().toString(36).substr(2, 9),
        when: new Date().toISOString(),
        who: "current_user",
        problem: problem.title,
        problemId: problem.id,
        lang: language.toUpperCase(),
        verdict: "Failed",
        time: "N/A",
        memory: "N/A",
      };
      addSubmission(failedSubmission);
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Handle file upload (legacy method)
   */
  const handleFileSubmit = async () => {
    if (!isAuthenticated) {
      alert('Please login to submit code');
      return;
    }

    if (selectedFile) {
      console.log("Submitting file:", selectedFile.name);

      const ext = selectedFile.name.split(".").pop() || "txt";
      const formData = new FormData();
      formData.append("codeFile", selectedFile);
      formData.append("problemId", problemId);

      const submissionId = Math.random().toString(36).substr(2, 9);
      const initialSubmission = {
        id: submissionId,
        when: new Date().toISOString(),
        who: "current_user",
        problem: problem.title,
        problemId: problem.id,
        lang: ext.toUpperCase(),
        verdict: "Waiting",
        time: "...",
        memory: "...",
      };
      addSubmission(initialSubmission);

      try {
        const response = await axios.post(
          `http://localhost:3030/submit/${problemId}/${ext}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        const result = response.data;
        if (result.success) {
          const updatedSubmission = {
            ...initialSubmission,
            verdict: result.data.verdict || "N/A",
            time: result.data.time || 100,
            memory: result.data.memory || 100,
          };
          addSubmission(updatedSubmission);
        } else {
          console.error("Submission failed:", result.error);
          const failedSubmission = {
            ...initialSubmission,
            verdict: result.data?.verdict || "Failed",
            time: result.data?.time || "N/A",
            memory: result.data?.memory || "N/A",
          };
          addSubmission(failedSubmission);
        }
      } catch (error) {
        console.error("Failed to submit code:", error);
        const failedSubmission = {
          ...initialSubmission,
          verdict: "Failed",
          time: "N/A",
          memory: "N/A",
        };
        addSubmission(failedSubmission);
      }

      navigate(`/submissions`);
    } else {
      console.log("No file selected.");
    }
  };

  if (loading) {
    return (
      <div className="text-center py-6 text-gray-600">
        Loading problem details...
      </div>
    );
  }

  if (!problem) {
    return (
      <div className="text-center py-6 text-red-500">
        Failed to load problem details.
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="flex-grow flex flex-col gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <Link to="/problemset" className="flex items-center gap-2 text-[#1ba3ff] hover:underline mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 11H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Problemset
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{problem.title}</h1>
          <div className="flex items-center gap-2 text-gray-600 mb-4">
            <span className="font-semibold">Rating:</span>
            <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-200 text-gray-800">
              {problem.rating}
            </span>
            <span className="font-semibold ml-4">Tags:</span>
            <div className="flex flex-wrap gap-1">
              {problem.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-300 text-gray-800"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <p className="text-gray-700 whitespace-pre-wrap">{problem.description}</p>

          <h2 className="text-xl font-bold text-gray-900 mt-6 mb-2">Constraints</h2>
          <p className="text-gray-700 whitespace-pre-wrap">{problem.constraints}</p>

          <h2 className="text-xl font-bold text-gray-900 mt-6 mb-2">Sample Input</h2>
          <div className="bg-gray-100 p-4 rounded-lg">
            <pre className="text-gray-800">{problem.sampleInput}</pre>
          </div>
          
          <h2 className="text-xl font-bold text-gray-900 mt-6 mb-2">Sample Output</h2>
          <div className="bg-gray-100 p-4 rounded-lg">
            <pre className="text-gray-800">{problem.sampleOutput}</pre>
          </div>

          {problem.notes && (
            <>
              <h2 className="text-xl font-bold text-gray-900 mt-6 mb-2">Notes</h2>
              <p className="text-gray-700 whitespace-pre-wrap">{problem.notes}</p>
            </>
          )}
        </div>
      </div>

      <div className="w-full lg:w-96 flex-shrink-0">
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Submit Code</h2>
          
          {/* Code Editor */}
          <div className="mb-4">
            <CodeEditor
              value={code}
              onChange={handleCodeChange}
              language={language}
              height="300px"
            />
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmitCode}
            disabled={!code.trim() || isSubmitting}
            className={`w-full py-3 rounded-lg font-semibold transition-colors duration-200 ${
              code.trim() && !isSubmitting
                ? "bg-[#1ba3ff] text-white hover:bg-[#007aff]"
                : "bg-gray-300 text-gray-600 cursor-not-allowed"
            }`}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Code'}
          </button>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-3 text-gray-500 text-sm">OR</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          {/* File Upload (Legacy) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload solution file
            </label>
            <input
              type="file"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-[#1ba3ff] hover:file:bg-gray-200"
              accept=".cpp,.py,.js,.java"
            />
            <button
              onClick={handleFileSubmit}
              disabled={!selectedFile}
              className={`w-full mt-3 py-2 rounded-lg font-semibold transition-colors duration-200 ${
                selectedFile
                  ? "bg-gray-600 text-white hover:bg-gray-700"
                  : "bg-gray-300 text-gray-600 cursor-not-allowed"
              }`}
            >
              Submit File
            </button>
          </div>

          {/* Authentication Notice */}
          {!isAuthenticated && (
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                Please login to submit your solutions.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProblemPage;