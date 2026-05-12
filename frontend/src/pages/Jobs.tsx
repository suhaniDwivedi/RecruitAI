import { useEffect, useState } from "react";
import api from "../utils/api";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    api.get("/api/jobs/")
      .then((res) => setJobs(res.data))
      .catch((err) => console.error(err));
  }, []);

  const applyToJob = async (jobId: number) => {
    try {
      await api.post("/api/applications/", {
        candidate: 1,   // temporary (we will fix later)
        job: jobId,
        status: "APPLIED"
      });
      alert("Applied successfully!");
    } catch (error: any) {
      console.error(error.response?.data);
      alert(JSON.stringify(error.response?.data));
    }
  };

  return (
    <div className="p-10 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-black text-slate-900 mb-8 tracking-tight">Available Jobs</h1>

          <div className="grid gap-6">
            {jobs.map((job: any) => (
                <div key={job.id} className="bg-white border border-slate-200 p-8 rounded-2xl shadow-sm hover:shadow-xl hover:shadow-blue-900/5 transition-all group">
                    <div className="flex justify-between items-start mb-4">
                        <h2 className="text-2xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{job.title}</h2>
                        <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Full Time</span>
                    </div>
                    <p className="text-slate-600 mb-8 leading-relaxed">{job.description}</p>

                    <button
                        onClick={() => applyToJob(job.id)}
                        className="w-full sm:w-auto px-10 py-3 bg-slate-900 hover:bg-blue-600 text-white font-bold rounded-xl transition-all shadow-lg shadow-slate-900/10"
                    >
                        Apply Now
                    </button>
                </div>
            ))}
          </div>
      </div>
    </div>
  );
};

export default Jobs;
