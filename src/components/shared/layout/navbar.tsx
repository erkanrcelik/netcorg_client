"use client";
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {ModeToggle} from "@/components/shared/mode-toggle";
import {SheetMenu} from "@/components/shared/layout/sheet-menu";
import CustomBreadCrumb from "@/components/shared/layout/breadcrumb";
import {Input} from "@/components/ui/input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {useRouter, useSearchParams} from 'next/navigation';
import React, {useEffect} from "react";
import {toast} from "react-toastify";

const validationSchema = Yup.object({
  filter: Yup.string().required('Please select a filter type'),
  searchTerm: Yup.string().required('Please enter a search term'),
});

export function Navbar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const formik = useFormik({
    initialValues: {
      filter: searchParams.get('filter') || '',
      searchTerm: searchParams.get('searchTerm') || '',
    },
    validationSchema,
    onSubmit: (values) => {
      const query = new URLSearchParams({
        searchTerm: values.searchTerm,
        filter: values.filter,
      }).toString();
      router.push(`/search?${query}`);
    },
  });

  useEffect(() => {
    if (formik.errors.filter && formik.errors.searchTerm) {
      toast.error(formik.errors.filter);
    }
  }, [formik.errors]);

  const handleFilterChange = (value: string) => {
    formik.setFieldValue('filter', value);
  }

  return (
    <header
      className="sticky top-0 z-10 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:shadow-secondary">
      <div className="mx-4 sm:mx-8 flex h-14 items-center justify-between">
        <div className="flex items-center space-x-4 lg:space-x-0 w-full">
          <SheetMenu/>
          <CustomBreadCrumb/>
          <form onSubmit={formik.handleSubmit} className="flex flex-grow px-4 space-x-2">
            <div>
              <Select
                name="filter"
                defaultValue={searchParams.get('filter') || ''}
                value={formik.values.filter}
                onValueChange={handleFilterChange}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Search Type"/>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pname">Process Name</SelectItem>
                  <SelectItem value="aname">Application Name</SelectItem>
                  <SelectItem value="title">Title</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Input
              name="searchTerm"
              className="flex-grow"
              placeholder="Search..."
              value={formik.values.searchTerm}
              onChange={formik.handleChange}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  formik.handleSubmit();
                }
              }}
            />
          </form>
        </div>
        <div className="flex items-center space-x-4">
          <ModeToggle/>
        </div>
      </div>
    </header>
  );
}
