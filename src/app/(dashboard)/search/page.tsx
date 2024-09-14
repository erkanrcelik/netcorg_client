"use client"

import React from 'react';
import {EmployeeTable} from "@/components/custom/tables/employee-tables/employee-table";
import {Separator} from "@/components/ui/separator";
import {Employee} from '@/constants/data';
import {columns} from "@/components/custom/tables/employee-tables/columns";

type paramsProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};
const Page = async ({searchParams}: paramsProps) => {
  const page = Number(searchParams.page) || 1;
  const pageLimit = Number(searchParams.limit) || 10;
  const country = searchParams.search || null;
  const offset = (page - 1) * pageLimit;

  const res = await fetch(
    `https://api.slingacademy.com/v1/sample-data/users?offset=${offset}&limit=${pageLimit}` +
    (country ? `&search=${country}` : '')
  );
  const employeeRes = await res.json();
  const totalUsers = employeeRes.total_users; //1000
  const pageCount = Math.ceil(totalUsers / pageLimit);
  const employee: Employee[] = employeeRes.users;
  return (
    <div className="space-y-4">

      <div className="flex items-start justify-between">

      </div>
      <Separator/>

      <EmployeeTable
        searchKey="country"
        pageNo={page}
        columns={columns}
        totalUsers={totalUsers}
        data={employee}
        pageCount={pageCount}
      />
    </div>
  );
};

export default Page;