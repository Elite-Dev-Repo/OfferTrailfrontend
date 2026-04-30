import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HugeiconsIcon } from "@hugeicons/react";
import logo from "./assets/offerlogo.png";
import { getJobs } from "./data";
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

const STATUS_STYLES = {
  Pending: "bg-amber-50 text-amber-600 border border-amber-200",
  Accepted: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  Rejected: "bg-rose-50 text-rose-700 border border-rose-200",
};

export default function Applications() {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [jobs, setJobs] = useState([]);
  const [activeFilter, setActiveFilter] = useState(""); // The filter actually applied
  const [tempFilter, setTempFilter] = useState(""); // The filter selected in the dropdown

  const [formData, setFormData] = useState({
    company_name: "",
    role: "",
    application_date: "",
    status: "Pending",
    notes: "",
  });

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const res = await getJobs();
      setJobs(Array.isArray(res) ? res : []);
    } catch (error) {
      toast.error("Failed to load applications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleApplyFilter = () => {
    setActiveFilter(tempFilter);
    setOpenFilter(false);
  };

  // Logic: filteredJobs holds the array to be displayed
  const filteredJobs = activeFilter
    ? jobs.filter((job) => job.status === activeFilter)
    : jobs;

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
      <Toaster position="top-center" richColors />

      {/* Sidebar Mobile Toggle */}
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

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-60 bg-white border-r border-border py-6 flex flex-col justify-between transition-transform duration-300 transform ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:flex h-screen`}
      >
        <div className="flex flex-col gap-5 px-4">
          <Link to="/dashboard" className="flex items-center gap-2 px-2">
            <img src={logo} className="w-10 h-fit" alt="" />
            <h1 className="text-xl font-bold tracking-tight text-primary">
              OfferTrail
            </h1>
          </Link>
          <nav className="flex gap-1 flex-col mt-4">
            <Link
              to="/dashboard"
              className="flex items-center gap-3 text-sm font-medium p-2.5 text-muted-foreground hover:bg-slate-50 rounded-lg"
            >
              <HugeiconsIcon icon={DashboardSquare01Icon} size={18} /> Dashboard
            </Link>
            <Link
              to="/dashboard/applications"
              className="flex items-center gap-3 text-sm font-medium p-2.5 bg-primary/10 text-primary rounded-lg"
            >
              <HugeiconsIcon icon={Briefcase01Icon} size={18} /> Applications
            </Link>
            <Link
              to="/dashboard/analysis"
              className="flex items-center gap-3 text-sm font-medium p-2.5 text-muted-foreground hover:bg-slate-50 rounded-lg"
            >
              <HugeiconsIcon icon={AiBrain03Icon} size={18} /> AI Analysis
            </Link>
          </nav>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 text-sm p-3 mx-4 mb-4 bg-red-50 text-red-500 rounded-lg border border-red-100 hover:bg-red-100 transition"
        >
          <HugeiconsIcon icon={Logout01Icon} size={20} /> Logout
        </button>
      </aside>

      <main className="flex-1 p-6 md:p-10 max-w-6xl mx-auto w-full md:ml-60">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Applications</h2>
            <p className="text-muted-foreground mt-1">
              {loading
                ? "Updating list..."
                : `Showing ${filteredJobs.length} results.`}
            </p>
          </div>

          <div className="flex gap-3 items-center w-full md:w-auto">
            <button
              onClick={() => setOpen(true)}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-bold hover:opacity-90 transition"
            >
              <HugeiconsIcon icon={Add01Icon} size={18} /> Add New
            </button>

            <div className="relative">
              <button
                onClick={() => setOpenFilter(!openFilter)}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition border ${openFilter ? "bg-white border-primary text-primary shadow-sm" : "bg-slate-100 border-transparent"}`}
              >
                <HugeiconsIcon icon={PreferenceHorizontalIcon} size={18} />{" "}
                Filter
              </button>
              {openFilter && (
                <div className="absolute right-0 mt-3 w-64 p-5 bg-white border border-border rounded-2xl shadow-xl z-20">
                  <h3 className="text-[10px] font-black uppercase text-muted-foreground mb-3 tracking-widest">
                    Select Status
                  </h3>
                  <select
                    value={tempFilter}
                    onChange={(e) => {
                      setTempFilter(e.target.value);
                    }}
                    className="w-full h-10 px-3 mb-4 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary outline-none"
                  >
                    <option value="">All Applications</option>
                    <option value="Pending">Pending</option>
                    <option value="Accepted">Accepted</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                  <button
                    onClick={handleApplyFilter}
                    className="w-full bg-primary text-white text-xs font-bold py-3 rounded-xl"
                  >
                    Apply Filter
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

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
            {/* CHANGED: Mapping over filteredJobs instead of jobs */}
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <Link key={job.id} to={`/application/${job.id}`}>
                  <div className="group md:min-h-70 relative p-8 overflow-hidden rounded-sm border border-border bg-card flex flex-col gap-4 hover:border-foreground/40 hover:shadow-md transition-all duration-300">
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
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
          <div className="w-full max-w-lg bg-white rounded-3xl p-8 shadow-2xl">
            <h3 className="text-2xl font-bold mb-6 text-slate-900">
              New Application
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase text-slate-400">
                    Company
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.company_name}
                    onChange={(e) =>
                      setFormData({ ...formData, company_name: e.target.value })
                    }
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-primary"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase text-slate-400">
                    Role
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.role}
                    onChange={(e) =>
                      setFormData({ ...formData, role: e.target.value })
                    }
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-primary"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase text-slate-400">
                    Date Applied
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.application_date}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        application_date: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase text-slate-400">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value })
                    }
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Accepted">Accepted</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-slate-400">
                  Notes
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData({ ...formData, notes: e.target.value })
                  }
                  rows="3"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl resize-none outline-none focus:border-primary"
                />
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="px-6 py-2.5 text-sm font-bold text-slate-500 hover:bg-slate-100 rounded-xl transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-8 py-2.5 bg-primary text-white font-bold rounded-xl hover:shadow-lg transition"
                >
                  Save Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
