import { useState } from "react";
import { FaStar } from 'react-icons/fa';
import RatingBox from "../../components/RatingBox";

function UserStatusRating() {
    const [maids, setMaids] = useState([
        { id: 1, firstname: "atchima", lastname: "nateepradap", jobtype: ["กวาดบ้าน", "ถูบ้าน", "ล้างจาน", "สักผ้า"], submit_time: '2022-03-12', rating: 0 },
        { id: 2, firstname: "atchima", lastname: "nateepradap", jobtype: ["กวาดบ้าน", "ถูบ้าน", "ล้างจาน", "สักผ้า"], submit_time: '2022-03-12', rating: 0 },
        { id: 3, firstname: "atchi", lastname: "natee", jobtype: ["กวาดบ้าน", "ถูบ้าน", "ล้างจาน", "สักผ้า"], submit_time: '2022-03-12', rating: 0 }
    ]);

    const handleStarClick = (maidId, ratingValue) => {
        setMaids(prevMaids => prevMaids.map(maid => {
            if (maid.id === maidId) {
                return { ...maid, rating: ratingValue };
            }
            return maid;
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(maids);
    };

    return (
        <>
            {maids.map((maid, index) => (
                <RatingBox key={index} handleSubmit={handleSubmit} maid={maid} clickStar={handleStarClick}/>
            ))}
        </>
    );
}

export default UserStatusRating;
