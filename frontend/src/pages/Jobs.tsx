import { useEffect, useState } from "react";
import { Briefcase, MapPin, DollarSign, Loader, Send } from "lucide-react";
import api from "../utils/api";
import { showToast } from "../utils/toast";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [applyingId, setApplyingId] = useState<number | null>(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await api.get("/api/jobs/");
      setJobs(res.data);
      if (res.data.length === 0) {
        showToast.info("No jobs available at the moment");
      }
    } catch (err) {
      showToast.error("Failed to fetch jobs");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const applyToJob = async (jobId: number, jobTitle: string) => {
    setApplyingId(jobId);
    try {
      await api.post("/api/applications/", {
        candidate: 1,
        job: jobId,
        status: "APPLIED"
      });
      showToast.success(`Successfully applied to ${jobTitle}!`);
    } catch (error: any) {
      const errorMessage = error.response?.data?.detail || "Failed to apply to this job";
      showToast.error(errorMessage);
      console.error(error.response?.data);
    } finally {
      setApplyingId(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="text-center">
          <Loader className="animate-spin mx-auto mb-4 text-blue-600" size={40} />
          <p className="text-slate-600 font-medium">Loading opportunities...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-blue-100 p-2 rounded-lg">
              <Briefcase className="text-blue-600" size={24} />
            </div>
            <h1 className="text-4xl font-bold text-slate-900">Job Opportunities</h1>
          </div>
          <p className="text-slate-600">Explore and apply to amazing positions</p>
        </div>

        {/* Jobs Grid */}
        {jobs.length === 0 ? (
          <div className="text-center py-16">
            <Briefcase className="mx-auto text-slate-300 mb-4" size={48} />
            <h3 className="text-slate-600 font-semibold text-lg mb-2">No jobs available</h3>
            <p className="text-slate-500">Check back later for new opportunities</p>
          </div>
        ) : (
          <div className="grid gap-5">
            {jobs.map((job: any) => (
              <div
                key={job.id}
                className="bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-300 overflow-hidden group"
              >
                <div className="p-6 md:p-8">
                  {/* Top Section */}
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-2">
                        {job.title}
                      </h2>
                      <p className="text-slate-600 text-sm">
                        by <span className="font-semibold text-slate-700">{job.company}</span>
                      </p>
                    </div>
                    <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap">
                      Full Time
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-slate-600 leading-relaxed mb-6 line-clamp-3">
                    {job.description}
                  </p>

                  {/* Meta Info */}
                  <div className="flex flex-wrap gap-6 mb-6 pb-6 border-b border-slate-100">
                    {job.location && (
                      <div className="flex items-center gap-2 text-slate-600">
                        <MapPin size={16} className="text-blue-600" />
                        <span className="text-sm">{job.location}</span>
                      </div>
                    )}
                    {job.salary && (
                      <div className="flex items-center gap-2 text-slate-600">
                        <DollarSign size={16} className="text-green-600" />
                        <span className="text-sm font-medium">{job.salary}</span>
                      </div>
                    )}
                  </div>

                  {/* Action */}
                  <button
                    onClick={() => applyToJob(job.id, job.title)}
                    disabled={applyingId === job.id}
                    className="flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-slate-400 disabled:to-slate-500 text-white font-semibold rounded-lg transition-all shadow-md shadow-blue-600/30 hover:shadow-lg hover:shadow-blue-600/40 disabled:shadow-md"
                  >
                    {applyingId === job.id ? (
                      <>
                        <Loader size={18} className="animate-spin" />
                        Applying...
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        Apply Now
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Jobs;
