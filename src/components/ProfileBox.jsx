function ProfileBox({firstname, lastname, jobs, pic, clickConfirm, clickCancel, buttonName='ยืนยัน', canClick=true}) {// or false, depending on your requirement

      return (
            <div className="profilebox-wrapper">
            <section className="profilebox-container">
              <figure className="profilebox-avatar">
                {pic !== null && pic !== undefined ? (
                  <img src={`data:image/jpeg;base64,${pic}`} />
                ) : (
                  <img src="MaKing.jpg" />
                )}
              </figure>
              <div className="profilebox-content">
                <article className="profilebox-information">
                  <header>
                    {firstname} {lastname}
                  </header>
                  <div className="job-chips">
                    {jobs.map((job, jobid) => (
                      <span key={jobid} className="job-chip">
                        {job}
                      </span>
                    ))}
                  </div>
                </article>
                {canClick ? (
                  <footer className="profilebox-actions">
                    {clickCancel && (
                      <button onClick={clickCancel} className="btn-outline">
                        ปฏิเสธ
                      </button>
                    )}
                    {clickConfirm && (
                      <button onClick={clickConfirm}> {buttonName} </button>
                    )}
                  </footer>
                ) : (
                  <footer className="profilebox-actions">
                    <p style={{ margin: "12px 0 0 0" }}> {buttonName} </p>
                  </footer>
                )}
              </div>
            </section>
          </div>
        );
      }
      
      export default ProfileBox;
      
