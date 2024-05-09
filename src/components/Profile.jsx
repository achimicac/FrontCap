function Profile({user, isMaid=false}) {

      const calculateBirthday = (birthday) => {
        const [day, month, year] = birthday.split("-");
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1;
        const currentDay = currentDate.getDate();
    
        let age = currentYear - parseInt(year, 10);
    
        if (
          parseInt(month, 10) > currentMonth ||
          (parseInt(month, 10) === currentMonth && parseInt(day, 10) > currentDay)
        ) {
          age--;
        }
    
        return age;
      };
    
      return (
        <main className="profile-wrapper">
          <div className="profile-header">
            <figure className="profile-figure">
                  {user.user_pic ? (
                        <img src={`data:image/jpeg;base64,${maid.user_pic}`} />
                        ) : (
                        <img src={"/sudlore.png"} />
                  )}
            </figure>
            <header>
              {user.firstname} {user.lastname}{" "}
            </header>
          </div>
    
          <article className="profile-information">
            <section>
              <b>birthday</b>
              <p> {calculateBirthday(user.birthday)} </p>
            </section>
            <section>
              <b>age</b>
              <p> {user.age} </p>
            </section>
            <section>
              <b>email</b>
              <p> {user.email} </p>
            </section>
            {isMaid && (
              <section>
                <b>job type</b>
                {user.jobtype.map((job, jobin) => (
                  <p key={job.job_id}> {job.job_name} </p>
                ))}
              </section>
            )}
            <section>
              <b>description</b>
              <p> {user.description} </p>
            </section>
          </article>
          {/*<div className="profile-actions">
            <button onClick={handleClick}> Edit </button>
      </div>*/}
        </main>
      );
    }
    
    export default Profile;
    
