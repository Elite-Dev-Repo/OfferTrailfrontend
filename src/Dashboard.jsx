import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { HugeiconsIcon } from "@hugeicons/react";

import logo from "./assets/offerlogo.png";
import {
  DashboardSquare01Icon,
  Briefcase01Icon,
  Logout01Icon,
  AnalysisTextLinkIcon,
  Coins01Icon,
  CreditCardAcceptIcon,
  Loading03Icon,
  PicasaIcon,
  AiBrain03Icon,
} from "@hugeicons/core-free-icons";
import api from "./api";
import { useNavigate } from "react-router-dom";
import { ACCESS, REFRESH } from "./constants";
import { Toaster } from "sonner";
import { MyChart } from "./components/MyChart";

export default function Dashboard() {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [Acceptedjobs, setAcceptedJobs] = useState([]);

  const loadDashboardData = async () => {
    try {
      // Fetching both simultaneously for better performance
      const [allJobs, accepted] = await Promise.all([
        api.get("/myjobs/"),
        api.get("/myjobs/?status=Accepted"),
      ]);

      setJobs(Array.isArray(allJobs.data) ? allJobs.data : []);
      setAcceptedJobs(Array.isArray(accepted.data) ? accepted.data : []);
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const rest = jobs.length - Acceptedjobs.length;

  const handleLogout = () => {
    localStorage.removeItem(ACCESS);
    localStorage.removeItem(REFRESH);
    navigate("/register");
  };

  const statusStyles = {
    Pending: "bg-amber-50 text-amber-600 border border-amber-200",
    Accepted: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    Rejected: "bg-rose-50 text-rose-700 border border-rose-200",
  };

  const statsData = [
    {
      icon: Coins01Icon,
      title: "Total Applications",
      color: "text-indigo-600",
      bg: "bg-indigo-50",
      data: jobs.length,
    },
    {
      icon: CreditCardAcceptIcon,
      title: "Accepted",
      color: "text-fuchsia-600",
      bg: "bg-fuchsia-50",
      data: Acceptedjobs.length,
    },
    {
      icon: Loading03Icon,
      title: "Pending / Others",
      color: "text-orange-600",
      bg: "bg-orange-50",
      data: rest,
    },
  ];

  return (
    <div className="min-h-screen flex bg-background text-foreground">
      <title>OfferTrail - User Dashboard</title>
      <Toaster position="top-center" />

      {/* Sidebar - UNTOUCHED as requested */}
      <aside className="w-60 shadow-sm border-r border-border py-6 flex flex-col justify-between hidden md:flex max-h-screen fixed top-0 bottom-0">
        <div className="flex flex-col gap-5">
          <Link to="/">
            <div className="flex items-center gap-2 px-6 overflow-hidden">
              <img src={logo} className="w-15 h-fit" alt="" />
              <h1 className="text-2xl font-bold  tracking-tight text-primary">
                OfferTrail
              </h1>
            </div>
          </Link>
          <nav className="flex gap-2 flex-col">
            <Link to="/dashboard">
              <button className="flex items-center gap-3 text-sm font-medium w-full p-2.5 rounded-sm bg-primary/10 text-primary act">
                <HugeiconsIcon icon={DashboardSquare01Icon} size={18} />
                Dashboard
              </button>
            </Link>

            <Link to="/dashboard/applications">
              <button className="flex items-center gap-3 text-sm font-medium w-full p-2.5  text-muted-foreground hover:bg-secondary rounded-sm transition">
                <HugeiconsIcon icon={Briefcase01Icon} size={18} />
                Applications
              </button>
            </Link>
            <Link to="/dashboard/analysis">
              <button className="flex items-center gap-3 text-sm font-medium w-full p-2.5 text-muted-foreground hover:bg-secondary rounded-sm transition">
                <HugeiconsIcon icon={AiBrain03Icon} size={18} />
                AI Analysis
              </button>
            </Link>
          </nav>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 text-sm hover:text-destructive transition p-4 py-3 mx-4 bg-red-50 text-red-500 rounded-lg border border-red-400 "
        >
          <HugeiconsIcon icon={Logout01Icon} size={20} />
          Logout
        </button>
      </aside>

      {/* Main Content - IMPROVED STYLING */}
      <main className="flex-1 w-full min-h-screen md:ml-60 p-6 md:p-10 bg-slate-50/50">
        <header className="mb-10">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">
            Dashboard Overview
          </h2>
          <p className="text-muted-foreground mt-1 text-sm">
            Everything you need to track your job application journey.
          </p>
        </header>

        <div className="flex flex-col gap-8">
          {/* Stats Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {statsData.map((stat) => (
              <div
                key={stat.title}
                className="bg-white border border-border/60 p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div
                  className={`${stat.bg} ${stat.color} w-12 h-12 flex items-center justify-center rounded-xl mb-4`}
                >
                  <HugeiconsIcon icon={stat.icon} size={24} />
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                    {stat.title}
                  </p>
                  <h3 className="text-3xl font-bold text-slate-900">
                    {stat.data}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Grid: Recent Jobs & Chart */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {/* Recent Applications Card */}
            <div className="bg-white rounded-2xl border border-border/60 shadow-sm overflow-hidden flex flex-col">
              <div className="p-6 border-b border-border/50 flex items-center justify-between">
                <h2 className="font-bold text-lg text-slate-800">
                  Recent Applications
                </h2>
                <Link
                  to="/dashboard/applications"
                  className="text-xs font-semibold text-primary hover:underline"
                >
                  View All
                </Link>
              </div>

              <div className="p-2 flex flex-col">
                {jobs.length > 0 ? (
                  jobs.slice(0, 5).map((job, idx) => (
                    <div
                      key={idx}
                      className="group flex items-center gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors"
                    >
                      <div className="w-10 h-10 bg-slate-100 flex items-center justify-center rounded-lg group-hover:bg-white border border-transparent group-hover:border-slate-200">
                        <HugeiconsIcon
                          icon={PicasaIcon}
                          size={20}
                          className="text-slate-600"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-slate-900 text-sm truncate">
                          {job.role}
                        </h3>
                        <p className="text-xs text-slate-500 truncate">
                          {job.company_name}
                        </p>
                      </div>
                      <div
                        className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-tighter ${statusStyles[job.status] || "bg-gray-200 text-gray-700"}}`}
                      >
                        {job.status || "Pending"}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-10 text-center text-sm text-slate-400">
                    No applications yet. Start hunting!
                  </div>
                )}
              </div>
            </div>

            {/* Chart Card */}
            <div className="bg-white rounded-2xl border border-border/60 shadow-sm p-6 flex flex-col h-full min-h-[400px]">
              <h2 className="font-bold text-lg text-slate-800 mb-6 text-center lg:text-left">
                Application Analytics
              </h2>
              <div className="flex-1 w-full relative">
                <MyChart />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
