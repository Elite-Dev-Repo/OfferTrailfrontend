import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "./api";
import { Toaster, toast } from "sonner";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Delete02Icon,
  PencilEdit01Icon,
  Tick01Icon,
} from "@hugeicons/core-free-icons";

function Application() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadJob();
  }, [id]);

  const loadJob = async () => {
    try {
      const res = await api.get(`/myjobs/${id}/`);
      setJob(res.data);
    } catch (error) {
      console.error("Failed to fetch job:", error);
      toast.error("Failed to load application");
    } finally {
      setLoading(false);
    }
  };
  const DeleteJob = async (id) => {
    if (!window.confirm("Are you sure you want to delete this application?"))
      return;

    try {
      // Changed to a standard delete request
      const res = await api.delete(`/myjobs/${id}/`);
      if (res.status === 204 || res.status === 200) {
        toast.success("Application removed successfully");
        navigate("/dashboard/applications");
      }
    } catch (error) {
      console.error("Failed to Delete job:", error);
      toast.error("Could not delete application");
    }
  };

  const updateStatus = async (newStatus) => {
    setUpdating(true);
    try {
      const res = await api.patch(`/myjobs/${id}/`, { status: newStatus });
      setJob(res.data);
      toast.success(`Status updated to ${newStatus}`);
    } catch (error) {
      toast.error("Failed to update status");
    } finally {
      setUpdating(false);
    }
  };

  const formatDate = (date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const statusStyles = {
    Pending: "bg-amber-50 text-amber-600 border border-amber-200",
    Accepted: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    Rejected: "bg-rose-50 text-rose-700 border border-rose-200",
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-pulse text-gray-400 font-medium text-lg">
          Loading Application...
        </div>
      </div>
    );

  if (!job)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 gap-4">
        <p className="text-gray-500">Application not found.</p>
        <button
          onClick={() => navigate(-1)}
          className="text-primary font-medium hover:underline"
        >
          Go Back
        </button>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Nav />
      <Toaster position="top-center" richColors />

      <main className="flex-grow py-12 px-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Top Actions Bar */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-gray-500 hover:text-primary transition duration-200 group"
            >
              <span className="text-xl group-hover:-translate-x-1 transition-transform">
                ←
              </span>
              <span className="font-medium">Go Back</span>
            </button>

            <button
              onClick={() => DeleteJob(job.id)}
              className="flex items-center gap-2 px-4 py-2 bg-rose-50 text-rose-600 rounded-xl hover:bg-rose-100 transition border border-rose-200 text-sm font-semibold"
            >
              <HugeiconsIcon icon={Delete02Icon} size={18} />
              Delete Application
            </button>
          </div>

          {/* Main Content Card */}
          <div className="bg-white shadow-sm border border-border rounded-3xl p-8 md:p-12 space-y-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gray-100 pb-8">
              <div>
                <h1 className="text-5xl font-black tracking-tight text-gray-900">
                  {job.company_name}
                </h1>
                <p className="text-2xl text-gray-500 mt-2 font-medium">
                  {job.role}
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 ml-1">
                  Update Status
                </label>
                <div className="flex gap-2 p-1.5 bg-gray-50 rounded-2xl border border-gray-100">
                  {["Pending", "Accepted", "Rejected"].map((s) => (
                    <button
                      key={s}
                      disabled={updating}
                      onClick={() => updateStatus(s)}
                      className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        job.status === s
                          ? "bg-white shadow-sm text-gray-900 ring-1 ring-black/5"
                          : "text-gray-400 hover:text-gray-600"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Information Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
              <div>
                <p className="text-xs uppercase tracking-widest font-bold text-gray-400 mb-1">
                  Current Status
                </p>
                <span
                  className={`inline-block px-4 py-1 rounded-full text-xs font-bold ${statusStyles[job.status]}`}
                >
                  {job.status}
                </span>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest font-bold text-gray-400 mb-1">
                  Applied On
                </p>
                <p className="text-lg font-bold text-gray-800">
                  {formatDate(job.application_date)}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest font-bold text-gray-400 mb-1">
                  Logged Date
                </p>
                <p className="text-lg font-bold text-gray-800">
                  {formatDate(job.created_at)}
                </p>
              </div>
            </div>

            {/* Notes Section */}
            <div className="pt-4">
              <div className="flex items-center gap-2 mb-4 text-gray-400">
                <HugeiconsIcon icon={PencilEdit01Icon} size={16} />
                <p className="text-xs uppercase tracking-widest font-bold">
                  Personal Notes
                </p>
              </div>
              <div className="bg-gray-50 p-8 rounded-[2rem] text-gray-700 leading-relaxed italic border border-gray-100 min-h-[120px]">
                {job.notes
                  ? `"${job.notes}"`
                  : "No specific notes recorded for this application."}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Application;
