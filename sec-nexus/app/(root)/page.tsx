
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import Collection from "@/components/shared/Collection";
import { getAllEvents } from "@/lib/actions/event.actions";

import { SearchParamProps } from "@/lib/types";
import Search from "@/components/shared/Search";
import CategoryFilter from "@/components/shared/CategoryFilter";
import DepartmentFilter from "@/components/shared/DepartmentFilter";
import ClubFilter from "@/components/shared/ClubFilter";



export default async function Home({searchParams}: SearchParamProps) { 
  const page =Number (searchParams?.page) || 1;
  const searchText =(searchParams?.query as string) || '';
  const category = (searchParams?.category as string) || '';
  const department = (searchParams?.department as string) || '';
  const club = (searchParams?.club as string) || '';

    const events=await getAllEvents({ 
      query:searchText,
      category,
      department,
      club,
      page,
      limit: 6,
    });

    console.log(events);

  return (
    <>
      <Header />
      <main>
        {/* Hero Section - Fixed with working classes */}
        <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-12 md:py-20">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[60vh]">
              {/* Hero Text - Left Column */}
              <div className="flex flex-col justify-center space-y-6 text-center lg:text-left">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Welcome to SEC NEXUS
                </h1>
                <p className="text-lg md:text-xl text-gray-700 max-w-lg mx-auto lg:mx-0">
                  Your One Stop Destination To All Event and Activities Management within St. Edmund&apos;s College
                </p>
                {/* <p className="text-sm text-gray-600">
                  Discover amazing events and activities tailored for you
                </p> */}
                <Button size="lg" asChild className="w-full sm:w-fit mx-auto lg:mx-0">
                  <Link href="#events">Get Started</Link>
                </Button>
                <Button size="lg" asChild className="w-full sm:w-fit mx-auto lg:mx-0">
                  <Link href="https://sec.edu.in/">Navigate to the College Website</Link>
                </Button>
              </div>

              {/* Hero Image - Right Column */}
              <div className="flex justify-center items-center">
                <div className="w-full max-w-md lg:max-w-lg aspect-square bg-gradient-to-br from-white-400 to-gray-500 rounded-2xl flex items-center justify-center shadow-xl">
                  <div className="text-white text-center p-8">
                    <div className="text-6xl mb-4"></div>
                    <h3 className="text-2xl font-bold mb-2">SEC NEXUS</h3>
                    <p className="text-lg">PLACEHOLDER FOR HERO IMAGE</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Events Section - Fixed Layout */}
        <section id="events" className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Upcoming Events
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Discover amazing events and activities happening at St. Edmund&apos;s College
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Search/>
              <CategoryFilter/>
              <DepartmentFilter/>
              <ClubFilter/>
            </div>
           
                  <div className="mt-10">
                    <Collection 
                        data={events?.data ? [events.data].flat() : []}
                        emptyTitle="No Events Found"
                        emptyStateSubtext="Try adjusting your filters or check back later."
                        collectionType="All_Events"
                        limit={6}
                        page={1}
                        totalPages={2}
                        />
                  </div>
            
            
            

          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}