// TransactionsList.jsx
import React from 'react';
import { FaPaypal, FaWallet, FaCreditCard, FaMoneyCheckAlt, FaRegClock } from 'react-icons/fa';
import { MdCreditCard } from 'react-icons/md';
import { BsThreeDotsVertical } from 'react-icons/bs';

const transactions = [
  { id: 1, icon: <FaPaypal color="#FF5700" />, label: 'Paypal', title: 'Send money', amount: '+82.6 USD', type: 'income' },
  { id: 2, icon: <FaWallet color="#6C63FF" />, label: 'Wallet', title: "Mac'D", amount: '+270.69 USD', type: 'income' },
  { id: 3, icon: <FaRegClock color="#00C9A7" />, label: 'Transfer', title: 'Refund', amount: '+637.91 USD', type: 'income' },
  { id: 4, icon: <MdCreditCard color="#21BF73" />, label: 'Credit Card', title: 'Ordered Food', amount: '-838.71 USD', type: 'expense' },
  { id: 5, icon: <FaWallet color="#6C63FF" />, label: 'Wallet', title: 'Starbucks', amount: '+203.33 USD', type: 'income' },
  { id: 6, icon: <MdCreditCard color="#FF4646" />, label: 'Mastercard', title: 'Ordered Food', amount: '-92.45 USD', type: 'expense' },
];

const TransactionItem = ({ icon, label, title, amount, type }) => (
  <div style={styles.transactionItem}>
    <div style={styles.icon}>{icon}</div>
    <div style={styles.details}>
      <div style={styles.label}>{label}</div>
      <div style={styles.title}>{title}</div>
    </div>
    <div style={type === 'income' ? styles.amountIncome : styles.amountExpense}>{amount}</div>
  </div>
);

const TransactionsList = () => (
  <div style={styles.container}>
    <h2 style={styles.header}>Membership Overdue <BsThreeDotsVertical style={styles.dots}/></h2>
    {transactions.map(transaction => (
      <TransactionItem key={transaction.id} {...transaction} />
    ))}
  </div>
);

const styles = {
  container: {
    background: '#fff',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    width: '360px',
    fontFamily: 'Arial, sans-serif',
    position: 'relative',
    overflowY: 'auto',
  },
  header: {
    fontSize: '20px',
    marginBottom: '35px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  dots: {
    cursor: 'pointer'
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
    marginRight: '20px', // Space between details and amount
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
  },
  amountExpense: {
    color: '#FF4646',
    fontWeight: '500',
  },
};

export default TransactionsList;
