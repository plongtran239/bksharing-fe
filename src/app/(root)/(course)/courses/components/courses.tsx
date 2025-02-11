"use client";

import { ArchiveXIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import categoryApi from "@/apis/category.api";
import courseApi from "@/apis/course.api";
import Categories from "@/app/(root)/(course)/courses/components/categories";
import CategoryFilterBadge from "@/app/(root)/(course)/courses/components/category-filter-badge";
import CourseList from "@/app/(root)/(course)/courses/components/couse-list";
import Loader from "@/components/loader";
import { Button } from "@/components/ui/button";
import { PaginationWithLinks } from "@/components/ui/pagination-with-links";
import { Separator } from "@/components/ui/separator";
import { CategoryType, CourseType } from "@/schemas";

const Courses = () => {
  const searchParams = useSearchParams();
  const page = searchParams.get("page");
  const courseName = searchParams.get("courseName");
  const pageNumber = page ? parseInt(page) : 1;

  const [courseLoading, setCourseLoading] = useState(false);
  const [categoryLoading, setCategoryLoading] = useState(false);

  const [courses, setCourses] = useState<CourseType[]>([]);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [total, setTotal] = useState(0);
  const [categoryFilter, setCategoryFilter] = useState<CategoryType[]>([]);

  useEffect(() => {
    async function fetchCourses() {
      try {
        setCourseLoading(true);
        const {
          payload: { data, total },
        } = await courseApi.getCourses({
          pageNumber: categoryFilter.length > 0 ? 1 : pageNumber,
          categoryIds: categoryFilter.map((category) => category.id),
          courseName: courseName || "",
        });

        setCourses(data);

        setTotal(total);
      } catch (error) {
        console.error({ error });
      } finally {
        setCourseLoading(false);
      }
    }

    fetchCourses();
  }, [pageNumber, categoryFilter, courseName]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        setCategoryLoading(true);
        const {
          payload: { data },
        } = await categoryApi.getCategories();

        setCategories(data);
      } catch (error) {
        console.error({ error });
      } finally {
        setCategoryLoading(false);
      }
    }

    fetchCategories();
  }, []);

  const handleClearFilter = () => {
    setCategoryFilter([]);
  };

  const handleRemoveFilter = (categoryId: number) => {
    setCategoryFilter((prev) =>
      prev.filter((category) => category.id !== categoryId)
    );
  };

  return (
    <div className="grid grid-cols-7 gap-5">
      {/* Categories */}
      <div className="col-span-2">
        <div className="w-full">
          <h1 className="text-2xl font-semibold text-primary">Danh mục</h1>

          <Separator className="mb-5 mt-2" />

          <Categories
            categories={categories}
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
            loading={categoryLoading}
          />
        </div>
      </div>

      {/* Courses */}
      <div className="col-span-5">
        <h1 className="text-2xl font-semibold text-primary">
          Khám phá khóa học
        </h1>

        <Separator className="mb-5 mt-2" />

        {courseLoading && (
          <div className="h-96">
            <Loader />
          </div>
        )}

        {/* Filter Category Bar */}
        {categoryFilter.length > 0 && (
          <div className="flex-between mb-5 w-full">
            <div className="flex flex-wrap gap-2">
              {categoryFilter.map((category) => (
                <CategoryFilterBadge
                  key={category.id}
                  category={category}
                  handleRemoveFilter={handleRemoveFilter}
                />
              ))}
            </div>
            <Button variant="link" className="px-0" onClick={handleClearFilter}>
              Xóa tất cả
            </Button>
          </div>
        )}

        {!courseLoading &&
          (courses.length === 0 ? (
            <div className="flex-center h-60 flex-col gap-5">
              <ArchiveXIcon size={64} />
              <p>Không có khóa học nào</p>
            </div>
          ) : (
            <CourseList courses={courses} />
          ))}

        {total > 12 && (
          <div className="mt-10">
            <PaginationWithLinks
              page={pageNumber}
              pageSize={12}
              totalCount={total}
            />
          </div>
        )}
      </div>
    </div>
  );
};
export default Courses;
