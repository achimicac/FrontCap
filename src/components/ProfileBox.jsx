function ProfileBox({firstname, lastname, jobs, clickConfirm, clickCancel, buttonName='ยืนยัน', canClick=true}) {// or false, depending on your requirement

      return (
            <section>
                  <figure>

                  </figure>
                  <article>
                        <header> {firstname} {lastname} </header>
                        <table>
                              {jobs.map((job, jobid) => (
                                    <tbody key={jobid}>
                                          <tr>
                                                <td>{job}</td>
                                          </tr>
                                    </tbody>
                              ))}
                        </table>
                  </article>
                  {canClick ? 
                        <footer>
                              {clickConfirm &&
                                    <button onClick={clickConfirm}> {buttonName} </button>
                              }
                              {clickCancel &&
                                    <button onClick={clickCancel}> ปฏิเสธ </button>
                              }
                        </footer> : 
                        <footer> 
                              <p> {buttonName} </p> 
                        </footer>
                  }
            </section>
      )
}

export default ProfileBox;
