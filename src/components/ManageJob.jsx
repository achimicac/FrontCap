import { useState, useEffect } from "react";
import "./css/ManageJob.css";
import api from "../axios";

function ManageJob({ user, handleJobChange }) {
  const [jobchoices, setJobchoices] = useState([]);

  const fetchJobs = async () =>
    await api
      .get("/api/v1/job")
      .then((res) => {
        // const user_job_ids = user.jobs.map((ujob) => ujob.job_id);
        // const job_exists = res.data.map((job) =>
        //   user_job_ids.includes(job.job_id) ? [job, true] : [job, false]
        // );
        setJobchoices(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

  useEffect(() => {
    fetchJobs();
  }, []);


  return (
            <section className='manage-job'>
                  <b>ชนิดงาน</b>
                  <section className='joblist'>
                        {user.jobs.map((job, jobin) => (
                            <span key={jobin}> {job.job_name} </span>
                        ))}
                  </section>

                  <section className='job-choices'>
                        {jobchoices.map((job, jobin) => (
                              <label key={job.job_id}>
                                    <input
                                          name="jobtype"
                                          type="checkbox"
                                          value={`${job.job_id}-${job.job_name}`}
                                          checked={user.jobs.some(maidJob => maidJob.job_id === job.job_id)}
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