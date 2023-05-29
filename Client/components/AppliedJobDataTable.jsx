import { data } from "autoprefixer";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useSelector } from "react-redux";
import xlsx from "json-as-xlsx"


export default function AppliedJobDataTable() {
    const router = useRouter();
    const appliedJobData = useSelector((state) => state.AppliedJob.appliedJob);

    const [Data, setData] = useState([]);

    useEffect(() => {
        setData(appliedJobData);
    }, []);

    const [search, setSearch] = useState("");
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        setFilteredData(Data);
    }, [Data]);

    const columns = [
        {
            name: "Apply Date",
            selector: (row) =>
                new Date(`${row?.job?.createdAt}`).toLocaleDateString("en-GB"),
        },
        {
            name: "Company",
            selector: (row) => row?.job?.company,
        },
        {
            name: "Job title",
            selector: (row) => row?.job?.title,
        },
        {
            name: "Job Salary ",
            selector: (row) => "$" + row?.job?.salary,
        },
        {
            name: "Status",
            selector: (row) => (
                <p
                    className={`uppercase font-semibold ${
                        row?.status === "approved" ? "text-green-500" : ""
                    }  ${row?.status === "rejected" ? "text-red-600" : ""}`}
                >
                    {row?.status}
                </p>
            ),
        },
        {
            name: "Action",
            cell: (row) => (
                <button
                    onClick={() =>
                        router.push(`/frontend/jobDetails/${row?.job?._id}`)
                    }
                    className="md:px-2 md:py-2 px-1 py-1 text-xs text-sky-900 hover:text-white my-2 hover:bg-sky-900 border border-orange-600   rounded transition-all duration-700  "
                >
                    view Detail
                </button>
            ),
        },
    ];

    useEffect(() => {
        if (search === "") {
            setFilteredData(Data);
        } else {
            setFilteredData(
                Data?.filter((item) => {
                    const itemData = item?.job?.company.toUpperCase();
                    const textData = search.toUpperCase();
                    return itemData.indexOf(textData) > -1;
                })
            );
        }
    }, [search, Data]);

    const contents = [ 
        filteredData?.map((details) => {
          return {
            applyDate: new Date(`${details?.job?.createdAt}`).toLocaleDateString("en-GB"),
            company: details?.job?.company.toUpperCase(),
            jobTitle: details?.job?.title.toUpperCase(),
            salary: details?.job?.salary,
            status:details?.status.toUpperCase()
          };
        }),
      ];

const downloadFile  = () => {
let applicantsData = [
    {
      sheet: "Applications",
      columns: [
        { label: "Apply Date", value: "applyDate" }, // Top level data
        { label: "Company", value: "company" }, // Custom format
        { label: "Job Title", value: "jobTitle" }, // Run functions
        { label: "Job Salary", value: "salary" }, // Run functions
        { label: "Job Status", value: "status" }, // Run functions
      ],
      content: contents[0]
    },
  ];
  let settings = {
    fileName: "Job Application Details", // Name of the resulting spreadsheet
    extraLength: 3,
  }
  xlsx(applicantsData, settings)
}


    return (
        <>
            <DataTable
                subHeaderAlign={"right"}
                columns={columns}
                data={filteredData}
                keyField="id"
                pagination
                title={`Total Applied Jobs: ${Data?.length || 0}`}
                responsive
                fixedHeader
                fixedHeaderScrollHeight="79%"
                selectableRows
                selectableRowsHighlight
                subHeader
                persistTableHead
                subHeaderComponent={
                    <div className="flex gap-2"> 
                    <button className="px-8 py-2 bg-amber-600 text-white outline-none rounded-md" onClick={downloadFile}>Download</button>
                    <input
                        className="w-60  py-2 px-2  outline-none  border-b-2 border-orange-600"
                        type={"search"}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder={"Search with company name..."}
                    />
                    </div>
                }
                className="h-screen bg-white"
            />
        </>
    );
}
