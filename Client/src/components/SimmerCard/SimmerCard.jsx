import React from "react";

const SimmerCard = () => {
  const card = new Array(6).fill(1);
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 py-2 gap-3 container mx-auto">
      {card.map((ele, ind) => (
        <div
          key={ind}
          className="shadow-lg rounded mx-1 border-2 pb-2 bg-zinc-400/50  h-60 sm:h-72 md:h-96"
        >
          <div className=" h-full flex justify-center items-center">
            <div className="animate-pulse rounded-full bg-slate-700 h-20 w-20"></div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default SimmerCard;
