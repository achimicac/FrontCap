import "./css/ProfileBox.css"

function ProfileBox({user, clickConfirm, clickCancel, buttonName='ยืนยัน', canClick=true}) {// or false, depending on your requirement

      return (
            <div className="profilebox-wrapper">
                  <section className="profilebox-container">
                        {/*<figure className="profilebox-avatar">*/}
                                    {user.user_pic ? (
                                          <img src={`data:image/jpeg;base64,${maid.user_pic}`}/>
                                          ) : (
                                          <img src={"/sudlore.png"}/>
                                    )}
                        {/*</figure>*/}
                        <div className="profilebox-content">
                              <article className="profilebox-information">
                                    <header> {user.firstname} {user.lastname} </header>
                                    <div className="job-chips">
                                          <table>
                                                {user.jobtype.map((job, jobid) => (
                                                      <tbody key={jobid}>
                                                            <tr>
                                                                  <td>{job}</td>
                                                            </tr>
                                                      </tbody>
                                                ))}
                                          </table>
                                    </div>
                              </article>

                              {canClick ? 
                                    <footer>
                                          {clickConfirm &&
                                                <button onClick={clickConfirm}> {buttonName} </button>
                                          }
                                          {clickCancel &&
                                                <button onClick={clickCancel} className="btn-outline"> ปฏิเสธ </button>
                                          }
                                    </footer> 
                                    : 
                                    <footer> 
                                          <p style={{ margin: "12px 0 0 0" }}> {buttonName} </p> 
                                    </footer>
                              }
                        </div>
                  </section>
          </div>
        );
      }
      
      export default ProfileBox;
      
