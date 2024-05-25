import React, { useState, useEffect } from 'react';
import './css/employMaid.css'

function EmployMaid({ oldInvoice, newInvoice, handleChange, roomChoices, jobchoices }) {
    const [startTimeOptions, setStartTimeOptions] = useState([]);

    useEffect(() => {
        const options = generateTimeOptions('start');
        setStartTimeOptions(options);
        handleChange({ target: { name: 'work_date', value: newInvoice.work_date } }, options);
    }, [newInvoice.work_date]);

    /*useEffect(() => {
        if (newInvoice.start_time) {
            setEndTimeOptions(generateTimeOptions('end')); // Generate end time options if start time is selected
        }
    }, [newInvoice.start_time]);*/

    const generateTimeOptions = (type) => {
        const options = [];
        const hourOptions = oldInvoice
            .filter(item => item.work_date === newInvoice.work_date)
            .map(item => ({
                start: parseInt(item.start_time.substring(0, 2), 10),
                end: parseInt(item.end_time.substring(0, 2), 10)
            }));

        if (type === 'start') {
            for (let hour = 0; hour <= 23; hour++) {
                let isOccupied = false;
                for (let i = 0; i < hourOptions.length; i++) {
                    if (hour >= hourOptions[i].start && hour < hourOptions[i].end) {
                        isOccupied = true;
                        break;
                    }
                }
                if (!isOccupied) {
                    const time = `${hour.toString().padStart(2, '0')}:00`;
                    options.push(time);
                }
            }
        } /*else if (type === 'end') {
            const startHour = parseInt(newInvoice.start_time.substring(0, 2), 10);
            for (let hour = startHour + 1; hour <= 23; hour++) {
                let isOccupied = false;
                for (let i = 0; i < hourOptions.length; i++) {
                    if (hour >= hourOptions[i].start && hour < hourOptions[i].end) {
                        isOccupied = true;
                        break;
                    }
                }
                if (!isOccupied) {
                    const time = `${hour.toString().padStart(2, '0')}:00`;
                    options.push(time);
                }
            }
        }*/

        return options;
    };

    const handleNewInvoice = (event) => {
        handleChange(event, startTimeOptions); // Pass startTimeOptions to handleChange
    };

    const getCurrentDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        let month = today.getMonth() + 1;
        let day = today.getDate();

        month = month < 10 ? '0' + month : month;
        day = day < 10 ? '0' + day : day;

        return `${year}-${month}-${day}`;
    };

    return (
        <article className='employ-maid'>
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
                            value={newInvoice.work_date}
                            onChange={handleNewInvoice}
                            min={getCurrentDate()}
                            required
                        />
                    </label>
                </section>
                <section>
                    <label htmlFor="startTime">
                        <span>เวลาเริ่มงาน:</span>
                        <select
                            id="startTime"
                            name="start_time"
                            value={newInvoice.start_time}
                            onChange={handleNewInvoice}
                            disabled={!newInvoice.work_date}
                            required
                        >
                            <option value=""> เลือกเวลาเริ่มงาน </option>
                            {startTimeOptions.map((time, index) => (
                                <option key={index} value={time}>
                                    {time}
                                </option>
                            ))}
                        </select>
                    </label>
                    <label>
                        <span>เวลาสิ้นสุดงาน:</span>
                        <span> {newInvoice.end_time} </span>
                    </label>
                </section>

                {/*<label htmlFor="endTime">
                    End Time:
                    <select
                        id="endTime"
                        name="end_time"
                        value={newInvoice.end_time}
                        onChange={handleNewInvoice}
                        disabled={!newInvoice.start_time}
                        required
                    >
                        <option value=""> Select End Time </option>
                        {endTimeOptions.map((time, index) => (
                            <option key={index} value={time}>
                                {time}
                            </option>
                        ))}
                    </select>
                        </label>*/}
            </article>

            <article>
                <header>เลือกขนาดห้อง</header>
                <section>
                    {roomChoices.map((room, roomid) => (
                        <label key={roomid}>
                            <input
                                type="radio"
                                name="room_id"
                                value={room.room_id}
                                onChange={handleChange}
                                style={{'display': 'none'}}
                                required
                            />
                            <span>{room.room_type}</span>
                            <span>{room.room_size} ตรม.</span>
                        </label>
                    ))}
                </section>
            </article>
            <article>
                <b>ชนิดงาน:</b>
                <section className="joblist">
                    {newInvoice.job_id.map((job, jobin) => (
                        <p key={job.job_id} >
                            <span key={jobin}> { jobchoices.find((jobname) => jobname.job_id === job).job_name } </span>
                        </p>
                    ))}
                </section>
                <section className="job-choices">
                    {jobchoices.map((job, jobin) => (
                        <label key={job.job_id}>
                            <input
                                name="job_id"
                                type="checkbox"
                                value={job.job_id}
                                checked={newInvoice.job_id.some(maidJob => maidJob === job.job_id)}
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
                        name='detail'
                        type='textarea'
                        onChange={handleChange}
                        autoComplete='off'
                        value={ newInvoice.detail } // Changed datail to detail
                    />
                </label>
            </article>
            <article>
                <header>ราคารวม:</header>
                <span> { newInvoice.amount } บาท</span>
            </article>
        </article>
    );
}

export default EmployMaid;
