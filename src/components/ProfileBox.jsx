import "./css/ProfileBox.css";
import moment from 'moment';
import 'moment/locale/th';

function ProfileBox({user, clickConfirm, clickCancel, buttonName='ยืนยัน', canClick=true}) {
      /*const date = moment(user.work_date, "YYYY-MM-DD");
      const dateFormat = date.format("dddd D MMMM G YYYY", "th");*/
      /*const someday = moment(user.work_date);
      const formattedDate = someday.locale('th').format('D MMM YY');*/
      const date = new Date(user.work_date)
      const result = date.toLocaleDateString('th-TH', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })
      console.log(result)
      return (
            <div className="profilebox-wrapper">
                  <section className="profilebox-container">
                        {/*<figure className="profilebox-avatar">*/}
                                    {user.user_pic ? (
                                          <img src={`http://localhost:4800/${user.user_pic}`}/>
                                          ) : (
                                          <img src={"/sudlore.png"}/>
                                    )}
                        {/*</figure>*/}
                        <div className="profilebox-content">
                              <article className="profilebox-information">
                                    <header> {user.firstname} {user.lastname} </header>
                                    <section className="job-date">
                                          วันที่ :
                                          <span>{result}</span>
                                          เวลา :
                                          <span>{user.start_time.split(':', 1)}.00 น.  - {user.end_time.split(':',1)}.00 น.</span>
                                    </section>
                                    <section className="job-chips">
                                          {user.jobtype.map((job, jobindex) => (
                                                <span key={jobindex}> {job.job_name} </span>
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
      
