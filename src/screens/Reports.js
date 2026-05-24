import React, { useContext, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { TransactionsContext } from '../context/TransactionsContext';

function BreakdownBar({ label, value, max }){
  const pct = max>0 ? (value/max) : 0;
  return (
    <View style={{marginBottom:12}}>
      <View style={{flexDirection:'row', justifyContent:'space-between', marginBottom:6}}>
        <Text style={{fontWeight:'600'}}>{label}</Text>
        <Text style={{color:'#374151'}}>${value.toFixed(2)}</Text>
      </View>
      <View style={styles.barBg}>
        <View style={[styles.barFill,{width: `${Math.min(100, pct*100)}%`}]} />
      </View>
    </View>
  );
}

function DailyChart({ data }){
  const max = Math.max(...data.map(d=>d.value), 1);
  return (
    <View style={{flexDirection:'row', alignItems:'flex-end', height:120}}>
      {data.map((d,i)=> (
        <View key={i} style={{flex:1, alignItems:'center'}}>
          <View style={[styles.dayBar,{height: (d.value/max)*100 + '%'}]} />
        </View>
      ))}
    </View>
  );
}

export default function Reports(){
  const { txs } = useContext(TransactionsContext);

  const byCategory = useMemo(()=>{
    const map = {};
    (txs||[]).forEach(t=>{
      const key = t.category || 'Other';
      map[key] = (map[key] || 0) + (t.type==='income' ? 0 : t.amount);
    });
    return Object.entries(map).map(([k,v])=>({k,v})).sort((a,b)=>b.v-a.v);
  },[txs]);

  const totalSpending = byCategory.reduce((s,c)=>s+c.v,0);

  const daily = useMemo(()=>{
    // simple last-14-days mock from transactions
    const days = Array.from({length:14}).map((_,i)=>({label:i+1,value:0}));
    const now = new Date();
    (txs||[]).forEach(t=>{
      const d = new Date(t.date);
      const diff = Math.floor((now - d)/(1000*60*60*24));
      if(diff>=0 && diff<14 && t.type!=='income'){
        days[13-diff].value += t.amount;
      }
    });
    return days;
  },[txs]);

  return (
    <ScrollView style={styles.container} contentContainerStyle={{padding:16}}>
      <Text style={styles.header}>Reports</Text>

      <View style={styles.card}>
        <Text style={{fontWeight:'700'}}>Spending Summary</Text>
        <Text style={{color:'#374151', marginTop:8}}>Total Spending</Text>
        <Text style={{fontSize:22, fontWeight:'800', marginTop:6}}>${totalSpending.toFixed(2)}</Text>
      </View>

      <View style={styles.card}>
        <Text style={{fontWeight:'700', marginBottom:8}}>By Category</Text>
        {byCategory.slice(0,4).map(c=> (
          <BreakdownBar key={c.k} label={c.k} value={c.v} max={totalSpending || 1} />
        ))}
      </View>

      <View style={styles.card}>
        <Text style={{fontWeight:'700', marginBottom:8}}>Daily Trends (last 14 days)</Text>
        <DailyChart data={daily} />
      </View>

      <View style={styles.card}>
        <Text style={{fontWeight:'700'}}>Top Merchant</Text>
        <View style={{marginTop:8, padding:12, backgroundColor:'#0f172a', borderRadius:10}}>
          <Text style={{color:'#fff', fontWeight:'700', fontSize:18}}>$342.10</Text>
          <Text style={{color:'#e6eef6', marginTop:4}}>Brew & Co. • 14 visits this month</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:{flex:1, backgroundColor:'#f7f8fb'},
  header:{fontSize:28, fontWeight:'700', marginBottom:12},
  card:{backgroundColor:'#fff', padding:16, borderRadius:12, marginBottom:12},
  barBg:{height:8, backgroundColor:'#eef2f7', borderRadius:6, overflow:'hidden'},
  barFill:{height:8, backgroundColor:'#059669'},
  dayBar:{width:8, backgroundColor:'#9ae6b4', borderRadius:4, marginHorizontal:6}
});
