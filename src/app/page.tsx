"use client";
import { Metadata } from "next";
import Link from "next/link";
import { Alert } from "flowbite-react";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Carousel, Card, Button } from "flowbite-react";

export const metadata: Metadata = {
  title: "Recruiting Company",
};

interface JobItem {
  id: string;
  jobName: string;
  company: string;
  imageUrl: string;
  // Add other properties as needed
}

const Home = () => {
  const getData = async () => {
    try {
      const response = await fetch("http://localhost:3001/jobs");
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);
  console.log("jobs", data);
  return (
    <>
      <h1 className="text-3xl mb-10">Job ads</h1>

      {/* <Alert color="info">Alert!</Alert> */}

      {data.length ? (
        <Carousel className="h-96" indicators={false} data-carousel="slide">
          {Array.from({ length: Math.ceil(data.length / 3) }).map(
            (_, index) => {
              const startIndex = index * 3;
              const endIndex = Math.min(startIndex + 3, data.length);
              const slideItems = data.slice(startIndex, endIndex);

              return (
                <div
                  className="flex h-full items-center justify-center space-x-1 bg-white dark:bg-gray-700 dark:text-white"
                  key={index}
                >
                  {slideItems.map((slideItem: JobItem) => (
                    <Card
                      imgAlt={slideItem.jobName}
                      imgSrc={slideItem.imageUrl}
                      className="h-96"
                      key={slideItem.id}
                    >
                      <div className="flex flex-1 flex-col justify-between">
                        <div>
                          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            <p>{slideItem.jobName}</p>
                          </h5>
                          <p className="font-normal text-gray-700 dark:text-gray-400">
                            <p>{slideItem.company}</p>
                          </p>
                        </div>

                        <Button>
                          <Link
                            href={`/jobs/${slideItem.id}`}
                            className="items-center"
                          >
                            More
                          </Link>
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              );
            }
          )}
        </Carousel>
      ) : (
        "Loading..."
      )}
    </>
  );
};

export default Home;
