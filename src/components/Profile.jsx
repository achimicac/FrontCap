import './css/NewProfile.css'

function Profile({user, isMaid=false, clickEdit}) {

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
          <header>
            
                  {user.user_pic ? (
                        <img src={`data:image/jpeg;base64,${maid.user_pic}`} />
                        ) : (
                        <img src={"/sudlore.png"} />
                  )}
            <span>
              {user.firstname} {user.lastname}{" "}
            </span>
            <span> 
              {user.description}
            </span>
          </header>
    
          <main>
            <section>
              <b>birthday</b>
              <span> {user.birthday} </span>
            </section>
            <section>
              <b>age</b>
              <span> {calculateBirthday(user.birthday)} </span>
            </section>
            <section>
              <b>telephone</b>
              <span> {user.tel} </span>
            </section>
            <section>
              <b>email</b>
              <span> {user.email} </span>
            </section>
            {isMaid && (
              <section className='jobtype'>
                <b>job type</b>
                {user.jobtype.map((job, jobin) => (
                  <span key={job.job_id}> {job.job_name} </span>
                ))}
              </section>
            )}
            {/*<section className="descript">
              <b>description</b>
              <span> {user.description} </span>
          </section>*/}
            <footer className="profile-footer">
              <button onClick={clickEdit}> Edit </button>
            </footer>
          </main>
        </main>
      );
    }
    
    export default Profile;
    
