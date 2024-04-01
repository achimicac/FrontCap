function ProfileBox({user, clickConfirm, clickCancel, buttonName='ยืนยัน', canClick=true}) {// or false, depending on your requirement

      return (
            <section>
                  <figure>
                        {(user.user_pic !== null && user.user_pic !== undefined) ?
                              <img src={`data:image/jpeg;base64,${pic}`} /> :
                              <img src="MaKing.jpg"/>
                        }
                  </figure>
                  <article>
                        <header> {user.firstname} {user.lastname} </header>
                        <table>
                              {user.jobtype.map((job, jobid) => (
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
