import React from 'react';
import { View, SafeAreaView, Text, StyleSheet, Image, TouchableOpacity, Modal } from 'react-native';
//import ModalPadrao from '../../components/ModalPadrao';   <ModalPadrao />

export default function Concurso() {
  return (
    <SafeAreaView style={style.container}>
      <Text style={style.corText}>Selecione os filtros abaixo:</Text>



    </SafeAreaView>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#21242F',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0
  },
  corText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold'
  }
})

