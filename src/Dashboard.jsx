import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  DashboardSquare01Icon,
  Briefcase01Icon,
  Logout01Icon,
  Add01Icon,
  Calendar01Icon,
  Note01Icon,
  Delete02Icon,
  AnalysisTextLinkIcon,
} from "@hugeicons/core-free-icons";
import api from "./api";
import { useNavigate } from "react-router-dom";
import { ACCESS, REFRESH } from "./constants";
import { Toaster, toast } from "sonner";

export default function Dashboard() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [formData, setFormData] = useState({
    company_name: "",
    role: "",
    application_date: "",
    status: "Pending",
    notes: "",
  });

  const LoadJobs = async () => {
    try {
      const res = await api.get("/myjobs/");
      if (Array.isArray(res.data)) {
        setJobs(res.data);
      } else {
        setJobs([]);
      }
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
      setJobs([]);
    }
  };

  const DeleteJob = async (id) => {
    try {
      const res = await api.delete(`/myjobs/${id}`);
      if (res.status === 204) {
        setJobs((prevJobs) => prevJobs.filter((job) => job.id !== id));
        toast.success("Deleted");
      }
    } catch (error) {
      console.error("Failed to Delete job:", error);
      setJobs([]);
    }
  };

  useEffect(() => {
    LoadJobs();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/myjobs/", formData);
      if (res.status === 201) {
        setJobs((prevJobs) => [...prevJobs, res.data]);
        setOpen(false);
        setFormData({
          company_name: "",
          role: "",
          application_date: "",
          status: "Pending",
          notes: "",
        });

        toast.success("Added");
      }
    } catch (error) {
      console.error("Failed to create job:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(ACCESS);
    localStorage.removeItem(REFRESH);
    navigate("/register");
  };

  // UPDATED: Gold/Yellow for Pending
  const statusStyles = {
    Pending: "bg-amber-50 text-amber-600 border border-amber-200",
    Accepted: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    Rejected: "bg-rose-50 text-rose-700 border border-rose-200",
  };

  return (
    <div className="min-h-screen flex bg-background text-foreground">
      <title>OfferTrail - User Dashboard</title>
      <Toaster position="top-center" />
      {/* Sidebar */}
      <aside className="w-64 border-r border-border p-6 flex flex-col justify-between hidden md:flex max-h-screen fixed top-0 bottom-0">
        <div>
          <Link to="/">
            <h1 className="text-2xl font-bold mb-10 tracking-tight text-primary">
              OfferTrail
            </h1>
          </Link>
          <nav className="space-y-2">
            <button className="flex items-center gap-3 text-sm font-medium w-full p-2.5 rounded-xl bg-primary/10 text-primary">
              <HugeiconsIcon icon={DashboardSquare01Icon} size={18} />
              Dashboard
            </button>
            <button className="flex items-center gap-3 text-sm font-medium w-full p-2.5 text-muted-foreground hover:bg-secondary rounded-xl transition">
              <HugeiconsIcon icon={Briefcase01Icon} size={18} />
              Applications
            </button>

            <button className="flex items-center gap-3 text-sm font-medium w-full p-2.5 text-muted-foreground hover:bg-secondary rounded-xl transition">
              <HugeiconsIcon icon={AnalysisTextLinkIcon} size={18} />
              Analytics
            </button>
          </nav>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 text-sm  hover:text-destructive transition p-4 bg-red-100 text-red-500 rounded-lg border border-red-600 "
        >
          <HugeiconsIcon icon={Logout01Icon} size={20} />
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 max-w-6xl mx-auto w-full md:ml-64">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Applications</h2>
            <p className="text-muted-foreground mt-1">
              Showing {jobs.length} total applications.
            </p>
          </div>
          <button
            onClick={() => setOpen(true)}
            className="flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition"
          >
            <HugeiconsIcon icon={Add01Icon} size={18} />
            Add New Job
          </button>
        </div>

        {/* Job Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {Array.isArray(jobs) && jobs.length > 0 ? (
            jobs.map((job) => (
              <div
                key={job.id}
                className="group relative p-8 overflow-hidden rounded-sm border border-border bg-card flex flex-col gap-4 hover:border-primary/40 hover:shadow-md transition-all duration-300"
              >
                <div
                  className={`absolute w-60 h-60  rounded-full right-[-10%] bottom-[-20%] z-1  ${statusStyles[job.status]}`}
                ></div>

                <div
                  className={`absolute w-30 h-30  rounded-full left-[-10%] top-[-20%] z-1  ${statusStyles[job.status]}`}
                ></div>
                <div
                  onClick={() => {
                    DeleteJob(job.id);
                  }}
                  className="text-red-500 p-2 rounded-full items-center justify-center hover:bg-red-50 absolute top-2 right-3 hidden group-hover:flex"
                >
                  <HugeiconsIcon icon={Delete02Icon} size={25} />
                </div>
                {/* Header: Role & Status */}
                <div className="flex justify-between items-start mt-8 z-2">
                  <div className="space-y-1 z-2">
                    <h3 className="text-xl font-bold leading-none tracking-tight z-2">
                      Role - {job.role}
                    </h3>
                    <p className="text-foreground/60 z-2 font-medium">
                      @ {job.company_name}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 z-2 rounded-full text-[10px] uppercase tracking-wider font-bold ${
                      statusStyles[job.status] || "bg-gray-100"
                    }`}
                  >
                    {job.status}
                  </span>
                </div>

                {/* Meta Information */}
                <div className="flex items-center gap-4 z-2 text-sm text-muted-foreground border-y border-border/50 py-3">
                  <div className="flex items-center gap-1.5">
                    <HugeiconsIcon icon={Calendar01Icon} size={16} />
                    <span>
                      Applied:{" "}
                      {job.application_date
                        ? new Date(job.application_date).toLocaleDateString()
                        : "N/A"}
                    </span>
                  </div>
                </div>

                {/* Notes Section */}
                {job.notes && (
                  <div className="bg-secondary/40 p-3 z-2 rounded-xl flex gap-2 items-start">
                    <HugeiconsIcon
                      icon={Note01Icon}
                      size={14}
                      className="mt-1 text-muted-foreground shrink-0"
                    />
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {job.notes}
                    </p>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-24 border-2 border-dashed border-border rounded-[2rem] text-muted-foreground bg-secondary/10">
              <HugeiconsIcon
                icon={Briefcase01Icon}
                size={48}
                className="mb-4 opacity-20"
              />
              <p className="text-lg font-medium">No applications found.</p>
              <p className="text-sm">Click 'Add New Job' to start tracking.</p>
            </div>
          )}
        </div>
      </main>

      {/* Modal logic */}
      {open && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-lg bg-card border border-border rounded-[2.5rem] p-8 shadow-2xl ring-1 ring-black/5 animate-in fade-in zoom-in duration-200">
            <h3 className="text-2xl font-bold mb-6 tracking-tight">
              New Application
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase ml-1 opacity-70">
                    Company
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Google"
                    required
                    value={formData.company_name}
                    onChange={(e) =>
                      setFormData({ ...formData, company_name: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-2xl bg-secondary/50 border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase ml-1 opacity-70">
                    Role
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Frontend Dev"
                    required
                    value={formData.role}
                    onChange={(e) =>
                      setFormData({ ...formData, role: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-2xl bg-secondary/50 border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase ml-1 opacity-70">
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
                    className="w-full px-4 py-3 rounded-2xl bg-secondary/50 border border-border focus:border-primary outline-none transition"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase ml-1 opacity-70">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-2xl bg-secondary/50 border border-border focus:border-primary outline-none transition appearance-none"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Accepted">Accepted</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase ml-1 opacity-70">
                  Notes
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData({ ...formData, notes: e.target.value })
                  }
                  placeholder="What happened in the interview?"
                  rows="3"
                  className="w-full px-4 py-3 rounded-2xl bg-secondary/50 border border-border focus:border-primary outline-none transition resize-none"
                ></textarea>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="px-6 py-3 rounded-2xl font-semibold hover:bg-secondary transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-8 py-3 rounded-2xl bg-primary text-primary-foreground font-bold shadow-lg shadow-primary/20 hover:opacity-90 transition"
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
