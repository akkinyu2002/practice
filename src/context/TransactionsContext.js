import React, { createContext, useEffect, useState } from 'react';
import { getTransactions, saveTransaction, clearAll as storageClear, updateTransaction as storageUpdate, deleteTransaction as storageDelete, exportTransactionsCSV } from '../storage/storage';

export const TransactionsContext = createContext({ txs: [], addTransaction: async ()=>{} });

export function TransactionsProvider({ children }){
  const [txs, setTxs] = useState([]);

  useEffect(()=>{
    (async ()=>{
      const data = await getTransactions();
      setTxs(data || []);
    })();
  }, []);

  async function addTransaction(tx){
    const newTx = await saveTransaction(tx);
    setTxs(prev => [newTx, ...prev]);
    return newTx;
  }

  async function updateTransaction(id, changes){
    const updated = await storageUpdate(id, changes);
    if(updated){
      setTxs(prev => prev.map(t=> t.id===id ? updated : t));
    }
    return updated;
  }

  async function deleteTransaction(id){
    await storageDelete(id);
    setTxs(prev => prev.filter(t=>t.id !== id));
  }

  async function exportCSV(){
    return await exportTransactionsCSV();
  }

  async function clearAll(){
    await storageClear();
    setTxs([]);
  }

  return (
    <TransactionsContext.Provider value={{ txs, setTxs, addTransaction, updateTransaction, deleteTransaction, exportCSV, clearAll }}>
      {children}
    </TransactionsContext.Provider>
  );
}
