import React from "react";

const TableData = [
  { id: 1, modelType: "Fast R-CNN", analysisTime: 25, keywords: "car" },
  {
    id: 2,
    modelType: "Histogram of Oriented Gradients (HOG)",
    analysisTime: 26,
    keywords: "bus",
  },
  {
    id: 3,
    modelType: "Single Shot Detector (SSD)",
    analysisTime: 18,
    keywords: "snow",
  },
  {
    id: 4,
    modelType: "Spatial Pyramid Pooling (SPP-net)",
    analysisTime: 22,
    keywords: "dog",
  },
  {
    id: 5,
    modelType: "YOLO (You Only Look Once)",
    analysisTime: 21,
    keywords: "animal",
  },
];

const AnalysisTable = () => {
  // get table column
  const column = Object.keys(TableData[0]);
  // get table heading data
  const ThData = () => {
    return column.map((data) => {
      return (
        <th
          key={data}
          className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
        >
          {data}
        </th>
      );
    });
  };
  // get table row data
  const tdData = () => {
    return TableData.map((data) => {
      return (
        <tr>
          {column.map((v) => {
            if (v == "keywords") {
              return (
                <td className=" bg-white px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  <span className="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">
                    {data[v]}
                  </span>
                </td>
              );
            }
            return (
              <td className=" bg-white px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                {data[v]}
              </td>
            );
          })}
        </tr>
      );
    });
  };

  return (
    <table className="table w-full  ">
      <thead>
        <tr>{ThData()}</tr>
      </thead>
      <tbody>{tdData()}</tbody>
    </table>
  );
};

export default AnalysisTable;
