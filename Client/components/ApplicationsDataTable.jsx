import { change_application_status } from "@/Services/job";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { toast } from "react-toastify";
import xlsx from "json-as-xlsx"


export default function ApplicationsDataTable({ application }) {
  const router = useRouter();

  const [Data, setData] = useState([]);

  useEffect(() => {
    setData(application);
  }, [application]);

  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    setFilteredData(Data);
  }, [Data]);

  const handleAcceptStatus = async (id, user) => {
    const data = { id, status: "approved", email: user?.email };
    const res = await change_application_status(data);
    if (res?.success) {
      router.push("/frontend/postedJob");
    } else {
      toast.error(res?.message);
    }
  };

  const handleRejectStatus = async (id, user) => {
    const data = { id, status: "rejected", email: user?.email };
    const res = await change_application_status(data);
    if (res?.success) {
      router.push("/frontend/postedJob");
    } else {
      toast.error(res?.message);
    }
  };

  const columns = [
    {
      name: "Name",
      selector: (row) => row?.user?.name,
    },
    {
      name: "Email",
      selector: (row) => row?.user?.email,
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
        <div className="flex items-center justify-start w-72 h-20">
          <button
            onClick={() =>
              router.push(`/frontend/applicationDetail/${row?._id}`)
            }
            className=" w-20 py-2 mx-2 text-xs text-sky-900 hover:text-white my-2 hover:bg-sky-900 border border-orange-600 rounded transition-all duration-700"
          >
            Details
          </button>
          <button
            onClick={() => handleAcceptStatus(row?._id, row?.user)}
            className=" w-20 py-2 mx-2 text-xs text-green-600 hover:text-white my-2 hover:bg-green-600 border border-green-600 rounded transition-all duration-700"
          >
            Approved
          </button>
          <button
            onClick={() => handleRejectStatus(row?._id, row?.user)}
            className=" w-20 py-2 mx-2 text-xs text-red-600 hover:text-white my-2 hover:bg-red-600 border border-red-600 rounded transition-all duration-700"
          >
            Reject
          </button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    if (search === "") {
      setFilteredData(Data);
    } else {
      setFilteredData(
        Data?.filter((item) => {
          const itemData = item?.user?.name.toUpperCase();
          const textData = search.toUpperCase();
          return itemData.indexOf(textData) > -1;
        })
      );
    }
  }, [search, Data]);

   const contents = [ 
            filteredData?.map((details) => {
              return {
                name: details?.name.toUpperCase(),
                email: details?.email,
                status: details?.status.toUpperCase(),
              };
            }),
          ];

 const downloadFile  = () => {
    let applicantsData = [
        {
          sheet: "Applicants",
          columns: [
            { label: "Name", value: "name" }, // Top level data
            { label: "Email", value: "email" }, // Custom format
            { label: "Status", value: "status" }, // Run functions
          ],
          content: contents[0]
        },
      ];
      let settings = {
        fileName: "Applicant-Details", // Name of the resulting spreadsheet
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
        title={`Total Applications : ${Data?.length}`}
        fixedHeader
        fixedHeaderScrollHeight="79%"
        selectableRows
        selectableRowsHighlight
        subHeader
        persistTableHead
        subHeaderComponent={
          <div className="flex gap-2"> 
          <button className="px-8 py-2 bg-amber-600 text-white outline-none rounded-md" onClick={downloadFile}>Download</button> <input
            className="w-60  py-2 px-2  outline-none  border-b-2 border-orange-600"
            type={"search"}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={"Search with Applicant  name..."}
          /></div>
        }
        className="h-screen bg-white"
      />
    </>
  );
}
