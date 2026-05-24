import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'WALLETWISE_TXS_V1';

export async function getTransactions(){
  try{
    const raw = await AsyncStorage.getItem(KEY);
    if(!raw) return [];
    return JSON.parse(raw);
  }catch(e){
    return [];
  }
}

export async function saveTransaction(tx){
  const all = await getTransactions();
  const newTx = { id: Date.now().toString(), ...tx };
  all.unshift(newTx);
  await AsyncStorage.setItem(KEY, JSON.stringify(all));
  return newTx;
}

export async function updateTransaction(id, changes){
  const all = await getTransactions();
  const idx = all.findIndex(t=>t.id === id);
  if(idx === -1) return null;
  all[idx] = { ...all[idx], ...changes };
  await AsyncStorage.setItem(KEY, JSON.stringify(all));
  return all[idx];
}

export async function deleteTransaction(id){
  const all = await getTransactions();
  const filtered = all.filter(t=>t.id !== id);
  await AsyncStorage.setItem(KEY, JSON.stringify(filtered));
  return true;
}

export async function exportTransactionsCSV(){
  const all = await getTransactions();
  const headers = ['id','title','amount','type','category','note','date'];
  const rows = all.map(t => headers.map(h => JSON.stringify(t[h] ?? '')).join(','));
  return [headers.join(','), ...rows].join('\n');
}

export async function clearAll(){
  await AsyncStorage.removeItem(KEY);
}
