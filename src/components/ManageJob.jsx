import { useState, useEffect } from "react";
import "./css/ManageJob.css";
import api from "../axios";

function ManageJob({ user, handleChange }) {
  const [jobchoices, setJobchoices] = useState([]);

  const fetchJobs = async () =>
    await api
      .get("/api/v1/job/")
      .then((res) => {
        // console.log(res.data);
        setJobchoices(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

  useEffect(() => {
    fetchJobs();
    // console.log(user);
  }, []);

  return (
    <section className="manage-job">
      <b>ชนิดงาน</b>
      <section className="joblist">
        {user.jobs?.map((job, jobin) => (
          <span key={jobin}> {job.job_name} </span>
        ))}
      </section>

      <section className="job-choices">
        {jobchoices.map((job, jobin) => (
          <label key={job.job_id}>
            <input
              name="jobs"
              type="checkbox"
              value={`${job.job_id}-${job.job_name}`}
              checked={user?.jobs?.some(
                (maidJob) => maidJob.job_id === job.job_id
              )}
              onChange={handleChange}
            />
            <span></span>
            {job.job_name}
          </label>
        ))}
      </section>
    </section>
  );
}

export default ManageJob;
