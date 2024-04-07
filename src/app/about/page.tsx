import Image from "next/image";
import React from "react";

const list = [
  {
    id: "1",
    title: "Lorem",
    desc: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
  {
    id: "2",
    title: "Sedut",
    desc: "perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
  },
  {
    id: "3",
    title: "Nemoenim",
    desc: "voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
  },
];

const cards = [
  {
    title: "23k",
    subTitle: "Daily outsole",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    title: "38",
    subTitle: "years of activity",
    desc: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
  {
    title: "85%",
    subTitle: "waste reused",
    desc: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
  },
  {
    title: "168",
    subTitle: "brands served",
    desc: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
];

const About = () => {
  return (
    <div className="w-[95vw] mx-auto">
      {/* INTODUCTION */}
      <div className="flex items-center flex-col md:flex-row justify-center">
        <div className="md:flex-[1] h-[600px] md:h-[768px] lg:h-[600px] 2xl:h-[100vh] flex items-center justify-center py-10 md:py-0">
          <div className="relative h-[100%] w-[95vw] md:h-[50%] md:w-[95%] lg:h-[80%]">
            <Image
              src="/pexels-miggy-rivera-5665104.jpg"
              alt=""
              fill
              className="object-cover rounded-md 2xl:rounded-[0.375vw]"
            />
          </div>
        </div>
        <div className="md:flex-[2] min-h-[600px] md:h-[768px] lg:h-[600px] 2xl:h-[100vh] flex flex-col items-center justify-evenly">
          <h1 className="md:w-[95%] text-[7vw] md:text-[5vw] lg:text-[4vw] font-[500] tracking-tighter leading-[100%]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </h1>
          <div className="flex flex-wrap items-center justify-between md:w-[95%]">
            {list.map((item, i) => (
              <div
                key={i}
                className="flex flex-col justify-center gap-[0.6vw] relative h-[250px] w-[100%] md:w-[30%]"
              >
                <div className="flex items-center gap-[2vw] md:gap-[0.6vw] h-[30%] md:h-[20%]">
                  <h2 className="text-[5vw] md:text-[2vw] lg:text-[1.5vw] font-[500]">
                    {item.title}
                  </h2>
                  <span className="flex items-center justify-center text-[3vw] md:text-[1.5vw] lg:text-[1vw] h-[5vw] w-[5vw] md:h-[3vw] md:w-[3vw] lg:h-[2vw]  lg:w-[2vw] bg-black text-white rounded-[50%]">
                    {item.id}
                  </span>
                </div>
                <p className="h-[70%] md:h-[80%] text-[3.5vw] md:text-[1.5vw] lg:text-[1vw] font-[500]">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* IMAGES */}
      <div className="h-[450px] lg:h-[600px] flex items-center justify-center 2xl:h-[100vh]">
        <div className="hidden flex-[2] h-[100%] md:flex items-end justify-center">
          <div className="relative h-[70%] w-[90%]">
            <Image
              src="/pexels-format-1029757.jpg"
              alt=""
              fill
              className="object-cover rounded-md 2xl:rounded-[0.375vw]"
            />
          </div>
        </div>
        <div className="flex-[3] h-[100%] flex items-center justify-center">
          <div className="relative h-[100%] w-[100%]">
            <Image
              src="/pexels-tranmautritam-326502.jpg"
              alt=""
              fill
              className="object-cover rounded-md 2xl:rounded-[0.375vw]"
            />
          </div>
        </div>
      </div>
      {/* QOUTE */}
      <div className="flex flex-col lg:flex-row items-center justify-center">
        <div className="h-[600px] w-[100%] 2xl:h-[100vh] flex flex-col items-center justify-evenly">
          <h1 className="md:w-[90%] text-[8vw] md:text-[7vw] lg:text-[4vw] font-[500] tracking-tighter leading-[100%]">
            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut
            fugit, sed quia consequuntur magni dolores eos qui ratione.
          </h1>
          <div className="flex items-start gap-[2.5vw] md:gap-[1vw] w-[100%] md:w-[90%]">
            <div className="relative h-[125px] w-[100px] 2xl:h-[15vh] 2xl:w-[6vw]">
              <Image
                src="/pexels-stefan-stefancik-91227.jpg"
                alt=""
                fill
                className="object-cover rounded-md"
              />
            </div>
            <div className="flex flex-col">
              <span className="lg:text-[0.75vw] md:text-[1.25vw] text-[2.5vw] font-[500]">
                shah.
              </span>
              <h2 className="lg:text-[1.5vw] md:text-[3vw] text-[5vw] font-[500] capitalize">
                john doe
              </h2>
              <span className="lg:text-[1vw] md:text-[2vw] text-[4vw] font-[500]">
                CEO & Founder
              </span>
            </div>
          </div>
        </div>
        <div className="min-h-[600px] w-[100%] 2xl:h-[100vh] flex flex-wrap items-center justify-center gap-[6vw] md:gap-0 md:justify-evenly">
          {cards.map((card, i) => (
            <div
              key={i}
              className="h-[200px] w-[100%] md:w-[300px] lg:w-[225px] 2xl:h-[30vh] 2xl:w-[20vw] flex flex-col justify-between"
            >
              <div className="flex flex-col justify-center gap-[1.25vw]">
                <div className="flex items-center">
                  <span className="text-[7vw] md:text-[5vw] lg:text-[2.5vw] font-bold">
                    {card.title}
                  </span>
                  <span className="mx-auto w-[30%] text-[2.5vw] md:text-[1.5vw] lg:text-[1.25vw] font-[500] capitalize">
                    {card.subTitle}
                  </span>
                </div>
                <p className="text-[3vw] md:text-[1.25vw] lg:text-[0.75vw] font-[500]">
                  {card.desc}
                </p>
              </div>
              <hr />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
