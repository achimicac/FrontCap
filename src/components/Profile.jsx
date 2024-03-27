function Profile({user, isMaid=false}) {
      console.log(user.jobtype)
      return (
            <main>
                  {<figure>
                        {(user.user_pic !== null && user.user_pic !== undefined) ?
                              <img src={`data:image/jpeg;base64,${maid.user_pic}`} /> :
                              <img src='ania.jpg' />
                        }
                  </figure>}
                  <article>
                        <header> {user.firstname} {user.lastname} </header>
                        <section> 
                              birthday 
                              <p> {user.birthday} </p>
                        </section>
                        <section> 
                              age
                              <p> {user.age} </p>
                        </section>
                        <section> 
                              email
                              <p> {user.email} </p>
                        </section>
                        {isMaid && 
                              <section>
                                    job type
                                    {user.jobtype.map((job, jobid) => {
                                          <p key={jobid}> {job.job_name} </p>
                                    })}
                              </section>
                        }
                        <section> 
                              description
                              <p> {user.description} </p>
                        </section>
                  </article>
            </main>
      )
}

export default Profile;