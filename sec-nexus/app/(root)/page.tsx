import Image from "next/image";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-primary-50 bg-dotted-pattern bg-contain py-5 md:py-10">
        <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:grid-cols-0">
          {/* This section is exclusive for the text outlook of the website. AKA Hero section  */}
          <div className="flex flex-col justify-centre gap-8">
            <h1 className="h1-bold">Welcome to SEC NEXUS</h1>
            <p className="p-regular-20 md:p-regular-24"> Your One Stop Destination  To All Event and Activities management  within St. Edmund's College
            </p>
            <p> i would change these later. this is just a prototype so to say</p>
            <Button size="lg" asChild className="button w-full sm:w-fit">
              <Link href="#events"> 
                Get Started
              </Link>
            </Button>
          </div>
          {/* This section is exclusive for the main image of the landing page. AKA Hero image */}
          <Image
            src="/assets/images/hero.png"
            alt="Hero Image"
            width={1000}
            height={1000}
            className="max-h-[70vh] object-contain object-centre 2xl:max-h-[50vh]"
          />
        </div>
      </section>

      <section id="events" className="wrapper my-8 flex flex-col gap-10 md:gap-12">
        {/* this section starts with the main content */}
        <h2 className="h2-bold">IDK what to fill here as of yet. <br/> shall do it soon</h2>

        <div className="flex w-full flex-col gap-6 md:flex-row">
          Search 
          Category
          Departments 
        </div>

      </section>
    </>
  );
}
