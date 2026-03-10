import api from "@/api";
import React, { useEffect, useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Link } from "react-router-dom";
import { HugeiconsIcon } from "@hugeicons/react";
import logo from "@/assets/offerlogo.png";
import {
  DashboardSquare01Icon,
  Briefcase01Icon,
  Logout01Icon,
  AiBrain03Icon,
  Loading03Icon,
  Menu01Icon,
  Cancel01Icon,
} from "@hugeicons/core-free-icons";
import { Toaster, toast } from "sonner";

// Initialize Gemini
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

function Analysis() {
  const [jobs, setJobs] = useState([]);
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    LoadJobs();
  }, []);

  const LoadJobs = async () => {
    try {
      const res = await api.get("/myjobs/");
      if (Array.isArray(res.data)) {
        setJobs(res.data);
      }
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
      toast.error("Failed to fetch applications");
    }
  };

  function generate() {
    if (jobs.length > 0) {
      generateAnalysis(jobs);
    } else {
      toast.error("No jobs found to analyze");
    }
  }

  const generateAnalysis = async (jobsData) => {
    const notes = jobsData
      .map((job) => `[${job.company_name} - ${job.role}]: ${job.notes}`)
      .filter((note) => note && note.trim().length > 10)
      .join("\n\n");

    if (!notes) {
      toast.error("Your notes are too short for an AI analysis.");
      return;
    }

    setLoading(true);
    try {
      // Use a valid model name: 'gemini-1.5-flash'
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

      const prompt = `
        You are an expert Career Advisor AI for a platform called OfferTrail.
        
        Analyze the following interview/application notes from a candidate:
        ---
        ${notes}
        ---
        
        Provide a structured analysis including:
        1. Common Themes: What patterns are appearing?
        2. Critical Gaps: What is the candidate missing or doing wrong?
        3. Actionable Advice: 3 specific things to change in the next interview.
        4. Skill Focus: Which skills should they highlight more based on market feedback?

        Use professional, encouraging language and return the response in clear plain text.
        Do not use markdown symbols like '**' or '###'.
      `;

      const result = await model.generateContent(prompt);
      setAnalysis(result.response.text());
      toast.success("Analysis Generated");
    } catch (error) {
      console.error("AI generation failed:", error);
      toast.error("AI analysis failed to generate");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-50 text-foreground">
      <Toaster position="top-center" richColors />

      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-border bg-white sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <img src={logo} className="w-8 h-fit" alt="" />
          <h1 className="text-xl font-bold text-primary">OfferTrail</h1>
        </div>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2"
        >
          <HugeiconsIcon
            icon={isMobileMenuOpen ? Cancel01Icon : Menu01Icon}
            size={24}
          />
        </button>
      </div>

      {/* Sidebar - Desktop & Mobile Drawer */}
      <aside
        className={`
          fixed  inset-y-0 left-0 z-50 w-60 bg-background border-r border-border py-6 flex flex-col justify-between transition-transform duration-300 transform
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0  md:flex h-screen
        `}
      >
        <div className="flex flex-col gap-5">
          <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
            <div className="flex items-center gap-2 px-6 overflow-hidden">
              <img src={logo} className="w-15 h-fit" alt="" />
              <h1 className="text-2xl font-bold tracking-tight text-primary">
                OfferTrail
              </h1>
            </div>
          </Link>
          <nav className="flex gap-2 flex-col">
            <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
              <button className="flex items-center gap-3 text-sm font-medium w-full p-2.5 text-muted-foreground hover:bg-secondary rounded-sm transition text-left">
                <HugeiconsIcon icon={DashboardSquare01Icon} size={18} />
                Dashboard
              </button>
            </Link>

            <Link
              to="/dashboard/applications"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <button className="flex items-center gap-3 text-sm font-medium w-full p-2.5 text-muted-foreground hover:bg-secondary rounded-sm transition text-left">
                <HugeiconsIcon icon={Briefcase01Icon} size={18} />
                Applications
              </button>
            </Link>

            <Link
              to="/dashboard/analysis"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <button className="flex items-center gap-3 text-sm font-medium w-full p-2.5 rounded-sm bg-primary/10 text-primary act text-left">
                <HugeiconsIcon icon={AiBrain03Icon} size={18} />
                AI Analysis
              </button>
            </Link>
          </nav>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 text-sm hover:text-destructive transition p-4 py-3 mx-4 bg-red-50 text-red-500 rounded-lg border border-red-400"
        >
          <HugeiconsIcon icon={Logout01Icon} size={20} />
          Logout
        </button>
      </aside>

      {/* Backdrop for mobile drawer */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-12 md:ml-60">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 flex items-center gap-3">
                AI Analysis
              </h2>
              <p className="text-slate-500 mt-2 text-lg">
                Personalized career coaching based on your activity.
              </p>
            </div>
            <button
              onClick={generate}
              disabled={loading}
              className="w-full md:w-auto p-3 px-6 flex items-center justify-center gap-2 bg-white border border-border rounded-xl hover:bg-slate-50 transition shadow-sm disabled:opacity-50"
            >
              <span className="font-semibold text-sm">Generate</span>
              <HugeiconsIcon
                icon={loading ? Loading03Icon : AiBrain03Icon}
                size={20}
                className={loading ? "animate-spin" : ""}
              />
            </button>
          </div>

          <div className="bg-white border border-slate-200 rounded-[1.5rem] md:rounded-[2rem] overflow-hidden shadow-sm">
            <div className="bg-slate-900 p-6 flex items-center gap-4 text-white">
              <div className="p-2 bg-primary/20 rounded-lg">
                <HugeiconsIcon
                  icon={AiBrain03Icon}
                  size={24}
                  className="text-primary"
                />
              </div>
              <div>
                <h4 className="font-bold text-sm">
                  OfferTrail AI Intelligence
                </h4>
                <p className="text-xs text-slate-400">
                  Processing {jobs.length} applications
                </p>
              </div>
            </div>

            <div className="p-8 md:p-12">
              {loading ? (
                <div className="space-y-4 animate-pulse">
                  <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                  <div className="h-4 bg-slate-200 rounded w-1/2"></div>
                  <div className="h-4 bg-slate-200 rounded w-5/6"></div>
                  <div className="h-4 bg-slate-200 rounded w-2/3"></div>
                </div>
              ) : analysis ? (
                <div className="prose prose-slate max-w-none whitespace-pre-wrap leading-relaxed text-slate-700">
                  {analysis}
                </div>
              ) : jobs.length > 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <HugeiconsIcon
                      icon={AiBrain03Icon}
                      size={32}
                      className="text-slate-300"
                    />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">
                    No Analysis Generated
                  </h3>
                  <p className="text-slate-500 max-w-xs mx-auto text-sm">
                    Click on the Generate button to generate your personalized
                    insights.
                  </p>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <HugeiconsIcon
                      icon={AiBrain03Icon}
                      size={32}
                      className="text-slate-300"
                    />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Not enough data
                  </h3>
                  <p className="text-slate-500 max-w-xs mx-auto text-sm">
                    Add detailed notes to your applications about interview
                    questions and feedback to unlock AI insights.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Analysis;
