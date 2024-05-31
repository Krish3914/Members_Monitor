// TransactionsList.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import { FaUser } from 'react-icons/fa';
import { BsThreeDotsVertical } from 'react-icons/bs';

const scrollbarStyles = {
  scrollbarWidth: 'thin', // For Firefox
  scrollbarColor: 'rgba(0, 0, 0, 0.2) transparent', // For Firefox
  '::-webkit-scrollbar': {
    width: '6px',
  },
  '::-webkit-scrollbar-track': {
    background: 'transparent',
  },
  '::-webkit-scrollbar-thumb': {
    background: 'rgba(0, 0, 0, 0.2)',
    borderRadius: '10px',
  },
  '::-webkit-scrollbar-thumb:hover': {
    background: 'rgba(0, 0, 0, 0.3)',
  },
};

const TransactionItem = ({ icon, label, title, amount, type }) => (
  <div style={styles.transactionItem}>
    <div style={styles.icon}>{icon}</div>
    <div style={styles.details}>
      <div style={styles.label}>{label}</div>
      <div style={styles.title}>{title}</div>
    </div>
    <div style={type === 'income' ? styles.amountIncome : styles.amountExpense}>{amount} days</div>
  </div>
);

const TransactionsList = () => {
  const clients = useSelector((store) => store.client.client);

  const calculateDaysLeft = (registrationDate, plan) => {
    const registrationDateTime = new Date(registrationDate);
    const gymPlanDurations = {
      'one month': 1,
      'premium': 1,
      'three months': 3,
      'six months': 6,
      'one year': 12
    };

    const duration = gymPlanDurations[plan];
    const expiryDate = new Date(registrationDateTime);
    if (plan === 'one year') {
      expiryDate.setFullYear(expiryDate.getFullYear() + 1);
    } else {
      expiryDate.setMonth(expiryDate.getMonth() + duration);
    }

    return Math.ceil((expiryDate - Date.now()) / (1000 * 60 * 60 * 24));
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}><b>Members</b> <BsThreeDotsVertical style={styles.dots} /></h2>
      <div style={styles.tableHeader}>
        <div style={styles.nameHeader}>Name</div>
        <div style={styles.daysLeftHeader}>Days Left</div>
      </div>
      <div style={styles.transactionList}>
        {clients.map(client => (
          <TransactionItem
            key={client._id}
            icon={<FaUser color="#00C9A7" />}
            label={client.name}
            title={client.email}
            amount={calculateDaysLeft(client.registrationDate, client.gymPlan || client.plan)}
            type={calculateDaysLeft(client.registrationDate, client.gymPlan || client.plan) > 0 ? 'income' : 'expense'}
          />
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    background: '#fff',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    width: '360px',
    fontFamily: 'Arial, sans-serif',
    position: 'relative',
    height: '550px',
    overflow: 'hidden',
  },
  header: {
    fontSize: '20px',
    marginBottom: '10px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  dots: {
    cursor: 'pointer'
  },
  tableHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px 0',
    borderBottom: '1px solid #e0e0e0',
    marginBottom: '10px',
  },
  nameHeader: {
    fontSize: '16px',
    fontWeight: '600',
    flex: 1,
  },
  daysLeftHeader: {
    fontSize: '16px',
    fontWeight: '600',
    textAlign: 'right',
  },
  transactionList: {
    overflowY: 'auto',
    height: 'calc(100% - 75px)',
    paddingRight: '10px',
    marginRight: '-10px',
    ...scrollbarStyles,
  },
  transactionItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '20px',
  },
  icon: {
    fontSize: '24px',
    marginRight: '12px',
    padding: '10px',
    borderRadius: '12px',
    backgroundColor: '#F3F4F6',
  },
  details: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    marginRight: '20px',
  },
  label: {
    fontSize: '14px',
    color: '#888',
  },
  title: {
    fontSize: '16px',
    marginBottom: '4px',
    fontWeight: '500',
  },
  amountIncome: {
    color: '#00C9A7',
    fontWeight: '500',
    textAlign: 'right',
  },
  amountExpense: {
    color: '#FF4646',
    fontWeight: '500',
    textAlign: 'right',
  },
};



export default TransactionsList;
