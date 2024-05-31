import React, { useState, useEffect } from "react";
import { TimePicker } from "antd";
import dayjs from "dayjs";
import "./css/employMaid.css";

function EmployMaid({
  newInvoice,
  roomChoices,
  jobchoices,
  endTime,
  amount,
  handleChange,
  handleWorkDate,
  handleStartTime,
}) {
  const [startTime, setStartTime] = useState(dayjs());
  const [submitTime, setSubmitTime] = useState(dayjs());

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();

    month = month < 10 ? "0" + month : month;
    day = day < 10 ? "0" + day : day;

    return `${year}-${month}-${day}`;
  };

  return (
    <article className="employ-maid">
      <header>รายละเอียดการจ้างงาน</header>
      <article>
        <header>เลือกวันเวลา</header>
        <section>
          <label htmlFor="date">
            <span>วันที่:</span>
            <input
              type="date"
              id="date"
              name="work_date"
              onChange={handleWorkDate}
              min={getCurrentDate()}
              required
            />
          </label>
        </section>
        <section>
          <label htmlFor="startTime">
            <span>เวลาเริ่มงาน:</span>
            <TimePicker
              className="antd-time-picker"
              name="start_time"
              value={startTime}
              onChange={(event) => {
                handleStartTime(event.hour(), event.minute());
                setStartTime(event);
              }}
              defaultValue={dayjs()}
              format={"HH:mm"}
              required
            />
          </label>
          <label>
            <span>เวลาสิ้นสุดงาน:</span>
            <span>{endTime != "NaN:NaN:00" ? endTime : ""} น.</span>
          </label>
        </section>
      </article>

      <article>
        <header>เลือกขนาดห้อง</header>
        <section>
          {roomChoices.map((room, roomid) => (
            <label key={roomid}>
              <input
                type="radio"
                name="room"
                value={JSON.stringify(room)}
                onChange={handleChange}
                style={{ display: "none" }}
                required
              />
              <span>{room.room_size}</span>
              <span>{room.room_type} ตรม.</span>
            </label>
          ))}
        </section>
      </article>
      <article>
        <b>ชนิดงาน:</b>
        <section className="joblist">
          {newInvoice.jobs.map((job, jobin) => (
            <p key={jobin}>
              <span>
                {
                  jobchoices.find((jobname) => jobname.job_id === job.job_id)
                    .job_name
                }
              </span>
            </p>
          ))}
        </section>
        <section className="job-choices">
          {jobchoices.map((job, jobin) => (
            <label key={jobin}>
              <input
                name="jobs"
                type="checkbox"
                value={JSON.stringify(job)}
                checked={newInvoice.jobs.some(
                  (maidJob) => maidJob.job_id === job.job_id
                )}
                onChange={handleChange}
              />
              <span></span>
              {job.job_name}
            </label>
          ))}
        </section>
      </article>

      <article>
        <header>รายละเอียดเพิ่มเติม:</header>
        <label>
          <input
            name="note"
            type="textarea"
            onChange={handleChange}
            autoComplete="off"
            value={newInvoice.note} // Changed datail to detail
          />
        </label>
      </article>
      <article>
        <header>ราคารวม:</header>
        <span> {isNaN(amount) ? 0 : amount.toFixed(2)} บาท</span>
      </article>
    </article>
  );
}

export default EmployMaid;
