import { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HugeiconsIcon } from "@hugeicons/react";
import logo from "./assets/offerlogo.png";
import {
  DashboardSquare01Icon,
  Briefcase01Icon,
  Logout01Icon,
  Add01Icon,
  Calendar01Icon,
  Note01Icon,
  PreferenceHorizontalIcon,
  AiBrain03Icon,
  Menu01Icon,
  Cancel01Icon,
  Loading03Icon,
} from "@hugeicons/core-free-icons";
import api from "./api";
import { ACCESS, REFRESH } from "./constants";
import { Toaster, toast } from "sonner";

// Move styles outside to prevent re-creation on every render
const STATUS_STYLES = {
  Pending: "bg-amber-50 text-amber-600 border border-amber-200",
  Accepted: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  Rejected: "bg-rose-50 text-rose-700 border border-rose-200",
};

export default function Applications() {
  const navigate = useNavigate();

  // UI State
  const [open, setOpen] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Data State
  const [jobs, setJobs] = useState([]);
  const [filter, setFilter] = useState("");

  const [formData, setFormData] = useState({
    company_name: "",
    role: "",
    application_date: "",
    status: "Pending",
    notes: "",
  });

  // Unified Fetch Function - Simplified for no pagination
  const fetchJobs = useCallback(async () => {
    setLoading(true);
    try {
      // Build URL based on active filter
      const url = filter ? `/myjobs/?status=${filter}` : "/myjobs/";
      const res = await api.get(url);

      // Since pagination is off, res.data is likely the array itself
      setJobs(Array.isArray(res.data) ? res.data : res.data.results || []);
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error("Failed to load applications");
      setJobs([]);
    } finally {
      setLoading(false);
    }
  }, [filter]); // Re-memoize if filter changes

  // Effect: Initial Load
  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const handleApplyFilter = () => {
    fetchJobs();
    setOpenFilter(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/myjobs/", formData);
      if (res.status === 201) {
        fetchJobs();
        setOpen(false);
        setFormData({
          company_name: "",
          role: "",
          application_date: "",
          status: "Pending",
          notes: "",
        });
        toast.success("Application added successfully");
      }
    } catch (error) {
      toast.error("Failed to create entry");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(ACCESS);
    localStorage.removeItem(REFRESH);
    navigate("/register");
  };

  return (
    <div className="min-h-screen flex bg-background text-foreground flex-col md:flex-row">
      <title>OfferTrail - Applications</title>
      <Toaster position="top-center" richColors />

      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-border bg-white sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <img src={logo} className="w-8 h-fit" alt="Logo" />
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

      {/* Sidebar */}
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
              <button className="flex items-center gap-3 text-sm font-medium w-full p-2.5 rounded-sm bg-primary/10 text-primary act text-left ">
                <HugeiconsIcon icon={Briefcase01Icon} size={18} />
                Applications
              </button>
            </Link>

            <Link
              to="/dashboard/analysis"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <button className="flex items-center gap-3 text-sm font-medium w-full p-2.5 text-muted-foreground hover:bg-secondary rounded-sm transition text-left ">
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

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 max-w-6xl mx-auto w-full md:ml-60">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Applications</h2>
            <p className="text-muted-foreground mt-1">
              {loading ? "Loading..." : `Showing ${jobs.length} applications.`}
            </p>
          </div>

          <div className="flex gap-3 items-center w-full md:w-auto">
            <button
              onClick={() => setOpen(true)}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition"
            >
              <HugeiconsIcon icon={Add01Icon} size={18} />
              Add New
            </button>

            <div className="relative">
              <button
                onClick={() => setOpenFilter(!openFilter)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold transition border ${openFilter ? "bg-secondary border-primary text-primary" : "bg-slate-50 border-transparent hover:bg-slate-100"}`}
              >
                <HugeiconsIcon icon={PreferenceHorizontalIcon} size={18} />
                Filter
              </button>

              {openFilter && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setOpenFilter(false)}
                  />
                  <div className="absolute right-0 mt-3 w-64 p-5 bg-card border border-border rounded-2xl shadow-2xl z-20 animate-in fade-in zoom-in duration-150">
                    <h3 className="text-xs font-bold uppercase text-muted-foreground mb-3">
                      Status
                    </h3>
                    <select
                      value={filter}
                      onChange={(e) => setFilter(e.target.value)}
                      className="w-full h-11 px-4 mb-4 text-sm bg-secondary/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer"
                    >
                      <option value="">All Applications</option>
                      <option value="Pending">Pending</option>
                      <option value="Accepted">Accepted</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                    <button
                      onClick={handleApplyFilter}
                      className="w-full bg-primary text-primary-foreground text-sm font-bold py-3 rounded-xl hover:opacity-90"
                    >
                      Apply Filter
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Job Grid */}
        {loading ? (
          <div className="flex justify-center py-24">
            <HugeiconsIcon
              icon={Loading03Icon}
              className="animate-spin text-primary"
              size={40}
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {jobs.length > 0 ? (
              jobs.map((job) => (
                <Link key={job.id} to={`/application/${job.id}`}>
                  <div className="group md:min-h-70 relative p-8 overflow-hidden rounded-sm border border-border bg-card flex flex-col gap-4 hover:border-foreground/40 hover:shadow-md transition-all duration-300">
                    {/* Status-based decorative circles */}
                    <div
                      className={`absolute w-60 h-60 rounded-full right-[-10%] bottom-[-20%] z-1  ${STATUS_STYLES[job.status] || "bg-gray-100"}`}
                    ></div>
                    <div
                      className={`absolute w-30 h-30 rounded-full left-[-10%] top-[-20%] z-1 ${STATUS_STYLES[job.status] || "bg-gray-100"}`}
                    ></div>

                    <div className="flex justify-between items-start mt-8 z-2">
                      <div className="space-y-1 z-2">
                        <h3 className="text-xl font-bold leading-none tracking-tight">
                          <span className="opacity-50 font-mono font-light">
                            Role:
                          </span>{" "}
                          {job.role}
                        </h3>

                        <p className="text-foreground/80 font-bold">
                          <span className="opacity-50 font-mono font-light">
                            @
                          </span>{" "}
                          {job.company_name}
                        </p>
                      </div>

                      <span
                        className={`px-3 py-1 z-2 rounded-full text-[10px] uppercase tracking-wider font-bold ${STATUS_STYLES[job.status] || "bg-gray-100"}`}
                      >
                        {job.status}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 z-2 text-sm text-muted-foreground border-y border-border/50 py-3">
                      <div className="flex items-center gap-1.5">
                        <HugeiconsIcon icon={Calendar01Icon} size={16} />
                        <span>
                          Applied:{" "}
                          {job.application_date
                            ? new Date(
                                job.application_date,
                              ).toLocaleDateString()
                            : "N/A"}
                        </span>
                      </div>
                    </div>

                    {job.notes && (
                      <div className="bg-secondary/40 p-3 z-2 rounded-xl flex gap-2 items-start">
                        <HugeiconsIcon
                          icon={Note01Icon}
                          size={14}
                          className="mt-1 text-muted-foreground shrink-0"
                        />
                        <p className="text-sm text-muted-foreground line-clamp-1">
                          {job.notes}
                        </p>
                      </div>
                    )}
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-24 border-2 border-dashed border-border rounded-[2rem] text-muted-foreground bg-secondary/10">
                <HugeiconsIcon
                  icon={Briefcase01Icon}
                  size={48}
                  className="mb-4 opacity-20"
                />
                <p className="text-lg font-medium">No applications found.</p>
              </div>
            )}
          </div>
        )}
      </main>

      {/* New Application Modal */}
      {open && (
        <div className="fixed inset-0 bg-foreground/20 backdrop-blur-md flex items-center justify-center z-[100] p-4">
          <div className="w-full max-w-lg bg-card border border-border rounded-lg p-8 shadow-2xl">
            <h3 className="text-2xl font-bold mb-6">New Application</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase opacity-60">
                    Company
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.company_name}
                    onChange={(e) =>
                      setFormData({ ...formData, company_name: e.target.value })
                    }
                    className="w-full px-4 py-2 bg-secondary/50 border border-border rounded-md outline-none focus:border-primary"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase opacity-60">
                    Role
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.role}
                    onChange={(e) =>
                      setFormData({ ...formData, role: e.target.value })
                    }
                    className="w-full px-4 py-2 bg-secondary/50 border border-border rounded-md outline-none focus:border-primary"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase opacity-60">
                    Date
                  </label>
                  <input
                    type="datetime-local"
                    required
                    value={formData.application_date}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        application_date: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 bg-secondary/50 border border-border rounded-md"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase opacity-60">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value })
                    }
                    className="w-full px-4 py-2 bg-secondary/50 border border-border rounded-md"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Accepted">Accepted</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase opacity-60">
                  Notes
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData({ ...formData, notes: e.target.value })
                  }
                  rows="3"
                  className="w-full px-4 py-2 bg-secondary/50 border border-border rounded-md resize-none"
                />
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="px-6 py-2 rounded-md hover:bg-secondary transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-primary text-primary-foreground font-bold rounded-md hover:opacity-90"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
