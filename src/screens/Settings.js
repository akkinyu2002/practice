import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function Settings(){
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Settings</Text>
      <View style={styles.card}>
        <Text style={{fontWeight:'700'}}>Personal Information</Text>
        <Text style={{color:'#6b7280'}}>Update your details and avatar</Text>
      </View>
      <View style={styles.card}>
        <Text style={{fontWeight:'700'}}>Security</Text>
        <Text style={{color:'#6b7280'}}>Password, 2FA, and biometrics</Text>
      </View>
      <TouchableOpacity style={[styles.card,{marginTop:24}]} onPress={()=>{}}>
        <Text style={{color:'#ef4444', textAlign:'center'}}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{flex:1, backgroundColor:'#f7f8fb', padding:16},
  header:{fontSize:28, fontWeight:'700', marginBottom:12},
  card:{backgroundColor:'#fff', padding:16, borderRadius:12, marginBottom:12}
});
