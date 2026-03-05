import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "./api";
import { Toaster, toast } from "sonner";
import Nav from "./components/Nav";
import Footer from "./components/Footer";

function Application() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadJob();
  }, []);

  const loadJob = async () => {
    try {
      const res = await api.get(`/myjobs/${id}`);
      setJob(res.data);
    } catch (error) {
      console.error("Failed to fetch job:", error);
      toast.error("Failed to load application");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

  const statusStyles = {
    Pending: "bg-amber-50 text-amber-600 border border-amber-200",
    Accepted: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    Rejected: "bg-rose-50 text-rose-700 border border-rose-200",
  };

  if (loading) {
    return (
      <>
        <Nav />
        <div
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-500 hover:text-gray-900 cursor-pointer transition duration-200"
        >
          <span className="text-lg">←</span>
          <span className="font-medium">Go Back</span>
        </div>
        <div className="min-h-screen flex items-center justify-center">
          Loading...
        </div>
        <Footer />
      </>
    );
  }

  if (!job) {
    return (
      <>
        <Nav />
        <div className="">go back</div>
        <div className="min-h-screen flex items-center justify-center">
          Application not found.
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Nav />
      <Toaster position="top-center" />

      <div className="min-h-screen bg-gray-50 py-16 px-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Go Back */}
          <div
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-500 hover:text-gray-900 cursor-pointer transition duration-200"
          >
            <span className="text-lg">←</span>
            <span className="font-medium">Go Back</span>
          </div>

          {/* Card */}
          <div className="bg-white shadow-xl rounded-2xl p-10 space-y-8">
            {/* Header */}
            <div className="border-b pb-6">
              <h1 className="text-4xl font-bold">{job.company_name}</h1>
              <p className="text-xl text-gray-600 mt-2">{job.role}</p>
            </div>

            {/* Status Badge */}
            <div>
              <span
                className={`px-5 py-2 rounded-full text-sm font-semibold ${
                  statusStyles[job.status] || "bg-gray-200 text-gray-700"
                }`}
              >
                {job.status}
              </span>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <p className="text-gray-500 text-sm">Application Date</p>
                <p className="text-lg font-medium">
                  {formatDate(job.application_date)}
                </p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">Created At</p>
                <p className="text-lg font-medium">
                  {formatDate(job.created_at)}
                </p>
              </div>
            </div>

            {/* Notes */}
            <div>
              <p className="text-gray-500 text-sm mb-3">Notes</p>
              <div className="bg-gray-100 p-6 rounded-xl">
                {job.notes || "No notes added."}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Application;
