import "./css/RecommendBox.css";

function RecommendBox({ maids, handleClickHired }) {
  return (
    <section className="recommend-box">
      {maids.map((maid, index) => (
        <figure key={index} onClick={() => handleClickHired(maid.user_id)}>
          {maid.user_pic ? (
            <img src={"../../public/imageGalleries/" + maid.user_pic} />
          ) : (
            <img
              src={"../../public/imageGalleries/1716567567852no_account.png"}
            />
          )}
        </figure>
      ))}
    </section>
  );
}
export default RecommendBox;
