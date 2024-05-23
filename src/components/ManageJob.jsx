import "./css/ManageJob.css";
function ManageJob({ user, jobchoices, handleChange }) {
  return (
    <section className="manage-job">
      <b>jobs</b>
      <section className="joblist">
        {user.jobs.map((job, jobin) => (
          <span key={job.job_id}> {job.job_name} </span>
        ))}
      </section>

      <section className="job-choices">
        {jobchoices.map((job, jobin) => (
          <label key={job.job_id}>
            <input
              name="jobs"
              type="checkbox"
              value={`${job.job_id}-${job.job_name}`}
              checked={user.jobs.some(
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
