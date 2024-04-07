function ManageJob({user, jobchoices, handleChange}) {
      return (
            <label>
                  jobtype
                  <section>
                        {user.jobtype.map((job, jobin) => (
                              <p key={job.job_id}> {job.job_name} </p>
                        ))}
                  </section>

                  {jobchoices.map((job, jobin) => (
                        <section key={job.job_id}>
                              <input
                                    name="jobtype"
                                    type="checkbox"
                                    value={`${job.job_id}-${job.job_name}`}
                                    checked={user.jobtype.some(maidJob => maidJob.job_id === job.job_id)}
                                    onChange={handleChange}
                              />
                              {job.job_name}
                        </section>
                  ))}
            </label>
      )
}

export default ManageJob;