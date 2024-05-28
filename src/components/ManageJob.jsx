import { useState, useEffect } from "react";
import "./css/ManageJob.css";
import api from "../axios";

function ManageJob({ user, handleJobChange }) {
  const [jchoiceSelector, setJChoiceSelector] = useState([]);

  const fetchJobs = async () =>
    await api
      .get("/api/v1/job")
      .then((res) => {
        // const user_job_ids = user.jobs.map((ujob) => ujob.job_id);
        // const job_exists = res.data.map((job) =>
        //   user_job_ids.includes(job.job_id) ? [job, true] : [job, false]
        // );
        setJChoiceSelector(res.data.map((job) => [job, false]));
      })
      .catch((err) => {
        console.log(err);
      });

  useEffect(() => {
    fetchJobs();
  }, []);

  const SelectJob = (_jobs, index) => {
    const updateJobs = _jobs.map((job, i) => {
      if (i == index) {
        const toggle = job[1] == false ? true : false;
        return [job[0], toggle];
      } else {
        return job;
      }
    });
    const selectedJobs = updateJobs
      .filter((jobselect) => jobselect[1])
      .map((jobselect) => jobselect[0]);
    handleJobChange(selectedJobs);
    return updateJobs;
  };

  return (
    <section className="manage-job">
      <b>เลือกทำงานที่สามารถทำได้</b>
      <section className="joblist">
        {/* {jobchoices &&
          jobchoices.map((job, jobin) => (
            <p key={job.job_id}>
              <span> {job.job_name} </span>
            </p>
          ))} */}
        <ul className="category_list">
          {jchoiceSelector
            ? jchoiceSelector.map((job, index) => (
                <li
                  key={index}
                  style={
                    jchoiceSelector[index][1]
                      ? { backgroundColor: "#ffb3d0" }
                      : { backgroundColor: "#ffbed798" }
                  }
                  onClick={() => {
                    setJChoiceSelector(SelectJob(jchoiceSelector, index));
                  }}
                >
                  {job[0].job_name}
                </li>
              ))
            : ""}
        </ul>
      </section>
    </section>
  );
}

export default ManageJob;
