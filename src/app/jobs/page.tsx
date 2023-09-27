import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Job ads | Recruiting Company",
};

const getData = async () => {
  const response = await fetch("http://localhost:3001/jobs", {
    next: {
      revalidate: 60,
    },
  });

  return response.json();
};

const Jobs = async () => {
  const data = await getData();
  console.log("jobs", data[1].company);
  return (
    <>
      <h1 className="text-3xl mb-10">Job Ads</h1>

      {data.map((item: any) => (
        <div className="flex mb-1 w-auto" key={item.id}>
          <div className="border-r border-b border-l border-t border-grey-300 rounded flex flex-row items-center w-full">
            <div className="p-4 w-1/4">
              <Image
                src={item.logoUrl}
                alt={item.company}
                width={200}
                height={50}
              />
            </div>
            <div className="p-4 w-3/4">
              <div className="text-black font-bold text-xl mb-2">
                {item.jobName}
              </div>
              <p className="text-sm">{item.pulishedAt} </p>
              <p className="text-sm">{item.tillBefore}</p>
              <p className="text-sm">{item.address}</p>
              <p className="text-md font-bold">{item.company}</p>
              <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                <Link href={`/jobs/${item.id}`}>More</Link>
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Jobs;
