import React from 'react';
import { Chart, PointElement } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { registerables } from 'chart.js'; // Assuming you're using Chart.js v3

const TotalRevenue = () => {
  // Sample chart data
  Chart.register(...registerables);
  const chartData = {
    
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        type:"bar",
        label: '2021',
        data: [18, 7, 15, 29, 18, 12, 9],
        fill: true,
        backgroundColor: 'rgba(127,130,255, 0.5)',
        borderWidth: 1,
        borderColor: 'rgb(127,130,255)',
        tension: 0.1,
        
      },
      {
        type:"bar",
        label: '2020',
        data: [-13, -18, -9, -14, -5, -17, -15],
        fill: true,
        borderWidth: 1,
        backgroundColor: 'rgba(39,203,238,0.5)',
        borderColor: 'rgb(39,203,238)',
        tension: 0.1,
        
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false, // Prevents the chart from maintaining aspect ratio
    plugins: {
      legend: {
          labels: {
              // This more specific font property overrides the global property
              pointStyle: 'circle',
              font: {
                  size: 16
              },
              position: 'top',
              align: 'start',
          }
      }
  },
    scales: {
      x: {
        grid: {
          display: false // Hides grid lines for x-axis
        },
        ticks: {
          fontSize: 15,
        maxRotation: 0, // Disable rotation
        minRotation: 0, // Disable rotation
        align: 'start' // Align ticks to the start of the x-axis
        }
      },
      y: {
        grid: {
          display: true,
          color: 'rgba(0,0,0,0.1)',
          borderColor: 'rgba(0,0,0,0.1)',
          tick: {
            stepSize: 10
          }
        },
        ticks: {
          stepSize: 5,
          fontSize: 15,
          maxRotation: 0,
          minRotation: 0,
          align: 'start'
        }
      }
    }
  };
  

  return (
    <div className="col-12 col-lg-8 order-2 order-md-3 order-lg-2 mb-4">
      <div className="card">
        <div className="row row-bordered g-0">
          <div className="col-md-8">
            <h6 className="card-header m-0 me-2 pb-3" style={{ color: "#768697" }}>
              <b>Total Revenue</b>
            </h6>
            <div style={{ height: "300px", width: '515px', padding: 0}}>
              {/* Use a unique key prop to ensure uniqueness */}
              <Line data={chartData} options={chartOptions} id="totalRevenueChart" key="totalRevenueChart" />
              
            </div>
          </div>
          {/* <div className="col-md-4">
            <div className="card-body">
              <div className="text-center fw-semibold pt-3 mb-2">62% Company Growth</div>

              <div className="d-flex px-xxl-4 px-lg-2 p-4 gap-xxl-3 gap-lg-1 gap-3 justify-content-between">
                <div className="d-flex">
                  <div className="me-2">
                    <span className="badge bg-label-primary p-2"><i className="bx bx-dollar text-primary"></i></span>
                  </div>
                  <div className="d-flex flex-column">
                    <small>2022</small>
                    <h6 className="mb-0">$32.5k</h6>
                  </div>
                </div>
                <div className="d-flex">
                  <div className="me-2">
                    <span className="badge bg-label-info p-2"><i className="bx bx-wallet text-info"></i></span>
                  </div>
                  <div className="d-flex flex-column">
                    <small>Previous Year</small>
                    <h6 className="mb-0">$41.2k</h6>
                  </div>
                </div>
              </div>
            </div>
          </div> */}

        </div>
      </div>
    </div>
  );
};





const Card = ({ imageSrc, title, amount, change }) => {
  return (
    <div className="col-6 mb-4">
      <div className="card">
        <div className="card-body">
          <div className="card-title d-flex align-items-start justify-content-between">
            <div className="avatar flex-shrink-0">
              <img src={imageSrc} alt={title} className="rounded" />
            </div>
            <div className="dropdown">
              <button
                className="btn p-0"
                type="button"
                id={`cardOpt_${title}`}
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i className="bx bx-dots-vertical-rounded"></i>
              </button>
              <div className="dropdown-menu dropdown-menu-end" aria-labelledby={`cardOpt_${title}`}>
                <a className="dropdown-item" href="javascript:void(0);">View More</a>
                <a className="dropdown-item" href="javascript:void(0);">Delete</a>
              </div>
            </div>
          </div>
          <span className="d-block mb-1">{title}</span>
          <h3 className="card-title text-nowrap mb-2">{amount}</h3>
          <small className={`text-${change < 0 ? "danger" : "success"} fw-semibold`}>
            <i className={`bx ${change < 0 ? "bx-down-arrow-alt" : "bx-up-arrow-alt"}`}></i> {change}%
          </small>
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  return (
    <div className="container">
      <div className="row">
        <TotalRevenue />
        {/* <Card imageSrc="frontend\src\Component\assets\img\icons\unicons\paypal.png" title="Payments" amount="$2,456" change="-14.82" />
        <Card imageSrc="frontend\src\Component\assets\img\icons\unicons\cc-primary.png" title="Transactions" amount="$14,857" change="+28.14" /> */}
      </div>
    </div>
  );
};

export default Dashboard;
