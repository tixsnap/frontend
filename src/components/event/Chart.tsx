"use client";

import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const EventChartYearly = () => {
  // Dummy data
  const data = {
    labels: ["January", "Februay", "March", "April", "May", "June", "July", "August", "September", "Oktober", "November", "December"],
    datasets: [
      {
        label: "Number of Events",
        data: [10, 20, 15, 30, 25, 10, 20, 15, 30, 25, 40], // Dummy event counts per year
        backgroundColor: "rgba(75, 192, 192, 0.6)", // Bar color
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top" as const,
      },
      title: {
        display: true
      },
    },
  };

  return (
    <div className="bg-white p-10 rounded-lg shadow-md ">
      {/* <h2 className="text-xl font-semibold text-center mb-4">Events Chart</h2> */}
      <Bar data={data} options={options} />
    </div>
  );
};


export const MostEventSold = ({labels, dataset}: {labels: string[], dataset: number[]}) => {
  const eventsData = labels.map((label, index) => ({
    label,
    ticketSold: dataset[index],
  }));

  eventsData.sort((a, b) => b.ticketSold - a.ticketSold);
  const sortedLabels = eventsData.map(event => event.label);
  const sortedDataset = eventsData.map(event => event.ticketSold);

  const data = {
    labels: sortedLabels,
    datasets: [
      {
        label: "Most picked events",
        data: sortedDataset,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    indexAxis: "y" as const,
    plugins: {
      legend: {
        display: true,
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Most Ticket Sold",
      },
    },
  };

  return (
    <div className="bg-white p-10 rounded-lg shadow-md ">
      <Bar data={data} options={options} />
    </div>
  );
};

export const MostEventAttended = ({labels, dataset}: {labels: string[], dataset: number[]}) => {
  const eventsData = labels.map((label, index) => ({
    label,
    totalAttendee: dataset[index],
  }));

  eventsData.sort((a, b) => b.totalAttendee - a.totalAttendee);
  const sortedLabels = eventsData.map(event => event.label);
  const sortedDataset = eventsData.map(event => event.totalAttendee);

  const data = {
    labels: sortedLabels,
    datasets: [
      {
        label: "Most attended events",
        data: sortedDataset,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    indexAxis: "y" as const,
    plugins: {
      legend: {
        display: true,
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Most Event Attended",
      },
    },
  };

  return (
    <div className="bg-white p-10 rounded-lg shadow-md ">
      <Bar data={data} options={options} />
    </div>
  );
};


// export const EventChartMonthly = () => {
//   // Dummy data
//   const data = {
//     labels: ["January", "February", "March", "April", "May", "Juni", "Juli", "August", "September", "October", "November", "December"],
//     datasets: [
//       {
//         label: "Number of Events",
//         data: [10, 20, 15, 30, 25, 40, 10, 20, 15, 30, 25, 40], // Dummy event counts per year
//         backgroundColor: "rgba(75, 192, 192, 0.6)", // Bar color
//         borderColor: "rgba(75, 192, 192, 1)",
//         borderWidth: 1,
//       },
//     ],
//   };

//   // Chart options
//   const options = {
//     responsive: true,
//     plugins: {
//       legend: {
//         display: true,
//         position: "top" as const,
//       },
//       title: {
//         display: true,
//         text: "Monthly",
//       },
//     },
//   };

//   return (
//     <div className="bg-white p-5 rounded-lg shadow-md items-center flex">
//       {/* <h2 className="text-xl font-semibold text-center mb-4">Events Chart</h2> */}
//       <Bar data={data} options={options} />
//     </div>
//   );
// };

// export default EventChart;