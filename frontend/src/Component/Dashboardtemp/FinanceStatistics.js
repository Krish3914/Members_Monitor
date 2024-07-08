import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from 'chart.js';
import { FiBriefcase } from 'react-icons/fi';


ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const FinanceStatistics = () => {
    const styles = {
        card: {
            background: '#fff',
            borderRadius: '10px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            padding: '0px',
            margin:'0px',
            width: '360px',
            height:'550px',
            fontFamily: 'Arial, sans-serif',
            color: '#333',
        },
        tabs: {
            display: 'flex',
            justifyContent: 'space-around',
            marginBottom: '40px',
            marginTop:'25px'
        },
        tab: {
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer',
            background: 'transparent',
            color: '#333',
            fontFamily: 'Arial, sans-serif'
        },
        activeTab: {
            background: '#696cff',
            color: '#fff',
        },
        balance: {
            display: 'flex',
            alignItems: 'center',
            marginBottom: '30px',
            marginLeft:'10px'
        },
        balanceIcon: {
            width: '30px',
            height: '30px',
            marginRight: '10px',
            borderRadius: '5px',
            background: '#e0f7fa',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        icon: {
            color: '#6200ea',
        },
        balanceText: {
            display: 'flex',
            flexDirection: 'column',
            color:'#b2bbc5',
            fontSize:'13px'
        },
        balanceDetails: {
            display: 'flex',
            alignItems: 'center',
        },
        balanceAmount: {
            fontSize: '14px',
            fontWeight: '600',
            color:'black'
        },
        balanceChange: {
            fontSize: '12px',
            color: '#4caf50',
        },
        chartContainer: {
            height: '250px',
            marginBottom: '50px',
            width:"100 %",
            marginRight:'0px',
            marginLeft:'0px'
        },
        expenses: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        circularProgress: {
            width: '50px',
            height: '50px',
            position: 'relative',
            marginRight: '10px',
            marginLeft:'15px'
        },
        circularSvg: {
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
        },
        circularBackground: {
            fill: 'none',
            stroke: '#f0f0f0',
            strokeWidth: '5',
        },
        circularForeground: {
            fill: 'none',
            stroke: '#6200ea',
            strokeWidth: '5',
            strokeDasharray: '126',
            strokeDashoffset: '63', // 50% of circumference
        },
        spacer: {
            width: '10px', // Adjust width as needed
          },
        progressText: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: '14px',
            fontWeight: '600',
        },
        expensesTitle: {
            fontSize: '14px',
            fontWeight: '600',
            marginRight:'100px'
        },
        expensesChange: {
            fontSize: '12px',
            color: '#777',
            marginLeft:'10px'
        }
        
    };

    const [data, setData] = useState({
        labels: ["",'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        datasets: [
            {
                label: 'Balance',
                data: [23,21,30,22,42,26,35,29],
                fill: true,
                backgroundColor: 'rgba(98, 0, 234, 0.1)',
                borderColor: '#696cff',
                borderWidth: 2,
                tension: 0.4,
            },
        ],
    });
    const [currentMonthIndex, setCurrentMonthIndex] = useState(null);

    useEffect(() => {
        const today = new Date();
        const month = today.getMonth(); // 0-indexed month number
    
        setCurrentMonthIndex(month);
        setData((prevData) => ({
          ...prevData,
          datasets: [
            {
              ...prevData.datasets[0],
              pointRadius: currentMonthIndex !== null ? [0, ...Array(6).fill(3)] : [0, 0, 0, 0, 0, 0, 0],
            },
          ],
        }));
      }, []);

      const options = {
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                enabled: true,
                Node:'index'
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
            },
            y: {
                display:false,
                grid: {
                    grid: {
                        tickBorderDash: [4, 4],
                        tickColor: '#000',
                        tickWidth: 2,
                        offset: true,
                        drawTicks: true,
                        drawOnChartArea: true
                    },
                    
                },
                ticks: { // Hide y-axis labels
                    display: false,
                },
            },
        },
        maintainAspectRatio: false,
        responsive: true,
    };
    

    return (
        <div style={styles.card}>
            <div style={styles.tabs}>
                <div style={{ ...styles.tab, ...styles.activeTab }}>Income</div>
                <div style={styles.tab}>Expenses</div>
                <div style={styles.tab}>Profit</div>
            </div>
            <div style={styles.balance}>
                <div style={styles.balanceIcon}>
                    <FiBriefcase style={styles.icon} />
                </div>  
                <div style={styles.balanceText}>
                    <div style={styles.balanceTitle}>Total Balance</div>
                    <div style={styles.balanceDetails}>
                        <div style={styles.balanceAmount}>$459.10 </div>
                        <div style={styles.spacer}></div>
                        <div style={styles.balanceChange}> 42.9% ↑</div>
                    </div>
                </div>
            </div>
            <div style={styles.chartContainer}>
                <Line data={data} options={options} />
            </div>
            <div style={styles.expenses}>
                <div style={styles.circularProgress}>
                    <div style={styles.progressText}>$65</div>
                    <svg style={styles.circularSvg}>
                        <circle cx="25" cy="25" r="20" style={styles.circularBackground}></circle>
                        <circle cx="25" cy="25" r="20" style={styles.circularForeground}></circle>
                    </svg>
                </div>
                <div>
                    <div style={styles.expensesTitle}>Expenses This Week</div>
                    <div style={styles.expensesChange}>$39 less than last week</div>
                </div>
            </div>
        </div>
    );
};

export default FinanceStatistics;
