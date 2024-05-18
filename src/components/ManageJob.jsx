import './css/ManageJob.css'
function ManageJob({user, jobchoices, handleChange}) {
      return (
            <section className='manage-job'>
                  <b>jobtype</b>
                  <section className='joblist'>
                        {user.jobtype.map((job, jobin) => (
                              <span key={job.job_id}> {job.job_name} </span>
                        ))}
                  </section>

                  <section className='job-choices'>
                        {jobchoices.map((job, jobin) => (
                              <label key={job.job_id}>
                                    <input
                                          name="jobtype"
                                          type="checkbox"
                                          value={`${job.job_id}-${job.job_name}`}
                                          checked={user.jobtype.some(maidJob => maidJob.job_id === job.job_id)}
                                          onChange={handleChange}
                                    />
                                    <span></span>
                                    {job.job_name}
                              </label>
                        ))}
                  </section>
            </section>
      )
}

export default ManageJob;