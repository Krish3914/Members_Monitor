import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { FiMoreVertical } from 'react-icons/fi';

ChartJS.register(ArcElement, Tooltip, Legend);

const OrderStatistics = ({ userData }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [membershipCounts, setMembershipCounts] = useState({
        oneMonth: 0,
        threeMonths: 0,
        sixMonths: 0,
        oneYear: 0
    });

    useEffect(() => {
        if (userData && userData.length > 0) {
            const counts = userData.reduce((acc, client) => {
                const plan = client.gymPlan || client.plan;
                if (plan === 'one month') {
                    acc.oneMonth += 1;
                } else if (plan === 'three months') {
                    acc.threeMonths += 1;
                } else if (plan === 'six months') {
                    acc.sixMonths += 1;
                } else if (plan === 'one year') {
                    acc.oneYear += 1;
                }
                return acc;
            }, { oneMonth: 0, threeMonths: 0, sixMonths: 0, oneYear: 0 });

            setMembershipCounts(counts);
        }
    }, [userData]);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const cardStyle = {
        background: '#fff',
        borderRadius: '10px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        padding: '20px',
        width: '360px',
        height: '550px', // Adjusted height to fit the new field
        fontFamily: 'Arial, sans-serif',
        color: '#333',
        position: 'relative'
    };

    const headerStyle = {
        marginBottom: '-35px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    };

    const h2Style = {
        margin: 0,
        fontSize: '20px',
        fontWeight: '600'
    };

    const pHeaderStyle = {
        margin: '5px 0',
        fontSize: '12px',
        color: '#777'
    };

    const dropdownMenuStyle = {
        position: 'absolute',
        top: '40px',
        right: '20px',
        backgroundColor: '#fff',
        border: '1px solid #ddd',
        borderRadius: '5px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        zIndex: 1000,
        display: dropdownOpen ? 'block' : 'none'
    };

    const dropdownItemStyle = {
        padding: '10px 20px',
        cursor: 'pointer',
        whiteSpace: 'nowrap'
    };

    const mainStatsContainerStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '-20px'
    };

    const mainStatsStyle = {
        display: 'flex',
        flexDirection: 'column',
        flex: 1
    };

    const h1Style = {
        margin: 0,
        fontSize: '36px',
        fontWeight: '700',
        color: '#4caf50'
    };

    const pMainStatsStyle = {
        margin: '5px 0',
        fontSize: '14px',
        color: '#777'
    };

    const categoriesStyle = {
        borderTop: '1px solid #eee',
        paddingTop: '20px'
    };

    const categoryStyle = {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '15px'
    };

    const iconStyle = {
        width: '30px',
        height: '30px',
        marginRight: '10px',
        borderRadius: '5px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    };

    const oneMonthIconStyle = {
        ...iconStyle,
        background: '#ffebee',
        color: '#d32f2f'
    };

    const threeMonthsIconStyle = {
        ...iconStyle,
        background: '#e1f5fe',
        color: '#0288d1'
    };

    const sixMonthsIconStyle = {
        ...iconStyle,
        background: '#e8f5e9',
        color: '#388e3c'
    };

    const oneYearIconStyle = {
        ...iconStyle,
        background: '#e3f2fd',
        color: '#0288d1'
    };

    const detailsStyle = {
        flex: 1
    };

    const pDetailsStyle = {
        margin: 0,
        fontSize: '14px',
        fontWeight: '500'
    };

    const subtextStyle = {
        fontSize: '12px',
        color: '#777'
    };

    const countStyle = {
        fontSize: '14px',
        fontWeight: '600',
        color: '#333'
    };

    const data = {
        labels: ['1 Month', '3 Months', '6 Months', '1 Year'],
        datasets: [
            {
                data: [membershipCounts.oneMonth, membershipCounts.threeMonths, membershipCounts.sixMonths, membershipCounts.oneYear], 
                backgroundColor: ['#d32f2f', '#4caf50', '#ff9800', '#03a9f4'],
                hoverBackgroundColor: ['#c62828', '#45a049', '#fb8c00', '#039be5'],
                borderWidth: 2,
                borderColor: '#fff',
                hoverOffset: 4
            }
        ]
    };

    const options = {
        plugins: {
            legend: {
                display: true,
                position: 'right',
                labels: {
                    boxWidth: 20,
                    padding: 15
                }
            },
            tooltip: {
                enabled: true,
                callbacks: {
                    label: function (tooltipItem) {
                        return tooltipItem.label + ': ' + tooltipItem.raw.toLocaleString();
                    }
                }
            }
        },
        maintainAspectRatio: false,
        responsive: true
    };

    return (
        <div style={cardStyle}>
            <div style={headerStyle}>
                <div>
                    <h2 style={h2Style}>Membership Statistics</h2>
                    <p style={pHeaderStyle}>Total Users</p>
                </div>
                <div style={{ position: 'relative' }}>
                    <FiMoreVertical onClick={toggleDropdown} style={{ cursor: 'pointer' }} />
                    <div style={dropdownMenuStyle}>
                        <div
                            style={dropdownItemStyle}
                            onMouseEnter={e => e.target.style.backgroundColor = '#f5f5f5'}
                            onMouseLeave={e => e.target.style.backgroundColor = '#fff'}
                            onClick={() => alert('Select All clicked')}
                        >
                            Select All
                        </div>
                        <div
                            style={dropdownItemStyle}
                            onMouseEnter={e => e.target.style.backgroundColor = '#f5f5f5'}
                            onMouseLeave={e => e.target.style.backgroundColor = '#fff'}
                            onClick={() => alert('Refresh clicked')}
                        >
                            Refresh
                        </div>
                        <div
                            style={dropdownItemStyle}
                            onMouseEnter={e => e.target.style.backgroundColor = '#f5f5f5'}
                            onMouseLeave={e => e.target.style.backgroundColor = '#fff'}
                            onClick={() => alert('Share clicked')}
                        >
                            Share
                        </div>
                    </div>
                </div>
            </div>
            <div style={mainStatsContainerStyle}>
                <div style={mainStatsStyle}>
                    <h1 style={h1Style}>{membershipCounts.oneMonth + membershipCounts.threeMonths + membershipCounts.sixMonths + membershipCounts.oneYear}</h1>
                    <p style={pMainStatsStyle}>Total Memberships</p>
                </div>
                <div style={{ width: '180px', height: '180px', marginLeft: '20px' }}>
                    <Pie data={data} options={options} />
                </div>
            </div>
            <div style={categoriesStyle}>
                <div style={categoryStyle}>
                    <div style={oneMonthIconStyle}>📅</div>
                    <div style={detailsStyle}>
                        <p style={pDetailsStyle}>One Month</p>
                    </div>
                    <p style={countStyle}>{membershipCounts.oneMonth}</p>
                </div>
                <div style={categoryStyle}>
                    <div style={threeMonthsIconStyle}>📅</div>
                    <div style={detailsStyle}>
                        <p style={pDetailsStyle}>Three Months</p>
                    </div>
                    <p style={countStyle}>{membershipCounts.threeMonths}</p>
                </div>
                <div style={categoryStyle}>
                    <div style={sixMonthsIconStyle}>📅</div>
                    <div style={detailsStyle}>
                        <p style={pDetailsStyle}>Six Months</p>
                    </div>
                    <p style={countStyle}>{membershipCounts.sixMonths}</p>
                </div>
                <div style={categoryStyle}>
                    <div style={oneYearIconStyle}>📅</div>
                    <div style={detailsStyle}>
                        <p style={pDetailsStyle}>One Year</p>
                    </div>
                    <p style={countStyle}>{membershipCounts.oneYear}</p>
                </div>
            </div>
        </div>
    );
};

export default OrderStatistics;
