import { Metadata } from "next";
import Image from "next/image";
type Props = {
  params: {
    id: string;
  };
};

export const generateMetadata = async ({
  params: { id },
}: Props): Promise<Metadata> => {
  const job = await getData(id);
  return {
    title: job.jobName,
  };
};

const getData = async (id: string) => {
  const response = await fetch(`http://localhost:3001/jobs/${id}`, {
    next: {
      revalidate: 60,
    },
  });

  return response.json();
};

const Job = async ({ params: { id } }: Props) => {
  console.log(id);
  const job = await getData(id);
  return (
    <>
      <h1 className="text-3xl mb-10">{job.jobName}</h1>
      <div className="relative w-full h-60 overflow-hidden">
        <Image
          src={job.imageUrl}
          alt={job.company}
          layout="fill"
          objectFit="cover"
          className="w-full h-20"
        />
      </div>
      <p className="text-left">Company Name: {job.company}</p>
      <p className="text-left text-sm">Published At: {job.pulishedAt} </p>
      <p className="text-left text-sm">Till Before: {job.tillBefore}</p>
      <p className="text-left text-sm">Address: {job.address}</p>
      <p className="text-left text-sm">Contact Person: {job.contactPerson}</p>
      <p className="text-left text-sm">Contact e-mail: {job.email}</p>
      <p className="text-left text-sm">Phone number: {job.phone}</p>
      <p className="text-left text-sm">Job Category: {job.field}</p>

      <Image src={job.logoUrl} alt={job.company} width={200} height={50} />

      <div
        className="text-left"
        dangerouslySetInnerHTML={{ __html: job.content }}
      />
    </>
  );
};

export default Job;
