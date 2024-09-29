import MentorCard from "@/app/(mentor)/mentors/components/mentor-card";
import SearchFilter from "@/app/(mentor)/mentors/components/search-filter";

const Mentor = () => {
  return (
    <main className="pb-10">
      {/* Search & Filter */}
      <div className="bg-secondary py-10">
        <div className="container">
          <SearchFilter />
        </div>
      </div>

      {/* Mentor List */}
      <div className="container mt-5">
        <p className="text-lg font-semibold">Mentors (8)</p>

        <div className="mt-5 grid grid-cols-4 gap-10 max-xl:grid-cols-2 max-sm:grid-cols-1 max-sm:px-10">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((mentor, index) => (
            <div key={index}>
              <MentorCard />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};
export default Mentor;
