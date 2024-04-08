function RecommendBox({ maids, handleClick }) {
      return (
        <section>
          {maids.map((maid) => (
              <figure key={maid.user_id} onClick={() => handleClick(maid.user_id)}>
                {maid.user_pic !== null && maid.user_pic !== undefined ? (
                  <img src={`data:image/jpeg;base64,${maid.user_pic}`} />
                ) : (
                  <img src="MaKing.jpg" />
                )}
              </figure>
          ))}
        </section>
      );
    }

    export default RecommendBox
