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
                                    <section className="job-date">
                                          วันที่ :
                                          <span>{user.work_date}</span>
                                          เวลา :
                                          <span>{user.start_time.split(':', 1)}.00 น.  - {user.end_time.split(':',1)}.00 น.</span>
                                    </section>
                                    <section className="job-chips">
                                          {user.jobtype.map((job, jobindex) => (
                                                <span key={jobindex}> {job} </span>
                                          ))}
                                    </section>
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
                                    <footer className="footer-nobutton"> 
                                          <p style={{ margin: "12px 0 0 0" }}> {buttonName} </p>
                                          {user.submit_time &&
                                                <span>เมื่อเวลา {user.submit_time} </span>
                                          } 
                                    </footer>
                              }
                        </div>
                  </section>
          </div>
        );
      }
      
      export default ProfileBox;
      
