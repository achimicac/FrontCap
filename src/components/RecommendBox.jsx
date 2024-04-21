function RecommendBox({ maids, handleClick }) {
      return (
        <section>
          {maids.map((maid) => (
              <figure key={maid.user_id} onClick={() => handleClick(maid.user_id)}>
                {maid.user_pic ? (
                      <img src={`data:image/jpeg;base64,${maid.user_pic}`} style={{width: '30vw'}} />
                      ) : (
                      <img src={"/sudlore.png"} style={{width: '30vw'}} />
                )}
              </figure>
          ))}
        </section>
      );
    }
export default RecommendBox
